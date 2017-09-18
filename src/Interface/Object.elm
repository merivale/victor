module Object exposing (main)

{-| The application for the fourth layer of the theory (object messages).
-}

import Html
import Result
import Interface.Model.Types exposing (..)
import Interface.Model.State as State
import Interface.Messages.Object as Messages
import Interface.View.Output as Output
import Interface.View.Examples as Examples
import Interface.View.Elaborations as Elaborations
import Theory.Object.Sentences as Sentences


{-| Run the application.
-}
main : Program Never Model Signal
main =
    Html.beginnerProgram
        { model = State.initial ObjectTheory
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
            , Examples.examples ObjectTheory
            , Elaborations.elaborations ObjectTheory model
            ]
