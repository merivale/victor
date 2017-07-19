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
    | PAST (Maybe String) Message
    | PRIOR Message
    | DISPLACED Displacer Message
    | PREORDAINED (Maybe Displacer) (Maybe String) Message
    | REGULAR (Maybe Displacer) (Maybe String) Message
    | EXTENDED String Message
    | SCATTERED String Message
    | INDIRECT Int Description Message
    | ENUMERATED Int Multiplicity Message
    | AMASSED Int Proportion Message


{-| The nucleus of an English message consists of an object and a condition. A
plain message affirms the present satisfaction of the condition by the object.
-}
type alias Nucleus =
    ( Object, Condition )


{-| Objects take the following values. The boolean argument represents whether
or not the object is plural. The optional string argument in the Other case is
intended to house a proper name; otherwise English defaults to the appropriate
pronoun.
-}
type Object
    = Speaker Bool
    | Hearer Bool
    | Other Bool (Maybe Sex) (Maybe String)


type Sex
    = Male
    | Female


{-| The condition is encoded into the predicate of the sentence. It is an
ordered pair of a pivot and a (possibly empty) list of balances.
-}
type alias Condition =
    ( Pivot, List Balance )


{-| The pivot in turn is an ordered pair of a compulsory verbality and an
optional status.
-}
type alias Pivot =
    ( Verbality, Maybe Status )


{-| Verbalities are of two kinds, either Be or Do. In the latter case, the
string argument is for holding the verb (in its base form; "do", "like", "live",
"love", etc.). The boolean arguments are for ongoing and passive (but only
Do verbalities can be passive). Between them these account for the following:

    | ongoing | passive | output           |
    | ------- | ------- | ---------------- |
    |    F    |    F    | "eat"            |
    |    F    |    T    | "be eaten"       |
    |    T    |    F    | "be eating"      |
    |    T    |    T    | "be being eaten" |
-}
type Verbality
    = Be Bool
    | Do String Bool Bool


{-| Statuses are of two kinds, absolute or relative. Absolute statuses are
encoded in adjectives, which users must input for themselves (hence the string
argument). Relative statuses are relators, encoded in prepositions. There are
more relators/prepositions in English than my model presently accommodates, but
I've included a fair number of the most common.
-}
type Status
    = Absolute String
    | Relative Relator


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
"herself", etc. The relator - as above - is encoded in a preposition.
-}
type alias Balance =
    ( Maybe Relator, Weight )


type Weight
    = SameAsMain
    | Different Object


{-| The DISPLACED, PREORDAINED, and REGULAR elaborations take a Displacer
argument, which is either primary (a pivot) or secondary (a modality, encoded
in one of the English modals).
-}
type Displacer
    = Primary Pivot
    | Secondary Modality


type Modality
    = Yes1    -- "will"
    | Yes2    -- "shall"
    | Yes3    -- "must"/"ought"/"need"
    | Maybe1  -- "may"
    | Maybe3  -- "can"
    | Maybe4  -- "dare"


{-| The INDIRECT, ENUMERATED, and AMASSED elaborations all take Description,
Multiplicity, and Proportion arguments respectively. These arguments have quite
a lot in common; together they are responsible for noun phrases, like "the red
baloon", "your best friend", "several seditious scribes from Caesarea", etc. The
boolean argument in the middle triggers in output of "other"/"else", as in "your
other friend", "someone else", etc.
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


{-| Quantifiers are of two kinds, enumerating and amassing, the former for
multiplicites (in ENUMERATED messages) and the latter for proportions (in
AMASSED messages). The quantifiers Some and Any, however, are both enumerating
and amassing, i.e. they can be used in both multiplicities and proportions.
Consequently there is only one type definition. The quantifiers up to and
including Some and Any in this list are enumerating; those including and
afterwards are amassing.
-}
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


type alias Haystack =
    ( String, Maybe String, Maybe String )


{-| To keep track of the effect the nucleus and any subsequent elaboration has
on the sentence, and to check that the message is valid, the encoding function
needs to pass around several variables. For convenience, these variables are
collected together here into a single record. The Booleans at the start are
for the most part flags required for message validation; the properties further
down are direct determiners of the output string.
-}
type alias Vars =
    { negationTarget : NegationTarget
    , object : PseudoObject
    , past : Bool
    , prior : Bool
    , modality : Maybe Modality
    , negatedModality : Bool
    , preordained : Bool
    , regular : Bool
    , pre : List String
    , pivot : Pivot
    , displacedPivots : List ( Bool, List String, Pivot )
    , balances : List PseudoBalance
    , post : List String
    }


type NegationTarget
    = NegateCondition
    | NegateModality
    | NegateMainObject


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
