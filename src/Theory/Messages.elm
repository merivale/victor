module Theory.Messages exposing (explode)

{-| Module for "exploding" messages, i.e. unpacking their structure recursively,
checking them for validity, and keeping track of all the variables that have an
effect on the output sentence. For convenience, these variables are all grouped
together in the Vars record.
-}

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

        Negative subMessage ->
            explode subMessage
                |> andThen negative

        Past subMessage ->
            explode subMessage
                |> andThen past

        Prior subMessage ->
            explode subMessage
                |> andThen prior

        Direct displacement subMessage ->
            explode subMessage
                |> andThen (direct displacement)

        Evasive displacement frequency subMessage ->
            explode subMessage
                |> andThen (evasive displacement frequency)

        Future modality time subMessage ->
            explode subMessage
                |> andThen (future modality time)

        Extended duration subMessage ->
            explode subMessage
                |> andThen (extended duration)

        Scattered tally subMessage ->
            explode subMessage
                |> andThen (scattered tally)

        Indirect target pointer other haystack subMessage ->
            explode subMessage
                |> andThen (indirect target pointer other haystack)

        Enumerated target quantifier other haystack subMessage ->
            explode subMessage
                |> andThen (enumerated target quantifier other haystack)

        Amassed target quantifier other haystack subMessage ->
            explode subMessage
                |> andThen (amassed target quantifier other haystack)


{-| Check the nucleus for validity, and generate the initial variables to be
passed on to any elaborating functions.
-}
plain : Nucleus -> Result String Vars
plain { object, condition } =
    let
        ( be, beProperty, beBalance, beCustomBalance, passive ) =
            case condition.pivot of
                Be property ongoing ->
                    case condition.balance of
                        Nothing ->
                            ( True, property /= Nothing, False, False, False )

                        Just (CustomBalance string) ->
                            ( True, property /= Nothing, True, True, False )

                        _ ->
                            ( True, property /= Nothing, True, False, False )

                Do verb ongoing passive ->
                    ( False, False, False, False, passive )
    in
        if beProperty && beBalance then
            Err "pivot BE + property cannot have a balance"
        else if be && not (beProperty || beBalance) then
            Err "pivot BE requires either a property or a balancing object"
        else if beCustomBalance then
            Err "pivot BE cannot take a custom balance"
        else
            Ok
                { past = False
                , projective = False
                , passive = passive
                , negateObject = False
                , object = object
                , objectOverride = Nothing
                , modality = Nothing
                , longPivot = newLongPivot condition.pivot
                , longPivots = []
                , balance = condition.balance
                , balanceOverride = Nothing
                , post = []
                }


{-| Negating a message typically has the effect of negating its underlying
condition. Enumerated and amassed elaborations, however, if they target the
main object with the right kind of quantifier, hijack this default behaviour,
making any subsequent negation effect the quantifier instead. The result, in the
latter case, is something like "not all" or "not every" at the start of the
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

        Just (PointerOverride pointer other haystack) ->
            Err "indirect objects cannot be negated"

        Just (QuantifierOverride negated quantifier other haystack) ->
            if negated then
                Err "quantified objects cannot be negated twice"
            else
                Ok
                    { vars
                        | negateObject = False
                        , objectOverride = Just (QuantifierOverride True quantifier other haystack)
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


{-| Past messages.
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


{-| Prior messages.
-}
prior : Vars -> Result String Vars
prior vars =
    if vars.longPivot.prior then
        Err "prior messages cannot be made more prior"
    else if not (vars.modality == Nothing) && vars.projective && not vars.past then
        Err "only past projective messages can be prior"
    else if not (vars.modality == Nothing) && not vars.projective then
        Err "practical and evasive messages cannot be prior"
    else
        Ok { vars | longPivot = setPrior vars.longPivot }


{-| Expanded.
-}
direct : Displacement -> Vars -> Result String Vars
direct displacement vars =
    if vars.past then
        Err "past messages cannot be made direct"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made direct"
    else
        case displacement of
            Primary pivot ->
                Ok
                    { vars
                        | negateObject = False
                        , longPivot = newLongPivot pivot
                        , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                    }

            Secondary modality ->
                if modality == HardYesIsh then
                    Ok
                        { vars
                            | negateObject = False
                            , modality = Just modality
                            , longPivot = addToPre "to" vars.longPivot
                        }
                else
                    Ok
                        { vars
                            | negateObject = False
                            , modality = Just modality
                        }


{-| Evasive.
-}
evasive : Maybe Displacement -> Maybe String -> Vars -> Result String Vars
evasive displacement frequency vars =
    if vars.past then
        Err "past messages cannot be made evasive"
    else
        case displacement of
            Nothing ->
                case frequency of
                    Nothing ->
                        Ok { vars | negateObject = False }

                    Just string ->
                        Ok { vars | negateObject = False, longPivot = addToPre string vars.longPivot }

            Just (Primary pivot) ->
                case frequency of
                    Nothing ->
                        Ok
                            { vars
                                | negateObject = False
                                , longPivot = newLongPivot pivot
                                , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                            }

                    Just string ->
                        Ok
                            { vars
                                | negateObject = False
                                , longPivot = addToPre string (newLongPivot pivot)
                                , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                            }

            Just (Secondary modality) ->
                if vars.modality /= Nothing then
                    Err "messages with a modality cannot be elaborated with another modality"
                else
                    case frequency of
                        Nothing ->
                            Ok
                                { vars
                                    | negateObject = False
                                    , modality = Just modality
                                }

                        Just string ->
                            Ok
                                { vars
                                    | negateObject = False
                                    , modality = Just modality
                                    , longPivot = addToPre string vars.longPivot
                                }


{-| Future.
-}
future : Maybe Displacement -> Maybe Time -> Vars -> Result String Vars
future displacement time vars =
    if vars.past then
        Err "past messages cannot be made future"
    else
        case displacement of
            Nothing ->
                case time of
                    Nothing ->
                        Ok { vars | negateObject = False }

                    Just string ->
                        Ok { vars | negateObject = False, post = vars.post ++ [ string ] }

            Just (Primary pivot) ->
                case time of
                    Nothing ->
                        Ok
                            { vars
                                | negateObject = False
                                , longPivot = newLongPivot pivot
                                , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                            }

                    Just string ->
                        Ok
                            { vars
                                | negateObject = False
                                , longPivot = newLongPivot pivot
                                , longPivots = (addToPre "to" vars.longPivot) :: vars.longPivots
                                , post = vars.post ++ [ string ]
                            }

            Just (Secondary modality) ->
                case time of
                    Nothing ->
                        Ok
                            { vars
                                | negateObject = False
                                , modality = Just modality
                            }

                    Just string ->
                        Ok
                            { vars
                                | negateObject = False
                                , modality = Just modality
                                , post = vars.post ++ [ string ]
                            }


{-| Extended.
-}
extended : Duration -> Vars -> Result String Vars
extended duration vars =
    if vars.past then
        Err "past messages cannot be made extended"
    else if vars.longPivot.prior then
        Err "prior messages cannot be made extended"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made extended"
    else
        Ok { vars | negateObject = False, post = vars.post ++ [ duration ] }


{-| Scattered.
-}
scattered : Tally -> Vars -> Result String Vars
scattered tally vars =
    if vars.past then
        Err "past messages cannot be made scattered"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made scattered"
    else
        Ok { vars | negateObject = False, post = vars.post ++ [ tally ] }


{-| Indirect.
-}
indirect : Target -> Pointer -> Bool -> Haystack -> Vars -> Result String Vars
indirect target pointer other haystack vars =
    let
        objectOverride =
            PointerOverride pointer other haystack

        negateObject =
            False
    in
        override vars target objectOverride negateObject


{-| Enumerated.
-}
enumerated : Target -> Quantifier -> Bool -> Haystack -> Vars -> Result String Vars
enumerated target quantifier other haystack vars =
    let
        enumerable =
            List.member quantifier [ A, Several, Many, Each, Every, Both, Some, Any ]

        plural =
            List.member quantifier [ Several, Many, Both ]

        objectOverride =
            QuantifierOverride False (Just quantifier) other haystack

        negateObject =
            List.member quantifier [ Many, Every, Both, Some, Any ]
    in
        if not enumerable then
            Err "this quantifier cannot be used in enumerated elaborations"
        else if plural && not (targetIsPlural target vars) then
            Err "this quantifier requires a plural object"
        else if (not plural) && targetIsPlural target vars then
            Err "this quantifier requires a singular object"
        else
            override vars target objectOverride negateObject


{-| Amassed.
-}
amassed : Target -> Maybe Quantifier -> Bool -> Haystack -> Vars -> Result String Vars
amassed target quantifier other haystack vars =
    let
        amassable =
            List.member (Maybe.withDefault All quantifier) [ Some, Any, All, Much, Most, Enough ]

        objectOverride =
            QuantifierOverride False quantifier other haystack

        negateObject =
            List.member quantifier [ Just Some, Just Any, Just All, Just Much, Just Enough ]
    in
        if not amassable then
            Err "this quantifier cannot be used in amassed elaborations"
        else if quantifier == Just Much && (targetIsPlural target vars) then
            Err "the MUCH quantifier cannot be used with plural categories"
        else
            override vars target objectOverride negateObject


{-| Override function.
-}
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

        BalancingObject ->
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


{-| Bits and pieces.
-}
newLongPivot : Pivot -> LongPivot
newLongPivot pivot =
    { pivot = pivot, prior = False, pre = [] }


addToPre : String -> LongPivot -> LongPivot
addToPre toAdd longPivot =
    { longPivot | pre = toAdd :: longPivot.pre }


setPrior : LongPivot -> LongPivot
setPrior longPivot =
    { longPivot | prior = True }


targetIsPlural : Target -> Vars -> Bool
targetIsPlural target vars =
    case target of
        MainObject ->
            objectIsPlural vars.object

        BalancingObject ->
            case vars.balance of
                Just (IndependentObject object) ->
                    objectIsPlural object

                _ ->
                    False


objectIsPlural : Object -> Bool
objectIsPlural object =
    case object of
        Speakers ->
            True

        Hearers ->
            True

        Others string ->
            True

        _ ->
            False
