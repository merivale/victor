module Interface.View.Output exposing (output)

{-| Display the output sentence (or error message).
-}

import Char
import Html
import Html.Attributes as Attr
import Interface.Model.Types exposing (..)
import Result


{-| Output.
-}
output : Result String String -> Html.Html Signal
output result =
    case result of
        Err error ->
            Html.div
                [ Attr.class "output error" ]
                [ Html.text error ]

        Ok sentence ->
            Html.div
                [ Attr.class "output" ]
                [ Html.text (format sentence) ]


{-| Format a sentence (i.e. capitalise the first letter and put a full stop at
the end).
-}
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
