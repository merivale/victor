module Interface.Factors
    exposing
        ( object
        , pivot
        , balance
        , displacement
        , maybeDisplacement
        , frequency
        , time
        , duration
        , tally
        , target
        , pointer
        , enumeratedQuantifier
        , amassedQuantifier
        , haystack
        )

import Html
import Html.Attributes as Attr
import Interface.Types exposing (..)
import Interface.Ideas as Ideas
import Interface.Input as Input
import Theory.Types exposing (..)


{-| Select an object.
-}
object : Int -> Ingredients -> Html.Html Signal
object index ingredients =
    let
        content =
            if objectHasText ingredients.object then
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

        Other string ->
            True

        Others string ->
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
pivot : Int -> Ingredients -> Html.Html Signal
pivot index ingredients =
    Html.div
        [ Attr.class "factor" ]
        ((Input.label "Pivot") :: (pivotContent index ingredients))


pivotContent : Int -> Ingredients -> List (Html.Html Signal)
pivotContent index ingredients =
    case ingredients.pivot of
        Be string ongoing ->
            [ pivotSelect index ingredients.pivot
            , pivotProperty index ingredients.pivotProperty
            , pivotOngoing index ingredients.ongoing
            ]

        Do string ongoing passive ->
            [ pivotSelect index ingredients.pivot
            , pivotVerb index ingredients.pivotVerb
            , pivotOngoing index ingredients.ongoing
            , pivotPassive index ingredients.passive
            ]


pivotSelect : Int -> Pivot -> Html.Html Signal
pivotSelect index pivot =
    Input.select
        { value = pivot
        , options = Ideas.pivots
        , signal = SetPivot index
        , toLabel = Ideas.pivotToString
        }


pivotProperty : Int -> String -> Html.Html Signal
pivotProperty index pivotString =
    Input.text
        { value = pivotString
        , placeholder = "e.g. able, eager, happy (optional)"
        , signal = SetPivotProperty index
        }


pivotVerb : Int -> String -> Html.Html Signal
pivotVerb index pivotVerb =
    Input.text
        { value = pivotVerb
        , placeholder = "e.g. have, like, want"
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
balance : Int -> Ingredients -> Html.Html Signal
balance index ingredients =
    let
        content =
            case ingredients.balance of
                Nothing ->
                    [ balanceSelect index ingredients ]

                Just balance ->
                    case balance of
                        SameObject ->
                            [ balanceSelect index ingredients ]

                        IndependentObject object ->
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


balanceSelect : Int -> Ingredients -> Html.Html Signal
balanceSelect index ingredients =
    Input.select
        { value = ingredients.balance
        , options = Ideas.balances
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


{-| Select a displacement.
-}
displacement : Bool -> Int -> Ingredients -> Html.Html Signal
displacement limitModalities index ingredients =
    let
        options =
            case ingredients.displacement of
                Primary pivot ->
                    pivotContent index ingredients

                Secondary mod ->
                    secondaryContent limitModalities index ingredients

        displacementSelect =
            Input.select
                { value = ingredients.displacement
                , options = Ideas.displacements
                , signal = SetDisplacement index
                , toLabel = Ideas.displacementToString
                }
    in
        Html.div
            [ Attr.class "factor" ]
            ((Input.label "Displacement") :: (displacementSelect :: options))


maybeDisplacement : Bool -> Int -> Ingredients -> Html.Html Signal
maybeDisplacement limitModalities index ingredients =
    let
        options =
            case ingredients.maybeDisplacement of
                Nothing ->
                    []

                Just (Primary pivot) ->
                    pivotContent index ingredients

                Just (Secondary mod) ->
                    secondaryContent limitModalities index ingredients

        displacementSelect =
            Input.select
                { value = ingredients.maybeDisplacement
                , options = Ideas.maybeDisplacements
                , signal = SetMaybeDisplacement index
                , toLabel = Ideas.maybeDisplacementToString
                }
    in
        Html.div
            [ Attr.class "factor" ]
            ((Input.label "Displacement") :: (displacementSelect :: options))


secondaryContent : Bool -> Int -> Ingredients -> List (Html.Html Signal)
secondaryContent limitModalities index ingredients =
    let
        options =
            if limitModalities then
               Ideas.limitedModalities
            else
                Ideas.unlimitedModalities
    in
        [ Input.select
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

                    Other string ->
                        Html.div
                            [ Attr.class "factor" ]
                            [ Input.label "Pointer"
                            , pointerSelect
                            , objectSelect
                            , objectText
                            , other
                            ]

                    Others string ->
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


{-| Haystack.
-}
haystack : Int -> Ingredients -> Html.Html Signal
haystack index ingredients =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Haystack"
        , Input.text
            { value = ingredients.category
            , placeholder = "category (e.g. apple, water)"
            , signal = SetCategory index
            }
        , Input.text
            { value = ingredients.description
            , placeholder = "description (e.g. red, happy, interesting)"
            , signal = SetDescription index
            }
        , Input.text
            { value = ingredients.restriction
            , placeholder = "restriction (e.g. in the room, of France)"
            , signal = SetRestriction index
            }
        ]
