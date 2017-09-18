module Short exposing (main)


{-| The application for the second layer of the theory (short messages).
-}
import Html
import Html.Attributes as Attr
import Html.Events as Events
import Result
import Interface.Model.Types exposing (..)
import Interface.Model.State as State
import Interface.Messages.Short as Messages
import Interface.View.Output as Output
import Interface.View.Examples as Examples
import Interface.View.Input as Input
import Interface.View.Nucleus as Nucleus
import Interface.View.Elaborations as Elaborations
import Theory.Short.Sentences as Sentences


{-| Run the application.
-}
main : Program Never Model Signal
main =
    Html.beginnerProgram
        { model = State.initial ShortTheory
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
            , Examples.examples ShortTheory
            , input (List.reverse model.elaborations) model
            ]


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
        [ Attr.class "nucleus" ]
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

        MakePREORDAINED ->
            Html.div
                [ Attr.class "body" ]
                [ Elaborations.preordainedTime index elaboration
                , subContent
                ]

        MakeREGULAR ->
            Html.div
                [ Attr.class "body" ]
                [ Elaborations.frequency index elaboration
                , subContent
                ]

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
                    , MakeREGULAR
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
