module Interface.Ideas exposing (..)

import Maybe
import Theory.Types exposing (..)


objects : List Object
objects =
    [ Speaker
    , Hearer
    , Male Nothing
    , Female Nothing
    , Thing Nothing
    , Speakers
    , Hearers
    , PeopleOrThings Nothing
    ]


objectGroups : List ( String, List Object )
objectGroups =
    [ ( "Singular", [ Speaker, Hearer, Male Nothing, Female Nothing, Thing Nothing ] )
    , ( "Plural", [ Speakers, Hearers, PeopleOrThings Nothing ] )
    ]


objectToString : Object -> String
objectToString object =
    case object of
        Male string ->
            "Male"

        Female string ->
            "Female"

        Thing string ->
            "Thing"

        PeopleOrThings string ->
            "People/Things"

        a ->
            toString a


balances : List (Maybe Balance)
balances =
    [ Nothing
    , Just SameObject
    , Just (DifferentObject Speaker)
    , Just (CustomBalance "")
    ]


balanceToString : Maybe Balance -> String
balanceToString balance =
    case balance of
        Nothing ->
            "Nothing"

        Just b ->
            case b of
                SameObject ->
                    "Same Object"

                DifferentObject object ->
                    "Different Object"

                CustomBalance string ->
                    "Custom"


limitedModalities : List Modality
limitedModalities =
    [ SoftYes
    , HardYes
    , SoftMaybe
    , HardMaybe
    , SoftYesIsh
    , HardYesIsh
    , Dare
    ]


unlimitedModalities : List Modality
unlimitedModalities =
    limitedModalities ++ [ Permission, Command ]


modalityToString : Modality -> String
modalityToString modality =
    case modality of
        SoftYes ->
            "Soft Yes -- WILL"

        HardYes ->
            "Hard Yes -- MUST"

        SoftMaybe ->
            "Soft Maybe -- MAY"

        HardMaybe ->
            "Hard Maybe -- CAN"

        SoftYesIsh ->
            "Soft Yes-ish -- SHOULD"

        HardYesIsh ->
            "Hard Yes-ish -- OUGHT"

        Permission ->
            "Permission -- MAY"

        Command ->
            "Command -- SHALL"

        Dare ->
            "Dare -- DARE"


pointers : List Pointer
pointers =
    [ The
    , This
    , That
    , RelatedTo Speaker
    ]


pointerToString : Pointer -> String
pointerToString pointer =
    case pointer of
        RelatedTo object ->
            "Related to Object"

        a ->
            toString a


enumeratedQuantifiers : List Quantifier
enumeratedQuantifiers =
    [ A
    , Several
    , Many
    , Each
    , Every
    , Both
    , Some
    , Any
    ]


amassedQuantifiers : List (Maybe Quantifier)
amassedQuantifiers =
    [ Nothing
    , Just Some
    , Just Any
    , Just All
    , Just Much
    , Just Most
    , Just Enough
    ]


maybeQuantifierToString : Maybe Quantifier -> String
maybeQuantifierToString quantifier =
    Maybe.withDefault "No Quantifier" (Maybe.map toString quantifier)
