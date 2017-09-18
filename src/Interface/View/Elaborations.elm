module Interface.View.Elaborations exposing (elaborations)


{-| Module for generating HTML inputs for elaboration factors.
-}
import Html
import Html.Attributes as Attr
import Interface.Model.Types exposing (..)
import Interface.View.Nucleus as Nucleus
import Interface.View.Ideas as Ideas
import Interface.View.Input as Input
import Interface.View.Buttons as Buttons
import Theory.Plain.Nucleus exposing (..)
import Theory.Long.Displacers exposing (..)
import Theory.Object.Pseudo exposing (..)


{-| Display the message.
-}
elaborations : TheoryLayer -> Model -> Html.Html Signal
elaborations theoryLayer model =
    input theoryLayer (List.reverse model.elaborations) model


input : TheoryLayer -> List Elaboration -> Model -> Html.Html Signal
input theoryLayer elaborations model =
    case List.head elaborations of
        Nothing ->
            Nucleus.nucleus theoryLayer model

        Just elaboration ->
            let
                index =
                    (List.length elaborations) - 1

                subContent =
                    input theoryLayer (List.drop 1 elaborations) model
            in
                elaborationInput
                    theoryLayer
                    (List.length model.balances)
                    index
                    elaboration
                    subContent


elaborationInput : TheoryLayer -> Int -> Int -> Elaboration -> Html.Html Signal -> Html.Html Signal
elaborationInput theoryLayer balanceCount index elaboration subContent =
    Html.div
        [ Attr.class "elaboration" ]
        [ elaborationHeading index elaboration
        , Buttons.elaborationButtons theoryLayer index elaboration.plus
        , elaborationBody theoryLayer balanceCount index elaboration subContent
        ]


elaborationHeading : Int -> Elaboration -> Html.Html Signal
elaborationHeading index elaboration =
    Html.div
        [ Attr.class "heading" ]
        [ Buttons.toggleElaborations index elaboration.plus
        , Html.div
            [ Attr.class "title" ]
            [ Html.text (String.dropLeft 4 (toString elaboration.recipe)) ]
        , Buttons.removeElaboration index
        ]


elaborationBody : TheoryLayer -> Int -> Int -> Elaboration -> Html.Html Signal -> Html.Html Signal
elaborationBody theoryLayer balanceCount index elaboration subContent =
    case elaboration.recipe of
        MakePAST ->
            Html.div
                [ Attr.class "body" ]
                [ pastTime index elaboration
                , subContent
                ]

        MakeDISPLACED ->
            Html.div
                [ Attr.class "body" ]
                ((displacer True True index elaboration) ++ [ subContent ])

        MakePREORDAINED ->
            if theoryLayer == ShortTheory then
                Html.div
                    [ Attr.class "body" ]
                    [ preordainedTime index elaboration
                    , subContent
                    ]
            else
                Html.div
                    [ Attr.class "body" ]
                    ((displacer False False index elaboration)
                        ++ [ preordainedTime index elaboration
                           , subContent
                           ]
                    )

        MakeREGULAR ->
            if theoryLayer == ShortTheory then
                Html.div
                    [ Attr.class "body" ]
                    [ frequency index elaboration
                    , subContent
                    ]
            else
                Html.div
                    [ Attr.class "body" ]
                    ((displacer False True index elaboration)
                        ++ [ frequency index elaboration
                           , subContent
                           ]
                    )

        MakeEXTENDED ->
            Html.div
                [ Attr.class "body" ]
                [ duration index elaboration
                , subContent
                ]

        MakeSCATTERED ->
            Html.div
                [ Attr.class "body" ]
                [ tally index elaboration
                , subContent
                ]

        MakeINDIRECT ->
            Html.div
                [ Attr.class "body" ]
                [ target balanceCount index elaboration
                , pointer index elaboration
                , haystack index elaboration
                , subContent
                ]

        MakeENUMERATED ->
            Html.div
                [ Attr.class "body" ]
                [ target balanceCount index elaboration
                , quantifier False index elaboration
                , haystack index elaboration
                , subContent
                ]

        MakeAMASSED ->
            Html.div
                [ Attr.class "body" ]
                [ target balanceCount index elaboration
                , quantifier True index elaboration
                , haystack index elaboration
                , subContent
                ]

        _ ->
            Html.div
                [ Attr.class "body" ]
                [ subContent ]


{-| Functions for displaying the inputs.
-}
pastTime : Int -> Elaboration -> Html.Html Signal
pastTime index elaboration =
    Input.factor "Time"
        [ stringText
            "e.g. yesterday, last week"
            (SetElaborationString1 index)
            elaboration.string1
        ]


displacer : Bool -> Bool -> Int -> Elaboration -> List (Html.Html Signal)
displacer compulsory limitedModalities index elaboration =
    case elaboration.displacer of
        Nothing ->
            [ displacerBase compulsory index elaboration.displacer ]

        Just (Primary ( verbalityValue, statusValue )) ->
            [ displacerBase compulsory index elaboration.displacer
            , verbality index verbalityValue
            , status index statusValue
            ]

        Just (Secondary modalityValue) ->
            [ displacerBase compulsory index elaboration.displacer
            , modality limitedModalities index modalityValue
            ]


displacerBase : Bool -> Int -> Maybe Displacer -> Html.Html Signal
displacerBase compulsory index displacer =
    Input.factor "Displacer" [ displacerSelect compulsory index displacer ]


verbality : Int -> Verbality -> Html.Html Signal
verbality index verbalityValue =
    case verbalityValue of
        Be ongoing ->
            Input.factor "Verbality"
                [ verbalitySelect index verbalityValue
                , Input.emptyInput
                , verbalityOngoing index ongoing
                , Input.emptyInput
                ]

        Do string ongoing passive ->
            Input.factor "Verbality"
                [ verbalitySelect index verbalityValue
                , verbalityString index string
                , verbalityOngoing index ongoing
                , verbalityPassive index passive
                ]


status : Int -> Maybe Status -> Html.Html Signal
status index statusValue =
    case statusValue of
        Nothing ->
            Input.factor "Status"
                [ statusSelect index statusValue
                , Input.emptyInput
                ]

        Just (Absolute string) ->
            Input.factor "Status"
                [ statusSelect index statusValue
                , statusString index string
                ]

        Just (Relative relator) ->
            Input.factor "Status"
                [ statusSelect index statusValue
                , statusRelatorSelect index relator
                ]


modality : Bool -> Int -> Modality -> Html.Html Signal
modality limited index modalityValue =
    Input.factor "Modality" [ modalitySelect limited index modalityValue ]


preordainedTime : Int -> Elaboration -> Html.Html Signal
preordainedTime index elaboration =
    Input.factor "Time"
        [ stringText
            "e.g. tomorrow, next week"
            (SetElaborationString1 index)
            elaboration.string1
        ]


frequency : Int -> Elaboration -> Html.Html Signal
frequency index elaboration =
    Input.factor "Frequency"
        [ stringText
            "e.g. usually, sometimes, occasionally"
            (SetElaborationString1 index)
            elaboration.string1
        ]


duration : Int -> Elaboration -> Html.Html Signal
duration index elaboration =
    Input.factor "Duration"
        [ stringText
            "e.g. for a while, for two hours, all day"
            (SetElaborationString1 index)
            elaboration.string1
        ]


tally : Int -> Elaboration -> Html.Html Signal
tally index elaboration =
    Input.factor "Tally"
        [ stringText
            "e.g. once, twice, several times"
            (SetElaborationString1 index)
            elaboration.string1
        ]


target : Int -> Int -> Elaboration -> Html.Html Signal
target balanceCount index elaboration =
    Input.factor "Target" [ targetSelect balanceCount index elaboration.target ]


pointer : Int -> Elaboration -> Html.Html Signal
pointer index elaboration =
    case elaboration.pointer of
        RelatedTo object ->
            Input.factor "Pointer"
                [ pointerSelect index elaboration.pointer
                , pointerObjectSelect index object
                , pointerObjectText index object
                , other index elaboration.other
                ]

        _ ->
            Input.factor "Pointer"
                [ pointerSelect index elaboration.pointer
                , Input.emptyInput
                , Input.emptyInput
                , other index elaboration.other
                ]


quantifier : Bool -> Int -> Elaboration -> Html.Html Signal
quantifier amassed index elaboration =
    case elaboration.quantifier of
        Just (Integer int) ->
            Input.factor "Quantifier"
                [ quantifierSelect amassed index elaboration.quantifier
                , quantifierInteger index int
                , other index elaboration.other
                ]

        _ ->
            Input.factor "Quantifier"
                [ quantifierSelect amassed index elaboration.quantifier
                , Input.emptyInput
                , other index elaboration.other
                ]


haystack : Int -> Elaboration -> Html.Html Signal
haystack index elaboration =
    Input.factor "Haystack"
        [ stringText
            "category (e.g. apple, water)"
            (SetElaborationString1 index)
            elaboration.string1
        , stringText
            "description (e.g. red, happy, interesting)"
            (SetElaborationString2 index)
            elaboration.string2
        , stringText
            "restriction (e.g. in the room, of France)"
            (SetElaborationString3 index)
            elaboration.string3
        ]


{-| Select dropdowns, used by the main exposed functions above.
-}
displacerSelect : Bool -> Int -> Maybe Displacer -> Html.Html Signal
displacerSelect compulsory index displacer =
    Input.select
        { value = displacer
        , options = Ideas.listDisplacers compulsory
        , equivalent = Ideas.equateDisplacers
        , signal = SetElaborationDisplacer index
        , toLabel = Ideas.displayDisplacer
        }


verbalitySelect : Int -> Verbality -> Html.Html Signal
verbalitySelect index verbality =
    Input.select
        { value = verbality
        , options = Ideas.listVerbalities
        , equivalent = Ideas.equateVerbalities
        , signal = SetElaborationDisplacerVerbality index
        , toLabel = Ideas.displayVerbality
        }


statusSelect : Int -> Maybe Status -> Html.Html Signal
statusSelect index status =
    Input.select
        { value = status
        , options = Ideas.listStatuses
        , equivalent = Ideas.equateStatuses
        , signal = SetElaborationDisplacerStatus index
        , toLabel = Ideas.displayStatus
        }


statusRelatorSelect : Int -> Relator -> Html.Html Signal
statusRelatorSelect index relator =
    Input.select
        { value = relator
        , options = Ideas.listRelators
        , equivalent = (==)
        , signal = SetElaborationDisplacerStatusRelator index
        , toLabel = toString
        }


modalitySelect : Bool -> Int -> Modality -> Html.Html Signal
modalitySelect limited index modality =
    Input.select
        { value = modality
        , options = Ideas.listModalities limited
        , equivalent = (==)
        , signal = SetElaborationDisplacerModality index
        , toLabel = Ideas.displayModality
        }


targetSelect : Int -> Int -> Int -> Html.Html Signal
targetSelect balanceCount index target =
    Input.select
        { value = target
        , options = Ideas.listTargets balanceCount
        , equivalent = (==)
        , signal = SetElaborationTarget index
        , toLabel = Ideas.displayTarget
        }


pointerSelect : Int -> Pointer -> Html.Html Signal
pointerSelect index pointer =
    Input.select
        { value = pointer
        , options = Ideas.listPointers
        , equivalent = Ideas.equatePointers
        , signal = SetElaborationPointer index
        , toLabel = Ideas.displayPointer
        }


pointerObjectSelect : Int -> Object -> Html.Html Signal
pointerObjectSelect index object =
    Input.selectGroup Ideas.listObjectGroups
        { value = object
        , options = Ideas.listObjects
        , equivalent = Ideas.equateObjects
        , signal = SetElaborationPointerObject index
        , toLabel = Ideas.displayObject
        }


quantifierSelect : Bool -> Int -> Maybe Quantifier -> Html.Html Signal
quantifierSelect amassed index quantifier =
    Input.select
        { value = quantifier
        , options = Ideas.listQuantifiers amassed
        , equivalent = Ideas.equateQuantifiers
        , signal = SetElaborationQuantifier index
        , toLabel = Ideas.displayQuantifier
        }


{-| Text and number inputs, used by the main exposed functions above.
-}
verbalityString : Int -> String -> Html.Html Signal
verbalityString index string =
    Input.text
        { value = string
        , placeholder = "e.g. have, like, want"
        , signal = SetElaborationDisplacerVerbalityString index
        , disabled = False
        }


statusString : Int -> String -> Html.Html Signal
statusString index string =
    Input.text
        { value = string
        , placeholder = "e.g. able, eager, happy (optional)"
        , signal = SetElaborationDisplacerStatusString index
        , disabled = False
        }


pointerObjectText : Int -> Object -> Html.Html Signal
pointerObjectText index object =
    Input.text
        { value = Maybe.withDefault "" (Ideas.objectString object)
        , placeholder = "name (optional)"
        , signal = SetElaborationPointerObjectString index
        , disabled = not (Ideas.objectHasString object)
        }


quantifierInteger : Int -> Int -> Html.Html Signal
quantifierInteger index int =
    Input.number
        { value = toString int
        , placeholder = "integer"
        , signal = SetElaborationQuantifierInteger index
        , disabled = False
        }


stringText : String -> (String -> Signal) -> Maybe String -> Html.Html Signal
stringText placeholder signal string =
    Input.text
        { value = Maybe.withDefault "" string
        , placeholder = placeholder
        , signal = signal
        , disabled = False
        }


{-| Input checkboxes, used by the main exposed functions above.
-}
verbalityOngoing : Int -> Bool -> Html.Html Signal
verbalityOngoing index ongoing =
    Input.checkbox
        { id = "ongoing" ++ (toString index)
        , label = "Ongoing"
        , checked = ongoing
        , signal = ToggleElaborationDisplacerVerbalityOngoing index
        }


verbalityPassive : Int -> Bool -> Html.Html Signal
verbalityPassive index passive =
    Input.checkbox
        { id = "passive" ++ (toString index)
        , label = "Passive"
        , checked = passive
        , signal = ToggleElaborationDisplacerVerbalityPassive index
        }


other : Int -> Bool -> Html.Html Signal
other index checked =
    Input.checkbox
        { id = "other" ++ (toString index)
        , label = "Other"
        , checked = checked
        , signal = ToggleElaborationOther index
        }
