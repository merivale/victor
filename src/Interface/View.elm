module Interface.View exposing (root)

{-| HTML for displaying the current state of the application.
-}

import Array
import Char
import Html
import Html.Attributes as Attr
import Html.Events as Events
import Result exposing (andThen)
import Interface.Types exposing (..)
import Interface.Factors as Factors
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
        [ Html.header []
            [ Html.h1 []
                [ Html.text "Victor: A Model of the English Code" ]
            ]
        , Html.main_ []
            [ output model
            , input 0 False False model
            ]
        , Html.footer []
            [ Html.ul []
                [ Html.li []
                    [ Html.a [ Attr.href "http://www.merivale.uk/" ]
                        [ Html.text "Amyas Merivale" ]
                    ]
                , Html.li []
                    [ Html.a [ Attr.href "https://github.com/merivale/victor" ]
                        [ Html.text "View Source on GitHub" ]
                    ]
                ]
            ]
        ]


output : Model -> Html.Html Signal
output model =
    case Messages.message 0 model |> andThen Sentences.sentence of
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


input : Int -> Bool -> Bool -> Model -> Html.Html Signal
input index mainOverride balanceOverride model =
    case Array.get index model of
        Nothing ->
            Html.div
                [ Attr.class "input error" ]
                [ Html.text "recipe index out of range" ]

        Just recipe ->
            case recipe of
                MakePlain ingredients ->
                    nucleus index mainOverride balanceOverride ingredients

                MakeElaborate elaborationRecipe subIndex ingredients ->
                    elaboration index mainOverride balanceOverride elaborationRecipe subIndex ingredients model


nucleus : Int -> Bool -> Bool -> Ingredients -> Html.Html Signal
nucleus index mainOverride balanceOverride ingredients =
    Input.input
        { elaborationRecipe = Nothing
        , showElaborations = ingredients.showElaborations
        , index = index
        , body =
            [ Factors.object index mainOverride ingredients
            , Factors.pivot index ingredients False
            , Factors.balance index balanceOverride ingredients
            ]
        }


elaboration : Int -> Bool -> Bool -> ElaborationRecipe -> Int -> Ingredients -> Model -> Html.Html Signal
elaboration index mainOverride balanceOverride elaborationRecipe subIndex ingredients model =
    Input.input
        { elaborationRecipe = Just elaborationRecipe
        , showElaborations = ingredients.showElaborations
        , index = index
        , body =
            case elaborationRecipe of
                MakeExpanded ->
                    [ Factors.pivot index ingredients True
                    , input subIndex mainOverride balanceOverride model
                    ]

                MakePractical ->
                    [ Factors.limitedModality index ingredients
                    , input subIndex mainOverride balanceOverride model
                    ]

                MakeEvasive ->
                    [ Factors.limitedModality index ingredients
                    , Factors.frequency index ingredients
                    , input subIndex mainOverride balanceOverride model
                    ]

                MakeProjective ->
                    [ Factors.unlimitedModality index ingredients
                    , Factors.time index ingredients
                    , input subIndex mainOverride balanceOverride model
                    ]

                MakePreordained ->
                    [ Factors.time index ingredients
                    , input subIndex mainOverride balanceOverride model
                    ]

                MakeRegular ->
                    [ Factors.frequency index ingredients
                    , input subIndex mainOverride balanceOverride model
                    ]

                MakeExtended ->
                    [ Factors.duration index ingredients
                    , input subIndex mainOverride balanceOverride model
                    ]

                MakeScattered ->
                    [ Factors.tally index ingredients
                    , input subIndex mainOverride balanceOverride model
                    ]

                MakeIndirect ->
                    [ Factors.target index ingredients
                    , Factors.pointer index ingredients
                    , Factors.indirectCategory index ingredients
                    , Factors.categoryFlanks index ingredients
                    , inputWithOverride ingredients.target subIndex mainOverride balanceOverride model
                    ]

                MakeEnumerated ->
                    [ Factors.target index ingredients
                    , Factors.enumeratedQuantifier index ingredients
                    , Factors.enumeratedCategory index ingredients
                    , Factors.categoryFlanks index ingredients
                    , inputWithOverride ingredients.target subIndex mainOverride balanceOverride model
                    ]

                MakeAmassed ->
                    [ Factors.target index ingredients
                    , Factors.amassedQuantifier index ingredients
                    , Factors.amassedCategory index ingredients
                    , Factors.categoryFlanks index ingredients
                    , inputWithOverride ingredients.target subIndex mainOverride balanceOverride model
                    ]

                a ->
                    [ input subIndex mainOverride balanceOverride model ]
        }


inputWithOverride : Target -> Int -> Bool -> Bool -> Model -> Html.Html Signal
inputWithOverride target index mainOverride balanceOverride model =
    case target of
        MainObject ->
            input index True balanceOverride model

        BalancingObject ->
            input index mainOverride True model
