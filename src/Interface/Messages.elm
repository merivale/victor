module Interface.Messages exposing (message)

{-| Generate a message from the model.
-}

import Array
import Maybe
import Result exposing (andThen)
import Interface.Types exposing (..)
import Theory.Types exposing (..)


{-| Build up a message recursively.
-}
message : Int -> Model -> Result String Message
message index model =
    case Array.get index model of
        Nothing ->
            Err "recipe index out of range"

        Just recipe ->
            case recipe of
                MakePlain ingredients ->
                    nucleus ingredients
                        |> andThen plain

                MakeElaborate elaborationRecipe subIndex ingredients ->
                    message subIndex model
                        |> andThen (elaborate elaborationRecipe ingredients)


{-| Functions for making plain (base) ingredients.
-}
plain : Nucleus -> Result String Message
plain nucleus =
    Ok (Plain nucleus)


nucleus : Ingredients -> Result String Nucleus
nucleus ingredients =
    condition ingredients
        |> andThen (addObject ingredients)


condition : Ingredients -> Result String Condition
condition ingredients =
    Result.map2 combinePivotBalance (pivot ingredients) (balance ingredients)


combinePivotBalance : Pivot -> Maybe Balance -> Condition
combinePivotBalance pivot balance =
    { pivot = pivot
    , balance = balance
    }


pivot : Ingredients -> Result String Pivot
pivot ingredients =
    case ingredients.pivot of
        Be property ongoing ->
            if String.length ingredients.pivotProperty == 0 then
                Ok (Be Nothing ingredients.ongoing)
            else
                Ok (Be (Just ingredients.pivotProperty) ingredients.ongoing)

        Do verb ongoing passive ->
            if String.length ingredients.pivotVerb == 0 then
                Err "please enter a verb for your pivot"
            else if ingredients.pivotVerb == "be" then
                Err "please enter a verb other than 'be' for your pivot"
            else
                Ok (Do ingredients.pivotVerb ingredients.ongoing ingredients.passive)


balance : Ingredients -> Result String (Maybe Balance)
balance ingredients =
    case ingredients.balance of
        Nothing ->
            Ok Nothing

        Just b ->
            case b of
                SameObject ->
                    Ok (Just SameObject)

                IndependentObject independentObject ->
                    Ok (Just (IndependentObject (object ingredients.balanceObject ingredients.balanceObjectString)))

                CustomBalance string ->
                    if String.length ingredients.balanceString == 0 then
                        Err "please enter some text for your custom balance"
                    else
                        Ok (Just (CustomBalance ingredients.balanceString))


addObject : Ingredients -> Condition -> Result String Nucleus
addObject ingredients condition =
    Ok
        { object = object ingredients.object ingredients.objectString
        , condition = condition
        }


object : Object -> String -> Object
object baseObject objectString =
    case baseObject of
        Male string ->
            Male (maybeString objectString)

        Female string ->
            Female (maybeString objectString)

        Thing string ->
            Thing (maybeString objectString)

        PeopleOrThings string ->
            PeopleOrThings (maybeString objectString)

        a ->
            a


{-| Functions for elaborating messages.
-}
elaborate : ElaborationRecipe -> Ingredients -> Message -> Result String Message
elaborate elaborationRecipe ingredients message =
    case elaborationRecipe of
        MakeNegative ->
            Ok (Negative message)

        MakePast ->
            Ok (Past message)

        MakePrior ->
            Ok (Prior message)

        MakeExpanded ->
            pivot ingredients
                |> andThen (makeExpanded message)

        MakePractical ->
            Ok (Practical ingredients.modality message)

        MakeEvasive ->
            Ok (Evasive ingredients.modality message)

        MakeProjective ->
            Ok (Projective ingredients.modality (maybeString ingredients.multiPurposeString) message)

        MakePreordained ->
            Ok (Preordained (maybeString ingredients.multiPurposeString) message)

        MakeRegular ->
            Ok (Regular (maybeString ingredients.multiPurposeString) message)

        MakeExtended ->
            if String.length ingredients.multiPurposeString == 0 then
                Err "please enter a value for the duration"
            else
                Ok (Extended ingredients.multiPurposeString message)

        MakeScattered ->
            if String.length ingredients.multiPurposeString == 0 then
                Err "please enter a value for the tally"
            else
                Ok (Scattered ingredients.multiPurposeString message)

        MakeIndirect ->
            if String.length ingredients.category == 0 then
                Err "please enter a category for your indirect elaboration"
            else
                Ok (Indirect ingredients.target (pointer ingredients) ingredients.other (haystack ingredients) ingredients.plural message)

        MakeEnumerated ->
            if String.length ingredients.category == 0 then
                Err "please enter a category for your enumerated elaboration"
            else
                Ok (Enumerated ingredients.target ingredients.enumeratedQuantifier ingredients.other (haystack ingredients) message)

        MakeAmassed ->
            if String.length ingredients.category == 0 then
                Err "please enter a category for your amassed elaboration"
            else
                Ok (Amassed ingredients.target ingredients.amassedQuantifier ingredients.other (haystack ingredients) ingredients.plural message)


makeExpanded : Message -> Pivot -> Result String Message
makeExpanded message pivot =
    Ok (Expanded pivot message)


pointer : Ingredients -> Pointer
pointer ingredients =
    case ingredients.pointer of
        RelatedTo relatedObject ->
            RelatedTo (object ingredients.pointerObject ingredients.pointerObjectString)

        _ ->
            ingredients.pointer


haystack : Ingredients -> Haystack
haystack ingredients =
    { category = ingredients.category
    , description = maybeString ingredients.description
    , restriction = maybeString ingredients.restriction
    }


{-| Text boxes map to a String in the model, returning a zero-length string if
they're empty. Sometimes I want them hooked up to Maybe String instead,
returning Nothing if empty. Hence the need for the following function.
-}
maybeString : String -> Maybe String
maybeString string =
    if String.length string == 0 then
        Nothing
    else
        Just string
