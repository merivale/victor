module Interface.Messages.Common exposing (..)

{-| Make a plain message from the core ingredients.
-}

import Result
import Theory.Object.Messages exposing (Message(..))
import Theory.Plain.Nucleus exposing (..)


plain :
    { a
        | balances : List Balance
        , object : Object
        , status : Maybe Status
        , verbality : Verbality
    }
    -> Result String Message
plain { object, verbality, status, balances } =
    if verbalityEmpty verbality then
        Err "please enter a verb for the verbality"
    else if propertyEmpty status then
        Err "please enter an adjective for the status"
    else
        Ok (Plain ( object, ( ( verbality, status ), balances ) ))


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
