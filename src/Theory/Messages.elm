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

        PAST subMessage ->
            explode subMessage
                |> andThen past

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

        INDIRECT target pointer other haystack subMessage ->
            explode subMessage
                |> andThen (indirect target pointer other haystack)

        ENUMERATED target quantifier other haystack subMessage ->
            explode subMessage
                |> andThen (enumerated target quantifier other haystack)

        AMASSED target quantifier other haystack subMessage ->
            explode subMessage
                |> andThen (amassed target quantifier other haystack)


{-| Generate the initial variables to be passed on to any elaborating functions.
Note that I do not currently validate the nucleus of any message. ...
-}
plain : Nucleus -> Result String Vars
plain ( object, ( pivot, balances ) ) =
    Ok
        { past = False
        , negateObject = False
        , object = object
        , objectOverride = Nothing
        , modality = Nothing
        , longPivot = newLongPivot pivot
        , longPivots = []
        , balances = List.map
            (\x -> RealBalance x)
            (List.filter (nonEmptyBalance) balances)
        , post = []
        }


nonEmptyBalance : Balance -> Bool
nonEmptyBalance ( counter, weight ) =
    case ( counter, weight ) of
        ( Nothing, Nothing ) ->
            False

        _ ->
            True


{-| Negating a message typically has the effect of negating its underlying
condition. Enumerated and amassed elaborations, however, if they target the
main object with the right kind of quantifier, hijack this default behaviour,
making any subsequent negation effect that quantifier instead. The result, in
these cases, is something like "not all" or "not every" at the start of the
sentence.
-}
negative : Vars -> Result String Vars
negative vars =
    if vars.negateObject then
        negateObject vars
    else
        negatePivot vars


negateObject : Vars -> Result String Vars
negateObject vars =
    case vars.objectOverride of
        Nothing ->
            Err "direct objects cannot be negated"

        Just (PointerObject pointer other haystack) ->
            Err "indirect objects cannot be negated"

        Just (QuantifierObject negated quantifier other haystack) ->
            if negated then
                Err "quantified objects cannot be negated twice"
            else
                Ok
                    { vars
                        | negateObject = False
                        , objectOverride = Just (QuantifierObject True quantifier other haystack)
                    }


negatePivot : Vars -> Result String Vars
negatePivot vars =
    case vars.modality of
        Nothing ->
            Ok { vars | longPivot = addToPre "not" vars.longPivot }

        Just modality ->
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
                    Ok { vars | longPivot = addToPre "not" vars.longPivot }


{-| PAST messages.
-}
past : Vars -> Result String Vars
past vars =
    if vars.past then
        Err "past messages cannot be made more past"
    else if vars.modality == Just HardYes then
        Err "messages with the HARD YES modality (MUST/NEED) cannot be made past"
    else if vars.modality == Just SoftYesIsh then
        Err "messages with the SOFT YES-ISH modality (SHOULD) cannot be made past"
    else if vars.modality == Just HardYesIsh then
        Err "messages with the HARD YES-ISH modality (OUGHT) cannot be made past"
    else if vars.modality == Just Dare then
        Err "messages with the DARE modality (DARE) cannot be made past"
    else
        Ok { vars | past = True }


{-| PRIOR messages.
-}
prior : Vars -> Result String Vars
prior vars =
    if vars.longPivot.prior then
        Err "prior messages cannot be made more prior"
    --else if not (vars.modality == Nothing) && vars.projective && not vars.past then
    --    Err "only past projective messages can be prior"
    --else if not (vars.modality == Nothing) && not vars.projective then
    --    Err "practical and evasive messages cannot be prior"
    else
        Ok { vars | longPivot = setPrior vars.longPivot }


{-| DISPLACED messages.
-}
displaced : Displacer -> Vars -> Result String Vars
displaced displacer vars =
    if vars.past then
        Err "past messages cannot be made DISPLACED"
    else if vars.modality /= Nothing then
        Err "messages with a modality cannot be made DISPLACED"
    else
        case displacer of
            Primary pivot ->
                Ok { vars
                    | negateObject = False
                    , longPivot = newLongPivot pivot
                    , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                }

            Secondary modality ->
                if modality == HardYesIsh then
                    Ok { vars
                        | negateObject = False
                        , modality = Just modality
                        , longPivot = (addToPre "to" vars.longPivot)
                    }
                else
                    Ok { vars
                        | negateObject = False
                        , modality = Just modality
                    }


{-| REGULAR messages.
-}
regular : Maybe Displacer -> Maybe String -> Vars -> Result String Vars
regular displacer frequency vars =
    if vars.past then
        Err "past messages cannot be made REGULAR"
    else if vars.modality /= Nothing then
        Err "messages with a modality cannot be made REGULAR"
    else
        case displacer of
            Nothing ->
                Ok { vars
                    | negateObject = False
                    , longPivot = maybeAddToPre frequency vars.longPivot
                }

            Just (Primary pivot) ->
                Ok { vars
                    | negateObject = False
                    , longPivot = maybeAddToPre frequency (newLongPivot pivot)
                    , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                }

            Just (Secondary modality) ->
                if modality == HardYesIsh then
                    Ok { vars
                        | negateObject = False
                        , modality = Just modality
                        , longPivot = addToPre "to" (maybeAddToPre frequency vars.longPivot)
                    }
                else
                    Ok { vars
                        | negateObject = False
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
                case time of
                    Nothing ->
                        { vars | negateObject = False }

                    Just string ->
                        { vars | negateObject = False, post = vars.post ++ [ string ] }
        in
            case displacer of
                Nothing ->
                    Ok newVars

                Just (Primary pivot) ->
                    Ok { newVars
                        | longPivot = newLongPivot pivot
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
        Ok { vars | negateObject = False, post = vars.post ++ [ duration ] }


{-| SCATTERED messages.
-}
scattered : Tally -> Vars -> Result String Vars
scattered tally vars =
    if vars.past then
        Err "past messages cannot be made SCATTERED"
    else if vars.modality /= Nothing then
        Err "messages with a modality cannot be made SCATTERED"
    else
        Ok { vars | negateObject = False, post = vars.post ++ [ tally ] }


{-| INDIRECT messages.
-}
indirect : Target -> Pointer -> Bool -> Haystack -> Vars -> Result String Vars
indirect target pointer other haystack vars =
    case target of
        MainObject ->
            if not (objectIsThirdPerson vars.object) then
                Err "INDIRECT elaborations can only target third person (other) objects"
            else
                Ok { vars
                    | negateObject = False
                    , objectOverride = Just (PointerObject pointer other haystack)
                }

        BalancingObject balanceIndex ->
            case Array.get balanceIndex (Array.fromList vars.balances) of
                Just (RealBalance ( counter, Just (Different object) )) ->
                    if not (objectIsThirdPerson object) then
                        Err "INDIRECT elaborations can only target third person (other) objects"
                    else
                        Ok { vars
                            | negateObject = False
                            , balances = Array.toList (Array.set balanceIndex (PointerBalance counter object pointer other haystack) (Array.fromList vars.balances))
                        }

                Just (PointerBalance counter object pointer bool haystack) ->
                    Err ("balancing object " ++ (toString (balanceIndex + 1)) ++ " cannot be targeted twice")

                Just (QuantifierBalance counter object negated quantifier bool haystack) ->
                    Err ("balancing object " ++ (toString (balanceIndex + 1)) ++ " cannot be targeted twice")

                _ ->
                    Err ("balance " ++ (toString (balanceIndex + 1)) ++  " does not contain a target object")


{-| ENUMERATED messages.
-}
enumerated : Target -> Quantifier -> Bool -> Haystack -> Vars -> Result String Vars
enumerated target quantifier other haystack vars =
    Err "not yet implemented"
    --let
    --    enumerable =
    --        List.member quantifier [ A, Several, Many, Each, Every, Both, Some, Any ]

    --    plural =
    --        List.member quantifier [ Several, Many, Both ]

    --    objectOverride =
    --        QuantifierOverride False (Just quantifier) other haystack

    --    negateObject =
    --        List.member quantifier [ Many, Every, Both, Some, Any ]
    --in
    --    if not enumerable then
    --        Err "this quantifier cannot be used in enumerated elaborations"
    --    else if plural && not (targetIsPlural target vars) then
    --        Err "this quantifier requires a plural object"
    --    else if (not plural) && targetIsPlural target vars then
    --        Err "this quantifier requires a singular object"
    --    else
    --        override vars target objectOverride negateObject


{-| AMASSED messages.
-}
amassed : Target -> Maybe Quantifier -> Bool -> Haystack -> Vars -> Result String Vars
amassed target quantifier other haystack vars =
    Err "not yet implemented"
    --let
    --    amassable =
    --        List.member (Maybe.withDefault All quantifier) [ Some, Any, All, Much, Most, Enough ]

    --    objectOverride =
    --        QuantifierOverride False quantifier other haystack

    --    negateObject =
    --        List.member quantifier [ Just Some, Just Any, Just All, Just Much, Just Enough ]
    --in
    --    if not amassable then
    --        Err "this quantifier cannot be used in amassed elaborations"
    --    else if quantifier == Just Much && (targetIsPlural target vars) then
    --        Err "the MUCH quantifier cannot be used with plural categories"
    --    else
    --        override vars target objectOverride negateObject


{- Override function.
override : Vars -> Target -> ObjectOverride -> Bool -> Result String Vars
override vars target objectOverride negateObject =
    case target of
        MainObject ->
            if vars.objectOverride /= Nothing then
                Err "the main object cannot be overridden twice"
            else if List.member vars.object [ Speaker, Hearer, Speakers, Hearers ] then
                Err "only objects in the third person can be overriden"
            else
                Ok { vars | negateObject = negateObject, objectOverride = Just objectOverride }

        BalancingObject int ->
            if vars.balanceOverride /= Nothing then
                Err "the balancing object cannot be overridden twice"
            else
                case vars.balance of
                    Nothing ->
                        Err "there is no balancing object to override"

                    Just SameObject ->
                        Err "the reflexive balancing object cannot be overriden"

                    Just (IndependentObject object) ->
                        if List.member object [ Speaker, Hearer, Speakers, Hearers ] then
                            Err "only objects in the third person can be overriden"
                        else
                            Ok { vars | negateObject = False, balanceOverride = Just objectOverride }

                    Just (CustomBalance string) ->
                        Err "custom balances cannot be overriden"
-}


{-| Bits and pieces.
-}
newLongPivot : Pivot -> LongPivot
newLongPivot pivot =
    { pivot = pivot, prior = False, pre = [] }


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


setPrior : LongPivot -> LongPivot
setPrior longPivot =
    { longPivot | prior = True }


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
