module Interface.Nucleus
    exposing
        ( object
        , pivot
        , counter
        , balance
        )

{-| Module for generating HTML for user input for the nucleus of the message.
-}

import Html
import Html.Attributes as Attr
import Interface.Types exposing (..)
import Interface.Ideas as Ideas
import Interface.Input as Input
import Theory.Types exposing (..)


{-| The output functions, for displaying nucleus factor inputs.
-}
object : Object -> Html.Html Signal
object object =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Object"
        , objectSelect object
        , objectText object
        ]


pivot : Pivot -> Html.Html Signal
pivot pivot =
    case pivot of
        Be ongoing ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Pivot"
                , pivotSelect pivot
                , Input.emptyInput
                , pivotOngoing ongoing
                , Input.emptyInput
                ]

        Do verbality ongoing passive ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Pivot"
                , pivotSelect pivot
                , pivotVerbality verbality
                , pivotOngoing ongoing
                , pivotPassive passive
                ]


counter : Maybe Counter -> Html.Html Signal
counter counter =
    case counter of
        Nothing ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Counter"
                , counterSelect counter
                , Input.emptyInput
                ]

        Just (CounterProperty property) ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Counter"
                , counterSelect counter
                , counterProperty property
                ]

        Just (CounterRelator relator) ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Counter"
                , counterSelect counter
                , counterRelatorSelect relator
                ]


balance : Int -> Balance -> Html.Html Signal
balance index ( relator, weight ) =
    case weight of
        SameAsMain ->
            Html.div
                [ Attr.class "factor balance" ]
                [ Input.label ("Balance " ++ (toString (index + 1)))
                , balanceRelatorSelect index relator
                , balanceWeightSelect index weight
                , Input.emptyInput
                , Input.emptyInput
                ]

        Different object ->
            Html.div
                [ Attr.class "factor balance" ]
                [ Input.label ("Balance " ++ (toString (index + 1)))
                , balanceRelatorSelect index relator
                , balanceWeightSelect index weight
                , balanceWeightObjectSelect index object
                , balanceWeightObjectText index object
                ]


{-| Select dropdowns, used by the main output functions above.
-}
objectSelect : Object -> Html.Html Signal
objectSelect object =
    Input.selectGroup Ideas.listObjectGroups
        { value = object
        , options = Ideas.listObjects
        , equivalent = Ideas.equateObjects
        , signal = SetObject
        , toLabel = Ideas.displayObject
        }


pivotSelect : Pivot -> Html.Html Signal
pivotSelect pivot =
    Input.select
        { value = pivot
        , options = Ideas.listPivots
        , equivalent = Ideas.equatePivots
        , signal = SetPivot
        , toLabel = Ideas.displayPivot
        }


counterSelect : Maybe Counter -> Html.Html Signal
counterSelect counter =
    Input.select
        { value = counter
        , options = Ideas.listCounters
        , equivalent = Ideas.equateCounters
        , signal = SetCounter
        , toLabel = Ideas.displayCounter
        }


counterRelatorSelect : Relator -> Html.Html Signal
counterRelatorSelect relator =
    Input.select
        { value = relator
        , options = Ideas.listRelators
        , equivalent = (==)
        , signal = SetCounterRelator
        , toLabel = toString
        }


balanceRelatorSelect : Int -> Maybe Relator -> Html.Html Signal
balanceRelatorSelect index relator =
    Input.select
        { value = relator
        , options = Ideas.listMaybeRelators
        , equivalent = (==)
        , signal = SetBalanceRelator index
        , toLabel = Ideas.displayMaybeRelator
        }


balanceWeightSelect : Int -> Weight -> Html.Html Signal
balanceWeightSelect index weight =
    Input.select
        { value = weight
        , options = Ideas.listWeights
        , equivalent = Ideas.equateWeights
        , signal = SetBalanceWeight index
        , toLabel = Ideas.displayWeight
        }


balanceWeightObjectSelect : Int -> Object -> Html.Html Signal
balanceWeightObjectSelect index object =
    Input.selectGroup Ideas.listObjectGroups
        { value = object
        , options = Ideas.listObjects
        , equivalent = Ideas.equateObjects
        , signal = SetBalanceWeightObject index
        , toLabel = Ideas.displayObject
        }


{-| Text inputs, used by the main output functions above.
-}
objectText : Object -> Html.Html Signal
objectText object =
    Input.text
        { value = Maybe.withDefault "" (Ideas.objectString object)
        , placeholder = "name (optional)"
        , signal = SetObjectString
        , disabled = not (Ideas.objectHasString object)
        }


pivotVerbality : Verbality -> Html.Html Signal
pivotVerbality verbality =
    Input.text
        { value = verbality
        , placeholder = "e.g. have, like, want"
        , signal = SetPivotVerbality
        , disabled = False
        }


counterProperty : Property -> Html.Html Signal
counterProperty property =
    Input.text
        { value = property
        , placeholder = "e.g. able, eager, happy (optional)"
        , signal = SetCounterProperty
        , disabled = False
        }


balanceWeightObjectText : Int -> Object -> Html.Html Signal
balanceWeightObjectText index object =
    Input.text
        { value = Maybe.withDefault "" (Ideas.objectString object)
        , placeholder = "name (optional)"
        , signal = SetBalanceWeightObjectString index
        , disabled = not (Ideas.objectHasString object)
        }


{-| Input checkboxes, used by the main output functions above.
-}
pivotOngoing : Bool -> Html.Html Signal
pivotOngoing ongoing =
    Input.checkbox
        { id = "ongoing"
        , label = "Ongoing"
        , checked = ongoing
        , signal = TogglePivotOngoing
        }


pivotPassive : Bool -> Html.Html Signal
pivotPassive passive =
    Input.checkbox
        { id = "passive"
        , label = "Passive"
        , checked = passive
        , signal = TogglePivotPassive
        }
