module Theory.Nouns
    exposing
        ( subject
        , reflexiveObject
        , independentObject
        , pointerPhrase
        , quantifierPhrase
        )

{-| Functions for generating simple pronouns or names out of notional subjects,
and noun phrases with determiners (e.g. "most other people") out of sets of
general factors.
-}

import Dict
import Maybe
import Theory.Types exposing (..)
import Theory.Words as Words


{-| Convert a notional subject to a pronoun or name. In the latter case, my
model relies on the user doing the work, and simply returns their input string.
-}
subject : Object -> String
subject object =
    case object of
        Speaker ->
            "I"

        Hearer ->
            "you"

        Male string ->
            Maybe.withDefault "he" string

        Female string ->
            Maybe.withDefault "she" string

        Thing string ->
            Maybe.withDefault "it" string

        Speakers ->
            "we"

        Hearers ->
            "you"

        PeopleOrThings string ->
            Maybe.withDefault "they" string


reflexiveObject : Object -> String
reflexiveObject object =
    case object of
        Speaker ->
            "myself"

        Hearer ->
            "yourself"

        Male string ->
            "himself"

        Female string ->
            "herself"

        Thing string ->
            "itself"

        Speakers ->
            "ourselves"

        Hearers ->
            "yourselves"

        PeopleOrThings string ->
            "themselves"


independentObject : Object -> String
independentObject object =
    case object of
        Speaker ->
            "me"

        Hearer ->
            "you"

        Male string ->
            Maybe.withDefault "him" string

        Female string ->
            Maybe.withDefault "her" string

        Thing string ->
            Maybe.withDefault "it" string

        Speakers ->
            "us"

        Hearers ->
            "you"

        PeopleOrThings string ->
            Maybe.withDefault "them" string


relativeObject : Object -> String
relativeObject object =
    case object of
        Speaker ->
            "my"

        Hearer ->
            "your"

        Male string ->
            Maybe.withDefault "his" (Maybe.map relativeName string)

        Female string ->
            Maybe.withDefault "her" (Maybe.map relativeName string)

        Thing string ->
            Maybe.withDefault "its" (Maybe.map relativeName string)

        Speakers ->
            "our"

        Hearers ->
            "your"

        PeopleOrThings string ->
            Maybe.withDefault "their" (Maybe.map relativeName string)


relativeName : String -> String
relativeName string =
    string ++ "'s"


{-| Convert a set of general factors into a noun phrase with a determiner (e.g.
"most other people", "someone in the room", "several things from Spain").
-}
pointerPhrase : Pointer -> Bool -> Haystack -> Bool -> List String
pointerPhrase pointer other haystack plural =
    if other then
        [ pointerToString pointer plural other, "other" ] ++ (haystackToString haystack plural)
    else
        (pointerToString pointer plural other) :: (haystackToString haystack plural)


quantifierPhrase : Bool -> Maybe Quantifier -> Bool -> Haystack -> Bool -> List String
quantifierPhrase enumerated quantifier other haystack plural =
    if enumerated && oneOrBody quantifier haystack then
        (quantifierToString True quantifier other haystack.category) ++ (Maybe.withDefault [] (Maybe.map String.words haystack.restriction))
    else
        (quantifierToString False quantifier other haystack.category) ++ (haystackToString haystack plural)


pointerToString : Pointer -> Bool -> Bool -> String
pointerToString pointer plural other =
    case pointer of
        The ->
            "the"

        This ->
            if plural then
                "these"
            else
                "this"

        That ->
            if plural then
                "those"
            else
                "that"

        RelatedTo object ->
            relativeObject object


quantifierToString : Bool -> Maybe Quantifier -> Bool -> String -> List String
quantifierToString oneOrBody quantifier other category =
    case quantifier of
        Nothing ->
            if other then
                [ "other" ]
            else
                []

        Just A ->
            if other then
                [ "another" ]
            else if List.member (String.left 1 category) [ "a", "e", "i", "o", "u" ] then
                [ "an" ]
            else
                [ "a" ]

        Just q ->
            if oneOrBody then
                if other then
                    [ (String.toLower (toString q)) ++ category, "else" ]
                else
                    [ (String.toLower (toString q)) ++ category ]
            else if other then
                [ String.toLower (toString q), "other" ]
            else
                [ String.toLower (toString q) ]


haystackToString : Haystack -> Bool -> List String
haystackToString haystack plural =
    let
        description =
            (Maybe.withDefault [] (Maybe.map String.words haystack.description))

        restriction =
            (Maybe.withDefault [] (Maybe.map String.words haystack.restriction))

        category =
            if plural then
                Words.plural haystack.category
            else
                haystack.category
    in
        description ++ [ category ] ++ restriction


oneOrBody : Maybe Quantifier -> Haystack -> Bool
oneOrBody quantifier haystack =
    case quantifier of
        Nothing ->
            False

        Just q ->
            List.member q [ Every, Some, Any ]
                && List.member haystack.category [ "one", "body" ]
                && haystack.description
                == Nothing
