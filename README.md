# Victor

A model of the English language, thought of as a code for processing *messages* (structured arrangements of informational choices) into *sentences* (strings of words). Inspired by the work of grammarian and logician Victor Howard Dudman, and with a gracious nod to Claude Shannon, the founder of information theory. Read on for an outline of the model and the philosophy behind it, and play around with the current version at  [https://merivale.github.io/victor/](https://merivale.github.io/victor/).

## 1. The Point

My project does not fit neatly into existing intellectual paradigms. Indeed, it seeks to subvert them. Dudman presented his work as a contribution to philosophical semantics, urging that this subject needed to be approached grammatically. But the code breaker's methodology is scarcely less radical in grammatical circles than it is in philosophical ones. (Many linguists, it is true, have embraced the analogy; but the formal methodology itself is largely untested.) I am apt to suspect that philosophers missed the significance of Dudman's ideas largely as a result of failing to appreciate what he meant by "grammar". To make matters worse, there is a venerable tradition in analytic philosophy, going right back to Bertrand Russell, of viewing "surface" grammar as positively at odds with the "deeper" logical realities. Insofar as there was ever any truth to these worries, they simply reflected bad grammatical theory; and insofar as the grammar was sound, they reflected logical speculation lazily divorced from empirical fact. For the code breaker, grammar, logic, and semantics are all facets of one and the same scientific enterprise.

The standard picture in philosophical circles nowadays is that the science of language divides into three parts. The first, *syntax*, seeks to uncover the rules governing the construction of grammatical or well-formed sentences. The second and third, *semantics* and *pragmatics*, attempt to articulate the meanings of the sentences thus constructed, and the relationship between these two sides of the communicative coin. Semantics is the study of the meanings of sentences *in general*, on the assumption that there are such things, and that they are related *functionally* to the sentences that convey them. Pragmatics is the study of the meanings of sentences *in context*, something that is observed to go above and beyond their semantic or *literal* meaning. It is generally assumed that this layer of meaning is not functionally determined, and consequently not susceptible to the sort of formal treatment typical of philosophical semantics; the sentence determines a literal meaning, on this view, but that literal meaning then serves (together with other contextual factors) as *evidence for* the pragmatically enriched information.

When philosophers think of grammar, they think of syntax; grammar, to their minds, is the study of how sentences are formed. Grammarians, however, are not in the habit of trying to specify formal syntactic rules of the sort philosophers routinely describe for their artificial languages (with the exception of practitioners of generative grammar, that is, who are in the habit of doing precisely this). Moreover, grammarians typically see their remit as extending beyond syntax; into morphology and phenology, for instance, but more importantly for present purposes into semantics as well. But the grammatical approach to semantics differs strikingly from the philosophical approach: where philosophers delight in general rules, and tend to downplay their exceptions (or perhaps shrug them off as problems for pragmatics), grammarians prefer to catalogue the several different uses of a given syntactic device, showing little interest in speculation about any deeper regularities that might underlie the surface variety.

Nowhere is this lack of interest in underlying regularities more striking than in grammatical discussions of the meanings of the inflectional forms of the English verbs. The so-called "present tense form", it is said, is used to talk about the present (`"I am hungry"`), the future (`"We are seeing him tomorrow"`), the past (`"He comes up to me this morning and just tells me, right to my face"`), all time (`"Salt dissolves in water"`), and even no time at all (`"Two plus two equals four"`). The so-called "past tense form", meanwhile, is observed in talk about the past (`"I was hungry"`), the future (`"We were seeing him tomorrow"`), and what is often diagnosed as "unreality", be it past, present, or future (`"If she had been here yesterday, ..."`/`"If she was here today, ..."`/`"If she came by here tomorrow, ..."`). This is all well and good, as far as it goes. But to the mind of a truly scientific enquirer, it does not go nearly far enough. What we want is a general theory that *predicts and explains* all of these intriguingly different uses.

When we turn to the philosophers, alas, we are no less disappointed. They love their general rules, but conversely tend to show little interest in the tantalisingly varied data of English usage. Philosophical theories of tense and time achieve regularity simply by stipulation. And if these stipulations don't match the English language? Well, that just goes to show how messy natural languages are (more work for pragmatics, I suppose), how misleading the grammar of English is, and what a good thing it is that Frege and Russell set us on the track of developing clear and precise artificial languages in which to conduct our business instead.

We can do better. And the way to do better is to embrace the code analogy. Philosophical semantics treats languages as functions from sentences to their (literal and context-independent) interpretations, with the inputs to those functions coming from the quite separate field of grammar or syntax. I suggest that they are approaching the problem the wrong way around. Languages should be modelled as functions in precisely the *opposite* direction, as codes for processing messages into sentences. Syntax and semantics would then no longer be separate subjects, but one and the same: the function that connects sentences to their interpretations is also the function that generates those sentences in the first place.

By modelling the function in my preferred direction, therefore, we have a way of bringing semantic theories directly into contact with the observable data. These theories can no longer ignore or dismiss the words English speakers use to convey their messages, as problems for grammar or pragmatics. Consequently my approach promises the best of both worlds: the formal rigour and quest for general theory typical of modern analytic philosophy, but with the kind of attention to empirical detail that we find in contemporary grammatical enquiry. Nor is this an empty promise. Building on Dudman's groundbreaking work, I have developed *a unified theory of tense and time in English*, which reduces all of the surface variety observable in the use of the finite forms of the English verbs and modals to the interplay of just a handful of very simple rules. If Dudman and I are right, then English is neither the capricious system grammarians often describe, nor the irregular mess philosophers typically assume. It is an elegant, precise, and formally specifiable code.

There is also another, more specific reason why the direction in which we model the semantic function matters, and it is based on the phenomenon of ambiguity. The decision to treat the message as a function of the sentence forces us into an uncomfortable theoretical position, whereby ambiguous sentences are, from the semantic point of view, quite simply impossible. This may be fine for unambiguous artificial languages, but since the sentences of natural languages are typically rife with ambiguity, philosophers have no option but to offer syntactic or pragmatic accounts of this - as they see it - messy and unwelcome feature of the real world. I argue (though not here) that these accounts are unsatisfactory. What we need are *semantic* explanations of ambiguity. By modelling languages as codes, i.e. as functions in precisely the *opposite* direction, semantic explanations of ambiguity become possible. The explanation in general is that the encoding function of an ambiguous language is not one-to-one, but many-to-one. In other words, ambiguous languages are *lossy* codes, which do not preserve in their output strings all of the information in their input messages. More than this, however, by articulating the English encoding function, we are able to see precisely how and why various English ambiguities arise.

## 2. The Source

My algorithm is written in [Elm](http://elm-lang.org/), with the styles written in [Less](http://lesscss.org/). The compiled HTML+JS+CSS is stored in the gh-pages branch, for easy publication on [GitHub Pages](https://pages.github.com/). The `src` directory contains the main program module, which simply pulls everything together (nothing to see there), and two subdirectories, `Interface` and `Theory`. The former directory contains all the modules responsible for generating the web page users see, for keeping track of user input, and for piecing that input together into a message variable. It is the modules in the latter directory that are of theoretical interest, since they describe what a message variable looks like, and define the encoding function that converts these variables into strings.

There is no need to go into detail about the `Theory` modules here. Anyone interested in the nuts and bolts should simply read the code itself. It is internally documented, and is intended to be intelligible to anyone of a suitably logical turn of mind (although obviously some experience of functional programming would help). Indeed, I consider it a major selling point of my theory that it is computationally very simple, with only as much complexity as the empirical data demand. Readers should start with the `Types` module for my account of messages (and their components), and then glance at the `Words` module. This latter contains a few small functions for generating words and their various forms. It is not very interesting in itself, but is perhaps helpful in serving to solidify an understanding of the grammatical terminology that I use (see section 3 below).

Next, readers should look at the `Sentences` module, which contains the encoding function itself, the function for processing messages into sentences. This function divides into two stages. In the first stage, the message is validated, and the variables that have a bearing on the output sentence are extracted; in the second stage, those variables are used to generate the sentence itself. The second stage is implemented directly within the `Sentences` module (with help from the little functions exposed by the `Words` module). The first stage is handled by the separate `Messages` module.

I have not yet written any tests, but there is a stub `test` directory as a placeholder for later development in this direction. From the point of view of the theory (never mind the interface), it would be helpful to have tests that run various message variables through my encoding function, and check that the resulting strings are as they should be.

## 3. Grammatical Terminology

I deploy a small amount of grammatical terminology, some of which I expect to be familiar, but some of which is a little idiosyncratic. It is simplest to introduce this all up front. Semantic terminology will be introduced *in situ* in sections 4 and 5 below.

First, I divide English lexemes into a handful of categories, mostly standard. There are just a couple of things to note: (i) I do not treat *modals* as a subset of *verbs*, but as belonging to a distinct category all of their own (more on this below); and (ii) I distinguish between *articles* and *determiners*, and in a somewhat unusual way (I classify the so-called "indefinite article" as a determiner). Here are the categories I will be assuming, with some examples:

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

The uniquely awkward verb **`"be"`** is like any other verb in its base form and participle forms (`"be"`, `"being"`, `"been"`), but instead of two finite forms it has five: `"am"`, `"is"`, `"are"`, `"was"`, and `"were"`. The first three of these correspond to the first finite form of other verbs, while the last two correspond to the second. I expect an explanation of this irregularity. In other words, I expect any account of the English code to locate the meaning of **`"be"`** alongside the meanings of the other verbs, but also somewhat distinct from them; there ought to be some underlying difference that sustains the irregularity.

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

While undeniably akin to the verbs, the modals have no participle forms and no base form. While most grammars treat them as special kinds of verbs, I prefer to place them in a distinct category of their own. As with the uniquely irregular verb **`"be"`**, but even more so in their case, I expect some explanation of the striking syntactic differences these words exhibit from the verbs. In other words, I expect the modals to show up in a closely related but nevertheless distinct part of the English code. If they were not somehow separated within the workings of the function, nothing would prevent them from acquiring all the usual five forms that the verbs enjoy. Or rather, since these lexemes seem to have started life as verbs like any other: if they had not migrated to a separate part of the function, nothing would explain why they each *lost* three or four of their forms.

## 4. The Theory, part 1/2: The Nucleus

The overarching hypothesis behind my model is that every atomic English message is made up out of a series of zero or more *elaborations* applied to a core *nucleus*. (The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.) Consequently my theory as a whole consists of two interlocking theories: a theory of plain English messages (i.e. those messages composed of an unelaborated nucleus), and a theory of English elaborations. I begin with the former.

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

I hope these conventions are all intuitive and easy to understand. The point of adopting them is just to make the examples that follow easier on all of us. I will introduce similar conventions with regard to the writing out of conditions, once we have started unpacking their component parts.

### 4.2. Conditions, part 1/2: Balances

English conditions, in my model, break down into a *pivot* and a (possibly empty) list of *balances*:

```elm
type alias Condition =
    ( Pivot, List Balance )
```

The pivot determines the choice of verb at the start of the predicate (and some other things, as we will see in the next section), while the balances (if any) are encoded in the words at the end of the sentence. I will examine pivots more closely in the next section. Balances typically are or include additional objects, which I will refer to as *balancing* objects (as opposed to the *main* object that resides next to the condition in the nucleus itself). Balancing objects are variables of exactly the same type as the main object.

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
    | PAST Message
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

*[My model was recently changed significantly (13/06/2017), rendering the notes that used to be here largely obsolete. I am in the process of updating them, but in the meantime they are incomplete.]*

### 5.1. NEGATIVE Messages

The chief puzzle facing any theory of negation in English is posed by the related ambiguities discovered, for example, in the following two sentences:

```elm
"Claire doesn't drink."

"I was not busy all day."
```

In the first case, the speaker might be maintaining that Claire is tee-totalled, or might instead be denying that she is an alcoholic. The latter reading is consistent with Claire enjoying a drink now and then, while the former is not. In the second case, the speaker might be affirming that she was free all day yesterday, or might rather be rejecting the claim that she was occupied all day. The latter interpretation is consistent with her having been busy at some point in the day, while the former is not. In sum, the first interpretation of each sentence is a positive message about something internally negative, whereas the second is a negative message about something internally positive. (The possibility of these two kinds of negation is also why double negation isn't always vacuous: `"Claire doesn't not drink"`, for example, can be used perfectly intelligibly to deny that she is tee-totalled.)

My model posits a `NEGATIVE` elaboration, which has the effect of converting an affirmative message into its corresponding denial. The difference between the pairs of messages just noted is accounted for by the *order* in which this elaboration is applied, relative to other elaborations in the message. In the second of each pair, the `NEGATIVE` elaboration is the outermost one, whereas in the first of each pair it is closer to the nucleus, with a further elaboration applied on top of it. For my account of these other elaborations, and hence my complete solution to this puzzle, see sections 5.4 and 5.5 below.

The `NEGATIVE` elaboration is the most semantically versatile of those posited by my model. While its effect, as I have said, is always to turn an affirmative message into its corresponding denial, there are different components of messages that can be the target of a denial. What exactly is being denied in a `NEGATIVE` message depends on the elaboration to which the negation itself is applied, and hence discussion of the other elaborations below will include details on what happens when you negate them.

To start with, let me be clear on what happens when you negate a plain message. A plain message, recall, affirms the present satisfaction of the condition by the object. A `NEGATIVE` plain message, therefore, *denies* the present satisfaction of the condition by the object; or equivalently, affirms the present *non*-satisfaction of the condition by the object. Effectively, then, the `NEGATIVE` elaboration negates the underlying condition, turning it into its complement. As we will see, this is the most common local effect of this elaboration, but not the only one.

### 5.2. PAST and PRIOR Messages

A plain English message, recall, affirms the present satisfaction of the condition by the object. With the `NEGATIVE` elaboration, we can generate affirmations of present *non*-satisfaction instead. But so far we are still stuck with affirmations, positive or negative, about the *present*. Of course English allows us to talk of the past and future as well. In accounting for all this talk, I posit just three elaborations, `PAST`, `PRIOR`, and `PREORDAINED`. The nature of these elaborations, and the way in which they interact, is one of the most intriguing features of the English code. The semantic results are quite complex and sophisticated, but it is acheived - at least if my theory is correct - through the coordination of devices that are themselves beautifully simple. I can take only a fraction of the credit here: though I fancy I have made some improvements to his model, the core insights here are all taken over from Dudman.

The `PAST` elaboration always has the local effect of indicating that something is past, something that would otherwise (by default) be present. What that something is, as we shall see, varies from case to case. Typically, however, and at any rate in the case of plain messages, what it changes is the time of the condition's satisfaction by the object. For example:

```elm
PAST ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie left me."

PAST ( Others, ( Do "go", [ To, Other "America" ] ) )
    -> "They went to America."
```

(To be clear, I am adopting one more abbreviating convention here and hereafter: I do not bother to write `Plain` in front of the nucleus.) The grammatical effect, plainly enough, is to swap the base or first finite form of the main verb for its *second* finite form.

Going by its grammatical effect, it is easy to distinguish the `PRIOR` elaboration from the `PAST` elaboration. Where the latter swaps the base or first finite form of the main verb for its second finite form, the former swaps it for the corresponding form of the verb **`"have"`**, followed by the second participle form of the original verb:

```elm
PRIOR ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie has left me."

PRIOR ( Others, ( Do "go", [ To, Other "America" ] ) )
    -> "They have gone to America."
```

Grammarians standardly call this the "perfect". While its effect on the sentence is easy to see, it is harder to say what the underlying informational trigger is, and how exactly this trigger differs from the `PAST` elaboration.

The first semantic difference between these two elaborations, I suggest, is that, while the `PRIOR` elaboration indicates that something is past, it is not something that would otherwise be present. I will explain this claim in a moment. The second difference is that it indicates that something is past *with respect to something else*. Hence my choice of terminology: what is past is simply past, but what is prior is prior *to* something. More specifically, when applied to a plain message, the `PRIOR` elaboration doesn't *directly* produce a message concerning the past satisfaction of its underlying condition; rather, it produces a *new* condition, one whose satisfaction (at any given point in time) entails the satisfaction of the underlying condition *prior* to that point.

By default, of course, the satisfaction of any condition is present. And so by default a `PRIOR` message affirms the present satisfaction of its `PRIOR` condition. Thus, while `PAST` plain messages and `PRIOR` plain messages are alike in affirming the past satisfaction of their underlying conditions, they do this in different ways. The `PAST` elaboration does this directly, but the `PRIOR` elaboration does it indirectly, via affirming the present satisfaction of a new condition that in turn entails the prior satisfaction of the underlying one.

The `PAST` and `PRIOR` elaborations by themselves are wonderfully simple. The `PAST` elaboration, moreover, operates on `PRIOR` messages in just the same way that it operates on plain ones. The `PRIOR` elaboration, after all, has effectively just modified the condition, so there is nothing else for the `PAST` elaboration to do except locate the otherwise present satisfaction of this condition in the past. Thus we have the so-called "past perfect", which I refer to as a `PAST PRIOR`:

```elm
PAST PRIOR ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie had left me."  -- But now, perhaps, she has returned.
```

Things start to get rather more interesting, however, when the `PRIOR` elaboration is applied on top of the `PAST` elaboration. For in this case, it does not result in the generation of a new condition. Rather, the `PRIOR` elaboration now locates the satisfaction of the underlying condition *directly* at some point prior to the already past point of satisfaction set up by the `PAST` elaboration. (This is why I said that the `PRIOR` elaboration does not indicate the pastness of something that would otherwise be preset; in this case, the something in question would otherwise be past.) The overall effect is what grammarians call the "past past tense", but which I call the `PRIOR PAST`. Compare:

```elm
PAST PRIOR ( Speaker, ( Do "see", [ Male ] ) )
    -> "I had [already] seen him [by the time you arrived]."

PRIOR PAST ( Speaker, ( Do "see", [ Male ] ) )
    -> "I had seen him [an hour before you arrived]."
```

Alas my model has not yet the means to predict the words in square brackets in these examples, and without including them it is difficult to illustrate the distinction here. But with the aid of these bracketed phrases we can drive it home by noting that, while `"I have already seen him"` is perfectly good English, `"I have seen him an hour ago"` is not. This is because the first example is a `PAST PRIOR` message that therefore has a corresponding `PRIOR` message (present by default), but the second is a `PRIOR PAST` message that has no `PRIOR` analogue. What the second has is a `PAST` analogue (arrived at by deleting the `PRIOR` elaboration), encoded as `"I saw him [an hour ago]"`.

With plain messages (which are present by default), and with the `PAST` and `PRIOR` elaborations, I can predict and explain a substantial portion of the uses of the finite forms of the verbs (more to come in the next two sections). I can predict and explain the ambiguity accessible to phrases like `"had seen"`, which encode both `PAST PRIOR` messages ("past perfect"), and `PRIOR PAST` messages ("past past"). And I can do all this without the need to posit a third "past past" tense. Two elaborations that can be applied in different orders are all that is needed.

Before moving on, a note on how the `PAST` and `PRIOR` elaborations interact with the `NEGATIVE` elaboration: they don't. They operate entirely independently of it. In other words, a `PAST NEGATIVE` message is identical to a `NEGATIVE PAST` message, and likewise for `PRIOR NEGATIVE` and `NEGATIVE PRIOR` messages. The same is not true of `PREORDAINED` messages, and on the whole talk about the future in English is a considerably more complicated affair than talk about the past. For this reason, among others, I have not labelled the `PREORDAINED` elaboration "`FUTURE`", since that would suggest a simple symmetry with the `PAST` elaboration, which does not hold, as we will see.

### 5.3. PREORDAINED and REGULAR Messages, part 1/2





The `PREORDAINED` and `REGULAR` elaborations are stucturally similar and exhibit many of the same features, though they are semantically very different. Both take two optional arguments alongside their input messages, a *displacer* and a *time* or *frequency* respectively:

```elm
type Message
    = ...
    | PREORDAINED (Maybe Displacer) (Maybe Time) Message
    | REGULAR (Maybe Displacer) (Maybe Frequency) Message
```

The displacer argument will be examined in the next section; for now, we will begin by looking at examples of these messages with no displacer. The 

### 5.4. DISPLACED Messages; PREORDAINED and REGULAR Messages part 2/2

The messages we have seen so far are all encoded in sentences containing only one base or finite form of a verb. Messages with ongoing or passive pivots, or messages with a `PRIOR` elaboration, contain more than one verb, but the additional verbs show up in the first or second participle form. There are however countless English sentences involving additional verbs in their base form, following the base or finite form of the main verb. And then there are



The `DISPLACED` elaboration is so-called because it displaces the pivot of its input message, introducing a new verb or a modal into the output sentence. For want of a better label, I term the additional informational variable in these messages a *displacer*. It can take one of two values, either a pivot (just like those already seen in plain messages) or a modality (more on the latter in due course):

```elm
type Message
    = ...
    | DISPLACED Displacer Message

type Displacer
    = Primary Pivot
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
```

Let us begin with some examples in which the displacer is another pivot (in keeping with my general abbreviating style, I do not bother to write `Primary` next to the pivots, since there can be no confusion):

```elm
DISPLACED Seem ( Male, ( Like, [ Female ] ) )
    -> "He seems to like her."

DISPLACED (Do "want") ( Others, ( Live, [ In, Other "France" ] ) )
    -> "They want to live in France."

DISPLACED (Be "able") ( Female, ( Do "see", [ Hearer ] ) )
    -> "She is able to see you."

DISPLACED (Do "have") ( Hearer, ( Do "believe", [ Speaker ] ) )
    -> "You have to believe me."
```

In these cases, the elaboration results in a new condition, a degree more complicated than the old one: *seeming to like* her instead of merely *liking* her; *wanting to live* in France as opposed to actually *living* there; and so on. The precise substance of these enriched conditions - enormously varied as it is, depending on the new pivot - is beyond the scope of my present theory. For now, some general remarks on the shared structure of these elaborations will have to suffice.

The first thing to note is that we can distinguish - indeed, must distinguish - between the time of the outer condition's satisfaction (the seeming to, the wanting to, the being able to, the having to) and the time of the inner condition's satisfaction (the liking, the living, the seeing, the believing). This being said, in `DISPLACED` messages that are otherwise unelaborated, the time of both is invariably present. This is partly a matter of observation, but partly a matter of theory. It is a matter of observation, potentially at odds with this claim, that in all but the first of the examples above the sentences are ambiguous, also admitting of an interpretation under which the time of the inner condition's satisfaction is *future*. But as a matter of theory, I do not diagnose these messages as `DISPLACED`, but as `PREORDAINED`, an elaboration I will discuss in the next two sections. One immediate reason for this diagnosis is that the ambiguity must be accounted for somehow, and it is plausible to account for it by positing distinct elaborations, elaborations which nevertheless coincide (in some circumstances) in the same output. Ultimately the case is holistic, however, depending on the overal success of the theory in which these two elaborations play their separate parts.





In the first two examples, the elaboration results in a new condition, a degree more complicated than the old: *seeming to like* her as opposed to liking her, and *wanting to live* in France as opposed to *living* there. In both cases, we can distinguish the time of the outer condition's satisfaction from the time of the inner condition's satisfaction: the time of the seeming versus the time of the liking; or the time of the wanting versus the time of the living. In `DISPLACED` messages that are otherwise unelaborated, however, the time of both things is present. The second sentence, it may be noted, is ambiguous between a `DISPLACED` interpretation (they want now to live in France now) and a present-future interpretation (they want now to live in France some time later) which will be diagnosed in the next section. This ambiguity is common in the outputs of `DISPLACED` messages, and the fact that it doesn't occur in the first sentence above seems to be the result of the meaning of "seem".

In both cases, the time of the outer condition's satisfaction is present. In the first case, the time of the inner condition's satisfaction (the liking) is also present, and it is 

In the second of these examples, we can distinguish between the time of the wanting and the time of the liking, and the sentence is ambiguous between a present-present reading (they want now to live in France now) and a present-future reading (they want now to live in France some time later).

### 5.3. REGULAR and PREORDAINED Messages (with no displacer)

English allows its speakers to talk about the future through what I call the `PREORDAINED` elaboration. I do not call it the "`FUTURE`" elaboration, since that would suggest a direct analogy with the `PAST` elaboration discussed in the previous section. But `PREORDAINED` messages are not merely future versions of `PAST` messages, and they are significantly more complicated. Here are the relevant type definitions, to be unpacked as we proceed:

```elm
type Message
    = ...
    | PREORDAINED (Maybe Displacer) (Maybe Time) Message

type Displacer
    = Primary Pivot
    | Secondary Modality

type Modality
    = SoftYes     -- WILL
    | HardYes     -- MUST
    | SoftMaybe   -- MAY
    | HardMaybe   -- CAN
    | SoftYesIsh  -- SHOULD
    | HardYesIsh  -- OUGHT
    | Dare        -- DARE
    | Permission  -- MAY
    | Command     -- SHALL

type alias time =
    String
```

The optional time variable, first of all, is currently just an alias for a string, meaning that here - as in other places - users must encode this component of their messages for themselves. More intiguing is the optional displacer variable; but let us start our examination of `PREORDAINED` messages with cases in which this variable is absent.

The first use of a `PREORDAINED` message is to convey something about a *prearrangement*. For example:

```elm
PREORDAINED "next summer" ( Others, Get Ongoing "married", [] )
    -> "They are getting married next summer."

PREORDAINED "tomorrow" ( Speakers, Do "see" Ongoing, [ Male ] )
    -> "We are seeing him tomorrow."
```

To be precise, these messages all convey something about a *present* prearrangement. The result of the `PREORDAINED` elaboration, in these cases, is to generate a new condition, one whose satisfaction entails the prearranged satisfaction of the old one. Thus we can subject these messages to a dose of the `PAST` elaboration, thereby conveying a message to the effect that there *was* some such prearrangement (with the implication, perhaps, that the plans have since changed):

```elm
PAST (PREORDAINED "next summer" ( Others, Get Ongoing "married", [] ))
    -> "They were getting married next summer." -- but now it's been postponed

PAST (PREORDAINED "tomorrow" ( Speakers, Do "see" Ongoing, [ Male ] ))
    -> "We were seeing him tomorrow." -- but something more urgent has just come up
```

Sometimes it is predetermination rather than prearrangement, as in `"The sun sets at 7.05pm tonight"`, but the essential idea is the same. And again, messages concerning the present satisfaction of predetermined conditions can be subjected to the `PAST` elaboration: `"The sun set at 7.05pm tonight"` (but that was according to the old timekeeping conventions/before the astroid knocked us into our new orbit/...).

Where plain messages are invariably about the present, and `PAST` messages are invariably about the past, it is a mistake to think that `PREORDAINED` messages without a displacer are about the future, at least in anything like the same sense. In the equivalent sense, they are about the *present*, just like plain messages

### 5.4. REGULAR and DISPLACED Messages

*[...]*

### 5.5. EXTENDED and SCATTERED Messages

The elaborations examined in this section share the interesting property of being *invisible*, in the sense that they have, in and of themselves, no effect on the output sentence. They each take an additional argument alongside their input message, and this argument does have a visible effect. Even with this extra argument, however, these invisible elaborations are the source of some striking English ambiguities when they interact with other elaborations, notably negation.

The `EXTENDED` elaboration, first, has the semantic effect of creating a message that entails the satisfaction of its input condition *over an extended period of time*, taking an additional argument specifying the *duration* of this period:

```elm
type Message
    = ...
    | EXTENDED Duration Message

type alias Duration =
    String
```

The elaboration itself, as I have said, has no effect on the sentence. The duration argument, meanwhile, results in an adverbial string appended to the end of the predicate. My model is presently unable to encode durations into adverbial strings; users must encode this argument for themselves. Thus here, as in several other places, the type is just an alias for a string. For example:

```elm
PAST (EXTENDED "for a year" ( Female "Susan", ( Do "study", [ ( In, Other "France" ) ] ) ))
    -> "Susan studied in France for a year."

PAST (EXTENDED "all day" ( Female "Grannie", ( Do "berate", [ Male "Victor" ] ) ))
    -> "Grannie berated Victor all day."
```

The `SCATTERED` elaboration, second, has the semantic effect of producing a message that entails the satisfaction of its input condition *on multiple separate occasions*, and its grammatical effect is likewise the appending of an adverbial string, which in this case encodes the *tally* of individual satisfactions:

```elm
type Message
    = ...
    | SCATTERED Tally Message

type alias Tally =
    String
```

As with the duration argument, my model is not currently able to encode tallies. The type is consequently just an alias for a string. Some examples:

```elm
PAST (SCATTERED "twice" ( Female "Susan", ( Do "go", [ ( To, Other "France" ) ] ) ))
    -> "Susan went to France twice."

PAST (SCATTERED "fifteen times" ( Female "Grannie", ( Do "fall", [ Down ] ) ))
    -> "Grannie fell down fifteen times."
```

`EXTENDED` and `SCATTERED` messages are not discovered in the wild except when they have been further modified with a `PAST` elaboration (as in the examples above), or some other elaboration that prevents them from amounting to an affirmation concerning the present. This is for the obvious reason that the present is an instant, and `EXTENDED` and `SCATTERED` conditions necessarily require a *region* of time in which to be satisfied.

When negating an `EXTENDED` or a `SCATTERED` message, the result is a negation of the duration or tally, not of the underlying condition itself. In order to negate the underlying condition, the `NEGATIVE` elaboration must be applied *before* the `EXTENDED` or `SCATTERED` elaboration. With this point in mind, I can now be clearer about my solution to the puzzle I posed about negation in section 4.1. Recall the ambiguous sentence:

```elm
"I was not busy all day."
```

I diagnose the first reading, in which the speaker is affirming that she was free all day, as a `PAST EXTENDED NEGATIVE` message, where the idea of being busy is first negated, then extended to the whole day, and then that resulting message consigned to the past:

```elm
PAST (EXTENDED "all day" (NEGATIVE ( Speaker, ( Be "busy" ) )))
```

The second reading, in which the speaker is denying that she was occupied all day, is instead a `PAST NEGATIVE EXTENDED` message:

```elm
PAST (NEGATIVE (EXTENDED "all day" ( Speaker, ( Be "busy" ) )))
```

Needless to say, the order in which the `NEGATIVE` and `EXTENDED` elaborations is applied has a notable semantic effect. But it has no grammatical effect: the output sentence is the same either way.

The very same ambiguity arises through the interaction of the `NEGATIVE` elaboration with the `SCATTERED` elaboration, though typically the `NEGATIVE SCATTERED` interpretation will seem more natural than the `SCATTERED NEGATIVE`, because it may often be hard to make sense of an occasion on which something *didn't* happen. English speakers will likely read `"Grannie didn't fall down fifteen times"` as a precusor to saying, for example, that she took only *fourteen* tumbles. Suppose, however, that she went for a walk last Thursday, faltering fifteen times but always remaining on her feet. Then one would have a natural use for the `PAST SCATTERED NEGATIVE` as well as the more common `PAST NEGATIVE SCATTERED`.

### 5.6. INDIRECT, ENUMERATED, and AMASSED Messages

*[...]*
