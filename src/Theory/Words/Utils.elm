module Theory.Words.Utils exposing (..)


consontanty : String -> Bool
consontanty base =
    let
        ultimate =
            String.right 1 base

        penultimate =
            String.slice -2 -1 base
    in
        ultimate == "y" && not (List.member penultimate [ "a", "e", "i", "o", "u" ])


maybeCons : Maybe String -> List String -> List String
maybeCons toAdd list =
    case toAdd of
        Nothing ->
            list

        Just str ->
            str :: list


splitAtNot : List String -> List String -> ( List String, List String )
splitAtNot pre rest =
    let
        splitAtNot_ index pre rest =
            case List.head (List.drop index pre) of
                Nothing ->
                    ( pre, rest )

                Just word ->
                    if word == "not" then
                        ( List.take index pre, (List.drop index pre) ++ rest )
                    else
                        splitAtNot_ (index + 1) pre rest
    in
        splitAtNot_ 0 pre rest


splitMaybeString : Maybe String -> List String
splitMaybeString string =
    Maybe.withDefault [] (Maybe.map String.words string)
