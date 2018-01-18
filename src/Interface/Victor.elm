module Victor exposing (main)

{-| The application for the full theory.
-}

import Html
import Interface.Model.Messages as Messages
import Interface.Model.State as State
import Interface.Model.Types exposing (..)
import Interface.View.Elaborations as Elaborations
import Interface.View.Output as Output
import Result
import Theory.Sentences as Sentences


{-| Run the application.
-}
main : Program Never Model Signal
main =
    Html.beginnerProgram
        { model = State.initial
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
        , Elaborations.elaborations model
        ]
