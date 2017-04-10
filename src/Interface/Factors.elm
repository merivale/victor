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
        , apparentStyle
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


object : Int -> Maybe Override -> Ingredients -> Html.Html Signal
object index override ingredients =
    case override of
        Nothing ->
            let
                select =
                    Input.selectGroup Ideas.objectGroups
                        { value = ingredients.object
                        , options = Ideas.objects
                        , signal = SetObject index
                        , toLabel = Ideas.objectToString
                        }

                text =
                    Input.text
                        { value = ingredients.objectString
                        , placeholder = "name (optional)"
                        , signal = SetObjectString index
                        }
            in
                case ingredients.object of
                    Male string ->
                        Html.div
                            [ Attr.class "factor object" ]
                            [ Input.label "Object"
                            , select
                            , text
                            ]

                    Female string ->
                        Html.div
                            [ Attr.class "factor object" ]
                            [ Input.label "Object"
                            , select
                            , text
                            ]

                    Thing string ->
                        Html.div
                            [ Attr.class "factor object" ]
                            [ Input.label "Object"
                            , select
                            , text
                            ]

                    PeopleOrThings string ->
                        Html.div
                            [ Attr.class "factor object" ]
                            [ Input.label "Object"
                            , select
                            , text
                            ]

                    a ->
                        Html.div
                            [ Attr.class "factor object" ]
                            [ Input.label "Object"
                            , select
                            ]

        Just override ->
            Html.div
                [ Attr.class "factor object" ]
                [ Input.label "Object"
                , Html.div
                    [ Attr.class "text override" ]
                    [ Html.text ("main object has been overridden by an " ++ (overrideToString override) ++ " elaboration") ]
                ]


overrideToString : Override -> String
overrideToString override =
    case override of
        IndirectOverride ->
            "indirect"

        EnumeratedOverride ->
            "enumerated"

        AmassedOverride ->
            "amassed"


pivot : Int -> Ingredients -> Html.Html Signal
pivot index ingredients =
    Html.div
        [ Attr.class "factor pivot" ]
        [ Input.label "Pivot"
        , Input.text
            { value = ingredients.pivot
            , placeholder = "e.g. be, eat, like"
            , signal = SetPivot index
            }
        , Input.checkbox
            { id = "abbreviateFulcrum" ++ (toString index)
            , label = "Abbreviate Fulcrum"
            , checked = ingredients.multiPurposeStyle1
            , signal = ToggleMultiPurposeStyle1 index
            }
        , Input.checkbox
            { id = "abbreviateNot" ++ (toString index)
            , label = "Abbreviate 'Not'"
            , checked = ingredients.multiPurposeStyle2
            , signal = ToggleMultiPurposeStyle2 index
            }
        ]


balance : Int -> Maybe Override -> Ingredients -> Html.Html Signal
balance index override ingredients =
    let
        balanceSelect =
            Input.select
                { value = ingredients.balance
                , options = Ideas.balances
                , signal = SetBalance index
                , toLabel = Ideas.balanceToString
                }

        objectSelect =
            Input.select
                { value = ingredients.balanceObject
                , options = Ideas.objects
                , signal = SetBalanceObject index
                , toLabel = Ideas.objectToString
                }

        objectText =
            Input.text
                { value = ingredients.balanceObjectString
                , placeholder = "name (optional)"
                , signal = SetBalanceObjectString index
                }

        customText =
            Input.text
                { value = ingredients.balanceString
                , placeholder = "custom balance"
                , signal = SetBalanceString index
                }
    in
        case ingredients.balance of
            Nothing ->
                Html.div
                    [ Attr.class "factor balance" ]
                    [ Input.label "Balance"
                    , balanceSelect
                    ]

            Just balance ->
                case balance of
                    SameObject ->
                        Html.div
                            [ Attr.class "factor balance" ]
                            [ Input.label "Balance"
                            , balanceSelect
                            ]

                    IndependentObject object ->
                        case override of
                            Nothing ->
                                Html.div
                                    [ Attr.class "factor balance" ]
                                    [ Input.label "Balance"
                                    , balanceSelect
                                    , objectSelect
                                    , objectText
                                    ]

                            Just override ->
                                Html.div
                                    [ Attr.class "factor object" ]
                                    [ Input.label "Balance"
                                    , balanceSelect
                                    , Html.div
                                        [ Attr.class "text override" ]
                                        [ Html.text ("balancing object has been overridden by an " ++ (overrideToString override) ++ " elaboration") ]
                                    ]

                    CustomBalance string ->
                        Html.div
                            [ Attr.class "factor balance" ]
                            [ Input.label "Balance"
                            , balanceSelect
                            , customText
                            ]


limitedModality : Int -> Ingredients -> Html.Html Signal
limitedModality index ingredients =
    modality Ideas.limitedModalities index ingredients


unlimitedModality : Int -> Ingredients -> Html.Html Signal
unlimitedModality index ingredients =
    modality Ideas.unlimitedModalities index ingredients


modality : List Modality -> Int -> Ingredients -> Html.Html Signal
modality options index ingredients =
    Html.div
        [ Attr.class "factor modality" ]
        [ Input.label "Modality"
        , Input.select
            { value = ingredients.modality
            , options = options
            , signal = SetModality index
            , toLabel = Ideas.modalityToString
            }
        ]


frequency : Int -> Ingredients -> Html.Html Signal
frequency index ingredients =
    Html.div
        [ Attr.class "factor frequency" ]
        [ Input.label "Frequency"
        , Input.text
            { value = ingredients.multiPurposeString
            , placeholder = "e.g. usually, sometimes, occasionally"
            , signal = SetMultiPurposeString index
            }
        ]


time : Int -> Ingredients -> Html.Html Signal
time index ingredients =
    Html.div
        [ Attr.class "factor time" ]
        [ Input.label "Time"
        , Input.text
            { value = ingredients.multiPurposeString
            , placeholder = "e.g. tomorrow, next week"
            , signal = SetMultiPurposeString index
            }
        ]


duration : Int -> Ingredients -> Html.Html Signal
duration index ingredients =
    Html.div
        [ Attr.class "factor duration" ]
        [ Input.label "Duration"
        , Input.text
            { value = ingredients.multiPurposeString
            , placeholder = "e.g. for a while, for two hours, all day"
            , signal = SetMultiPurposeString index
            }
        ]


tally : Int -> Ingredients -> Html.Html Signal
tally index ingredients =
    Html.div
        [ Attr.class "factor tally" ]
        [ Input.label "Tally"
        , Input.text
            { value = ingredients.multiPurposeString
            , placeholder = "e.g. once, twice, several times"
            , signal = SetMultiPurposeString index
            }
        ]


apparentStyle : Int -> Ingredients -> Html.Html Signal
apparentStyle index ingredients =
    Html.div
        [ Attr.class "factor apparentStyle" ]
        [ Input.label "Style"
        , Input.checkbox
            { id = "apparentStyle" ++ (toString index)
            , label = "Use 'Seem' instead of 'Appear'"
            , checked = ingredients.multiPurposeStyle1
            , signal = ToggleMultiPurposeStyle1 index
            }
        ]


target : Int -> Ingredients -> Html.Html Signal
target index ingredients =
    Html.div
        [ Attr.class "factor target" ]
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
                            [ Attr.class "factor pointer" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , objectText
                            , other
                            ]

                    Female string ->
                        Html.div
                            [ Attr.class "factor pointer" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , objectText
                            , other
                            ]

                    Thing string ->
                        Html.div
                            [ Attr.class "factor pointer" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , objectText
                            , other
                            ]

                    PeopleOrThings string ->
                        Html.div
                            [ Attr.class "factor pointer" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , objectText
                            , other
                            ]

                    _ ->
                        Html.div
                            [ Attr.class "factor pointer" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , other
                            ]

            _ ->
                Html.div
                    [ Attr.class "factor pointer" ]
                    [ Input.label "Pointer"
                    , pointerSelect
                    , other
                    ]


enumeratedQuantifier : Int -> Ingredients -> Html.Html Signal
enumeratedQuantifier index ingredients =
    Html.div
        [ Attr.class "factor quantifier" ]
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


amassedQuantifier : Int -> Ingredients -> Html.Html Signal
amassedQuantifier index ingredients =
    Html.div
        [ Attr.class "factor quantifier" ]
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


indirectCategory : Int -> Ingredients -> Html.Html Signal
indirectCategory index ingredients =
    Html.div
        [ Attr.class "factor category" ]
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
        [ Attr.class "factor category" ]
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
            [ Attr.class "factor category" ]
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
        [ Attr.class "factor description" ]
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
