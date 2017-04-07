module Victor exposing (main)

{-| The main entry point for the app.
-}

import Html
import Interface.Types exposing (..)
import Interface.State as State
import Interface.View as View


{-| Run the application.
-}
main : Program Never Model Signal
main =
    Html.beginnerProgram
        { model = State.initial
        , update = State.update
        , view = View.root
        }
