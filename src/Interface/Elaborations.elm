module Interface.Elaborations
    exposing
<<<<<<< Updated upstream
        ( displacer
=======
        ( pastTime
>>>>>>> Stashed changes
        , pivot
        , modality
        , frequency
        , time
        , duration
        , tally
        , target
        , pointer
        , quantifier
        , haystack
        )


{-| Module for generating HTML for user input for the elaborations applied to a
message.
-}

import Html
import Html.Attributes as Attr
import Interface.Types exposing (..)
import Interface.Ideas as Ideas
import Interface.Input as Input
import Theory.Types exposing (..)


{-| The output functions, for displaying elaboration factor inputs.
-}
<<<<<<< Updated upstream
displacer : Bool -> Int -> Elaboration -> Html.Html Signal
displacer optional index elaboration =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Displacer"
        , displacerSelect optional index elaboration.displacer
        ]


pivot : Int -> Pivot -> Html.Html Signal
pivot index pivot =
    case pivot of
        Be ongoing property ->
=======
pastTime : Int -> Elaboration -> Html.Html Signal
pastTime index elaboration =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Time"
        , stringText
            "e.g. yesterday, last week"
            (SetString1 index)
            elaboration.string1
        ]


pivot : Int -> Elaboration -> Html.Html Signal
pivot index elaboration =
    case elaboration.pivot of
        Be ongoing ->
>>>>>>> Stashed changes
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Pivot"
                , pivotSelect index elaboration.pivot
                , Input.emptyInput
                , pivotOngoing index ongoing
                , pivotProperty index property
                ]

        Seem sense ongoing property ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Pivot"
<<<<<<< Updated upstream
                , pivotSelect index pivot
                , pivotSenseSelect index sense
=======
                , pivotSelect index elaboration.pivot
                , pivotVerbality index verbality
>>>>>>> Stashed changes
                , pivotOngoing index ongoing
                , pivotProperty index property
                ]

<<<<<<< Updated upstream
        Do verbality ongoing passive ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Pivot"
                , pivotSelect index pivot
                , pivotVerbality index verbality
                , pivotOngoing index ongoing
                , pivotPassive index passive
=======

counter : Int -> Elaboration -> Html.Html Signal
counter index elaboration =
    case elaboration.counter of
        Nothing ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Counter"
                , counterSelect index elaboration.counter
                , Input.emptyInput
                ]

        Just (CounterProperty property) ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Counter"
                , counterSelect index elaboration.counter
                , counterProperty index property
                ]

        Just (CounterRelator relator) ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Counter"
                , counterSelect index elaboration.counter
                , counterRelatorSelect index relator
>>>>>>> Stashed changes
                ]


modality : Bool -> Int -> Elaboration -> Html.Html Signal
modality limited index elaboration =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Modality"
        , modalitySelect limited index elaboration.modality
        ]


frequency : Int -> Elaboration -> Html.Html Signal
frequency index elaboration =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Frequency"
        , stringText
            "e.g. usually, sometimes, occasionally"
            (SetString1 index)
            elaboration.string1
        ]


time : Int -> Elaboration -> Html.Html Signal
time index elaboration =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Time"
        , stringText
            "e.g. tomorrow, next week"
            (SetString1 index)
            elaboration.string1
        ]


duration : Int -> Elaboration -> Html.Html Signal
duration index elaboration =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Duration"
        , stringText
            "e.g. for a while, for two hours, all day"
            (SetString1 index)
            elaboration.string1
        ]


tally : Int -> Elaboration -> Html.Html Signal
tally index elaboration =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Tally"
        , stringText
            "e.g. once, twice, several times"
            (SetString1 index)
            elaboration.string1
        ]


target : Int -> Int -> Elaboration -> Html.Html Signal
target balanceCount index elaboration =
    Html.div 
        [ Attr.class "factor" ]
        [ Input.label "Target"
        , targetSelect balanceCount index elaboration.target
        ]


pointer : Int -> Elaboration -> Html.Html Signal
pointer index elaboration =
    case elaboration.pointer of
        RelatedTo object ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Pointer"
                , pointerSelect index elaboration.pointer
                , pointerObjectSelect index object
                , pointerObjectText index object
                , other index elaboration.other
                ]

        _ ->
            Html.div
                [ Attr.class "factor" ]
                [ Input.label "Pointer"
                , pointerSelect index elaboration.pointer
                , Input.emptyInput
                , Input.emptyInput
                , other index elaboration.other
                ]


quantifier : Bool -> Int -> Elaboration -> Html.Html Signal
quantifier amassed index elaboration =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Quantifier"
        , quantifierSelect amassed index elaboration.quantifier
        , other index elaboration.other
        ]


haystack : Int -> Elaboration -> Html.Html Signal
haystack index elaboration =
    Html.div
        [ Attr.class "factor" ]
        [ Input.label "Haystack"
        , stringText
            "category (e.g. apple, water)"
            (SetString1 index)
            elaboration.string1
        , stringText
            "description (e.g. red, happy, interesting)"
            (SetString2 index)
            elaboration.string2
        , stringText
            "restriction (e.g. in the room, of France)"
            (SetString3 index)
            elaboration.string3
        ]


{-| Select dropdowns, used by the main output functions above.
-}
pivotSelect : Int -> Pivot -> Html.Html Signal
pivotSelect index pivot =
    Input.select
        { value = pivot
        , options = Ideas.listPivots
        , equivalent = Ideas.equatePivots
        , signal = SetDisplacedPivot index
        , toLabel = Ideas.displayPivot
        }


<<<<<<< Updated upstream
pivotSenseSelect : Int -> Maybe Sense -> Html.Html Signal
pivotSenseSelect index sense =
=======
counterSelect : Int -> Maybe Counter -> Html.Html Signal
counterSelect index counter =
    Input.select
        { value = counter
        , options = Ideas.listCounters
        , equivalent = Ideas.equateCounters
        , signal = SetDisplacedCounter index
        , toLabel = Ideas.displayCounter
        }


counterRelatorSelect : Int -> Relator -> Html.Html Signal
counterRelatorSelect index relator =
>>>>>>> Stashed changes
    Input.select
        { value = sense
        , options = Ideas.listSenses
        , equivalent = (==)
<<<<<<< Updated upstream
        , signal = SetDisplacerPivotSense index
        , toLabel = Ideas.displaySense
=======
        , signal = SetDisplacedCounterRelator index
        , toLabel = toString
>>>>>>> Stashed changes
        }


modalitySelect : Bool -> Int -> Modality -> Html.Html Signal
modalitySelect limited index modality =
    Input.select
        { value = modality
        , options = Ideas.listModalities limited
        , equivalent = (==)
        , signal = SetModality index
        , toLabel = Ideas.displayModality
        }


targetSelect : Int -> Int -> Target -> Html.Html Signal
targetSelect balanceCount index target =
    Input.select
        { value = target
        , options = Ideas.listTargets balanceCount
        , equivalent = (==)
        , signal = SetTarget index
        , toLabel = Ideas.displayTarget
        }


pointerSelect : Int -> Pointer -> Html.Html Signal
pointerSelect index pointer =
    Input.select
        { value = pointer
        , options = Ideas.listPointers
        , equivalent = Ideas.equatePointers
        , signal = SetPointer index
        , toLabel = Ideas.displayPointer
        }


pointerObjectSelect : Int -> Object -> Html.Html Signal
pointerObjectSelect index object =
    Input.selectGroup Ideas.listObjectGroups
        { value = object
        , options = Ideas.listObjects
        , equivalent = Ideas.equateObjects
        , signal = SetPointerObject index
        , toLabel = Ideas.displayObject
        }


quantifierSelect : Bool -> Int -> Maybe Quantifier -> Html.Html Signal
quantifierSelect amassed index quantifier =
    Input.select
        { value = quantifier
        , options = Ideas.listQuantifiers amassed
        , equivalent = (==)
        , signal = SetQuantifier index
        , toLabel = Ideas.displayQuantifier
        }


{-| Text inputs, used by the main output functions above.
-}
pivotProperty : Int -> Maybe Property -> Html.Html Signal
pivotProperty index property =
    Input.text
<<<<<<< Updated upstream
        { value = Maybe.withDefault "" property
        , placeholder = "e.g. able, eager, happy (optional)"
        , signal = SetDisplacerPivotProperty index
=======
        { value = verbality
        , placeholder = "e.g. have, like, want"
        , signal = SetDisplacedPivotVerbality index
>>>>>>> Stashed changes
        , disabled = False
        }


pivotVerbality : Int -> Verbality -> Html.Html Signal
pivotVerbality index verbality =
    Input.text
<<<<<<< Updated upstream
        { value = verbality
        , placeholder = "e.g. have, like, want"
        , signal = SetDisplacerPivotVerbality index
=======
        { value = property
        , placeholder = "e.g. able, eager, happy (optional)"
        , signal = SetDisplacedCounterProperty index
>>>>>>> Stashed changes
        , disabled = False
        }


pointerObjectText : Int -> Object -> Html.Html Signal
pointerObjectText index object =
    Input.text
        { value = Maybe.withDefault "" (Ideas.objectString object)
        , placeholder = "name (optional)"
        , signal = SetObjectString
        , disabled = not (Ideas.objectHasString object)
        }


stringText : String -> (String -> Signal) -> Maybe String -> Html.Html Signal
stringText placeholder signal string =
    Input.text
        { value = Maybe.withDefault "" string
        , placeholder = placeholder
        , signal = signal
        , disabled = False
        }


{-| Input checkboxes, used by the main output functions above.
-}
pivotOngoing : Int -> Bool -> Html.Html Signal
pivotOngoing index ongoing =
    Input.checkbox
        { id = "ongoing" ++ (toString index)
        , label = "Ongoing"
        , checked = ongoing
        , signal = ToggleDisplacedPivotOngoing index
        }


pivotPassive : Int -> Bool -> Html.Html Signal
pivotPassive index passive =
    Input.checkbox
        { id = "passive" ++ (toString index)
        , label = "Passive"
        , checked = passive
        , signal = ToggleDisplacedPivotPassive index
        }


other : Int -> Bool -> Html.Html Signal
other index checked =
    Input.checkbox
        { id = "other" ++ (toString index)
        , label = "Other"
        , checked = checked
        , signal = ToggleOther index
        }