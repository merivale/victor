module Plain exposing (main)

{-| The application for the first layer of the theory (plain messages).
-}

import Html
import Interface.Messages.Plain as Messages
import Interface.Model.State as State
import Interface.Model.Types exposing (..)
import Interface.View.Examples as Examples
import Interface.View.Nucleus as Nucleus
import Interface.View.Output as Output
import Result
import Theory.Plain.Sentences as Sentences


{-| Run the application.
-}
main : Program Never Model Signal
main =
    Html.beginnerProgram
        { model = State.initial PlainTheory
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
        , Examples.examples PlainTheory
        , Nucleus.nucleus PlainTheory model
        ]
