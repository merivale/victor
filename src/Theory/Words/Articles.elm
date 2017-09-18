module Theory.Words.Articles exposing (article)

import Theory.Object.Pseudo as Pseudo
import Theory.Words.Pronouns as Pronouns


article : Bool -> Pseudo.Pointer -> String
article plural pointer =
    case ( pointer, plural ) of
        ( Pseudo.The, _ ) ->
            "the"

        ( Pseudo.This, False ) ->
            "this"

        ( Pseudo.This, True ) ->
            "these"

        ( Pseudo.That, False ) ->
            "that"

        ( Pseudo.That, True ) ->
            "those"

        ( Pseudo.RelatedTo object, _ ) ->
            Pronouns.relative1 object
