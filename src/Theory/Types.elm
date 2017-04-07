module Theory.Types exposing (..)

{-| Messages.
-}
type Message
    = Plain Nucleus
    | Negative Message
    | Past Message
    | Prior Message
    | Practical Modality Message
    | Projective Modality (Maybe Time) Message
    | Evasive Modality Message
    | Preordained (Maybe Time) Message
    | Regular (Maybe Frequency) Message
    | Extended Duration Message
    | Scattered Tally Message
    | Ongoing Message
    | Determined (Maybe Time) Message
    | Imminent Message
    | Apparent Bool Message
    | Indirect Target Pointer Bool Haystack Bool Message
    | Enumerated Target Quantifier Bool Haystack Message
    | Amassed Target (Maybe Quantifier) Bool Haystack Bool Message


{-| Base factors.
-}
type alias Nucleus =
    { object : Object
    , pivot : String
    , balance : Maybe Balance
    , abbreviateFulcrum : Bool
    , abbreviateNot : Bool
    }


type Balance
    = SameObject
    | DifferentObject Object
    | CustomBalance String


type Object
    = Speaker
    | Hearer
    | Male (Maybe String)
    | Female (Maybe String)
    | Thing (Maybe String)
    | Speakers
    | Hearers
    | PeopleOrThings (Maybe String)


{-| Elaboration factors.
-}
type Modality
    = SoftYes
    | HardYes
    | SoftMaybe
    | HardMaybe
    | SoftYesIsh
    | HardYesIsh
    | Dare
    | Permission
    | Command


type alias Time =
    String


type alias Frequency =
    String


type alias Duration =
    String


type alias Tally =
    String


type Target
    = MainObject
    | BalancingObject


type Pointer
    = The
    | This
    | That
    | RelatedTo Object


type Quantifier
    = A
    | Several
    | Many
    | Each
    | Every
    | Both
    | Some
    | Any
    | All
    | Much
    | Most
    | Enough


type alias Haystack =
    { category : String
    , description : Maybe String
    , restriction : Maybe String
    }


{-| To keep track of the effect the nucleus and any subsequent elaboration has
on the sentence, and to check that the message is valid, the encoding function
needs to pass around a lot of variables. For convenience, these variables are
collected together here into a single record.
-}
type alias Vars =
    { past : Bool
    , prior : Bool
    , ongoing : Bool
    , projective : Bool
    , negateObject : Bool
    , objectOverride : Bool
    , balanceObject : Bool
    , balanceOverride : Bool
    , subject : List String
    , modality : Maybe Modality
    , negatedModality : Bool
    , negatedFulcrum : Bool
    , abbreviateNot : Bool
    , abbreviateFulcrum : Bool
    , amNeeded : Bool
    , isNeeded : Bool
    , verb : String
    , pre1 : List String
    , pre2 : List String
    , counter : List String
    , post : List String
    }
