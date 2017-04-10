module Theory.Sentences exposing (sentence)

{-| The English sentence (a function of a message).
-}

import Result exposing (andThen)
import Theory.Types exposing (..)
import Theory.Vars as Vars
import Theory.Nouns as Nouns
import Theory.Fulcrums as Fulcrums
import Theory.Words as Words


{-| The entry point for encoding a message. The encoding process is split into
two stages. In the first "exploding" stage, the message is validated, and the
several variables that determine the eventually output sentence are gathered. In
the second "imploding" stage, these variables are then used to generate the
sentence itself. Stage one is by far the more complicated of the two.
-}
sentence : Message -> Result String String
sentence message =
    explode message
        |> andThen implode


{-| "Explode" a message, i.e. unpack its structure recursively, check it for
validity, and keep track of all the variables that have an effect on the output
sentence. For convenience, these variables are grouped together in the Vars
record.
-}
explode : Message -> Result String Vars
explode message =
    case message of
        Plain nucleus ->
            Ok (Vars.initial nucleus)

        Negative subMessage ->
            explode subMessage
                |> andThen negative

        Past subMessage ->
            explode subMessage
                |> andThen past

        Prior subMessage ->
            explode subMessage
                |> andThen prior

        Practical modality subMessage ->
            explode subMessage
                |> andThen (practical modality)

        Projective modality time subMessage ->
            explode subMessage
                |> andThen (projective modality time)

        Evasive modality subMessage ->
            explode subMessage
                |> andThen (evasive modality)

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

        Ongoing subMessage ->
            explode subMessage
                |> andThen ongoing

        Determined time subMessage ->
            explode subMessage
                |> andThen (determined time)

        Imminent subMessage ->
            explode subMessage
                |> andThen imminent

        Apparent preferSeem subMessage ->
            explode subMessage
                |> andThen (apparent preferSeem)

        Indirect target pointer other haystack plural subMessage ->
            explode subMessage
                |> andThen (indirect target pointer other haystack plural)

        Enumerated target quantifier other haystack subMessage ->
            explode subMessage
                |> andThen (enumerated target quantifier other haystack)

        Amassed target quantifier other haystack countable subMessage ->
            explode subMessage
                |> andThen (amassed target quantifier other haystack countable)


{-| Function for "imploding" the variables output by the previous function into
an English sentence.
-}
implode : Vars -> Result String String
implode vars =
    let
        ( pre1, tempPre2 ) =
            rejigPre vars

        ( negateFulcrum, pre2 ) =
            shiftNotToBool tempPre2
    in
        if List.isEmpty pre1 then
            Ok (String.join " " ([ subjectAndFulcrum vars negateFulcrum ] ++ pre2 ++ vars.counter ++ vars.post))
        else
            Ok (String.join " " (vars.subject ++ pre1 ++ [ fulcrum vars negateFulcrum ] ++ pre2 ++ vars.counter ++ vars.post))


{-| Functions needed by the explode function. One function for each elaboration.
These functions check the message for validity, and, if it is valid, pass the
resulting Vars onto the function for the next elaboration in the hierarchy.
-}
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
        let
            newVars =
                Vars.displaceVerb vars "have" Nothing Words.prior
        in
            Ok { newVars | prior = True, ongoing = False }


practical : Modality -> Vars -> Result String Vars
practical modality vars =
    if vars.past then
        Err "past messages cannot be made practical"
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


evasive : Modality -> Vars -> Result String Vars
evasive modality vars =
    if vars.past then
        Err "past messages cannot be made evasive"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be elaborated with another modality"
    else
        Ok { vars | negateObject = False, modality = Just modality }


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


ongoing : Vars -> Result String Vars
ongoing vars =
    if vars.past then
        Err "past messages cannot be made ongoing"
    else if vars.prior then
        Err "prior messages cannot be made ongoing"
    else if vars.ongoing then
        Err "ongoing messages cannot be made ongoing"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made ongoing"
    else
        let
            newVars =
                Vars.displaceVerb vars "be" Nothing Words.ongoing
        in
            Ok { newVars | ongoing = True, negateObject = False }


determined : Maybe Time -> Vars -> Result String Vars
determined time vars =
    if vars.past then
        Err "past messages cannot be made determined"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made determined"
    else
        let
            newVars =
                Vars.displaceVerb vars "be" (Just "going to") identity
        in
            case time of
                Nothing ->
                    Ok { newVars | prior = False, ongoing = True, negateObject = False }

                Just string ->
                    Ok { newVars | prior = False, ongoing = True, negateObject = False, post = vars.post ++ [ string ] }


imminent : Vars -> Result String Vars
imminent vars =
    if vars.past then
        Err "past messages cannot be made imminent"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made imminent"
    else
        let
            newVars =
                Vars.displaceVerb vars "be" (Just "about to") identity
        in
            Ok { newVars | prior = False, ongoing = False, negateObject = False }


apparent : Bool -> Vars -> Result String Vars
apparent preferSeem vars =
    if vars.past then
        Err "past messages cannot be made apparent"
    else if not (vars.modality == Nothing) then
        Err "messages with a modality cannot be made apparent"
    else
        let
            newVerb =
                if preferSeem then
                    "seem"
                else
                    "appear"

            newVars =
                Vars.displaceVerb vars newVerb (Just "to") identity
        in
            Ok { newVars | prior = False, ongoing = False, negateObject = False }


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


shiftNotToBool : List String -> ( Bool, List String )
shiftNotToBool pre2 =
    case pre2 of
        "not" :: tail ->
            ( True, tail )

        _ ->
            ( False, pre2 )


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


subjectAndFulcrum : Vars -> Bool -> String
subjectAndFulcrum vars negateFulcrum =
    if vars.abbreviateFulcrum && not vars.objectOverride then
        (String.join " " vars.subject) ++ (Fulcrums.abbreviate (fulcrum vars negateFulcrum))
    else
        (String.join " " vars.subject) ++ " " ++ (fulcrum vars negateFulcrum)


fulcrum : Vars -> Bool -> String
fulcrum vars negate =
    let
        defaultFulcrum =
            case vars.modality of
                Nothing ->
                    if vars.verb == "be" || vars.prior || not (List.member "not" vars.pre1) then
                        Fulcrums.verb vars.verb vars.past vars.amNeeded vars.isNeeded
                    else
                        Fulcrums.verb "do" vars.past vars.amNeeded vars.isNeeded

                Just modality ->
                    Fulcrums.modal modality vars.past vars.negatedModality
    in
        if negate then
            Fulcrums.negate defaultFulcrum vars.abbreviateNot
        else
            defaultFulcrum
