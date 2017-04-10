module Theory.Fulcrums
    exposing
        ( negate
        , abbreviate
        , modal
        , verb
        )

{-| Functions for generating/modifying fulcrums (i.e. the verb or modal at the
heart of every clause. Relies on the Words module for getting the appropriate
form of the verb.
-}

import Theory.Types exposing (..)
import Theory.Words as Words


{-| Get the appropriate form of a modal from a modality.
-}
modal : Modality -> Bool -> Bool -> String
modal modality past negated =
    case modality of
        SoftYes ->
            if past then
                "would"
            else
                "will"

        HardYes ->
            if negated then
                "need"
            else
                "must"

        SoftMaybe ->
            if past then
                "might"
            else
                "may"

        HardMaybe ->
            if past then
                "could"
            else
                "can"

        SoftYesIsh ->
            "should"

        HardYesIsh ->
            "ought"

        Permission ->
            if past then
                "might"
            else
                "may"

        Command ->
            if past then
                "should"
            else
                "shall"

        Dare ->
            "dare"


{-| Conjugate a verb. The verb itself is not encoded by my system, but must be
entered directly by the user.
-}
verb : String -> Bool -> Bool -> Bool -> String
verb fulcrum past amNeeded isNeeded =
    if fulcrum == "be" then
        if past then
            if amNeeded || isNeeded then
                "was"
            else
                "were"
        else if amNeeded then
            "am"
        else if isNeeded then
            "is"
        else
            "are"
    else if past then
        Words.past fulcrum
    else if isNeeded then
        Words.present fulcrum
    else
        fulcrum


{-| Negate a fulcrum, optionally with abbreviation of "not" to "n't".
-}
negate : String -> Bool -> String
negate fulcrum abbreviateNot =
    if abbreviateNot then
        if ntAble fulcrum then
            fulcrum ++ "n't"
        else if fulcrum == "will" then
            "won't"
        else if fulcrum == "can" then
            "can't"
        else if fulcrum == "shall" then
            "shan't"
        else
            fulcrum ++ " not"
    else
        fulcrum ++ " not"


ntAble : String -> Bool
ntAble fulcrum =
    List.member fulcrum
        [ "is"
        , "are"
        , "was"
        , "were"
        , "have"
        , "has"
        , "had"
        , "do"
        , "does"
        , "did"
        , "would"
        , "could"
        , "should"
        , "must"
        , "need"
        , "dare"
        ]


{-| Abbreviate a fulcrum. This function is a little more involved that it might
otherwise be, because the fulcrum might previously have been negated, in which
case it might consist of two words (the second being "not"). Thus we need to be
sure we are only abbreviating the first word.
-}
abbreviate : String -> String
abbreviate fulcrum =
    let
        ( head, tail ) =
            case String.words fulcrum of
                head :: tail ->
                    case head of
                        "am" ->
                            ( "'m", tail )

                        "is" ->
                            ( "'s", tail )

                        "are" ->
                            ( "'re", tail )

                        "have" ->
                            ( "'ve", tail )

                        "has" ->
                            ( "'s", tail )

                        "had" ->
                            ( "'d", tail )

                        "will" ->
                            ( "'ll", tail )

                        "would" ->
                            ( "'d", tail )

                        _ ->
                            ( " " ++ head, tail )

                [] ->
                    ( "", [] )
    in
        String.join " " (head :: tail)
