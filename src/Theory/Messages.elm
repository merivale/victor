module Theory.Messages exposing (..)

import Array
import Result
import Theory.Ideas.Displacers as Displacers
import Theory.Ideas.Pseudo as Pseudo
import Theory.Ideas.Nucleus as Nucleus
import Theory.Utils as Utils


type Message
    = Plain Nucleus.Nucleus
    | NEGATIVE Message
    | PAST (Maybe String) Message
    | PRIOR Message
    | DISPLACED Displacers.Displacer Message
    | PREORDAINED (Maybe Displacers.Displacer) (Maybe String) Message
    | REGULAR (Maybe Displacers.Displacer) (Maybe String) Message
    | EXTENDED String Message
    | SCATTERED String Message
    | INDIRECT Int Pseudo.Description Message
    | ENUMERATED Int Pseudo.Multiplicity Message
    | AMASSED Int Pseudo.Proportion Message


type alias Vars =
    { negationTarget : NegationTarget
    , object : Nucleus.Object
    , pseudoObject : PseudoObject
    , past : Bool
    , modality : Maybe Displacers.Modality
    , negatedModality : Bool
    , preordainedModality : Bool
    , regularModality : Bool
    , prior : Bool
    , pre : List String
    , pivot : Nucleus.Pivot
    , displaced : List Displaced
    , balances : List PseudoBalance
    , post : List String
    }


type NegationTarget
    = NegateCondition
    | NegateObject


type PseudoObject
    = DirectObject
    | IndirectObject Pseudo.Description
    | EnumeratedObject Bool Pseudo.Multiplicity
    | AmassedObject Bool Pseudo.Proportion


type alias Displaced =
    { prior : Bool
    , pre : List String
    , pivot : Nucleus.Pivot
    }


type PseudoBalance
    = DirectBalance Nucleus.Balance
    | IndirectBalance (Maybe Nucleus.Relator) Nucleus.Object Pseudo.Description
    | EnumeratedBalance (Maybe Nucleus.Relator) Nucleus.Object Bool Pseudo.Multiplicity
    | AmassedBalance (Maybe Nucleus.Relator) Nucleus.Object Bool Pseudo.Proportion


explode : Message -> Result String Vars
explode message =
    case message of
        Plain nucleus ->
            Ok (plain nucleus)

        NEGATIVE subMessage ->
            explode subMessage |> Result.andThen negative

        PAST time subMessage ->
            explode subMessage |> Result.andThen (past time)

        PRIOR subMessage ->
            explode subMessage |> Result.andThen prior

        DISPLACED displacer subMessage ->
            explode subMessage |> Result.andThen (displaced displacer)

        PREORDAINED displacer time subMessage ->
            explode subMessage |> Result.andThen (preordained displacer time)

        REGULAR displacer frequency subMessage ->
            explode subMessage |> Result.andThen (regular displacer frequency)

        EXTENDED duration subMessage ->
            explode subMessage |> Result.map (extended duration)

        SCATTERED tally subMessage ->
            explode subMessage |> Result.map (scattered tally)

        INDIRECT target description subMessage ->
            explode subMessage |> Result.andThen (indirect target description)

        ENUMERATED target multiplicty subMessage ->
            explode subMessage |> Result.andThen (enumerated target multiplicty)

        AMASSED target proportion subMessage ->
            explode subMessage |> Result.andThen (amassed target proportion)


{-| Generate the initial variables to be passed on to any elaborating functions.
Note that I do not currently validate the nucleus of any message.
-}
plain : Nucleus.Nucleus -> Vars
plain ( object, ( pivot, balances ) ) =
    { negationTarget = NegateCondition
    , object = object
    , pseudoObject = DirectObject
    , past = False
    , modality = Nothing
    , negatedModality = False
    , preordainedModality = False
    , regularModality = False
    , prior = False
    , pre = []
    , pivot = pivot
    , displaced = []
    , balances = List.map (\x -> DirectBalance x) balances
    , post = []
    }


{-| NEGATIVE messages.
-}
negative : Vars -> Result String Vars
negative vars =
    case vars.negationTarget of
        NegateCondition ->
            case vars.modality of
                Nothing ->
                    Ok { vars | pre = "not" :: vars.pre }

                Just Displacers.Yes1 ->
                    Err "the Yes1 modality ('will') cannot be negated"

                Just Displacers.Yes2 ->
                    Err "the Yes2 modality ('shall') cannot be negated"

                _ ->
                    if vars.negatedModality then
                        Err "modalities cannot be negated twice"
                    else
                        Ok { vars | negatedModality = True, pre = "not" :: vars.pre }

        NegateObject ->
            case vars.pseudoObject of
                DirectObject ->
                    Err "direct objects cannot be negated"

                IndirectObject description ->
                    Err "indirect objects cannot be negated"

                EnumeratedObject negated multiplicity ->
                    if negated then
                        Err "enumerated objects cannot be negated twice"
                    else
                        Ok
                            { vars
                                | negationTarget = NegateCondition
                                , pseudoObject = EnumeratedObject True multiplicity
                            }

                AmassedObject negated proportion ->
                    if negated then
                        Err "amassed objects cannot be negated twice"
                    else
                        Ok
                            { vars
                                | negationTarget = NegateCondition
                                , pseudoObject = AmassedObject True proportion
                            }


{-| PAST messages.
-}
past : Maybe String -> Vars -> Result String Vars
past time vars =
    if vars.past then
        Err "PAST messages cannot be made PAST"
    else if vars.modality == Just Displacers.Maybe4 then
        Err "messages with the Maybe4 modality ('dare') cannot be made PAST"
    else if vars.modality /= Nothing && not vars.regularModality && time /= Nothing then
        Err "DISPLACED and PREORDAINED messages with a modality cannot be given a PAST time"
    else
        Ok { vars | past = True, post = Utils.maybeCons time vars.post }


{-| PRIOR messages.
-}
prior : Vars -> Result String Vars
prior vars =
    if vars.prior then
        Err "PRIOR messages cannot be made PRIOR"
    else if vars.modality /= Nothing && not vars.past then
        Err "messages with a modality can only be PRIOR if they are PAST"
    else if vars.modality /= Nothing && not vars.regularModality && not vars.preordainedModality then
        Err "DISPLACED messages with a modality cannot be made PRIOR PAST"
    else
        Ok { vars | prior = True }


{-| DISPLACED messages.
-}
displaced : Displacers.Displacer -> Vars -> Result String Vars
displaced displacer vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be DISPLACED"
    else
        case displacer of
            Displacers.Primary pivot ->
                swapPastForPrior vars |> Result.map (primary pivot)

            Displacers.Secondary modality ->
                swapPastForPrior vars |> Result.map (secondary modality False False)


{-| PREORDAINED messages.
-}
preordained : Maybe Displacers.Displacer -> Maybe String -> Vars -> Result String Vars
preordained displacer time vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be made PREORDAINED"
    else
        let
            varsWithPost =
                { vars | post = Utils.maybeCons time vars.post }
        in
            case displacer of
                Nothing ->
                    if vars.past then
                        Err "PAST messages cannot be made PREORDAINED without a displacer"
                    else
                        Ok varsWithPost

                Just (Displacers.Primary pivot) ->
                    swapPastForPrior varsWithPost |> Result.map (primary pivot)

                Just (Displacers.Secondary modality) ->
                    swapPastForPrior varsWithPost |> Result.map (secondary modality True False)


{-| REGULAR messages.
-}
regular : Maybe Displacers.Displacer -> Maybe String -> Vars -> Result String Vars
regular displacer frequency vars =
    if vars.modality /= Nothing then
        Err "messages with a modality cannot be made REGULAR"
    else
        let
            varsWithPre =
                { vars | pre = Utils.maybeCons frequency vars.pre }
        in
            case displacer of
                Nothing ->
                    if vars.past then
                        Err "PAST messages cannot be made REGULAR without a displacer"
                    else
                        Ok varsWithPre

                Just (Displacers.Primary pivot) ->
                    swapPastForPrior varsWithPre |> Result.map (primary pivot)

                Just (Displacers.Secondary modality) ->
                    swapPastForPrior varsWithPre |> Result.map (secondary modality False True)


{-| EXTENDED messages.
-}
extended : String -> Vars -> Vars
extended duration vars =
    { vars | post = duration :: vars.post }


{-| SCATTERED messages.
-}
scattered : String -> Vars -> Vars
scattered tally vars =
    { vars | post = tally :: vars.post }


{-| INDIRECT messages.
-}
indirect : Int -> Pseudo.Description -> Vars -> Result String Vars
indirect target description vars =
    if target < 0 then
        case vars.pseudoObject of
            DirectObject ->
                if not (Nucleus.isOther vars.object) then
                    Err "only third person (other) objects can be overridden"
                else
                    Ok (overrideMainObject False (IndirectObject description) vars)

            _ ->
                Err "the main object cannot be overridden twice"
    else
        case Array.get target (Array.fromList vars.balances) of
            Nothing ->
                Err "target index out of range"

            Just (DirectBalance ( relator, Nucleus.SameAsMain )) ->
                Err "only different objects can be overridden"

            Just (DirectBalance ( relator, Nucleus.Different object )) ->
                if not (Nucleus.isOther object) then
                    Err "only third person (other) objects can be overridden"
                else
                    let
                        pseudoBalance =
                            IndirectBalance relator object description
                    in
                        Ok (overrideBalancingObject target pseudoBalance vars)

            _ ->
                Err ("balancing object " ++ toString (target + 1) ++ " cannot be overridden twice")


{-| ENUMERATED messages.
-}
enumerated : Int -> Pseudo.Multiplicity -> Vars -> Result String Vars
enumerated target multiplicity vars =
    let
        ( quantifier, other, haystack ) =
            multiplicity
    in
        if not (Pseudo.isEnumerating quantifier) then
            Err "this quantifier cannot be used in ENUMERATED elaborations"
        else if target < 0 then
            case vars.pseudoObject of
                DirectObject ->
                    if not (Nucleus.isOther vars.object) then
                        Err "only third person (other) objects can be overridden"
                    else if Pseudo.requiresPlural quantifier && not (Nucleus.isPlural vars.object) then
                        Err "your ENUMERATED quantifier requires a plural object"
                    else if Nucleus.isPlural vars.object && not (Pseudo.requiresPlural quantifier) then
                        Err "your ENUMERATED quantifier requires a singular object"
                    else
                        let
                            negateObject =
                                Pseudo.isNegatable quantifier

                            pseudoBalance =
                                EnumeratedObject False multiplicity
                        in
                            Ok (overrideMainObject negateObject pseudoBalance vars)

                _ ->
                    Err "the main object cannot be overridden twice"
        else
            case Array.get target (Array.fromList vars.balances) of
                Nothing ->
                    Err "target index out of range"

                Just (DirectBalance ( relator, Nucleus.SameAsMain )) ->
                    Err "only different objects can be overridden"

                Just (DirectBalance ( relator, Nucleus.Different object )) ->
                    if not (Nucleus.isOther object) then
                        Err "only third person (other) objects can be overridden"
                    else if Pseudo.requiresPlural quantifier && not (Nucleus.isPlural object) then
                        Err "your ENUMERATED quantifier requires a plural object"
                    else if Nucleus.isPlural object && not (Pseudo.requiresPlural quantifier) then
                        Err "your ENUMERATED quantifier requires a singular object"
                    else
                        let
                            pseudoBalance =
                                EnumeratedBalance relator object False multiplicity
                        in
                            Ok (overrideBalancingObject target pseudoBalance vars)

                _ ->
                    Err ("balancing object " ++ toString (target + 1) ++ " cannot be overridden twice")


{-| AMASSED messages.
-}
amassed : Int -> Pseudo.Proportion -> Vars -> Result String Vars
amassed target proportion vars =
    let
        ( quantifier, other, haystack ) =
            proportion
    in
        if not (Pseudo.isAmassing quantifier) then
            Err "this quantifier cannot be used in AMASSED elaborations"
        else if target < 0 then
            case vars.pseudoObject of
                DirectObject ->
                    if not (Nucleus.isOther vars.object) then
                        Err "only third person (other) objects can be overridden"
                    else if quantifier == Just Pseudo.Much && Nucleus.isPlural vars.object then
                        Err "this quantifier cannot be used with plural objects"
                    else
                        let
                            pseudoObject =
                                AmassedObject False proportion
                        in
                            Ok (overrideMainObject True pseudoObject vars)

                _ ->
                    Err "the main object cannot be overridden twice"
        else
            case Array.get target (Array.fromList vars.balances) of
                Nothing ->
                    Err "target index out of range"

                Just (DirectBalance ( relator, Nucleus.SameAsMain )) ->
                    Err "only different objects can be overridden"

                Just (DirectBalance ( relator, Nucleus.Different object )) ->
                    if not (Nucleus.isOther object) then
                        Err "only third person (other) objects can be overridden"
                    else if quantifier == Just Pseudo.Much && Nucleus.isPlural object then
                        Err "this quantifier cannot be used with plural objects"
                    else
                        let
                            pseudoBalance =
                                AmassedBalance relator object False proportion
                        in
                            Ok (overrideBalancingObject target pseudoBalance vars)

                _ ->
                    Err ("balancing object " ++ toString (target + 1) ++ " cannot be overridden twice")


{-| Functions used by the DISPLACED, PREORDAINED, and REGULAR elaborations.
-}
swapPastForPrior : Vars -> Result String Vars
swapPastForPrior vars =
    if vars.past && vars.prior then
        Err "PRIOR PAST messages cannot be given a displacer"
    else if vars.past then
        Ok { vars | past = False, prior = True }
    else
        Ok vars


primary : Nucleus.Pivot -> Vars -> Vars
primary pivot vars =
    let
        displaced =
            { prior = vars.prior, pre = vars.pre, pivot = vars.pivot }
    in
        { vars
            | negationTarget = NegateCondition
            , prior = False
            , pre = []
            , pivot = pivot
            , displaced = displaced :: vars.displaced
        }


secondary : Displacers.Modality -> Bool -> Bool -> Vars -> Vars
secondary modality preordainedModality regularModality vars =
    { vars
        | negationTarget = NegateCondition
        , modality = Just modality
        , preordainedModality = preordainedModality
        , regularModality = regularModality
    }


{-| Functions used by the INDIRECT, ENUMERATED, and AMASSED elaborations.
-}
overrideMainObject : Bool -> PseudoObject -> Vars -> Vars
overrideMainObject negateObject pseudoObject vars =
    if negateObject then
        { vars | negationTarget = NegateObject, pseudoObject = pseudoObject }
    else
        { vars | pseudoObject = pseudoObject }


overrideBalancingObject : Int -> PseudoBalance -> Vars -> Vars
overrideBalancingObject target pseudoBalance vars =
    let
        oldArray =
            Array.fromList vars.balances

        newArray =
            Array.set target pseudoBalance oldArray
    in
        { vars | balances = Array.toList newArray }
