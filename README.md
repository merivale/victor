# Victor

A model of the English language, thought of as a code for processing *messages* (structured arrangements of informational choices) into *sentences* (strings of words). Inspired by the work of grammarian and logician Victor Howard Dudman, and with a gracious nod to Claude Shannon, the founder of information theory. Read on for an outline of the model and the philosophy behind it, and play around with the current version at  [https://merivale.github.io/victor/](https://merivale.github.io/victor/).

## 1. The Point

My project does not fit neatly into existing intellectual paradigms. Indeed, it seeks to subvert them. Dudman presented his work as a contribution to philosophical semantics, urging that this subject needed to be approached grammatically. But the code breaker's methodology is scarcely less radical in grammatical circles than it is in philosophical ones. (Many linguists, it is true, have embraced the code *analogy*; but the *methodology* that analogy suggests remains largely untested.) I am apt to suspect that philosophers missed the significance of Dudman's ideas largely as a result of failing to appreciate what he meant by "grammar". To make matters worse, there is a venerable tradition in analytic philosophy, going right back to Bertrand Russell, of viewing "surface" grammar as positively at odds with the "deeper" logical realities. Insofar as there was ever any truth to these worries, they simply reflected bad grammatical theory; and insofar as the grammar was sound, they reflected semantic speculation lazily divorced from empirical fact. For the code breaker, grammar, logic, and semantics are all facets of one and the same scientific enterprise.

The standard picture in philosophical circles nowadays is that the science of language divides into three parts. The first, *syntax*, seeks to uncover the rules governing the construction of grammatical or well-formed sentences. The second and third, *semantics* and *pragmatics*, attempt to articulate the meanings of the sentences thus constructed, and the relationship between these two sides of the communicative coin. Semantics is the study of the meanings of sentences *in general*, on the assumption that there are such things, and that they are related *functionally* to the sentences that convey them. Pragmatics is the study of the meanings of sentences *in context*, something that is observed to go above and beyond their semantic or *literal* meaning. It is generally assumed that this layer of meaning is not functionally determined, and consequently not susceptible to the sort of formal treatment typical of philosophical semantics; the sentence determines a literal meaning, on this view, but that literal meaning then serves (together with other contextual factors) as *evidence for* the pragmatically enriched information.

When philosophers think of grammar, they think of syntax; grammar, to their minds, is the study of how sentences are formed. Grammarians, however, are not in the habit of trying to specify formal syntactic rules of the sort philosophers routinely describe for their artificial languages (with the exception of practitioners of generative grammar, that is, who are in the habit of doing precisely this). Moreover, grammarians typically see their remit as extending beyond syntax; into morphology and phenology, for instance, but more importantly for present purposes into semantics as well. But the grammatical approach to semantics differs strikingly from the philosophical approach: where philosophers delight in general rules, and tend to downplay their exceptions (or perhaps shrug them off as problems for pragmatics), grammarians prefer to catalogue the several different uses of a given syntactic device, showing little interest in speculation about any deeper regularities that might underlie the surface variety.

Nowhere is this lack of interest in underlying regularities more striking than in grammatical discussions of the meanings of the inflectional forms of the English verbs. The so-called "present tense form", it is said, is used to talk about the present (`"I am hungry"`), the future (`"We are seeing him tomorrow"`), all time (`"Salt dissolves in water"`), and even no time at all (`"Two plus two equals four"`). The so-called "past tense form", meanwhile, is observed in talk about the past (`"I was hungry"`), the future (`"We were seeing him tomorrow"`), and what is often diagnosed as "unreality", be it past, present, or future (`"If she had been here yesterday, ..."`/`"If she was here today, ..."`/`"If she came by here tomorrow, ..."`). This is all well and good, as far as it goes. But to the mind of a truly scientific enquirer, it does not go nearly far enough. What we want is a general theory that *predicts and explains* all of these intriguingly different uses.

When we turn to the philosophers, alas, we are no less disappointed. They love their general rules, but conversely tend to show little interest in the tantalisingly varied data of English usage. Philosophical theories of tense and time achieve regularity simply by stipulation. And if these stipulations don't match the English language? Well, that just goes to show how messy natural languages are (more work for pragmatics, I suppose), how misleading the grammar of English is, and what a good thing it is that Frege and Russell set us on the track of developing clear and precise artificial languages in which to conduct our business instead.

We can do better. And the way to do better is to embrace the code breaker's methodology. Philosophical semantics treats languages as functions from sentences to their (literal and context-independent) interpretations, with the inputs to those functions coming from the quite separate field of grammar or syntax. I suggest that they are approaching the problem the wrong way around. Languages should be modelled as functions in precisely the *opposite* direction, as codes for processing messages into sentences. Syntax and semantics would then no longer be separate subjects, but one and the same: the function that connects sentences to their interpretations is also the function that generates those sentences in the first place.

By modelling the function in my preferred direction, therefore, we have a way of bringing semantic theories directly into contact with the observable data. These theories can no longer ignore or dismiss the words English speakers use to convey their messages, as problems for grammar or pragmatics. Consequently my approach promises the best of both worlds: the formal rigour and quest for general theory typical of modern analytic philosophy, but with the kind of attention to empirical detail that we find in contemporary grammatical enquiry. Nor is this an empty promise. Building on Dudman's work, I have developed *a unified theory of tense and time in English*, which reduces all of the surface variety observable in the use of the finite forms of the English verbs and modals to the interplay of just a handful of very simple rules. If Dudman and I are right, then English is neither the capricious system grammarians often describe, nor the irregular mess philosophers typically assume. It is an elegant, precise, and formally specifiable code.

There is also another, more specific reason why the direction in which we model the semantic function matters, and it is based on the phenomenon of ambiguity. The decision to treat the message as a function of the sentence forces us into an uncomfortable theoretical position, whereby ambiguous sentences are, from the semantic point of view, quite simply impossible. This may be fine for unambiguous artificial languages, but since the sentences of natural languages are typically rife with ambiguity, philosophers have no option but to offer syntactic or pragmatic accounts of this - as they see it - messy and unwelcome feature of the real world. I argue (though not here) that these accounts are unsatisfactory. What we need are *semantic* explanations of ambiguity. By modelling languages as codes, i.e. as functions in precisely the *opposite* direction, semantic explanations of ambiguity become possible. The explanation in general is that the encoding function of an ambiguous language is not one-to-one, but many-to-one. In other words, ambiguous languages are *lossy* codes, which do not preserve in their output strings all of the information in their input messages. More than this, however, by articulating the English encoding function, we are able to see precisely how and why various English ambiguities arise.

## 2. The Source

My algorithm is written in [Elm](http://elm-lang.org/), with the styles written in [Less](http://lesscss.org/). The compiled HTML+JS+CSS is stored in the gh-pages branch, for easy publication on [GitHub Pages](https://pages.github.com/). The `src` directory contains the main program module, which simply pulls everything together (nothing to see there), and two subdirectories, `Interface` and `Theory`. The former directory contains all the modules responsible for generating the web page users see, for keeping track of user input, and for piecing that input together into a message variable. It is the modules in the latter directory that are of theoretical interest, since they describe what a message variable looks like, and define the encoding function that converts these variables into strings.

There is no need to go into detail about the `Theory` modules here. Anyone interested in the nuts and bolts should simply read the code itself. It is internally documented, and is intended to be intelligible to anyone of a suitably logical turn of mind (although obviously some experience of functional programming would help). Indeed, I consider it a major selling point of my theory that it is computationally very simple, with only as much complexity as the empirical data demand. Readers should start with the `Types` module for my account of messages (and their components), and then glance at the `Words` module. This latter contains a few small functions for generating words and their various forms. It is not very interesting in itself, but is perhaps helpful in serving to solidify an understanding of the grammatical terminology that I use (see section 3 below).

Next, readers should look at the `Sentences` module, which contains the encoding function itself, the function for processing messages into sentences. This function divides into two stages. In the first stage, the message is validated, and the variables that have a bearing on the output sentence are extracted; in the second stage, those variables are used to generate the sentence itself. The second stage is implemented directly within the `Sentences` module (with help from the little functions exposed by the `Words` module). The first stage is handled by the separate `Messages` module.

I have not yet written any tests, but there is a stub `test` directory as a placeholder for later development in this direction. From the point of view of the theory (never mind the interface), it would be helpful to have tests that run various message variables through my encoding function, and check that the resulting strings are as they should be.

## 3. Grammatical Terminology

I deploy a small amount of grammatical terminology, some of which I expect to be familiar, but some of which is a little idiosyncratic. It is simplest to introduce this all up front. Semantic terminology will be introduced *in situ* in sections 4 and 5 below.

First, I divide English lexemes into a handful of categories, mostly standard. There are just a couple of things to note: (i) I do not treat the *modals* as a subset of the *verbs*, but as belonging to a distinct category all of their own (more on this below); and (ii) I distinguish between *articles* and *determiners*, and in a somewhat unusual way (I classify the so-called "indefinite article" as a determiner). Here are the categories I will be assuming, with some examples:

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

I refer to lexemes that have more than one form in **boldface**, using ordinary weighting to refer to their individual forms. Thus the determiner **`"a"`** has the two (informationally equivalent) forms `"a"` and `"an"`. The article **`"this"`** has the two forms `"this"` (*singular*) and `"these"` (*plural*), and the article **`"that"`** has the two forms `"that"` (*singular*) and `"those"` (*plural*). The nouns likewise all have a *singular* and a *plural* form (`"car"`/`"cars"`, `"frog"`/`"frogs"`, etc.).

I count eight pronouns, and label them in the standard way: *first*, *second*, and *third person*, each either *singular* or *plural* (which makes six), and then an additional two in the third person singular, distinguishing male and female from neuter. Thus:

| Number     | Person | Pronoun                             |
| ---------- | ------ | ----------------------------------- |
| *Singular* | First  | **`"I"`**                           |
|            | Second | **`"you"`**                         |
|            | Third  | **`"he"`**, **`"she"`**, **`"it"`** |
| *Plural*   | First  | **`"we"`**                          |
|            | Second | **`"you"`**                         |
|            | Third  | **`"they"`**                        |

Since the old second person singular **`"thou"`** was usurped by its corresponding plural pronoun **`"you"`**, the latter is now ambiguous. It is simplest to distinguish *two* pronouns here, both spelt the same.

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

My labels for these forms are idiosyncratic. People will likely know the third direct form as the *reflexive* form, for example, and the first relative form as the *possessive* form. I dislike the second of these terms, since the first relative form does not signal the relation of possession in particular, but simply the idea of a relation more generally (see section 5.6 below). The first, however, seems harmless enough. Nevertheless, I have a general preference for bland terminology that doesn't assume or imply too much at the level of interpretation.

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

For regular verbs, and for some otherwise irregular ones as well, the second finite form and the second participle form are identical (a fact that must surely have some semantic significance). Nevertheless, it is convenient to draw the distinction for every verb.

At first blush, readers will recognise the first and second finite forms as the "present tense" and "past tense" forms respectively. I strongly oppose this loaded terminology, since it is a matter of considerable controversy what these forms signify, and whether it is (or whether it is always) temporal information. It is better to settle at the outset on some semantically neutral labels. I said *at first blush*, moreover; in fact, the "present tense" standardly refers to a *dual* form, which (in my terms) sometimes looks like the base form, and sometimes looks like the first finite form. There is of course a very natural reason for this grouping: `"I like you"` and `"He likes you"` encode messages that differ only in respect of who is doing the liking. But the fact that the base form can be used in this way, as informationally equivalent to the first finite form, is itself a very striking, and it demands an explanation. Talk of a dual "present tense" form serves only to hide this curious feature of English; as though the `"like"` in `"I like you"` was not really the base form of the verb at all, but a finite form that merely happens to look like the base form.

The uniquely awkward verb **`"be"`** is like any other verb in its base form and participle forms (`"be"`, `"being"`, `"been"`), but instead of two finite forms it has five: `"am"`, `"is"`, `"are"`, `"was"`, and `"were"`. The second of these corresponds to the first finite form of other verbs, while the last two correspond to the second. The first and third have no exact analogues in the other verbs, but correspond to the familiar "present tense" use of the base form. I expect an explanation of this verb's uniquely irregular behaviour. In other words, I expect any account of the English code to locate the meaning of **`"be"`** alongside the meanings of the other verbs, but also somewhat distinct from them; there ought to be some underlying difference that sustains the irregularity.

The English modals, finally, each have one finite form, and half of them have two:

| Modal         | Finite 1  | Finite 2   |
| ------------- | --------- | ---------- |
| **`"will"`**  | `"will"`  | `"would"`  |
| **`"shall"`** | `"shall"` | `"should"` |
| **`"may"`**   | `"may"`   | `"might"`  |
| **`"can"`**   | `"can"`   | `"could"`  |
| `"must"`      | `"must"`  | -          |
| `"ought"`     | `"ought"` | -          |
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

Every plain English message, I submit, affirms the *present* satisfaction of the condition by the object, and is encoded in a sentence containing either the base form or the first finite form of the verb. (The decision between these two forms depends straightforwardly on the object, and encodes no additional information.) This constitutes the first principle in my unified theory of tense for English. That the present is the default time in the English predication system is suggested by the use of the base form of the verb for such affirmations. Ultimately, however, the evidence for this claim is holistic, and derives from the success and simplicity of my theory as a whole.

The various (apparently) non-present uses of the base and first finite form will mostly be handled by my theory of elaborations. One of them, however, can be dealt with right away: its use in conveying apparently "timeless" affirmations concerning mathematical or conceptual affairs:

```elm
( two plus two, equal four )
    -> "Two plus two equals four."

( a vixen, be a female fox )
    -> "A vixen is a female fox."
```

I diagnose these as plain messages (actually the second is elaborated, but not in such a way as to affect its temporal components; see section 5.6). Consequently I insist that they are still affirmations about the *present*. It is simply that sensible readers *ignore* this temporal information, knowing full well that it is irrelevant. The alternative to this refreshingly striaghtforward account is to posit a class of *genuinely* timeless affirmations in English, which are encoded (ambiguously) in the very same sentences that encodes their corresponding present affirmations. But this - surprisingly popular - view is needlessly complicated, and not supported by the data. Why introduce a whole new class of message, and a whole new subroutine to encode it, when we can simply use the resources already in place? The question is intended to be rhetorical; but in any case, the fact that the output sentences are identical indicates fairly clearly that we *didn't* do this.

That the present is the default option within the English system perhaps explains why we use it in talking about abstract matters for which time is irrelevant. (Though I dare say this would have been the obvious choice anyway.) More significantly, it might help to explain the attraction to the view that such messages really are timeless, an attraction that appears to have been widely felt, in spite of the entirely unnecessary additional computational complexity that this hypothesis implies. It is easier to ignore information that simply comes by default, than to ignore information that needs to be actively chosen. With this in mind, perhaps my view is not so different from the alternative after all.

### 4.1. Objects

There are three objects available in English, each of which comes in either a singular or a plural form (represented in my model by a boolean argument, `False` for singular and `True` for plural):

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

When referring to objects in what follows, I will adopt the following abbreviating conventions. Rather than write `Speaker False` and `Speaker True`, I will write `Speaker` and `Speakers` respectively; similarly for `Hearer(s)` and `Other(s)`. When the optional sex and string arguments are not present, meanwhile, I will omit them, instead of explicitly writing `Nothing`. And when they are present, I will write them on their own, as `Male` or `Female` instead of `Just Male` or `Just Female`. Finally, when the sex variable is present, I will not bother to write `Other` in front of it. For example:

| Abbreviation       | Full Meaning                                 |
| ------------------ | -------------------------------------------- |
| `Speaker`          | `Speaker False`                              |
| `Hearers`          | `Hearer True`                                |
| `Male`             | `Other False (Just Male) Nothing`            |
| `Female "Grannie"` | `Other False (Just Female) (Just "Grannie")` |
| `Others`           | `Other True Nothing Nothing`                 |

I hope these conventions are all intuitive and easy to understand. The point of adopting them is just to make the examples that follow easier on all of us. I will adopt similar conventions with regard to the writing out of conditions, once I start unpacking their component parts. I will not bother to state these conventions explicitly, since I do not expect them to give rise to any confusion.

### 4.2. Conditions, part 1/2: Pivots and Counters

English conditions, in my model, break down into a *pivot*, an optional *counter*, and a (possibly empty) list of *balances*:

```elm
type alias Condition =
    ( Pivot, Maybe Counter, List Balance )
```

It is perhaps simplest to start in the middle here, with the idea of a counter, which may take one of two values. The first type of value is a *property*, encoded in an adjective (e.g. `"happy"`, `"hilarious"`, `"hungry"`); the second type of value is what I call a *relator*, encoded in a preposition (e.g. `"at"`, `"by"`, `"in"`, `"with"`):

```elm
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
    ...
```

My model does not currently contain any properties or adjectives, and consequently the property type is just an alias for a string. What this means in practice is that users are obliged to encode their properties for themselves, inputting the resulting adjective directly into the system. They are an example of what I call an *unearthed* variable (see section 4.4 below). There are 31 relators in my model at present, though I didn't bother listing them all above. The full list of 31 is anyway incomplete, but it accounts for the many common prepositions.

Going back to the start of the condition, we have the pivot. The pivot determines the choice of verb at the start of the predicate, and can take one of two values:

```elm
type Pivot
    = Be Bool
    | Do Verbality Bool Bool

type alias Verbality =
    String
```

The `Be` pivot, unsurprisingly, triggers selection of the verb **`"be"`**, with the form is this verb being determined by the main object of the nucleus, according to the following schema:

| Object    | Form    |
| --------- | ------- |
| Speaker   | `"am"`  |
| Other     | `"is"`  |
| otherwise | `"are"` |

The boolean argument this pivot takes indicates whether or not the condition as a whole is *ongoing*; when set to true, this introduces the participle form `"being"` immediately after the finite form as determined by the object.

If there is an English condition comprising nothing other than the `Be` pivot, then it is the condition of existence; as in the standard translation of Descartes' famous claim, `"I think, therefore I am"`. For what it's worth, I find it hard to read this message into sentences like `"We are"` or `"They are"`. Such semi-sentences seem to demand the response, *are what?* And so I am tempted to say that there is no English condition comprising the `Be` pivot on its own, and that the proper translation of Descartes is `"... therefore I exist"`. But my intuition is not shared by all English speakers, and I needn't insist on the point.

At any rate, there are certainly plenty of English conditions built with the `Be` pivot and a counter. When the counter is a property, the condition is that of having that property:

```elm
( Speaker, ( Be, "hungry" ) )
    -> "I am hungry."

( Hearer, ( Be True, "silly" ) )
    -> "He is being silly."

( Others, ( Be, "beautiful" ) )
    -> "They are beautiful."
```

When the counter is a relator, the condition is that of being in a certain *standing*, a notion that I intend here to blur the boundary between *location* and *status*. For example:

```elm
( Speaker, ( Be, Out ) )
    -> "I am out."

( Female "Grannie", ( Be, Up ) )
    -> "Grannie is up."

( Speakers, ( Be, Over ) )
    -> "We are over."
```

More precisely, a balance consists of either a *counter* or a *weight* (or both), where the counter is something encoded in a preposition, and a weight is either a repeat of the main object, or a distinct object of its own:

```elm
type alias Balance =
    ( Maybe Counter, Maybe Weight )

type Counter
    = About
    | Above
    | After
    | Against
    | At
    | Before
    | Behind
    ...

type Weight
    = SameObject
    | Different Object
```

There are 31 counters in my model, though I didn't bother listing them all above. The full list of 31 is anyway incomplete, but accounts for the most common prepositions. When the weight has the `SameObject` value, the result is third direct form of the pronoun (`"myself"`, `"yourself"`, `"yourselves"`, etc.), with the pronoun in question being determined by the main object of the nucleus. (It is in this context, as noted in section 3 above, that the distinction between singular and plural `Hearer` objects reveals itself.) When it has the `Different` value, the additional object argument determines the pronoun, which then shows up in the second direct form (`"me"`, `"him"`, `"her"`, etc.).

When referring to balances from now on, I will adopt - in addition to the abbreviating conventions already outlined for objects - a few more such conventions in the same spirit. Whenever a counter or a weight is absent, I will omit it, rather than explicitly writing `Nothing`; and when it is present, I will write it on its own, as e.g. `Against` instead of `Just Against`. When the weight is a different object, I will not bother explictly writing `Different`, but write the object on its own (abbreviated as before). And finally, when a balance contains only a counter or only a weight (i.e. not both), I will drop the brackets around it. For example:

| Abbreviation                  | Full Meaning                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `Out`                         | `( Just Out, Nothing )`                                                        |
| `Others`                      | `( Nothing, Just (Different (Other True Nothing Nothing)) )`                   |
| `( Behind, Hearer )`          | `( Just Behind, Just (Different (Hearer False)) )`                             |
| `( For, SameObject )`         | `( Just For, Just SameObject )`                                                |
| `( With, Female "Grannie" )`  | `( Just With, Just (Different (Other False (Just Female) (Just "Grannie"))) )` |

If it wasn't clear before, I trust this table illustrates the benefits of conventions like these. I adopt them not just to save space, but to make my examples easier to read and understand. Brackets and `Just`s and `False`s all over the place are necessary for compilers, but for human readers they very often serve to obscure more than to illuminate.

And now for some examples themselves, making use of these abbreviating conventions, and with a view to solidifying the understanding of balances built up in this section:

```elm
( Speaker, ( be, [ Male "Victor" ] ) )
    -> "I am Victor."

( Male, ( be, [ Out ] ) )
    -> "He is out."

( Male "Victor", ( love, [ Female "Grannie" ] ) )
    -> "Victor loves Grannie."

( Female "Grannie", ( live, [ ( At, Other "Cockroach Lane" ) ] ) )
    -> "Grannie lives at Cockroach Lane."

( Female "Grannie", ( live, [ ( At, Other "Cockroach Lane" ), ( With, Female "Susan" ) ] ) )
    -> "Grannie lives at Cockroach Lane with Susan."
```

### 4.3. Conditions, part 2/2: Pivots

I divide pivots into three main kinds, as follows:

```elm
type Pivot
    = Be Bool (Maybe Property)
    | Seem (Maybe Sense) Bool (Maybe Property)
    | Do Verbality Bool Bool

type alias Property =
    String

type Sense
    = Sight
    | Smell
    | Sound
    | Taste
    | Touch

type alias Verbality =
    String
```

The `Be` pivot, as you would expect, is encoded in the verb `"be"`, and the boolean argument it takes marks whether the condition as a whole is *ongoing* or not; this is the difference between, for example, `"He is silly"` and `"He is being silly"`. The optional *property* argument is responsible for the output adjective `"silly"` in the two examples just given. As you can see, the property type at present is just an alias for a string, meaning that users are required to encode properties into their corresponding adjectives for themselves. I am not presently inclined to give my model a great dictionary of properties/adjectives.

When a `Be` pivot has a property, typically no balances are required to make a complete condition. In some cases, however, with a suitable property and a suitable counter, a balancing object can also be included. For example, and adopting some abbreviating conventions along the same lines as those already laid out (I trust by now I needn't spell out these conventions explicitly):

```elm
( Male "Robert", ( Be "hungry", [] ) )
    -> "Robert is hungry."

( Hearer, ( Be, [ Male "Robert" ] ) )
    -> "You are Robert."

( Hearer, ( Be, [ Like, Male "Robert" ] ) )
    -> "You are like Robert."

( Speakers, ( Be "happy", [ For, Hearers ] ) )
    -> "We are happy for you."
```

Some readers might be wondering why the property variable is attached to the pivot itself, instead of showing up in the list of balances. There are a few reasons for this. One is that the `Do` pivot - which I will come to shortly - can support balances but cannot support properties. The other is that balances, as I intend them, are predominantly meant for holding *objects*, and properties are fundamentally different kinds of things, belonging in a separate part of the code. The third reason depends on my theory of elaborations, and consequently I cannot explain it here; see section 5.3 below.

The `Seem` pivot operates exactly like the `Be` pivot, taking a boolean argument specifying whether or not the condition is ongoing, and an optional property argument. It is for messages to the effect that things *seem* as the corresponding `Be` message says they *are*. The optional `Sense` argument specifies the sense to which these appearances present themselves. For example:

```elm
( Female "Grannie", ( Seem "angry", [] ) )
    -> "Grannie seems angry."

( Female "Grannie", ( Seem Sound "angry", [] ) )
    -> "Grannie sounds angry."

( Female "Grannie", ( Seem Sight "angry", [] ) )
    -> "Grannie looks angry."

( Female "Grannie", ( Seem Sight, [ ( Like, Hearer ) ] ) )
    -> "Grannie looks like you."
```

Finally, the `Do` pivot is essentially my catch-all variable for every other pivot expressible in the English language (of which there are probably tens of thousands). The *verbality* variable is intended to capture the idea that gets encoded in the verb, but for now it is just an alias for a string, meaning that (as with the property variable for the other pivots) users are obliged to encode these for themselves. My system generates the appropriate *form* of the verb for your message, but you need to supply the verb yourself (in its base form, e.g. `"eat"`, `"dance"`, `"live"`). Following the verbality, there is a boolean argument representing whether or not the condition in question is ongoing, exactly as it does with the other pivots; this underlies the difference between, for example, `"She lives"` and `"She is living"`.

Despite the enormous variety of `Do` pivots, they all have two things in common, and which distinguish them from `Be` and `Seem` pivots. The first is that they cannot support a property; one can *be* angry, *seem* angry, or *look* angry, but one cannot *jump* angry, or *smile* angry. The second is that, in addition to being ongoing or not, they can also be *passive* or not, and this is the point of the second boolean argument these pivots take. This underlies the different between, for example, `"Grannie is eating"` and `"Grannie is being eaten"`.

### 4.4. Limitations

It should go without saying that my theory is incomplete, a work in progress that stands in need of significant expansion and refinement. My theory of plain messages in particular - more specifically my theory of English *conditions* - is the most strikingly incomplete aspect of the whole. My aim in this section is to get out in front of any criticisms on this score, by acknowledging the most egregious of these inadequacies, and explaining why I am in no great hurry to address them. The main point, by way of headline, is that I am more interested in the theory of elaborations, and I expect that any philosophers who are likely to take an interest in my work will share this bias. My theory of plain messages is not intended to make any very great headway into that field, then, but rather to provide just enough to serve as the basis for my main project, the theory of elaborations.

The first most obvious inadequacy in my theory of plain messages is that it doesn't predict all of the data. In other words, there are plain messages that my model can neither represent nor encode into their corresponding sentences. This is relatively untroubling. It doesn't indicate that I am on the wrong track; it merely reminds us that - of course - I have yet to reach the end of that track. Here is a very simple example of a sentence I am unable to account for:

```elm
( Speaker, ( Be, ??? ) )
    -> "I am here."
```

For what it's worth, my current thinking is that this sentence should be accounted for by expanding the type definition for a weight, to include options for *places* as well as objects. These options would include, at least, *here*, *there*, *home*, *abroad*, and *away*. By itself, this addition is not difficult to implement, although it would have implications in the implementation of my theory of elaborations that I am not yet sure how to handle. And in any case, there will always be more to do, and one has to stop somewhere. (`"Somewhere"`, incidentally, would be the result of elaborating a message with a place variable like *here* or *there* in its underlying condition; my model doesn't predict the uses of this word yet either.)

More worryingly, I am unable to generate compound prepositional phrases like `"in front of"` or `"over and above"`. And while I can generate `"up to"`, I need two balances to do it; for example:

```elm
( Male, ( Do "look", [ Up, ( To, Female ) ] ) )
    -> "He looks up to her."
```

This just doesn't seem like the right structural diagnosis. Overall, it looks as though my treatment of counters is not only incomplete but also inaccurate. It is an approximation at best.

More worrying still is that there are ambiguities I am unable to account for. This is particularly regrettable, because the ability to account for ambiguities is precisely one of the main selling points of my approach as a whole. In my defence, I can account for several ambiguities with my theory of elaborations, and that, as I advertised above, is where my main interests lie. There are some ambiguities, however, that need to be accounted for by the theory of plain messages, and my model is not yet able to do this. The ambiguities in question concern how balances fit into the overall condition, informational differences that are not captured when we represent balances simply in a list. For example:

```elm
"He is looking at Grannie with Victor."
```

This sentence is ambiguous: is he with Victor, looking at Grannie, or is Grannie with Victor, both being looked at by him? There must be two distinct conditions here, and consequently two distinct messages, both of which fetch up in the same English sentence. But I have no way of representing the difference. On my model as it stands, I have room only for one message to correspond to this sentence:

```elm
( Male, ( Do "look" Ongoing, [ ( At, Female "Grannie" ), ( With, Male "Victor" ) ] ) )
```

Evidently, then, there is more to a condition than just a pivot and a bare *list* of balances. To understand a condition fully, one also must appreciate how each individual balance relates to the pivot, and that information is not always signalled in the output string. But this is a problem for another day.



Finally, perhaps the most striking weakness in my theory of plain messages is that it currently predicts far too much. This is because my model makes *no attempt whatsoever* to validate input conditions. In constructing balances, users are allowed to combine any counter with any (or no) object; while in constructing the condition itself, they may append any balance to any pivot. As a result it is possible - let me not mince words - to generate *complete and utter nonsense* within my system. For instance:

```elm
( Male "Victor", ( love, [ At, ( Behind, Female "Grannie" ), For ] ) )
    -> "Victor loves at behind Grannie for."

( Female "Grannie", ( live, [ Speaker, Hearer, ( Over, SameObject ) ] ) )
    -> "Grannie lives me you over herself."

( Female "Grannie", ( Be "red", [ Speakers ] ) )
    -> "Grannie is red us."

( Others, ( Seem Taste "heavy", [ Hearer, ( With, Other ) ] ) )
    -> "They taste heavy you with it."
```

Obviously this is a very serious inadequacy, and I make no attempt to shy away from this fact. I am not, however, in any great hurry to develop my theory further in this direction, and to write in constraints on what counts as a valid condition. This is for two reasons. First, the task is quite simply an enormous one, requiring the collation of literally tens of thousands of pivots, noting - just for starters - how many balances each of these can support, and which counters are needed or allowed within these balances. It is not a task for one person alone. Secondly, although I by no means wish to belittle the value of this endeavour, my own interests currently lie elsewhere, in the theory of English elaborations. I offer this crude theory of plain messages predominantly just so that I have a basis on which to build this latter theory. And I am anticipating that my critics will share this bias, and therefore show me some leniency with regard to my rough and ready model of conditions.

## 5. The Theory, part 2/2: The Elaborations

The idea of a message elaboration is itself nothing new; philosophers and logicians will recognise it as a propositional operator by another name. I avoid this more familiar terminology partly in deference to Dudman (the "nucleus"/"elaboration" terminology is his), and partly to avoid unwanted connotations from the last hundred years or so of semantic and logical enquiry. While there is a degree of overlap, the elaborations that I posit are in general rather different from the kinds of operators philosophers are familiar with. And this, in turn, is because my approach is so different. Always my aim is to *explain the sentences* that English speakers produce, rather than to capture the logical entailments of English messages in any formal system.

Since elaborations are so central to my theory, I adopt the convention of writing them in ALLCAPS, so as to render them easily distinguishable from the other aspects of my system. There are currently 11 elaborations posited by my model. This list is no doubt incomplete, but it represents - or so I hope - a substantial start. I am not yet in a position to say how many elaborations there are in English, but I would hazard somewhere between twenty and thirty.

Though it will not make much sense up front, here is the full type definition for messages (details of the individual elaborations to follow):

```elm
type Message
    = Plain Nucleus
    | NEGATIVE Message
    | PAST (Mayeb Time) Message
    | PRIOR Message
    | DISPLACED Displacer Message
    | REGULAR (Maybe Displacer) (Maybe Frequency) Message
    | PREORDAINED (Maybe Displacer) (Maybe Time) Message
    | EXTENDED Duration Message
    | SCATTERED Tally Message
    | INDIRECT Target Pointer Bool Haystack Message
    | ENUMERATED Target Quantifier Bool Haystack Message
    | AMASSED Target (Maybe Quantifier) Bool Haystack Message
```

The definition is of course recursive, reflecting the fact that the elaborations can all be applied on top of each other, presumptively without limit or restriction. In fact there are some combinations that English rules inadmissible, but not many (details as we come to them below). Rather than write a more convoluted type definition that makes these combinations impossible, I have instead written some validation checks into the encoding function itself (see the `Messages` module). The function returns an error in cases of such invalid input.

The elaborations that I posit all have what I like to call *global scope*, but *local influence*. By this I mean that they all apply to messages as a whole (global scope), but that their semantic effect invariably applies only to one particular component of the message (local influence): sometimes the object, sometimes the condition, sometimes an extra-nuclear argument introduced by a previous elaboration, and in a few cases the time of the condition's satisfaction. (Because of this, it is often convenient to refer to an elaborated *something*, where that something is the locally affected component, rather than the message as whole.) It is an interesting question whether English has elaborating devices that are local in scope as well as influence. I should not like to say with any certainty that it does not; the hypothesis, it seems to me, certainly merits further investigation.

However that may be, I insist that the elaborations I have diagnosed thus far really do have global scope, notwithstanding their local influence. There are two main reasons for this. First, one and the same elaboration may affect a *different* component of its input message, depending on how that message has been elaborated previously. Where I have one globally scoped elaboration with varying local influence, therefore, the alternative would not only require *multiple* locally scoped elaborations, but also a suite of additional validation rules restricting the use of these elaborations. Secondly, the order in which elaborations are applied is typically a matter of considerable semantic significance, even when the elaborations target completely separate parts of the message. A `PAST INDIRECT` message, for example, is importantly distinct from its corresponding `INDIRECT PAST` message (see section 5.6 below). If we treat these elaborations as having local scope, we lose the ability to represent the order in which they are applied, and therefore have no way of representing this difference. It would of course be perfectly possible to represent the order in which locally scoped elaborations are applied in some other way. But again, that would introduce more complexity into the system. Overall, a model with globally scoped elaborations is simpler, covering the same ground with less convoluted machinery.

### 5.1. PAST and PRIOR Messages

A plain English message, recall, affirms the present satisfaction of the condition by the object. Of course English allows us to talk of the past and future as well. In accounting for all this talk, I posit just three elaborations, `PAST`, `PRIOR`, and `PREORDAINED`. The nature of these elaborations, and the way in which they interact, is one of the most intriguing features of the English code. The semantic results are quite complex and sophisticated, but it is acheived - at least if my theory is correct - through the coordination of devices that are themselves beautifully simple. I can take only a fraction of the credit here: though I fancy I have made some improvements to his model, the core insights here are all taken over from Dudman.

Things need to be introduced in manageable chunks. I will begin, in this section, with a look at the `PAST` and `PRIOR` elaborations without reference to the `PREORDAINED` elaboration. I will introduce the latter first in the next section, but only partially, reserving a fuller account of it for section 5.5. Here is the relevant part of the type definition of messages for now:

```elm
type Message
    = ...
    | PAST (Maybe Time) Message
    | PRIOR Message
    | ...

type alias Time =
    String
```

The syntactic effect of the `PAST` elaboration is to replace the base or first finite form of the main verb with its corresponding *second* finite form. Its semantic effect, meanwhile, is to indicating that something is past, something that would otherwise (by default) be present. What that something is, as we shall see, varies from case to case. Typically, however, and at any rate in the case of plain messages, what it changes is the time of the condition's satisfaction by the object. For example:

```elm
PAST ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie left me."

PAST "last year" ( Others, ( Do "go", [ To, Other "America" ] ) )
    -> "They went to America last year."
```

(To be clear, I adopt another abbreviating convention here and hereafter: I do not bother to write `Plain` in front of the nucleus.) The optional *time* argument, obviously enough, serves to specify the time of the condition's satisfaction with more precision. At present, this argument is an unearthed variable, that users are obliged to encode for themselves.

Going by its grammatical effect, the `PRIOR` elaboration is easily distinguished from the `PAST` elaboration. Where the latter swaps the base or first finite form of the main verb for its second finite form, the former swaps it for the corresponding form of the verb **`"have"`**, followed by the second participle form of the original verb:

```elm
PRIOR ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie has left me."

PRIOR ( Others, ( Do "go", [ To, Other "America" ] ) )
    -> "They have gone to America."
```

Grammarians standardly call this the "perfect". While its effect on the sentence is easy to see, it is harder to say what the underlying informational trigger is, and in particular how exactly this trigger differs from the `PAST` elaboration, to which it bears a very clear resemblance. (It is surely no coincidence that the second finite form and the second participle form are identical for all regular verbs.)

One difference, immediately visible in my type definition for messages, is that the `PRIOR` elaboration does not take an additional time argument. In support of this aspect of my theory, note that `"They have gone to America last year"` is not a sentence of English. Admittedly one can say, for example, `"I have eaten this morning"`. However, one can only say this while it is still morning, when `"this morning"` consequently signals the present rather than the past; as it does in, for instance, `"I am alive this morning"`. One can also say things like, `"They have been to America already"`, but `"already"` here cannot be the result of an additional argument to the `PRIOR` elaboration, since it also arises without that elaboration (`"They went to America already"`). In both cases, therefore, the additional words are not owing to any additional argument to the `PRIOR` elaboration itself. My model does not yet account for these words, but my assumption is that they will each be accounted for by two further elaborations.

(To get a little ahead of myself, and somewhat speculatively, perhaps we need a `PRESENT` elaboration whose sole purpose is to allow for the introduction of a more precise specification of the present time of the condition's satisfaction. It would need to be incompatible with the `PAST` elaboration, of course, but not with the `PRIOR` elaboration. And then perhaps we need a - let's say - `PREVIOUS` elaboration, responsible for the introduction of the adverb `"already"`. This would of course be incompatible with `PRESENT` or plain messages, but a common companion of the `PAST` and `PRIOR` elaborations alike.)

A second difference between the `PAST` and `PRIOR` elaborations is that, where the former merely indicates that something is past, the latter indicates is that something is past *with respect to something else*. Hence my choice of terminology: what is past is simply past, but what is prior is prior *to* something. More specifically, when applied to a plain message, the `PRIOR` elaboration doesn't *directly* produce a message concerning the past satisfaction of its underlying condition; rather, it produces a *new* condition, one whose satisfaction (at any given point in time) entails the satisfaction of the underlying condition *prior* to that point. This, I take it, explains why it cannot take an additional time argument in the same what that the `PAST` elaboration does.

By default, of course, the satisfaction of any condition is present. And so by default a `PRIOR` message affirms the present satisfaction of its `PRIOR` condition. Thus, while `PAST` plain messages and `PRIOR` plain messages are alike in affirming the past satisfaction of their underlying conditions, they do this in different ways. The `PAST` elaboration does this directly, but the `PRIOR` elaboration does it indirectly, via affirming the present satisfaction of a new condition that in turn entails the prior satisfaction of the underlying one. (If my parenthetical speculation a moment ago is right, then this would explain why the `PRIOR` elaboration, unlike the `PAST` elaboration, is consistent with the hypothetical `PRESENT` elaboration.)

The `PAST` and `PRIOR` elaborations by themselves are wonderfully simple. The `PAST` elaboration, moreover, operates on `PRIOR` messages in just the same way that it operates on plain ones. The `PRIOR` elaboration, after all, has effectively just modified the condition, so there is nothing else for the `PAST` elaboration to do except locate the otherwise present satisfaction of this condition in the past. Thus we have the so-called "past perfect", which I refer to as a `PAST PRIOR`:

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

Note that, in the second example, `"an hour before you arrived"` serves to encode the time at which I *saw* him; whereas in the first, `"when you arrived"` encodes the time at which I *had* (already) seen him. In further confirmation of the claim that the second sentence does not encode a `PAST PRIOR` message, note that `"I have seen him an hour before you arrived"` - like `"They have been to America last year"` - is not a sentence of English.

With plain messages (which are present by default), and with the `PAST` and `PRIOR` elaborations, I can predict and explain a substantial portion of the uses of the finite forms of the verbs (more to come as we proceed). I can predict and explain the ambiguity accessible to phrases like `"had seen"`, which in general can encode both `PAST PRIOR` messages ("past perfect"), and `PRIOR PAST` messages ("past past"). And I can do all this without the need to posit a third "past past" tense. Two elaborations that can be applied in different orders are all that is needed.

### 5.2. PREORDAINED Messages, part 1/2

At this juncture one might expect me to introduce a `FUTURE` elaboration, as a direct analogue to the `PAST` elaboration, whose purpose is to locate the time of the underlying condition's satisfaction in the future. Talk about the future in English, however, is a more complicated affair than talk about the present or the past, and there is in my view no such straightforwardly symmetric elaboration. The elaboration that I do posit, the `PREORDAINED` elaboration, has if anything a closer symmetry with the `PRIOR` elaboration, in that it locates the satisfaction of a condition as future *with respect to some other point*, and moreover often does this (though not always) by generating a new condition. But there is yet more to this elaboration, that outstrips anything observed in the `PRIOR` elaboration, as we will see.

The `PREORDAINED` elaboration takes an optional *displacer* argument, which is reponsible for turning e.g. `"he leaves"` into `"he is going to leave"`, `"he is about to leave"`, `"he has to leave"`, `"he will leave"`, `"he should leave"`, and so on. This raises a whole host of further questions best saved for later. To start with, then, I will focus on applications of this elaboration where the displacer is absent.

The currently relevant part of my type definitions is as follows (the definition of a displacer will be saved for later):

```elm
type Message
    = ...
    | PREORDAINED (Maybe Displacer) (Maybe Time) Message

type alias Time =
    String
```

In the absence of a displacer, the `PREORDAINED` elaboration generates a new condition, one whose satisfaction entails - I don't know how else to say it - that the satisfaction of the underlying condition is *preordained* for some later time. The time in question can optionally be specified with the *time* argument, which is the very same unearthed type that we saw in the case of `PAST` messages. Typically, of course, it will be a time in the *future* rather than the past; though that, as we will see, is not universally the case.

The `PREORDAINED` elaboration (with no displacer) is most common in the case of man-made prearrangments; for example:

```elm
PREORDAINED "tomorrow" ( Speaker, ( Be, "busy" ) )
    -> "I am busy tomorrow."

PREORDAINED "next month" ( Others, ( Do "get" Ongoing, "married" ) )
    -> "They are getting married next month."

PREORDAINED "at dawn" ( Speakers, ( Do "attack" ) )
    -> "We attack at dawn."
```

It also shows up in claims concerning predetermination, however; for instance:

```elm
PREORDAINED "tomorrow" ( Other, ( Be, [ Other "Tuesday" ] ) )
    -> "It is Tuesday tomorrow."

PREORDAINED "at 7.05pm tomorrow" ( Other "the sun", ( Do "set" ) )
    -> "The sun sets at 7.05pm tomorrow."
```

(I am here treating `"the sun"` as a proper name, because I have not yet explained the part of my model that allows us to generate it as a definite description; see section 5.6.)

It is important to be clear that these are all claims about *present* prearrangements or predeterminations. While these messages are about the future, therefore, they are about the future only *indirectly*. First and foremost, they are about the *present*: present prearrangements or predeterminations *for* the future. In this respect, as I have already advertised, the `PREORDAINED` elaboration is much more like the `PRIOR` elaboration than it is like the `PAST` elaboration. It locates something as future *with respect to something else*, via the generation of a new condition. And just as it is possible to have `PAST PRIOR` messages, it is also possible to have `PAST PREORDAINED` messages, which are claims about past prearrangements or predeterminations that are, by implication, no longer present:

```elm
PAST (PREORDAINED "next month" ( Others, ( Do "get" Ongoing, "married" ) ))
    -> "They were getting married next month."  -- but there was a problem with the venue and it's had to be postponed

PAST (PREORDAINED "at 7.05pm tomorrow" ( Other "the sun", ( Do "set" ) ))
    -> "The sun set at 7.05pm tomorrow."  -- but then the asteroid knocked us into our new orbit
```

For that matter, we can also have `PRIOR PAST PREORDAINED` messages:

```elm
PRIOR (PAST (PREORDAINED "tomorrow" ( Speaker, ( Be, "busy" ) )))
    -> "I had been busy tomorrow."  -- before I heard of the accident, but then I cleared my schedule
```

With this in mind, let me stress that the optional time argument needn't specify a time in the future; the constraint is rather that it must specify a time that is *later* than the time of the prearrangment or predetermination. Thus we find `PAST PREORDAINED` messages (and `PRIOR PAST PREORDAINED` messages) for which the time specified is itself past:

```elm
PAST (PREORDAINED "yesterday" ( Speaker, ( Be, "busy" ) ))
    -> "I was busy yesterday."  -- but then I changed my plans

PRIOR (PAST (PREORDAINED "yesterday" ( Speaker, ( Be, "busy" ) )))
    -> "I had been busy yesterday."  -- before I heard of the accident ...
```

So far I have been emphasising the symmetry between the `PRIOR` and the `PREORDAINED` elaborations, but there are asymmetries as well. First, while the `PRIOR` elaboration typically generates a new condition, when it is applied to a `PAST` message it instead targets the time of the condition's satisfaction directly, as I have already described (giving rise to the so-called "past past" tense). The `PREORDAINED` elaboration, however, always generates a new condition (except when it has a displacer argument; more on that later). And `PREORDAINED PAST` messages, meanwhile, do not exist. This is one of the (very few) restrictions on the combinations of elaborations that are permissible in English. The reason for it, I trust, is obvious: one cannot preordain what has already come to pass.

The second asymmetry is more substantial. The new condition generated by the `PRIOR` elaboration (when it does generate a new condition) entails the *actual* prior satisfaction of its underlying condition. The message as a whole is true only if the underlying condition was *in fact* satisfied at that prior time. The new condition generated by the `PREORDAINED` elaboration, however, does *not* entail the actual satisfaction of its underlying condition at the later time. Rather, it entails - as I have been saying - the existence of some prearrangement or predetermination to that effect. But plans, as we all know, can change, and it may be perfectly true that someone is getting married next month, even if she later calls it off (at which point it will still be true that she *was* getting married next month). With predeterminations, there is room for metaphysical debate: some would argue that, if an asteroid hits tonight and moves us into a new orbit, then the sun was never going to set at 7.05pm tomorrow after all. But however that may be, English allows us - if we want it - the facility to communicate on the assumption that predeterminations can also change, saying for instance that the sun *did* set at 7.05pm tomorrow, even though it no longer *does*. It is not for semantics to settle this metaphysical dispute.

The third asymmetry is syntactic rather than semantic. The `PREORDAINED` elaboration, unlike the `PRIOR` elaboration, has the curious feature of being (what I call) *invisible*. By this I mean that it has, in and of itself, no visible impact on the output sentence. The optional time argument, it is true, shows up in an adverbial expression at the end of the predicate, but the elaboration itself leaves no mark (where the `PRIOR` elaboration, of course, replaces the main verb with the corresponding form of the verb **`"have"`** followed by the second participle form of the original verb). As we will see in the next section, the `PREORDAINED` elaboration is not the only English elaboration that is invisible in this sense. And the existence of invisible elaborations, as you might well expect, is one very considerable source of ambiguities: from the sentence alone, it may be unclear which invisible elaborations (if any) have been applied, and moreover which order they have been applied in.

More on that in the next section. In the meantime, let me end this section by accounting for a couple of comparatively straightforward ambiguities arising from the `PREORDAINED` and `PAST` elaborations alone, in virtue of the former's invisibility. First, when the optional time argument is absent from a `PREORDAINED` elaboration (with no displacer either), it simply cannot be deduced from the sentence whether the elaboration has been applied or not. Thus the sentence `"They are getting married"` admits of a plain interpretation (they are at the altar as we speak) as well as a `PREORDAINED` one (they are engaged to be married):

```elm
Plain ( Others, ( Do "get" Ongoing, "married" ) )
    -> "They are getting married."

PREORDAINED ( Others, ( Do "get" Ongoing, "married" ) )
    -> "They are getting married."
```

The same is true of `"They were getting married"`, which arises from subjecting either of the messages above to the `PAST` elaboration (as it might be, they were at the altar and are now wed, or they were engaged but have now split).

Secondly, and rather more interestingly, the sentence `"They were getting married yesterday"` is ambiguous between no fewer than *three* distinct messages, each with different truth conditions. The first is a direct claim about the past, about what they got up to yesterday. The second is a claim about yesterday's plans: that the couple were then engaged to be wed at some unspecified point in the future. The third, finally, is a claim about past plans *for* yesterday: that at some point in the past (unspecified) the happy day was scheduled for yesterday. The point, in a nutshell, is that the sentence does not reveal whether the word `"yesterday"` is coming from the `PAST` elaboration or (if it is present) the `PREORDAINED` one. I represent the three messages here as follows:

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

In this case, it would be more natural to bring the output of the outermost argument to the front of the sentence:

```elm
"Last month, they were getting married yesterday."
```

My model is not yet able to generate sentences like these, however, and rigidly insists on placing the outputs of all time arguments at the end of the sentence.

### 5.3. REGULAR Messages part 1/2; SCATTERED and EXTENDED Messages

There are three more invisible elaborations in my model: `REGULAR`, `EXTENDED`, and `SCATTERED`. It is convenient to discuss these all together, since they have a great deal in common. The `REGULAR` elaboration (though not the other two) takes an optional displacer argument, much like the `PREORDAINED` elaboration. As in the previous section, however, I will postpone the discussion of this complication until we have more of the rest of my model in place. The type definition for these three elaborations is as follows:

```elm
type Message
    = ...
    | REGULAR (Maybe Displacer) (Maybe Frequency) Message
    | EXTENDED Duration Message
    | SCATTERED Tally Message

type alias Frequency =
    String

type alias Duration =
    String

type alias Tally =
    String
```

As with the *time* argument for `PAST` and `PREORDAINED` elaboration, the *frequency*, *duration*, and *tally* arguments are all unearthed variables for now; users are obliged to encode them into strings for themselves.

The `REGULAR` elaboration, at least when it has no displacer argument, generates a new condition whose satisfaction entails the *regular* satisfaction of the input condition, with the optional frequency argument specifying the frequency of that regularity. `REGULAR` messages concern the habits of such creatures (notably human beings) as are capable of forming them, as well as the typical or predictable behaviour of inanimate objects under certain conditions:

```elm
REGULAR "often" ( Female "Grannie", ( Do "eat", Out ) )
    -> "Grannie often eats out."

REGULAR "occasionally" ( Male "Victor", ( Do "laugh", [ ( At, Female "Grannie" ) ] ) )
    -> "Victor occasionally laughs at Grannie."

REGULAR ( Other "salt", ( Do "dissolve", [ ( In, Other "water" ) ] ) )
    -> "Salt dissolves in water."
```

(`"Salt"` and `"water"` are not proper names, and the last example here is a fudge; but I have not yet described the elaboration that accounts for these words, and it is difficult to think of a suitable example involving only pronouns or proper names. See section 5.7 for a more accurate analysis.)

The `SCATTERED` elaboration likewise generates a new condition whose satisfaction entails multiple satisfactions of its underlying condition. Rather than convey any nomological apprehensions, however, they affirm nothing over and above the brute multiplicity. The compulsory *tally* argument specifies the total number of separate satisfactions (not necessarily with any great precision, as in the second example below):

```elm
PAST "last week" (SCATTERED "twice" ( Female "Grannie", ( Do "eat", Out ) ))
    -> "Grannie ate out twice last week."

PAST "in 1986" (SCATTERED "several times" ( Male "Victor", ( Do "laugh", [ ( At, Female "Grannie" ) ] ) ))
    -> "Victor laughed at Grannie several times in 1986."
```

`SCATTERED` elaborations are not discovered in the wild unless they have been subjected to some further elaboration - such as the `PAST` elaboration in the examples above - that prevents them from amounting to claims about multiple *present* satisfactions. This is for the obvious reason that multiple satisfactions simply take too long. It needn't be the `PAST` that does it; the `PREORDAINED` elaboration also works:

```elm
PREORDAINED "tomorrow" (SCATTERED "twice" ( Speakers, ( Do "attack" ) ))
    -> "We attack twice tomorrow."  -- once at dawn, and then again from the other side an hour later
```

The same is true, and for the very same reason, of `EXTENDED` messages, which result in a new condition whose satisfaction entails the satisfaction of its input condition over an extended period of time, with the compulsory *duration* argument specifying the duration of that period:

```elm
PAST "yesterday" (EXTENDED "for an hour" ( Male, ( Do "see", [ Female ] ) ))
    -> "He saw her for an hour yesterday."

PREORDAINED "tomorrow" (EXTENDED "for an hour" ( Male, ( Do "see" Ongoing, [ Female ] ) ))
    -> "He is seeing her for an hour tomorrow."
```

Several ambiguities arise from the interaction of these invisible elaborations. Consider, for example, the sentence:

```elm
"He walked to work for a week."
```

Among the several interpretations of this sentence we find (i) a `PAST EXTENDED HABITUAL` message, according to which he was breifly in the habit (one week only) of walking to work; (ii) a `PAST EXTENDED` message, according to which he once took a whole week to walk to work; and (iii) a `PAST HABITUAL EXTENDED` message, according to which he used to be in the habit of taking a whole week to walk to work.

And then we have this seemingly straightforward sentence:

```elm
"The film started at 8pm."
```

By my count, this string is accessible to no fewer than *five* distinct interpretations: (i) a simple claim about when the film started (a `PAST` message); (ii) a claim about when it was scheduled to start (a `PAST PREORDAINED` message); (iii) a claim about when showings of used to start (a `PAST REGULAR` message); (iv) a claim about when showings of it used to be scheduled to start (a `PAST PREORDAINED REGULAR` message); and (v) a claim about the time at which the management, when drawing up their plans, generally scheduled showings of it to start (a `PAST REGULAR PREORDAINED` message). (It may be hard to envisage a use for this last message. To aid your imaginations, suppose the management had to fix the timetable anew each morning, and typically ended up placing the film in question in the 8 o'clock slot. This in contrast to the more likely fourth interpretation, in which they settle once and for all on a regular 8 o'clock position.)

I could go on, but hopefully these two examples suffice to illustrate the general point. With invisible elaborations, there is frequently nothing in the sentence that indicates the order in which they have been applied, or even - if their optional arguments are missing, or if the outputs of those arguments could have come from somewhere else - whether or not they have been applied at all. For the record, though I will not argue the point here, I defy anyone to come up with a satisfactory syntactic or pragmatic account of any of these ambiguities. It is only by embracing the code analogy, by modelling the semantic function from message to sentence rather than the other way around, that we can explain the various phenomena here.

### 5.4. NEGATIVE Messages

The chief puzzle facing any theory of negation in English is posed by the related ambiguities discovered, for example, in the following two sentences:

```elm
"Claire does not drink."

"I was not busy all day."
```

In the first case, the speaker might be maintaining that Claire is tee-totalled, or might instead be denying that she is an alcoholic. The latter reading is consistent with Claire enjoying a drink now and then, while the former is not. In the second case, the speaker might be affirming that she was free all day yesterday, or might rather be rejecting the claim that she was occupied all day. The latter interpretation is consistent with her having been busy at some point in the day, while the former is not. In sum, the first interpretation of each sentence is a positive message about something internally negative, whereas the second is a negative message about something internally positive. (The possibility of these two kinds of negation is also why double negation isn't always vacuous: `"Claire doesn't not drink"`, for example, can be used perfectly intelligibly to deny that she is tee-totalled.)

My model posits a `NEGATIVE` elaboration, which has the effect of converting an affirmative message into its corresponding denial. The difference between the pairs of messages just noted is accounted for by the *order* in which this elaboration is applied, relative to the other elaborations in the message (the `REGULAR` and `EXTENDED` elaborations respectively). In the second of each pair, the `NEGATIVE` elaboration is the outermost one, whereas in the first of each pair it is closer to the nucleus, with the other elaboration being applied on top of it. The `REGULAR NEGATIVE` interpretation of the first sentence affirms that Claire is in the habit of abstaining from drink, while the corresponding `NEGATIVE REGULAR` denies that she is in the habit of drinking. The `EXTENDED NEGATIVE` interpretation of the second sentence, similarly, affirms that the speaker was free all day, while its `NEGATIVE EXTENDED` counterpart denies that the speaker busy all day.

Related ambiguities arise through the interaction of the `NEGATIVE` elaboration with the `PREORDAINED` and `SCATTERED` elaborations: `"I am not seeing him tomorrow"` may be taken as a denial of any present plan to that effect (a `NEGATIVE PREORDAINED` message), or as an affirmation of a present plan to avoid him (a `PREORDAINED NEGATIVE` message); `"Grannie did not fall down fifteen times yesterday"` may be said as a precursor to insisting that she took only fourteen tumbles yesterday (a `NEGATIVE SCATTERED` message), or as a claim that, though she may have faltered fifteen times, on none of those occasions did she ultimately fall (a `SCATTERED NEGATIVE` message). Yet more ambiguities arise from the possibility of throwing the `NEGATIVE` elaboration in with *more than one* invisible elaboration. I will illustrate with just one example:

```elm
"Victor did not see Grannie for two hours."
```

Brace yourselves. This sentence encodes, among others: (i) a `PAST NEGATIVE EXTENDED` message (he saw her, but for an hour and a half at most); (ii) a `PAST EXTENDED NEGATIVE` message (for two whole hours, he didn't see her); (iii) a `PAST REGULAR NEGATIVE EXTENDED` message (he was formerly in the habit of avoiding her for two hours at a time); (iv) a `PAST NEGATIVE REGULAR EXTENDED` message (he wasn't formally in the habit of seeing her for two hours at a time); (v) a `PAST NEGATIVE EXTENDED REGULAR` message (his habit of seeing Grannie lasted much longer than a mere two hours); (vi) a `PAST EXTENDED REGULAR NEGATIVE` message (his habit of avoiding her did last a mere two hours); (vii) a `PAST NEGATIVE PREORDAINED EXTENDED` message (there was no plan to see her for two hours; perhaps the plan was to see her for only one hour); (viii) a `PAST PREORDAINED EXTENDED NEGATIVE` message (the plan was to avoid her for two hours); (ix) a `PAST EXTENDED PREORDAINED NEGATIVE` message (for two hours, there was a short-lived plan to avoid her). I'll stop there, but by now it is no doubt clear that these by no means exhaust the possibilities.

Admittedly some of the interpretations just given of this sentence will seem implausible; and some of its other interpretations (not listed) will seem outright bizarre. Nevertheless I maintain that they are all perfectly legitimate from a grammatical point of view. If any of them are in any sense ruled out, it can only be because they are weird or pointless, not because they are ungrammatical. Change the nucleus, meanwhile, or some of the surrounding arguments (durations, frequencies, tallies, and so on), and different sets of elaborations leap to mind as plausible or likely. I see no reason to suppose that some combinations of these elaborations are intrinsically problematic. In any case, it is undeniable that there are many ambiguities like these in English, and it may be noted how effortlessly my theory is able to predict and explain them all. As with those highlighted in the previous section, I defy anyone to account for them satisfactorily in syntactic or pragmatic terms.

### 5.5. DISPLACED Messages; PREORDAINED and REGULAR Messages part 2/2

*[notes to be added soon]*

### 5.6. INDIRECT, ENUMERATED, and AMASSED Messages

*[notes to be added soon]*
