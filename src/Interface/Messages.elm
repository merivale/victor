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
    plain model.object model.pivot model.counter model.balances
        |> andThen (elaborate model.elaborations)


{-| Make a plain message from the core ingredients.
-}
plain : Object -> Pivot -> Maybe Counter -> List Balance -> Result String Message
plain object pivot counter balances =
    if verbalityEmpty pivot then
        Err "please enter a verbality for your pivot"
    else if propertyEmpty counter then
        Err "please enter a property for your counter"
    else
        Ok (Plain ( object, ( pivot, counter, balances ) ))


verbalityEmpty : Pivot -> Bool
verbalityEmpty pivot =
    case pivot of
        Do verbality ongoing passive ->
            String.length verbality == 0

        _ ->
            False


propertyEmpty : Maybe Counter -> Bool
propertyEmpty counter =
    case counter of
        Just (CounterProperty property) ->
            String.length property == 0

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

                MakeDISPLACED ->
                    displaced elaboration.displacer message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeREGULAR ->
                    regular elaboration.displacer elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakePREORDAINED ->
                    preordained elaboration.displacer elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeEXTENDED ->
                    extended elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeSCATTERED ->
                    scattered elaboration.string1 message
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeINDIRECT ->
                    haystack elaboration
                        |> andThen (description elaboration)
                        |> andThen (indirect elaboration message)
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeENUMERATED ->
                    haystack elaboration
                        |> andThen (multiplicity elaboration)
                        |> andThen (enumerated elaboration message)
                        |> andThen (elaborate (List.drop 1 elaborations))

                MakeAMASSED ->
                    haystack elaboration
                        |> andThen (proportion elaboration)
                        |> andThen (amassed elaboration message)
                        |> andThen (elaborate (List.drop 1 elaborations))


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
            Err "DISPLACED messages require a displacer"

        Just disp ->
            case disp of
                Primary pivot counter ->
                    if verbalityEmpty pivot then
                        Err "please enter a verb for your DISPLACED pivot"
                    else if propertyEmpty counter then
                        Err "please enter a property for your DISPLACED counter"
                    else
                        Ok (DISPLACED disp message)

                _ ->
                    Ok (DISPLACED disp message)


regular : Maybe Displacer -> Maybe String -> Message -> Result String Message
regular displacer string message =
    case displacer of
        Just (Primary pivot counter) ->
            if verbalityEmpty pivot then
                Err "please enter a verbality for your REGULAR pivot"
            else if propertyEmpty counter then
                Err "please enter a property for your REGULAR counter"
            else
                Ok (REGULAR displacer string message)

        _ ->
            Ok (REGULAR displacer string message)


preordained : Maybe Displacer -> Maybe String -> Message -> Result String Message
preordained displacer string message =
    case displacer of
        Just (Primary pivot counter) ->
            if verbalityEmpty pivot then
                Err "please enter a verbality for your PREORDAINED pivot"
            else if propertyEmpty counter then
                Err "please enter a property for your PREORDAINED counter"
            else
                Ok (PREORDAINED displacer string message)

        _ ->
            Ok (PREORDAINED displacer string message)


extended : Maybe Duration -> Message -> Result String Message
extended duration message =
    case duration of
        Nothing ->
            Err "please enter a value for the duration"

        Just str ->
            Ok (EXTENDED str message)


scattered : Maybe Tally -> Message -> Result String Message
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
            Err "please enter a category for your haystack"

        Just string ->
            Ok ( string, elaboration.string2, elaboration.string3 )


description : Elaboration -> Haystack -> Result String Description
description elaboration haystack =
    Ok ( elaboration.pointer, elaboration.other, haystack )


multiplicity : Elaboration -> Haystack -> Result String Multiplicity
multiplicity elaboration haystack =
    case elaboration.quantifier of
        Nothing ->
            Err "please select a quantifier for your ENUMERATED elaboration"

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
