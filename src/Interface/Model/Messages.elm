module Interface.Model.Messages exposing (message)

{-| This module converts the model into a message.
-}

import Interface.Model.Types exposing (..)
import Result
import Theory.Long.Displacers exposing (..)
import Theory.Object.Messages exposing (..)
import Theory.Object.Pseudo exposing (..)
import Theory.Plain.Nucleus exposing (..)


{-| The main exposed function.
-}
message : Model -> Result String Message
message model =
    plain model.object model.verbality model.status model.balances
        |> Result.andThen (elaborate model.elaborations)


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
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakePAST ->
                    past elaboration.string1 message
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakePRIOR ->
                    prior message
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakeDISPLACED ->
                    displaced elaboration.displacer message
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakePREORDAINED ->
                    preordained elaboration.displacer elaboration.string1 message
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakeREGULAR ->
                    regular elaboration.displacer elaboration.string1 message
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakeEXTENDED ->
                    extended elaboration.string1 message
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakeSCATTERED ->
                    scattered elaboration.string1 message
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakeINDIRECT ->
                    haystack elaboration
                        |> Result.andThen (description elaboration)
                        |> Result.andThen (indirect elaboration message)
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakeENUMERATED ->
                    haystack elaboration
                        |> Result.andThen (multiplicity elaboration)
                        |> Result.andThen (enumerated elaboration message)
                        |> Result.andThen (elaborate (List.drop 1 elaborations))

                MakeAMASSED ->
                    haystack elaboration
                        |> Result.andThen (proportion elaboration)
                        |> Result.andThen (amassed elaboration message)
                        |> Result.andThen (elaborate (List.drop 1 elaborations))


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


haystack : Elaboration -> Result String Haystack
haystack elaboration =
    case elaboration.string1 of
        Nothing ->
            Err "please enter a category for the haystack"

        Just string ->
            Ok ( string, elaboration.string2, elaboration.string3 )


description : Elaboration -> Haystack -> Result String Description
description elaboration haystack =
    Ok ( elaboration.pointer, elaboration.other, haystack )


multiplicity : Elaboration -> Haystack -> Result String Multiplicity
multiplicity elaboration haystack =
    case elaboration.quantifier of
        Nothing ->
            Err "please select a quantifier for the ENUMERATED elaboration"

        Just quantifier ->
            Ok ( quantifier, elaboration.other, haystack )


proportion : Elaboration -> Haystack -> Result String Proportion
proportion elaboration haystack =
    Ok ( elaboration.quantifier, elaboration.other, haystack )


indirect : Elaboration -> Message -> Description -> Result String Message
indirect elaboration message description =
    Ok (INDIRECT elaboration.target description message)


enumerated : Elaboration -> Message -> Multiplicity -> Result String Message
enumerated elaboration message multiplicity =
    Ok (ENUMERATED elaboration.target multiplicity message)


amassed : Elaboration -> Message -> Proportion -> Result String Message
amassed elaboration message proportion =
    Ok (AMASSED elaboration.target proportion message)
