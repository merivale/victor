module Interface.View.Nucleus exposing (nucleus)

{-| Module for generating HTML inputs for the nucleus of a message.
-}

import Html
import Html.Attributes as Attr
import Interface.Model.Types exposing (..)
import Interface.View.Buttons as Buttons
import Interface.View.Ideas as Ideas
import Interface.View.Input as Input
import Theory.Plain.Nucleus exposing (..)


{-| The nucleus input box.
-}
nucleus : Model -> Html.Html Signal
nucleus model =
    Html.div
        [ Attr.class "nucleus" ]
        [ heading True model
        , Buttons.elaborationButtons -1 model.plus
        , body model
        ]


heading : Bool -> Model -> Html.Html Signal
heading toggleButton model =
    let
        left =
            if toggleButton then
                [ Buttons.toggleElaborations -1 model.plus
                , Html.div [ Attr.class "title" ] [ Html.text "Nucleus" ]
                ]
            else
                [ Html.div [ Attr.class "title" ] [ Html.text "Nucleus" ] ]

        right =
            if List.length model.balances > 0 then
                [ Buttons.removeBalance, Buttons.addBalance ]
            else
                [ Buttons.addBalance ]
    in
    Html.div [ Attr.class "heading" ] (left ++ right)


body : Model -> Html.Html Signal
body model =
    Html.div
        [ Attr.class "body" ]
        ([ object model.object, verbality model.verbality, status model.status ]
            ++ List.indexedMap balance model.balances
        )


{-| Functions for displaying the nucleus factors.
-}
object : Object -> Html.Html Signal
object object =
    Input.factor "Object"
        [ objectSelect object
        , objectText object
        ]


verbality : Verbality -> Html.Html Signal
verbality verbality =
    case verbality of
        Be ongoing ->
            Input.factor "Verbality"
                [ verbalitySelect verbality
                , Input.emptyInput
                , verbalityOngoing ongoing
                , Input.emptyInput
                ]

        Do string ongoing passive ->
            Input.factor "Verbality"
                [ verbalitySelect verbality
                , verbalityString string
                , verbalityOngoing ongoing
                , verbalityPassive passive
                ]


status : Maybe Status -> Html.Html Signal
status status =
    case status of
        Nothing ->
            Input.factor "Status"
                [ statusSelect status
                , Input.emptyInput
                ]

        Just (Absolute string) ->
            Input.factor "Status"
                [ statusSelect status
                , statusString string
                ]

        Just (Relative relator) ->
            Input.factor "Status"
                [ statusSelect status
                , statusRelatorSelect relator
                ]


balance : Int -> Balance -> Html.Html Signal
balance index ( relator, weight ) =
    case weight of
        SameAsMain ->
            Input.factor ("Balance " ++ toString (index + 1))
                [ balanceRelatorSelect index relator
                , balanceWeightSelect index weight
                , Input.emptyInput
                , Input.emptyInput
                ]

        Different object ->
            Input.factor ("Balance " ++ toString (index + 1))
                [ balanceRelatorSelect index relator
                , balanceWeightSelect index weight
                , balanceWeightObjectSelect index object
                , balanceWeightObjectText index object
                ]


{-| Select dropdowns, used by the main exposed functions above.
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


verbalitySelect : Verbality -> Html.Html Signal
verbalitySelect verbality =
    Input.select
        { value = verbality
        , options = Ideas.listVerbalities
        , equivalent = Ideas.equateVerbalities
        , signal = SetVerbality
        , toLabel = Ideas.displayVerbality
        }


statusSelect : Maybe Status -> Html.Html Signal
statusSelect status =
    Input.select
        { value = status
        , options = Ideas.listStatuses
        , equivalent = Ideas.equateStatuses
        , signal = SetStatus
        , toLabel = Ideas.displayStatus
        }


statusRelatorSelect : Relator -> Html.Html Signal
statusRelatorSelect relator =
    Input.select
        { value = relator
        , options = Ideas.listRelators
        , equivalent = (==)
        , signal = SetStatusRelator
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


{-| Text inputs, used by the main exposed functions above.
-}
objectText : Object -> Html.Html Signal
objectText object =
    Input.text
        { value = Maybe.withDefault "" (Ideas.objectString object)
        , placeholder = "name (optional)"
        , signal = SetObjectString
        , disabled = not (Ideas.objectHasString object)
        }


verbalityString : String -> Html.Html Signal
verbalityString string =
    Input.text
        { value = string
        , placeholder = "e.g. have, like, want"
        , signal = SetVerbalityString
        , disabled = False
        }


statusString : String -> Html.Html Signal
statusString string =
    Input.text
        { value = string
        , placeholder = "e.g. able, eager, happy (optional)"
        , signal = SetStatusString
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


{-| Input checkboxes, used by the main exposed functions above.
-}
verbalityOngoing : Bool -> Html.Html Signal
verbalityOngoing ongoing =
    Input.checkbox
        { id = "ongoing"
        , label = "Ongoing"
        , checked = ongoing
        , signal = ToggleVerbalityOngoing
        }


verbalityPassive : Bool -> Html.Html Signal
verbalityPassive passive =
    Input.checkbox
        { id = "passive"
        , label = "Passive"
        , checked = passive
        , signal = ToggleVerbalityPassive
        }
