module Interface.Nucleus
    exposing
        ( object
        , pivot
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
        Be ongoing property ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Pivot"
                , pivotSelect pivot
                , Input.emptyInput
                , pivotOngoing ongoing
                , pivotProperty property
                ]

        Seem sense ongoing property ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Pivot"
                , pivotSelect pivot
                , pivotSenseSelect sense
                , pivotOngoing ongoing
                , pivotProperty property
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


balance : Int -> Balance -> Html.Html Signal
balance index ( counter, weight ) =
    case weight of
        Nothing ->
            Html.div
                [ Attr.class "factor balance" ]
                [ Input.label ("Balance " ++ (toString (index + 1)))
                , counterSelect index counter
                , weightSelect index weight
                , Input.emptyInput
                , Input.emptyInput
                ]

        Just SameObject ->
            Html.div
                [ Attr.class "factor balance" ]
                [ Input.label ("Balance " ++ (toString (index + 1)))
                , counterSelect index counter
                , weightSelect index weight
                , Input.emptyInput
                , Input.emptyInput
                ]

        Just (Different object) ->
            Html.div
                [ Attr.class "factor balance" ]
                [ Input.label ("Balance " ++ (toString (index + 1)))
                , counterSelect index counter
                , weightSelect index weight
                , weightObjectSelect index object
                , weightObjectText index object
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


pivotSenseSelect : Maybe Sense -> Html.Html Signal
pivotSenseSelect sense =
    Input.select
        { value = sense
        , options = Ideas.listSenses
        , equivalent = (==)
        , signal = SetPivotSense
        , toLabel = Ideas.displaySense
        }


counterSelect : Int -> Maybe Counter -> Html.Html Signal
counterSelect index counter =
    Input.select
        { value = counter
        , options = Ideas.listCounters
        , equivalent = (==)
        , signal = SetBalanceCounter index
        , toLabel = Ideas.displayCounter
        }


weightSelect : Int -> Maybe Weight -> Html.Html Signal
weightSelect index weight =
    Input.select
        { value = weight
        , options = Ideas.listWeights
        , equivalent = Ideas.equateWeights
        , signal = SetBalanceWeight index
        , toLabel = Ideas.displayWeight
        }


weightObjectSelect : Int -> Object -> Html.Html Signal
weightObjectSelect index object =
    Input.selectGroup Ideas.listObjectGroups
        { value = object
        , options = Ideas.listObjects
        , equivalent = Ideas.equateObjects
        , signal = SetBalanceObject index
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


pivotProperty : Maybe Property -> Html.Html Signal
pivotProperty property =
    Input.text
        { value = Maybe.withDefault "" property
        , placeholder = "e.g. able, eager, happy (optional)"
        , signal = SetPivotProperty
        , disabled = False
        }


pivotVerbality : Verbality -> Html.Html Signal
pivotVerbality verbality =
    Input.text
        { value = verbality
        , placeholder = "e.g. have, like, want"
        , signal = SetPivotVerbality
        , disabled = False
        }


weightObjectText : Int -> Object -> Html.Html Signal
weightObjectText index object =
    Input.text
        { value = Maybe.withDefault "" (Ideas.objectString object)
        , placeholder = "name (optional)"
        , signal = SetBalanceObjectString index
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
