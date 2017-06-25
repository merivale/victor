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

Since elaborations are such a central part of the theory, I adopt the convention
of writing them in ALLCAPS, so as to visibly distinct from other types and
values.
-}
type Message
    = Plain Nucleus
    | NEGATIVE Message
    | PAST (Maybe Time) Message
    | PRIOR Message
    | DISPLACED Displacer Message
    | REGULAR (Maybe Displacer) (Maybe Frequency) Message
    | PREORDAINED (Maybe Displacer) (Maybe Time) Message
    | EXTENDED Duration Message
    | SCATTERED Tally Message
    | INDIRECT Int Indirection Message
    | ENUMERATED Int Agglomeration Message
    | AMASSED Int Agglomeration Message


{-| The nucleus of an English message consists of an object, a pivot, and a
(potentially empty) array of balances. The pivot and balances together comprise
a condition, and a plain message affirms the present satisfaction of this
condition by the object.
-}
type alias Nucleus =
    ( Object, Condition )


{-| Objects take the following (hopefully self-explanatory) values. The optional
string argument in some cases is intended to house a proper name; otherwise
English defaults to the appropriate pronoun.
-}
type Object
    = Speaker Bool
    | Hearer Bool
    | Other Bool (Maybe Sex) (Maybe String)


type Sex
    = Male
    | Female


{-| The condition is encoded into the predicate of the sentence. The pivot is
(approximately) encoded in the verb at the start of the predicate, with any
balances fetching up in any subsequent words. Some pivots are encoded into more
than one word, however, such as "be happy", "be being silly", or "be eaten".
-}
type alias Condition =
    ( Pivot, Maybe Counter, List Balance )


{-| Pivots are of two kinds, Be or Do. The first is for predicates like "be
happy", "seem happy", "look happy", "become happy"; the second is for everything
else. The boolean argument for Be pivots specifies whether the condition is
ongoing or not ("be happy" versus "be being happy"). Likewise the first boolean
argument for Do pivots. The second indicates whether the condition is passive
or not ("eat" versus "be eaten").
-}
type Pivot
    = Be Bool
    | Do Verbality Bool Bool


type alias Verbality =
    String


type Counter
    = CounterProperty Property
    | CounterRelator Relator


type alias Property =
    String


type Relator
    = About
    | Above
    | After
    | Against
    | At
    | Before
    | Behind
    | Below
    | Beyond
    | By
    | Down
    | For
    | From
    | In
    | Inside
    | Into
    | Like
    | Of
    | Off
    | On
    | Opposite
    | Out
    | Outside
    | Over
    | Through
    | To
    | Towards
    | Under
    | Up
    | With
    | Without


{-| A balance consists of either a counter or a weight, or both. The weight is
encoded in a pronoun, proper name, or noun phrase; it's essentially just another
object, with a tweak to allow for reflexive pronouns like "myself", "herself",
etc. The counter is encoded in a preposition.
-}
type alias Balance =
    ( Maybe Relator, Weight )


type Weight
    = SameAsMain
    | Different Object


{-| This is not the place to explain the nature of the various elaborations
posited by my model. Nor is it the place to go into detail about the additional
arguments that (some of) these elaborations take; see the README file.
-}
type Displacer
    = Primary Pivot (Maybe Counter)
    | Secondary Modality


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


type alias Indirection =
    ( Pointer, Bool, Haystack )


type alias Agglomeration =
    ( Maybe Quantifier, Bool, Haystack )


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
    ( Category, Maybe Property, Maybe Restriction )


{-| Unearthed variable types, i.e. types that (for now at least) are just
aliases for strings; meaning that users must encode these for themselves.
-}
type alias Frequency =
    String


type alias Time =
    String


type alias Duration =
    String


type alias Tally =
    String


type alias Category =
    String


type alias Restriction =
    String


{-| To keep track of the effect the nucleus and any subsequent elaboration has
on the sentence, and to check that the message is valid, the encoding function
needs to pass around several variables. For convenience, these variables are
collected together here into a single record. The Booleans at the start are
for the most part flags required for message validation; the properties further
down are direct determiners of the output string.
-}
type alias Vars =
    { past : Bool
    , negationTarget : NegationTarget
    , object : PseudoObject
    , modality : Maybe Modality
    , negatedModality : Bool
    , longPivot : LongPivot
    , longPivots : List LongPivot
    , balances : List PseudoBalance
    , post : List String
    }


type NegationTarget
    = NegateCondition
    | NegateModality
    | NegateMainObject


type alias LongPivot =
    { pivot : Pivot
    , counter : Maybe Counter
    , prior : Bool
    , pre : List String
    }


type PseudoObject
    = RealObject Object
    | IndirectObject Object Indirection
    | AgglomeratedObject Object Bool Agglomeration


type PseudoBalance
    = RealBalance Balance
    | IndirectBalance (Maybe Relator) Object Indirection
    | AgglomeratedBalance (Maybe Relator) Object Bool Agglomeration
