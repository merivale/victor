module Theory.Sentences exposing (sentence)

{-| The English sentence (a function of a message).
-}

import Maybe
import Result exposing (andThen)
import Theory.Types exposing (..)
import Theory.Messages as Messages
import Theory.Words as Words


{-| The entry point for encoding a message. The encoding process is split into
two stages. In the first "exploding" stage, the message is validated, and the
several variables that determine the output sentence are gathered. In the second
"imploding" stage, these variables are then used to generate the sentence
itself. The first of these stages is handled by the Messages module. The second
stage is handled here.
-}
sentence : Message -> Result String String
sentence message =
    Messages.explode message
        |> andThen implode


{-| As seen in the function below, the sentence is divided into four sections:
(1) subject, (2) pre, (3) counter, and (4) post. The last of these is just a
list of words, already encoded.
-}
implode : Vars -> Result String String
implode vars =
    Ok (String.join " " ((subject vars) ++ (pre vars) ++ (counter vars) ++ vars.post))


{-| The subject of the sentence, which is a function either of the object, or -
in the case of indirect, enumerated, or amassed messages - some object override.
In the former case, it is generated very straightforwardly by the Words module.
In the latter case (which gives rise to noun phrases like "the king", "all 
people", "some cars") the process is more involved, calling on the nounPhrase
function defined shortly.
-}
subject : Vars -> List String
subject vars =
    case vars.objectOverride of
        Nothing ->
            [ Words.direct1 vars.object ]

        Just objectOverride ->
            nounPhrase vars.object objectOverride


{-| Much like the subject, the counter is a function either of the balance, or -
in the case of indirect, enumerated, or amassed messages - some object override.
No balance just returns an empty list; a custom balance is simply returned as it
is; balancing objects are handled in much the same way as main objects or their
overrides, in the latter case calling again on the nounPhrase function. If the
nucleus of the message is passive, then the word "by" is added at the start, as
in "He is liked *by* her".
-}
counter : Vars -> List String
counter vars =
    case vars.balance of
        Nothing ->
            []

        Just SameObject ->
            let
                list =
                    [ Words.direct2 vars.object ]
            in
                if vars.passive then
                    "by" :: list
                else
                    list

        Just (IndependentObject object) ->
            let
                list =
                    case vars.balanceOverride of
                        Nothing ->
                            [ Words.direct3 object ]

                        Just objectOverride ->
                            nounPhrase object objectOverride
            in
                if vars.passive then
                    "by" :: list
                else
                    list

        Just (CustomBalance string) ->
            String.words string


{-| And now for the nounPhrase function itself, advertised above. Step one is
just to divide into two cases, article phrases ("the F", "those Gs") and
determiner phrases ("F", "all Gs", "every H"). Note that whether the noun phrase
is singular or plural is determined by the object, not by anything in the
override itself.
-}
nounPhrase : Object -> ObjectOverride -> List String
nounPhrase object objectOverride =
    let
        plural =
            case object of
                Speakers ->
                    True

                Hearers ->
                    True

                Others string ->
                    True

                _ ->
                    False
    in
        case objectOverride of
            PointerOverride pointer other haystack ->
                articlePhrase plural pointer other haystack

            QuantifierOverride negated quantifier other haystack ->
                determinerPhrase plural negated quantifier other haystack


{-| Article phrases are straightforward; simply get the article from the
pointer, get a list of words from the haystack, and combine them - optionally
with "other" inserted in between.
-}
articlePhrase : Bool -> Pointer -> Bool -> Haystack -> List String
articlePhrase plural pointer other haystack =
    let
        article =
            Words.article plural pointer
    in
        if other then
            [ article, "other" ] ++ (haystackToString False plural haystack)
        else
            article :: (haystackToString False plural haystack)


{-| Determiner phrases would be similarly straightforward, except that things
like "anybody", "everyone", "something" do not fit the general pattern.
-}
determinerPhrase : Bool -> Bool -> (Maybe Quantifier) -> Bool -> Haystack -> List String
determinerPhrase plural negated quantifier other haystack =
    let
        canAbbreviate =
            List.member quantifier [ Just Every, Just Some, Just Any ]
                && List.member haystack.category [ "one", "body", "thing" ]
    in
        (determiner canAbbreviate quantifier other haystack)
            ++ (haystackToString canAbbreviate plural haystack)


{-| Encode the quantifier into a determiner. Although in general this function
returns a list of words, rather than just the determiner. This complication is
necessary to deal with abbreviations ("someone", "everyone", etc.), and also
"another".
-}
determiner : Bool -> Maybe Quantifier -> Bool -> Haystack -> List String
determiner canAbbreviate quantifier other haystack =
    case quantifier of
        Nothing ->
            if other then
                [ "other" ]
            else
                []

        Just A ->
            if other then
                [ (Words.determiner A) ++ "nother" ]
            else if List.member (String.left 1 haystack.category) [ "a", "e", "i", "o", "u" ] then
                [ (Words.determiner A) ++ "n" ]
            else
                [ Words.determiner A ]

        Just q ->
            if canAbbreviate then
                if other then
                    [ (Words.determiner q) ++ haystack.category, "else" ]
                else
                    [ (Words.determiner q) ++ haystack.category ]
            else if other then
                [ Words.determiner q, "other" ]
            else
                [ Words.determiner q ]


{-| Encode the haystack. Essentially a simple matter, with just one slight
wrinkle: the category needs to be suppressed in the case of abbreviation, since
it is already included in the determiner ("someone", "everything", etc.).
-}
haystackToString : Bool -> Bool -> Haystack -> List String
haystackToString canAbbreviate plural haystack =
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
        if canAbbreviate then
            description ++ restriction
        else
            description ++ [ category ] ++ restriction


{-| That concludes the functions necessary for encoding subjects and counters.
Now for the complicated part: encoding the pre section (which includes the
fulcrum). This is complicated for a few reasons. Firstly, we have to distinguish
cases where the message has a modality from those where it doesn't. Second, we
have to conjugate the verb or modal. Third, we have to position the fulcrum
in the appropriate place, bearing in mind that "be" and "have" behave
differently from other verbs in this regard. Finally, and most awkwardly of all,
we potentially have to jig things around for messages involving negation,
perhaps inserting a dummy "do" verb as the fulcrum.
-}
pre : Vars -> List String
pre vars =
    case vars.modality of
        Nothing ->
            (finiteVerbPhrase vars.past vars.object vars.longPivot) :: (List.map baseVerbPhrase vars.longPivots)

        Just m ->
            (Words.modal m vars.past) :: (List.map baseVerbPhrase (vars.longPivot :: vars.longPivots))


{-| Fulcrum and pre stuff...
-}
finiteVerbPhrase : Bool -> Object -> LongPivot -> String
finiteVerbPhrase past object longPivot =
    let
        ( verbBase, rest ) =
            verbBaseAndRest longPivot.pivot longPivot.prior

        fulcrum =
            conjugate verbBase past object
    in
        combine longPivot.prior (verbBase == "be") longPivot.pre fulcrum rest


baseVerbPhrase : LongPivot -> String
baseVerbPhrase longPivot =
    let
        ( verbBase, rest ) =
            verbBaseAndRest longPivot.pivot longPivot.prior
    in
        String.join " " (longPivot.pre ++ (verbBase :: rest))


combine : Bool -> Bool -> List String -> String -> List String -> String
combine be prior pre verb rest =
    if prior || be then
        String.join " " (verb :: (pre ++ rest))
    else if List.member "not" pre then
        let
            ( newPre, newRest ) =
                splitAtNot 0 pre rest
        in
            String.join " " (newPre ++ (verb :: newRest))
    else
        String.join " " (pre ++ (verb :: rest))


splitAtNot : Int -> List String -> List String -> ( List String, List String )
splitAtNot index pre rest =
    case List.head (List.drop index pre) of
        Nothing ->
            ( pre, rest )

        Just word ->
            if word == "not" then
                ( List.take index pre, (List.drop index pre) ++ rest )
            else
                splitAtNot (index + 1) pre rest


conjugate : String -> Bool -> Object -> String
conjugate base past object =
    let
        thirdSingular =
            case object of
                Male string ->
                    True

                Female string ->
                    True

                Other string ->
                    True

                _ ->
                    False
    in
        if base == "be" then
            if past then
                if thirdSingular || object == Speaker then
                    "was"
                else
                    "were"
            else
                if object == Speaker then
                    "am"
                else if thirdSingular then
                    "is"
                else
                    "are"
        else
            if past then
                Words.finite2 base
            else if thirdSingular then
                Words.finite1 base
            else
                base


verbBaseAndRest : Pivot -> Bool -> ( String, List String )
verbBaseAndRest pivot prior =
    let
        ( verb, rest ) =
            case pivot of
                Be string ongoing ->
                    case ( string, ongoing ) of
                        ( Just str, True ) ->
                            ( "be", [ "being", str ] )

                        ( Just str, False ) ->
                            ( "be", [ str ] )

                        ( Nothing, True ) ->
                            ( "be", [ "being" ] )

                        ( Nothing, False ) ->
                            ( "be", [] )

                Do string ongoing passive ->
                    case ( ongoing, passive ) of
                        ( True, True ) ->
                            ( "be" , [ "being", Words.participle2 string ] )

                        ( True, False ) ->
                            ( "be", [ Words.participle1 string ] )

                        ( False, True ) ->
                            ( "be", [ Words.participle2 string ] )

                        ( False, False ) ->
                            ( string, [] )
    in
        if prior then
            ( "have", (Words.participle2 verb) :: rest )
        else
            ( verb, rest )
