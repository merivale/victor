module Short exposing (main)


{-| The application for the second layer of the theory (short messages).
-}
import Html
import Result
import Interface.Model.Types exposing (..)
import Interface.Model.State as State
import Interface.Messages.Short as Messages
import Interface.View.Output as Output
import Interface.View.Examples as Examples
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
            , Elaborations.elaborations ShortTheory model
            ]
