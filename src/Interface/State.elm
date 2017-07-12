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
    , pivot = Be False Nothing
    , balances = [ ( Nothing, Just (Different (Other False (Just Male) (Just "Victor"))) ) ]
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
            { model | pivot = mergePivots pivot model.pivot }

        SetPivotSense sense ->
            case model.pivot of
                Seem oldSense ongoing property ->
                    { model | pivot = Seem sense ongoing property }

                _ ->
                    model

        SetPivotVerbality verbality ->
            case model.pivot of
                Do oldVerbality ongoing passive ->
                    { model | pivot = Do verbality ongoing passive }

                _ ->
                    model

        TogglePivotOngoing ->
            case model.pivot of
                Be ongoing property ->
                    { model | pivot = Be (not ongoing) property }

                Seem sense ongoing property ->
                    { model | pivot = Seem sense (not ongoing) property }

                Do verbality ongoing passive ->
                    { model | pivot = Do verbality (not ongoing) passive }

        TogglePivotPassive ->
            case model.pivot of
                Do verbality ongoing passive ->
                    { model | pivot = Do verbality ongoing (not passive) }

                _ ->
                    model

        SetPivotProperty property ->
            case model.pivot of
                Be ongoing oldProperty ->
                    { model | pivot = Be ongoing (maybe property) }

                Seem sense ongoing oldProperty ->
                    { model | pivot = Seem sense ongoing (maybe property) }

                _ ->
                    model

        AddBalance ->
            { model | balances = model.balances ++ [ ( Nothing, Nothing ) ] }

        RemoveBalance ->
            let
                lastIndex =
                    (List.length model.balances) - 1
            in
            { model
                | balances = List.take lastIndex model.balances
                , elaborations = List.filter (doesNotTarget lastIndex) model.elaborations
            }

        SetBalanceCounter index counter ->
            { model | balances = modifyItem index (setCounter counter) model.balances }

        SetBalanceWeight index weight ->
            { model | balances = modifyItem index (setWeight weight) model.balances }

        SetBalanceObject index object ->
            { model | balances = modifyItem index (setObject object) model.balances }

        SetBalanceObjectString index string ->
            { model | balances = modifyItem index (setObjectString string) model.balances }

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

<<<<<<< Updated upstream
        SetDisplacerPivotProperty index property ->
            { model | elaborations = modifyItem index (setDisplacerPivotProperty property) model.elaborations }

        SetDisplacerPivotSense index sense ->
            { model | elaborations = modifyItem index (setDisplacerPivotSense sense) model.elaborations }

        SetDisplacerPivotVerbality index verbality ->
            { model | elaborations = modifyItem index (setDisplacerPivotVerbality verbality) model.elaborations }
=======
        SetString3 index string ->
            { model | elaborations = modifyItem index (setString3 string) model.elaborations }
>>>>>>> Stashed changes

        SetDisplacedPivot index pivot ->
            { model | elaborations = modifyItem index (setDisplacedPivot pivot) model.elaborations }

        SetDisplacedPivotVerbality index verbality ->
            { model | elaborations = modifyItem index (setDisplacedPivotVerbality verbality) model.elaborations }

<<<<<<< Updated upstream
        SetDisplacerModality index modality ->
            { model | elaborations = modifyItem index (setDisplacerModality modality) model.elaborations }
=======
        ToggleDisplacedPivotOngoing index ->
            { model | elaborations = modifyItem index toggleDisplacedPivotOngoing model.elaborations }

        ToggleDisplacedPivotPassive index ->
            { model | elaborations = modifyItem index toggleDisplacedPivotPassive model.elaborations }

        SetDisplacedCounter index counter ->
            { model | elaborations = modifyItem index (setDisplacedCounter counter) model.elaborations }

        SetDisplacedCounterProperty index property ->
            { model | elaborations = modifyItem index (setDisplacedCounterProperty property) model.elaborations }
>>>>>>> Stashed changes

        SetDisplacedCounterRelator index relator ->
            { model | elaborations = modifyItem index (setDisplacedCounterRelator relator) model.elaborations }

        SetModality index modality ->
            { model | elaborations = modifyItem index (setModality modality) model.elaborations }

        SetTarget index target ->
            { model | elaborations = modifyItem index (setTarget target) model.elaborations }

        SetTargetInt index balanceIndex ->
            { model | elaborations = modifyItem index (setTargetInt balanceIndex) model.elaborations }

        SetPointer index pointer ->
            { model | elaborations = modifyItem index (setPointer pointer) model.elaborations }

        SetPointerObject index object ->
            { model | elaborations = modifyItem index (setPointerObject object) model.elaborations }

        SetPointerObjectString index string ->
            { model | elaborations = modifyItem index (setPointerObjectString string) model.elaborations }

        SetQuantifier index quantifier ->
            { model | elaborations = modifyItem index (setQuantifier quantifier) model.elaborations }

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


{-| Merge two pivots together. This is used to change the base type of pivot
without losing the existing values of any common arguments.
-}
mergePivots : Pivot -> Pivot -> Pivot
mergePivots pivot1 pivot2 =
    case ( pivot1, pivot2 ) of
        ( Be ongoing1 property1, Seem sense ongoing2 property2 ) ->
            Be ongoing2 property2

        ( Be ongoing1 property, Do verbality ongoing2 passive ) ->
            Be ongoing2 property

        ( Seem sense ongoing1 property1, Be ongoing2 property2 ) ->
            Seem sense ongoing2 property2

        ( Seem sense ongoing1 property, Do verbality ongoing2 passive ) ->
            Seem sense ongoing2 property

        ( Do verbality ongoing1 passive, Be ongoing2 property ) ->
            Do verbality ongoing2 passive

        ( Do verbality ongoing1 passive, Seem sense ongoing2 property ) ->
            Do verbality ongoing2 passive

        _ ->
            pivot1


{-| Check that an elaboration does not target the balancing object at the given
index. Used to remove any elaboration that does, when the corresponding balance
is deleted.
-}
doesNotTarget : Int -> Elaboration -> Bool
doesNotTarget balanceIndex elaboration =
    not (List.member elaboration.recipe [ MakeINDIRECT, MakeENUMERATED, MakeAMASSED ]
        && elaboration.target == BalancingObject balanceIndex)


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


<<<<<<< Updated upstream
elaborationDefault : Recipe -> Elaboration
elaborationDefault recipe =
    { plus = False
    , recipe = recipe
    , displacer = Nothing
    , string1 = Nothing
    , string2 = Nothing
    , string3 = Nothing
    , target = MainObject
    , pointer = The
    , quantifier = Nothing
    , other = False
    }


elaborationWithDisplacer : Recipe -> Elaboration
elaborationWithDisplacer recipe =
    { plus = False
    , recipe = recipe
    , displacer = Just (Primary (Be False Nothing))
    , string1 = Nothing
    , string2 = Nothing
    , string3 = Nothing
    , target = MainObject
    , pointer = The
    , quantifier = Nothing
    , other = False
    }


elaborationWithQuantifier : Recipe -> Elaboration
elaborationWithQuantifier recipe =
    { plus = False
    , recipe = recipe
    , displacer = Nothing
    , string1 = Nothing
    , string2 = Nothing
    , string3 = Nothing
    , target = MainObject
    , pointer = The
    , quantifier = Just Some
    , other = False
    }


=======
>>>>>>> Stashed changes
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
setCounter : Maybe Counter -> Balance -> Balance
setCounter counter ( oldCounter, weight ) =
    ( counter, weight )


setWeight : Maybe Weight -> Balance -> Balance
setWeight weight ( counter, oldWeight ) =
    ( counter, weight )


setObject : Object -> Balance -> Balance
setObject object ( counter, balance ) =
    case balance of
        Just (Different oldObject) ->
            ( counter, Just (Different object) )

        _ ->
            ( counter, balance )


setObjectString : String -> Balance -> Balance
setObjectString string ( counter, weight ) =
    case weight of
        Just (Different (Other plural sex oldString)) ->
            ( counter, Just (Different (Other plural sex (maybe string))) )

        _ ->
            ( counter, weight )


{-| Functions for modifying the components of an elaboration, used as arguments
to the modifyItem function above.
-}
togglePlus : Elaboration -> Elaboration
togglePlus elaboration =
    { elaboration | plus = not elaboration.plus }


<<<<<<< Updated upstream
setDisplacer : Maybe Displacer -> Elaboration -> Elaboration
setDisplacer displacer elaboration =
    { elaboration | displacer = displacer }


setDisplacerPivot : Pivot -> Elaboration -> Elaboration
setDisplacerPivot pivot1 elaboration =
    case elaboration.displacer of
        Just (Primary pivot2) ->
            { elaboration | displacer = Just (Primary (mergePivots pivot1 pivot2)) }

        _ ->
            elaboration


setDisplacerPivotSense : Maybe Sense -> Elaboration -> Elaboration
setDisplacerPivotSense sense elaboration =
    case elaboration.displacer of
        Just (Primary (Seem oldSense ongoing property)) ->
            { elaboration | displacer = Just (Primary (Seem sense ongoing property)) }

        _ ->
            elaboration
=======
setString1 : String -> Elaboration -> Elaboration
setString1 string elaboration =
    { elaboration | string1 = maybe string }

>>>>>>> Stashed changes

setString2 : String -> Elaboration -> Elaboration
setString2 string elaboration =
    { elaboration | string2 = maybe string }

<<<<<<< Updated upstream
setDisplacerPivotVerbality : Verbality -> Elaboration -> Elaboration
setDisplacerPivotVerbality verbality elaboration =
    case elaboration.displacer of
        Just (Primary (Do oldVerbality ongoing passive)) ->
            { elaboration | displacer = Just (Primary (Do verbality ongoing passive)) }
=======

setString3 : String -> Elaboration -> Elaboration
setString3 string elaboration =
    { elaboration | string3 = maybe string }
>>>>>>> Stashed changes


maybe : String -> Maybe String
maybe string =
    if String.length string == 0 then
        Nothing
    else
        Just string

<<<<<<< Updated upstream
toggleDisplacerPivotOngoing : Elaboration -> Elaboration
toggleDisplacerPivotOngoing elaboration =
    case elaboration.displacer of
        Just (Primary (Be ongoing property)) ->
            { elaboration | displacer = Just (Primary (Be (not ongoing) property)) }
=======

setDisplacedPivot : Pivot -> Elaboration -> Elaboration
setDisplacedPivot pivot elaboration =
    { elaboration | pivot = pivot }
>>>>>>> Stashed changes

        Just (Primary (Seem sense ongoing property)) ->
            { elaboration | displacer = Just (Primary (Seem sense (not ongoing) property)) }

<<<<<<< Updated upstream
        Just (Primary (Do verbality ongoing passive)) ->
            { elaboration | displacer = Just (Primary (Do verbality (not ongoing) passive)) }
=======
setDisplacedPivotVerbality : Verbality -> Elaboration -> Elaboration
setDisplacedPivotVerbality verbality elaboration =
    case elaboration.pivot of
        Do oldVerbality ongoing passive ->
            { elaboration | pivot = Do verbality ongoing passive }
>>>>>>> Stashed changes

        _ ->
            elaboration


<<<<<<< Updated upstream
toggleDisplacerPivotPassive : Elaboration -> Elaboration
toggleDisplacerPivotPassive elaboration =
    case elaboration.displacer of
        Just (Primary (Do verbality ongoing passive)) ->
            { elaboration | displacer = Just (Primary (Do verbality ongoing (not passive))) }
=======
toggleDisplacedPivotOngoing : Elaboration -> Elaboration
toggleDisplacedPivotOngoing elaboration =
    case elaboration.pivot of
        Be ongoing ->
            { elaboration | pivot = Be (not ongoing) }
>>>>>>> Stashed changes

        Do verbality ongoing passive ->
            { elaboration | pivot = Do verbality (not ongoing) passive }


<<<<<<< Updated upstream
setDisplacerPivotProperty : Property -> Elaboration -> Elaboration
setDisplacerPivotProperty property elaboration =
    case elaboration.displacer of
        Just (Primary (Be ongoing oldProperty)) ->
            { elaboration | displacer = Just (Primary (Be ongoing (maybe property))) }

        Just (Primary (Seem sense ongoing oldProperty)) ->
            { elaboration | displacer = Just (Primary (Seem sense ongoing (maybe property))) }
=======
toggleDisplacedPivotPassive : Elaboration -> Elaboration
toggleDisplacedPivotPassive elaboration =
    case elaboration.pivot of
        Do verbality ongoing passive ->
            { elaboration | pivot = Do verbality ongoing (not passive) }
>>>>>>> Stashed changes

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


setTarget : Target -> Elaboration -> Elaboration
setTarget target elaboration =
    { elaboration | target = target }


setTargetInt : Int -> Elaboration -> Elaboration
setTargetInt balanceIndex elaboration =
    { elaboration | target = BalancingObject balanceIndex }


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


toggleOther : Elaboration -> Elaboration
toggleOther elaboration =
    { elaboration | other = not elaboration.other }
