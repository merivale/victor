# Victor

A model of the English language, thought of as a code for processing *messages* (structured arrangements of informational choices) into *sentences* (strings of words). Inspired by the work of grammarian and logician Victor Howard Dudman, and with a gracious nod to Claude Shannon, the founder of information theory. Read on for an outline of the model and the philosophy behind it, and play around with the current version at [https://merivale.github.io/victor/](https://merivale.github.io/victor/).

1. [The Point](#1-the-point)
2. [The Source](#2-the-source)
3. [Grammatical Terminology](#3-grammatical-terminology)
4. [The Theory, part 1/2: The Nucleus](#4the-theory-part-12-the-nucleus)
    1. [Objects and Balances](#41-objects-and-balances)
    2. [Pivots](#42-pivots)
    3. [Limitations](#43-limitations)
5. [The Theory, part 2/2: The Elaborations](#5the-theory-part-22-the-elaborations)
    1. [PAST and PRIOR Messages](#51-past-and-prior-messages)
    2. [Conservative PREORDAINED Messages](#52-conservative-preordained-messages)
    3. [Conservative REGULAR, EXTENDED, and SCATTERED Messages](#53-conservative-regular-extended-and-scattered-messages)
    4. [NEGATIVE Messages](#54-negative-messages)
    5. [Interlude: Against the Future Tense Hypothesis](#55-interlude-against-the-future-tense-hypothesis)
    6. [Primary DISPLACED, PREORDAINED, and REGULAR Messages](#56-primary-displaced-regular-and-preordained-messages)
    7. [Secondary DISPLACED Messages](#57-secondary-displaced-messages)
    8. [Secondary PREORDAINED and REGULAR Messages](#58-secondary-preordained-and-regular-messages)
    9. [INDIRECT, ENUMERATED, and AMASSED Messages](#59-indirect-enumerated-and-amassed-messages)

## 1. The Point

My project does not fit neatly into existing intellectual paradigms. Indeed, it seeks to subvert them. Dudman presented his work as a contribution to philosophical semantics, urging that this subject needed to be approached grammatically. But the code breaker's methodology is scarcely less radical in grammatical circles than it is in philosophical ones. (Many linguists, it is true, have embraced the code analogy; but the methodology that analogy suggests remains largely untested.) I am apt to suspect that philosophers missed the significance of Dudman's ideas largely as a result of failing to appreciate what he meant by "grammar". To make matters worse, there is a venerable tradition in analytic philosophy, going right back to Bertrand Russell, of viewing "surface" grammar as positively at odds with the "deeper" logical realities. Insofar as there was ever any truth to these worries, they simply reflected bad grammatical theory; and insofar as the grammar was sound, they reflected dubious logical and semantic speculation lazily divorced from empirical fact. For the code breaker, grammar, logic, and semantics are all facets of one and the same scientific enterprise.

The standard picture in philosophical circles nowadays is that the science of language divides into three parts. The first, *syntax*, seeks to uncover the rules governing the construction of grammatical or well-formed sentences. The second and third, *semantics* and *pragmatics*, attempt to articulate the meanings of the sentences thus constructed, and the relationship between these two sides of the communicative coin (the signs and what they signify). Semantics is the study of the meanings of sentences in general, on the assumption that there are such things, and that they are related functionally to the sentences that convey them. Pragmatics is the study of the meanings of sentences in context, something that is observed to go above and beyond their semantic or literal meaning. It is generally assumed that this layer of meaning is not functionally determined, and consequently not susceptible to the sort of formal treatment typical of philosophical semantics; the sentence determines a literal meaning, on this view, but that literal meaning then serves (together with other contextual factors) as evidence for the pragmatically enriched information.

When philosophers think of grammar, they think of syntax; grammar, to their minds, is the study of how sentences are formed. Grammarians, however, are not generally in the habit of trying to specify formal syntactic rules of the sort philosophers routinely describe for their artificial languages (with the exception of practitioners of generative grammar, that is, who are in the habit of doing precisely this). Moreover, grammarians typically see their remit as extending beyond syntax; into morphology and phenology, for instance, but more importantly for present purposes into semantics as well. But the grammatical approach to semantics differs strikingly from the philosophical approach: where philosophers delight in general rules, and tend to downplay their exceptions (or perhaps shrug them off as problems for pragmatics), grammarians prefer to catalogue the several different uses of a given syntactic device, showing little interest in speculation about any deeper regularities that might underlie the surface variety.

Nowhere is this lack of interest in underlying regularities more striking than in grammatical discussions of the meanings of the inflectional forms of the English verbs. The so-called "present tense" form, it is said, is used to talk about the present (`"I am hungry"`), the future (`"We are seeing him tomorrow"`), all time (`"Salt dissolves in water"`), and even no time at all (`"Two plus two equals four"`). The so-called "past tense" form, meanwhile, is observed in talk about the past (`"I was hungry"`), the future (`"We were seeing him tomorrow"`), and what is often diagnosed as "unreality", be it past, present, or future (`"If she had been here yesterday, ..."`/`"If she was here today, ..."`/`"If she came by here tomorrow, ..."`). This is all well and good, as far as it goes. But to the mind of a truly scientific enquirer, it does not go nearly far enough. What we want is a general theory that predicts and explains all of these intriguingly different uses.

When we turn to the philosophers, alas, we are no less disappointed. They love their general rules, but conversely tend to show little interest in the tantalisingly varied data of English usage. Philosophical theories of tense and time achieve regularity simply by stipulation. And if these stipulations don't match the English language? Well, that just goes to show how messy natural languages are (more work for pragmatics, I suppose), how misleading the grammar of English is, and what a good thing it is that Frege and Russell set us on the track of developing clear and precise artificial languages in which to conduct our business instead.

We can do better. And the way to do better is to embrace the code breaker's methodology. Philosophical semantics treats languages as functions from sentences to their (literal and context-independent) interpretations, with the inputs to those functions coming from the quite separate field of grammar or syntax. I suggest that they are approaching the problem the wrong way around. Languages should be modelled as functions in precisely the *opposite* direction, as codes for processing messages into sentences. Syntax and semantics would then no longer be separate subjects, but one and the same: the function that connects sentences to their interpretations is also the function that generates those sentences in the first place.

By modelling the function in my preferred direction, therefore, we have a way of bringing semantic theories directly into contact with the observable data. These theories can no longer ignore or dismiss the words English speakers use to convey their messages, as problems for grammar or pragmatics. Consequently my approach promises the best of both worlds: the formal rigour and quest for general theory typical of modern philosophical semantics, but with the kind of attention to empirical detail that we find in contemporary grammatical enquiry. Nor is this an empty promise. Building on Dudman's work, I am developing a unified theory of tense and time in English, which reduces all of the surface variety observable in the use of the finite forms of the English verbs and modals to the interplay of just a handful of very simple rules. If Dudman and I are right, then English is neither the capricious system grammarians often describe, nor the irregular mess philosophers typically assume. It is an elegant, precise, and formally specifiable code.

There is also another, more specific reason why the direction in which we model the semantic function matters, and it is based on the phenomenon of ambiguity. The decision to treat the message as a function of the sentence forces us into an uncomfortable theoretical position, whereby ambiguous sentences are, from the semantic point of view, quite simply impossible. This may be fine for unambiguous artificial languages, but since the sentences of natural languages are typically rife with ambiguity, philosophers have no option but to offer syntactic or pragmatic accounts of this - as they see it - messy and unwelcome feature of the real world. I argue (though not here) that these accounts are unsatisfactory. What we need are *semantic* explanations of ambiguity. By modelling languages as codes, i.e. as functions from messages to sentences, semantic explanations of ambiguity become possible. The explanation in general is that the encoding function of an ambiguous language is not one-to-one, but many-to-one. Ambiguous languages are thus *lossy* codes, which do not preserve in their output strings all of the information in their input messages. More than this, however, by articulating the English encoding function, we are able to see precisely how and why various English ambiguities arise.

(The obverse of ambiguity is the phenomenon of stylistic variance, whereby the same information is encoded in more than one sentence. Stylistic variance includes optional abbreviations (`"She is not hungry"`/`"She's not hungry"`/`"She isn't hungry"`), word order (`"He left yesterday"`/`"Yesterday he left"`), and a few other things as well. It poses no threat to the code analogy. It simply means that we must build stylistic as well as informational choices into the code. The better to focus on the latter for now, my model does not yet include any stylistic variables, insisting on just one "canonical" output for every infomational input. In a later iteration, however, I do intend to add some stylistic arguments to my function.)

## 2. The Source

My algorithm is written in [Elm](http://elm-lang.org/), with the styles written in [Less](http://lesscss.org/). The compiled HTML+JS+CSS is stored in the gh-pages branch, for easy integration with [GitHub Pages](https://pages.github.com/). The `src` directory contains the main program module, which simply pulls everything together (nothing to see there), and two subdirectories, `Interface` and `Theory`. The former directory contains all the modules responsible for generating the web page users see, for keeping track of user input, and for piecing that input together into a message variable. It is the modules in the latter directory that are potentially of theoretical interest, since they describe what a message variable looks like, and define the encoding function that converts these variables into strings.

There is no need to go into detail about the `Theory` modules here. Anyone interested in the nuts and bolts should simply read the code itself. It is internally documented, and is intended to be intelligible to anyone of a suitably logical turn of mind (although obviously some experience of functional programming would help). Indeed, I consider it a major selling point of my theory that it is computationally very simple. Readers should start with the `Types` module for my account of messages (and their components), and then glance at the `Words` module. This latter contains a few small functions for generating words and their various forms. It is not very interesting in itself, but is perhaps helpful in serving to solidify an understanding of the grammatical terminology that I use (see [section 3](#3-grammatical-terminology) below).

Next, readers should look at the `Sentences` module, which contains the encoding function itself, the function for processing messages into sentences. This function divides into two stages. In the first stage, the message is validated, and the variables that have a bearing on the output sentence are extracted; in the second stage, those variables are used to generate the sentence itself. The second stage is implemented directly within the `Sentences` module (with help from the little functions exposed by the `Words` module). The first stage is handled by the separate `Messages` module.

I have not yet written any tests, but there is a stub `test` directory as a placeholder for later development in this direction. From the point of view of the theory (never mind the interface), it would be helpful to have tests that run various message variables through my encoding function, and check that the resulting strings are as they should be.

## 3. Grammatical Terminology

I deploy a small amount of grammatical terminology, most of which I expect to be familiar, but some of which is a little idiosyncratic. It is simplest to introduce this all up front. Semantic terminology will be introduced in situ in [section 4](#4-the-theory-part-12-the-nucleus) and [section 5](#5-the-theory-part-22-the-elaborations) below.

First, I divide English lexemes into a handful of categories, mostly standard. There are just a couple of things to note: (i) I do not treat the *modals* as a subset of the *verbs*, but as belonging to a distinct category all of their own (more on this distinction below); and (ii) I distinguish between *articles* and *determiners*, and in a somewhat unusual way (I classify the so-called "indefinite article" as a determiner). Here are the categories I will be assuming, with some examples:

| Category    | Examples                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------- |
| Preposition | `"at"`, `"by"`, `"from"`, `"in"`, `"on"`, `"with"`, ...                                            |
| Article     | `"the"`, **`"this"`**, **`"that"`**                                                                |
| Determiner  | **`"a"`**, `"any"`, `"all"`, `"each"`, `"every"`, `"some"`, ...                                    |
| Noun        | **`"car"`**, **`"cat"`**, **`"frog"`**, **`"treasure"`**, **`"water"`**, ...                       |
| Pronoun     | **`"I"`**, **`"you"`**, **`"he"`**, **`"she"`**, **`"it"`**, **`"we"`**, **`"you"`**, **`"they"`** |
| Verb        | **`"be"`**, **`"have"`**, **`"do"`**, **`"eat"`**, **`"laugh"`**, **`"sing"`**, ...                |
| Modal       | **`"will"`**, **`"shall"`**, **`"can"`**, **`"may"`**, `"must"`, `"ought"`, `"need"`, `"dare"`     |
| Adjective   | `"angry"`, `"happy"`, `"hungry"`, `"green"`, `"red"`, `"silly"`, ...                               |
| Adverb      | `"quickly"`, `"quietly"`, `"sometimes"`, `"occasionally"`, `"often"`, ...                          |

I refer to lexemes that have more than one form in **boldface**, using ordinary weighting to refer to their individual forms. Thus the determiner **`"a"`** has the two (informationally equivalent) forms `"a"` and `"an"`. The article **`"this"`** has the two forms `"this"` (singular) and `"these"` (plural), and the article **`"that"`** has the two forms `"that"` (singular) and `"those"` (plural). The nouns likewise all have a singular and a plural form (`"car"`/`"cars"`, `"frog"`/`"frogs"`, etc.).

I count eight pronouns, and label them in the standard way: *first*, *second*, and *third person*, each either *singular* or *plural* (which makes six), and then an additional two in the third person singular, distinguishing male and female from neuter. Thus:

| Number   | Person | Pronoun                 |
| -------- | ------ | ----------------------- |
| Singular | First  | `"I"`                   |
|          | Second | `"you"`                 |
|          | Third  | `"he"`, `"she"`, `"it"` |
| Plural   | First  | `"we"`                  |
|          | Second | `"you"`                 |
|          | Third  | `"they"`                |

Since the old second person singular `"thou"` was usurped by its corresponding plural pronoun `"you"`, the latter is now ambiguous. It is simplest to distinguish two pronouns here, both spelt the same.

The eight pronouns come in five different forms, three *direct* and two *relative*. The distinction between the two second person pronouns, note, reveals itself in the third direct form (`"yourself"` vs. `"yourselves"`):

| Pronoun      | Direct 1 | Direct 2 | Direct 3       | Relative 1 | Relative 2 |
| ------------ | -------- | -------- | -------------- | ---------- | ---------- |
| **`"I"`**    | `"I"`    | `"me"`   | `"myself"`     | `"my"`     | `"mine"`   |
| **`"you"`**  | `"you"`  | `"you"`  | `"yourself"`   | `"your"`   | `"yours"`  |
| **`"he"`**   | `"he"`   | `"him"`  | `"himself"`    | `"his"`    | `"his"`    |
| **`"she"`**  | `"she"`  | `"her"`  | `"herself"`    | `"her"`    | `"hers"`   |
| **`"it"`**   | `"it"`   | `"it"`   | `"itself"`     | `"its"`    | `"its"`    |
| **`"we"`**   | `"we"`   | `"us"`   | `"ourselves"`  | `"our"`    | `"ours"`   |
| **`"you"`**  | `"you"`  | `"you"`  | `"yourselves"` | `"your"`   | `"yours"`  |
| **`"they"`** | `"they"` | `"them"` | `"themselves"` | `"their"`  | `"theirs"` |

My labels for these forms are idiosyncratic. People will likely know the third direct form as the "reflexive" form, for example, and the first relative form as the "possessive" form. I dislike the second of these terms, since the first relative form does not signal the relation of possession in particular, but simply the idea of a relation more generally (see [section 5.9](#59-indirect-enumerated-and-amassed-messages) below). The first, however, seems harmless enough. Nevertheless, I have a general preference for bland terminology that doesn't assume or imply too much at the level of interpretation.

This general preference extends itself to my labels for the various forms of the verbs. The English verbs (apart from **`"be"`**, which I will come to in a moment) all come in five forms, a *base* form, two *finite* forms, and two *participle* forms. For example:

| Verb          | Base      | Finite 1    | Finite 2   | Participle 1 | Participle 2 |
| ------------- | --------- | ----------- | ---------- | ------------ | ------------ |
| **`"do"`**    | `"do"`    | `"does"`    | `"did"`    | `"doing"`    | `"done"`     |
| **`"have"`**  | `"have"`  | `"has"`     | `"had"`    | `"having"`   | `"had"`      |
| **`"like"`**  | `"like"`  | `"likes"`   | `"liked"`  | `"liking"`   | `"liked"`    |
| **`"make"`**  | `"make"`  | `"makes"`   | `"made"`   | `"making"`   | `"made"`     |
| **`"sing"`**  | `"sing"`  | `"sings"`   | `"sang"`   | `"singing"`  | `"sung"`     |
| **`"teach"`** | `"teach"` | `"teaches"` | `"taught"` | `"teaching"` | `"taught"`   |
| ...           |           |             |            |              |              |

For regular verbs, and for some otherwise irregular ones as well, the second finite form and the second participle form are identical (a fact that must surely have some semantic significance). Nevertheless, it makes for a simpler model if we draw the distinction for every verb.

At first blush, readers will recognise the first and second finite forms as the "present tense" and "past tense" forms respectively. I strongly oppose this loaded terminology, since it is a matter of considerable controversy what these forms signify, and whether it is (or whether it is always) temporal information. Somewhat perversely, I defend the (uncommon) view that it *is* always temporal information. Nevertheless, it is better to settle at the outset on some semantically neutral labels. I said *at first blush*, moreover; in fact, the "present tense" standardly refers to a dual form, which (in my terms) sometimes looks like the base form, and sometimes looks like the first finite form. There is of course a very natural reason for this grouping: `"I like you"` and `"He likes you"` encode messages that differ only in respect of who is doing the liking. But the fact that the base form can be used in this way, as informationally equivalent to the first finite form, is itself very striking, and it demands an explanation. Talk of a dual "present tense" form serves only to hide this curious feature of English; as though the `"like"` in `"I like you"` was not really the base form of the verb at all, but a finite form that merely happens to look like the base form.

The uniquely awkward verb **`"be"`** is like any other verb in its base and participle forms (`"be"`, `"being"`, `"been"`), but instead of two finite forms it has five: `"am"`, `"is"`, `"are"`, `"was"`, and `"were"`. The second of these corresponds to the first finite form of other verbs, while the last two correspond to the second. The first and third have no exact analogues in the other verbs, but correspond to the familiar "present tense" use of the base form. I expect an explanation of this verb's uniquely irregular behaviour. In other words, I expect an account of the English code to locate the meaning of **`"be"`** alongside the meanings of the other verbs, but also somewhat distinct from them; there ought to be some underlying difference that sustains the irregularity.

The English modals, finally, each have one finite form, and half of them have two (I classify `"ought"` as a *second* finite form on semantic grounds; see [section 5.7](#56-secondary-displaced-messages) and [section 5.8](58-secondary-preordained-and-regular-messages) below):

| Modal	        | Finite 1  | Finite 2   |
| ------------- | --------- | ---------- |
| **`"will"`**  | `"will"`  | `"would"`  |
| **`"shall"`** | `"shall"` | `"should"` |
| **`"may"`**   | `"may"`   | `"might"`  |
| **`"can"`**   | `"can"`   | `"could"`  |
| `"must"`      | `"must"`  | -          |
| `"ought"`     | -         | `"ought"`  |
| `"need"`      | `"need"`  | -          |
| `"dare"`      | `"dare"`  | -          |

While undeniably akin to the verbs, the modals have no participle forms and no base form. While most grammars treat them as special kinds of verbs, I prefer to place them in a distinct category of their own. As with the verb **`"be"`**, but even more so in their case, I expect some explanation of the striking syntactic differences these words exhibit from the verbs. In other words, I expect the modals to show up in a closely related but nevertheless distinct part of the English code. If they were not somehow separated within the workings of the function, nothing would prevent them from acquiring all the usual five forms that the verbs enjoy. Or rather, since these lexemes seem to have started life as verbs like any other: if they had not migrated to a separate part of the function, nothing would explain why they each *lost* three or four of their forms.

## 4. The Theory, part 1/2: The Nucleus

The overarching hypothesis behind my model is that every atomic English message is made up out of a series of zero or more *elaborations* applied to a core *nucleus*. (The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.) Consequently my theory as a whole consists of two interlocking theories: a theory of plain English messages (i.e. those messages composed of an unelaborated nucleus), and a theory of English elaborations. I begin, naturally enough, with the former.

The nucleus of every English message is an ordered pair, containing an *object* and a *condition*:

```elm
type alias Nucleus =
    ( Object, Condition )
```

For example, and using some very crude representations of objects and conditions for now:

```elm
( Victor, love Grannie )
    -> "Victor loves Grannie."

( Grannie, live at Cockroach Lane )
    -> "Grannie lives at Cockroach Lane."
```

There should be nothing very surprising here. The object/condition distinction at the level of the message corresponds exactly to the familiar subject/predicate distinction at the level of the sentence. In this respect, my theory is positively boring.

Every plain English message, I submit, affirms the present satisfaction of the condition by the object, and is encoded in a sentence containing either the base form or the first finite form of the verb (or one of the first finite forms, in the case of **`"be"`**). (The decision between these forms depends straightforwardly on the object, and encodes no additional information.) This constitutes the first principle in my theory of tense for English. That the present is the default time in the English predication system is suggested by the use of the base form of the verb for such affirmations. Ultimately, however, the evidence for this claim is holistic, and derives from the success and simplicity of my theory as a whole.

The various (apparently) non-present uses of the base and first finite forms will mostly be handled by my theory of elaborations. One of them, however, can be dealt with right away: its use in conveying apparently "timeless" affirmations concerning mathematical or conceptual affairs. Consider for example the natural interpretations of the following sentences:

```elm
"Two plus two equals four."

"A vixen is a female fox."
```

I diagnose these as plain messages (actually the second is elaborated, but not in such a way as to affect its temporal components; see [section 5.9](#59-indirect-enumerated-and-amassed-messages)). Consequently I insist that they are indeed affirmations about the present. It is simply that sensible readers *ignore* this temporal information, knowing full well that it is irrelevant.

The alternative to this refreshingly straightforward account is to posit a class of *genuinely* timeless affirmations in English, which are encoded (ambiguously) into the very same sentences that encode their corresponding present affirmations. But this surprisingly popular view is needlessly complicated, and not supported by the data. Why introduce a whole new class of message, and a whole new subroutine to encode it, when we can simply use the resources already in place? The question is intended to be rhetorical; but in any case, the fact that the output sentences are identical indicates fairly clearly that we *didn't* do this.

That the present is the default option within the English system perhaps explains why we use it in talking about abstract matters for which time is irrelevant. (Though I dare say this would have been the obvious choice anyway.) More significantly, it might help to explain the attraction to the view that such messages really are timeless, an attraction that appears to have been widely felt, in spite of the entirely unnecessary computational complexity that this hypothesis implies. It is easier to ignore information that simply comes by default, than to ignore information that needs to be actively selected.

Conditions break down further into a *pivot* and a (possibly empty) list of *balances*. Pivots consist of a *verbality* optionally followed by a *status*, and balances comprise a *weight* optionally prefixed with a *relator*. Thus:

```elm
type alias Condition =
    ( Pivot, List Balance )

type alias Pivot =
    ( Verbality, Maybe Status )

type alias Balance =
    ( Maybe Relator, Weight )
```

It remains to see what objects, verbalities, statuses, relators, and weights are. Before going into the details, however, some examples should help start us off with an approximate idea:

<table>
  <tr>
    <th>Object</th>
    <th colspan="4">Condition</th>
  </tr>
  <tr>
    <th></th>
    <th colspan="2">Pivot</th>
    <th colspan="2">Balance 1</th>
    <th colspan="2">Balance 2</th>
  </tr>
  <tr>
    <th></th>
    <th>Verbality</th>
    <th>Status</th>
    <th>Relator</th>
    <th>Weight</th>
    <th>Relator</th>
    <th>Weight</th>
  </tr>
  <tr>
    <td>I</td>
    <td>am</td>
    <td>happy</td>
    <td>for</td>
    <td>you.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>I</td>
    <td>am singing.</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>I</td>
    <td>am giving</td>
    <td>-</td>
    <td>-</td>
    <td>it</td>
    <td>to</td>
    <td>her.</td>
  </tr>
  <tr>
    <td>She</td>
    <td>is</td>
    <td>out</td>
    <td>with</td>
    <td>Fred.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>They</td>
    <td>look</td>
    <td>up</td>
    <td>to</td>
    <td>her.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>We</td>
    <td>like</td>
    <td>-</td>
    <td>-</td>
    <td>them.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>They</td>
    <td>live</td>
    <td>-</td>
    <td>in</td>
    <td>France.</td>
    <td></td>
    <td></td>
  </tr>
</table>

As these examples illustrate, every nucleus must have at least an object and a verbality. Many conditions, however, include statuses and one or more balances as well. We will examine the nucleus from the outside in, looking at objects and balances first, before delving deeper into the pivot that holds these two sides together.

### 4.1. Objects and Balances

There are three types of objects available in English, each of which comes in either singular or plural (represented in my model by a boolean argument, `False` for singular and `True` for plural):

```elm
type Object
    = Speaker Bool
    | Hearer Bool
    | Other Bool (Maybe Sex) (Maybe String)

type Sex
    = Male
    | Female
```

The `Speaker` and `Hearer` objects are encoded in the first and second person pronouns respectively. By default, the `Other` object is encoded in the third person pronouns (I trust the influence of the optional `Sex` argument here is self-explanatory). However, English also has room for an optional string argument in this case, a proper name that overwrites the default pronoun. There is no restriction in the English code on what can count as a proper name; the only rule is that it should begin with a capital letter.

(For readers unfamiliar with this style of programming, a `Maybe x` variable can take one of two values: `Nothing` or `Just x`. The `Nothing` value acts like the `null` value used in some other programming languages. The difference is that, in languages that allow `null` as a value, *any* variable can take that value, making every value effectively optional. In Elm, as in Haskell, optional variables must be explicitly defined as such with `Maybe`.)

When referring to objects in what follows, I will adopt the following abbreviating conventions. Rather than write `Speaker False` and `Speaker True`, I will write `Speaker` and `Speakers` respectively; similarly for `Hearer(s)` and `Other(s)`. When the optional sex and string arguments are not present, meanwhile, I will simply omit them, instead of explicitly writing `Nothing`. And when they are present, I will write them on their own, as `Male` or `Female` instead of `Just Male` or `Just Female`. Finally, when the sex variable is present, I will not bother to write `Other` in front of it. For example:

| Abbreviation       | Full Meaning                                 |
| ------------------ | -------------------------------------------- |
| `Speaker`          | `Speaker False`                              |
| `Hearers`          | `Hearer True`                                |
| `Male`             | `Other False (Just Male) Nothing`            |
| `Female "Grannie"` | `Other False (Just Female) (Just "Grannie")` |
| `Others`           | `Other True Nothing Nothing`                 |

I hope these conventions are all intuitive and easy to understand. The point of adopting them is to make the examples that follow easier on all of us.

A balance consists of a *weight*, optionally preceeded by a *relator*:

```elm
type alias Balance =
    ( Maybe Relator, Weight )

type Relator
    = About
    | Above
    | After
    | Against
    | At
    | Before
    | Behind
    ...

type Weight
    = SameAsMain
    | Different Object
```

Relators are encoded in prepositions. There are 31 relators in my model at present (I didn't bother listing them all above). This list is incomplete, but it accounts for many common prepositions. Relators will reappear in the context of pivots; see [section 4.2](#42-pivots). Weights, meanwhile, are essentially just objects like the main object of the nucleus, with the added possibility that they may refer back to the main object itself (in which case they generate the third direct form of the pronoun, `"myself"`, `"yourself"`, `"themselves"`, etc.) For clarity, I will distinguish where necessary the *main* object of the nucleus from any *balancing* objects in the list of balances.

Some more abbreviating conventions relating to balances: Whenever a relator is absent, I will omit it, rather than explicitly writing `Nothing`; and when it is present, I will write it on its own, as e.g. `Against` instead of `Just Against`. When the weight is not the same as the main object, I will not bother explictly writing `Different`, but write the object on its own (abbreviated as before). And finally, when a balance contains only a weight (i.e. no relator), I will drop the brackets around it. For example:

| Abbreviation                  | Full Meaning                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `Others`                      | `( Nothing, Just (Different (Other True Nothing Nothing)) )`                   |
| `( Behind, Hearer )`          | `( Just Behind, Just (Different (Hearer False)) )`                             |
| `( For, SameAsMain )`         | `( Just For, Just SameAsMain )`                                                |
| `( With, Female "Grannie" )`  | `( Just With, Just (Different (Other False (Just Female) (Just "Grannie"))) )` |

If it wasn't clear before, I trust this table illustrates the benefits of conventions like these. I adopt them not just to save space, but to make my examples easier to read and understand. Brackets and `Just`s and `False`s all over the place are necessary for compilers, but for human readers they very often serve to obscure more than to illuminate.

Objects are always encoded in either pronouns or proper names. Nouns and noun phrases - `"water"`, `"some water"`, `"a glass of water"`, `"that glass of water"`, `"her glass of water"`, etc. - are accounted for by my theory of elaborations. The elaborations responsible for these things will not be introduced until the very end of [section 5](#5-the-theory-part-22-the-elaborations), after I have introduced all of the other elaborations in my model. (There is no particlar reason for this; it is simply that something has to come last.) In the meantime, I will want to make use of examples that are not restricted to just pronouns and proper names. To this end, I will start out by misrepresenting nouns and noun phrases as proper names, refering to objects like `Other "water"` or `Other "a glass of water"`. The fudge is harmless in the contexts in which I use it (where what matters are the other elaborations under scrutiny, not the elaborations responsible for the nouns or noun phrases), and the proper analysis of these things will be given in [section 5.9](#59-indirect-enumerated-and-amassed-messages).

### 4.2. Pivots

At the heart of the nucleus is the pivot, which breaks down further into a *verbality* and an optional *status*:

```elm
type alias Pivot =
    ( Verbality, Maybe Status )

type Verbality
    = Be Bool
    | Do String Bool Bool

type Status
    = Absolute String
    | Relative Relator
```

Statuses, first of all, are of two kinds, either `Absolute` or `Relative`. `Absolute` statuses are *properties*, encoded in adjectives (`"happy"`, `"hilarious"`, `"hungry"`, etc.). My model does not currently contain any properties or adjectives, however, and consequently the `Absolute` value simply takes a string argument. What this means is that users are obliged to encode their properties for themselves, inputting the resulting adjective directly into the system. I call values for which this is the case *unearthed* variables; as we will see, there are a few such unearthed variables in my model. I will say something more general about this in [section 4.3](#43-limitations) below. `Relative` statuses are for relators, which are encoded in prepositions (`"at"`, `"by"`, `"in"`, `"with"`, etc.). We already met these in [section 4.1](#41-objects-and-balances).

Going back to the start of the pivot, we have the verbality, which determines the choice of verb at the start of the predicate. It can take one of two values:

```elm
type Verbality
    = Be Bool
    | Do String Bool Bool
```

The `Be` verbality, unsurprisingly, triggers selection of the verb **`"be"`**, with the form of this verb being determined by the main object of the nucleus, according to the following schema:

| Object      | Form    |
| ----------- | ------- |
| `Speaker`   | `"am"`  |
| `Other`     | `"is"`  |
| *otherwise* | `"are"` |

The boolean argument this pivot takes indicates whether or not the condition as a whole is *ongoing*; when set to true, this introduces the participle form `"being"` immediately after the finite form as determined by the object. It underlies the difference between, for example, `"He is silly"` and `"He is being silly"`. (The adjective `"silly"`, in these examples, comes from the status variable.)

If there is an English condition comprising nothing other than the `Be` verbality (i.e. a pivot with no status, and an empty list of balances), then it is the condition of existence; as in the standard translation of Descartes' famous claim, `"I think, therefore I am"`. For what it's worth, I myself find it hard to interpret sentences like `"I am"` or `"They are"` as encoding existential claims. Such semi-sentences seem to me to demand the response, *are what?* And so I am tempted to say that there is no English condition comprising the `Be` verbality on its own, and that the proper translation of Descartes is `"... therefore I exist"`. But my intuition is not shared by all English speakers, and I needn't insist on the point.

At any rate, there are certainly plenty of English conditions made up of the `Be` verbality together with a status. When the status is `Absolute` (i.e. a property), the condition is that of having that property:

```elm
( Speaker, Be, "hungry" )
    -> "I am hungry."

( Hearer, Be, "silly" )
    -> "He is silly."

( Others, Be, "beautiful" )
    -> "They are beautiful."
```

When the status is relative (i.e. a relator), the condition is that of being in a certain *standing*. For example:

```elm
( Speaker, Be, Out )
    -> "I am out."

( Female "Grannie", Be, Up )
    -> "Grannie is up."

( Speakers, Be, Over )
    -> "We are over."
```

To be clear, I am adopting some more abbreviating conventions here. To being with, I do not bother with brackets around either the condition or its underlying pivot, since there is no possibility of confusion, and including them would therefore make things longer and harder to read for no reason. And when the list of balances is empty (as in all the examples above) I omit it, instead of explicitly writing `[]`. When the *ongoing* boolean argument to the `Be` verbality is `False` (as above), I likewise omit it; when it is `True`, I will write it as `Ongoing` instead, so that readers don't have to remember what its purpose is. With statuses, finally, I will omit them when they are absent (instead of explicitly writing `Nothing`), and just write the crucial value when they are present, since there is again no possibility of confusion. Thus I write `"hungry"` instead of `Just (Absolute "hungry")`, or `Out` instead of `Just (Relative Out)`.

Not every condition involving the `Be` verbality can be made ongoing. It is only those for which some intelligible distinction can be made. `"I am being up"`, for example, is not a sentence of English, presumably because there is no way in which its interpretation might differ from that of `"I am up"`. In contrast, `"He is being silly"` is perfectly fine, and marks an important informational difference from `"He is silly"`. The former conveys something about his present behaviour, while the latter conveys something about his present character.

The `Do` verbality is responsible for all other English verbs. As with properties and adjectives, however, my model does not currently include any of these options itself. For now users are obliged - except in the special case of `Be` - to encode the core of their verbalities for themselves. My system generates the appropriate *form* of the verb for your message, but you need to supply the verb yourself (in its base form, e.g. `"eat"`, `"dance"`, `"live"`). The form is then determined by the object: the first finite form in the case of the `Other` object singular, and the base form otherwise.

Following the string argument of the `Do` verbality, there is a boolean argument representing whether or not the condition in question is *ongoing*, exactly as it does with the `Be` verbality; this underlies the difference between, for example, `"She lives"` and `"She is living"`. The second boolean argument, not available for the `Be` verbality, indicates whether or not the condition as a whole is *passive*; this accounts for the difference between, for example, `"She eats"` or `"She is eating"` on the one hand, and `"She is eaten"` or `"She is being eaten"` on the other.

Some `Do` verbalities (though not many) can pair up with properties, much like the `Be` verbality; for example:

```elm
( Female, Do "seem", "hungry" )
    -> "She seems hungry."

( Others, Do "look", "serious" )
    -> "They look serious."

( Female "Grannie", Do "become" Ongoing, "ridiculous" )
    -> "Grannie is becoming ridiculous."
```

Rather more `Do` verbalities can pair up with relators; for example:

```elm
( Male, Do "go" Ongoing, Out )
    -> "He is going out."

( Hearer, Do "look" Ongoing, Down )
    -> "You are looking down."

( Female "Grannie", Do "fall" Ongoing, Over )
    -> "Grannie is falling over."
```

Many `Do` verbalities, as we will see in a moment, support balances as well. In general, there is little to say about the semantics of `Do` verbalities. They are considerably varied. There are tens of thousands of them, and the study of them is an enormous subject in its own right (not attempted here).

One thing to say in general is that the satisfaction of some conditions with `Do` verbalities necessarily *takes time*, and that for this reason the `Ongoing` flag is typically called for when these verbalities occur in unelaborated messages: `"They are eating out"` rather than `"They eat out"`. The latter sentence has a perfectly sound interpretation (concerning their general eating habits), but it is an elaborated message; see [section 5.3](#53-conservative-regular-extended-and-scattered-messages).

There is a degree of fluidity between `Be` verbalities and `Do` verbalities when the latter are either ongoing or passive. For example, the message encoded as `"It is interesting"` could be the result either of the `Be` verbality followed by a property encoded as `"interesting"`, or of the `Do "interest" Ongoing` verablity. Similarly, `"It is allowed"` could be the result either of the `Be` verbality followed by a property encoded as `"allowed"`, or of the `Do "allow" Passive` verablity. I suggest it doesn't much matter which analysis we opt for. Since my model only allows for one status following the verbality, however, a sentence like `"They are allowed in"` can only be the result of a passive `Do` verablity; the status generates the preposition `"in"`, and so `"allowed"` must be coming directly from the verbality in this case.

When the `Be` verbality is paired with a status, typically no balances are required to make a complete condition. In some cases, however, with a suitable status, a balance can also be included:

```elm
( Male, Be, Out [ ( With, Male "Robert" ) ] )
    -> "He is out with Robert."

( Speakers, Be, "happy", [ ( For, Hearers ) ] )
    -> "We are happy for you."
```

When the `Be` verbality has no subsequent status, one possibility is to balance out the pivot with another object, the overall result being an identity claim:

```elm
( Speaker, Be, [ Male "Victor" ] )
    -> "I am Victor."
```

Another possibility is to balance it out with an object prefixed with the `Like` relator, the overall result being a similarity claim. Such balances are also common with the `Do` verbalities that (like the `Be` verbality) can be paired with properties:

```elm
( Speaker, Be, [ ( Like, Male "Victor" ) ] )
    -> "I am like Victor."

( Hearer, Do "sound", [ ( Like, Female ) ] )
    -> "You sound like her."

( Female, Do "look", [ ( Like, Hearer ) ] )
    -> "She looks like you."
```

Balances of all kinds are common with other `Do` verbalities:

```elm
( Male "Victor", Do "love", [ Female "Grannie" ] )
    -> "Victor loves Grannie."

( Female "Grannie", Do "live", [ ( At, Other "Cockroach Lane" ) ] )
    -> "Grannie lives at Cockroach Lane."

( Female "Grannie", Do "live", [ ( At, Other "Cockroach Lane" ), ( With, Female "Susan" ) ] )
    -> "Grannie lives at Cockroach Lane with Susan."
```

### 4.3. Limitations

It should go without saying that my theory is incomplete, a work in progress that stands in need of significant expansion and refinement. My theory of plain messages in particular - more specifically my theory of English *conditions* - is the most strikingly incomplete aspect of the whole. My aim in this section is to get out in front of any criticisms on this score, by acknowledging the most egregious of these inadequacies, and explaining why I am in no great hurry to address them. The main point, by way of headline, is that I am more interested in the theory of elaborations, and I expect that any philosophers who are likely to take an interest in my work will share this bias. My theory of plain messages is not intended to make any very great headway into that field, then, but rather to provide just enough to serve as the basis for my main project, the theory of elaborations.

There are two immediately obvious inadequacies, namely that my theory does not cover all of the ground (there are sentences that it cannot account for), and that, even in the ground that it does cover, it leaves some things unearthed (the properties and verbalities that users are currently obliged to encode for themselves). Both of these inadequacies are relatively untroubling. If you'll excuse the change of metaphor, neither of them indicates that I am on the wrong track; they merely remined us that - of course - I have yet to reach the end of that track. While I am here, I may add that precisely the same limitations apply to my theory of elaborations too: there are many elaborate messages that my system cannot encode, and with the ones that it does encode, it still relies on users encoding certain unearthed variables for themselves.

In developing my theory in the future, I will naturally want to dig up some of the presently unearthed variables. In some cases, however, I will be in no great hurry to do so. It seems to me that there is nothing particularly puzzling or intriguing, from a theoretical point of view, about properties and the way in which they are encoded into adjectives, and uncovering this variable would simply be a matter of giving my system an enormous dictionary. The same is true of what I call *categories* (which are encoded into nouns), another unearthed variable that we will meet in my theory of elaborations ([section 5.9](#59-indirect-enumerated-and-amassed-messages)). And the same is mostly true of verbalities, except that in their case unearthing would be necessary for the implementation of any validation checks on conditions (see the end of this section).

Regarding the uncovered ground, here are two simple sentences that my theory is not yet able to account for:

```elm
"I am here."

"She likes singing."
```

For what it's worth, my current thinking is that there are in English at least two other kinds of weights aside from objects: places and conditions. These, I suggest, would respectively account for the two sentences above. (Sentences like `"She likes to sing"` are dealt with by my theory of elaborations; see [section 5.5](#55-primary-displaced-messages).) But there will always be more to do, and one has to pause somewhere along the way. (I presume that `"somewhere"`, incidentally, would be the result of elaborating a message with a place variable in its underlying condition; my model doesn't predict the uses of this word yet either.) I am also unable to generate compound prepositional phrases like `"in front of"` or `"on top of"`.

More worrying still is that there are ambiguities I am unable to account for. This is particularly regrettable, because the ability to account for ambiguities is precisely one of the main selling points of my approach as a whole. In my defence, I can account for several ambiguities with my theory of elaborations (as we will see), and that, as I advertised above, is where my main interests lie. There are some ambiguities, however, that need to be accounted for by the theory of plain messages, and my model is not yet able to do this. The ambiguities in question concern how balances fit into the overall condition, informational differences that are not captured when we represent balances simply as a list. For example:

```elm
"He is looking at Grannie with Victor."
```

This sentence is ambiguous: is he with Victor, looking at Grannie, or is Grannie with Victor, both being looked at by him? There must be two distinct conditions here, and consequently two distinct messages, both of which fetch up in the same English sentence. But I have no way of representing the difference. On my model as it stands, I have room only for one message to correspond to this sentence:

```elm
( Male, Do "look" Ongoing, [ ( At, Female "Grannie" ), ( With, Male "Victor" ) ] )
```

Evidently, then, there is more to a condition than just a pivot and a bare *list* of balances. To understand a condition fully, one must also appreciate how each individual balance relates to the pivot. Sometimes that relation is signalled explicitly by the relator (`"He gave the book to her"`), and sometimes it is signalled implicitly by the order of the balances (`"He gave her the book"`). But sometimes - as in the ambiguous example just now - there is yet more information that goes unsignalled. But representing this information in my model of messages is a problem for another day.

(A tentative suggestion: Perhaps the definition of a weight needs to be made recursive, allowing for balances within weights. The representation above, then, would be of the message in which he is with Victor, both of them looking at Grannie. The message where Victor is with Grannie instead would involve a balance within a weight: `( At, ( Female "Grannie", ( With, Male "Victor" ) ) )`. In plainer terms, the difference would be between *looking at-Grannie with-Victor* (two separate balances) and *looking at Grannie-with-Victor* (one balance, with another balance inside it). With balances being encoded in order, and sub-balances before the next balance at the same level in the list, it is easy to see how the ambiguity in the sentence would then arise.)

Finally, perhaps the most striking weakness in my theory of plain messages is that it currently predicts far too much. This is because my model makes *no attempt whatsoever* to validate input conditions. In constructing balances, users are allowed to combine any relator with any object; while in constructing the condition itself, they may combine any status with any verablity, and then append any list of balances whatsoever. As a result it is possible - let me not mince words - to generate *complete and utter nonsense* within my system. For instance:

```elm
( Male "Victor", Do "love", At, [ ( Behind, Female "Grannie" ) ] )
    -> "Victor loves at behind Grannie."

( Female "Grannie", Do "live", [ Speaker, Hearer, ( Over, SameObject ) ] )
    -> "Grannie lives me you over herself."

( Female "Grannie", Be, "red", [ Speakers ] )
    -> "Grannie is red us."

( Others, Do "taste", "heavy", [ Hearer, ( With, Other ) ] )
    -> "They taste heavy you with it."
```

Obviously this is a very serious inadequacy, and I make no attempt to shy away from this fact. I am not, however, in any great hurry to develop my theory further in this direction, and to write in constraints on what counts as a valid condition. This is for two reasons. First, the task is quite simply an enormous one, requiring the collation of tens of thousands of verbalities, noting - just for starters - what statuses each of these can be paired with, and what sort of balances the ensuing pivots can support. It is not a task for one person alone. Secondly, although I by no means wish to belittle the value of this endeavour, my own interests currently lie elsewhere, in the theory of English elaborations. I offer this crude theory of plain messages predominantly just so that I have a basis on which to build this latter theory. And I am anticipating that my critics will share this bias, and therefore show me some leniency with regard to my rough and ready model of conditions.

## 5. The Theory, part 2/2: The Elaborations

The idea of a message elaboration is itself nothing new; philosophers and logicians will recognise it as a propositional operator by another name. I avoid this more familiar terminology partly in deference to Dudman (the "nucleus"/"elaboration" terminology is his), and partly to avoid unwanted connotations from the last hundred years or so of semantic and logical enquiry. While there is a degree of overlap, the elaborations that I posit are in general rather different from the kinds of operators philosophers are familiar with. And this, in turn, is because my approach is so different. Always my aim is to explain the sentences that English speakers produce, rather than to capture the logical entailments of English messages in any formal system.

Since elaborations are so central to my theory, I adopt the convention of writing them in ALLCAPS, so as to render them easily distinguishable from the other aspects of my system. There are currently 11 elaborations posited by my model. This list is no doubt incomplete, but it represents - or so I hope - a substantial start. Though it will not make much sense up front, here is the full type definition for messages (details of the individual elaborations to follow):

```elm
type Message
    = Plain Nucleus
    | NEGATIVE Message
    | PAST (Maybe Time) Message
    | PRIOR Message
    | DISPLACED Displacer Message
    | PREORDAINED (Maybe Displacer) (Maybe Time) Message
    | REGULAR (Maybe Displacer) (Maybe Frequency) Message
    | EXTENDED Duration Message
    | SCATTERED Tally Message
    | INDIRECT Int Description Message
    | ENUMERATED Int Multiplicity Message
    | AMASSED Int Proportion Message
```

The definition is of course recursive, reflecting the fact that the elaborations can all be applied on top of each other, presumptively without limit or restriction. In fact there are some combinations that English rules inadmissible, but not many (details as we come to them below). Rather than write a more convoluted type definition that makes these combinations impossible, I have instead written some validation checks into the encoding function itself (see the `Messages` module). The function returns an error in cases of such invalid input.

The elaborations that I posit all have what I call *global scope*, but *local influence*. By this I mean that they all operate on messages as a whole (global scope), but that their semantic effect invariably applies only to one particular component of the message (local influence): sometimes the object, sometimes the condition, sometimes an extra-nuclear argument introduced by a previous elaboration, in a few cases the time of the condition's satisfaction, and in one case the satisfaction itself. I will refer to this as the *target* of the elaboration. It is an interesting question whether English has elaborating devices that are local in scope as well as influence. I should not like to say with any certainty that it does not; the hypothesis, it seems to me, certainly merits further investigation.

However that may be, I insist that the elaborations I have diagnosed thus far really do have global scope, notwithstanding their local influence. There are two main reasons for this. First, one and the same elaboration may affect a *different* component of its input message, depending on how that message has been elaborated previously. Where I have one globally scoped elaboration with varying local influence, therefore, the alternative would not only require *multiple* locally scoped elaborations, but also a suite of additional validation rules restricting the use of these elaborations. Secondly, the order in which elaborations are applied is typically a matter of considerable semantic significance, even when the elaborations target separate parts of the message. A `PAST INDIRECT` message, for example, is importantly distinct from its corresponding `INDIRECT PAST` message (see [section 5.9](#59-indirect-enumerated-and-amassed-messages) below). If we treat these elaborations as having local scope, we lose the ability to represent the order in which they are applied. It would of course be perfectly possible to find some other way to represent this order. But again, that would introduce more complexity into the system. Overall, a model with globally scoped elaborations is simpler, covering the same ground with less convoluted machinery.

### 5.1. PAST and PRIOR Messages

A plain English message, recall, affirms the present satisfaction of the condition by the object. I explain talk of past or future satisfactions with my theory of elaborations. The nature of these elaborations, and the way in which they interact, is one of the most intriguing features of the English code. The semantic results can be extremely complex and sophisticated, but it is all acheived - at least if my theory is correct - through the coordination of devices that are themselves beautifully simple. I can take only a fraction of the credit here: though I fancy I have made some improvements to his model, a number of central insights are all taken over directly from Dudman.

Things need to be introduced in manageable chunks. I will begin, in this section, with a look at the `PAST` and `PRIOR` elaborations, which make talk about the past possible. Here are the relevant parts of the type definitions:

```elm
type Message
    = ...
    | PAST (Maybe String) Message
    | PRIOR Message
    | ...
```

The syntactic effect of the `PAST` elaboration is to replace the base or first finite form of the main verb with its corresponding *second* finite form (or, in the case of **`"be"`**, with *one* of its second finite forms, the form in question being determined by the object). Its semantic effect, meanwhile, is to indicate that something is past, something that would otherwise - by default - be present. What that something is, as we shall see, varies from case to case. Typically, however, and at any rate in the case of plain messages, what it changes is the time of the condition's satisfaction by the object. For example:

```elm
PAST ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie left me."

PAST "last year" ( Others, ( Do "go", [ To, Other "America" ] ) )
    -> "They went to America last year."
```

(To be clear, I adopt another abbreviating convention here and hereafter: I do not bother to write `Plain` in front of the nucleus.) The optional string argument is intended to encodes the time of the condition's satisfaction with more precision. At present, this argument is another unearthed variable, that users are obliged to encode for themselves.

Going by its grammatical effect, the `PRIOR` elaboration is easily distinguished from the `PAST` elaboration. Where the latter swaps the base or first finite form of the main verb for its second finite form, the former swaps it for the corresponding form of the verb **`"have"`**, followed by the second participle form of the original verb:

```elm
PRIOR ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie has left me."

PRIOR ( Others, ( Do "go", [ To, Other "America" ] ) )
    -> "They have gone to America."
```

Grammarians standardly call this the "perfect". While its effect on the sentence is easy to see, it is harder to say what the underlying informational trigger is, and in particular how exactly this trigger differs from the `PAST` elaboration, to which it bears a very obvious resemblance. (It is surely no coincidence that the second finite form and the second participle form are identical for all regular verbs.)

One difference, immediately visible in my type definition for messages, is that the `PRIOR` elaboration does not take an additional *time* argument. In support of this, note that `"They have gone to America last year"` is not a sentence of English. Admittedly one can say, for example, `"I have eaten this morning"`. However, one can only say this while it is still morning, when `"this morning"` consequently signals the present rather than the past; as it does in, for instance, `"I am hungry this morning"`. One can also say things like, `"They have already been to America"`, but `"already"` here cannot be the result of an additional argument to the `PRIOR` elaboration, since it also arises without that elaboration (`"They already left for America"`). In both cases, therefore, the additional words - `"this morning"` and `"already"` - cannot be owing to any additional argument to the `PRIOR` elaboration itself. My model does not yet account for these words, but my assumption is that they will each be accounted for by an additional elaboration.

(To get a little ahead of myself, and somewhat speculatively, perhaps we need a `PRESENT` elaboration whose sole purpose is to allow for the introduction of a more detailed or explicit specification of the present time of the condition's satisfaction. It would need to be incompatible with the `PAST` elaboration, of course, but not with the `PRIOR` elaboration. And then perhaps we need a - let's say - `PREVIOUS` elaboration, responsible for the introduction of the adverb `"already"`. This would of course be incompatible with `PRESENT` or plain messages, but a common companion of the `PAST` and `PRIOR` elaborations alike.)

A second difference between the `PAST` and `PRIOR` elaborations is that, where the former merely indicates that something is past, the latter indicates that something is past *with respect to something else*. Hence my choice of terminology: what is past is simply past, but what is prior is prior *to* something. More specifically, when applied to a plain message, the `PRIOR` elaboration doesn't *directly* produce a message concerning the past satisfaction of its underlying condition; rather, it produces a *new* condition, one whose satisfaction (at any given point in time) entails the satisfaction of the underlying condition *prior* to that point. This, I take it, explains why it cannot take an additional time argument in the same way that the `PAST` elaboration does.

By default, of course, the satisfaction of any condition is present. And so by default a `PRIOR` message affirms the present satisfaction of its `PRIOR` condition. Thus, while `PAST` plain messages and `PRIOR` plain messages are alike in affirming the past satisfaction of their underlying conditions, they do this in different ways. The `PAST` elaboration does this directly, but the `PRIOR` elaboration does it indirectly, via affirming the present satisfaction of a new condition that in turn entails the prior satisfaction of the underlying one. (If my parenthetical speculation a moment ago is right, then this would explain why the `PRIOR` elaboration, unlike the `PAST` elaboration, is consistent with the hypothesised `PRESENT` elaboration.)

The `PAST` and `PRIOR` elaborations by themselves are wonderfully simple. The `PAST` elaboration, moreover, operates on `PRIOR` messages in just the same way that it operates on plain ones. The `PRIOR` elaboration, after all, just modifies the condition, so there is nothing else for the `PAST` elaboration to do except locate the otherwise present satisfaction of this condition in the past. Thus we have the so-called "past perfect", which I refer to as a `PAST PRIOR`:

```elm
PAST PRIOR ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie had left me."  -- But now, perhaps, she has returned.
```

Things start to get rather more interesting, however, when the `PRIOR` elaboration is applied on top of the `PAST` elaboration. For in this case, it does not result in the generation of a new condition. Rather, the `PRIOR` elaboration now locates the satisfaction of the underlying condition *directly* at some point prior to the already past point of satisfaction set up by the `PAST` elaboration. The overall effect is what grammarians call the "past past tense", but which I call the `PRIOR PAST`. Compare:

```elm
PAST "when you arrived" (PRIOR ( Speaker, ( Do "see", [ Male ] ) ))
    -> "I had [already] seen him when you arrived."

PRIOR (PAST "an hour before you arrived" ( Speaker, ( Do "see", [ Male ] ) ))
    -> "I had seen him an hour before you arrived."
```

Note that, in the second example, `"an hour before you arrived"` serves to encode the time at which I *saw* him; whereas in the first, `"when you arrived"` encodes the time at which I *had* (already) seen him. In further confirmation of the claim that the second sentence does not encode a `PAST PRIOR` message, notice that `"I have seen him an hour before you arrived"` - like `"They have been to America last year"` - is not a sentence of English.

### 5.2. Conservative PREORDAINED Messages

At this juncture one might expect me to introduce a `FUTURE` elaboration, as a direct analogue to the `PAST` elaboration, whose purpose is to locate the time of the underlying condition's satisfaction in the future. Talk about the future in English, however, is a more complicated affair than talk about the present or the past, and there is in my view no such straightforwardly symmetric elaboration. The `PREORDAINED` elaboration, which I will start to examine in this section, is the closest thing to a `FUTURE` elaboration in my system. If anything, however, it has a closer symmetry with the `PRIOR` than with the `PAST` elaboration, inasmuch as it locates the satisfaction of a condition as future *with respect to some other point*. It typically does this, moreover, by generating a new condition. But there is yet more to this elaboration, that outstrips anything observed in the `PRIOR` elaboration, as we will see.

Here are the relevant parts of my type definitions for now:

```elm
type Message
    = ...
    | PREORDAINED (Maybe Displacer) (Maybe String) Message
    | ...

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
```

The `PREORDAINED` elaboration comes in three different varieties, depending on whether it has no displacer, a `Primary` displacer (i.e. a pivot), or a `Secondary` displacer (i.e. a modality). Here are examples of each of these varieties:

```elm
PREORDAINED "tomorrow" ( Others, Do "get" Ongoing, "married" )
    -> "They are getting married tomorrow."

PREORDAINED ( Do "go" Ongoing ) "tomorrow" ( Others, Do "get", "married" )
    -> "They are going to get married tomorrow."

PREORDAINED Yes1 ( Others, Do "get", "married" )
    -> "They will get married tomorrow."
```

The optional string argument - much like with the `PAST` elaboration - encodes the time of the underlying condition's expected or imagined satisfaction. (In this one respect, at least, the `PREORDAINED` elaboration is more like the `PAST` than the `PRIOR` elaboration.)

I will refer to these three different varieties of `PREORDAINED` messages as *conservative*, *primary*, and *secondary* respectively. As we will see, this is not the only English elaboration to admit of this trichotomy. Displacers, both primary and secondary, raise all sorts of further questions best tackled later on, when I have explained more of the rest of my theory. After one more remark about the elaboration in general, I will restrict my attention in the remainder of this section to conservative `PREORDAINED` messages.

The `PREORDAINED` elaboration is one of two English elaborations related to the broad notion of *expectation* (we will meet the other in [section 5.3](#53-conservative-regular-extended-and-scattered-messages)). Expectations are (as I will term it) either *coloured* or *uncoloured*, and in the former case - hence the choice of metaphor - there is a whole spectrum of possibilities. This distinction will become clearer as we proceed, and as we see it played out in the various cases. Let me start by saying that uncoloured expectations are *disinterested*. Paradigmatically, they concern inaminate objects, and they concern animate creatures only insofar as their actions can be impartially predicted. Coloured expectations, in contrast, are exclusively related to the actions of intentional agents - notably human beings, but by extention some other animals - who have plans and goals and habits, and whose behaviour may be judged (and characters informed) by moral and other standards. The variety of colours reflects the variety of notions in this area: intentions, wishes, hopes, plans, promises, etc. on the one hand; and morals, manners, practicalities, etc. on the other.

With displacers, as we will see later, many colours are possible. With conservative `PREORDAINED` messages, however, there is only one colour, namely the notion of a (man-made) *prearrangement*. For example:

```elm
PREORDAINED "tomorrow" ( Speaker, Be, "busy" )
    -> "I am busy tomorrow."

PREORDAINED "next month" ( Others, Do "get" Ongoing, "married" )
    -> "They are getting married next month."

PREORDAINED "at dawn" ( Speakers, Do "attack" )
    -> "We attack at dawn."
```

Uncoloured conservative `PREORDAINED` messages are also possible. In this case "predetermination" is the more appropriate term. For instance:

```elm
PREORDAINED "tomorrow" ( Other, ( Be, [ Other "Tuesday" ] ) )
    -> "It is Tuesday tomorrow."

PREORDAINED "at 7.05pm tomorrow" ( Other "the sun", ( Do "set" ) )
    -> "The sun sets at 7.05pm tomorrow."
```

(I am here treating `"the sun"` as a proper name, because I have not yet explained the part of my model that allows us to generate it as a definite description; recall my general warning about this in [section 4.1](#41-objects-and-balances). I will do this sort of thing several more times until [section 5.9](#59-indirect-enumerated-and-amassed-messages), when I explain the elaborations responsible for nouns and noun phrases. I will not bother with this proviso again.)

With the conservative `PREORDAINED` elaboration, there is (I am fairly sure) never any ambiguity as to whether the message is coloured or uncoloured; invariably there is only ever one plausible interpretation. However that may be, I diagnose the phenomenon of colouring as *pragmatic* rather than semantic. In other words, colour (or the lack of it) is certainly an aspect of the overall information conveyed in an English exchange, but it is not information that is anywhere consulted in the generation of the sentence. Consequently it does not feature as an informational ingredient of my messages.

It is important to be clear that these are all claims about *present* prearrangements or predeterminations. While conservative `PREORDAINED` messages are about the future, therefore, they are about the future only *indirectly*. First and foremost, they are about the *present*: present prearrangements or predeterminations *for* the future. In this respect, as I have already advertised, the `PREORDAINED` elaboration is much more like the `PRIOR` elaboration than it is like the `PAST` elaboration. It locates something as future *with respect to something else*, typically via the generation of a new condition (for the cases in which it does this without generating a new condition, see [section 5.8](#58-secondary-preordained-and-regular-messages)). And just as it is possible to have `PAST PRIOR` messages, it is also possible to have conservative `PAST PREORDAINED` messages, which are claims about *past* prearrangements or predeterminations that are, by implication, no longer present:

```elm
PAST (PREORDAINED "next month" ( Others, ( Do "get" Ongoing, "married" ) ))
    -> "They were getting married next month."  -- but there was a problem with the venue and it's had to be postponed

PAST (PREORDAINED "at 7.05pm tomorrow" ( Other "the sun", ( Do "set" ) ))
    -> "The sun set at 7.05pm tomorrow."  -- but then an asteroid knocked us into a new orbit
```

For that matter, we can also have conservative `PRIOR PAST PREORDAINED` messages:

```elm
PRIOR (PAST (PREORDAINED "tomorrow" ( Speaker, ( Be, "busy" ) )))
    -> "I had been busy tomorrow."  -- before I heard of the accident, but then I cleared my schedule
```

With this in mind, let me stress that the optional time argument needn't specify a time in the future; the constraint is rather that it must specify a time that is *later* than the time of the prearrangment or predetermination. Thus we find conservative `PAST PREORDAINED` messages (and conservative `PRIOR PAST PREORDAINED` messages) for which the time specified is itself past:

```elm
PAST (PREORDAINED "yesterday" ( Speaker, ( Be, "busy" ) ))
    -> "I was busy yesterday."  -- but then I changed my plans

PRIOR (PAST (PREORDAINED "yesterday" ( Speaker, ( Be, "busy" ) )))
    -> "I had been busy yesterday."  -- before I heard of the accident ...
```

So far I have been emphasising the symmetry between the `PRIOR` and the `PREORDAINED` elaborations, but there are asymmetries as well. First, the new condition generated by the `PRIOR` elaboration (when it does generate a new condition) entails the *actual* prior satisfaction of its underlying condition. The message as a whole is true only if the underlying condition was in fact satisfied at that prior time. The new condition generated by the conservative `PREORDAINED` elaboration, however, does *not* entail the actual satisfaction of its underlying condition at the later time. Rather, it entails - as I have been saying - the existence of some prearrangement or predetermination to that effect. But plans, as we all know, can change, and it may be perfectly true that someone is getting married next month, even if she later calls it off (at which point it will still be true that she *was* getting married next month). With predeterminations, there is room for metaphysical debate: some would argue that, if an asteroid hits tonight and moves us into a new orbit, then the sun never set at 7.05pm tomorrow after all. But however that may be, English allows us - if we want it - the facility to communicate on the assumption that predeterminations can also change, saying for instance that the sun *did* set at 7.05pm tomorrow, even though it no longer *does*. It is not for semantics to settle this metaphysical dispute.

The second asymmetry is syntactic rather than semantic. The conservative `PREORDAINED` elaboration, unlike the `PRIOR` elaboration, has the curious feature of being *invisible*. By this I mean that it has, in and of itself, no impact on the output sentence. The optional time argument, it is true, shows up in an adverbial expression at the end of the predicate, and the optional displacer argument to be examined in due course also has a visible effect. But the conservative elaboration itself leaves no mark (where the `PRIOR` elaboration, of course, replaces the main verb with the corresponding form of the verb **`"have"`** followed by the second participle form of the original verb). As we will see in the next section, the conservative `PREORDAINED` elaboration is not the only one to be invisible in this sense. And the existence of invisible elaborations, as you might well expect, is one very considerable source of ambiguity: from the sentence alone, it may be unclear which invisible elaborations (if any) have been applied, and moreover which order they have been applied in.

More on that in the next section. In the meantime, let me end this section by accounting for a couple of comparatively straightforward ambiguities arising from the `PAST` and conservative `PREORDAINED` elaborations alone, in virtue of the latter's invisibility. First, when the optional time argument is absent from a conservative `PREORDAINED` elaboration, it simply cannot be deduced from the sentence whether the elaboration has been applied or not. Thus the sentence `"They are getting married"` admits of a plain interpretation (they are at the altar as we speak) as well as a conservative `PREORDAINED` one (they are engaged to be married):

```elm
( Others, ( Do "get" Ongoing, "married" ) )
    -> "They are getting married."

PREORDAINED ( Others, ( Do "get" Ongoing, "married" ) )
    -> "They are getting married."
```

The same is true of `"They were getting married"`, which arises from subjecting either of the messages above to the `PAST` elaboration (as it might be, they were at the altar and are now wed; or, they were engaged but have now split).

Secondly, the sentence `"They were getting married yesterday"` supports (at least) *three* distinct interpretations. The first is a direct claim about the past, about what they got up to yesterday. The second is a claim about yesterday's plans: that the couple were then engaged to be wed at some unspecified point in the future. The third, finally, is a claim about past plans *for* yesterday: that at some point in the past (unspecified) the happy day was scheduled for yesterday. The point, in a nutshell, is that the sentence does not reveal whether the word `"yesterday"` is coming from the `PAST` elaboration or the `PREORDAINED` one (if the `PREORDAINED` elaboration has been applied at all, that is). I represent the three messages here as follows:

```elm
PAST "yesterday" ( Others, ( Do "get" Ongoing, "married" ) )
    -> "They were getting married yesterday."

PAST "yesterday" (PREORDAINED ( Others, ( Do "get" Ongoing, "married" ) ))
    -> "They were getting married yesterday."

PAST (PREORDAINED "yesterday" ( Others, ( Do "get" Ongoing, "married" ) ))
    -> "They were getting married yesterday."
```

When both elaborations include a time argument, the one for the outermost argument shows up at the end of the sentence, and there is no ambiguity:

```elm
PAST "last month" (PREORDAINED "yesterday" ( Others, ( Do "get" Ongoing, "married" ) ))
    -> "They were getting married yesterday last month."
```

In this case, it would be more natural to bring the output of the outermost time argument to the front of the sentence:

```elm
"Last month, they were getting married yesterday."
```

My model is not yet able to generate sentences like these, however, and rigidly insists on placing the outputs of all time arguments at the end of the sentence.

### 5.3. Conservative REGULAR, EXTENDED, and SCATTERED Messages

Closely related to the `PREORDAINED` elaboration is the `REGULAR` elaboration, which likewise takes an optional displacer argument, and is the second of the two elaborations to concern expectations, and consequently to open the door to the phenomenon of colouring. As with the `PREORDAINED` elaboration, I divide the three varieties of the `REGULAR` elaboration into *conservative* (with no displacer), *primary* (with a primary displacer, i.e. a pivot), and *secondary* (with a secondary displacer, i.e. a modality). As in the previous section, I will start by restricting my attention to the conservative case.

The conservative `REGULAR` elaboration is also like the conservative `PREORDAINED` elaboration in being invisible. This is a trait these elaborations share with two more: the `EXTENDED` and `SCATTERED` elaborations. Having taken my time in introducing the conservative `PREORDAINED` elaboration, I will now pick up the pace a little, and examine these other three elaborations at once. The relevant part of type definition is as follows:

```elm
type Message
    = ...
    | REGULAR (Maybe Displacer) (Maybe String) Message
    | EXTENDED String Message
    | SCATTERED String Message
    | ...
```

The conservative `REGULAR` elaboration generates a new condition whose satisfaction entails the *general* satisfaction of its input condition, with the unearthed string argument optionally encoding the *frequency* of that generality. The coloured uses of the conservative `REGULAR` elaboration concern the habits of such creatures as are capable of forming them:

```elm
REGULAR "often" ( Female "Grannie", ( Do "eat", Out ) )
    -> "Grannie often eats out."

REGULAR "occasionally" ( Male "Victor", ( Do "laugh", [ ( At, Female "Grannie" ) ] ) )
    -> "Victor occasionally laughs at Grannie."
```

Its uncoloured uses, meanwhile, concern the typical or predictable behaviour of inanimate objects under certain conditions:

```elm
REGULAR ( Other "salt", ( Do "dissolve", [ ( In, Other "water" ) ] ) )
    -> "Salt dissolves in water."
```

As with the conservative `PREORDAINED` elaboration, the possibility of colouring in the conservative `REGULAR` elaboration does not appear to give rise to any ambiguity (there is only ever one plausible interpretation); but if it did it would call for a pragmatic rather than a semantic treatment. Colour (or the lack of it) is not an ingredient of the message, but a part of what is communicated over and above the information encoded in the sentence.

The `SCATTERED` elaboration likewise generates a new condition whose satisfaction entails multiple satisfactions of its underlying condition. Rather than convey nomological apprehensions, however, these messages affirm nothing more than the brute multiplicity. The unearthed string argument encodes the *tally*, i.e. the total number of separate satisfactions (not necessarily with any great precision, as in the second example below):

```elm
PAST "last week" (SCATTERED "twice" ( Female "Grannie", ( Do "eat", Out ) ))
    -> "Grannie ate out twice last week."

PAST "in 1986" (SCATTERED "several times" ( Male "Victor", ( Do "laugh", [ ( At, Female "Grannie" ) ] ) ))
    -> "Victor laughed at Grannie several times in 1986."
```

`SCATTERED` elaborations are not discovered in the wild unless they have been subjected to some further elaboration - such as the `PAST` elaboration in the examples above - that prevents them from amounting to claims about multiple *present* satisfactions. This is for the obvious reason that multiple satisfactions simply take too long. It needn't be the `PAST` elaboration that does it; the `PREORDAINED` elaboration also works:

```elm
PREORDAINED "tomorrow" (SCATTERED "twice" ( Speakers, ( Do "attack" ) ))
    -> "We attack twice tomorrow."  -- once at dawn, and then again from the other side an hour later
```

The same is true, and for the very same reason, of `EXTENDED` messages, which result in a new condition whose satisfaction entails the satisfaction of its input condition during a certain period of time, with the unearthed string argument encoding the *duration* of that period:

```elm
PAST "yesterday" (EXTENDED "for an hour" ( Male, ( Do "see", [ Female ] ) ))
    -> "He saw her for an hour yesterday."

PREORDAINED "tomorrow" (EXTENDED "for an hour" ( Male, ( Do "see" Ongoing, [ Female ] ) ))
    -> "He is seeing her for an hour tomorrow."
```

There appears to be very little overlap between tallies, frequencies, and durations. One exception to this rule springs to mind, however: `"always"` can encode both a frequency and a duration. For example:

```elm
REGULAR "always" ( Do "smile", [ At, Male ] )
    -> "She always smiles at him."

PAST (EXTENDED "always" ( Male, ( Do "like", [ Female ] ) ))
    -> "He always liked her."
```

A good deal of ambiguity arises from the interaction of the four invisible elaborations. Consider, for example, the sentence:

```elm
"He walked to work for a week."
```

Among the several interpretations of this sentence we find (i) a `PAST EXTENDED REGULAR` message, according to which he was briefly in the habit (for one week only) of walking to work; (ii) a `PAST EXTENDED` message, according to which he once took a whole week to walk to work; and (iii) a `PAST REGULAR EXTENDED` message, according to which he used to be in the habit of taking a whole week to walk to work.

And then we have this seemingly straightforward sentence:

```elm
"The film started at 8pm."
```

By my count, this string is accessible to no fewer than *five* distinct interpretations: (i) a simple claim about when the film started (a `PAST` message); (ii) a claim about when it was scheduled to start (a `PAST PREORDAINED` message); (iii) a claim about when showings of used to start (a `PAST REGULAR` message); (iv) a claim about when showings of it used to be scheduled to start (a `PAST PREORDAINED REGULAR` message); and (v) a claim about the time at which the management, when drawing up their plans, generally scheduled showings of it to start (a `PAST REGULAR PREORDAINED` message). (It may be hard to envisage a use for this last message. To aid your imaginations, suppose the management had to fix the timetable anew each morning, and typically ended up placing the film in question in the 8 o'clock slot. This in contrast to the more likely fourth interpretation, in which they settle once and for all on a regular 8 o'clock position.)

I could go on, but hopefully these two examples suffice to illustrate the general point. With invisible elaborations, there is frequently nothing in the sentence that indicates the order in which they have been applied, or even - if their optional arguments are missing, or if the outputs of those arguments could have come from somewhere else - whether or not they have been applied at all. For the record, though I will not argue the point here, I defy anyone to come up with a satisfactory syntactic or pragmatic account of any of these ambiguities. It is only by embracing the code breaker's methodology, by modelling the semantic function from message to sentence rather than the other way around, that we can explain these various phenomena.

### 5.4. NEGATIVE Messages

The chief puzzle facing any theory of negation in English is posed by the related ambiguities discovered, for example, in the following two sentences:

```elm
"Claire does not drink."

"I was not busy all day."
```

In the first case, the speaker might be maintaining that Claire is tee-totalled, or might instead be denying that she is an alcoholic. The latter reading is consistent with Claire enjoying a drink now and then, while the former is not. In the second case, the speaker might be affirming that she was free all day yesterday, or might rather be rejecting the claim that she was occupied all day. The latter interpretation is consistent with her having been busy at some point in the day, while the former is not. In sum, the first interpretation of each sentence is a positive message about something internally negative, whereas the second is a negative message about something internally positive. (The possibility of these two kinds of negation is also why double negation isn't always vacuous: `"Claire doesn't not drink"`, for example, can be used perfectly intelligibly to deny that she is tee-totalled.)

My model posits a `NEGATIVE` elaboration, which has the effect, in general, of converting an affirmative message into its corresponding denial. In most cases - we will meet the exceptions in [section 5.7](#57-secondary-displaced-messages), [section 5.8](#58-secondary-preordained-and-regular-messages), and [section 5.9](#59-indirect-enumerated-and-amassed-messages) - this amounts to the creation of a new condition, whose satisfaction entails the non-satisfaction of its input condition (the *complement* of the input condition, in other words). The difference between the pairs of messages noted above is accounted for by the *order* in which this elaboration is applied, relative to the other elaborations in the message (the conservative `REGULAR` and `EXTENDED` elaborations respectively). In the second of each pair, the `NEGATIVE` elaboration is the outermost one, whereas in the first of each pair it is closer to the nucleus, with the other elaboration being applied on top of it. The conservative `REGULAR NEGATIVE` interpretation of the first sentence affirms that Claire is in the habit of abstaining from drink, while the corresponding conservative `NEGATIVE REGULAR` denies that she is in the habit of drinking. The `EXTENDED NEGATIVE` interpretation of the second sentence, similarly, affirms that the speaker was free all day, while its `NEGATIVE EXTENDED` counterpart denies that the speaker was busy all day.

Analagous ambiguities arise through the interaction of the `NEGATIVE` elaboration with the conservative `PREORDAINED` and `SCATTERED` elaborations: `"I am not seeing him tomorrow"` may be taken as a denial of any present plan to that effect (a `NEGATIVE PREORDAINED` message), or as an affirmation of a present plan to avoid him (a `PREORDAINED NEGATIVE` message); `"Grannie did not fall down fifteen times yesterday"` may be said as a precursor to insisting that she took only fourteen tumbles that day (a `NEGATIVE SCATTERED` message), or as a claim that, though she may have faltered fifteen times, on none of those occasions did she ultimately fall (a `SCATTERED NEGATIVE` message).

Yet more ambiguities arise from the possibility of throwing the `NEGATIVE` elaboration in with more than one invisible elaboration. I will illustrate with just one example:

```elm
"Victor did not see Grannie for two hours."
```

Brace yourselves. This sentence encodes, among others: (i) a `PAST NEGATIVE EXTENDED` message (he saw her, but for an hour and a half at most); (ii) a `PAST EXTENDED NEGATIVE` message (for two whole hours, he didn't see her); (iii) a `PAST REGULAR NEGATIVE EXTENDED` message (he was formerly in the habit of avoiding her for two hours at a time); (iv) a `PAST NEGATIVE REGULAR EXTENDED` message (he wasn't formally in the habit of seeing her for two hours at a time); (v) a `PAST EXTENDED REGULAR NEGATIVE` message (his habit of avoiding her lasted a mere two hours); (vi) a `PAST NEGATIVE EXTENDED REGULAR` message (his habit of seeing her lasted more than two hours); (vii) a `PAST NEGATIVE PREORDAINED EXTENDED` message (there was no plan to see her for two hours; perhaps the plan was to see her for only one hour); (viii) a `PAST PREORDAINED EXTENDED NEGATIVE` message (the plan was to avoid her for two hours); (ix) a `PAST EXTENDED PREORDAINED NEGATIVE` message (for two hours, there was a short-lived plan to avoid her). I'll stop here, but by now it should be clear that these by no means exhaust the possibilities.

Admittedly some of the interpretations just given of this sentence will seem implausible; and some of its other interpretations (not listed) will seem outright bizarre. Nevertheless I maintain that they are all perfectly legitimate from a grammatical point of view. If any of them are in any sense ruled out, it can only be because they are weird or pointless, not because they are ungrammatical. Change the nucleus, meanwhile, or some of the surrounding arguments (durations, frequencies, tallies, and so on), and different sequences of elaborations leap to mind as plausible or likely. I see no reason to suppose that some combinations of these elaborations are intrinsically problematic. In any case, it is undeniable that there are many ambiguities like these in English, and it may be noted how effortlessly my theory is able to predict and explain them all. As with those highlighted in the previous section, I defy anyone to account for them satisfactorily in syntactic or pragmatic terms.

Before moving on, let us take stock of a few things. Most of the elaborations we have seen so far (and in the contexts in which we have seen them) generate new conditions. The only exceptions are the `PAST` elaboration, and the `PRIOR` elaboration when it is applied on top of the `PAST` elaboration, which target the time of the condition's satisfaction instead. (The `PREORDAINED`, `REGULAR`, and `NEGATIVE` elaborations don't always target the condition either, but we have yet to see the contexts in which they don't.) With the generation of new conditions, meanwhile, the order in which elaborations are applied is almost always significant: a `REGULAR NEGATIVE` message is not the same as its corresponding `NEGATIVE REGULAR`, and so on.

There is, as far as I can see, only one exception to this general rule: a `PRIOR NEGATIVE` is no different from its corresponding `NEGATIVE PRIOR`. The sentence, `"He has not eaten"` can be generated by applying these elaborations in either order, but that does not reflect any ambiguity. There is no discernible difference between being in a state of having not eaten, and not being in a state of having eaten. The same is true of `PAST NEGATIVE` messages and `NEGATIVE PAST` messages. This is perhaps less surprising, however, since the `PAST` elaboration targets a completely separate part of the message. Indeed, the order in which the `PAST` elaboration is applied relative to *any* of the other elaborations examined so far makes no difference whatsoever to the overall message. As a matter of convention, I will always represent it has having been applied *as late as possible* in the overall message. This means that it is typically the outermost elaboration, except when it has been made `PRIOR`, or subjected to one of the other elaborations for which the order does matter.

### 5.5. Interlude: Against the Future Tense Hypothesis

The time has almost come to examine the uses of the *displacer* variable, an optional argument for the `PREORDAINED` and `REGULAR` elaborations discussed above, and also a compulsory argument for the `DISPLACED` elaboration, which we have yet to meet. Let me start by repeating (and expanding) the relevant type definitions:

```elm
type Message
    = ...
    | DISPLACED Displacer Message
    | PREORDAINED (Maybe Displacer) (Maybe Time) Message
    | REGULAR (Maybe Displacer) (Maybe Frequency) Message
    | ...

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
```

Thus far, our examples have been limited to sentences with just one verb phrase, and no modal. The displacer variable, and these three elaborations that make room for it, account for the generation of sentences with modals or more than one verb phrase. The point of the label, to be clear, is that this variable *displaces* the pivot in the nucleus of the message. Just to give a quick taste of the sorts of things we'll be dealing with:

```elm
"She is happy to see him."

"She is hoping to see him."

"She is going to see him."

"It is going to rain."

"It is about to rain."

"It is likely to rain."

"It seems likely to rain."

"He seems to be upset."

"He must be upset."

"He might be upset."

"He will be upset."

"Victor tends to tease Grannie."

"Victor likes to tease Grannie."

"Grannie wants to eat out."

...
```

I will tackle the data here in two stages, starting with primary displacers (i.e. pivots, responsible for additional verb phrases) in [section 5.6](#56-primary-displaced-preordained-and-regular-messages), and moving on to secondary displacers (i.e. modalities, which are encoded in the English modals) in [section 5.7](#57-secondary-displaced-messages) and [section 5.8](#58-secondary-preordained-and-regular-messages).

First, however, I want to briefly call into question a long-standing and very popular view: that `"will"` is a marker of the future tense. On this hypothesis, the natural interpretations of the following three sentences differ only in the time of the condition's satisfaction by the object:

```elm
"It will be sunny in Paris tomorrow."

"It is sunny in Paris at the moment."

"It was sunny in Paris yesterday."
```

In the context of the theory I have been outlining, this hypothesis would be captured by positing a `FUTURE` elaboration exactly symmetrical to the `PAST` elaboration, and responsible for the first sentence above (just as the `PAST` elaboration is responsible for the last).

There are several reasons for rejecting this hypothesis. I have promised to be brief, so I will mention just three. First, `"will"` is not only found in sentences encoding messages about the future. On the contrary, all three times are available:

```elm
"It will be sunny in Paris tomorrow."

"It will be sunny in Paris at the moment."

"It will have been sunny in Paris yesterday."
```

As a first stab, what these messages seem to have in common is that they reflect the speaker's *best guess* in the absence of concrete observation. The speaker in Paris, looking up at the sky, may opine that it *is* sunny; but the speaker in London, armed only with knowledge of the time of year and the general way of these things, will more likely venture the judgement that it *will be* sunny there. The claim that it will be sunny in Paris *tomorrow*, meanwhile, is surely much more like the Londoner's guess than the Parisian's report. We make use of the same words to convey it, and we say such things - necessarily - in the absence of observational confirmation.

Secondly, the behaviour of `"will"` in reported speech is difficult to square with the future tense hypothesis. Having said on Monday that it *is* sunny in Paris, I may be correctly reported on Tuesday as having said that it *was* sunny yesterday. This is to be expected, since the `PAST` elaboration does nothing but change the time of the condition's satisfaction. But having said on Wednesday that it *will be* sunny in Paris tomorrow, the correct report on Thursday is that I said it *would be* sunny in Paris today. If my claim on Wednesday was the result of a `FUTURE` elaboration that merely located the condition's satisfaction in the future, the correct report on Thursday should be that I said it *is* sunny in Paris today. But that is plainly *not* what I said. Following on from the first point above, *that* sounds like an observational report, whereas what I affirmed on Wednesday was not based on a magical observation of the future; it was my best guess given the epistemic circumstances. (What reported speech suggests is the hypothesis that `"will be"` encodes something like a *present* guess, where `"would be"` encodes the corresponding *past* guess. On my view, this is indeed exactly the case.)

Thirdly, wherever `"will"` shows up encoding a claim about the future, it is one option among many, the other options being - in the first instance - precisely the other modals:

```elm
"It will be sunny in Paris tomorrow."

"It may be sunny in Paris tomorrow."

"It ought to be sunny in Paris tomorrow."

"It needn't be sunny in Paris tomorrow."

...
```

To the mind of a codebreaker, these examples show fairly clearly that `"will"` does not encode futurity, any more than `"may"`, `"ought"`, or `"need"` do. Rather it encodes something on a par with what these other modals encode, and the fact that the messages here are about about the future is to be explained by something else entirely.

I said that the other modals are the alternatives only in the first instance. In the second instance, we have the primary displacers as well:

```elm
"It is going to be sunny in Paris tomorrow."

"It has to be sunny in Paris tomorrow."

"It is likely to be sunny in Paris tomorrow."

...
```

With all of this in mind, perhaps the simplest, most forceful objection to the future tense hypothesis is that it is hopelessly specific, positing one whole elaboration to account for *just one* of the uses of *just one* of the English modals, which in turn are the result of *just one* of the two kinds of displacers.

There is plenty more that could be said here, but this is not the place to pursue the argument in depth. Rather, this is the place to present my alternative hypothesis, which I believe is vastly more promising. Debates about the relative merits of the two proposals (and indeed of any other proposals intended to accommodate the same data) can then be pursued elsewhere.

### 5.6. Primary DISPLACED, PREORDAINED, and REGULAR Messages

Consider again the examples listed at the start of the previous section, though now with those including a modal removed:

```elm
"She is happy to see him."

"She is hoping to see him."

"She is going to see him."

"It is going to rain."

"It is about to rain."

"It is likely to rain."

"It seems likely to rain."

"He seems to be upset."

"Victor tends to tease Grannie."

"Victor likes to tease Grannie."

"Grannie wants to eat out."

...
```

The first thing to note here is that the `"to"` in these sentences is not used in the sense of `"in order to"`. We can also say things like, `"He went out to go to the shops"`, but the message here is that he went out *in order to* go to the shops. Sentences like these, I suggest, must be the result of an altogether different elaboration, which I do not yet have in my model. That elaboration, whatever it is, introduces the *second* of the two verb phrases, elaborating the simpler message that he went out. It introduces this verb phrase, moreover, at the very end of the sentence, even after the result of any balances (as in, `"He went out with her to go to the shops"`). The primary `DISPLACED` elaboration, in contrast, and the `PREORDAINED` and `REGULAR` elaborations when they too have a primary displacer, introduce the *first* of the two verb phrases: `"He seems to be upset"` encodes an elaboration of the plain message encoded as `"He is upset"`.

The next thing to note is that not every pivot can act as a primary displacer in this way. `"It is red to rain"` is not a sentence of English, for example. And while `"He sings to laugh"` has an interpretation, the interpretation is that he sings *in order to* laugh; the `Do "sing"` pivot cannot be used as a primary displacer. In fact the vast majority of pivots cannot be used as primary displacers, and it would be far simpler to list the ones that can than the ones that can't. However, since more research is necessary before I can venture anything like a complete list, I have for the time being simply allowed *any* pivot to act in this role. Consequently it is possible, in my system, to generate nonsense strings like `"It is red to rain"`. This is a hole that will have to be plugged at a later date.

The English code-breaker faces a number of intriguing puzzles, among them how to account for the two strikingly different uses of the `"be going to"` construction, as illustrated in the following pair of sentences:

```elm
"She is going to France."

"She is going to leave."
```

It is possible, of course, that `"be going to"` is simply inherently ambiguous, the result of two completely distinct ideas. But that would be a most disappointing discovery. The scientific mind abhors coincidence, and thirsts for a deeper account, for some more general principles that might predict the two different uses without appealing to brute, lexical ambiguity.

The first of these sentences is ambiguous between a plain reading (she is en route as we speak) and a conservative `PREORDAINED` reading (the plans have been made). Thus, to be clear:

```elm
( Female, Do "go" Ongoing, [ To, Other "France" ] )
    -> "She is going to France."

PREORDAINED ( Female, Do "go" Ongoing, [ To, Other "France" ] )
    -> "She is going to France."  -- e.g. next month
```

Either way, this is what we might call the *basic* use of `"be going to"`; it simply arises from the `Do "go" Ongoing` verablity, and encodes the idea of going in the literal sense of moving from one place to another. Notice that neither of these messages can include any specification of the time at which she arrives. `"She is going to France tomorrow"` only has a `PREORDAINED` interpretation, and `"tomorrow"` here serves to encode the time at which she laves, not the time at which she gets there. Thus, while the idea of going somewhere naturally invites thoughts of a later arrival, the verbality itself cannot support any specification of that later time.

These two messages do not contain any displacer. The `"be going to"`, in both cases, is coming directly from the nucleus. It is when this phrase is introduced by a displacer that things start to get interesting. Consider the following sentence:

```elm
"She is going to see him."
```

There are now three relevant interpretations. On the first, she is on the way to see him as we speak. On the second, there is a prearrangement in place for her to go and see him at some unspecified time in the future. These two messages correspond exactly to the two just examined, the second being a conservative `PREORDAINED` version of the first. But there is now also a third interpretation, unlike any we have seen before, according to which she herself needn't be going anywhere. On this reading, her seeing him in the future is expected, but it might perfectly well be because he is coming to see her.

I diagnose the first of these three interpretations - she is on the way to his location as we speak - as a (merely) `DISPLACED` message. Thus:

```elm
DISPLACED ( Do "go" Ongoing ) ( Female, Do "see", [ Male ] )
    -> "She is going to see him."
```

The `DISPLACED` elaboration, when introducing a primary displacer, has the effect of modifying the underlying condition. The displacer itself contributes to the message just what it would contribute were it directly in the nucleus. Going to see him, in this sense, is no different from going to France, except of course for the different endpoint of the journey.

The second of the three interpretations is a conservative `PREORDAINED DISPLACED` message, simply the conservative `PREORDAINED` version of the first:

```elm
PREORDAINED (DISPLACED ( Do "go" Ongoing ) ( Female, Do "see", [ Male ] ))
    -> "She is going to see him."
```

There is nothing unusual here. What the first interpretation alleges to be happening right now, the second alleges to be prearranged for some later time. This is exactly the way of conservative `PREORDAINED` messages in general.

The interesting case is the third interpretation, which I diagnose, not as a `PREORDAINED DISPLACED` message, but rather as primary `PREORDAINED` message, i.e. the result of the `PREORDAINED` elaboration with a primary displacer:

```elm
PREORDAINED ( Do "go" Ongoing ) ( Female, Do "see", [ Male ] )
    -> "She is going to see him."
```

The difference between the second and third interpretations is that, where the former applies the idea of prearrangement to the previously displaced condition, the latter builds the displacer into the idea of the prearrangement itself. The result is a prearrangement with the metaphorical character of a journey: the plans being what they are, she is currently "on the way" to a state of affairs in which the two of them meet. This is consistent with him being the one who will do the actual moving.

We have been considering an example of prearrangement. But the `PREORDAINED` elaboration with the `Do "go" Ongoing` pivot admits of uncoloured uses as well, just like the conservative `PREORDAINED` elaboration. `"It is going to rain"`, for example, conveys nothing about any prearrangements, but rather concerns present predeterminations for the future. The fact that the coloured/uncoloured distinction applies in both cases, and in exactly the same way, is additional evidence that what we have here is the work of just one elaboration.

The `DISPLACED` elaboration takes no arguments besides the displacer and the underlying message. In particular, it takes no additional argument specifying the time of the underlying condition's satisfaction. The sentence, `"She is going to see him tomorrow"`, for example, has two interpretations, a conservative `PREORDAINED DISPLACED` message and a primary `PREORDAINED` message. Either way, however, `"tomorrow"` can only be coming from the `PREORDAINED` elaboration. Just as the condition of *going to France* cannot include any specification of the time of arrival, so the more elaborate `DISPLACED` condition of *going to see him* cannot include any specification of the time of the meeting.

This point is helpful in distinguishing primary `DISPLACED` messages from primary `PREORDAINED` messages. All `PREORDAINED` messages necessarily concern a later satisfaction of the underlying condition. With primary `DISPLACED` messages, some do and some do not. Even when they do, however, there is a simple test to see whether a primary displacer has come from the `DISPLACED` elaboration or the `PREORDAINED` elaboration: consider whether the message can include a specification of the time of the underlying condition's satisfaction. For example, one might have thought that `"It is about to rain"`, like `"It is going to rain"`, comes from the `PREORDAINED` elaboration. I submit that it comes only from the `DISPLACED` elaboration, however, since - unlike the latter - no specification of *when* it rains is possible. `"It is about to rain in five minutes"` is not English. Nor is this anything to do with the immediacy conveyed by `"about to"`; `"It is about to rain in one second"` is no less permissible.

I said that, with primary `DISPLACED` messages, some concern a later satisfaction of the underlying condition and some do not. That is not a very satisfactory general remark. I submit that they concern the present satisfaction of the underlying condition by default, and concern its later satisfaction only if the nature of the displacer forces this upon us. The `Do "go" Ongoing` and `( Be, About )` displacers *do* force this upon us. But many other primary displacers do not, as we will see in a moment. That the present is the default chimes with my corresponding proposal for plain messages, and with the use of the base form for encoding any displaced pivots following the displacer.

The primary displacer `( Be, "likely" )` shows up in both `DISPLACED` and `PREORDAINED` messages, which explains an ambiguity in the sentences thereby produced, which can be taken to concern either the present or the future:

```elm
DISPLACED ( Be, "likely" ) ( Male, ( Be, [ In, Other "Spain" ] ) )
    -> "He is likely to be in Spain."  -- right now

PREORDAINED ( Be, "likely" ) ( Male, ( Be, [ In, Other "Spain" ] ) )
    -> "He is likely to be in Spain."  -- next week
```

In keeping with the general principle just proposed (that `DISPLACED` messages concern the *present* satisfaction of the underlying condition by default), the first of these messages must concern the likelihood that he is in Spain at the point of speech. In the second of these messages, the claim is not that there are plans for next week's likelihood to be high, but that the plans are such that the *present* likelihood is high. The likelihood itself is not preordained; rather, the likelihood and the idea of preordainment work together to say something jointly about the prospect of his being in Spain next week. This is exactly analogous to the difference, examined above, between `PREORDAINED (DISPLACED (Do "go" Ongoing))` messages and `PREORDAINED (Do "go" Ongoing)` messages.

The very same occurs with displacers concerning intentional attitudes that can be directed either at the present or the future. For example:

```elm
DISPLACED ( Do "want" ) ( Speaker, Do "live", [ In, Other "Portugal" ] )
    -> "I want to live in Portugal."  -- right now

PREORDAINED ( Do "want" ) ( Speaker, Do "live", [ In, Other "Portugal" ] )
    -> "I want to live in Portugal."  -- when I retire
```

In the second of these messages, it is not that I plan now to have, when I retire, a desire to live in Portugal. Rather, I have a desire now to live there when I retire. Again, the wanting and the idea of preordainment combine to form a desire for something future. In this way, we see once again that the two uses of `"be going to"` are part of a more general pattern, an eminently more satisfying explanation than one that simply resorts to lexical ambiguity.

Having seen some examples of the difference between primary `DISPLACED` and primary `PREORDAINED` messages, the idea of primary `REGULAR` messages should now be relatively easy to introduce. It seems to me there are not many primary displacers that can be used with the `REGULAR` elaboration. Here are examples of the most obvious:

```
REGULAR ( Do "like" ) ( Male "Victor", Do "tease", [ Other "Grannie" ] )
    -> "Victor likes to tease Grannie."

REGULAR (Do "tend" ) ( Male "Victor", Do "tease", [ Other "Grannie" ] )
    -> "Victor tends to tease Grannie."

PAST (REGULAR (Do "use" ) ( Male "Victor", Do "tease", [ Other "Grannie" ] ))
    -> "Victor used to tease Grannie."
```

In the second of these examples, it is hard to think of an equivalent message in which the optional frequency argument is also present. The frequency seems already to be covered (albeit vaguely) by the primary displacer. The third example represents a very curious puzzle that I confess I have not yet been able to solve. Why does this construction only occur in the past? What relationship does this use of `"use"` have with the other more literal one? Perhaps none; but as with the two uses of `"be going to"`, that would be a most disappointing admission. Perhaps the way in which the `REGULAR` elaboration deploys its displacer argument can form the basis of a more satisfying account.

Messages with a primary displacer can of course be made `PAST` or `PRIOR` (or both) in all the usual ways, giving rise to sentences like, `"It was about to rain"`, `"He has had to leave"`, or `"I had hoped to see you"`. The `DISPLACED` elaboration can also be applied on top of the `PRIOR` elaboration, with predictable results:

```elm
PRIOR ( Male, Do "leave" )
    -> "He has left."

DISPLACED ( Do "seem" ) (PRIOR ( Male, Do "leave" ))
    -> "He seems to have left."
```

Less obviously, I suggest that it can also be applied on top of the `PAST` elaboration, with similar results. That is to say, I suggest that sentences like, `"He seems to have left"` are ambiguous between `DISPLACED PRIOR` interpretations (it seems that he has left) and `DISPLACED PAST` interpretations (it seems that he left). The distinction here reveals itself when we include the optional time argument to the `PAST` elaboration:

```elm
DISPLACED ( Do "seem" ) (PRIOR ( Male, Do "leave" ))
    -> "He seems to have left."

DISPLACED ( Do "seem" ) (PAST "yesterday" ( Male, Do "leave" ))
    -> "He seems to have left yesterday."
```

The second sentence here cannot be the result of a `DISPLACED PRIOR` message, since `PRIOR` messages cannot take an additional time argument; `"He has left yesterday"` is not a sentence of English. That it is a `DISPLACED PAST` message - an elaboration of the message encoded as `"He left yesterday"` - therefore seems the only plausible diagnosis.

### 5.7. Secondary DISPLACED Messages

Where primary displacers are pivots, secondary displacers are *modalities*, which latter ideas are responsible for the selection of a modal. I account for the eight English modals with just six modalities:

```elm
type Modality
    = Yes1    -- "will"
    | Yes2    -- "shall"
    | Yes3    -- "must"/"ought"/"need"
    | Maybe1  -- "may"
    | Maybe3  -- "can"
    | Maybe4  -- "dare"
```

As this type definition indicates, I divide the English modalities into two logical categories, *yes* and *maybe*. This logical distinction will be made clearer as we proceed. Each of these two fundamental types then comes in four different *flavours* (though flavours 2 and 4 each exist in only one of the logical categories). I begin with the examination of modalities in `DISPLACED` messages, turning to their contribution to `PREORDAINED` and `REGULAR` messages in [section 5.8](#58-secondary-preordained-and-regular-messages) below.

In the first instance, secondary `DISPLACED` messages are speculations about matters of present fact. Thus suppose, for example, that we are considering whether or not James knows Claire. There are two possible factual claims here, a plain one and a `NEGATIVE` one, encoded respectively in the following two sentences:

```elm
"James knows Claire."

"James doesn't know Claire."
```

When it comes to *speculations* about this fact, however, there is a third possibility. For where factual questions call for yes/no answers, with speculations there is room also for *maybe*. This affords us our first foothold in the theory of the English modalities, and the likely explanation of the semantic difference underlying the choice between `"will"` and `"may"`. Thus:

```elm
DISPLACED Yes1 ( Male "James", Do "know", [ Female "Claire" ] )
    -> "James will know Claire."

DISPLACED Maybe1 ( Male "James", Do "know", [ Female "Claire" ] )
    -> "James may know Claire."

DISPLACED Maybe1 (NEGATIVE ( Male "James", Do "know", [ Female "Claire" ] ))
    -> "James may not know Claire."

DISPLACED Yes1 (NEGATIVE ( Male "James", Do "know", [ Female "Claire" ] ))
    -> "James will not know Claire."
```

I have diagnosed the second two messages here as `DISPLACED NEGATIVE` messages, but one could equally think of them as `NEGATIVE DISPLACED` messages with the `Yes1` and `Maybe1` modalities reversed; for the contrary of *yes* is *maybe not*, while the contrary of *maybe* is *no* (i.e. *yes* to the corresponding denial). In other words, logically speaking, `NEGATIVE (DISPLACED Yes1) == DISPLACED Maybe1 NEGATIVE`, and `NEGATIVE (DISPLACED Maybe1) == DISPLACED Yes1 NEGATIVE`. (While we are here, it may be noted that this serves as another reason to reject the future tense hypothesis. The contraries of the messages encoded as `"It is/was sunny in Paris today/yesterday"` are encoded as `"It is/was not sunny in Paris today/yesterday"`. But the contrary of the message encoded as `It will be sunny in Paris tomorrow"` is encoded as `"It may not be sunny in Paris tomorrow"`.) When the `NEGATIVE` elaboration is applied on top of the `DISPLACED` elaboration with a secondary displacer, therefore, the result is not a negative condition, but a negative modality.

Following Dudman, I will refer to messages like these as *judgements*, and refer to the modality as the *verdict* of the judgement. Plain messages, recall, affirm the present satisfaction of the condition by the object. We have seen many elaborations that target the condition, and a couple that target the time of its satisfaction. In [section 5.9](#59-indirect-enumerated-and-amassed-messages) we will see some elaborations that target the object. The `DISPLACED` elaboration, in contrast to all of these, targets the *satisfaction* itself: the verdict concerns the (imagined) satisfaction of the condition in circumstances not immediately accessible to the speaker.

Applying the `DISPLACED` elaboration to a plain message generates a judgement concerning the *present* satisfaction of the underlying condition. English also allows for the communication of judgements concerning the *past* satisfaction of the underlying condition. In encoding these, the second finite form of the verb is not a grammatical possibility: we do not say, `"Susan will ate"`, for example. Instead, English deploys its other trick for talking about the past, namely the one used in `PRIOR` messages. For example:

```elm
DISPLACED Yes1 (PAST "this morning" ( Female "Susan", ( Do "eat" ) ))
    -> "Susan will have eaten this morning."

DISPLACED Maybe1 (PAST "this morning" ( Female "Susan", ( Do "eat" ) ))
    -> "Susan may have eaten this morning."
```

The use of `"have"` followed by the second participle form of the verb notwithstanding, I diagnose these as `DISPLACED PAST` messages rather than `DISPLACED PRIOR` messages, for two reasons. First, the grammatical point is that they have room for an additional time argument (encoded here as `"this morning"`) in the same way that `PAST` messages do, and `PRIOR` messages do not. Secondly, the intuitive point is that these seem to be judgements concerning whether or not Susan *ate* this morning, rather than whether or not she *has eaten*. Not that judgements about whether or not she *has eaten* are impossible: on the contrary, these are simply secondary `DISPLACED PRIOR` messages, and in general phrases like `"will have eaten"` are ambiguous between `DISPLACED PAST` and `DISPLACED PRIOR` readings:

```elm
DISPLACED Yes1 (PAST ( Female "Susan", ( Do "eat" ) ))
    -> "Susan will have eaten."  -- at 7 o'clock this morning

DISPLACED Yes1 (PRIOR ( Female "Susan", ( Do "eat" ) ))
    -> "Susan will have eaten."  -- already / by now
```

Just as the difference between `PAST` and `PRIOR` messages is in general a subtle one, in some cases having very little practical import, so the difference between `DISPLACED PAST` and `DISPLACED PRIOR` messages is also very slight. In cases where the difference is negligible, it may be unclear which of the two the speaker has in mind (if she even has one definitely in mind at all). Nevertheless, the ambiguity in general remains. And this, I should add, is precisely what we already observed in section 5.5 regarding the application of the primary `DISPLACED` elaboration on top of the `PAST` and `PRIOR` elaborations.

Secondary `PRIOR DISPLACED` messages do not exist, but secondary `PAST DISPLACED` messages do. I suggest that it is secondary `PAST DISPLACED` messages that are responsible for the following sentences:

```elm
PAST (DISPLACED Yes1 ( Other "James", Do "know", [ Other "Claire" ] ))
    -> "James would know Claire."

PAST (DISPLACED Maybe1 ( Other "James", Do "know", [ Other "Claire" ] ))
    -> "James might know Claire."
```

The diagnosis here is not immediately obvious, but it has a great deal to recommend it. First, it is the most natural explanation of the words used, since `"would"` and `"might"` stand to `"will"` and `"may"` just as `"was"` and `"did"` stand to `"is"` and `"does"`. Put crudely, the sentences here *look like* the result of the `PAST` elaboration applied on top of whatever elaboration introduced `"will"` and `"may"`. This observation by itself wouldn't amount to much if the underlying semantics didn't match up with intuitions or usage, but on consideration it matches up remarkably well. Allow me to switch to another example to make the point:

```elm
DISPLACED Yes1 ( Male "James", Do "know", [ Other "the result of the football" ] )
    -> "James will know the result of the football."

PAST (DISPLACED Yes1 ( Male "James", Do "know", [ Other "the result of the football" ] ))
    -> "James would know the result of the football."
```

The first sentence here encodes a speculation based on *up to the minute* information. It is likely on the lips of someone who may or may not know James very well, but has seen that he has been watching the television in the pub all afternoon. The second sentence, in contrast, encodes a speculation which *waives* such recent information, drawing on more well established evidence. It is likely on the lips of someone who has no idea what James has been up to today, but knows he is an avid fan who rarely misses a game. To make this more precise, let us say that secondary `DISPLACED` messages are made from a certain *standpoint*, which is the time of the latest fact that counts for the speaker as evidence for that judgement. By default, the standpoint of a secondary `DISPLACED` message is present; the `PAST` elaboration changes this default time to the past.

Let us broaden our investigation to include the other flavours of English modality. Consider:

```elm
"James must know the result of the football."

"James ought to know the result of the football."

"James needn't know the result of the football."

"James should know the result of the football."

"James can't know the result of the football."

"James daren't know the result of the football."
```

In general, these sentences all encode judgements concerning the present satisfaction of the underlying condition, on a par with those we have seen already with the `Yes1` and `Maybe1` modalities for verdicts. But the flavour of these verdicts is different. Let us start with the informational triggers behind `"must"` and `"can"`, which have the flavour of *necessity* and *possibility* respectively. To say that James *must* know the result is to convey that he will know it, but rather more emphatically: it is necessary that he knows it, there is no way he could fail to know it.

On the other side, it is a curious fact that `"can"` does not occur in these contexts unless it is negated. (The sentence `"James can know the result of the football"` has an interpretation, but it is not a judgement as to whether or not he does, but a message granting permission to tell him. We will examine these messages in the next section.) I explain this fact as follows. Since the meaning of `"can"` concerns what is possible, James *can* know the result only if he *does*. Consequently the only basis for the `DISPLACED` claim would also be a basis for the simpler and stronger unelaborated claim, which we therefore resort to instead. Saying that James *can't* know the result, however, is very different from saying that he *doesn't*. It is tantamount to saying that the available facts *rule out* the possibility of his knowing. The judgement that James can't know, to be clear, is a `NEGATIVE DISPLACED` claim, not a `DISPLACED NEGATIVE`: its sponsor does not affirm the possibility of James failing to know, but rather denies the possibility of him knowing.

It seems to me that `"must"` stands to `"can"` more or less exactly as `"will"` stands to `"may"`. We have here, I suggest, just one other flavour of modality, with its two logical sides; thus `Yes3` for `"must"` and `Maybe3` for `"can"`. (Why 3 instead of 2? I will explain the reason for this numbering at the end of this section.) In full, then, here are my analyses of these messages:

```elm
DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] )
    -> "James must know the result of the football."

NEGATIVE (DISPLACED Maybe3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
    -> "James can't know the result of the football."
```

While `"James can't know"` encodes a `NEGATIVE DISPLACED` claim, `"James must not know"` encodes a `DISPLACED NEGATIVE`: the latter claim is not that it isn't necessary that he knows, but that it is necessary that he doesn't. Of course, if it is necessary that he doesn't, then it is impossible that he does, and the same logical relationship holds between `Yes3` and `Maybe3` as holds between `Yes1` and `Maybe1`; i.e. `DISPLACED Yes3 NEGATIVE == NEGATIVE (DISPLACED Maybe3)` and `DISPLACED Maybe3 NEGATIVE == NEGATIVE (DISPLACED Yes3)`. Thus `"James can't know"` encodes something logically equivalent to `"James must not know"`. But now, since `"James must not know"` encodes a `DISPLACED NEGATIVE`, we are left wondering how to convey the corresponding `NEGATIVE DISPLACED`. I suggest that it is encoded in the modal `"need"`, which is thus informationally identical to `"must"`:

```elm
NEGATIVE (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
    -> James needn't know the result of the football."
```

This hypothesis has several things to recommend it. First, it is gratifyingly simple, since it does not require us to posit any additional modality responsible exclusively for the modal `"need"`; the one responsible for `"must"` already suffices. Secondly, it explains why the modal `"need"` only ever occurs in `NEGATIVE` messages (`"James need know the result of the football"` is not a sentence of English). Thirdly, and related to these first two points, on this hypothesis we do not need to build any extra constraints into the code. If there was an additional modality responsible for `"need"` but not responsible for `"must"`, then we would have to add in that the latter can never be negated, while the former must always be.

As already noted, `"can"` does not occur in these contexts unless it is negated. I explain this fact with reference to the underlying modality, and the logical point that James *can* know only if he *does*, whereupon the latter becomes the more natural thing to say. The same restriction, however, is not observed with `"could"`: `"James could know"` and `"James couldn't know"` are both equally acceptable. This is not to be explained by supposing that `"could"` encodes a different modality from `"can"`. That hypothesis is most unwelcome, since these are just two forms of the same modal. Much more welcome would be a hypothesis that explained the difference in *temporal* terms, since - to outward appearances at least - `"could"` stands to `"can"` as `"would"` stands to `"will"`, and `"did"` stands to `"does"`. Gratifyingly, just such a hypothesis fares admirably against the data. I propose that `"James could know"` and `"James couldn't know"` are both the results of `PAST DISPLACED` messages, just like `"James would know"` and `"James might know"`:

```elm
PAST (DISPLACED Maybe3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
    -> "James could know the result of the football."

PAST (NEGATIVE (DISPLACED Maybe3 ( Male "James", Do "know", [ Other "the result of the football" ] )))
    -> "James couldn't know the result of the football."
```

The judgement that James *can't* know, like the judgement that he *will* or *may* know, is taken from a present standpoint, based on up to the minute information. Consequently it is the *present* state of the world that the speaker takes to be ruling out this possibility; and that is why, on the other side, he *can* know only if he *does*. There is no parallel obstacle to saying that he *could* know, however, since the sponsor of this judgement is *waiving* present facts. The overall effect is that the possibility in question is felt to be more "distant", because grounded in the past. The speaker is leaving it open that more recent events may render his knowing the result impossible.

With this in mind, let me venture a less visually obvious hypothesis: that `"ought"` stands to `"must"` as `"could"` stands to `"can"`. In other words, `"ought"` is not the result of any additional flavour of modality, but rather the result of applying the `PAST` elaboration to a `DISPLACED` message with the `Yes3` modality; thus:

```elm
PAST (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
    -> "James ought to know the result of the football."
```

That `"ought"` is the result of the `PAST` elaboration is by no means immediately clear, and further evidence for this claim will be given in the next section, when I examine the modal in some other contexts. For now, I offer two things in support of the proposal. First, much like my proposal with regard to the modal `"need"`, it has the merits of simplicity. Not only do we require no further modality to account for the additional modal, we also need no extra validation rules. If `"ought"` was the result of a whole new modality, we should have to add that the modality behind `"must"` cannot be subjected the `PAST` elaboration, while the modality behind `"ought"` has to be. (Well, it has to be if my suggestion that it is caused by the `PAST` elaboration is accepted; otherwise it presumably *can't* be, since there is in any case only one possibility.) Secondly, the semantics seems intuitively to fit: the judgement that James ought to know invokes a more distant kind of necessity than the judgement that he must know; in much the same way as the judgement that he could know invokes a more distant kind of possibility.

If my proposals about `"must"`, `"need"`, and `"ought"` sharing the same underlying modality are right, then the obvious question is why this modality calls for different words when made `NEGATIVE` or `PAST`. I confess I have no very satisfactory answer to this question. I surmise that, as English evolved, three somewhat different ideas converged on the same informational territory, while each of the corresponding words refused to drop out of use. In the end, they settled on dividing up the ground: `"must"` for the unelaborated, `"need"` for the `NEGATIVE`, and `"ought"` for the `PAST`. This leaves one case unaccounted for: the `PAST NEGATIVE`. Should this be handled by `"ought"` or by `"need"`? I submit that it is handled by the latter, and consequently that `"need"` is ambiguous between a merely `NEGATIVE` and a `PAST NEGATIVE` interpretation:

```elm
NEGATIVE (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
    -> "James needn't know the result of the football."

PAST (NEGATIVE (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] )))
    -> "James needn't know the result of the football."
```

In other words, the string `"James needn't know"` encodes both a denial of the claim that he *must* know, and a denial of the claim that he *ought to* know. More evidence that the modal `"need"` can be taken in a past as well as a present sense will be given in the next section, alongside additional evidence that the modal `"ought"` can only be taken in a past sense.

The first and third flavours of English modalities - at least if I am right about the relationship between `"must"`, `"need"`, and `"ought"` - exhibit a fairly tidy pattern. There are two more flavours, however, that make things a little messier. The first is responsible for the modal **`"shall"`**, and it is logically a *yes* modality. The second is responsible for the modal `"dare"`, and it is logically a *maybe* modality. These are clearly different flavours, however, and do not relate to each other in the same way that the other two flavours do: where **`"will"`** has **`"may"`**, **`"shall"`** has nothing; and where **`"can"`** has `"must"`/`"need"`/`"ought"`, `"dare"` has nothing. Thus I use different number suffixes for the underlying modalities here, writing them as `Yes2` and `Maybe4` respectively.

Like `"need"`, `"dare"` seems - with one possible exception - only ever to occur in negated contexts: `"James dare know the result of the football"` is not English. Why this might be, however, I cannot say. All I can think is that it has something to do with the nature of `Maybe4` itself, that something in this informational choice precludes its occurence in positive form. But perhaps even this vague assertion is wrong, because there is arguably one exception to the general rule: `"I dare say"`. If this sentence is not *sui generis*, if it is not merely a fixed, hard-coded expression, then it must be the result of a non-negative `DISPLACED` message with the `Maybe4` modality for a displacer. For this reason, I have not (yet) ruled out the possibility of non-negative `Maybe4` messages in my model, though perhaps I should. Not only does `Maybe4` have no logical *yes* counterpart, it also refuses to succumb to the `PAST` elaboration; the closest English allows here is to switch to the verb **`"dare"`**, and venture a past judgement with the `Yes1` modality: `"He wouldn't dare"`. There is no getting away from it: this modality is peculiar.

The modal **`"shall"`**, together with its underlying modality `Yes2`, is also somewhat atypical. The first thing to note is that this modality is not available in `DISPLACED` messages unless that message is elaborated further. `"James shall know the result of the football"` has an interpretation, but it is a message insisting that James be told at some point in the future, not a speculation concerning whether or not he knows at present. We will examine its ilk in the next section. For now, we may note that the `PAST` elaboration makes this modality possible in `DISPLACED` messages:

```elm
PAST (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
    -> "James should know the result of the football."
```

Intuitively, this message is practically identical to the corresponding message involving the `Yes3` modality: `"James should know"` and `"James ought to know"` are virtually synonymous. (On the assumption that `"should"` is indeed the result of the `PAST` elaboration - which it certainly *appears* to be - this fact is some more small support for my claim that `"ought"` is likewise the result of this elaboration.) The claim as a whole evokes a more distant kind of necessity than the claim that he *must* know. It must be, then, that `Yes2` and `Yes3` are informationally very close, such that in the present context their difference becomes vanishingly small. In other contexts, however, `Yes2` appears to have a closer affinity with `Yes1` (as we will see in the next section). And in general, if I want to deny that he *should* know, should I say that he *needn't* know or that he *might not* know? It is hard to choose. Overall, I suggest that `Yes2` lies informationally *between* `Yes1` and `Yes3`. And that, belatedly, is the reason for the numbering, which might at first have looked a little odd.

### 5.8. Secondary PREORDAINED and REGULAR Messages

The secondary `DISPLACED` elaboration can be applied on top of the conservative `PREORDAINED` and conservative `REGULAR` elaborations. The result, in either case, is nothing particularly remarkable, but needs mentioning in order to clear the way for some more interesting messages that I will examine here. In both cases, the result is a judgement just like the ones met in the previous section, concerning the satsifaction of the underlying condition; it is simply that the underlying condition is either a conservative `PREORDAINED` or a conservative `REGULAR` one. For example, `"They will be getting married next month"` can be read as a speculation concerning their present plans; while `"She may take the bus to work"` may encode a speculation concerning her present commuting habits. Matters are considerably more intriguing when the `PREORDAINED` and `REGULAR` *themselves* incorporate a secondary displacer.

Where secondary `DISPLACED` messages (otherwise unelaborated) are judgements concerning the present satisfaction of the condition, and secondary `DISPLACED PAST` messages are judgements concerning the past satisfaction of the condition, secondary `PREORDAINED` messages are judgements concerning the *future* satisfaction of the condition. For example:

```elm
PREORDAINED Yes1 "tomorrow" ( Other, Be, "sunny", [ In, Other "Paris" ] )
    -> "It will be sunny in Paris tomorrow."

PREORDAINED Maybe1 "next year" ( Others, Do "get" Ongoing, "married" )
    -> "They may get married next year."
```

These examples are naturally taken as uncoloured messages, the speaker's distinterested predictions for the future. As with `PREORDAINED` messages in general however, there is also the possibility of colour. But where conservative and primary `PREORDAINED` messages have only one colour (that of a man-made prearrangement), secondary `PREORDAINED` messages come with a positive explosion of colour possibilities. The most common colourings for the `Yes1` and `Maybe1` modalities are *intentionality* and *permission* respectively. Thus the first message below is naturally taken as a statement of intent, if not a promise, while the second is most plausibly understood as allowing something rather than merely stating a possibility:

```elm
PREORDAINED Yes1 "next week" ( Speaker, Do "call", [ Hearer ] )
    -> "I will call you next week."

PREORDAINED Maybe1 "at four o'clock" ( Hearer, Do "leave" )
    -> "You may leave at four o'clock."
```

While the obvious colouring for the `Yes1` modality is that of intentionality, however, the colouring of *command* is also available, and may be read into - for example - the sentence, `"You will not speak to me like that again"`. And while the obvious colouring for the `Maybe1` modality is that of permissibility, the colouring of practical possibility is also available, as in, `"You may see the doctor at four o'clock"`. With the other flavours of modality, considerably more colours reveal themselves. Consider:

```elm
"I must mow the lawn."

"You must come and see us soon."

"We should/ought to go and see them."
```

The first has (or can have) the colour of personal resolve, while the second has the colour of insistence. The third might be seen in the colour of a generally good idea, or in the colour of a moral imperative. Consider further:

```elm
"I can't tell you."

"You needn't worry about it."

"You shall not steal."
```

The first has a range of colours of broadly the same hue: it would be a bad idea to tell you, a breach of trust, I am legally or morally bound to remain silent, and so on. The second might be taken in either a moral or a pragmatic shade. The third has a clear colour of command.

The `Yes1` and `Yes2` modalities (encoded in **`"will"`** and **`"shall"`** respectively) can both take on the colour of intent, and both the colour of command. There is however a tendency for `Yes1` to attract the former, and for `Yes2` to attract the latter. In the first finite form, indeed, `"shall"` is almost always taken in a commanding colour, unless the main object is in the first person. (For reasons I cannot fathom, there used to be a prescriptive rule in certain circles insisting on `"shall"` in the first person, and `"will"` in the second and third. But there is no basis for this rule whatsoever in actual usage.) Somewhat similarly, the `Maybe1` and `Maybe3` modalities (encoded in **`"may"`** and **`"can"`** respectively) can both take on the colour of permission, and both the colour of possibility; though there is a tendency for `Maybe1` to attract the former, and `Maybe3` to attract the latter. Thus the familiar and irritating joke, `"Can I leave?"`: `"You can, but you may not"`.

Secondary `PREORDAINED` messages, like secondary `DISPLACED` messages, are judgements concerning the (imagined) satisfaction of the underlying condition. Consequently they too are ventured from a certain *standpoint*, present by default, with this standpoint reflecting the time of the latest fact that the speaker is taking into consideration. Consider the contrast exhibited in the following pair of messages:

```elm
PREORDAINED Yes1 ( Male "Terry", Do "make", [ Other "a fine husband", ( For, Female "Julie" ) ] )
    -> "Terry will make a fine husband for Julie."

PAST (PREORDAINED Yes1 ( Male "Terry", Do "make", [ Other "a fine husband", ( For, Female "Julie" ) ] )
    -> "Terry would make a fine husband for Julie."
```

The difference is subtle, but nevertheless tangible. Most notably, the sponsor of the first message commits herself to the judgement that Terry and Julie will get married, while the sponsor of the second commits herself to no such thing. I account for the difference as follows. In the first case, Terry's making a fine husband for Julie is envisaged as the natural outcome of *present* realities. If he won't marry her at all, then he won't make her a husband of any kind, let alone a fine one. In the second case, by contrast, Terry's making her a fine husband is imagined as the outcome of *past* realities. The result is a message that implies the same assessment of Terry's marital worth as the first, but without the implication of impending nuptials. In the speaker's imagined scenario, the two are allowed to find their way into wedlock from whatever unhurried beginnings.

More striking is the secondary `PRIOR PAST PREORDAINED` message, common in counterfactual scenarios. When Julie has married someone else, a speaker may continue to maintain Terry's suitability as follows:

```elm
PRIOR (PAST (PREORDAINED Yes1 ( Male "Terry", Do "make", [ Other "a fine husband", ( For, Female "Julie" ) ] ) ))
    -> "Terry would have made a fine husband for Julie."
```

The point is that Julie's past wedding to someone else now rules out the possibility of a marriage to Terry. Consequently the speaker is obliged to opt for a `PRIOR PAST` standpoint, i.e. a point prior to the already past marriage to someone else.

This diagnosis also explains a systematic ambiguity in phrases like `"he might/could have gone"`, which can convey secondary `PAST DISPLACED PAST` messages (it is possible that he went), and also secondary `PRIOR PAST PREORDAINED` messages (before the event, it was possible for him to go). For example:

```elm
PRIOR (PAST (PREORDAINED Maybe1 ( Other "that dart", Do "land", [ In, Other "baby's eye" ] ) ))
    -> "That dart might have landed in baby's eye." -- it was a close thing, please be more careful in the future

PAST (DISPLACED Maybe1 (PAST ( Other "that dart", Do "land", [ In, Other "baby's eye" ] ) ))
    -> "That dart might have landed in baby's eye." -- I can't find it anywhere else, and that would explain why she's crying
```

Secondary `PRIOR PAST PREORDAINED` messages, as already noted, are common in counterfactual contexts: it didn't in fact happen, but before the fact it would/could/should/etc. have happened. Such messages do not entail that whatever it was didn't happen, however, and are also common in reconstructive reasoning, where to point is rather to avoid commitment on the matter one way or the other:

```elm
PRIOR (PAST (PREORDAINED Maybe1 ( Male, Do "come", [ Other "this way" ] ) ))
    -> "He might have come this way." -- and if he had, he would have left footprints, so let's see if there are any
```

The case of secondary `PRIOR PAST PREORDAINED` messages provide the clearest evidence for something I suggested in the previous section, namely that the modal `"need"` can be used in a past as well as a present sense, and that `"ought"` is used in a past sense. For consider the following sentences, all of which seem to sport a secondary `PRIOR PAST PREORDAINED` message identical except for the modality:

```elm
"I wouldn't have done that."

"I shouldn't have done that."

"I couldn't have done that."

"I might not have done that."

"I needn't have done that."

"I ought not to have done that."
```

In contrast, notice that `"I mustn't have done that"` and `"I daren't have done that"` have no analogous interpretations.

Secondary `REGULAR` messages, in some cases, are almost indiscernible from their conservative `REGULAR` counterparts, the modality adding little of informational value. Consider:

```elm
REGULAR Yes1 "often" ( Male "Norman", Do "walk", [ To, Other "work" ] )
    -> "Norman will often walk to work."

REGULAR Maybe1 "occasionally" ( Male "Norman", Do "walk", [ To, Other "work" ] )
    -> "Norman may occassionally walk to work."
```

I submit that the point of the secondary displacer, in `REGULAR` messages, is to make room for a greater variety of colour possibilities. These possibilities emerge in the context of *prescribed* regularities, which may be taken in all sorts of colours: as moral principles, for example, or man-made laws, or principles of good manners or etiquette, or practical advice, and so on. Thus:

```elm
"You must always tell the truth."

"You must never steal from children."

"You must drive on the left."

"You shouldn't talk with your mouth full."

"You ought to keep your computer up to date."

...
```

There is more to say, but I will stop here for now. I do not claim to have accounted for all the uses of the English modals in this section and the previous one. Nor do I claim that the resources of my theory as it stands will ultimately be capable of accounting for all of them. All I can hope is that my model represents a substantial start, and a plausible first approximation of the truth.

### 5.9. INDIRECT, ENUMERATED, and AMASSED Messages

Pronouns and proper names are generated by objects, which we find already in the nuclues of English messages. To generate nouns and noun phrases - like `"water"`, `"some water"`, `"any water"`, `"that water over there"` - we require some elaboration. I account for the data here with three elaborations:

```elm
type Message
    = ...
    | INDIRECT Int Description Message
    | ENUMERATED Int Multiplicity Message
    | AMASSED Int Proportion Message
    | ...
```


I will explain *descriptions*, *multiplicities*, and *proportions* presently. Suffice it to say, to begin with, that they are encoded in noun phrases like those just given above. First, a word about the integer variable that these elaborations all take.

At the outset I said that my elaborations all have global scope but local influence, and I have been speaking throughout of the *target* of an elaboration's local influence. In most cases, this target is always the same. In a couple of cases - the `PRIOR` and `NEGATIVE` elaborations - it changes depending on the previous elaborations in the message that it operates on. In the case of the three elaborations we are now examining, the target must be an object in the nucleus, but there are no restrictions on which of the potentially many objects it can be. This itself is an informational choice at the discretion of the speaker. The integer argument, then, represents the target object. Balancing objects are indexed from 0, and so I use -1 to represent the main object. (In the interface, however, more helpful descriptions are given to the user hiding this underlying implementation detail.)

Turning now to the more interesting arguments, *descriptions* are for describing an object rather than naming it with a pronoun or proper name, and thereby referring to it indirectly (hence my choice of label for the elaboration that takes this argument). Their string outputs include so-called "definite" descriptions like `"the king of France"` or `"the elephants in the room"` (a notorious subject of philosophical debate), but also demonstrative descriptions (e.g. `"this king of France"`, `"those elephants over there"`) and relative descriptions (e.g. `"my favourite king"`, `"your pet elephants"`). The most important part of descriptions is what I call a *pointer*, responsible for the first word in each of these phrases. It has four possible values:

```elm
type Pointer
    = The
    | This
    | That
    | RelatedTo Object
```

The first three, as you would expect, are encoded in the articles `"the"`, **`"this"`**, and **`"that"`** respectively. The last is encoded in the first relative form of a pronoun (`"my"`, `"your"`, `"their"`, etc.), the pronoun in question being determined by the subsequent object argument. As I said in section three, what is signalled here is not the relation of possession in particular, but merely the idea of a relation more generally. What that relation is, in any particular case, must be gleaned pragmatically. For example, `"your book"` may encode a reference to the book you wrote, the book you edited, the book you bought me as a present, the book you lent me a little while ago, or perhaps something else besides.

*Multiplicites*, secondly, are for picking out one or more objects of a particular type, with a view to saying something about each of those objects; for example: `"a person"`, `"one person"`, `"two people"`, `"several people"`, `"each person"`. *Proportions*, finally, are for picking out a proportion of some set, with a view to saying something about that quantity; for example: `"all water"`, `"most water"`, `"enough water"`. The most important part of multiplicities and proportions alike is what I call a *quantifier*, responsible for the first word in each of these phrases. Corresponding to the multiplicity/proportion distinction, I classify quantifiers as *enumerating* and *amassing*, with the complication - which I will come to in due course - that `Some` and `Any` fall under both categories (i.e. they can show up in both multiplicities and proportions). Because of these two quantifiers, it is necessary to have a single type definition; the quantifiers up to and including `Some` and `Any` are enumerating, while those following and including them are amassing:

```elm
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
```

It is also possible to have proportions (but not multiplicites) with no quantifier at all. These, in my design, are behind noun phrases that have neither an article nor a determiner at their head: `"water"`, `"fresh water"`, `"carnivorous animals"`, and so on. In these cases the proportion the speaker has in mind is deliberately left vague, and the overall effect is to convey something about the category in question *in general*, but not *in total*. For instance, I take it that the message encoded as `"Dogs have four legs"` is true, even though some dogs have lost a leg or two; while the message encoded as `"All dogs have four legs"` is false.

Here are the remaining type definitions necessary to complete the picture:

```elm
type alias Description =
    ( Pointer, Bool, Haystack )

type alias Multiplicity =
    ( Quantifier, Bool, Haystack )

type alias Proportion =
    ( Maybe Quantifier, Bool, Haystack )

type alias Haystack =
    = ( Category, Maybe Property, Maybe Restriction )

type alias Category =
    String

type alias Property =
    String

type alias Restriction =
    String
```

Where pointers and quantifiers are responsible for the articles, relative pronouns, and determiners at the start of complex noun phrases, the *haystack* is responsible for most of the rest: the *category* fixes the noun (e.g. `"rice"`), the *property* fixes any adjective preceding the noun (e.g. `"brown rice"`), while the *restriction* fixes any words following the noun (e.g. `"brown rice in a bag"`). These are all instances of unearthed variables that users must encode for themselves, at least for now. We already met properties in the context of counters above; categories are new, but just like properties and adjectives, I have no intention of giving my system a large dictionary of categories and nouns any time soon. Restrictions are much more likely to be dug up in a future update, since they are in fact just *balances*, precisely like those we have already seen in the nucleus of plain messages. The reason I have not modelled them like this yet is that there is a complication here that will require a fair bit of work to implement. The complication is that, being balances, they include objects; and objects - wherever they appear in a message - can be targetted by one of the elaborations we are investigation in this section. The balance in the haystack encoded as `"brown rice in a bag"`, for example, has itself been subjected to a dose of the `ENUMERATED` elaboration (whence the noun phrase `"a bag"`). To keep things from getting too large too soon, therefore, I have left restrictions unearthed for now.

The fundamental categories of *person*, *place*, and *thing*, when coupled with the quantifiers `Some`, `Any`, or `Every`, give rise to abbreviated determiners and nouns: `"someone"`, `"somebody"`, `"anywhere"`, `"everything"`, etc. These abbreviations are triggered in my model when one of these quantifiers is selected, and users enter `"one"`, `"body"`, `"where"`, or `"thing"` as their category. This, admittedly, is something of a fudge; but until the unearthed category variable is dug up, it seems like the best solution.

Descriptions, multiplicites, and proportions all have a boolean argument in between the pointer or quantifier and the haystack. When set to `True`, this triggers (typically) the introduction of the word `"other"` immediately following the article or determiner; as in, `"my other car"`, `"the other elephant in the room"`, or `"every other house in the street"`. In the case of the abbreviated determiners and nouns just mentioned, it triggers instead the introduction of the word `"else"`: `"someone else"`, `"anything else"`, `"everything else"`.

It is tempting to think of descriptions, multiplicities, and proportions as simply *overwriting* their target objects, but this is not quite right. First, it is only third person (i.e. `Other`) objects that can be the target of any of these elaborations, and so the object variable itself must be kept around at least to check that it is of the right type. Secondly, the main noun in the noun phrases generated by these variables must either be singular or plural, and which of the two it is is determined by the underlying object itself. And finally, if the targetted object is the main object, it may still be needed to decide the pronoun for any balancing object set to `SameAsMain`. Consider:

```elm
INDIRECT -1 ( That, "person" ) ( Male, Do "like", [ SameAsMain ] ) )
    -> "That person likes himself."

INDIRECT -1 ( That, "person" ) ( Others, Do "like", [ SameAsMain ] ) )
    -> "Those people like themselves."
```

The noun phrases `"that person"` and `"those people"` are determined jointly by the description and the underlying object; the former delivers the determiner **`"that"`** and the noun **`"person"`**, but the latter sets the forms of these words. And the pronouns `"himself"` and `"themselves"` are determined solely by the main object. For these reasons, then, that object must be retained in the overall message, although it is somewhat obscured by the description that elaborates it.

The distinction between multiplicities and proportions is, I hope, intuitively clear. It is related to the distinction between discrete (or "countable") and continuous (or "uncountable") categories, in that multiplicities are for the former and proportions are for the latter. The distinction between discrete and continuous categories is not an absolute one, however, and though it admits of clear paradigms on either side, more or less any category can, with sufficient ingenuity, be taken in either sense. Paradigmatically discrete categories include those encoded in `"leg"`, `"frog"`, or `"person"`, and multiplicities involving these are common: `"one leg"`, `"two legs"`, `"several frogs"`, `"every person"`, and so on. Paradigmatically continuous categories include those encoded in `"air"`, `"meat"`, or `"water"`, and proportions involving these are similarly common: `"most air"`, `"enough meat"`, `"much water"`. But continuous stuff can be divided into discrete chunks, and thereby enumerated: `"several meats"`, for example, can be used to refer to several *types* of meat. On the other side, discrete things can be bundled together into a continuous whole, with a view to saying something about a proportion of that whole: `"all people"`, `"most cars"`, `"enough frogs"`. Typically this goes along with the plural; but the singular is also possible, if there is some way of intelligibly recasting the category as continuous: `"enough leg"`, for example, might be used in talk about a continous amount of chicken-leg meat.

More precisely, we can note the following general distinction between enumerating and amassing quantifiers: the former insist rigidly on the plurality of their underlying objects, some always taking the singular, others always taking the plural; whereas the latter are flexible in this regard. `"All water"` and `"all waters"` are both fine, for example, as are `"most meat"` and `"most meats"`. But while `"one car"`, `"each car"`, and `"every car"` are all fine, `"one cars"`, `"each cars"`, and `"every cars"` are not; conversely, `"two cars"`, `"several cars"`, and `"many cars"` are fine, but `"two car"`, `"several car"`, and `"many car"` are not. There is however an exception to this rule: the amassing quantifier `Much` behaves like an enumerating quantifier, in that it insists rigidly on the singular: `"much effort"` is fine, but `"much efforts"` is not. But `Much` cannot be an enumerating quantifier on semantic grounds: it plainly serves to denote a proportion, rather than a multiplicity. I expect some explanation for this anomaly. At present, the best one I have is based on the (unique) relationship that holds between `Much` and `Many`, the latter doing for discrete categories exactly what the former does for continuous ones. Consequently there is nothing for `"much efforts"` to convey that isn't already conveyed by `"many efforts"`.

By this criterion, `Some` and `Any` would be amassing quantifiers: `"some water"` and `"some waters"` are both fine, as are `"any person"` and `"any people"`. On closer inspection, however, it seems that these two quantifiers can be used in enumerations as well as proportions (when used in enumerations, they are like `A`, `Each`, and `Every` in insisting on the singular). The distinction reveals itself when we consider how these quantifiers most naturally interact with (paradigmatically) discrete and continuous categories in the singular: `"some water"` is most naturally taken as referring to some *proportion* of water, while `"some car"` is most naturally taken as referring to some *one* car; `"any tea"` may be taken in an enumerated sense, to refer to any (one) *type* of tea, or in an amassed sense, to refer to any *amount* of tea.

When they target the main object, the `AMASSED` and `ENUMERATED` elaborations may - depending on the quantifier - change the target of the `NEGATIVE` elaboration from the condition to the multiplicity or proportion itself. The result is either a `"not"` prefixed to the determiner or, in the case of `"some"`, the replacement of this word with `"no"`. For example:

```elm
NEGATIVE ENUMERATED -1 ( Many, "person" ) ( Others, Do "like", [ Female "Grannie" ] )
    -> "Not many people like Grannie."

NEGATIVE ENUMERATED -1 ( Some, "one" ) ( Other, Be, "good enough", [ For, Hearer ] )
    -> "No one is good enough for you."

NEGATIVE AMASSED -1 ( All, "apple" ) ( Others, Be, "red" )
    -> "Not all apples are red."
```

Some enumerating quantifiers, however, are not negatable in this way: no English sentence begins with `"not a(n)"`, `"not several"`, or `"not each"`. It must be something in the nature of the quantifiers `A`, `Several`, and `Each` that precludes this, but I confess I am not quite able to put my finger on what that something is.

The interaction of the `INDIRECT`, `ENUMERATED`, and `AMASSED` elaborations, both with each other and with other elaborations, is another considerable source of ambiguity, since the order in which these elaborations is applied typically has no effect on the output sentence. Since philosophers are entirely familiar with quantifiers and their scope ambiguities, and since the way in which my model handles the phenomena here is not at all unusual or surprising, I can be relatively brief.

The sentence `"Everyone loves someone"`, for example, admits of two readings: on one reading, `Some` has widest scope, and the claim is that there is some special person who has the remarkable property of being loved by everyone; on the other, `Every` has widest scope, and the claim is merely that everyone has some special person in their lives (not necessarily the same person for all). These ambiguities receive exactly the sort of treatment in my system that you would expect: they depend on the order in which the (in this case `ENUMERATED`) elaborations are applied, something which leaves no mark on the output sentence:

```elm
ENUMERATED 0 ( Some, "one" ) (ENUMERATED -1 ( Every, "one" ) ( Other, Do "love", [ Other ] ) )
    -> "Everyone loves someone."  -- lucky him

ENUMERATED -1 ( Every, "one" ) (ENUMERATED 0 ( Some, "one" ) ( Other, Do "love", [ Other ] ) )
    -> "Everyone loves someone."  -- lucky them
```

When what exactly is picked out by some description, multiplicity, or proportion depends on the time at which it is picked out, furthermore, the order in which any elaboration that effects the time of the condition's satisfaction is applied also matters. For example, the sentence `"The president of the United States was a Democrat"` has two readings. The first maintains that the current president was, at some point in the past, a Democrat (but has perhaps changed affiliations since). The second maintains that, at some point in the past, the then president was a Democrat (but perhaps the current president is not). As you would expect, this difference boils down, in my system, to the difference between an `INDIRECT PAST` message (the current president used to be a Democrat) and a `PAST INDIRECT` message (it used to be that the then president was a Democrat). And as with the past, so with counterfactual possibilities: `"The president of the United States could have been a woman"` has two readings, a `MODAL INDIRECT` reading (Hilary could have won) and an `INDIRECT MODAL` reading (Donald could have had a sex change).

Here, as elsewhere, much work remains. I cannot yet account for multi-word determiner phrases like `"too little"` or `"too much"`. I am as yet unsure as to whether these should just be hard-coded as the results of additional quantifiers, or whether it should be possible to construct them out of smaller parts (and if so, how this should be done). I am also unable to account for noun phrases containing more than one article, relative pronoun, or determiner, like `"all the king's horses"`, `"some of the time"`, `"enough of Grannie's nonsense"`, and so on. On the face of it, it is tempting to diagnose these as involving multiple `INDIRECT`, `ENUMERATED`, or `AMASSED` elaborations all applied to the same underlying object, and this may well prove the right analysis. But I simply have not considered the data here enough to venture this hypothesis with any degree of certainty. There is also the puzzle of why the little word `"of"` creeps into so many of these phrases. For the time being, my model tolerates only one of these three elaborations applied to every object.

I mentioned already in [section 4.3](#43-limitations) that I cannot yet account for sentences like `"I am here/there"`, still less sentences like `"I am somewhere/anywhere/everywhere"`. I am reasonably confident that the messages resulting in the latter are `ENUMERATED` elaborations of the messages encoded in the former. But until I have incorporated places into my model, I cannot deal with multiplicities involving them either. There is also the fact that descriptions can - unless the pointer they involve is `The` - make do with no haystack at all: `"this"`, `"that"`, `"these"`, and `"those"` make for complete noun phrases in their own right; in the case of the `RelatedTo` pointer, meanwhile, the absence of a haystack triggers the *second* relative form of the pronoun instead of the first: `"mine"`, `"yours"`, `"hers"`, etc. This is a relatively easy addition, but as always one must stop somewhere.

I have restricted my implementation of `INDIRECT`, `ENUMERATED`, and `AMASSED` elaborations to the targetting of *objects*. The *time* argument for the `PAST` and `PREORDAINED` elaborations can also be targetted by the `INDIRECT` and `ENUMERATED` elaborations, however, giving rise to phrases like `"the day after tomorrow"`, `"your birthday"`, `"one day soon"`, or `"several years ago"`. The *duration* argument for the `EXTENDED` elaboration, furthermore, can apparently be targetted, at least somewhere in its inner workings, by the `ENUMERATED` and `AMASSED` elaborations, at least partially accounting for phrases like `"for three hours"`, `"for several minutes"`, or `"all day"`.

The *frequency* argument of the `REGULAR` elaboration, for its part, often (if not always) has the air of a *proportion* of occasions, with an amassing quantifier at its heart: `"sometimes"` appears to result from the `Some` quantifier, and `"always"` from the `All` quantifier; perhaps `"often"` results (somewhat less obviously) from the `Much` quantifier. What is more, when the frequency argument is absent, this has very much the feeling of a proportion of occasions with *no* quantifier, sharing the same sense of generality discovered in, for instance, `"Dogs have four legs"`. I would not say that the frequency argument is itself a potential target of the `AMASSED` elaboration; rather, it appears that it already is, in and of itself, a proportion. And if the frequency argument of `REGULAR` elaborations is a proportion, then the tally argument of `SCATTERED` elaborations is surely a multiplicity: `"once"`, `"twice"`, `"two times"`, `"several times"`, `"many times"`, etc. My model currently leaves the frequency and tally arguments unearthed, but I have little doubt that the key to digging them up will be the amassing and enumerating quantifiers respectively. On that optimistic note, I shall draw a temporary line under my model as it stands. I hope it is fair to say that it constitutes a substantial, plausible, and promising start.
