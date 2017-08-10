module Theory.Messages exposing (explode)

{-| Module for "exploding" messages, i.e. unpacking their structure recursively,
checking them for validity, and keeping track of all the variables that have an
effect on the output sentence. For convenience, these variables are all grouped
together in the Vars record.
-}

import Array
import Maybe
import Result exposing (andThen)
import Theory.Types exposing (..)


{-| The main recursive function, exposed by this module for use in the encoding
function in the Sentences module.
-}
explode : Message -> Result String Vars
explode message =
    case message of
        Plain nucleus ->
            plain nucleus

        NEGATIVE subMessage ->
            explode subMessage
                |> andThen negative

        PAST time subMessage ->
            explode subMessage
                |> andThen (past time)

        PRIOR subMessage ->
            explode subMessage
                |> andThen prior

        DISPLACED displacer subMessage ->
            explode subMessage
                |> andThen (displaced displacer)

        PREORDAINED displacer time subMessage ->
            explode subMessage
                |> andThen (preordained displacer time)

        REGULAR displacer frequency subMessage ->
            explode subMessage
                |> andThen (regular displacer frequency)

        EXTENDED duration subMessage ->
            explode subMessage
                |> andThen (extended duration)

        SCATTERED tally subMessage ->
            explode subMessage
                |> andThen (scattered tally)

        INDIRECT target description subMessage ->
            explode subMessage
                |> andThen (indirect target description)

        ENUMERATED target multiplicty subMessage ->
            explode subMessage
                |> andThen (enumerated target multiplicty)

        AMASSED target proportion subMessage ->
            explode subMessage
                |> andThen (amassed target proportion)


{-| Generate the initial variables to be passed on to any elaborating functions.
Note that I do not currently validate the nucleus of any message.
-}
plain : Nucleus -> Result String Vars
plain ( object, ( pivot, balances ) ) =
    Ok
        { negationTarget = NegateCondition
        , object = DirectObject object
        , past = False
        , prior = False
        , modality = Nothing
        , negatedModality = False
        , preordained = False
        , regular = False
        , pre = []
        , pivot = pivot
        , displacedPivots = []
        , balances = List.map (\x -> DirectBalance x) balances
        , post = []
        }


{-| Negating a message typically has the effect of negating its underlying
condition. The DISPLACED, PREORDAINED, and REGULAR elaborations, however, may
introduce a modality that becomes the target of any subsequent negation instead.
Similarly, the ENUMERATED and AMASSED elaborations, if they target the main
object with the right kind of quantifier, make any subsequent negation affect
that quantifier instead. The result, in these cases, is something like "not all"
or "not every" at the start of the sentence.
-}
negative : Vars -> Result String Vars
negative vars =
    case vars.negationTarget of
        NegateCondition ->
            Ok { vars | pre = "not" :: vars.pre }

        NegateModality ->
            case vars.modality of
                Nothing ->
                    Err "there is no modality to negate"

                Just Yes1 ->
                    Err "the Yes1 modality ('will') cannot be negated"

                Just Yes2 ->
                    Err "the Yes2 modality ('shall') cannot be negated"

                _ ->
                    Ok { vars | negatedModality = True, pre = "not" :: vars.pre }

        NegateMainObject ->
            case vars.object of
                DirectObject object ->
                    Err "direct objects cannot be negated"

                IndirectObject object description ->
                    Err "indirect objects cannot be negated"

                EnumeratedObject object negated multiplicity ->
                    if negated then
                        Err "enumerated objects cannot be negated twice"
                    else
                        Ok
                            { vars
                                | negationTarget = NegateCondition
                                , object = EnumeratedObject object True multiplicity
                            }

                AmassedObject object negated proportion ->
                    if negated then
                        Err "amassed objects cannot be negated twice"
                    else
                        Ok
                            { vars
                                | negationTarget = NegateCondition
                                , object = AmassedObject object True proportion
                            }


{-| PAST messages.
-}
past : Maybe String -> Vars -> Result String Vars
past time vars =
    if vars.past then
        Err "PAST messages cannot be made PAST"
    else if vars.modality == Just Maybe4 then
        Err "messages with the dare modality ('dare') cannot be made PAST"
    else if vars.modality /= Nothing && not vars.regular && time /= Nothing then
        Err "DISPLACED and PREORDAINED messages with a modality cannot be given a PAST time"
    else
        Ok { vars | past = True, post = maybeAddToPost time vars.post }


{-| PRIOR messages.
-}
prior : Vars -> Result String Vars
prior vars =
    if vars.prior then
        Err "PRIOR messages cannot be made PRIOR"
    else if vars.modality /= Nothing && not vars.past then
        Err "messages with a modality can only be PRIOR if they are PAST"
    else if vars.modality /= Nothing && not vars.regular && not vars.preordained then
        Err "DISPLACED messages with a modality cannot be made PRIOR PAST"
    else
        Ok { vars | prior = True }


{-| DISPLACED messages.
-}
displaced : Displacer -> Vars -> Result String Vars
displaced displacer vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be DISPLACED"
    else
        displace (Just displacer) vars


{-| PREORDAINED messages.
-}
preordained : Maybe Displacer -> Maybe String -> Vars -> Result String Vars
preordained displacer time vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be made PREORDAINED"
    else
        displace displacer { vars | preordained = True, post = maybeAddToPost time vars.post }


{-| REGULAR messages.
-}
regular : Maybe Displacer -> Maybe String -> Vars -> Result String Vars
regular displacer frequency vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be made REGULAR"
    else
        displace displacer { vars | regular = True, pre = maybeAddToPre frequency vars.pre }


{-| EXTENDED messages.
-}
extended : String -> Vars -> Result String Vars
extended duration vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be made EXTENDED"
    else
        Ok { vars | negationTarget = NegateCondition, post = vars.post ++ [ duration ] }


{-| SCATTERED messages.
-}
scattered : String -> Vars -> Result String Vars
scattered tally vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be made SCATTERED"
    else
        Ok { vars | negationTarget = NegateCondition, post = vars.post ++ [ tally ] }


{-| INDIRECT messages.
-}
indirect : Int -> Description -> Vars -> Result String Vars
indirect target description vars =
    if target < 0 then
        case vars.object of
            DirectObject object ->
                if not (objectIsThirdPerson object) then
                    Err "only third person (other) objects can be overridden"
                else
                    Ok (overrideMainObject False (IndirectObject object description) vars)

            _ ->
                Err "main object cannot be overridden twice"
    else
        case Array.get target (Array.fromList vars.balances) of
            Nothing ->
                Err "target index out of range"

            Just (DirectBalance ( relator, SameAsMain )) ->
                Err "only different balancing objects can be overridden"

            Just (DirectBalance ( relator, Different object )) ->
                if not (objectIsThirdPerson object) then
                    Err "only third person (other) objects can be overridden"
                else
                    Ok (overrideBalancingObject target (IndirectBalance relator object description) vars)

            _ ->
                Err ("balancing object " ++ (toString (target + 1)) ++ " cannot be overridden twice")


{-| ENUMERATED messages.
-}
enumerated : Int -> Multiplicity -> Vars -> Result String Vars
enumerated target multiplicity vars =
    let
        ( quantifier, other, haystack ) =
            multiplicity
    in
        if not (isEnumerating quantifier) then
            Err "this quantifier cannot be used in ENUMERATED elaborations"
        else if target < 0 then
            case vars.object of
                DirectObject object ->
                    if not (objectIsThirdPerson object) then
                        Err "only third person (other) objects can be overridden"
                    else if isPlural quantifier && not (objectIsPlural object) then
                        Err "your ENUMERATED quantifier requires a plural balancing object"
                    else
                        let
                            negateObject =
                                isNegatable quantifier

                            pseudoObject =
                                EnumeratedObject object False multiplicity
                        in
                            Ok (overrideMainObject negateObject pseudoObject vars)

                _ ->
                    Err "main object cannot be overridden twice"
        else
            case Array.get target (Array.fromList vars.balances) of
                Nothing ->
                    Err "target index out of range"

                Just (DirectBalance ( relator, SameAsMain )) ->
                    Err "only different balancing objects can be overridden"

                Just (DirectBalance ( relator, Different object )) ->
                    if not (objectIsThirdPerson object) then
                        Err "only third person (other) objects can be overridden"
                    else if isPlural quantifier && not (objectIsPlural object) then
                        Err "your ENUMERATED quantifier requires a plural balancing object"
                    else if objectIsPlural object && not (isPlural quantifier) then
                        Err "your ENUMERATED quantifier requires a singular balancing object"
                    else
                        Ok (overrideBalancingObject target (EnumeratedBalance relator object False multiplicity) vars)

                _ ->
                    Err ("balancing object " ++ (toString (target + 1)) ++ " cannot be overridden twice")


{-| AMASSED messages.
-}
amassed : Int -> Proportion -> Vars -> Result String Vars
amassed target proportion vars =
    let
        ( quantifier, other, haystack ) =
            proportion
    in
        if not (isAmassing quantifier) then
            Err "this quantifier cannot be used in AMASSED elaborations"
        else if target < 0 then
            case vars.object of
                DirectObject object ->
                    if not (objectIsThirdPerson object) then
                        Err "only third person (other) objects can be overridden"
                    else if quantifier == Just Much && (objectIsPlural object) then
                        Err "this quantifier cannot be used with plural objects"
                    else
                        let
                            pseudoObject =
                                AmassedObject object False proportion
                        in
                            Ok (overrideMainObject True pseudoObject vars)

                _ ->
                    Err "main object cannot be overridden twice"
        else
            case Array.get target (Array.fromList vars.balances) of
                Nothing ->
                    Err "target index out of range"

                Just (DirectBalance ( relator, SameAsMain )) ->
                    Err "only different balancing objects can be overridden"

                Just (DirectBalance ( relator, Different object )) ->
                    if not (objectIsThirdPerson object) then
                        Err "only third person (other) objects can be overridden"
                    else if quantifier == Just Much && (objectIsPlural object) then
                        Err "this quantifier cannot be used with plural objects"
                    else
                        Ok (overrideBalancingObject target (AmassedBalance relator object False proportion) vars)

                _ ->
                    Err ("balancing object " ++ (toString (target + 1)) ++ " cannot be overridden twice")


{-| Displace a pivot (used by the DISPLACED, PREORDAINED, and REGULAR
elaborations).
-}
displace : Maybe Displacer -> Vars -> Result String Vars
displace displacer vars =
    case displacer of
        Nothing ->
            Ok { vars | negationTarget = NegateCondition }

        Just (Primary pivot) ->
            swapPastForPrior { vars | negationTarget = NegateCondition }
                |> andThen (displacePrimary pivot)

        Just (Secondary modality) ->
            swapPastForPrior { vars | negationTarget = NegateCondition }
                |> andThen (displaceSecondary modality)


swapPastForPrior : Vars -> Result String Vars
swapPastForPrior vars =
    if vars.past && vars.prior then
        Err "PRIOR PAST messages cannot be given a displacer"
    else if vars.past then
        Ok { vars | past = False, prior = True }
    else
        Ok vars


displacePrimary : Pivot -> Vars -> Result String Vars
displacePrimary pivot vars =
    let
        pivots =
            ( vars.prior, "to" :: vars.pre, vars.pivot ) :: vars.displacedPivots
    in
        Ok { vars | prior = False, pre = [], pivot = pivot, displacedPivots = pivots }


displaceSecondary : Modality -> Vars -> Result String Vars
displaceSecondary modality vars =
    Ok { vars | negationTarget = NegateModality, modality = Just modality }


{-| Some functions for possibly adding strings.
-}
maybeAddToPre : Maybe String -> List String -> List String
maybeAddToPre toAdd pre =
    case toAdd of
        Nothing ->
            pre

        Just string ->
            string :: pre


maybeAddToPost : Maybe String -> List String -> List String
maybeAddToPost toAdd post =
    case toAdd of
        Nothing ->
            post

        Just string ->
            post ++ [ string ]


{-| Some functions for overriding objects (used by INDIRECT/ENUMERATED/AMASSED
elaborations).
-}
overrideMainObject : Bool -> PseudoObject -> Vars -> Vars
overrideMainObject negateObject pseudoObject vars =
    if negateObject then
        { vars | negationTarget = NegateMainObject, object = pseudoObject }
    else
        { vars | object = pseudoObject }


overrideBalancingObject : Int -> PseudoBalance -> Vars -> Vars
overrideBalancingObject target pseudoBalance vars =
    let
        oldArray =
            Array.fromList vars.balances

        newArray =
            Array.set target pseudoBalance oldArray
    in
        { vars | balances = Array.toList newArray }


{-| Check Object properties (used for validating INDIRECT/ENUMERATED/AMASSED
elaborations).
-}
objectIsThirdPerson : Object -> Bool
objectIsThirdPerson object =
    case object of
        Other plural sex string ->
            True

        _ ->
            False


objectIsPlural : Object -> Bool
objectIsPlural object =
    case object of
        Speaker plural ->
            plural

        Hearer plural ->
            plural

        Other plural sex string ->
            plural


{-| Lists of Quantifiers (used for validating INDIRECT/ENUMERATED/AMASSED
elaborations).
-}
isEnumerating : Quantifier -> Bool
isEnumerating quantifier =
    case quantifier of
        Integer int ->
            True

        _ ->
            List.member
                quantifier
                [ A
                , Several
                , Many
                , Each
                , Every
                , Both
                , Some
                , Any
                ]


isAmassing : Maybe Quantifier -> Bool
isAmassing quantifier =
    List.member
        quantifier
        [ Nothing
        , Just Some
        , Just Any
        , Just All
        , Just Much
        , Just Most
        , Just Enough
        ]


isNegatable : Quantifier -> Bool
isNegatable quantifier =
    case quantifier of
        Integer int ->
            True

        _ ->
            List.member
                quantifier
                [ Many
                , Every
                , Both
                , Some
                , Any
                ]


isPlural : Quantifier -> Bool
isPlural quantifier =
    case quantifier of
        Integer int ->
            (abs int) /= 1

        _ ->
            List.member
                quantifier
                [ Several
                , Many
                , Both
                ]
