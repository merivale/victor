module Theory.Long.Sentences exposing (sentence)


import Result
import Theory.Plain.Nucleus as Nucleus
import Theory.Long.Displacers as Displacers
import Theory.Long.Messages as Messages
import Theory.Words.Counters as Counters
import Theory.Words.Fulcrums as Fulcrums
import Theory.Words.Pronouns as Pronouns
import Theory.Words.Verbs as Verbs
import Theory.Words.Modals as Modals
import Theory.Words.Utils as Utils


sentence : Messages.Message -> Result String String
sentence message =
    Messages.explode message |> (Result.map implode)


implode : Messages.Vars -> String
implode vars =
    String.join " " ((subject vars.object) :: (predicate vars))


subject : Nucleus.Object -> String
subject object =
    Pronouns.direct1 object


predicate : Messages.Vars -> List String
predicate vars =
    case vars.modality of
        Nothing ->
            (verbPhrase vars)
                ++ (List.map (baseVerbPhrase True) vars.displaced)
                ++ (List.map (Counters.counter vars.object) vars.balances)
                ++ (List.reverse vars.post)

        Just modality ->
            let
                addTo =
                    modality == Displacers.Yes3 && not vars.negated && vars.past

                displaced =
                    { prior = vars.prior, pre = vars.pre, pivot = vars.pivot }
            in
                [ Modals.modal vars.past vars.negated modality ]
                    ++ (List.map (baseVerbPhrase addTo) (displaced :: vars.displaced))
                    ++ (List.map (Counters.counter vars.object) vars.balances)
                    ++ (List.reverse vars.post)


verbPhrase : Messages.Vars -> List String
verbPhrase vars =
    let
        ( base, rest ) =
            Fulcrums.fulcrum vars.prior vars.pivot
    in
        if vars.prior || base == "be" then
            (Verbs.conjugate vars.object vars.past base) :: (vars.pre ++ rest)
        else if List.member "not" vars.pre then
            let
                ( newPre, newRest ) =
                    Utils.splitAtNot vars.pre (base :: rest)
            in
                newPre ++ ((Verbs.conjugate vars.object vars.past "do") :: newRest)
        else
            vars.pre ++ ((Verbs.conjugate vars.object vars.past base) :: rest)


baseVerbPhrase : Bool -> Messages.Displaced -> String
baseVerbPhrase addTo { prior, pre, pivot } =
    let
        ( base, rest ) =
            Fulcrums.fulcrum prior pivot

        newPre =
            if addTo then
                "to" :: pre
            else
                pre
    in
        String.join " " (newPre ++ (base :: rest))
