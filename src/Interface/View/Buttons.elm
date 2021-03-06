module Interface.View.Buttons
    exposing
        ( addBalance
        , elaborationButtons
        , removeBalance
        , removeElaboration
        , toggleElaborations
        )

{-| This module creates a few buttons used in the interface.
-}

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


elaborationButtons : Int -> Bool -> Html.Html Signal
elaborationButtons index plus =
    let
        class =
            if plus then
                "elaborations active"
            else
                "elaborations"
    in
        Html.div [ Attr.class class ]
            [ Html.div []
                (List.map (addElaboration index)
                    [ MakeNEGATIVE
                    , MakePAST
                    , MakePRIOR
                    , MakeDISPLACED
                    , MakeREGULAR
                    , MakePREORDAINED
                    ]
                )
            , Html.div []
                (List.map (addElaboration index)
                    [ MakeEXTENDED
                    , MakeSCATTERED
                    , MakeINDIRECT
                    , MakeENUMERATED
                    , MakeAMASSED
                    ]
                )
            ]


addElaboration : Int -> Recipe -> Html.Html Signal
addElaboration index recipe =
    button
        { label = String.dropLeft 4 (toString recipe)
        , signal = AddElaboration index recipe
        , title = "Add " ++ String.dropLeft 4 (toString recipe) ++ " Elaboration"
        }


removeElaboration : Int -> Html.Html Signal
removeElaboration index =
    iconButton
        { label = "close"
        , signal = RemoveElaboration index
        , title = "Remove Elaboration"
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
