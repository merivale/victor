module Interface.View.Examples exposing (examples)

{-| This module generates select dropdowns for the example messages.
-}

import Html
import Html.Attributes as Attr
import Interface.Model.Examples as Examples
import Interface.Model.Types exposing (..)
import Interface.View.Input as Input


examples : TheoryLayer -> Html.Html Signal
examples theoryLayer =
    Html.div
        [ Attr.class "examples" ]
        [ Html.label [] [ Html.text "Examples" ]
        , Input.select
            { value = 0
            , options = examplesRange theoryLayer
            , equivalent = (==)
            , signal = LoadExample theoryLayer
            , toLabel = examplesToString theoryLayer
            }
        ]


examplesRange : TheoryLayer -> List Int
examplesRange theoryLayer =
    case theoryLayer of
        FullTheory ->
            List.range 0 (List.length allExamples - 1)

        PlainTheory ->
            List.range 0 (List.length plainExamples - 1)

        ShortTheory ->
            List.range 0 (List.length shortExamples - 1)

        LongTheory ->
            List.range 0 (List.length longExamples - 1)

        ObjectTheory ->
            List.range 0 (List.length objectExamples - 1)


examplesToString : TheoryLayer -> Int -> String
examplesToString theoryLayer index =
    let
        list =
            case theoryLayer of
                FullTheory ->
                    allExamples

                PlainTheory ->
                    plainExamples

                ShortTheory ->
                    shortExamples

                LongTheory ->
                    longExamples

                ObjectTheory ->
                    objectExamples
    in
    Maybe.withDefault "example index out of range" (List.head (List.drop index list))


allExamples : List String
allExamples =
    plainExamples ++ shortExamples ++ longExamples ++ objectExamples


plainExamples : List String
plainExamples =
    [ "( Speaker, Be, [ Male \"Victor\" ] )"
    , "( Speaker, ( Be, \"happy\" ), [ ( For, Hearer ) ] )"
    , "( Female, ( Be, Out ), [ ( With, Male \"Fred\" ) ] )"
    , "( Others, ( Do \"look\", Up ), [ ( To, Female ) ] )"
    , "( Speakers, Do \"like\", [ Others ] )"
    , "( Others, Do \"live\", [ ( In, Other \"France\" ) ] )"
    , "( Speaker, Do \"sing\" Ongoing )"
    , "( Others, Do \"laugh\" Ongoing )"
    , "( Speakers, Do \"leave\", [ Other, ( To, Others ) ] )"
    ]


shortExamples : List String
shortExamples =
    [ "PAST \"yesterday\" ( Others, ( Do \"get\" Ongoing, \"married\" ) )"
    , "PAST \"yesterday\" (PREORDAINED ( Others, ( Do \"get\" Ongoing, \"married\" ) ))"
    , "NEGATIVE (REGULAR ( Female \"Claire\", Do \"drink\" ))"
    , "REGULAR (NEGATIVE ( Female \"Claire\", Do \"drink\" ))"
    , "PAST (NEGATIVE (EXTENDED \"for two hours\" ( Male \"Victor\", Do \"see\", [ Female \"Grannie\" ] )))"
    , "PAST (EXTENDED \"for two hours\" (NEGATIVE ( Male \"Victor\", Do \"see\", [ Female \"Grannie\" ] )))"
    , "PAST (NEGATIVE (SCATTERED \"fifteen times\" ( Female \"Grannie\", ( Do \"fall\", Over ) )))"
    , "PAST (SCATTERED \"fifteen times\" (NEGATIVE ( Female \"Grannie\", ( Do \"fall\", Over ) )))"
    ]


longExamples : List String
longExamples =
    [ "DISPLACED (Do \"go\" Ongoing) ( Female, Do \"see\", [ Male ] )"
    , "PREORDAINED \"tomorrow\" (DISPLACED (Do \"go\" Ongoing) ( Female, Do \"see\", [ Male ] ))"
    , "PREORDAINED (Do \"go\" Ongoing) ( Female, Do \"see\", [ Male ] )"
    , "DISPLACED Yes1 ( Male \"Victor\", Do \"know\" )"
    , "PAST (DISPLACED Yes1 ( Male \"Victor\", Do \"know\" ))"
    , "PREORDAINED Yes1 \"tomorrow\" ( Other, Do \"rain\" )"
    , "PREORDAINED Maybe1 \"tomorrow\" ( Other, Do \"rain\" )"
    , "PAST (PREORDAINED Maybe3 \"tomorrow\" ( Other, Do \"rain\" ))"
    , "PAST (DISPLACED Maybe1 (PAST ( Hearer, Do \"hurt\", [ Male ] )))"
    , "PRIOR (PAST (PREORDAINED Maybe1 ( Hearer, Do \"hurt\", [ Male ] )))"
    , "REGULAR Yes1 \"sometimes\" ( Speaker, Do \"try\", [ Other ] )"
    , "REGULAR Maybe1 \"occasionally\" ( Speaker, Do \"try\", [ Other ] )"
    , "REGULAR (Do \"tend\") ( Male, ( Do \"eat\", Out ) )"
    , "PAST (REGULAR (Do \"use\") ( Male, ( Do \"eat\", Out ) ))"
    ]


objectExamples : List String
objectExamples =
    [ "INDIRECT -1 ( The, \"king\", \"of France\") ( Male, ( Be, \"bald\" ) )"
    , "INDIRECT -1 ( RelatedTo (Male \"Smith\"), \"murderer\") ( Male, ( Be, \"insane\" ) )"
    ]
