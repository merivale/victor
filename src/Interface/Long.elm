module Long exposing (main)


{-| The application for the third layer of the theory (long messages).
-}
import Html
import Html.Attributes as Attr
import Html.Events as Events
import Result
import Interface.Model.Types exposing (..)
import Interface.Model.State as State
import Interface.Messages.Long as Messages
import Interface.View.Output as Output
import Interface.View.Examples as Examples
import Interface.View.Input as Input
import Interface.View.Nucleus as Nucleus
import Interface.View.Elaborations as Elaborations
import Theory.Long.Sentences as Sentences


{-| Run the application.
-}
main : Program Never Model Signal
main =
    Html.beginnerProgram
        { model = State.initial LongTheory
        , update = State.update
        , view = view
        }


{-| The view.
-}
view : Model -> Html.Html Signal
view model =
    let
        result =
            Messages.message model |> Result.andThen Sentences.sentence
    in
        Html.div []
            [ Output.output result
            , Examples.examples LongTheory
            , input (List.reverse model.elaborations) model
            ]


{-| Input.
-}
input : List Elaboration -> Model -> Html.Html Signal
input elaborations model =
    case List.head elaborations of
        Nothing ->
            Nucleus.nucleus LongTheory model

        Just elaboration ->
            let
                index =
                    (List.length elaborations) - 1

                subContent =
                    input (List.drop 1 elaborations) model
            in
                elaborationInput (List.length model.balances) index elaboration subContent


elaborationInput : Int -> Int -> Elaboration -> Html.Html Signal -> Html.Html Signal
elaborationInput balanceCount index elaboration subContent =
    Html.div
        [ Attr.class "elaboration" ]
        [ elaborationHeading index elaboration
        , elaborationButtons index elaboration.plus
        , elaborationBody balanceCount index elaboration subContent
        ]


elaborationHeading : Int -> Elaboration -> Html.Html Signal
elaborationHeading index elaboration =
    Html.div
        [ Attr.class "heading" ]
        [ plusButton index elaboration.plus
        , Html.div
            [ Attr.class "title" ]
            [ Html.text (String.dropLeft 4 (toString elaboration.recipe)) ]
        , Input.iconButton
            { label = "close"
            , signal = RemoveElaboration index
            , title = "Remove Elaboration"
            }
        ]


elaborationBody : Int -> Int -> Elaboration -> Html.Html Signal -> Html.Html Signal
elaborationBody balanceCount index elaboration subContent =
    case elaboration.recipe of
        MakePAST ->
            Html.div
                [ Attr.class "body" ]
                [ Elaborations.pastTime index elaboration
                , subContent
                ]

        MakeDISPLACED ->
            Html.div
                [ Attr.class "body" ]
                ((Elaborations.displacer True True index elaboration)
                    ++ [ subContent ]
                )

        MakePREORDAINED ->
            Html.div
                [ Attr.class "body" ]
                ((Elaborations.displacer False False index elaboration)
                    ++ [ Elaborations.preordainedTime index elaboration
                       , subContent
                       ]
                )

        MakeREGULAR ->
            Html.div
                [ Attr.class "body" ]
                ((Elaborations.displacer False True index elaboration)
                    ++ [ Elaborations.frequency index elaboration
                       , subContent
                       ]
                )

        MakeEXTENDED ->
            Html.div
                [ Attr.class "body" ]
                [ Elaborations.duration index elaboration
                , subContent
                ]

        MakeSCATTERED ->
            Html.div
                [ Attr.class "body" ]
                [ Elaborations.tally index elaboration
                , subContent
                ]

        _ ->
            Html.div
                [ Attr.class "body" ]
                [ subContent ]


plusButton : Int -> Bool -> Html.Html Signal
plusButton index plus =
    let
        signal =
            if index < 0 then
                TogglePlus
            else
                ToggleElaborationPlus index
    in
        if plus then
            Input.iconButton
                { label = "minus"
                , signal = signal
                , title = "Hide Elaborations"
                }
        else
            Input.iconButton
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
        Html.div
            [ Attr.class class ]
            [ Html.div []
                (List.map (elaborationButton index)
                    [ MakeNEGATIVE
                    , MakePAST
                    , MakePRIOR
                    , MakeDISPLACED
                    ]
                )
            , Html.div []
                (List.map (elaborationButton index)
                    [ MakeREGULAR
                    , MakePREORDAINED
                    , MakeEXTENDED
                    , MakeSCATTERED
                    ]
                )
            ]


elaborationButton : Int -> Recipe -> Html.Html Signal
elaborationButton index recipe =
    Input.button
        { label = String.dropLeft 4 (toString recipe)
        , signal = AddElaboration index recipe
        , title = "Add " ++ (String.dropLeft 4 (toString recipe)) ++ " Elaboration"
        }


{-| Help.
-}
help : Html.Html Signal
help =
    Html.div [ Attr.class "help" ]
        [ Html.div []
            [ Html.h2 []
                [ Html.text "Help" ]
            , Html.p []
                [ Html.text "Victor is a model of the English language, thought of as a code for processing "
                , Html.em [] [ Html.text "messages" ]
                , Html.text " (structured arrangements of informational choices) into "
                , Html.em [] [ Html.text "sentences" ]
                , Html.text " (strings of words). Use the blue input box directly above to generate your message; the corresponding sentence will show up in the green output box at the top."]
            , Html.p []
                [ Html.text "For exposition purposes, the model is divided into four layers of increasing complexity. If you are new to the theory, start with "
                , Html.a [ Attr.href "plain.html" ] [ Html.text "Plain Messages" ]
                , Html.text ", and move up from there. See the "
                , Html.a [ Attr.href "https://github.com/merivale/victor/" ] [ Html.text "README" ]
                , Html.text " for further details."
                ]
            ]
        ]
