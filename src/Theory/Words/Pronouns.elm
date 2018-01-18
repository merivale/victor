module Theory.Words.Pronouns
    exposing
        ( direct1
        , direct2
        , direct3
        , relative1
        , relative2
        )

import Theory.Ideas.Nucleus as Nucleus


direct1 : Nucleus.Object -> String
direct1 object =
    case object of
        Nucleus.Speaker False ->
            "I"

        Nucleus.Speaker True ->
            "we"

        Nucleus.Hearer plural ->
            "you"

        Nucleus.Other False Nothing Nothing ->
            "it"

        Nucleus.Other False (Just Nucleus.Male) Nothing ->
            "he"

        Nucleus.Other False (Just Nucleus.Female) Nothing ->
            "she"

        Nucleus.Other True sex Nothing ->
            "they"

        Nucleus.Other plural sex (Just string) ->
            string


direct2 : Nucleus.Object -> String
direct2 object =
    case object of
        Nucleus.Speaker False ->
            "me"

        Nucleus.Speaker True ->
            "us"

        Nucleus.Hearer plural ->
            "you"

        Nucleus.Other False Nothing Nothing ->
            "it"

        Nucleus.Other False (Just Nucleus.Male) Nothing ->
            "him"

        Nucleus.Other False (Just Nucleus.Female) Nothing ->
            "her"

        Nucleus.Other True sex Nothing ->
            "them"

        Nucleus.Other plural sex (Just string) ->
            string


direct3 : Nucleus.Object -> String
direct3 object =
    case object of
        Nucleus.Speaker False ->
            "myself"

        Nucleus.Speaker True ->
            "ourselves"

        Nucleus.Hearer False ->
            "yourself"

        Nucleus.Hearer True ->
            "yourselves"

        Nucleus.Other False Nothing string ->
            "itself"

        Nucleus.Other False (Just Nucleus.Male) string ->
            "himself"

        Nucleus.Other False (Just Nucleus.Female) string ->
            "herself"

        Nucleus.Other True sex string ->
            "themselves"


relative1 : Nucleus.Object -> String
relative1 object =
    case object of
        Nucleus.Speaker False ->
            "my"

        Nucleus.Speaker True ->
            "our"

        Nucleus.Hearer plural ->
            "your"

        Nucleus.Other False Nothing Nothing ->
            "its"

        Nucleus.Other False (Just Nucleus.Male) Nothing ->
            "his"

        Nucleus.Other False (Just Nucleus.Female) Nothing ->
            "her"

        Nucleus.Other True sex Nothing ->
            "their"

        Nucleus.Other plural sex (Just string) ->
            string ++ "’s"


relative2 : Nucleus.Object -> String
relative2 object =
    case object of
        Nucleus.Speaker False ->
            "mine"

        Nucleus.Speaker True ->
            "ours"

        Nucleus.Hearer plural ->
            "yours"

        Nucleus.Other False Nothing Nothing ->
            "its"

        Nucleus.Other False (Just Nucleus.Male) Nothing ->
            "his"

        Nucleus.Other False (Just Nucleus.Female) Nothing ->
            "hers"

        Nucleus.Other True sex Nothing ->
            "theirs"

        Nucleus.Other plural sex (Just string) ->
            string ++ "’s"
