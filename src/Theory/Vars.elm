module Theory.Vars
    exposing
        ( initial
        , displaceVerb
        )

{-| Step one in encoding a message is to unpack its structure recursively,
checking that the combination of informational choices is valid, and keeping
track of the effect any given elaboration will have on the output sentence. In
order to do this, the system must keep track of an awkardly large number of
variables, which for convenience are combined into a single "Vars" record.

These variables are, in some cases, directly manipulated by the elaboration
functions in the Sentences module. With a view to making those functions more
maintainable and easy to read, however, some of that manipulation is separated
into this module.
-}

import Maybe
import Theory.Types exposing (..)
import Theory.Nouns as Nouns


{-| Generate the initial variables from a nucleus. This includes: (i) encoding
the object and balance into the subject and counter of the sentence respectively
(although these may later be overriden by an indirect, enumerated, or amassed
elaboration); (ii) saving the initial fulcrum (which may later be shunted to the
left by some elaboration); (iii) determining a few flags that depend on the
nucleus; and (iv) setting all the other flags to False/Nothing/Empty Lists.
-}
initial : Nucleus -> Vars
initial { object, condition, style } =
    { past = False
    , prior = False
    , ongoing = False
    , projective = False
    , negateObject = False
    , objectOverride = False
    , balanceObject = Maybe.withDefault False (Maybe.map isDifferentObject condition.balance)
    , balanceOverride = False
    , subject = [ Nouns.subject object ]
    , modality = Nothing
    , negatedModality = False
    , negatedFulcrum = False
    , abbreviateFulcrum = style.abbreviateFulcrum
    , abbreviateNot = style.abbreviateNot
    , amNeeded = object == Speaker
    , isNeeded = isThirdPersonSingular object
    , verb = condition.pivot
    , pre1 = []
    , pre2 = []
    , counter = Maybe.withDefault [] (Maybe.map (counter object) condition.balance)
    , post = []
    }


{-| A few functions needed to generate the initial variables.
-}
isDifferentObject : Balance -> Bool
isDifferentObject balance =
    case balance of
        IndependentObject object ->
            True

        _ ->
            False


isThirdPersonSingular : Object -> Bool
isThirdPersonSingular object =
    case object of
        Male string ->
            True

        Female string ->
            True

        Thing string ->
            True

        _ ->
            False


counter : Object -> Balance -> List String
counter object balance =
    case balance of
        SameObject ->
            [ Nouns.reflexiveObject object ]

        IndependentObject indpendentObject ->
            [ Nouns.independentObject indpendentObject ]

        CustomBalance string ->
            String.words string


{-| Several elaborations have the effect of displacing the verb at the fulcrum
with another, moving the original verb to the right (possibly with some other
words in the middle). For example, the ongoing elaboration turns "eat" into "be
eating"; the prior elaboration turns "eat" into "have eaten"; the determined
elaboration turns "eat" into "be going to eat"; etc. This also has the effect
of shunting any adverbs along with the original fulcrum: "ocassionaly not eat"
becomes "be going to ocassionally not eat", etc. Since the effect is so common,
it is well worth having a reusable function to implement it.
-}
displaceVerb : Vars -> String -> Maybe String -> (String -> String) -> Vars
displaceVerb vars newVerb inter oldTransformation =
    let
        extendedPre2 =
            vars.pre1 ++ ((oldTransformation vars.verb) :: vars.pre2)
    in
        case inter of
            Nothing ->
                { vars | verb = newVerb, pre1 = [], pre2 = extendedPre2 }

            Just string ->
                { vars | verb = newVerb, pre1 = [], pre2 = string :: extendedPre2 }
