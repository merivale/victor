module Theory.Plain.Sentences exposing (sentence)


import Theory.Plain.Nucleus as Nucleus
import Theory.Words.Counters as Counters
import Theory.Words.Fulcrums as Fulcrums
import Theory.Words.Pronouns as Pronouns
import Theory.Words.Verbs as Verbs


sentence : Nucleus.Nucleus -> Result String String
sentence ( object, condition ) =
    Ok (String.join " " ((subject object) :: (predicate object condition)))


subject : Nucleus.Object -> String
subject object =
    Pronouns.direct1 object


predicate : Nucleus.Object -> Nucleus.Condition -> List String
predicate object ( pivot, balance ) =
    (verbPhrase object pivot)
        ++ (List.map (Counters.counter object) balance)


verbPhrase : Nucleus.Object -> Nucleus.Pivot -> List String
verbPhrase object pivot =
    let
        ( base, rest ) =
            Fulcrums.fulcrum False pivot
    in
        (Verbs.conjugate object False base) :: rest
