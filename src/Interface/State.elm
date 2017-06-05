module Interface.State exposing (initial, update)

{-| The application state.
-}

import Array
import Interface.Types exposing (..)
import Theory.Types exposing (..)


{-| The initial application state.
-}
initial : Model
initial =
    Array.fromList [ MakePlain ingredients ]


{-| Default ingredients for new elaborations.
-}
ingredients : Ingredients
ingredients =
    { showElaborations = False
    , object = Speaker
    , objectString = ""
    , pivot = Be Nothing False
    , pivotProperty = ""
    , pivotVerb = ""
    , ongoing = False
    , passive = False
    , balance = Just (IndependentObject Speaker)
    , balanceString = ""
    , balanceObject = Male Nothing
    , balanceObjectString = "Victor"
    , displacement = Secondary SoftYes
    , maybeDisplacement = Nothing
    , modality = SoftYes
    , multiPurposeString = ""
    , target = MainObject
    , pointer = The
    , pointerObject = Speaker
    , pointerObjectString = ""
    , enumeratedQuantifier = A
    , amassedQuantifier = Nothing
    , other = False
    , category = ""
    , description = ""
    , restriction = ""
    }


{-| The update function.
-}
update : Signal -> Model -> Model
update signal model =
    case signal of
        RemoveElaborationRecipe index ->
            case Array.get index model of
                Nothing ->
                    model

                Just recipe ->
                    case recipe of
                        MakePlain ingredients ->
                            model

                        MakeElaborate elaborationRecipe oldIndex ingredients ->
                            replaceRecipe index oldIndex model

        AddElaborationRecipe index elaborationRecipe ->
            case Array.get index model of
                Nothing ->
                    model

                Just oldRecipe ->
                    let
                        newRecipe =
                            MakeElaborate elaborationRecipe (Array.length model) ingredients

                        extendedModel =
                            Array.push oldRecipe model

                        tweakedModel =
                            setIngredient (Array.length model) extendedModel toggleShowElaborations
                    in
                        Array.set index newRecipe tweakedModel

        ToggleShowElaborations index ->
            setIngredient index model toggleShowElaborations

        SetObject index object ->
            setIngredient index model (setObject object)

        SetObjectString index string ->
            setIngredient index model (setObjectString string)

        SetPivot index pivot ->
            setIngredient index model (setPivot pivot)

        SetPivotProperty index string ->
            setIngredient index model (setPivotProperty string)

        SetPivotVerb index string ->
            setIngredient index model (setPivotVerb string)

        ToggleOngoing index ->
            setIngredient index model toggleOngoing

        TogglePassive index ->
            setIngredient index model togglePassive

        SetBalance index balance ->
            setIngredient index model (setBalance balance)

        SetBalanceString index string ->
            setIngredient index model (setBalanceString string)

        SetBalanceObject index object ->
            setIngredient index model (setBalanceObject object)

        SetBalanceObjectString index string ->
            setIngredient index model (setBalanceObjectString string)

        SetDisplacement index displacement ->
            setIngredient index model (setDisplacement displacement)

        SetMaybeDisplacement index displacement ->
            setIngredient index model (setMaybeDisplacement displacement)

        SetModality index modality ->
            setIngredient index model (setModality modality)

        SetMultiPurposeString index string ->
            setIngredient index model (setMultiPurposeString string)

        SetTarget index target ->
            setIngredient index model (setTarget target)

        SetPointer index pointer ->
            setIngredient index model (setPointer pointer)

        SetPointerObject index object ->
            setIngredient index model (setPointerObject object)

        SetPointerObjectString index string ->
            setIngredient index model (setPointerObjectString string)

        SetEnumeratedQuantifier index quantifier ->
            setIngredient index model (setEnumeratedQuantifier quantifier)

        SetAmassedQuantifier index quantifier ->
            setIngredient index model (setAmassedQuantifier quantifier)

        ToggleOther index ->
            setIngredient index model toggleOther

        SetCategory index string ->
            setIngredient index model (setCategory string)

        SetDescription index string ->
            setIngredient index model (setDescription string)

        SetRestriction index string ->
            setIngredient index model (setRestriction string)


{-| Function for replacing one recipe with another.
-}
replaceRecipe : Int -> Int -> Model -> Model
replaceRecipe index oldIndex model =
    case Array.get oldIndex model of
        Nothing ->
            model

        Just oldRecipe ->
            Array.set index oldRecipe model


{-| Functions for updating ingredients.
-}
setIngredient : Int -> Model -> (Ingredients -> Ingredients) -> Model
setIngredient index model changed =
    case Array.get index model of
        Nothing ->
            model

        Just recipe ->
            case recipe of
                MakePlain ingredients ->
                    Array.set index (MakePlain (changed ingredients)) model

                MakeElaborate simpleRecipe subIndex ingredients ->
                    Array.set index (MakeElaborate simpleRecipe subIndex (changed ingredients)) model


toggleShowElaborations : Ingredients -> Ingredients
toggleShowElaborations ingredients =
    { ingredients | showElaborations = not ingredients.showElaborations }


setObject : Object -> Ingredients -> Ingredients
setObject object ingredients =
    { ingredients | object = object }


setObjectString : String -> Ingredients -> Ingredients
setObjectString string ingredients =
    { ingredients | objectString = string }


setPivot : Pivot -> Ingredients -> Ingredients
setPivot pivot ingredients =
    { ingredients | pivot = pivot }


setPivotProperty : String -> Ingredients -> Ingredients
setPivotProperty string ingredients =
    if String.length string > 0 then
        { ingredients | pivotProperty = string, balance = Nothing }
    else
        { ingredients | pivotProperty = string }


setPivotVerb : String -> Ingredients -> Ingredients
setPivotVerb string ingredients =
    { ingredients | pivotVerb = string }


toggleOngoing : Ingredients -> Ingredients
toggleOngoing ingredients =
    { ingredients | ongoing = not ingredients.ongoing }


togglePassive : Ingredients -> Ingredients
togglePassive ingredients =
    { ingredients | passive = not ingredients.passive }


setBalance : Maybe Balance -> Ingredients -> Ingredients
setBalance balance ingredients =
    if balance == Nothing then
        { ingredients | balance = balance }
    else
        { ingredients | balance = balance, pivotProperty = "" }


setBalanceString : String -> Ingredients -> Ingredients
setBalanceString string ingredients =
    { ingredients | balanceString = string }


setBalanceObject : Object -> Ingredients -> Ingredients
setBalanceObject object ingredients =
    { ingredients | balanceObject = object }


setBalanceObjectString : String -> Ingredients -> Ingredients
setBalanceObjectString string ingredients =
    { ingredients | balanceObjectString = string }


setDisplacement : Displacement -> Ingredients -> Ingredients
setDisplacement displacement ingredients =
    { ingredients | displacement = displacement }


setMaybeDisplacement : Maybe Displacement -> Ingredients -> Ingredients
setMaybeDisplacement displacement ingredients =
    { ingredients | maybeDisplacement = displacement }


setModality : Modality -> Ingredients -> Ingredients
setModality modality ingredients =
    { ingredients | modality = modality }


setMultiPurposeString : String -> Ingredients -> Ingredients
setMultiPurposeString string ingredients =
    { ingredients | multiPurposeString = string }


setTarget : Target -> Ingredients -> Ingredients
setTarget target ingredients =
    { ingredients | target = target }


setPointer : Pointer -> Ingredients -> Ingredients
setPointer pointer ingredients =
    { ingredients | pointer = pointer }


setPointerObject : Object -> Ingredients -> Ingredients
setPointerObject object ingredients =
    { ingredients | pointerObject = object }


setPointerObjectString : String -> Ingredients -> Ingredients
setPointerObjectString string ingredients =
    { ingredients | pointerObjectString = string }


setEnumeratedQuantifier : Quantifier -> Ingredients -> Ingredients
setEnumeratedQuantifier quantifier ingredients =
    { ingredients | enumeratedQuantifier = quantifier }


setAmassedQuantifier : Maybe Quantifier -> Ingredients -> Ingredients
setAmassedQuantifier quantifier ingredients =
    { ingredients | amassedQuantifier = quantifier }


toggleOther : Ingredients -> Ingredients
toggleOther ingredients =
    { ingredients | other = not ingredients.other }


setCategory : String -> Ingredients -> Ingredients
setCategory string ingredients =
    { ingredients | category = string }


setDescription : String -> Ingredients -> Ingredients
setDescription string ingredients =
    { ingredients | description = string }


setRestriction : String -> Ingredients -> Ingredients
setRestriction string ingredients =
    { ingredients | restriction = string }
