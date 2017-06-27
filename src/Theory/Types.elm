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
    | INDIRECT Int Description Message
    | ENUMERATED Int Multiplicity Message
    | AMASSED Int Proportion Message


{-| The nucleus of an English message consists of an object and a condition. A
plain message affirms the present satisfaction of the condition by the object.
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
(approximately) encoded in the verb at the start of the predicate, with the
counter and any balances fetching up in subsequent words. Some pivots are
encoded into more than one word, however, such as "be laughing" or "be seen".
-}
type alias Condition =
    ( Pivot, Maybe Counter, List Balance )


{-| Pivots are of two kinds, Be or Do. The boolean argument for Be pivots
specifies whether the condition is ongoing or not ("be" versus "be being").
Likewise the first boolean argument for Do pivots. The second indicates
whether the condition is passive or not ("see" versus "be seen").
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


{-| A balance consists of a weight prefixed by an optional relator. The weight
is encoded in a pronoun, proper name, or noun phrase; it's essentially just
another object, with a tweak to allow for reflexive pronouns like "myself",
"herself", etc. The relator is encoded in a preposition.
-}
type alias Balance =
    ( Maybe Relator, Weight )


type Weight
    = SameAsMain
    | Different Object


{-| The DISPLACED, REGULAR, and PREORDAINED elaborations take a Displacer
argument. This is either another pivot or a modality.
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


{-| The last two modalities on this list are permissible in PREORDAINED
elaborations only. The Messages module, when validating DISPLACED and REGULAR
messages, should use this list to check all is as it should be.
-}
preordainedOnly : List Modality
preordainedOnly =
    [ Permission
    , Command
    ]


{-| The INDIRECT, ENUMERATED, and AMASSED elaborations all take Description,
Multiplicity, and Proportion arguments respectively. These arguments have quite
a lot in common; together they are responsible for noun phrases, like "the red
baloon", "your best friend", "several seditious scribes from Caesarea", etc.
-}
type alias Description =
    ( Pointer, Bool, Haystack )


type alias Multiplicity =
    ( Quantifier, Bool, Haystack )


type alias Proportion =
    ( Maybe Quantifier, Bool, Haystack )


type Pointer
    = The
    | This
    | That
    | RelatedTo Object


type Quantifier
    = A
    | Integer Int
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


{-| Multiplicities and Proportions for the most part use different Quantifiers.
Some and Any, however, show up on both sides of this divide. The Messages
module, when validating ENUMERATED and AMASSED messages, should use these lists
to check all is as it should be.
-}
enumerators : List Quantifier
enumerators =
    [ A
    , Integer 0
    , Several
    , Many
    , Each
    , Every
    , Both
    , Some
    , Any
    ]


amassors : List Quantifier
amassors =
    [ Some
    , Any
    , All
    , Much
    , Enough
    ]


type alias Haystack =
    ( Category, Maybe Property, Maybe Restriction )


type alias Category =
    String


type alias Restriction =
    String


{-| Other variables for elaborations are currently entirely unearthed. They are
just aliases for string, meaning that users must encode these arguments for
themselves.
-}
type alias Frequency =
    String


type alias Time =
    String


type alias Duration =
    String


type alias Tally =
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
    = DirectObject Object
    | IndirectObject Object Description
    | EnumeratedObject Object Bool Multiplicity
    | AmassedObject Object Bool Proportion


type PseudoBalance
    = DirectBalance Balance
    | IndirectBalance (Maybe Relator) Object Description
    | EnumeratedBalance (Maybe Relator) Object Bool Multiplicity
    | AmassedBalance (Maybe Relator) Object Bool Proportion
