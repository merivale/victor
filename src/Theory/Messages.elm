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

        INDIRECT target indirection subMessage ->
            explode subMessage
                |> andThen (indirect target indirection)

        ENUMERATED target agglomeration subMessage ->
            explode subMessage
                |> andThen (enumerated target agglomeration)

        AMASSED target agglomeration subMessage ->
            explode subMessage
                |> andThen (amassed target agglomeration)


{-| Generate the initial variables to be passed on to any elaborating functions.
Note that I do not currently validate the nucleus of any message. ...
-}
plain : Nucleus -> Result String Vars
plain ( object, ( pivot, counter, balances ) ) =
    Ok
        { past = False
        , negationTarget = NegateCondition
        , object = RealObject object
        , modality = Nothing
        , negatedModality = False
        , longPivot = newLongPivot pivot counter
        , longPivots = []
        , balances = List.map (\x -> RealBalance x) balances
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
        Condition ->
            Ok { vars | longPivot = addToPre "not" vars.longPivot }

        Modality ->
            case modality of
                SoftYes ->
                    Err "the SOFT YES modality (WILL) cannot be negated"

                SoftMaybe ->
                    Err "the SOFT MAYBE modality (MAY) cannot be negated"

                SoftYesIsh ->
                    Err "the SOFT YES-ISH modality (SHOULD) cannot be negated"

                HardYesIsh ->
                    Err "the HARD YES-ISH modality (OUGHT) cannot be negated"

                Command ->
                    Err "the COMMAND modality (SHALL) cannot be negated"

                _ ->
                    Ok { vars | negateModality = True, longPivot = addToPre "not" vars.longPivot }

        MainObject ->
            case vars.object of
                RealObject object ->
                    Err "direct objects cannot be negated"

                IndirectObject object indirection ->
                    Err "indirect objects cannot be negated"

                AgglomeratedObject object negated agglomeration ->
                    if negated then
                        Err "agglomerated objects cannot be negated twice"
                    else
                        Ok
                            { vars
                                | negationTarget = NegateCondition
                                , object = AgglomeratedObject object True agglomeration
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
                { vars | negationTarget = NegateCondition, post = maybeAddToPost time vars.post }
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
indirect : Int -> Indirection -> Vars -> Result String Vars
indirect target indirection vars =
    if target < 0 then
        case vars.object of
            RealObject object ->
                if not (objectIsThirdPerson object) then
                    Err "only third person (other) objects can be overridden"
                else
                    Ok (overrideMainObject False (IndirectObject object indirection) vars)

            _ ->
                Err "main object cannot be overridden twice"
    else
        case Array.get target (Array.fromList vars.balances) of
            Nothing ->
                Err "target index out of range"

            Just (RealBalance ( relator, SameAsMain )) ->
                Err "only different balancing objects can be overridden"

            Just (RealBalance ( relator, Different object )) ->
                if not (objectIsThirdPerson object) then
                    Err "only third person (other) objects can be overridden"
                else
                    Ok (overrideBalancingObject target (IndirectBalance relator object indirection) vars)

            _ ->
                Err ("balancing object " ++ (toString (target + 1)) ++ " cannot be overridden twice")


{-| ENUMERATED messages.
-}
enumerated : Int -> Agglomeration -> Vars -> Result String Vars
enumerated target agglomeration vars =
    let
        ( quantifier, other, haystack) =
            agglomeration
    in
        if not (List.member quantifier enumeratedQuantifiers) then
            Err "this quantifier cannot be used in ENUMERATED elaborations"
        else
            if target < 0 then
                case vars.object of
                    RealObject object ->
                        if not (objectIsThirdPerson object) then
                            Err "only third person (other) objects can be overridden"
                        else if List.member quantifier pluralQuantifiers && not (objectIsPlural object) then
                            Err "your ENUMERATED quantifier requires a plural balancing object"
                        else
                            let
                                negateObject =
                                    List.member quantifier negatableQuantifiers

                                pseudoObject =
                                    AgglomeratedObject object False agglomeration
                            in
                                Ok (overrideMainObject negateObject pseudoObject vars)

                    _ ->
                        Err "main object cannot be overridden twice"

            else
                case Array.get target (Array.fromList vars.balances) of
                    Nothing ->
                        Err "target index out of range"

                    Just (RealBalance ( relator, SameAsMain )) ->
                        Err "only different balancing objects can be overridden"

                    Just (RealBalance ( relator, Different object )) ->
                        if not (objectIsThirdPerson object) then
                            Err "only third person (other) objects can be overridden"
                        else if List.member quantifier pluralQuantifiers && not (objectIsPlural object) then
                            Err "your ENUMERATED quantifier requires a plural balancing object"
                        else
                            Ok (overrideBalancingObject target (AgglomeratedBalance relator object False agglomeration) vars)

                    _ ->
                        Err ("balancing object " ++ (toString (target + 1)) ++ " cannot be overridden twice")


{-| AMASSED messages.
-}
amassed : Int -> Agglomeration -> Vars -> Result String Vars
amassed target agglomeration vars =
    let
        ( quantifier, other, haystack) =
            agglomeration
    in
        if not (List.member quantifier amassedQuantifiers) then
            Err "this quantifier cannot be used in AMASSED elaborations"
        else
            if target < 0 then
                case vars.object of
                    RealObject object ->
                        if not (objectIsThirdPerson object) then
                            Err "only third person (other) objects can be overridden"
                        else if quantifier == Just Much && (objectIsPlural object) then
                            Err "this quantifier cannot be used with plural objects"
                        else
                            let
                                negateObject =
                                    List.member quantifier negatableQuantifiers

                                pseudoObject =
                                    AgglomeratedObject object False agglomeration
                            in
                                Ok (overrideMainObject negateObject pseudoObject vars)

                    _ ->
                        Err "main object cannot be overridden twice"
            else
                case Array.get target (Array.fromList vars.balances) of
                    Nothing ->
                        Err "target index out of range"

                    Just (RealBalance ( relator, SameAsMain )) ->
                        Err "only different balancing objects can be overridden"

                    Just (RealBalance ( relator, Different object )) ->
                        if not (objectIsThirdPerson object) then
                            Err "only third person (other) objects can be overridden"
                        else if quantifier == Just Much && (objectIsPlural object) then
                            Err "this quantifier cannot be used with plural objects"
                        else
                            Ok (overrideBalancingObject target (AgglomeratedBalance relator object False agglomeration) vars)

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
        { vars | negationTarget = NegateObject, object = pseudoObject }
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
enumeratedQuantifiers : List (Maybe Quantifier)
enumeratedQuantifiers =
    [ Just A
    , Just Several
    , Just Many
    , Just Each
    , Just Every
    , Just Both
    , Just Some
    , Just Any
    ]


amassedQuantifiers : List (Maybe Quantifier)
amassedQuantifiers =
    [ Nothing
    , Just Some
    , Just Any
    , Just All
    , Just Much
    , Just Most
    , Just Enough
    ]


negatableQuantifiers : List (Maybe Quantifier)
negatableQuantifiers =
    [ Just Many
    , Just Every
    , Just Both
    , Just Some
    , Just Any
    , Just All
    , Just Much
    , Just Most
    , Just Enough
    ]


pluralQuantifiers : List (Maybe Quantifier)
pluralQuantifiers =
    [ Just Several
    , Just Many
    , Just Both
    ]
