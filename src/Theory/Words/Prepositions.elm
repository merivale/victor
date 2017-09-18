module Theory.Words.Prepositions exposing (preposition)


import Theory.Plain.Nucleus as Nucleus


preposition : Nucleus.Relator -> String
preposition relator =
    String.toLower (toString relator)
