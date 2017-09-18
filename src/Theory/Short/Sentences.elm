module Theory.Short.Sentences exposing (sentence)


import Result
import Theory.Plain.Nucleus as Nucleus
import Theory.Short.Messages as Messages
import Theory.Words.Counters as Counters
import Theory.Words.Fulcrums as Fulcrums
import Theory.Words.Pronouns as Pronouns
import Theory.Words.Verbs as Verbs
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
    (verbPhrase vars)
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
