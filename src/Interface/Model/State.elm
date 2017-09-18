module Interface.Model.State exposing (initial, update)


{-| This module defines the initial Model for the application, and the function
for updating the Model in response to user input.
-}
import Interface.Model.Types exposing (..)
import Interface.Model.Examples as Examples
import Theory.Plain.Nucleus exposing (..)
import Theory.Long.Displacers exposing (..)
import Theory.Object.Pseudo exposing (..)


{-| The initial application state. Depends on the layer of the theory.
-}
initial : TheoryLayer -> Model
initial theoryLayer =
    case theoryLayer of
        PlainTheory ->
            Examples.plainFirst

        ShortTheory ->
            Examples.shortFirst

        LongTheory ->
            Examples.longFirst

        ObjectTheory ->
            Examples.objectFirst

        FullTheory ->
            Examples.plainFirst


{-| Function for updating the application state in response to user input.
-}
update : Signal -> Model -> Model
update signal model =
    case signal of
        LoadExample theoryLayer index ->
            let examples =
                case theoryLayer of
                    PlainTheory ->
                        Examples.plainExamples

                    ShortTheory ->
                        Examples.shortExamples

                    LongTheory ->
                        Examples.longExamples

                    ObjectTheory ->
                        Examples.objectExamples

                    FullTheory ->
                        Examples.allExamples
            in
                case List.head (List.drop index examples) of
                    Nothing ->
                        model

                    Just example ->
                        example

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

        SetVerbality verbality ->
            { model | verbality = verbality }

        SetVerbalityString string ->
            case model.verbality of
                Do oldString ongoing passive ->
                    { model | verbality = Do string ongoing passive }

                _ ->
                    model

        ToggleVerbalityOngoing ->
            case model.verbality of
                Be ongoing ->
                    { model | verbality = Be (not ongoing) }

                Do string ongoing passive ->
                    { model | verbality = Do string (not ongoing) passive }

        ToggleVerbalityPassive ->
            case model.verbality of
                Do string ongoing passive ->
                    { model | verbality = Do string ongoing (not passive) }

                _ ->
                    model

        SetStatus status ->
            { model | status = status }

        SetStatusString string ->
            { model | status = Just (Absolute string) }

        SetStatusRelator relator ->
            { model | status = Just (Relative relator) }

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
            { model | balances = modifyItem index (setBalanceRelator relator) model.balances }

        SetBalanceWeight index weight ->
            { model | balances = modifyItem index (setBalanceWeight weight) model.balances }

        SetBalanceWeightObject index object ->
            { model | balances = modifyItem index (setBalanceWeightObject object) model.balances }

        SetBalanceWeightObjectString index string ->
            { model | balances = modifyItem index (setBalanceWeightObjectString string) model.balances }

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

        SetElaborationString1 index string ->
            { model | elaborations = modifyItem index (setElaborationString1 string) model.elaborations }

        SetElaborationString2 index string ->
            { model | elaborations = modifyItem index (setElaborationString2 string) model.elaborations }

        SetElaborationString3 index string ->
            { model | elaborations = modifyItem index (setElaborationString3 string) model.elaborations }

        SetElaborationDisplacer index displacer ->
            { model | elaborations = modifyItem index (setElaborationDisplacer displacer) model.elaborations }

        SetElaborationDisplacerVerbality index verbality ->
            { model | elaborations = modifyItem index (setElaborationDisplacerVerbality verbality) model.elaborations }

        SetElaborationDisplacerVerbalityString index verbality ->
            { model | elaborations = modifyItem index (setElaborationDisplacerVerbalityString verbality) model.elaborations }

        ToggleElaborationDisplacerVerbalityOngoing index ->
            { model | elaborations = modifyItem index toggleElaborationDisplacerVerbalityOngoing model.elaborations }

        ToggleElaborationDisplacerVerbalityPassive index ->
            { model | elaborations = modifyItem index toggleElaborationDisplacerVerbalityPassive model.elaborations }

        SetElaborationDisplacerStatus index status ->
            { model | elaborations = modifyItem index (setElaborationDisplacerStatus status) model.elaborations }

        SetElaborationDisplacerStatusString index string ->
            { model | elaborations = modifyItem index (setElaborationDisplacerStatusString string) model.elaborations }

        SetElaborationDisplacerStatusRelator index relator ->
            { model | elaborations = modifyItem index (setElaborationDisplacerStatusRelator relator) model.elaborations }

        SetElaborationDisplacerModality index modality ->
            { model | elaborations = modifyItem index (setElaborationDisplacerModality modality) model.elaborations }

        SetElaborationTarget index int ->
            { model | elaborations = modifyItem index (setElaborationTarget int) model.elaborations }

        SetElaborationPointer index pointer ->
            { model | elaborations = modifyItem index (setElaborationPointer pointer) model.elaborations }

        SetElaborationPointerObject index object ->
            { model | elaborations = modifyItem index (setElaborationPointerObject object) model.elaborations }

        SetElaborationPointerObjectString index string ->
            { model | elaborations = modifyItem index (setElaborationPointerObjectString string) model.elaborations }

        SetElaborationQuantifier index quantifier ->
            { model | elaborations = modifyItem index (setElaborationQuantifier quantifier) model.elaborations }

        SetElaborationQuantifierInteger index int ->
            { model | elaborations = modifyItem index (setElaborationQuantifierInteger int) model.elaborations }

        ToggleElaborationOther index ->
            { model | elaborations = modifyItem index toggleElaborationOther model.elaborations }


{-| Set all pluses to False (i.e. collapse all expanded elaboration boxes). This
is used to ensure that only one elaboration box is open at a time.
-}
minusAll : Model -> Model
minusAll model =
    { model
        | plus = False
        , elaborations = List.map (\x -> { x | plus = False }) model.elaborations
    }


{-| Either toggle the plus of an elaboration (if it is the one given as an
argument), or set it to False. This is used to map the elaborations, to ensure
that only one elaboration box is open at a time.
-}
toggleOrMinus : Int -> Int -> Elaboration -> Elaboration
toggleOrMinus toggleIndex currentIndex elaboration =
    if toggleIndex == currentIndex then
        { elaboration | plus = not elaboration.plus }
    else
        { elaboration | plus = False }


{-| Check that an elaboration does not target the balancing object at the given
index. This is used to remove any elaboration that does, when the corresponding
balance is deleted.
-}
doesNotTarget : Int -> Elaboration -> Bool
doesNotTarget balanceIndex elaboration =
    not
        (List.member elaboration.recipe [ MakeINDIRECT, MakeENUMERATED, MakeAMASSED ]
            && elaboration.target
            == balanceIndex
        )


{-| Remove an element from a list at the given index. This is used for deleting
elaborations.
-}
removeFromList : Int -> List a -> List a
removeFromList index list =
    (List.take index list) ++ (List.drop (index + 1) list)


{-| Add a new elaboration, with appropriate default ingredients.
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
                MakeDISPLACED ->
                    { plus = False
                    , recipe = recipe
                    , string1 = Nothing
                    , string2 = Nothing
                    , string3 = Nothing
                    , displacer = Just (Primary ( Be False, Nothing ))
                    , target = -1
                    , pointer = The
                    , quantifier = Nothing
                    , other = False
                    }

                MakeENUMERATED ->
                    { plus = False
                    , recipe = recipe
                    , string1 = Nothing
                    , string2 = Nothing
                    , string3 = Nothing
                    , displacer = Nothing
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
                    , displacer = Nothing
                    , target = -1
                    , pointer = The
                    , quantifier = Just Some
                    , other = False
                    }
    in
        before ++ (elaboration :: after)


{-| Modify an item within a list at the given index, using the given modifying
function. This is used to change the components of balances and elaborations,
which reside within lists in the model.
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
setBalanceRelator : Maybe Relator -> Balance -> Balance
setBalanceRelator relator ( oldRelator, weight ) =
    ( relator, weight )


setBalanceWeight : Weight -> Balance -> Balance
setBalanceWeight weight ( relator, oldWeight ) =
    ( relator, weight )


setBalanceWeightObject : Object -> Balance -> Balance
setBalanceWeightObject object ( relator, weight ) =
    case weight of
        Different oldObject ->
            ( relator, Different object )

        _ ->
            ( relator, weight )


setBalanceWeightObjectString : String -> Balance -> Balance
setBalanceWeightObjectString string ( relator, weight ) =
    case weight of
        Different (Other plural sex oldString) ->
            ( relator, Different (Other plural sex (maybe string)) )

        _ ->
            ( relator, weight )


{-| Functions for modifying the components of an elaboration, used as arguments
to the modifyItem function above.
-}
toggleElaborationPlus : Elaboration -> Elaboration
toggleElaborationPlus elaboration =
    { elaboration | plus = not elaboration.plus }


setElaborationString1 : String -> Elaboration -> Elaboration
setElaborationString1 string elaboration =
    { elaboration | string1 = maybe string }


setElaborationString2 : String -> Elaboration -> Elaboration
setElaborationString2 string elaboration =
    { elaboration | string2 = maybe string }


setElaborationString3 : String -> Elaboration -> Elaboration
setElaborationString3 string elaboration =
    { elaboration | string3 = maybe string }


maybe : String -> Maybe String
maybe string =
    if String.length string == 0 then
        Nothing
    else
        Just string


setElaborationDisplacer : Maybe Displacer -> Elaboration -> Elaboration
setElaborationDisplacer displacer elaboration =
    { elaboration | displacer = displacer }


setElaborationDisplacerVerbality : Verbality -> Elaboration -> Elaboration
setElaborationDisplacerVerbality verbality elaboration =
    case elaboration.displacer of
        Just (Primary ( oldVerbality, status )) ->
            { elaboration | displacer = Just (Primary ( verbality, status )) }

        _ ->
            elaboration


setElaborationDisplacerVerbalityString : String -> Elaboration -> Elaboration
setElaborationDisplacerVerbalityString string elaboration =
    case elaboration.displacer of
        Just (Primary ( Do oldString ongoing passive, status )) ->
            { elaboration | displacer = Just (Primary ( Do string ongoing passive, status )) }

        _ ->
            elaboration


toggleElaborationDisplacerVerbalityOngoing : Elaboration -> Elaboration
toggleElaborationDisplacerVerbalityOngoing elaboration =
    case elaboration.displacer of
        Just (Primary ( Be ongoing, status )) ->
            { elaboration | displacer = Just (Primary ( Be (not ongoing), status )) }

        Just (Primary ( Do string ongoing passive, status )) ->
            { elaboration | displacer = Just (Primary ( Do string (not ongoing) passive, status )) }

        _ ->
            elaboration


toggleElaborationDisplacerVerbalityPassive : Elaboration -> Elaboration
toggleElaborationDisplacerVerbalityPassive elaboration =
    case elaboration.displacer of
        Just (Primary ( Do string ongoing passive, status )) ->
            { elaboration | displacer = Just (Primary ( Do string ongoing (not passive), status )) }

        _ ->
            elaboration


setElaborationDisplacerStatus : Maybe Status -> Elaboration -> Elaboration
setElaborationDisplacerStatus status elaboration =
    case elaboration.displacer of
        Just (Primary ( verbality, oldStatus )) ->
            { elaboration | displacer = Just (Primary ( verbality, status )) }

        _ ->
            elaboration


setElaborationDisplacerStatusString : String -> Elaboration -> Elaboration
setElaborationDisplacerStatusString string elaboration =
    case elaboration.displacer of
        Just (Primary ( verbality, status )) ->
            { elaboration | displacer = Just (Primary ( verbality, Just (Absolute string) )) }

        _ ->
            elaboration


setElaborationDisplacerStatusRelator : Relator -> Elaboration -> Elaboration
setElaborationDisplacerStatusRelator relator elaboration =
    case elaboration.displacer of
        Just (Primary ( verbality, status )) ->
            { elaboration | displacer = Just (Primary ( verbality, Just (Relative relator) )) }

        _ ->
            elaboration


setElaborationDisplacerModality : Modality -> Elaboration -> Elaboration
setElaborationDisplacerModality modality elaboration =
    { elaboration | displacer = Just (Secondary modality) }


setElaborationTarget : Int -> Elaboration -> Elaboration
setElaborationTarget int elaboration =
    { elaboration | target = int }


setElaborationPointer : Pointer -> Elaboration -> Elaboration
setElaborationPointer pointer elaboration =
    { elaboration | pointer = pointer }


setElaborationPointerObject : Object -> Elaboration -> Elaboration
setElaborationPointerObject object elaboration =
    { elaboration | pointer = RelatedTo object }


setElaborationPointerObjectString : String -> Elaboration -> Elaboration
setElaborationPointerObjectString string elaboration =
    case elaboration.pointer of
        RelatedTo (Other plural sex oldString) ->
            { elaboration | pointer = RelatedTo (Other plural sex (maybe string)) }

        _ ->
            elaboration


setElaborationQuantifier : Maybe Quantifier -> Elaboration -> Elaboration
setElaborationQuantifier quantifier elaboration =
    { elaboration | quantifier = quantifier }


setElaborationQuantifierInteger : String -> Elaboration -> Elaboration
setElaborationQuantifierInteger string elaboration =
    let
        int =
            Result.withDefault 0 (String.toInt string)
    in
        { elaboration | quantifier = Just (Integer int) }


toggleElaborationOther : Elaboration -> Elaboration
toggleElaborationOther elaboration =
    { elaboration | other = not elaboration.other }
