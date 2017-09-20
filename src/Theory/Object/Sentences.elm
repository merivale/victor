module Theory.Object.Sentences exposing (sentence)

import Result
import Theory.Plain.Nucleus as Nucleus
import Theory.Long.Displacers as Displacers
import Theory.Object.Pseudo as Pseudo
import Theory.Object.Messages as Messages
import Theory.Words.Counters as Counters
import Theory.Words.Fulcrums as Fulcrums
import Theory.Words.Pronouns as Pronouns
import Theory.Words.Verbs as Verbs
import Theory.Words.Modals as Modals
import Theory.Words.Nouns as Nouns
import Theory.Words.Articles as Articles
import Theory.Words.Determiners as Determiners
import Theory.Words.Utils as Utils


sentence : Messages.Message -> Result String String
sentence message =
    Messages.explode message |> (Result.map implode)


implode : Messages.Vars -> String
implode vars =
    String.join " " ((subject vars) ++ (predicate vars))


subject : Messages.Vars -> List String
subject vars =
    case vars.pseudoObject of
        Messages.DirectObject ->
            [ Pronouns.direct1 vars.object ]

        Messages.IndirectObject description ->
            articlePhrase (Nucleus.isPlural vars.object) description

        Messages.EnumeratedObject negated multiplicity ->
            enumeratedDeterminerPhrase (Nucleus.isPlural vars.object) negated multiplicity

        Messages.AmassedObject negated proportion ->
            amassedDeterminerPhrase (Nucleus.isPlural vars.object) negated proportion


predicate : Messages.Vars -> List String
predicate vars =
    case vars.modality of
        Nothing ->
            (verbPhrase vars)
                ++ (List.map (baseVerbPhrase True) vars.displaced)
                ++ (List.map (nounPhrase vars.object) vars.balances)
                ++ (List.reverse vars.post)

        Just modality ->
            let
                addTo =
                    modality == Displacers.Yes3 && not vars.negatedModality && vars.past

                displaced =
                    { prior = vars.prior, pre = vars.pre, pivot = vars.pivot }
            in
                [ Modals.modal vars.past vars.negatedModality modality ]
                    ++ (List.map (baseVerbPhrase addTo) (displaced :: vars.displaced))
                    ++ (List.map (nounPhrase vars.object) vars.balances)
                    ++ (List.reverse vars.post)


verbPhrase : Messages.Vars -> List String
verbPhrase vars =
    let
        ( base, rest ) =
            Fulcrums.fulcrum vars.prior vars.pivot
    in
        if vars.prior || base == "be" then
            (Verbs.conjugate vars.object vars.past base) :: (vars.pre ++ rest)
        else if List.member "not" vars.pre then
            let
                ( newPre, newRest ) =
                    Utils.splitAtNot vars.pre (base :: rest)
            in
                newPre ++ ((Verbs.conjugate vars.object vars.past "do") :: newRest)
        else
            vars.pre ++ ((Verbs.conjugate vars.object vars.past base) :: rest)


baseVerbPhrase : Bool -> Messages.Displaced -> String
baseVerbPhrase addTo { prior, pre, pivot } =
    let
        ( base, rest ) =
            Fulcrums.fulcrum prior pivot

        newPre =
            if addTo then
                "to" :: pre
            else
                pre
    in
        String.join " " (newPre ++ (base :: rest))


nounPhrase : Nucleus.Object -> Messages.PseudoBalance -> String
nounPhrase mainObject balance =
    case balance of
        Messages.DirectBalance ( relator, weight ) ->
            Counters.counter mainObject ( relator, weight )

        Messages.IndirectBalance relator object description ->
            String.join " "
                ((Counters.prefix relator)
                    ++ (articlePhrase (Nucleus.isPlural object) description)
                )

        Messages.EnumeratedBalance relator object negated multiplicity ->
            String.join " "
                ((Counters.prefix relator)
                    ++ (enumeratedDeterminerPhrase (Nucleus.isPlural object) negated multiplicity)
                )

        Messages.AmassedBalance relator object negated proportion ->
            String.join " "
                ((Counters.prefix relator)
                    ++ (amassedDeterminerPhrase (Nucleus.isPlural object) negated proportion)
                )


articlePhrase : Bool -> Pseudo.Description -> List String
articlePhrase plural ( pointer, other, haystack ) =
    let
        article =
            Articles.article plural pointer
    in
        if other then
            [ article, "other" ] ++ (haystackToString False plural haystack)
        else
            article :: (haystackToString False plural haystack)


enumeratedDeterminerPhrase : Bool -> Bool -> Pseudo.Multiplicity -> List String
enumeratedDeterminerPhrase plural negated ( quantifier, other, haystack ) =
    determinerPhrase plural negated (Just quantifier) other haystack


amassedDeterminerPhrase : Bool -> Bool -> Pseudo.Proportion -> List String
amassedDeterminerPhrase plural negated ( quantifier, other, haystack ) =
    determinerPhrase plural negated quantifier other haystack


determinerPhrase : Bool -> Bool -> Maybe Pseudo.Quantifier -> Bool -> Pseudo.Haystack -> List String
determinerPhrase plural negated quantifier other haystack =
    let
        ( category, property, restriction ) =
            haystack

        canAbbreviate =
            List.member quantifier [ Just Pseudo.Every, Just Pseudo.Some, Just Pseudo.Any ]
                && List.member category [ "one", "body", "thing", "where" ]
                && not plural

        positive =
            (determiner canAbbreviate quantifier other category)
                ++ (haystackToString canAbbreviate plural haystack)
    in
        if negated then
            negateDeterminer positive
        else
            positive


determiner : Bool -> Maybe Pseudo.Quantifier -> Bool -> String -> List String
determiner canAbbreviate quantifier other category =
    case quantifier of
        Nothing ->
            if other then
                [ "other" ]
            else
                []

        Just (Pseudo.A) ->
            if other then
                [ (Determiners.determiner Pseudo.A) ++ "nother" ]
            else if List.member (String.left 1 category) [ "a", "e", "i", "o", "u" ] then
                [ (Determiners.determiner Pseudo.A) ++ "n" ]
            else
                [ Determiners.determiner Pseudo.A ]

        Just q ->
            if canAbbreviate then
                if other then
                    [ (Determiners.determiner q) ++ category, "else" ]
                else
                    [ (Determiners.determiner q) ++ category ]
            else if other then
                [ Determiners.determiner q, "other" ]
            else
                [ Determiners.determiner q ]


haystackToString : Bool -> Bool -> Pseudo.Haystack -> List String
haystackToString canAbbreviate plural ( category, property, restriction ) =
    if canAbbreviate then
        (Utils.splitMaybeString property)
            ++ (Utils.splitMaybeString restriction)
    else if plural then
        (Utils.splitMaybeString property)
            ++ [ Nouns.plural category ]
            ++ (Utils.splitMaybeString restriction)
    else
        (Utils.splitMaybeString property)
            ++ [ category ]
            ++ (Utils.splitMaybeString restriction)


negateDeterminer : List String -> List String
negateDeterminer determinerPhrase =
    case List.head determinerPhrase of
        Just "some" ->
            "no" :: (List.drop 1 determinerPhrase)

        Just "someone" ->
            "no one" :: (List.drop 1 determinerPhrase)

        Just "somebody" ->
            "nobody" :: (List.drop 1 determinerPhrase)

        Just "something" ->
            "nothing" :: (List.drop 1 determinerPhrase)

        _ ->
            "not" :: determinerPhrase
