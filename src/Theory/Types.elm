module Theory.Types exposing (..)

{-| Type definitions for the theory.
-}

-- no imports necessary


{-| A message is a structured arrangement of informational and stylistic
choices. The type definition for messages themselves is recursive: every English
message, in my model, is either a plain nucleus, or an elaboration of another
message (itself either a plain nucleus, or the elaboration of yet another
message, and so on). Note however that this definition is too broad: some
arrangements that it allows are invalid, and would result in ungrammatical
sentences. These arrangements are ruled out by the encoding function along the
way, rather than in the type definition itself. This is by design: one of the
principles behind my model is that English is presumptively unrestrictive in its
elaborating system, i.e. that every combination of elaborations is allowable
unless there is some positive reason for ruling it out.
-}
type Message
    = Plain Nucleus
    | Negative Message
    | Past Message
    | Prior Message
    | Expanded Pivot Message
    | Practical Modality Message
    | Evasive Modality Message
    | Projective Modality (Maybe Time) Message
    | Preordained (Maybe Time) Message
    | Regular (Maybe Frequency) Message
    | Extended Duration Message
    | Scattered Tally Message
    | Indirect Target Pointer Bool Haystack Bool Message
    | Enumerated Target Quantifier Bool Haystack Message
    | Amassed Target (Maybe Quantifier) Bool Haystack Bool Message


{-| The nucleus of an English message consists of an object and a condition. A
plain message affirms the present satisfaction of the condition by the object.
A condition comprises a pivot (encoded in a verb) and - optionally - a balance.
My model does not (yet) handle conditions with any degree of precision. Users
must encode their pivots for themselves, and also their balances, unless the
balance is another object.
-}
type alias Nucleus =
    { object : Object
    , condition : Condition
    }


type Object
    = Speaker
    | Hearer
    | Male (Maybe String)
    | Female (Maybe String)
    | Thing (Maybe String)
    | Speakers
    | Hearers
    | PeopleOrThings (Maybe String)


type alias Condition =
    { pivot : Pivot
    , balance : Maybe Balance
    }


type Pivot
    = Be (Maybe String) Bool
    | Do String Bool Bool


type Balance
    = SameObject
    | IndependentObject Object
    | CustomBalance String


{-| This is not the place to explain the nature of the various elaborations
posited by my model. Nor is it the place to go into detail about the additional
arguments that (some of) these elaborations take. See the README file for
details. Note that many of these arguments are currently just aliases for
strings, which means that users are obliged to encode them for themselves. These
represent parts of my model that await further development.
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
collected together here into a single record. The Booleans at the start are
for the most part flags required for message validation; the properties further
down are direct determiners of the output string.
-}
type alias Vars =
    { past : Bool
    , prior : Bool
    , projective : Bool
    , negateObject : Bool
    , object : MetaObject
    , modality : Maybe Modality
    , pivot : Pivot
    , pre1 : List String
    , pre2 : List String
    , balance : MetaBalance
    , post : List String
    }


type MetaObject
    = RealObject Object
    | PseudoObject ObjectOverride


type MetaBalance
    = RealBalance Balance
    | PseudoBalance ObjectOverride


type ObjectOverride
    = IndirectOverride Pointer Bool Haystack Bool
    | EnumeratedOverride Quantifier Bool Haystack
    | AmassedOverride (Maybe Quantifier) Bool Haystack Bool

{-    , objectOverride : Bool
    , balanceObject : Bool
    , balanceOverride : Bool
    , subject : List String
    , modality : Maybe Modality
    , negatedModality : Bool
    , amNeeded : Bool
    , isNeeded : Bool
    , verb : String
    , pre1 : List String
    , pre2 : List String
    , counter : List String
    , post : List String
    }
-}