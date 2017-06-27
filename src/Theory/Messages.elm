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

        REGULAR displacer frequency subMessage ->
            explode subMessage
                |> andThen (regular displacer frequency)

        PREORDAINED displacer time subMessage ->
            explode subMessage
                |> andThen (preordained displacer time)

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
Note that I do not currently validate the nucleus of any message. ...
-}
plain : Nucleus -> Result String Vars
plain ( object, ( pivot, counter, balances ) ) =
    Ok
        { past = False
        , negationTarget = NegateCondition
        , object = DirectObject object
        , modality = Nothing
        , negatedModality = False
        , longPivot = newLongPivot pivot counter
        , longPivots = []
        , balances = List.map (\x -> DirectBalance x) balances
        , post = []
        }


{-| Negating a message typically has the effect of negating its underlying
condition. Enumerated and amassed elaborations, however, if they target the
main object with the right kind of quantifier, hijack this default behaviour,
making any subsequent negation effect that quantifier instead. The result, in
these cases, is something like "not all" or "not every" at the start of the
sentence.
-}
negative : Vars -> Result String Vars
negative vars =
    case vars.negationTarget of
        NegateCondition ->
            Ok { vars | longPivot = addToPre "not" vars.longPivot }

        NegateModality ->
            case vars.modality of
                Nothing ->
                    Err "there is no modality to negate"

                Just SoftYes ->
                    Err "the SOFT YES modality (WILL) cannot be negated"

                Just SoftMaybe ->
                    Err "the SOFT MAYBE modality (MAY) cannot be negated"

                Just SoftYesIsh ->
                    Err "the SOFT YES-ISH modality (SHOULD) cannot be negated"

                Just HardYesIsh ->
                    Err "the HARD YES-ISH modality (OUGHT) cannot be negated"

                Just Command ->
                    Err "the COMMAND modality (SHALL) cannot be negated"

                _ ->
                    Ok { vars | negatedModality = True, longPivot = addToPre "not" vars.longPivot }

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
past : Maybe Time -> Vars -> Result String Vars
past time vars =
    if vars.past then
        Err "PAST messages cannot be made PAST"
    else if vars.modality == Just HardYes then
        Err "messages with the hard yes modality ('must'/'need') cannot be made PAST"
    else if vars.modality == Just SoftYesIsh then
        Err "messages with the soft yes-ish modality ('should') cannot be made PAST"
    else if vars.modality == Just HardYesIsh then
        Err "messages with the hard yes-ish modality ('ought') cannot be made PAST"
    else if vars.modality == Just Dare then
        Err "messages with the dare modality ('dare') cannot be made PAST"
    else if vars.modality /= Nothing && time /= Nothing then
        Err "messages with a modality cannot be given a PAST time"
    else
        Ok { vars | past = True, post = maybeAddToPost time vars.post }


{-| PRIOR messages.
-}
prior : Vars -> Result String Vars
prior vars =
    if vars.longPivot.prior then
        Err "PRIOR messages cannot be made PRIOR"
    else
        Ok { vars | longPivot = setPrior vars.longPivot }


{-| DISPLACED messages.
-}
displaced : Displacer -> Vars -> Result String Vars
displaced displacer vars =
    if vars.past then
        Err "PAST messages cannot be made DISPLACED"
    else if vars.modality /= Nothing then
        Err "messages with a modality cannot be made DISPLACED"
    else
        case displacer of
            Primary pivot beam ->
                Ok
                    { vars
                        | negationTarget = NegateCondition
                        , longPivot = newLongPivot pivot beam
                        , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                    }

            Secondary modality ->
                if modality == HardYesIsh then
                    Ok
                        { vars
                            | negationTarget = NegateModality
                            , modality = Just modality
                            , longPivot = (addToPre "to" vars.longPivot)
                        }
                else
                    Ok
                        { vars
                            | negationTarget = NegateModality
                            , modality = Just modality
                        }


{-| REGULAR messages.
-}
regular : Maybe Displacer -> Maybe Frequency -> Vars -> Result String Vars
regular displacer frequency vars =
    if vars.past then
        Err "past messages cannot be made REGULAR"
    else if vars.modality /= Nothing then
        Err "messages with a modality cannot be made REGULAR"
    else
        case displacer of
            Nothing ->
                Ok
                    { vars
                        | negationTarget = NegateCondition
                        , longPivot = maybeAddToPre frequency vars.longPivot
                    }

            Just (Primary pivot counter) ->
                Ok
                    { vars
                        | negationTarget = NegateCondition
                        , longPivot = maybeAddToPre frequency (newLongPivot pivot counter)
                        , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                    }

            Just (Secondary modality) ->
                if modality == HardYesIsh then
                    Ok
                        { vars
                            | negationTarget = NegateModality
                            , modality = Just modality
                            , longPivot = addToPre "to" (maybeAddToPre frequency vars.longPivot)
                        }
                else
                    Ok
                        { vars
                            | negationTarget = NegateModality
                            , modality = Just modality
                            , longPivot = maybeAddToPre frequency vars.longPivot
                        }


{-| PREORDAINED messages.
-}
preordained : Maybe Displacer -> Maybe Time -> Vars -> Result String Vars
preordained displacer time vars =
    if vars.past then
        Err "past messages cannot be made PREORDAINED"
    else if vars.modality /= Nothing then
        Err "messages with a modality cannot be made PREORDAINED"
    else
        let
            newVars =
                { vars | negationTarget = NegateModality, post = maybeAddToPost time vars.post }
        in
            case displacer of
                Nothing ->
                    Ok newVars

                Just (Primary pivot counter) ->
                    Ok
                        { newVars
                            | longPivot = newLongPivot pivot counter
                            , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                        }

                Just (Secondary modality) ->
                    if modality == HardYesIsh then
                        Ok { newVars | modality = Just modality, longPivot = addToPre "to" vars.longPivot }
                    else
                        Ok { newVars | modality = Just modality }


{-| EXTENDED messages.
-}
extended : Duration -> Vars -> Result String Vars
extended duration vars =
    if vars.past then
        Err "past messages cannot be made EXTENDED"
    else if vars.longPivot.prior then
        Err "prior messages cannot be made EXTENDED"
    else if vars.modality /= Nothing then
        Err "messages with a modality cannot be made EXTENDED"
    else
        Ok { vars | negationTarget = NegateCondition, post = vars.post ++ [ duration ] }


{-| SCATTERED messages.
-}
scattered : Tally -> Vars -> Result String Vars
scattered tally vars =
    if vars.past then
        Err "past messages cannot be made SCATTERED"
    else if vars.modality /= Nothing then
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
        ( quantifier, other, haystack) =
            multiplicity
    in
        if not (isEnumerating quantifier) then
            Err "this quantifier cannot be used in ENUMERATED elaborations"
        else
            if target < 0 then
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
        ( quantifier, other, haystack) =
            proportion
    in
        if not (isAmassing quantifier) then
            Err "this quantifier cannot be used in AMASSED elaborations"
        else
            if target < 0 then
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


{-| Some functions for modifying LongPivots.
-}
newLongPivot : Pivot -> Maybe Counter -> LongPivot
newLongPivot pivot counter =
    { pivot = pivot, counter = counter, prior = False, pre = [] }


addToPre : String -> LongPivot -> LongPivot
addToPre toAdd longPivot =
    { longPivot | pre = toAdd :: longPivot.pre }


maybeAddToPre : Maybe String -> LongPivot -> LongPivot
maybeAddToPre toAdd longPivot =
    case toAdd of
        Nothing ->
            longPivot

        Just string ->
            addToPre string longPivot


maybeAddToPost : Maybe String -> List String -> List String
maybeAddToPost string post =
    case string of
        Nothing ->
            post

        Just str ->
            post ++ [ str ]


setPrior : LongPivot -> LongPivot
setPrior longPivot =
    { longPivot | prior = True }


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
