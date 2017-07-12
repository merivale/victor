module Interface.State exposing (initial, update)

{-| Module for initialising and updating the model (application state).
-}

import Interface.Types exposing (..)
import Theory.Types exposing (..)


{-| The initial application state. Results in my friendly welcome message,
encoded as "I am Victor".
-}
initial : Model
initial =
    { plus = False
    , object = Speaker False
    , pivot = Be False
    , counter = Nothing
    , balances = [ ( Nothing, Different (Other False (Just Male) (Just "Victor")) ) ]
    , elaborations = []
    }


{-| Function for updating the applicated state in response to user input. Those
familiar with Elm may note the use of "Signal" instead of the standard "Msg";
this is to avoid confusion with "Message", a key term of art within my theory.
-}
update : Signal -> Model -> Model
update signal model =
    case signal of
        TogglePlus ->
            let
                allMinus =
                    minusAll model
            in
                { allMinus | plus = not model.plus }

        SetObject object ->
            { model | object = object }

        SetObjectString string ->
            case model.object of
                Other plural sex oldString ->
                    { model | object = Other plural sex (maybe string) }

                _ ->
                    model

        SetPivot pivot ->
            { model | pivot = pivot }

        SetPivotVerbality verbality ->
            case model.pivot of
                Do oldVerbality ongoing passive ->
                    { model | pivot = Do verbality ongoing passive }

                _ ->
                    model

        TogglePivotOngoing ->
            case model.pivot of
                Be ongoing ->
                    { model | pivot = Be (not ongoing) }

                Do verbality ongoing passive ->
                    { model | pivot = Do verbality (not ongoing) passive }

        TogglePivotPassive ->
            case model.pivot of
                Do verbality ongoing passive ->
                    { model | pivot = Do verbality ongoing (not passive) }

                _ ->
                    model

        SetCounter counter ->
            { model | counter = counter }

        SetCounterProperty property ->
            { model | counter = Just (CounterProperty property) }

        SetCounterRelator relator ->
            { model | counter = Just (CounterRelator relator) }

        AddBalance ->
            { model | balances = model.balances ++ [ ( Nothing, SameAsMain ) ] }

        RemoveBalance ->
            let
                lastIndex =
                    (List.length model.balances) - 1
            in
                { model
                    | balances = List.take lastIndex model.balances
                    , elaborations = List.filter (doesNotTarget lastIndex) model.elaborations
                }

        SetBalanceRelator index relator ->
            { model | balances = modifyItem index (setRelator relator) model.balances }

        SetBalanceWeight index weight ->
            { model | balances = modifyItem index (setWeight weight) model.balances }

        SetBalanceWeightObject index object ->
            { model | balances = modifyItem index (setWeightObject object) model.balances }

        SetBalanceWeightObjectString index string ->
            { model | balances = modifyItem index (setWeightObjectString string) model.balances }

        AddElaboration index recipe ->
            let
                allMinus =
                    minusAll model
            in
                { allMinus | elaborations = addElaboration index recipe allMinus.elaborations }

        RemoveElaboration index ->
            { model | elaborations = removeFromList index model.elaborations }

        ToggleElaborationPlus index ->
            { model | plus = False, elaborations = List.indexedMap (toggleOrMinus index) model.elaborations }

        SetString1 index string ->
            { model | elaborations = modifyItem index (setString1 string) model.elaborations }

        SetString2 index string ->
            { model | elaborations = modifyItem index (setString2 string) model.elaborations }

        SetString3 index string ->
            { model | elaborations = modifyItem index (setString3 string) model.elaborations }

        SetDisplacedPivot index pivot ->
            { model | elaborations = modifyItem index (setDisplacedPivot pivot) model.elaborations }

        SetDisplacedPivotVerbality index verbality ->
            { model | elaborations = modifyItem index (setDisplacedPivotVerbality verbality) model.elaborations }

        ToggleDisplacedPivotOngoing index ->
            { model | elaborations = modifyItem index toggleDisplacedPivotOngoing model.elaborations }

        ToggleDisplacedPivotPassive index ->
            { model | elaborations = modifyItem index toggleDisplacedPivotPassive model.elaborations }

        SetDisplacedCounter index counter ->
            { model | elaborations = modifyItem index (setDisplacedCounter counter) model.elaborations }

        SetDisplacedCounterProperty index property ->
            { model | elaborations = modifyItem index (setDisplacedCounterProperty property) model.elaborations }

        SetDisplacedCounterRelator index relator ->
            { model | elaborations = modifyItem index (setDisplacedCounterRelator relator) model.elaborations }

        SetModality index modality ->
            { model | elaborations = modifyItem index (setModality modality) model.elaborations }

        SetTarget index target ->
            { model | elaborations = modifyItem index (setTarget target) model.elaborations }

        SetPointer index pointer ->
            { model | elaborations = modifyItem index (setPointer pointer) model.elaborations }

        SetPointerObject index object ->
            { model | elaborations = modifyItem index (setPointerObject object) model.elaborations }

        SetPointerObjectString index string ->
            { model | elaborations = modifyItem index (setPointerObjectString string) model.elaborations }

        SetQuantifier index quantifier ->
            { model | elaborations = modifyItem index (setQuantifier quantifier) model.elaborations }

        SetQuantifierInteger index int ->
            { model | elaborations = modifyItem index (setQuantifierInteger int) model.elaborations }

        ToggleOther index ->
            { model | elaborations = modifyItem index toggleOther model.elaborations }


{-| Set all pluses to False (i.e. collapse all expanded elaboration boxes). This
is used to ensure that only one elaboration box is open at a time.
-}
minusAll : Model -> Model
minusAll model =
    { model
        | plus = False
        , elaborations = List.map (\x -> { x | plus = False }) model.elaborations
    }


{-| Toggle the plus of a specific elaboration, and otherwise set it to False.
Used to map the elaborations, to ensure that only one elaboration box is open at
a time.
-}
toggleOrMinus : Int -> Int -> Elaboration -> Elaboration
toggleOrMinus toggleIndex currentIndex elaboration =
    if toggleIndex == currentIndex then
        { elaboration | plus = not elaboration.plus }
    else
        { elaboration | plus = False }


{-| Check that an elaboration does not target the balancing object at the given
index. Used to remove any elaboration that does, when the corresponding balance
is deleted.
-}
doesNotTarget : Int -> Elaboration -> Bool
doesNotTarget balanceIndex elaboration =
    not
        (List.member elaboration.recipe [ MakeINDIRECT, MakeENUMERATED, MakeAMASSED ]
            && elaboration.target
            == balanceIndex
        )


{-| Remove an element from a list at the given index. Used for deleting
elaborations.
-}
removeFromList : Int -> List a -> List a
removeFromList index list =
    (List.take index list) ++ (List.drop (index + 1) list)


{-| Functions for adding a new elaboration, with appropriate default
ingredients.
-}
addElaboration : Int -> Recipe -> List Elaboration -> List Elaboration
addElaboration index recipe elaborations =
    let
        before =
            List.take (index + 1) elaborations

        after =
            List.drop (index + 1) elaborations

        elaboration =
            case recipe of
                MakeENUMERATED ->
                    { plus = False
                    , recipe = recipe
                    , string1 = Nothing
                    , string2 = Nothing
                    , string3 = Nothing
                    , modality = SoftYes
                    , pivot = Be False
                    , counter = Nothing
                    , target = -1
                    , pointer = The
                    , quantifier = Nothing
                    , other = False
                    }

                _ ->
                    { plus = False
                    , recipe = recipe
                    , string1 = Nothing
                    , string2 = Nothing
                    , string3 = Nothing
                    , modality = SoftYes
                    , pivot = Be False
                    , counter = Nothing
                    , target = -1
                    , pointer = The
                    , quantifier = Just Some
                    , other = False
                    }
    in
        before ++ (elaboration :: after)


{-| Modify an item within a list at the given index, using the given modifying
function. Used to change the components of balances and elaborations, which
reside within lists in the model.
-}
modifyItem : Int -> (a -> a) -> List a -> List a
modifyItem index modified list =
    case List.head (List.drop index list) of
        Nothing ->
            list

        Just item ->
            (List.take index list)
                ++ ((modified item) :: (List.drop (index + 1) list))


{-| Functions for modifying the components of a balance, used as arguments to
the modifyItem function above.
-}
setRelator : Maybe Relator -> Balance -> Balance
setRelator relator ( oldRelator, weight ) =
    ( relator, weight )


setWeight : Weight -> Balance -> Balance
setWeight weight ( relator, oldWeight ) =
    ( relator, weight )


setWeightObject : Object -> Balance -> Balance
setWeightObject object ( relator, weight ) =
    case weight of
        Different oldObject ->
            ( relator, Different object )

        _ ->
            ( relator, weight )


setWeightObjectString : String -> Balance -> Balance
setWeightObjectString string ( relator, weight ) =
    case weight of
        Different (Other plural sex oldString) ->
            ( relator, Different (Other plural sex (maybe string)) )

        _ ->
            ( relator, weight )


{-| Functions for modifying the components of an elaboration, used as arguments
to the modifyItem function above.
-}
togglePlus : Elaboration -> Elaboration
togglePlus elaboration =
    { elaboration | plus = not elaboration.plus }


setString1 : String -> Elaboration -> Elaboration
setString1 string elaboration =
    { elaboration | string1 = maybe string }


setString2 : String -> Elaboration -> Elaboration
setString2 string elaboration =
    { elaboration | string2 = maybe string }


setString3 : String -> Elaboration -> Elaboration
setString3 string elaboration =
    { elaboration | string3 = maybe string }


maybe : String -> Maybe String
maybe string =
    if String.length string == 0 then
        Nothing
    else
        Just string


setDisplacedPivot : Pivot -> Elaboration -> Elaboration
setDisplacedPivot pivot elaboration =
    { elaboration | pivot = pivot }


setDisplacedPivotVerbality : Verbality -> Elaboration -> Elaboration
setDisplacedPivotVerbality verbality elaboration =
    case elaboration.pivot of
        Do oldVerbality ongoing passive ->
            { elaboration | pivot = Do verbality ongoing passive }

        _ ->
            elaboration


toggleDisplacedPivotOngoing : Elaboration -> Elaboration
toggleDisplacedPivotOngoing elaboration =
    case elaboration.pivot of
        Be ongoing ->
            { elaboration | pivot = Be (not ongoing) }

        Do verbality ongoing passive ->
            { elaboration | pivot = Do verbality (not ongoing) passive }


toggleDisplacedPivotPassive : Elaboration -> Elaboration
toggleDisplacedPivotPassive elaboration =
    case elaboration.pivot of
        Do verbality ongoing passive ->
            { elaboration | pivot = Do verbality ongoing (not passive) }

        _ ->
            elaboration


setDisplacedCounter : Maybe Counter -> Elaboration -> Elaboration
setDisplacedCounter counter elaboration =
    { elaboration | counter = counter }


setDisplacedCounterProperty : Property -> Elaboration -> Elaboration
setDisplacedCounterProperty property elaboration =
    { elaboration | counter = Just (CounterProperty property) }


setDisplacedCounterRelator : Relator -> Elaboration -> Elaboration
setDisplacedCounterRelator relator elaboration =
    { elaboration | counter = Just (CounterRelator relator) }


setModality : Modality -> Elaboration -> Elaboration
setModality modality elaboration =
    { elaboration | modality = modality }


setTarget : Int -> Elaboration -> Elaboration
setTarget target elaboration =
    { elaboration | target = target }


setPointer : Pointer -> Elaboration -> Elaboration
setPointer pointer elaboration =
    { elaboration | pointer = pointer }


setPointerObject : Object -> Elaboration -> Elaboration
setPointerObject object elaboration =
    { elaboration | pointer = RelatedTo object }


setPointerObjectString : String -> Elaboration -> Elaboration
setPointerObjectString string elaboration =
    case elaboration.pointer of
        RelatedTo (Other plural sex oldString) ->
            { elaboration | pointer = RelatedTo (Other plural sex (maybe string)) }

        _ ->
            elaboration


setQuantifier : Maybe Quantifier -> Elaboration -> Elaboration
setQuantifier quantifier elaboration =
    { elaboration | quantifier = quantifier }


setQuantifierInteger : String -> Elaboration -> Elaboration
setQuantifierInteger string elaboration =
    let
        int =
            Result.withDefault 0 (String.toInt string)
    in
        { elaboration | quantifier = Just (Integer int) }


toggleOther : Elaboration -> Elaboration
toggleOther elaboration =
    { elaboration | other = not elaboration.other }
