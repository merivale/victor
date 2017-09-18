module Theory.Words.Determiners exposing (determiner)


import Theory.Object.Pseudo as Pseudo
import Theory.Words.Utils as Utils


determiner : Pseudo.Quantifier -> String
determiner quantifier =
    case quantifier of
        Pseudo.Integer int ->
            Utils.integerToString int

        _ ->
            String.toLower (toString quantifier)
