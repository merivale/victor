module Theory.Words.Counters exposing (counter, prefix)


import Theory.Plain.Nucleus as Nucleus
import Theory.Words.Prepositions as Prepositions
import Theory.Words.Pronouns as Pronouns


counter : Nucleus.Object -> Nucleus.Balance -> String
counter object ( relator, weight ) =
    String.join " " ((prefix relator) ++ (pronoun object weight))
    

prefix : Maybe Nucleus.Relator -> List String
prefix relator =
    case relator of
        Nothing ->
            []

        Just relator ->
            [ Prepositions.preposition relator ]


pronoun : Nucleus.Object -> Nucleus.Weight -> List String
pronoun mainObject weight =
    case weight of
        Nucleus.SameAsMain ->
            [ Pronouns.direct3 mainObject ]

        Nucleus.Different object ->
            [ Pronouns.direct2 object ]
