module Interface.Factors
    exposing
        ( object
        , pivot
        , balance
        , limitedModality
        , unlimitedModality
        , frequency
        , time
        , duration
        , tally
        , target
        , pointer
        , enumeratedQuantifier
        , amassedQuantifier
        , indirectCategory
        , enumeratedCategory
        , amassedCategory
        , categoryFlanks
        )

import Html
import Html.Attributes as Attr
import Interface.Types exposing (..)
import Interface.Ideas as Ideas
import Interface.Input as Input
import Theory.Types exposing (..)


{-| Select an object.
-}
object : Int -> Bool -> Ingredients -> Html.Html Signal
object index override ingredients =
    let
        content =
            if override then
                [ Html.div
                    [ Attr.class "text override" ]
                    [ Html.text ("main object has been overridden") ]
                ]
            else if objectHasText ingredients.object then
                [ objectSelect index ingredients.object
                , objectText index ingredients.objectString
                ]
            else
                [ objectSelect index ingredients.object ]
    in
        Html.div
            [ Attr.class "factor" ]
            ((Input.label "Object") :: content)


objectHasText : Object -> Bool
objectHasText object =
    case object of
        Male string ->
            True

        Female string ->
            True

        Thing string ->
            True

        PeopleOrThings string ->
            True

        _ ->
            False


objectSelect : Int -> Object -> Html.Html Signal
objectSelect index object =
    Input.selectGroup Ideas.objectGroups
        { value = object
        , options = Ideas.objects
        , signal = SetObject index
        , toLabel = Ideas.objectToString
        }


objectText : Int -> String -> Html.Html Signal
objectText index objectString =
    Input.text
        { value = objectString
        , placeholder = "name (optional)"
        , signal = SetObjectString index
        }


{-| Select a pivot.
-}
pivot : Int -> Ingredients -> Bool -> Html.Html Signal
pivot index ingredients expanded =
    let
        content =
            case ingredients.pivot of
                Be string ongoing ->
                    if expanded then
                        [ pivotSelect index ingredients.pivot
                        , pivotProperty index ingredients.pivotProperty True
                        ]
                    else if ingredients.balance == Nothing then
                        [ pivotSelect index ingredients.pivot
                        , pivotProperty index ingredients.pivotProperty False
                        , pivotOngoing index ingredients.ongoing
                        ]
                    else
                        [ pivotSelect index ingredients.pivot
                        , pivotOngoing index ingredients.ongoing
                        ]

                Do string ongoing passive ->
                    [ pivotSelect index ingredients.pivot
                    , pivotVerb index ingredients.pivotVerb expanded
                    , pivotOngoing index ingredients.ongoing
                    , pivotPassive index ingredients.passive
                    ]
    in
        Html.div
            [ Attr.class "factor" ]
            ((Input.label "Pivot") :: content)


pivotSelect : Int -> Pivot -> Html.Html Signal
pivotSelect index pivot =
    Input.select
        { value = pivot
        , options = Ideas.pivots
        , signal = SetPivot index
        , toLabel = Ideas.pivotToString
        }


pivotProperty : Int -> String -> Bool -> Html.Html Signal
pivotProperty index pivotString expanded =
    let
        placeholder =
            if expanded then
                "e.g. able, eager, likely (optional)"
            else
                "e.g. happy, healthy, hungry (optional)"
    in
        Input.text
            { value = pivotString
            , placeholder = placeholder
            , signal = SetPivotProperty index
            }


pivotVerb : Int -> String -> Bool -> Html.Html Signal
pivotVerb index pivotVerb expanded =
    let
        placeholder =
            if expanded then
                "e.g. have, need, want"
            else
                "e.g. dance, eat, sing"
    in
        Input.text
            { value = pivotVerb
            , placeholder = placeholder
            , signal = SetPivotVerb index
            }


pivotOngoing : Int -> Bool -> Html.Html Signal
pivotOngoing index ongoing =
    Input.checkbox
        { id = "ongoing" ++ (toString index)
        , label = "Ongoing"
        , checked = ongoing
        , signal = ToggleOngoing index
        }


pivotPassive : Int -> Bool -> Html.Html Signal
pivotPassive index passive =
    Input.checkbox
        { id = "passive" ++ (toString index)
        , label = "Passive"
        , checked = passive
        , signal = TogglePassive index
        }


{-| Select a balance.
-}
balance : Int -> Bool -> Ingredients -> Html.Html Signal
balance index override ingredients =
    let
        content =
            if pivotIsBeSomething ingredients then
                [ Html.div
                    [ Attr.class "text override" ]
                    [ Html.text ("Nothing") ]
                ]
            else
                case ingredients.balance of
                    Nothing ->
                        [ balanceSelect index ingredients ]

                    Just balance ->
                        case balance of
                            SameObject ->
                                [ balanceSelect index ingredients ]

                            IndependentObject object ->
                                if override then
                                    [ balanceSelect index ingredients
                                    , Html.div
                                        [ Attr.class "text override" ]
                                        [ Html.text ("balancing object has been overridden") ]
                                    ]
                                else
                                    [ balanceSelect index ingredients
                                    , balanceObjectSelect index ingredients.balanceObject
                                    , balanceObjectText index ingredients.balanceObjectString
                                    ]

                            CustomBalance string ->
                                [ balanceSelect index ingredients
                                , customBalanceText index ingredients.balanceString
                                ]
    in
        Html.div
            [ Attr.class "factor" ]
            ((Input.label "Balance") :: content)


pivotIsBeSomething : Ingredients -> Bool
pivotIsBeSomething ingredients =
    case ingredients.pivot of
        Be property ongoing ->
            String.length ingredients.pivotProperty > 0

        Do verb ongoing passive ->
            False


balanceSelect : Int -> Ingredients -> Html.Html Signal
balanceSelect index ingredients =
    let
        options =
            case ingredients.pivot of
                Be property ongoing ->
                    Ideas.balancesWithoutCustom

                Do verb ongoing passive ->
                    Ideas.balancesWithCustom
    in
        Input.select
            { value = ingredients.balance
            , options = options
            , signal = SetBalance index
            , toLabel = Ideas.balanceToString
            }


balanceObjectSelect : Int -> Object -> Html.Html Signal
balanceObjectSelect index balanceObject =
    Input.select
        { value = balanceObject
        , options = Ideas.objects
        , signal = SetBalanceObject index
        , toLabel = Ideas.objectToString
        }


balanceObjectText : Int -> String -> Html.Html Signal
balanceObjectText index balanceObjectString =
    Input.text
        { value = balanceObjectString
        , placeholder = "name (optional)"
        , signal = SetBalanceObjectString index
        }


customBalanceText : Int -> String -> Html.Html Signal
customBalanceText index balanceString =
    Input.text
        { value = balanceString
        , placeholder = "custom balance"
        , signal = SetBalanceString index
        }


{-| Select a modality.
-}
limitedModality : Int -> Ingredients -> Html.Html Signal
limitedModality index ingredients =
    modality Ideas.limitedModalities index ingredients


unlimitedModality : Int -> Ingredients -> Html.Html Signal
unlimitedModality index ingredients =
    modality Ideas.unlimitedModalities index ingredients


modality : List Modality -> Int -> Ingredients -> Html.Html Signal
modality options index ingredients =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Modality"
        , Input.select
            { value = ingredients.modality
            , options = options
            , signal = SetModality index
            , toLabel = Ideas.modalityToString
            }
        ]


{-| Set multipurpose string factors.
-}
frequency : Int -> Ingredients -> Html.Html Signal
frequency index ingredients =
    multiPurposeString
        index
        ingredients.multiPurposeString
        "Frequency"
        "e.g. usually, sometimes, occasionally"


time : Int -> Ingredients -> Html.Html Signal
time index ingredients =
    multiPurposeString
        index
        ingredients.multiPurposeString
        "Time"
        "e.g. tomorrow, next week"


duration : Int -> Ingredients -> Html.Html Signal
duration index ingredients =
    multiPurposeString
        index
        ingredients.multiPurposeString
        "Duration"
        "e.g. for a while, for two hours, all day"


tally : Int -> Ingredients -> Html.Html Signal
tally index ingredients =
    multiPurposeString
        index
        ingredients.multiPurposeString
        "Tally"
        "e.g. once, twice, several times"


multiPurposeString : Int -> String -> String -> String -> Html.Html Signal
multiPurposeString index value label placeholder =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label label
        , Input.text
            { value = value
            , placeholder = placeholder
            , signal = SetMultiPurposeString index
            }
        ]


{-| Select target for indirect/enumerated/amassed elaboration.
-}
target : Int -> Ingredients -> Html.Html Signal
target index ingredients =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Target"
        , Input.radio ("target" ++ (toString index))
            { id = "targetMainObject" ++ (toString index)
            , label = "Main Object"
            , checked = ingredients.target == MainObject
            , signal = SetTarget index MainObject
            }
        , Input.radio ("target" ++ (toString index))
            { id = "targetBalancingObject" ++ (toString index)
            , label = "Balancing Object"
            , checked = ingredients.target == BalancingObject
            , signal = SetTarget index BalancingObject
            }
        ]


{-| Select a pointer for indirect elaborations.
-}
pointer : Int -> Ingredients -> Html.Html Signal
pointer index ingredients =
    let
        pointerSelect =
            Input.select
                { value = ingredients.pointer
                , options = Ideas.pointers
                , signal = SetPointer index
                , toLabel = Ideas.pointerToString
                }

        objectSelect =
            Input.select
                { value = ingredients.pointerObject
                , options = Ideas.objects
                , signal = SetPointerObject index
                , toLabel = Ideas.objectToString
                }

        objectText =
            Input.text
                { value = ingredients.pointerObjectString
                , placeholder = "name (optional)"
                , signal = SetPointerObjectString index
                }

        other =
            Input.checkbox
                { id = "other" ++ (toString index)
                , label = "Other"
                , checked = ingredients.other
                , signal = ToggleOther index
                }
    in
        case ingredients.pointer of
            RelatedTo object ->
                case ingredients.pointerObject of
                    Male string ->
                        Html.div
                            [ Attr.class "factor" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , objectText
                            , other
                            ]

                    Female string ->
                        Html.div
                            [ Attr.class "factor" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , objectText
                            , other
                            ]

                    Thing string ->
                        Html.div
                            [ Attr.class "factor" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , objectText
                            , other
                            ]

                    PeopleOrThings string ->
                        Html.div
                            [ Attr.class "factor" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , objectText
                            , other
                            ]

                    _ ->
                        Html.div
                            [ Attr.class "factor" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , other
                            ]

            _ ->
                Html.div
                    [ Attr.class "factor" ]
                    [ Input.label "Pointer"
                    , pointerSelect
                    , other
                    ]


{-| Select a quantifier for enumerated elaborations.
-}
enumeratedQuantifier : Int -> Ingredients -> Html.Html Signal
enumeratedQuantifier index ingredients =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Quantifier"
        , Input.select
            { value = ingredients.enumeratedQuantifier
            , options = Ideas.enumeratedQuantifiers
            , signal = SetEnumeratedQuantifier index
            , toLabel = toString
            }
        , Input.checkbox
            { id = "other" ++ (toString index)
            , label = "Other"
            , checked = ingredients.other
            , signal = ToggleOther index
            }
        ]


{-| Select a quantifier for amassed elaborations.
-}
amassedQuantifier : Int -> Ingredients -> Html.Html Signal
amassedQuantifier index ingredients =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Quantifier"
        , Input.select
            { value = ingredients.amassedQuantifier
            , options = Ideas.amassedQuantifiers
            , signal = SetAmassedQuantifier index
            , toLabel = Ideas.maybeQuantifierToString
            }
        , Input.checkbox
            { id = "other" ++ (toString index)
            , label = "Other"
            , checked = ingredients.other
            , signal = ToggleOther index
            }
        ]


{-| Set categories for indirect/enumerated/amassed elaborations.
-}
indirectCategory : Int -> Ingredients -> Html.Html Signal
indirectCategory index ingredients =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Category"
        , Input.text
            { value = ingredients.category
            , placeholder = "e.g. apple, banana, air, water"
            , signal = SetCategory index
            }
        , Input.checkbox
            { id = "indirectPlural" ++ (toString index)
            , label = "Plural"
            , checked = ingredients.plural
            , signal = TogglePlural index
            }
        ]


enumeratedCategory : Int -> Ingredients -> Html.Html Signal
enumeratedCategory index ingredients =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Category"
        , Input.text
            { value = ingredients.category
            , placeholder = "e.g. apple, banana"
            , signal = SetCategory index
            }
        ]


amassedCategory : Int -> Ingredients -> Html.Html Signal
amassedCategory index ingredients =
    let
        examples =
            if ingredients.plural then
                "e.g. apple, banana"
            else
                "e.g. air, water"
    in
        Html.div
            [ Attr.class "factor" ]
            [ Input.label "Category"
            , Input.text
                { value = ingredients.category
                , placeholder = examples
                , signal = SetCategory index
                }
            , Input.checkbox
                { id = "countable" ++ (toString index)
                , label = "Countable"
                , checked = ingredients.plural
                , signal = TogglePlural index
                }
            ]


categoryFlanks : Int -> Ingredients -> Html.Html Signal
categoryFlanks index ingredients =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Flanks"
        , Input.text
            { value = ingredients.description
            , placeholder = "description (e.g. red, happy, interesting)"
            , signal = SetDescription index
            }
        , Input.text
            { value = ingredients.restriction
            , placeholder = "restriction (e.g. in the room, over there, of France)"
            , signal = SetRestriction index
            }
        ]
