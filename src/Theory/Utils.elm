module Theory.Utils exposing (..)

{-| Assorted utility functions.
-}

-- no imports


{-| Check if a word ends in a consonant followed by a "y". Used by the Nouns
and Verbs modules to guess the different forms of words.
-}
consontanty : String -> Bool
consontanty base =
    let
        ultimate =
            String.right 1 base

        penultimate =
            String.slice -2 -1 base
    in
        ultimate == "y" && not (List.member penultimate [ "a", "e", "i", "o", "u" ])


{-| Maybe add a string to the start of a list. Used by the Messages.explode
function to handle some optional unearthed arguments.
-}
maybeCons : Maybe String -> List String -> List String
maybeCons toAdd list =
    case toAdd of
        Nothing ->
            list

        Just str ->
            str :: list


{-| Take two lists of words; if the first list contains a "not", then move
everything after and including the "not" into the front of the second list.
Used by the Sentences.implode function to place verbs in the right place.
-}
splitAtNot : List String -> List String -> ( List String, List String )
splitAtNot pre rest =
    let
        splitAtNot_ index pre rest =
            case List.head (List.drop index pre) of
                Nothing ->
                    ( pre, rest )

                Just word ->
                    if word == "not" then
                        ( List.take index pre, List.drop index pre ++ rest )
                    else
                        splitAtNot_ (index + 1) pre rest
    in
        splitAtNot_ 0 pre rest


{-| Convert a maybe string into a (possibly empty) list of words. Used by the
Sentences.implode function to encode haystacks (specifically the optional
description and restriction components).
-}
splitMaybeString : Maybe String -> List String
splitMaybeString string =
    Maybe.withDefault [] (Maybe.map String.words string)
