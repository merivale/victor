module Theory.Long.Messages exposing (..)

import Result
import Theory.Long.Displacers as Displacers
import Theory.Plain.Nucleus as Nucleus
import Theory.Words.Utils as Utils


type Message
    = Plain Nucleus.Nucleus
    | NEGATIVE Message
    | PAST (Maybe String) Message
    | PRIOR Message
    | DISPLACED Displacers.Displacer Message
    | PREORDAINED (Maybe Displacers.Displacer) (Maybe String) Message
    | REGULAR (Maybe Displacers.Displacer) (Maybe String) Message
    | EXTENDED String Message
    | SCATTERED String Message


type alias Vars =
    { object : Nucleus.Object
    , past : Bool
    , modality : Maybe Displacers.Modality
    , negatedModality : Bool
    , preordainedModality : Bool
    , regularModality : Bool
    , prior : Bool
    , pre : List String
    , pivot : Nucleus.Pivot
    , displaced : List Displaced
    , balances : List Nucleus.Balance
    , post : List String
    }


type alias Displaced =
    { prior : Bool
    , pre : List String
    , pivot : Nucleus.Pivot
    }


explode : Message -> Result String Vars
explode message =
    case message of
        Plain nucleus ->
            Ok (plain nucleus)

        NEGATIVE subMessage ->
            explode subMessage |> Result.andThen negative

        PAST time subMessage ->
            explode subMessage |> Result.andThen (past time)

        PRIOR subMessage ->
            explode subMessage |> Result.andThen prior

        DISPLACED displacer subMessage ->
            explode subMessage |> Result.andThen (displaced displacer)

        PREORDAINED displacer time subMessage ->
            explode subMessage |> Result.andThen (preordained displacer time)

        REGULAR displacer frequency subMessage ->
            explode subMessage |> Result.andThen (regular displacer frequency)

        EXTENDED duration subMessage ->
            explode subMessage |> Result.map (extended duration)

        SCATTERED tally subMessage ->
            explode subMessage |> Result.map (scattered tally)


{-| Generate the initial variables to be passed on to any elaborating functions.
Note that I do not currently validate the nucleus of any message.
-}
plain : Nucleus.Nucleus -> Vars
plain ( object, ( pivot, balances ) ) =
    { object = object
    , past = False
    , modality = Nothing
    , negatedModality = False
    , preordainedModality = False
    , regularModality = False
    , prior = False
    , pre = []
    , pivot = pivot
    , displaced = []
    , balances = balances
    , post = []
    }


{-| NEGATIVE messages.
-}
negative : Vars -> Result String Vars
negative vars =
    case vars.modality of
        Nothing ->
            Ok { vars | pre = "not" :: vars.pre }

        Just Displacers.Yes1 ->
            Err "the Yes1 modality ('will') cannot be negated"

        Just Displacers.Yes2 ->
            Err "the Yes2 modality ('shall') cannot be negated"

        _ ->
            if vars.negatedModality then
                Err "modalities cannot be negated twice"
            else
                Ok { vars | negatedModality = True, pre = "not" :: vars.pre }


{-| PAST messages.
-}
past : Maybe String -> Vars -> Result String Vars
past time vars =
    if vars.past then
        Err "PAST messages cannot be made PAST"
    else if vars.modality == Just Displacers.Maybe4 then
        Err "messages with the Maybe4 modality ('dare') cannot be made PAST"
    else if vars.modality /= Nothing && not vars.regularModality && time /= Nothing then
        Err "DISPLACED and PREORDAINED messages with a modality cannot be given a PAST time"
    else
        Ok { vars | past = True, post = Utils.maybeCons time vars.post }


{-| PRIOR messages.
-}
prior : Vars -> Result String Vars
prior vars =
    if vars.prior then
        Err "PRIOR messages cannot be made PRIOR"
    else if vars.modality /= Nothing && not vars.past then
        Err "messages with a modality can only be PRIOR if they are PAST"
    else if vars.modality /= Nothing && not vars.regularModality && not vars.preordainedModality then
        Err "DISPLACED messages with a modality cannot be made PRIOR PAST"
    else
        Ok { vars | prior = True }


{-| DISPLACED messages.
-}
displaced : Displacers.Displacer -> Vars -> Result String Vars
displaced displacer vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be DISPLACED"
    else
        case displacer of
            Displacers.Primary pivot ->
                swapPastForPrior vars |> Result.map (primary pivot)

            Displacers.Secondary modality ->
                swapPastForPrior { vars | modality = Just modality }


{-| PREORDAINED messages.
-}
preordained : Maybe Displacers.Displacer -> Maybe String -> Vars -> Result String Vars
preordained displacer time vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be made PREORDAINED"
    else
        let
            varsWithPost =
                { vars | post = Utils.maybeCons time vars.post }
        in
        case displacer of
            Nothing ->
                if vars.past then
                    Err "PAST messages cannot be made PREORDAINED without a displacer"
                else
                    Ok varsWithPost

            Just (Displacers.Primary pivot) ->
                swapPastForPrior varsWithPost |> Result.map (primary pivot)

            Just (Displacers.Secondary modality) ->
                swapPastForPrior varsWithPost |> Result.map (secondary modality True False)


{-| REGULAR messages.
-}
regular : Maybe Displacers.Displacer -> Maybe String -> Vars -> Result String Vars
regular displacer frequency vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be made REGULAR"
    else
        let
            varsWithPre =
                { vars | pre = Utils.maybeCons frequency vars.pre }
        in
        case displacer of
            Nothing ->
                if vars.past then
                    Err "PAST messages cannot be made REGULAR without a displacer"
                else
                    Ok varsWithPre

            Just (Displacers.Primary pivot) ->
                swapPastForPrior varsWithPre |> Result.map (primary pivot)

            Just (Displacers.Secondary modality) ->
                swapPastForPrior varsWithPre |> Result.map (secondary modality False True)


{-| EXTENDED messages.
-}
extended : String -> Vars -> Vars
extended duration vars =
    { vars | post = duration :: vars.post }


{-| SCATTERED messages.
-}
scattered : String -> Vars -> Vars
scattered tally vars =
    { vars | post = tally :: vars.post }


{-| Functions used by the DISPLACED, PREORDAINED, and REGULAR elaborations.
-}
swapPastForPrior : Vars -> Result String Vars
swapPastForPrior vars =
    if vars.past && vars.prior then
        Err "PRIOR PAST messages cannot be given a displacer"
    else if vars.past then
        Ok { vars | past = False, prior = True }
    else
        Ok vars


primary : Nucleus.Pivot -> Vars -> Vars
primary pivot vars =
    let
        displaced =
            { prior = vars.prior, pre = vars.pre, pivot = vars.pivot }
    in
    { vars
        | prior = False
        , pre = []
        , pivot = pivot
        , displaced = displaced :: vars.displaced
    }


secondary : Displacers.Modality -> Bool -> Bool -> Vars -> Vars
secondary modality preordainedModality regularModality vars =
    { vars
        | modality = Just modality
        , preordainedModality = preordainedModality
        , regularModality = regularModality
    }
