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
            , input 0 model
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


input : Int -> Model -> Html.Html Signal
input index model =
    case Array.get index model of
        Nothing ->
            Html.div
                [ Attr.class "input error" ]
                [ Html.text "recipe index out of range" ]

        Just recipe ->
            case recipe of
                MakePlain ingredients ->
                    nucleus index ingredients

                MakeElaborate elaborationRecipe subIndex ingredients ->
                    elaboration index elaborationRecipe subIndex ingredients model


nucleus : Int -> Ingredients -> Html.Html Signal
nucleus index ingredients =
    Input.input
        { elaborationRecipe = Nothing
        , showElaborations = ingredients.showElaborations
        , index = index
        , body =
            [ Factors.object index ingredients
            , Factors.pivot index ingredients
            , Factors.balance index ingredients
            ]
        }


elaboration : Int -> ElaborationRecipe -> Int -> Ingredients -> Model -> Html.Html Signal
elaboration index elaborationRecipe subIndex ingredients model =
    Input.input
        { elaborationRecipe = Just elaborationRecipe
        , showElaborations = ingredients.showElaborations
        , index = index
        , body =
            case elaborationRecipe of
                MakeDirect ->
                    [ Factors.displacement False index ingredients
                    , input subIndex model
                    ]

                MakeEvasive ->
                    [ Factors.maybeDisplacement True index ingredients
                    , Factors.frequency index ingredients
                    , input subIndex model
                    ]

                MakeFuture ->
                    [ Factors.maybeDisplacement False index ingredients
                    , Factors.time index ingredients
                    , input subIndex model
                    ]

                MakeExtended ->
                    [ Factors.duration index ingredients
                    , input subIndex model
                    ]

                MakeScattered ->
                    [ Factors.tally index ingredients
                    , input subIndex model
                    ]

                MakeIndirect ->
                    [ Factors.target index ingredients
                    , Factors.pointer index ingredients
                    , Factors.haystack index ingredients
                    , input subIndex model
                    ]

                MakeEnumerated ->
                    [ Factors.target index ingredients
                    , Factors.enumeratedQuantifier index ingredients
                    , Factors.haystack index ingredients
                    , input subIndex model
                    ]

                MakeAmassed ->
                    [ Factors.target index ingredients
                    , Factors.amassedQuantifier index ingredients
                    , Factors.haystack index ingredients
                    , input subIndex model
                    ]

                a ->
                    [ input subIndex model ]
        }
