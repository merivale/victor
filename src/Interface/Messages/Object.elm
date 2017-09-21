module Interface.Messages.Object exposing (message)

import Interface.Messages.Common exposing (..)
import Interface.Model.Types exposing (..)
import Result
import Theory.Long.Displacers exposing (..)
import Theory.Object.Messages exposing (Message(..))
import Theory.Object.Pseudo exposing (..)


{-| The main exposed function.
-}
message : Model -> Result String Message
message model =
    plain model
        |> Result.andThen (elaborate model.elaborations)


{-| Elaborate a message recusrively.
-}
elaborate : List Elaboration -> Message -> Result String Message
elaborate elaborations message =
    List.foldl foo (Ok message) elaborations


foo : Elaboration -> Result String Message -> Result String Message
foo elaboration messageResult =
    case messageResult of
        Err err ->
            Err err

        Ok message ->
            case elaboration.recipe of
                MakeNEGATIVE ->
                    negative message

                MakePAST ->
                    past elaboration.string1 message

                MakePRIOR ->
                    prior message

                MakeDISPLACED ->
                    displaced elaboration.displacer message

                MakePREORDAINED ->
                    preordained elaboration.displacer elaboration.string1 message

                MakeREGULAR ->
                    regular elaboration.displacer elaboration.string1 message

                MakeEXTENDED ->
                    extended elaboration.string1 message

                MakeSCATTERED ->
                    scattered elaboration.string1 message

                MakeINDIRECT ->
                    haystack elaboration
                        |> Result.andThen (description elaboration)
                        |> Result.andThen (indirect elaboration message)

                MakeENUMERATED ->
                    haystack elaboration
                        |> Result.andThen (multiplicity elaboration)
                        |> Result.andThen (enumerated elaboration message)

                MakeAMASSED ->
                    haystack elaboration
                        |> Result.andThen (proportion elaboration)
                        |> Result.andThen (amassed elaboration message)


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
