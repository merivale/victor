module Interface.Messages.Long exposing (message)

import Interface.Messages.Common exposing (..)
import Interface.Model.Types exposing (..)
import Maybe
import Result exposing (andThen)
import Theory.Long.Displacers exposing (..)
import Theory.Long.Messages exposing (..)
import Theory.Plain.Nucleus exposing (..)


{-| The main exposed function.
-}
message : Model -> Result String Message
message model =
    plain model.object model.verbality model.status model.balances
        |> andThen (elaborate model.elaborations)


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

                MakeDISPLACED ->
                    displaced elaboration.displacer message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePREORDAINED ->
                    preordained elaboration.displacer elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeREGULAR ->
                    regular elaboration.displacer elaboration.string1 message
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


displaced : Maybe Displacer -> Message -> Result String Message
displaced displacer message =
    case displacer of
        Nothing ->
            Err "please enter a displacer for the DISPLACED elaboration"

        Just (Primary ( verbality, status )) ->
            if verbalityEmpty verbality then
                Err "please enter a verb for the DISPLACED verbality"
            else if propertyEmpty status then
                Err "please enter an adjective for the DISPLACED status"
            else
                Ok (DISPLACED (Primary ( verbality, status )) message)

        Just (Secondary modality) ->
            Ok (DISPLACED (Secondary modality) message)


preordained : Maybe Displacer -> Maybe String -> Message -> Result String Message
preordained displacer string message =
    case displacer of
        Nothing ->
            Ok (PREORDAINED displacer string message)

        Just (Primary ( verbality, status )) ->
            if verbalityEmpty verbality then
                Err "please enter a verb for the PREORDAINED verbality"
            else if propertyEmpty status then
                Err "please enter an adjective for the PREORDAINED status"
            else
                Ok (PREORDAINED displacer string message)

        Just (Secondary modality) ->
            Ok (PREORDAINED displacer string message)


regular : Maybe Displacer -> Maybe String -> Message -> Result String Message
regular displacer string message =
    case displacer of
        Nothing ->
            Ok (REGULAR displacer string message)

        Just (Primary ( verbality, status )) ->
            if verbalityEmpty verbality then
                Err "please enter a verb for the REGULAR verbality"
            else if propertyEmpty status then
                Err "please enter an adjective for the REGULAR status"
            else
                Ok (REGULAR displacer string message)

        Just (Secondary modality) ->
            Ok (REGULAR displacer string message)


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
