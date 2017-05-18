module Theory.Messages exposing (explode)

{-| The English sentence (a function of a message).
-}

import Maybe
import Result exposing (andThen)
import Theory.Types exposing (..)
import Theory.Nouns as Nouns
import Theory.Fulcrums as Fulcrums
import Theory.Words as Words


{-| "Explode" a message, i.e. unpack its structure recursively, check it for
validity, and keep track of all the variables that have an effect on the output
sentence. For convenience, these variables are all grouped together in the Vars
record.
-}
explode : Message -> Result String Vars
explode message =
    case message of
        Plain nucleus ->
            plain nucleus

        Negative subMessage ->
            explode subMessage
                |> andThen negative

        Past subMessage ->
            explode subMessage
                |> andThen past

        Prior subMessage ->
            explode subMessage
                |> andThen prior

        Expanded pivot subMessage ->
            explode subMessage
                |> andThen (expanded pivot)

        Practical modality subMessage ->
            explode subMessage
                |> andThen (practical modality)

        Evasive modality subMessage ->
            explode subMessage
                |> andThen (evasive modality)

        Projective modality time subMessage ->
            explode subMessage
                |> andThen (projective modality time)

        Preordained time subMessage ->
            explode subMessage
                |> andThen (preordained time)

        Regular frequency subMessage ->
            explode subMessage
                |> andThen (regular frequency)

        Extended duration subMessage ->
            explode subMessage
                |> andThen (extended duration)

        Scattered tally subMessage ->
            explode subMessage
                |> andThen (scattered tally)

        Indirect target pointer other haystack plural subMessage ->
            explode subMessage
                |> andThen (indirect target pointer other haystack plural)

        Enumerated target quantifier other haystack subMessage ->
            explode subMessage
                |> andThen (enumerated target quantifier other haystack)

        Amassed target quantifier other haystack countable subMessage ->
            explode subMessage
                |> andThen (amassed target quantifier other haystack countable)


{-| Functions needed by the explode function (one for plain messages, and then
one for each elaboration). These functions check the message for validity, and,
if it is valid, pass the resulting Vars onto the function for the next
elaboration in the hierarchy.
-}
plain : Nucleus -> Result String Vars
plain { object, condition } =
    let
        ( be, beProperty, beBalance, beCustomBalance ) =
            case condition.pivot of
                Be property ongoing ->
                    case condition.balance of
                        Nothing ->
                            ( True, property /= Nothing, False, False )

                        Just (CustomBalance string) ->
                            ( True, property /= Nothing, True, True )

                        _ ->
                            ( True, property /= Nothing, True, False )

                Do verb ongoing passive ->
                    ( False, False, False, False )
    in
        if beProperty && beBalance then
            Err "pivot BE + property cannot have a balance"
        else if be && not (beProperty || beBalance) then
            Err "pivot BE requires either a property or a balancing object"
        else if beCustomBalance then
            Err "pivot BE cannot take a custom balance"
        else
            Ok
                { past = False
                , prior = False
                , projective = False
                , negateObject = False
                , objectOverride = False
                , balanceObject = Maybe.withDefault False (Maybe.map isIndependentObject condition.balance)
                , balanceOverride = False
                , subject = [ Nouns.subject object ]
                , modality = Nothing
                , negatedModality = False
                , amNeeded = object == Speaker
                , isNeeded = isThirdPersonSingular object
                , verb = verb condition.pivot
                , pre1 = []
                , pre2 = pre2 condition.pivot
                , counter = Maybe.withDefault [] (Maybe.map (counter object condition.pivot) condition.balance)
                , post = []
                }


{-| A few functions needed to generate the initial variables.
-}
isIndependentObject : Balance -> Bool
isIndependentObject balance =
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


verb : Pivot -> String
verb pivot =
    case pivot of
        Be string ongoing ->
            "be"

        Do string ongoing passive ->
            if ongoing || passive then
                "be"
            else
                string


pre2 : Pivot -> List String
pre2 pivot =
    case pivot of
        Be string ongoing ->
            let
                base =
                    case string of
                        Nothing ->
                            []

                        Just s ->
                            [ s ]
            in
                if ongoing then
                    "being" :: base
                else
                    base

        Do string ongoing passive ->
            case ( ongoing, passive ) of
                ( True, True ) ->
                    [ "being", Words.prior string ]

                ( True, False ) ->
                    [ Words.ongoing string ]

                ( False, True ) ->
                    [ Words.prior string ]

                ( False, False ) ->
                    []


counter : Object -> Pivot -> Balance -> List String
counter object pivot balance =
    case balance of
        SameObject ->
            if isPassive pivot then
                [ "by", Nouns.reflexiveObject object ]
            else
                [ Nouns.reflexiveObject object ]

        IndependentObject indpendentObject ->
            if isPassive pivot then
                [ "by", Nouns.independentObject indpendentObject ]
            else
                [ Nouns.independentObject indpendentObject ]

        CustomBalance string ->
            String.words string


isPassive : Pivot -> Bool
isPassive pivot =
    case pivot of
        Be property ongoing ->
            False

        Do verb ongoing passive ->
            passive


negative : Vars -> Result String Vars
negative vars =
    if vars.negateObject then
        case vars.subject of
            "some" :: tail ->
                Ok { vars | subject = "no" :: tail }

            "someone" :: tail ->
                Ok { vars | subject = "no one" :: tail }

            "somebody" :: tail ->
                Ok { vars | subject = "nobody" :: tail }

            "something" :: tail ->
                Ok { vars | subject = "nothing" :: tail }

            _ ->
                Ok { vars | subject = "not" :: vars.subject }
    else
        case vars.modality of
            Nothing ->
                Ok { vars | pre1 = "not" :: vars.pre1 }

            Just modality ->
                case modality of
                    SoftYes ->
                        Err "the SOFT YES modality (WILL) cannot be negated"

                    SoftMaybe ->
                        Err "the SOFT MAYBE modality (MAY) cannot be negated"

                    SoftYesIsh ->
                        Err "the SOFT YES-ISH modality (SHOULD) cannot be negated"

                    HardYesIsh ->
                        Err "the HARD YES-ISH modality (OUGHT) cannot be negated"

                    Command ->
                        Err "the COMMAND modality (SHALL) cannot be negated"

                    _ ->
                        Ok { vars | negatedModality = True, pre1 = "not" :: vars.pre1 }


past : Vars -> Result String Vars
past vars =
    if vars.past then
        Err "past messages cannot be made more past"
    else if vars.modality == Just HardYes then
        Err "messages with the HARD YES modality (MUST/NEED) cannot be made past"
    else if vars.modality == Just SoftYesIsh then
        Err "messages with the SOFT YES-ISH modality (SHOULD) cannot be made past"
    else if vars.modality == Just HardYesIsh then
        Err "messages with the HARD YES-ISH modality (OUGHT) cannot be made past"
    else if vars.modality == Just Dare then
        Err "messages with the DARE modality (DARE) cannot be made past"
    else
        Ok { vars | past = True }


prior : Vars -> Result String Vars
prior vars =
    if vars.prior then
        Err "prior messages cannot be made more prior"
    else if not (vars.modality == Nothing) && vars.projective && not vars.past then
        Err "only past projective messages can be prior"
    else if not (vars.modality == Nothing) && not vars.projective then
        Err "practical and evasive messages cannot be prior"
    else
        Ok { vars | prior = True, verb = "have", pre1 = [], pre2 = (vars.pre1 ++ ((Words.prior vars.verb) :: vars.pre2)) }


expanded : Pivot -> Vars -> Result String Vars
expanded pivot vars =
    if vars.past then
        Err "past messages cannot be made expanded"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made expanded"
    else
        case pivot of
            Be property ongoing ->
                if ongoing then
                    Err "pivot BE in an expanded condition cannot be ongoing"
                else
                    case property of
                        Nothing ->
                            let
                                newVars =
                                    displaceVerb vars "be" (Just "to") identity
                            in
                                Ok { newVars | prior = False, negateObject = False }

                        Just prop ->
                            let
                                newVars =
                                    displaceVerb vars "be" (Just (prop ++ " to")) identity
                            in
                                Ok { newVars | prior = False, negateObject = False }

            Do verb ongoing passive ->
                case ( ongoing, passive ) of
                    ( True, True ) ->
                        let
                            newVars =
                                displaceVerb vars "be" (Just ("being " ++ (Words.prior verb) ++ " to")) identity
                        in
                            Ok { newVars | prior = False, negateObject = False }

                    ( True, False ) ->
                        let
                            newVars =
                                displaceVerb vars "be" (Just ((Words.ongoing verb) ++ " to")) identity
                        in
                            Ok { newVars | prior = False, negateObject = False }

                    ( False, True ) ->
                        let
                            newVars =
                                displaceVerb vars "be" (Just ((Words.prior verb) ++ " to")) identity
                        in
                            Ok { newVars | prior = False, negateObject = False }

                    ( False, False ) ->
                        let
                            newVars =
                                displaceVerb vars verb (Just ("to")) identity
                        in
                            Ok { newVars | prior = False, negateObject = False }


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


practical : Modality -> Vars -> Result String Vars
practical modality vars =
    if vars.past then
        Err "past messages cannot be made practical"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be elaborated with another modality"
    else
        Ok { vars | negateObject = False, modality = Just modality }


evasive : Modality -> Vars -> Result String Vars
evasive modality vars =
    if vars.past then
        Err "past messages cannot be made evasive"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be elaborated with another modality"
    else
        Ok { vars | negateObject = False, modality = Just modality }


projective : Modality -> Maybe Time -> Vars -> Result String Vars
projective modality time vars =
    if vars.past then
        Err "past messages cannot be made projective"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be elaborated with another modality"
    else
        case time of
            Nothing ->
                Ok { vars | projective = True, negateObject = False, modality = Just modality }

            Just string ->
                Ok { vars | projective = True, negateObject = False, modality = Just modality, post = vars.post ++ [ string ] }


preordained : Maybe Time -> Vars -> Result String Vars
preordained time vars =
    if vars.past then
        Err "past messages cannot be made preordained"
    else if vars.prior then
        Err "prior messages cannot be made preordained"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made preordained"
    else
        case time of
            Nothing ->
                Ok vars

            Just string ->
                Ok { vars | negateObject = False, post = vars.post ++ [ string ] }


regular : Maybe Frequency -> Vars -> Result String Vars
regular frequency vars =
    if vars.past then
        Err "past messages cannot be made regular"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made regular"
    else
        case frequency of
            Nothing ->
                Ok vars

            Just string ->
                Ok { vars | negateObject = False, pre1 = string :: vars.pre1 }


extended : Duration -> Vars -> Result String Vars
extended duration vars =
    if vars.past then
        Err "past messages cannot be made extended"
    else if vars.prior then
        Err "prior messages cannot be made extended"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made extended"
    else
        Ok { vars | negateObject = False, post = vars.post ++ [ duration ] }


scattered : Tally -> Vars -> Result String Vars
scattered tally vars =
    if vars.past then
        Err "past messages cannot be made scattered"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made scattered"
    else
        Ok { vars | negateObject = False, post = vars.post ++ [ tally ] }


indirect : Target -> Pointer -> Bool -> Haystack -> Bool -> Vars -> Result String Vars
indirect target pointer other haystack plural vars =
    case target of
        MainObject ->
            if vars.objectOverride then
                Err "the main object cannot be overridden twice"
            else
                Ok { vars | objectOverride = True, amNeeded = False, isNeeded = not plural, subject = Nouns.pointerPhrase pointer other haystack plural }

        BalancingObject ->
            if not vars.balanceObject then
                Err "there is no balancing object to override"
            else if vars.balanceOverride then
                Err "the balancing object cannot be overridden twice"
            else
                Ok { vars | balanceOverride = True, counter = Nouns.pointerPhrase pointer other haystack plural }


enumerated : Target -> Quantifier -> Bool -> Haystack -> Vars -> Result String Vars
enumerated target quantifier other haystack vars =
    if not (List.member quantifier [ A, Several, Many, Each, Every, Both, Some, Any ]) then
        Err "this quantifier cannot be used in enumerated elaborations"
    else
        let
            plural =
                List.member quantifier [ Several, Many, Both ]

            quantifierPhrase =
                Nouns.quantifierPhrase True (Just quantifier) other haystack plural
        in
            case target of
                MainObject ->
                    if vars.objectOverride then
                        Err "the main object cannot be overridden twice"
                    else
                        let
                            newVars =
                                if List.member quantifier [ Many, Every, Both, Some, Any ] then
                                    { vars | negateObject = True }
                                else
                                    vars
                        in
                            Ok { newVars | objectOverride = True, amNeeded = False, isNeeded = not plural, subject = quantifierPhrase }

                BalancingObject ->
                    if not vars.balanceObject then
                        Err "there is no balancing object to override"
                    else if vars.balanceOverride then
                        Err "the balancing object cannot be overridden twice"
                    else
                        Ok { vars | negateObject = False, balanceOverride = True, counter = quantifierPhrase }


amassed : Target -> Maybe Quantifier -> Bool -> Haystack -> Bool -> Vars -> Result String Vars
amassed target quantifier other haystack countable vars =
    if not (List.member (Maybe.withDefault All quantifier) [ Some, Any, All, Much, Most, Enough ]) then
        Err "this quantifier cannot be used in amassed elaborations"
    else if quantifier == Just Much && countable then
        Err "the MUCH quantifier cannot be used with countable categories"
    else
        let
            quantifierPhrase =
                Nouns.quantifierPhrase False quantifier other haystack countable
        in
            case target of
                MainObject ->
                    if vars.objectOverride then
                        Err "the main object cannot be overridden twice"
                    else
                        let
                            newVars =
                                if List.member quantifier [ Just Some, Just Any, Just All, Just Much, Just Enough ] then
                                    { vars | negateObject = True }
                                else
                                    vars
                        in
                            Ok { newVars | objectOverride = True, amNeeded = False, isNeeded = not countable, subject = quantifierPhrase }

                BalancingObject ->
                    if not vars.balanceObject then
                        Err "there is no balancing object to override"
                    else if vars.balanceOverride then
                        Err "the balancing object cannot be overridden twice"
                    else
                        Ok { vars | negateObject = False, balanceOverride = True, counter = quantifierPhrase }
