module Interface.View.Ideas exposing (..)

import Maybe
import Theory.Plain.Nucleus exposing (..)
import Theory.Long.Displacers exposing (..)
import Theory.Object.Pseudo exposing (..)


{-| Objects.
-}
listObjects : List Object
listObjects =
    [ Speaker False
    , Hearer False
    , Other False (Just Male) Nothing
    , Other False (Just Female) Nothing
    , Other False Nothing Nothing
    , Speaker True
    , Hearer True
    , Other True Nothing Nothing
    ]


listObjectGroups : List ( String, List Object )
listObjectGroups =
    [ ( "Singular"
      , [ Speaker False
        , Hearer False
        , Other False (Just Male) Nothing
        , Other False (Just Female) Nothing
        , Other False Nothing Nothing
        ]
      )
    , ( "Plural"
      , [ Speaker True
        , Hearer True
        , Other True Nothing Nothing
        ]
      )
    ]


equateObjects : Object -> Object -> Bool
equateObjects object1 object2 =
    case ( object1, object2 ) of
        ( Speaker plural1, Speaker plural2 ) ->
            plural1 == plural2

        ( Hearer plural1, Hearer plural2 ) ->
            plural1 == plural2

        ( Other plural1 sex1 string1, Other plural2 sex2 string2 ) ->
            plural1 == plural2 && sex1 == sex2

        _ ->
            False


displayObject : Object -> String
displayObject object =
    case object of
        Speaker plural ->
            if plural then
                "Speakers"
            else
                "Speaker"

        Hearer plural ->
            if plural then
                "Hearers"
            else
                "Hearer"

        Other plural sex string ->
            if plural then
                "Others"
            else
                case sex of
                    Nothing ->
                        "Other (thing)"

                    Just Male ->
                        "Other (male)"

                    Just Female ->
                        "Other (female)"


objectString : Object -> Maybe String
objectString object =
    case object of
        Other plural sex string ->
            string

        _ ->
            Nothing


objectHasString : Object -> Bool
objectHasString object =
    case object of
        Other plural sex string ->
            True

        _ ->
            False


{-| Displacers.
-}
listDisplacers : Bool -> List (Maybe Displacer)
listDisplacers compulsory =
    if compulsory then
        [ Just (Primary ( Be False, Nothing ))
        , Just (Secondary Yes1)
        ]
    else
        [ Nothing
        , Just (Primary ( Be False, Nothing ))
        , Just (Secondary Yes1)
        ]


equateDisplacers : Maybe Displacer -> Maybe Displacer -> Bool
equateDisplacers displacer1 displacer2 =
    case ( displacer1, displacer2 ) of
        ( Nothing, Nothing ) ->
            True

        ( Just (Primary pivot1), Just (Primary pivot2) ) ->
            True

        ( Just (Secondary modality1), Just (Secondary modality2) ) ->
            True

        _ ->
            False


displayDisplacer : Maybe Displacer -> String
displayDisplacer displacer =
    case displacer of
        Nothing ->
            "-- No Displacer --"

        Just (Primary pivot) ->
            "Primary"

        Just (Secondary modality) ->
            "Secondary"


{-| Verbalities.
-}
listVerbalities : List Verbality
listVerbalities =
    [ Be False
    , Do "" False False
    ]


equateVerbalities : Verbality -> Verbality -> Bool
equateVerbalities verbality1 verbality2 =
    case ( verbality1, verbality2 ) of
        ( Be ongoing1, Be ongoing2 ) ->
            True

        ( Do string1 ongoing1 passive1, Do string2 ongoing2 passive2 ) ->
            True

        _ ->
            False


displayVerbality : Verbality -> String
displayVerbality verbality =
    case verbality of
        Be ongoing ->
            "Be"

        Do string ongoing passive ->
            "Do"


{-| Statuses.
-}
listStatuses : List (Maybe Status)
listStatuses =
    [ Nothing
    , Just (Absolute "")
    , Just (Relative About)
    ]


displayStatus : Maybe Status -> String
displayStatus status =
    case status of
        Nothing ->
            "-- No Status --"

        Just (Absolute string) ->
            "Absolute"

        Just (Relative relator) ->
            "Relative"


equateStatuses : Maybe Status -> Maybe Status -> Bool
equateStatuses status1 status2 =
    case ( status1, status2 ) of
        ( Nothing, Nothing ) ->
            True

        ( Just (Absolute string1), Just (Absolute string2) ) ->
            True

        ( Just (Relative relator1), Just (Relative relator2) ) ->
            True

        _ ->
            False


{-| Relators (used in statuses).
-}
listRelators : List Relator
listRelators =
    [ About
    , Above
    , After
    , Against
    , At
    , Before
    , Behind
    , Below
    , Beyond
    , By
    , Down
    , For
    , From
    , In
    , Inside
    , Into
    , Like
    , Of
    , Off
    , On
    , Opposite
    , Out
    , Outside
    , Over
    , Through
    , To
    , Towards
    , Under
    , Up
    , With
    , Without
    ]


{-| Maybe relators (used in balances).
-}
listMaybeRelators : List (Maybe Relator)
listMaybeRelators =
    Nothing :: (List.map (\x -> Just x) listRelators)


displayMaybeRelator : Maybe Relator -> String
displayMaybeRelator relator =
    Maybe.withDefault "-- No Relator --" (Maybe.map toString relator)


{-| Weights.
-}
listWeights : List Weight
listWeights =
    [ SameAsMain
    , Different (Speaker False)
    ]


equateWeights : Weight -> Weight -> Bool
equateWeights weight1 weight2 =
    case ( weight1, weight2 ) of
        ( SameAsMain, SameAsMain ) ->
            True

        ( Different object1, Different object2 ) ->
            True

        _ ->
            False


displayWeight : Weight -> String
displayWeight weight =
    case weight of
        SameAsMain ->
            "Same as Main Object"

        Different object ->
            "Different Object"


{-| Modalities.
-}
listModalities : Bool -> List Modality
listModalities limited =
    if limited then
        [ Yes1
        , Yes2
        , Yes3
        , Maybe1
        , Maybe3
        ]
    else
        [ Yes1
        , Yes2
        , Yes3
        , Maybe1
        , Maybe3
        , Maybe4
        ]


displayModality : Modality -> String
displayModality modality =
    case modality of
        Yes1 ->
            "Yes1 ('will')"

        Yes2 ->
            "Yes2 ('shall')"

        Yes3 ->
            "Yes3 ('must'/'ought'/'need')"

        Maybe1 ->
            "Maybe1 ('may')"

        Maybe3 ->
            "Maybe3 ('can')"

        Maybe4 ->
            "Maybe4 ('dare')"


{-| Targets.
-}
listTargets : Int -> List Int
listTargets balanceCount =
    List.range -1 (balanceCount - 1)


displayTarget : Int -> String
displayTarget target =
    if target < 0 then
        "Main Object"
    else
        "Balancing Object " ++ (toString (target + 1))


{-| Pointers.
-}
listPointers : List Pointer
listPointers =
    [ The
    , This
    , That
    , RelatedTo (Speaker False)
    ]


equatePointers : Pointer -> Pointer -> Bool
equatePointers pointer1 pointer2 =
    case ( pointer1, pointer2 ) of
        ( The, The ) ->
            True

        ( This, This ) ->
            True

        ( That, That ) ->
            True

        ( RelatedTo object1, RelatedTo object2 ) ->
            True

        _ ->
            False


displayPointer : Pointer -> String
displayPointer pointer =
    case pointer of
        RelatedTo object ->
            "Related to Object"

        a ->
            toString a


{-| Quantifiers.
-}
listQuantifiers : Bool -> List (Maybe Quantifier)
listQuantifiers amassed =
    if amassed then
        [ Nothing
        , Just Some
        , Just Any
        , Just All
        , Just Much
        , Just Most
        , Just Enough
        ]
    else
        [ Just A
        , Just (Integer 0)
        , Just Several
        , Just Many
        , Just Each
        , Just Every
        , Just Both
        , Just Some
        , Just Any
        ]


equateQuantifiers : Maybe Quantifier -> Maybe Quantifier -> Bool
equateQuantifiers quantifier1 quantifier2 =
    case ( quantifier1, quantifier2 ) of
        ( Just (Integer int1), Just (Integer int2) ) ->
            True

        _ ->
            quantifier1 == quantifier2


displayQuantifier : Maybe Quantifier -> String
displayQuantifier quantifier =
    case quantifier of
        Just (Integer int) ->
            "Integer"

        _ ->
            Maybe.withDefault "-- No Quantifier --" (Maybe.map toString quantifier)
