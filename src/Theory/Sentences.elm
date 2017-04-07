module Theory.Sentences exposing (sentence)

{-| The English sentence (a function of a message).
-}

import Result exposing (andThen)
import Theory.Types exposing (..)
import Theory.Messages as Messages
import Theory.Fulcrums as Fulcrums


sentence : Message -> Result String String
sentence message =
    Messages.explode message
        |> andThen implode


implode : Vars -> Result String String
implode vars =
    let
        ( pre1, tempPre2 ) =
            rejigPre vars

        ( negateFulcrum, pre2 ) =
            shiftNotToBool tempPre2
    in
        if List.isEmpty pre1 then
            Ok (String.join " " ([ subjectAndFulcrum vars negateFulcrum ] ++ pre2 ++ vars.counter ++ vars.post))
        else
            Ok (String.join " " (vars.subject ++ pre1 ++ [ fulcrum vars negateFulcrum ] ++ pre2 ++ vars.counter ++ vars.post))


rejigPre : Vars -> ( List String, List String )
rejigPre vars =
    if not (vars.modality == Nothing) then
        ( [], vars.pre1 ++ [ vars.verb ] ++ vars.pre2 )
    else if vars.verb == "be" || vars.prior then
        ( [], vars.pre1 ++ vars.pre2 )
    else if List.member "not" vars.pre1 then
        splitAtNot 0 vars.pre1 (vars.verb :: vars.pre2)
    else
        ( vars.pre1, vars.pre2 )


shiftNotToBool : List String -> ( Bool, List String )
shiftNotToBool pre2 =
    case pre2 of
        "not" :: tail ->
            ( True, tail )

        _ ->
            ( False, pre2 )


splitAtNot : Int -> List String -> List String -> ( List String, List String )
splitAtNot index pre1 pre2 =
    case List.head (List.drop index pre1) of
        Nothing ->
            ( pre1, pre2 )

        Just word ->
            if word == "not" then
                ( List.take index pre1, (List.drop index pre1) ++ pre2 )
            else
                splitAtNot (index + 1) pre1 pre2


subjectAndFulcrum : Vars -> Bool -> String
subjectAndFulcrum vars negateFulcrum =
    if vars.abbreviateFulcrum && not vars.objectOverride then
        (String.join " " vars.subject) ++ (Fulcrums.abbreviate (fulcrum vars negateFulcrum))
    else
        (String.join " " vars.subject) ++ " " ++ (fulcrum vars negateFulcrum)


fulcrum : Vars -> Bool -> String
fulcrum vars negate =
    let
        defaultFulcrum =
            case vars.modality of
                Nothing ->
                    if vars.verb == "be" || vars.prior || not (List.member "not" vars.pre1) then
                        Fulcrums.verb vars.verb vars.past vars.amNeeded vars.isNeeded
                    else
                        Fulcrums.verb "do" vars.past vars.amNeeded vars.isNeeded

                Just modality ->
                    Fulcrums.modal modality vars.past vars.negatedModality
    in
        if negate then
            Fulcrums.negate defaultFulcrum vars.abbreviateNot
        else
            defaultFulcrum
