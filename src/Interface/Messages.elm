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
                    plain ingredients

                MakeElaborate elaborationRecipe subIndex ingredients ->
                    message subIndex model
                        |> andThen (elaborate elaborationRecipe ingredients)


{-| Functions for making plain (base) ingredients.
-}
plain : Ingredients -> Result String Message
plain ingredients =
    if String.length ingredients.pivot == 0 then
        Err "please enter a verb for your pivot"
    else
        case ingredients.balance of
            Just (CustomBalance string) ->
                if String.length ingredients.balanceString == 0 then
                    Err "please enter some text for your custom balance"
                else
                    Ok (Plain (nucleus ingredients))

            _ ->
                Ok (Plain (nucleus ingredients))


nucleus : Ingredients -> Nucleus
nucleus ingredients =
    { object = object ingredients.object ingredients.objectString
    , pivot = ingredients.pivot
    , balance = Maybe.map (balance ingredients) ingredients.balance
    , abbreviateFulcrum = ingredients.multiPurposeStyle1
    , abbreviateNot = ingredients.multiPurposeStyle2
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


balance : Ingredients -> Balance -> Balance
balance ingredients balance =
    case balance of
        SameObject ->
            SameObject

        DifferentObject differentObject ->
            DifferentObject (object ingredients.balanceObject ingredients.balanceObjectString)

        CustomBalance string ->
            CustomBalance ingredients.balanceString


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

        MakePractical ->
            Ok (Practical ingredients.modality message)

        MakeProjective ->
            Ok (Projective ingredients.modality (maybeString ingredients.multiPurposeString) message)

        MakeEvasive ->
            Ok (Evasive ingredients.modality message)

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

        MakeOngoing ->
            Ok (Ongoing message)

        MakeDetermined ->
            Ok (Determined (maybeString ingredients.multiPurposeString) message)

        MakeImminent ->
            Ok (Imminent message)

        MakeApparent ->
            Ok (Apparent ingredients.multiPurposeStyle1 message)

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
