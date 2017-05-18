module Theory.Sentences exposing (sentence)

{-| The English sentence (a function of a message).
-}

import Maybe
import Result exposing (andThen)
import Theory.Types exposing (..)
import Theory.Messages as Messages
import Theory.Nouns as Nouns
import Theory.Fulcrums as Fulcrums
import Theory.Words as Words


{-| The entry point for encoding a message. The encoding process is split into
two stages. In the first "exploding" stage, the message is validated, and the
several variables that determine the output sentence are gathered. In the second
"imploding" stage, these variables are then used to generate the sentence
itself. The second stage is handled directly here; the first stage is farmed out
to the Messages module.
-}
sentence : Message -> Result String String
sentence message =
    Messages.explode message
        |> andThen implode


{-| Function for "imploding" the variables output by the previous function into
an English sentence.
-}
implode : Vars -> Result String String
implode vars =
    let
        ( pre1, pre2 ) =
            rejigPre vars
    in
        Ok (String.join " " (vars.subject ++ pre1 ++ [ fulcrum vars ] ++ pre2 ++ vars.counter ++ vars.post))


{-| Functions needed by the implode function.
-}
rejigPre : Vars -> ( List String, List String )
rejigPre vars =
    if not (vars.modality == Nothing) then
        ( [], vars.pre1 ++ [ vars.verb ] ++ vars.pre2 )
    else if vars.verb == "be" || vars.prior then
        ( [], vars.pre1 ++ vars.pre2 )
    else if List.member "not" vars.pre1 then
        splitAtNot 0 vars.pre1 (vars.verb :: vars.pre2)
    else
        ( vars.pre1, vars.pre2 )


splitAtNot : Int -> List String -> List String -> ( List String, List String )
splitAtNot index pre1 pre2 =
    case List.head (List.drop index pre1) of
        Nothing ->
            ( pre1, pre2 )

        Just word ->
            if word == "not" then
                ( List.take index pre1, (List.drop index pre1) ++ pre2 )
            else
                splitAtNot (index + 1) pre1 pre2


fulcrum : Vars -> String
fulcrum vars =
    case vars.modality of
        Nothing ->
            if vars.verb == "be" || vars.prior || not (List.member "not" vars.pre1) then
                Fulcrums.verb vars.verb vars.past vars.amNeeded vars.isNeeded
            else
                Fulcrums.verb "do" vars.past vars.amNeeded vars.isNeeded

        Just modality ->
            Fulcrums.modal modality vars.past vars.negatedModality













{-| Encode the object/pseudo-object.
-}
subject : MetaObject -> List String
subject metaObject =
    case metaObject of
        RealObject object ->
            [ Nouns.subject object ]

        PseudoObject objectOverride ->
            determinerPhrase objectOverride


counter : MetaBalance -> List String
counter metaBalance =
    case metaBalance of
        RealBalance balance ->
            case balance of
                Nothing ->
                    []

                Just SameObject ->
                    [ Nouns.reflexiveObject object ]

                Just (IndependentObject indpendentObject) ->
                    [ Nouns.independentObject indpendentObject ]

                Just (CustomBalance string) ->
                    String.words string

        PseudoBalance objectOverride ->
            determinerPhrase objectOverride


determinerPhrase : ObjectOverride -> List String
determinerPhrase objectOverride =
    case objectOverride of
        IndirectOverride pointer other haystack plural ->
            Nouns.indirect pointer other haystack plural

        EnumeratedOverride quantifier other haystack plural ->
            Nouns.enumerated quantifier other haystack plural

        AmassedOverride quantifier other haystack countable ->
            Nouns.amassed quantifier other haystack countable

