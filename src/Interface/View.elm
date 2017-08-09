module Interface.View exposing (root)

{-| HTML for displaying the current state of the application, together with
inputs for the user to modify the application state.
-}

import Char
import Html
import Html.Attributes as Attr
import Html.Events as Events
import Result exposing (andThen)
import Interface.Types exposing (..)
import Interface.Nucleus as Nucleus
import Interface.Elaborations as Elaborations
import Interface.Input as Input
import Interface.State as State
import Interface.Messages as Messages
import Theory.Types exposing (..)
import Theory.Sentences as Sentences


{-| The root display for export.
-}
root : Model -> Html.Html Signal
root model =
    Html.div []
        [ output model
        , input (List.reverse model.elaborations) model
        , help
        ]


{-| Output.
-}
output : Model -> Html.Html Signal
output model =
    case Messages.message model |> andThen Sentences.sentence of
        Err error ->
            Html.div
                [ Attr.class "output error" ]
                [ Html.text error ]

        Ok sentence ->
            Html.div
                [ Attr.class "output" ]
                [ Html.text (format sentence) ]


format : String -> String
format sentence =
    let
        ucFirst =
            case String.uncons sentence of
                Nothing ->
                    String.toUpper sentence

                Just ( firstLetter, rest ) ->
                    String.cons (Char.toUpper firstLetter) rest
    in
        String.append ucFirst "."


{-| Input.
-}
input : List Elaboration -> Model -> Html.Html Signal
input elaborations model =
    case List.head elaborations of
        Nothing ->
            nucleusInput model

        Just elaboration ->
            let
                index =
                    (List.length elaborations) - 1

                subContent =
                    input (List.drop 1 elaborations) model
            in
                elaborationInput (List.length model.balances) index elaboration subContent


nucleusInput : Model -> Html.Html Signal
nucleusInput model =
    Html.div
        [ Attr.class "input" ]
        [ nucleusHeading model
        , elaborationButtons -1 model.plus
        , nucleusBody model
        ]


nucleusHeading : Model -> Html.Html Signal
nucleusHeading model =
    let
        title =
            Html.div [ Attr.class "title" ] [ Html.text "Nucleus" ]

        removeButton =
            Input.iconButton
                { label = "close"
                , signal = RemoveBalance
                , title = "Remove Balance"
                }

        addButton =
            Input.iconButton
                { label = "plus"
                , signal = AddBalance
                , title = "Add Balance"
                }
    in
        if List.length model.balances > 0 then
            Html.div
                [ Attr.class "heading" ]
                [ plusButton -1 model.plus, title, removeButton, addButton ]
        else
            Html.div
                [ Attr.class "heading" ]
                [ plusButton -1 model.plus, title, addButton ]


nucleusBody : Model -> Html.Html Signal
nucleusBody model =
    Html.div
        [ Attr.class "body" ]
        ([ Nucleus.object model.object, Nucleus.verbality model.verbality, Nucleus.status model.status ]
            ++ (List.indexedMap Nucleus.balance model.balances)
        )


elaborationInput : Int -> Int -> Elaboration -> Html.Html Signal -> Html.Html Signal
elaborationInput balanceCount index elaboration subContent =
    Html.div
        [ Attr.class "input" ]
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

        MakeINDIRECT ->
            Html.div
                [ Attr.class "body" ]
                [ Elaborations.target balanceCount index elaboration
                , Elaborations.pointer index elaboration
                , Elaborations.haystack index elaboration
                , subContent
                ]

        MakeENUMERATED ->
            Html.div
                [ Attr.class "body" ]
                [ Elaborations.target balanceCount index elaboration
                , Elaborations.quantifier False index elaboration
                , Elaborations.haystack index elaboration
                , subContent
                ]

        MakeAMASSED ->
            Html.div
                [ Attr.class "body" ]
                [ Elaborations.target balanceCount index elaboration
                , Elaborations.quantifier True index elaboration
                , Elaborations.haystack index elaboration
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
                    , MakeREGULAR
                    , MakePREORDAINED
                    ]
                )
            , Html.div []
                (List.map (elaborationButton index)
                    [ MakeEXTENDED
                    , MakeSCATTERED
                    , MakeINDIRECT
                    , MakeENUMERATED
                    , MakeAMASSED
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
                , Html.a [ Attr.href "https://github.com/merivale/victor/" ] [ Html.text "README on GitHub" ]
                , Html.text " for an explanation of the philosophical context of the model."
                ]
            ]
        ]
