module Theory.Short.Messages exposing (..)


import Result
import Theory.Plain.Nucleus as Nucleus
import Theory.Words.Utils as Utils


type Message
    = Plain Nucleus.Nucleus
    | NEGATIVE Message
    | PAST (Maybe String) Message
    | PRIOR Message
    | PREORDAINED (Maybe String) Message
    | REGULAR (Maybe String) Message
    | EXTENDED String Message
    | SCATTERED String Message


type alias Vars =
    { object : Nucleus.Object
    , past : Bool
    , prior : Bool
    , pre : List String
    , pivot : Nucleus.Pivot
    , balances : List Nucleus.Balance
    , post : List String
    }


explode : Message -> Result String Vars
explode message =
    case message of
        Plain nucleus ->
            Ok (plain nucleus)

        NEGATIVE subMessage ->
            explode subMessage |> Result.map negative

        PAST time subMessage ->
            explode subMessage |> Result.andThen (past time)

        PRIOR subMessage ->
            explode subMessage |> Result.andThen prior

        PREORDAINED time subMessage ->
            explode subMessage |> Result.map (preordained time)

        REGULAR frequency subMessage ->
            explode subMessage |> Result.map (regular frequency)

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
    , prior = False
    , pre = []
    , pivot = pivot
    , balances = balances
    , post = []
    }


{-| NEGATIVE messages.
-}
negative : Vars -> Vars
negative vars =
    { vars | pre = "not" :: vars.pre }


{-| PAST messages.
-}
past : Maybe String -> Vars -> Result String Vars
past time vars =
    if vars.past then
        Err "PAST messages cannot be made PAST"
    else
        Ok { vars | past = True, post = Utils.maybeCons time vars.post }


{-| PRIOR messages.
-}
prior : Vars -> Result String Vars
prior vars =
    if vars.prior then
        Err "PRIOR messages cannot be made PRIOR"
    else
        Ok { vars | prior = True }


{-| PREORDAINED messages.
-}
preordained : Maybe String -> Vars -> Vars
preordained time vars =
    { vars | post = Utils.maybeCons time vars.post }


{-| REGULAR messages.
-}
regular : Maybe String -> Vars -> Vars
regular frequency vars =
    { vars | pre = Utils.maybeCons frequency vars.pre }


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
