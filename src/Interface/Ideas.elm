module Interface.Ideas exposing (..)

{-| Module for creating lists of input options, and custom equivalence and
toString functions. Used by the Interface.Nucleus and Interface.Elaborations
modules, mainly in the generation of select dropdown menus.
-}

import Maybe
import Theory.Types exposing (..)


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


{-| Pivots.
-}
listPivots : List Pivot
listPivots =
    [ Be False Nothing
    , Seem Nothing False Nothing
    , Do "" False False
    ]


equatePivots : Pivot -> Pivot -> Bool
equatePivots pivot1 pivot2 =
    case ( pivot1, pivot2 ) of
        ( Be property1 ongoing1, Be property2 ongoing2 ) ->
            True

        ( Seem sense1 property1 ongoing1, Seem sense2 property2 ongoing2 ) ->
            True

        ( Do verbality1 ongoing1 passive1, Do verbality2 ongoing2 passive2 ) ->
            True

        _ ->
            False


displayPivot : Pivot -> String
displayPivot pivot =
    case pivot of
        Be property ongoing ->
            "Be"

        Seem sense property ongoing ->
            "Seem"

        Do verbality ongoing passive ->
            "Do"


{-| Senses.
-}
listSenses : List (Maybe Sense)
listSenses =
    [ Nothing
    , Just Sight
    , Just Smell
    , Just Sound
    , Just Taste
    , Just Touch
    ]


displaySense : Maybe Sense -> String
displaySense sense =
    Maybe.withDefault "-- No Sense --" (Maybe.map toString sense)


{-| Counters.
-}
listCounters : List (Maybe Counter)
listCounters =
    [ Nothing
    , Just About
    , Just Above
    , Just After
    , Just Against
    , Just At
    , Just Before
    , Just Behind
    , Just Below
    , Just Beyond
    , Just By
    , Just Down
    , Just For
    , Just From
    , Just In
    , Just Inside
    , Just Into
    , Just Like
    , Just Of
    , Just Off
    , Just On
    , Just Opposite
    , Just Out
    , Just Outside
    , Just Over
    , Just Through
    , Just To
    , Just Towards
    , Just Under
    , Just Up
    , Just With
    , Just Without
    ]


displayCounter : Maybe Counter -> String
displayCounter counter =
    Maybe.withDefault "-- No Counter --" (Maybe.map toString counter)


{-| Weights.
-}
listWeights : List (Maybe Weight)
listWeights =
    [ Nothing
    , Just SameObject
    , Just (Different (Speaker False))
    ]


equateWeights : Maybe Weight -> Maybe Weight -> Bool
equateWeights weight1 weight2 =
    case ( weight1, weight2 ) of
        ( Nothing, Nothing ) ->
            True

        ( Just SameObject, Just SameObject ) ->
            True

        ( Just (Different object1), Just (Different object2) ) ->
            True

        _ ->
            False


displayWeight : Maybe Weight -> String
displayWeight weight =
    case weight of
        Nothing ->
            "-- No Weight --"

        Just SameObject ->
            "Same Object"

        Just (Different object) ->
            "Different Object"


{-| Displacers.
-}
listDisplacers : Bool -> List (Maybe Displacer)
listDisplacers optional =
    if optional then
        [ Nothing
        , Just (Primary (Be False Nothing))
        , Just (Secondary SoftYes)
        ]
    else
        [ Just (Primary (Be False Nothing))
        , Just (Secondary SoftYes)
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
            "Primary Displacer"

        Just (Secondary modality) ->
            "Secondary Displacer"


{-| Modalities.
-}
listModalities : Bool -> List Modality
listModalities limited =
    if limited then
        [ SoftYes
        , HardYes
        , SoftMaybe
        , HardMaybe
        , SoftYesIsh
        , HardYesIsh
        , Dare
        ]
    else
        [ SoftYes
        , HardYes
        , SoftMaybe
        , HardMaybe
        , SoftYesIsh
        , HardYesIsh
        , Dare
        , Permission
        , Command
        ]


displayModality : Modality -> String
displayModality modality =
    case modality of
        SoftYes ->
            "Soft Yes ('will')"

        HardYes ->
            "Hard Yes ('must')"

        SoftMaybe ->
            "Soft Maybe ('may')"

        HardMaybe ->
            "Hard Maybe ('can')"

        SoftYesIsh ->
            "Soft Yes-ish ('should')"

        HardYesIsh ->
            "Hard Yes-ish ('ought')"

        Permission ->
            "Permission ('may')"

        Command ->
            "Command ('shall')"

        Dare ->
            "Dare ('dare')"


{-| Targets.
-}
listTargets : Int -> List Target
listTargets balanceCount =
    let
        balancingObjects =
            List.map (\x -> BalancingObject x) (List.range 0 (balanceCount - 1))
    in
        MainObject :: balancingObjects


displayTarget : Target -> String
displayTarget target =
    case target of
        MainObject ->
            "Main Object"

        BalancingObject int ->
            "Balancing Object " ++ (toString (int + 1))


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
        , Just Several
        , Just Many
        , Just Each
        , Just Every
        , Just Both
        , Just Some
        , Just Any
        ]


displayQuantifier : Maybe Quantifier -> String
displayQuantifier quantifier =
    Maybe.withDefault "-- No Quantifier --" (Maybe.map toString quantifier)
