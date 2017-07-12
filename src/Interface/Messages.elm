module Interface.Messages exposing (message)

{-| Module for generating a message from the model (application state). This
module does not attempt to validate the message (see the Theory/Messages module
for that), except to confirm that some compulsory ingredients exist, and that
required strings are of non-zero length.
-}

import Maybe
import Result exposing (andThen)
import Interface.Types exposing (..)
import Theory.Types exposing (..)


{-| The main exposed function.
-}
message : Model -> Result String Message
message model =
    plain model.object model.pivot model.balances
        |> andThen (elaborate model.elaborations)


{-| Make a plain message from the core ingredients.
-}
plain : Object -> Pivot -> List Balance -> Result String Message
plain object pivot balances =
    case pivot of
        Do verbality ongoing passive ->
            if String.length verbality == 0 then
                Err "please enter a verb for your pivot"
            else if verbality == "be" then
                Err "please enter a verb other than 'be' for your pivot"
            else
                Ok (Plain ( object, ( pivot, balances ) ))

        _ ->
            Ok (Plain ( object, ( pivot, balances ) ))


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
                    makeNegative message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePAST ->
                    makePast message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePRIOR ->
                    makePrior message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePRACTICAL ->
                    practical elaboration.modality message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePROJECTIVE ->
                    projective elaboration.modality elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeEVASIVE ->
                    evasive elaboration.modality elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeDISPLACED ->
<<<<<<< Updated upstream
                    makeDisplaced elaboration.displacer message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeREGULAR ->
                    makeRegular elaboration.displacer elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePREORDAINED ->
                    makePreordained elaboration.displacer elaboration.string1 message
=======
                    displaced elaboration.pivot elaboration.counter message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeREGULAR ->
                    regular elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePREORDAINED ->
                    preordained elaboration.string1 message
>>>>>>> Stashed changes
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeEXTENDED ->
                    makeExtended elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeSCATTERED ->
                    makeScattered elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeINDIRECT ->
                    makeHaystack elaboration
                        |> andThen (makeIndirect elaboration message)
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeENUMERATED ->
                    makeHaystack elaboration
                        |> andThen (makeEnumerated elaboration message)
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeAMASSED ->
                    makeHaystack elaboration
                        |> andThen (makeAmassed elaboration message)
                        |> andThen (elaborate (List.drop 1 elaborations))


{-| One function for each type of elaboration.
-}
makeNegative : Message -> Result String Message
makeNegative message =
    Ok (NEGATIVE message)


makePast : Message -> Result String Message
makePast message =
    Ok (PAST message)


makePrior : Message -> Result String Message
makePrior message =
    Ok (PRIOR message)


<<<<<<< Updated upstream
makeDisplaced : Maybe Displacer -> Message -> Result String Message
makeDisplaced displacer message =
    case displacer of
        Nothing ->
            Err "DISPLACED messages require a displacer"

        Just disp ->
            case disp of
                Primary (Do verbality ongoing passive) ->
                    if String.length verbality == 0 then
                        Err "please enter a verb for your DISPLACED pivot"
                    else
                        Ok (DISPLACED disp message)

                _ ->
                    Ok (DISPLACED disp message)


makeRegular : Maybe Displacer -> Maybe String -> Message -> Result String Message
makeRegular displacer string message =
    case displacer of
        Just (Primary (Do verbality ongoing passive)) ->
            if String.length verbality == 0 then
                Err "please enter a verb for your REGULAR pivot"
            else
                Ok (REGULAR displacer string message)
=======
practical : Modality -> Message -> Result String Message
practical modality message =
    Ok (PRACTICAL modality message)
>>>>>>> Stashed changes


projective : Modality -> Maybe String -> Message -> Result String Message
projective modality string message =
    Ok (PROJECTIVE modality string message)

<<<<<<< Updated upstream
makePreordained : Maybe Displacer -> Maybe String -> Message -> Result String Message
makePreordained displacer string message =
    case displacer of
        Just (Primary (Do verbality ongoing passive)) ->
            if String.length verbality == 0 then
                Err "please enter a verb for your PREORDAINED pivot"
            else
                Ok (PREORDAINED displacer string message)
=======
>>>>>>> Stashed changes

evasive : Modality -> Maybe String -> Message -> Result String Message
evasive modality string message =
    Ok (EVASIVE modality string message)


displaced : Pivot -> Maybe Counter -> Message -> Result String Message
displaced pivot counter message =
    if verbalityEmpty pivot then
        Err "please enter a verb for your DISPLACED pivot"
    else if propertyEmpty counter then
        Err "please enter a property for your DISPLACED counter"
    else
        Ok (DISPLACED pivot counter message)


regular : Maybe String -> Message -> Result String Message
regular string message =
    Ok (REGULAR string message)


preordained : Maybe String -> Message -> Result String Message
preordained string message =
    Ok (PREORDAINED string message)


makeExtended : Maybe String -> Message -> Result String Message
makeExtended string message =
    case string of
        Nothing ->
            Err "please enter a value for the duration"

        Just str ->
            Ok (EXTENDED str message)


makeScattered : Maybe String -> Message -> Result String Message
makeScattered string message =
    case string of
        Nothing ->
            Err "please enter a value for the tally"

        Just str ->
            Ok (SCATTERED str message)


makeHaystack : Elaboration -> Result String Haystack
makeHaystack elaboration =
    case elaboration.string1 of
        Nothing ->
            Err "please enter a category for your haystack"

        Just string ->
            Ok ( string, elaboration.string2, elaboration.string3 )


makeIndirect : Elaboration -> Message -> Haystack -> Result String Message
makeIndirect elaboration message haystack =
    Ok (INDIRECT elaboration.target elaboration.pointer elaboration.other haystack message)


makeEnumerated : Elaboration -> Message -> Haystack -> Result String Message
makeEnumerated elaboration message haystack =
    case elaboration.quantifier of
        Nothing ->
            Err "please select a quantifier for your ENUMERATED elaboration"

        Just quantifier ->
            Ok (ENUMERATED elaboration.target quantifier elaboration.other haystack message)


makeAmassed : Elaboration -> Message -> Haystack -> Result String Message
makeAmassed elaboration message haystack =
    Ok (AMASSED elaboration.target elaboration.quantifier elaboration.other haystack message)
