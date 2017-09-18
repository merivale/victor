module Interface.View.Buttons
    exposing
        ( toggleElaborations
        , addElaboration
        , addBalance
        , removeBalance
        )


import Html
import Html.Attributes as Attr
import Html.Events as Events
import Interface.Model.Types exposing (..)


toggleElaborations : Int -> Bool -> Html.Html Signal
toggleElaborations index plus =
    let
        signal =
            if index < 0 then
                TogglePlus
            else
                ToggleElaborationPlus index
    in
        if plus then
            iconButton
                { label = "minus"
                , signal = signal
                , title = "Hide Elaborations"
                }
        else
            iconButton
                { label = "plus"
                , signal = signal
                , title = "Show Elaborations"
                }


addElaboration : Int -> Recipe -> Html.Html Signal
addElaboration index recipe =
    button
        { label = String.dropLeft 4 (toString recipe)
        , signal = AddElaboration index recipe
        , title = "Add " ++ (String.dropLeft 4 (toString recipe)) ++ " Elaboration"
        }


addBalance : Html.Html Signal
addBalance =
    iconButton
        { label = "plus"
        , signal = AddBalance
        , title = "Add Balance"
        }


removeBalance : Html.Html Signal
removeBalance =
    iconButton
        { label = "close"
        , signal = RemoveBalance
        , title = "Remove Balance"
        }


button : ButtonProperties -> Html.Html Signal
button { label, signal, title } =
    Html.button
        [ Events.onClick signal
        , Attr.class "button"
        , Attr.title title
        ]
        [ Html.text label ]


iconButton : ButtonProperties -> Html.Html Signal
iconButton { label, signal, title } =
    Html.button
        [ Events.onClick signal
        , Attr.class ("button " ++ label)
        , Attr.title title
        ]
        []