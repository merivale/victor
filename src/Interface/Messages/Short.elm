module Interface.Messages.Short exposing (message)


import Maybe
import Result exposing (andThen)
import Interface.Model.Types exposing (..)
import Theory.Plain.Nucleus exposing (..)
import Theory.Short.Messages exposing (..)


{-| The main exposed function.
-}
message : Model -> Result String Message
message model =
    plain model.object model.verbality model.status model.balances
        |> andThen (elaborate model.elaborations)


{-| Make a plain message from the core ingredients.
-}
plain : Object -> Verbality -> Maybe Status -> List Balance -> Result String Message
plain object verbality status balances =
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


{-| Elaborate a message recusrively.
-}
elaborate : List Elaboration -> Message -> Result String Message
elaborate elaborations message =
    case List.head elaborations of
        Nothing ->
            Ok message

        Just elaboration ->
            case elaboration.recipe of
                MakeNEGATIVE ->
                    negative message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePAST ->
                    past elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePRIOR ->
                    prior message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePREORDAINED ->
                    preordained elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeREGULAR ->
                    regular elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeEXTENDED ->
                    extended elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeSCATTERED ->
                    scattered elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                _ ->
                    elaborate (List.drop 1 elaborations) message


{-| One function for each type of elaboration.
-}
negative : Message -> Result String Message
negative message =
    Ok (NEGATIVE message)


past : Maybe String -> Message -> Result String Message
past time message =
    Ok (PAST time message)


prior : Message -> Result String Message
prior message =
    Ok (PRIOR message)


preordained : Maybe String -> Message -> Result String Message
preordained string message =
    Ok (PREORDAINED string message)


regular : Maybe String -> Message -> Result String Message
regular string message =
    Ok (REGULAR string message)


extended : Maybe String -> Message -> Result String Message
extended duration message =
    case duration of
        Nothing ->
            Err "please enter a value for the duration"

        Just str ->
            Ok (EXTENDED str message)


scattered : Maybe String -> Message -> Result String Message
scattered tally message =
    case tally of
        Nothing ->
            Err "please enter a value for the tally"

        Just str ->
            Ok (SCATTERED str message)
