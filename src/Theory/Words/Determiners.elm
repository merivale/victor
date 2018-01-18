module Theory.Words.Determiners exposing (determiner)

import Theory.Object.Pseudo as Pseudo


determiner : Pseudo.Quantifier -> String
determiner quantifier =
    case quantifier of
        Pseudo.Integer int ->
            integerToString int

        _ ->
            String.toLower (toString quantifier)


integerToString : Int -> String
integerToString int =
    if int < 0 then
        "minus " ++ integerToString -int
    else if int == 0 then
        "zero"
    else if int == 1 then
        "one"
    else if int == 2 then
        "two"
    else if int == 3 then
        "three"
    else if int == 4 then
        "four"
    else if int == 5 then
        "five"
    else if int == 6 then
        "six"
    else if int == 7 then
        "seven"
    else if int == 8 then
        "eight"
    else if int == 9 then
        "nine"
    else if int == 10 then
        "ten"
    else if int == 11 then
        "eleven"
    else if int == 12 then
        "twelve"
    else if int == 13 then
        "thirteen"
    else if int == 14 then
        "fourteen"
    else if int == 15 then
        "fifteen"
    else if int == 16 then
        "sixteen"
    else if int == 17 then
        "seventeen"
    else if int == 18 then
        "eighteen"
    else if int == 19 then
        "nineteen"
    else if int == 20 then
        "twenty"
    else if int < 30 then
        "twenty-" ++ integerToString (int - 20)
    else if int == 30 then
        "thirty"
    else if int < 40 then
        "thirty-" ++ integerToString (int - 30)
    else if int == 40 then
        "fourty"
    else if int < 50 then
        "fourty-" ++ integerToString (int - 40)
    else if int == 50 then
        "fifty"
    else if int < 60 then
        "fifty-" ++ integerToString (int - 50)
    else if int == 60 then
        "sixty"
    else if int < 70 then
        "sixty-" ++ integerToString (int - 60)
    else if int == 70 then
        "seventy"
    else if int < 80 then
        "seventy-" ++ integerToString (int - 70)
    else if int == 80 then
        "eighty"
    else if int < 90 then
        "eighty-" ++ integerToString (int - 80)
    else if int == 90 then
        "ninety"
    else if int < 100 then
        "ninety-" ++ integerToString (int - 90)
    else
        "a hundred or more"
