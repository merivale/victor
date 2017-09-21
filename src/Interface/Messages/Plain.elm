module Interface.Messages.Plain exposing (message)

import Interface.Model.Types exposing (..)
import Maybe
import Result exposing (andThen)
import Theory.Plain.Nucleus exposing (..)


{-| The main exposed function.
-}
message : Model -> Result String Nucleus
message model =
    if verbalityEmpty model.verbality then
        Err "please enter a verb for the verbality"
    else if propertyEmpty model.status then
        Err "please enter an adjective for the status"
    else
        Ok ( model.object, ( ( model.verbality, model.status ), model.balances ) )


verbalityEmpty : Verbality -> Bool
verbalityEmpty verbality =
    case verbality of
        Do string ongoing passive ->
            String.length string == 0

        _ ->
            False


propertyEmpty : Maybe Status -> Bool
propertyEmpty status =
    case status of
        Just (Absolute string) ->
            String.length string == 0

        _ ->
            False
