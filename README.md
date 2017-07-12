# Victor

A model of the English language, thought of as a code for processing *messages* (structured arrangements of informational and stylistic choices) into *sentences* (strings of words). Inspired by the work of grammarian and logician Victor Howard Dudman. Read on for an outline of the theory, or play around with the current version at  [https://merivale.github.io/victor/](https://merivale.github.io/victor/).

## 1. The Point

Modern philosophical semantics treats languages as functions from strings to messages, routinely enquiring after "the rules that determine the meaning of a sentence". This forces its practitioners into an uncomfortable theoretical position, in which ambiguous sentences are, from the semantic point of view, impossible (because functions, of course, can assign only one output to every input). This may be fine for unambiguous artificial languages, but since the sentences of natural languages are typically rife with ambiguity, philosophers have no option but to offer syntactic or pragmatic accounts of this - as they see it - messy and unwelcome feature of the real world. I argue (though not here) that these accounts are unsatisfactory. What we need are *semantic* explanations of ambiguity.

By modelling languages as codes, i.e. as functions in precisely the *opposite* direction, semantic explanations of ambiguity become possible. The explanation in general is that the encoding function of an ambiguous language is not one-to-one, but many-to-one. In other words, ambiguous languages are *lossy* codes, which do not preserve in their output strings all of the information in their input messages. More than this, however, by articulating the English function, we should be able to see precisely how and why various English ambiguities arise. See section 4 below for examples.

## 2. The Source

My algorithm is written in [Elm](http://elm-lang.org/), with the styles written in [Less](http://lesscss.org/). The compiled HTML+JS+CSS is stored in the gh-pages branch, for easy integration with [GitHub Pages](https://pages.github.com/). The `src` directory contains the main program module, which simply pulls everything together (nothing to see there), and two subdirectories, `Interface` and `Theory`. The former directory contains all the modules responsible for generating the web page users see, for keeping track of user input, and for piecing that input together into a `Message` variable. It is the modules in the latter directory that are potentially of theoretical interest, since they describe what a `Message` variable looks like, and define the encoding functions that convert these variables into strings.

There is no need to go into detail about the `Theory` modules here. Anyone interested in the nuts and bolts should simply read the code itself. It is internally documented, and is intended to be intelligible to anyone of a suitably logical turn of mind (although obviously some experience of functional programming would help). Indeed, I consider it a major selling point of my theory that it is computationally very simple, with only as much complexity as the empirical data demand. Readers should start with the `Types` module for my account of `Messages` (and their components), and then glance at the `Words` module. This latter contains a few small functions for generating words and their various forms, not very interesting in itself, but perhaps helpful in serving to solidify an understanding of the grammatical terminology that I use.

Next, readers should look at the `Sentences` module, which contains the encoding function itself, the function for processing messages into sentences. This function divides into two stages. In the first stage, the message is validated, and the variables that have a bearing on the output sentence are extracted; in the second stage, those variables are used to generate the sentence. The second stage is implemented in the `Sentences` module itself (with help from the little functions exposed by the `Words` module). The first stage is handled by the separate `Messages` module.

I have not yet written any tests, but there is a stub `test` directory as a placeholder for later development in this direction. From the point of view of the theory (never mind the interface), it would be helpful to have tests that run various `Message` variables through my encoding function, and check that the resulting strings are as they should be.

## 3. The Theory Part 1/2: The Nucleus

<<<<<<< Updated upstream
The overarching hypothesis behind my model is that every atomic English message is made up out of a series of zero or more *elaborations* applied to a core *nucleus*. (The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.) Consequently my theory as a whole consists of two interlocking theories: a theory of plain English messages (i.e. those messages composed of an unelaborated nucleus), and a theory of English elaborations. Naturally enough, I will start with the first.
=======
My labels for these forms are idiosyncratic. People will likely know the third direct form as the *reflexive* form, for example, and the first relative form as the *possessive* form. I dislike the second of these terms, since the first relative form does not signal the relation of possession in particular, but simply the idea of a relation more generally (see section 5.7 below). The first, however, seems harmless enough. Nevertheless, I have a general preference for bland terminology that doesn't assume or imply too much at the level of interpretation.
>>>>>>> Stashed changes

The nucleus of every English message is an ordered pair, containing an *object* and a *condition*, and a plain message affirms the present satisfaction of the condition by the object:

<<<<<<< Updated upstream
    type alias Nucleus =
        ( Object, Condition )

For example, and using some very crude representations of objects and conditions for now:

    ( Victor, love Grannie )
        -> "Victor loves Grannie."
    
    ( Grannie, live at Cockroach Lane )
        -> "Grannie lives at Cockroach Lane."

There should be nothing surprising here. The object/condition distinction at the level of the message corresponds exactly to the familiar subject/predicate distinction at the level of the sentence. In this respect, my theory is positively boring. Things get more interesting as we start to chip away at the nature of objects and conditions themselves.
=======
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

At first blush, readers will recognise the first and second finite forms as the "present tense" and "past tense" forms respectively. I strongly oppose this loaded terminology, since it is a matter of considerable controversy what these forms signify, and whether it is (or whether it is always) temporal information. It is better to settle at the outset on some semantically neutral labels. I said *at first blush*, moreover; in fact, the "present tense" standardly refers to a *dual* form, which (in my terms) sometimes looks like the base form, and sometimes looks like the first finite form. There is of course a very natural reason for this grouping: `"I like you"` and `"He likes you"` encode messages that differ only in respect of who is doing the liking. But the fact that the base form can be used in this way, as informationally equivalent to the first finite form, is itself very striking, and it demands an explanation. Talk of a dual "present tense" form serves only to hide this curious feature of English; as though the `"like"` in `"I like you"` was not really the base form of the verb at all, but a finite form that merely happens to look like the base form.

The uniquely awkward verb **`"be"`** is like any other verb in its base form and participle forms (`"be"`, `"being"`, `"been"`), but instead of two finite forms it has five: `"am"`, `"is"`, `"are"`, `"was"`, and `"were"`. The second of these corresponds to the first finite form of other verbs, while the last two correspond to the second. The first and third have no exact analogues in the other verbs, but correspond to the familiar "present tense" use of the base form. I expect an explanation of this verb's uniquely irregular behaviour. In other words, I expect an account of the English code to locate the meaning of **`"be"`** alongside the meanings of the other verbs, but also somewhat distinct from them; there ought to be some underlying difference that sustains the irregularity.

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

Every plain English message, I submit, affirms the present satisfaction of the condition by the object, and is encoded in a sentence containing either the base form or the first finite form of the verb (or one of the first finite forms, in the case of **`"be"`**). (The decision between these forms depends straightforwardly on the object, and encodes no additional information.) This constitutes the first principle in my unified theory of tense for English. That the present is the default time in the English predication system is suggested by the use of the base form of the verb for such affirmations. Ultimately, however, the evidence for this claim is holistic, and derives from the success and simplicity of my theory as a whole.

The various (apparently) non-present uses of the base and first finite form will mostly be handled by my theory of elaborations. One of them, however, can be dealt with right away: its use in conveying apparently "timeless" affirmations concerning mathematical or conceptual affairs. Consider for example the natural interpretations of the following sentences:

```elm
"Two plus two equals four."
"A vixen is a female fox."
```

I diagnose these as plain messages (actually the second is elaborated, but not in such a way as to affect its temporal components; see section 5.7). Consequently I insist that they are still affirmations about the *present*. It is simply that sensible readers *ignore* this temporal information, knowing full well that it is irrelevant. The alternative to this refreshingly straightforward account is to posit a class of *genuinely* timeless affirmations in English, which are encoded (ambiguously) in the very same sentences that encode their corresponding present affirmations. But this - surprisingly popular - view is needlessly complicated, and not supported by the data. Why introduce a whole new class of message, and a whole new subroutine to encode it, when we can simply use the resources already in place? The question is intended to be rhetorical; but in any case, the fact that the output sentences are identical indicates fairly clearly that we *didn't* do this.
>>>>>>> Stashed changes

### 3.1. Objects

There are three types of objects available in English, each of which comes in either a singular or plural form (represented in my model by a boolean argument, `False` for singular and `True` for plural):

    type Object
        = Speaker Bool
        | Hearer Bool
        | Other Bool (Maybe Sex) (Maybe String)
    
    type Sex
        = Male
        | Female

The `Speaker` and `Hearer` objects are encoded in the pronouns `"I"`, `"we"`, and `"you"`. (`"You"` is ambiguous between the singular and the plural, though the singular and plural `Hearer` objects do distinguish themselves in other contexts, when they show up as `"yourself"` and `"yourselves"` respectively.) By default, the `Other` object is encoded in the pronouns `"it"`, `"he"`, `"she"`, and `"they"` (I trust the influence of the optional `Sex` argument here is self-explanatory). In the case of `Other` objects only, English has room for an optional string argument. This argument is intended to house a proper name (`"Victor"`, `"Grannie"`, `"France"`, etc.), which overwrites the default pronoun. There is no restriction in the English code on what can count as a proper name; the only rule is that it should begin with a capital letter.

<<<<<<< Updated upstream
When referring to objects in what follows, I will adopt the following abbreviating conventions. Rather than write `Speaker False` and `Speaker True`, I will write `Speaker` and `Speakers` respectively; similarly for `Hearer(s)` and `Other(s)`. When the optional sex and string arguments are not present, I will simply omit them, instead of explicitly writing `Nothing`. And when they are present, I will simply write them on their own, as `Male` or `Female` instead of `Just Male` or `Just Female`. Finally, when the sex variable is present, I will not bother to write `Other` in front of it. For example:
=======
type Sex
    = Male
    | Female
```

The `Speaker` and `Hearer` objects are encoded in the first and second person pronouns respectively. By default, the `Other` object is encoded in the third person pronouns (I trust the influence of the optional `Sex` argument here is self-explanatory). However, English also has room for an optional string argument in this case, a proper name that overwrites the default pronoun. There is no restriction in the English code on what can count as a proper name; the only rule is that it should begin with a capital letter.

(For readers unfamiliar with this style of programming, a `Maybe x` variable can take one of two values: `Nothing` or `Just x`. The `Nothing` value acts like the `null` value used in some other programming languages. The difference is that, in languages that allow `null` as a value, *any* variable can take that value, making every value effectively optional. In Elm, as in Haskell, optional variables must be explicitly defined as such with `Maybe`.)

When referring to objects in what follows, I will adopt the following abbreviating conventions. Rather than write `Speaker False` and `Speaker True`, I will write `Speaker` and `Speakers` respectively; similarly for `Hearer(s)` and `Other(s)`. When the optional sex and string arguments are not present, meanwhile, I will omit them, instead of explicitly writing `Nothing`. And when they are present, I will write them on their own, as `Male` or `Female` instead of `Just Male` or `Just Female`. Finally, when the sex variable is present, I will not bother to write `Other` in front of it. For example:
>>>>>>> Stashed changes

| Abbreviation       | Full Meaning                                 |
| ------------------ | -------------------------------------------- |
| `Speaker`          | `Speaker False`                              |
| `Hearers`          | `Hearer True`                                |
| `Male`             | `Other False (Just Male) Nothing`            |
| `Female "Grannie"` | `Other False (Just Female) (Just "Grannie")` |
| `Others`           | `Other True Nothing Nothing`                 |

<<<<<<< Updated upstream
I hope these conventions are all intuitive and easy to understand. The point of adopting them is just to make the examples that follow easier on all of us. I will introduce similar conventions with regard to the writing out of conditions, once we have started unpacking their component parts.
=======
I hope these conventions are all intuitive and easy to understand. The point of adopting them is to make the examples that follow easier on all of us. I will adopt similar conventions with regard to the writing out of conditions, once I start unpacking their component parts.

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

There are 31 relators in my model at present (I didn't bother listing them all above). This list is incomplete, but it accounts for many common prepositions. My model does not currently contain any properties or adjectives, meanwhile, and consequently the *property* type is just an alias for a string. What this means in practice is that users are obliged to encode their properties for themselves, inputting the resulting adjective directly into the system. I call values for which this is the case *unearthed* variables; as we will see, there are a few more of these in my model. I will say something more general about unearthed variables in section 4.4 below.

Going back to the start of the condition, we have the pivot. The pivot determines the choice of verb at the start of the predicate, and can take one of two values:

```elm
type Pivot
    = Be Bool
    | Do Verbality Bool Bool

type alias Verbality =
    String
```

The `Be` pivot, unsurprisingly, triggers selection of the verb **`"be"`**, with the form of this verb being determined by the main object of the nucleus, according to the following schema:

| Object      | Form    |
| ----------- | ------- |
| Speaker     | `"am"`  |
| Other       | `"is"`  |
| *otherwise* | `"are"` |

The boolean argument this pivot takes indicates whether or not the condition as a whole is *ongoing*; when set to true, this introduces the participle form `"being"` immediately after the finite form as determined by the object. It underlies the difference between, for example, `"He is silly"` and `"He is being silly"`.

If there is an English condition comprising nothing other than the `Be` pivot, then it is the condition of existence; as in the standard translation of Descartes' famous claim, `"I think, therefore I am"`. For what it's worth, I myself find it hard to interpret sentences like `"I am"` or `"They are"` as encoding existential claims. Such semi-sentences seem to me to demand the response, *are what?* And so I am tempted to say that there is no English condition comprising the `Be` pivot on its own, and that the proper translation of Descartes is `"... therefore I exist"`. But my intuition is not shared by all English speakers, and I needn't insist on the point.

At any rate, there are certainly plenty of English conditions made up of the `Be` pivot together with a counter. When the counter is a property, the condition is that of having that property:

```elm
( Speaker, ( Be, "hungry" ) )
    -> "I am hungry."

( Hearer, ( Be, "silly" ) )
    -> "He is silly."

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

(I am adopting some more abbreviating conventions here: Instead of `Just (CounterProperty "hungry")` I write `"hungry"`, and instead of `Just (CounterRelator Out)` I write `Out`. When there is no counter, I omit it, instead of writing `Nothing`. When there are no balances, similarly, I omit the list variable altogether, instead of writing `[]`. When the *ongoing* boolean argument is `False`, finally, I omit it, and when it is `True` I write it as `Ongoing` instead, so readers don't have to remember what its purpose is.)

Not every condition involving the `Be` pivot can be made ongoing. It is only those for which some intelligible distinction can be made. `"I am being up"` is not a sentence of English, presumably because there is no way in which its interpretation might differ from that of `"I am up"`. In contrast, `"He is being silly"` is perfectly fine, and marks an important informational difference from `"He is silly"`. The former conveys something about his present behaviour, while the latter conveys something about his present character.

The `Do` pivot is essentially my catch-all variable for every other pivot expressible in the English language. The *verbality* variable is intended to capture the choice that determines the verb. For now it is another unearthed variable like the *property* variable; i.e. it is just an alias for a string. My system generates the appropriate *form* of the verb for your message, but you need to supply the verb yourself (in its base form, e.g. `"eat"`, `"dance"`, `"live"`). The form is then determined by the object: the first finite form in the case of the `Other` object singular, and the base form otherwise.

Following the verbality, there is a boolean argument representing whether or not the condition in question is ongoing, exactly as it does with the `Be` pivot; this underlies the difference between, for example, `"She lives"` and `"She is living"`. The second boolean argument, not available for the `Be` pivot, indicates whether the condition as a whole is *passive* or not; this accounts for the difference between, for example, `"She eats"` or `"She is eating"` on the one hand, and `"She is eaten"` or `"She is being eaten"` on the other.

Some `Do` pivots (though not many) can support properties much like the `Be` pivot; for example:

```elm
( Female, ( Do "seem", "hungry" ) )
    -> "She seems hungry."
>>>>>>> Stashed changes

### 3.2. Conditions Part 1/2: Balances

English conditions, in my model, break down into a *pivot* and a (possibly empty) list of *balances*:

    type alias Condition =
        ( Pivot, List Balance )

Very approximately, and just to set us of on the right foot, the pivot is what gets encoded in the verb at the start of the predicate, while the balances (if any) are what get encoded in the words following that verb. Balances typically are or include additional objects, which I will refer to as *balancing* objects, as opposed to the *main* object that resides next to the condition in the nucleus itself. Balancing objects are variables of exactly the same type as the main object, though in this position they fetch up in different forms of the corresponding pronoun: `"him"` instead of `"he"`, `"her"` instead of `"she"`, `"us"` instead of `"we"`, and so on.

I will examine pivots more closely in the next section. For now, we can continue with the approximation that they are encoded in the verb at the start of the predicate, and I will restrict myself to examples for which this is true. Since objects are already familiar, it will perhaps be easier to unpack the notion of a balance first.

A balance consists of either a *counter* or a *weight* (or both), where the counter is something encoded in a preposition, and a weight is either a pointer back to the main object of the nucleus, or a distinct object:

<<<<<<< Updated upstream
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
=======
Many `Do` pivots, as we will see in the next section, support balances as well. In general, there is little to say about the semantics of `Do` pivots. They are considerably varied. There are tens of thousands of them, and the study of them is an enormous subject in its own right (not attempted here).

One thing to say in general is that the satisfaction of some conditions with `Do` pivots necessarily *takes time*, and that for this reason the `Ongoing` flag is typically called for when these pivots occur in unelaborated messages: `"They are eating out"` rather than `"They eat out"`. The latter sentence has a perfectly sound interpretation (concerning their general habits), but it is an elaborated message; see section 5.3.
>>>>>>> Stashed changes

There are currently 31 counters in my model, though I didn't bother listing them all above. The full list of 31 is anyway incomplete, but accounts for the most common prepositions. When the weight has the `SameObject` value, the result is a reflexive pronoun like `"myself"`, `"yourself"`, `"yourselves"`, with the pronoun in question being determined by the main object of the nucleus. (It is in this context, as noted above, that the distinction between singular and plural `Hearer` objects reveals itself.) When it has the `Different` value, the additional object argument determines the pronoun, which shows up in a form like `"me"`, `"him"`, `"her"`, etc.

<<<<<<< Updated upstream
When referring to balances from now on, I will adopt - in addition to the abbreviating conventions already outlined for objects - a few more such conventions in the same spirit. Whenever a counter or a weight is absent, I will simply omit it, rather than explicitly write `Nothing`; and when it is present, I will simply write it on its own, as e.g. `Against` instead of `Just Against`. When the weight is a different object, I will not bother explictly writing `Different`, but write the object on its own (abbreviated as before). And finally, when a balance contains only a counter or only a weight (not both), I will drop the brackets around it. For example:
=======
A balance consists of a *weight*, optionally preceeded by a *relator*. Relators we have already met (they are encoded in prepositions). Weights, meanwhile, are essentially just objects like the main object of the nucleus, with the added possibility that they may refer back to the main object itself (in which case they generate the third direct form of the pronoun, `"myself"`, `"yourself"`, `"themselves"`, etc.):

```elm
type alias Balance =
    ( Maybe Relator, Weight )

type Weight
    = SameAsMain
    | Different Object
```

For clarity, I will distinguish where necessary the *main* object of the nucleus from any *balancing* objects in the list of balances.

Some more abbreviating conventions relating to balances, and to conditions as a whole: Whenever a relator is absent, I will omit it, rather than explicitly writing `Nothing`; and when it is present, I will write it on its own, as e.g. `Against` instead of `Just Against`. When the weight is not the same as the main object, I will not bother explictly writing `Different`, but write the object on its own (abbreviated as before). And finally, when a balance contains only a weight (i.e. no relator), I will drop the brackets around it. For example:
>>>>>>> Stashed changes

| Abbreviation                  | Full Meaning                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `Out`                         | `( Just Out, Nothing )`                                                        |
| `Others`                      | `( Nothing, Just (Different (Other True Nothing Nothing)) )`                   |
| `( Behind, Hearer )`          | `( Just Behind, Just (Different (Hearer False)) )`                             |
| `( For, SameObject )`         | `( Just For, Just SameObject )`                                                |
| `( With, Female "Grannie" )`  | `( Just With, Just (Different (Other False (Just Female) (Just "Grannie"))) )` |

If it wasn't clear before, I trust this table illustrates the benefits of conventions like these. I adopt them not just to save space, but to make my examples easier to read and understand.

And now for some examples themselves, with a view to solidifying the understanding of balances:

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

At this point I must issue a major disclaimer. It should go without saying that my theory is incomplete and in need of further development and refinement. Nowhere is its partial nature more evident, however, than in its failure to provide any kind of validation whatsoever for conditions. In the construction of a balance, it allows users to combine any counter with any (or no) object; while in the construction of a condition itself, it allows any balances to be appended to any pivot. Consequently it is possible - let me not mince words - to generate complete nonsense within my system. For instance:

<<<<<<< Updated upstream
    ( Male "Victor", ( love, [ At, ( Behind, Female "Grannie" ), For ] ) )
        -> "Victor loves at behind Grannie for."
    
    ( Female "Grannie", ( live, [ Speaker, Hearer, ( Over, SameObject ) ] ) )
        -> "Grannie lives me you over herself."

What this means, practically speaking, is that my theory of plain English messages predicts whole swathes of messages that an accurate theory should not predict, messages that are incoherent and which - when fed through my encoding function - result in strings of words that are not grammatical sentences of English.
=======
There are two immediately obvious inadequacies, namely that my theory does not cover all of the ground (there are sentences that it cannot account for), and that, even in the ground that it does cover, it leaves some things unearthed (the properties and verbalities that users are currently obliged to encode for themselves). These are both relatively untroubling. If you'll excuse the change of metaphor, neither of them indicate that I am on the wrong track; they merely remined us that - of course - I have yet to reach the end of that track. While I am here, I may add that precisely the same limitations apply to my theory of elaborations too: there are many elaborate messages that my system cannot encode, and with the ones that it does encode, it still relies on users encoding certain unearthed variables for themselves.

In developing my theory in the future, I will naturally want to dig up some of the presently unearthed variables. In some cases, however, I will be in no great hurry to do so. It seems to me that there is nothing particularly puzzling or intriguing, from a theoretical point of view, about properties and the way in which they are encoded into adjectives, and uncovering this variable would simply be a matter of giving my system an enormous dictionary. The same is true of what I call *categories* (which are encoded into nouns), another unearthed variable that we will meet in my theory of elaborations (section 5.7). And the same is mostly true of verbalities, except that in their case unearthing would be necessary for the implementation of any validation checks on conditions (see the end of this section).

Returning to the uncovered ground, here is a very simple example of a plain message beyond the scope of my present model:
>>>>>>> Stashed changes

Obviously this is a very serious inadequacy, and I make no attempt to shy away from that fact. I am not, however, in any great hurry to develop my theory further in this direction, and to write in constraints on what counts as a valid condition, for two reasons. First, the task is quite simply an enormous one, requiring the collation of tens of thousands of pivots, noting - just for starters - how many balances each of these can accompany, and which counters are needed or allowed within these balances. It is not a task for one person alone. Secondly, although I would by no means wish to belittle the value of this endeavour, my own interests currently lie elsewhere, in the theory of English elaborations. I offer this - very rough and ready - theory of plain messages predominantly just so that I have a basis on which to build this latter theory. I am anticipating that my critics will share this bias, and therefore show me some leniency with regard to the generation of conditions.

### 3.3. Conditions Part 2/2: Pivots

[My model was recently changed significantly (13/06/2017), rendering the notes that used to be here largely obsolete. I am in the process of updating them, and will post them back here soon.]

## 4. The Theory Part 2/2: The Elaborations

The idea of a message elaboration is itself nothing new; philosophers and logicians will recognise it as a propositional operator by another name. I avoid this more familiar terminology partly in deference to Dudman (the "nucleus"/"elaboration" terminology is his), and partly to avoid unwanted connotations from the last hundred years or so of semantic and logical enquiry. While there is a degree of overlap, the elaborations that I posit are in general rather different from the kinds of operators philosophers are familiar with. And this, in turn, is because my approach is so different. Always my aim is to *explain the sentences* that English speakers produce, rather than to capture the logical entailments of English messages in any formal system.

<<<<<<< Updated upstream
There are currently 11 elaborations posited by my model. This list is no doubt incomplete, but it represents - or so I hope - a decent start. Though it will not make much sense up front, here is the full type definition for messages (details of the individual elaborations to follow):

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

The definition is of course recursive, reflecting the fact that the elaborations can all be applied on top of each other, presumptively without limit or restriction. In fact there are some combinations that English rules inadmissible, but not many (details as we come to them below). Rather than write a more convoluted type definition that makes these combinations impossible, I have instead written some validation checks into the encoding function itself (see the `Messages` module). The function returns an error in cases of such invalid input.

* * *

[My model was recently changed significantly (13/06/2017), rendering the notes that used to be here largely obsolete. I am in the process of updating them, and will post them back here soon.]
=======
Since elaborations are so central to my theory, I adopt the convention of writing them in ALLCAPS, so as to render them easily distinguishable from the other aspects of my system. There are currently 12 elaborations posited by my model. This list is no doubt incomplete, but it represents - or so I hope - a substantial start. Though it will not make much sense up front, here is the full type definition for messages (details of the individual elaborations to follow):

```elm
type Message
    = Plain Nucleus
    | NEGATIVE Message
    | PAST (Maybe Time) Message
    | PRIOR Message
    | REGULAR (Maybe Frequency) Message
    | PREORDAINED (Maybe Time) Message
    | EXTENDED Duration Message
    | SCATTERED Tally Message
    | MODAL Modality Message
    | DISPLACED Pivot (Maybe Counter) Message
    | INDIRECT Int Description Message
    | ENUMERATED Int Multiplicity Message
    | AMASSED Int Proportion Message
```

The definition is of course recursive, reflecting the fact that the elaborations can all be applied on top of each other, presumptively without limit or restriction. In fact there are some combinations that English rules inadmissible, but not many (details as we come to them below). Rather than write a more convoluted type definition that makes these combinations impossible, I have instead written some validation checks into the encoding function itself (see the `Messages` module). The function returns an error in cases of such invalid input.

The elaborations that I posit all have what I call *global scope*, but *local influence*. By this I mean that they all operate on messages as a whole (global scope), but that their semantic effect invariably applies only to one particular component of the message (local influence): sometimes the object, sometimes the condition, sometimes an extra-nuclear argument introduced by a previous elaboration, and in a few cases the time of the condition's satisfaction. I will refer to this as the *target* of the elaboration. (Because of this local influence, it is often convenient to refer to an elaborated *something*, where that something is the target rather than the message as whole.) It is an interesting question whether English has elaborating devices that are local in scope as well as influence. I should not like to say with any certainty that it does not; the hypothesis, it seems to me, certainly merits further investigation.

However that may be, I insist that the elaborations I have diagnosed thus far really do have global scope, notwithstanding their local influence. There are two main reasons for this. First, one and the same elaboration may affect a *different* component of its input message, depending on how that message has been elaborated previously. Where I have one globally scoped elaboration with varying local influence, therefore, the alternative would not only require *multiple* locally scoped elaborations, but also a suite of additional validation rules restricting the use of these elaborations. Secondly, the order in which elaborations are applied is typically a matter of considerable semantic significance, even when the elaborations target separate parts of the message. A `PAST INDIRECT` message, for example, is importantly distinct from its corresponding `INDIRECT PAST` message (see section 5.7 below). If we treat these elaborations as having local scope, we lose the ability to represent the order in which they are applied, and therefore have no way of representing this difference. It would of course be perfectly possible to represent the order in which locally scoped elaborations are applied in some other way. But again, that would introduce more complexity into the system. Overall, a model with globally scoped elaborations is simpler, covering the same ground with less convoluted machinery.

### 5.1. PAST and PRIOR Messages

A plain English message, recall, affirms the present satisfaction of the condition by the object. I explain talk of multiple satisfactions, and past or future satisfactions, with my theory of elaborations. The nature of these elaborations, and the way in which they interact, is one of the most intriguing features of the English code. The semantic results can be extremely complex and sophisticated, but it is all acheived - at least if my theory is correct - through the coordination of devices that are themselves beautifully simple. I can take only a fraction of the credit here: though I fancy I have made some improvements to his model, the core insights here are all taken over from Dudman.

Things need to be introduced in manageable chunks. I will begin, in this section, with a look at the `PAST` and `PRIOR` elaborations, which make talk about the past possible. Here are the relevant parts of the type definitions:

```elm
type Message
    = ...
    | PAST (Maybe Time) Message
    | PRIOR Message
    | ...

type alias Time =
    String
```

The syntactic effect of the `PAST` elaboration is to replace the base or first finite form of the main verb with its corresponding *second* finite form (or, in the case of **`"be"`**, with *one* of its second finite forms, the form in question being determined by the object). Its semantic effect, meanwhile, is to indicate that something is past, something that would otherwise - by default - be present. What that something is, as we shall see, varies from case to case. Typically, however, and at any rate in the case of plain messages, what it changes is the time of the condition's satisfaction by the object. For example:

```elm
PAST ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie left me."

PAST "last year" ( Others, ( Do "go", [ To, Other "America" ] ) )
    -> "They went to America last year."
```

(To be clear, I adopt another abbreviating convention here and hereafter: I do not bother to write `Plain` in front of the nucleus.) The optional *time* argument, obviously enough, serves to specify the time of the condition's satisfaction with more precision. At present, this argument is another unearthed variable, that users are obliged to encode for themselves.

Going by its grammatical effect, the `PRIOR` elaboration is easily distinguished from the `PAST` elaboration. Where the latter swaps the base or first finite form of the main verb for its second finite form, the former swaps it for the corresponding form of the verb **`"have"`**, followed by the second participle form of the original verb:

```elm
PRIOR ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
    -> "Grannie has left me."

PRIOR ( Others, ( Do "go", [ To, Other "America" ] ) )
    -> "They have gone to America."
```

Grammarians standardly call this the "perfect". While its effect on the sentence is easy to see, it is harder to say what the underlying informational trigger is, and in particular how exactly this trigger differs from the `PAST` elaboration, to which it bears a very obvious resemblance. (It is surely no coincidence that the second finite form and the second participle form are identical for all regular verbs.)

One difference, immediately visible in my type definition for messages, is that the `PRIOR` elaboration does not take an additional *time* argument. In support of this, note that `"They have gone to America last year"` is not a sentence of English. Admittedly one can say, for example, `"I have eaten this morning"`. However, one can only say this while it is still morning, when `"this morning"` consequently signals the present rather than the past; as it does in, for instance, `"I am hungry this morning"`. One can also say things like, `"They have already been to America"`, but `"already"` here cannot be the result of an additional argument to the `PRIOR` elaboration, since it also arises without that elaboration (`"They already left for America"`). In both cases, therefore, the additional words - `"this morning"` and `"already"` - cannot be owing to any additional argument to the `PRIOR` elaboration itself. My model does not yet account for these words, but my assumption is that they will each be accounted for by an additional elaboration.

(To get a little ahead of myself, and somewhat speculatively, perhaps we need a `PRESENT` elaboration whose sole purpose is to allow for the introduction of a more precise specification of the present time of the condition's satisfaction. It would need to be incompatible with the `PAST` elaboration, of course, but not with the `PRIOR` elaboration. And then perhaps we need a - let's say - `PREVIOUS` elaboration, responsible for the introduction of the adverb `"already"`. This would of course be incompatible with `PRESENT` or plain messages, but a common companion of the `PAST` and `PRIOR` elaborations alike.)

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

With plain messages (which are present by default), and with the `PAST` and `PRIOR` elaborations, I can predict and explain a substantial portion of the uses of the finite forms of the verbs (more to come as we proceed). I can predict and explain the ambiguity accessible to phrases like `"had seen"`, which in general can encode both `PAST PRIOR` messages ("past perfect"), and `PRIOR PAST` messages ("past past"). And I can do all this without the need to posit a third "past past" tense. Two elaborations that can be applied in different orders are all that is needed.

### 5.2. PREORDAINED Messages

At this juncture one might expect me to introduce a `FUTURE` elaboration, as a direct analogue to the `PAST` elaboration, whose purpose is to locate the time of the underlying condition's satisfaction in the future. Talk about the future in English, however, is a more complicated affair than talk about the present or the past, and there is in my view no such straightforwardly symmetric elaboration. The `PREORDAINED` elaboration, to be examined in this section, is the closest thing to a `FUTURE` elaboration in my system. If anything, however, it has a closer symmetry with the `PRIOR` elaboration, insofar as it locates the satisfaction of a condition as future *with respect to some other point*. It does this, moreover, by generating a new condition. But there is yet more to this elaboration, that outstrips anything observed in the `PRIOR` elaboration, as we will see.

Here are the relevant parts of my type definitions:

```elm
type Message
    = ...
    | PREORDAINED (Maybe Time) Message
    | ...

type alias Time =
    String
```

The `PREORDAINED` elaboration generates a new condition, one whose satisfaction entails that the satisfaction of the underlying condition is either prearranged or predetermined for some later time (the label "preordained" is intended to capture what these two more specific notions have in common). The time in question can optionally be specified with the *time* argument, which is the very same unearthed variable that we saw in the case of `PAST` messages. Typically, of course, it will be a time in the *future* rather than the past; though that, as we will see, is not universally the case.

The `PREORDAINED` elaboration is most common in the case of prearrangments; for example:

```elm
PREORDAINED "tomorrow" ( Speaker, ( Be, "busy" ) )
    -> "I am busy tomorrow."

PREORDAINED "next month" ( Others, ( Do "get" Ongoing, "married" ) )
    -> "They are getting married next month."

PREORDAINED "at dawn" ( Speakers, ( Do "attack" ) )
    -> "We attack at dawn."
```

As noted, however, it also shows up in claims concerning predetermination; for instance:

```elm
PREORDAINED "tomorrow" ( Other, ( Be, [ Other "Tuesday" ] ) )
    -> "It is Tuesday tomorrow."

PREORDAINED "at 7.05pm tomorrow" ( Other "the sun", ( Do "set" ) )
    -> "The sun sets at 7.05pm tomorrow."
```

(I am here treating `"the sun"` as a proper name, because I have not yet explained the part of my model that allows us to generate it as a definite description; see section 5.7.)

It is important to be clear that these are all claims about *present* prearrangements or predeterminations. While these messages are about the future, therefore, they are about the future only *indirectly*. First and foremost, they are about the *present*: present prearrangements or predeterminations *for* the future. In this respect, as I have already advertised, the `PREORDAINED` elaboration is much more like the `PRIOR` elaboration than it is like the `PAST` elaboration. It locates something as future *with respect to something else*, via the generation of a new condition. And just as it is possible to have `PAST PRIOR` messages, it is also possible to have `PAST PREORDAINED` messages, which are claims about *past* prearrangements or predeterminations that are, by implication, no longer present:

```elm
PAST (PREORDAINED "next month" ( Others, ( Do "get" Ongoing, "married" ) ))
    -> "They were getting married next month."  -- but there was a problem with the venue and it's had to be postponed

PAST (PREORDAINED "at 7.05pm tomorrow" ( Other "the sun", ( Do "set" ) ))
    -> "The sun set at 7.05pm tomorrow."  -- but then an asteroid knocked us into a new orbit
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

So far I have been emphasising the symmetry between the `PRIOR` and the `PREORDAINED` elaborations, but there are asymmetries as well. First, the new condition generated by the `PRIOR` elaboration (when it does generate a new condition) entails the *actual* prior satisfaction of its underlying condition. The message as a whole is true only if the underlying condition was in fact satisfied at that prior time. The new condition generated by the `PREORDAINED` elaboration, however, does *not* entail the actual satisfaction of its underlying condition at the later time. Rather, it entails - as I have been saying - the existence of some prearrangement or predetermination to that effect. But plans, as we all know, can change, and it may be perfectly true that someone is getting married next month, even if she later calls it off (at which point it will still be true that she *was* getting married next month). With predeterminations, there is room for metaphysical debate: some would argue that, if an asteroid hits tonight and moves us into a new orbit, then the sun was never going to set at 7.05pm tomorrow after all. But however that may be, English allows us - if we want it - the facility to communicate on the assumption that predeterminations can also change, saying for instance that the sun *did* set at 7.05pm tomorrow, even though it no longer *does*. It is not for semantics to settle this metaphysical dispute.

The second asymmetry is syntactic rather than semantic. The `PREORDAINED` elaboration, unlike the `PRIOR` elaboration, has the curious feature of being *invisible*. By this I mean that it has, in and of itself, no impact on the output sentence. The optional time argument, it is true, shows up in an adverbial expression at the end of the predicate, but the elaboration itself leaves no mark (where the `PRIOR` elaboration, of course, replaces the main verb with the corresponding form of the verb **`"have"`** followed by the second participle form of the original verb). As we will see in the next section, the `PREORDAINED` elaboration is not the only English elaboration that is invisible in this sense. And the existence of invisible elaborations, as you might well expect, is one very considerable source of ambiguity: from the sentence alone, it may be unclear which invisible elaborations (if any) have been applied, and moreover which order they have been applied in.

More on that in the next section. In the meantime, let me end this section by accounting for a couple of comparatively straightforward ambiguities arising from the `PREORDAINED` and `PAST` elaborations alone, in virtue of the former's invisibility. First, when the optional time argument is absent from a `PREORDAINED` elaboration, it simply cannot be deduced from the sentence whether the elaboration has been applied or not. Thus the sentence `"They are getting married"` admits of a plain interpretation (they are at the altar as we speak) as well as a `PREORDAINED` one (they are engaged to be married):

```elm
Plain ( Others, ( Do "get" Ongoing, "married" ) )
    -> "They are getting married."

PREORDAINED ( Others, ( Do "get" Ongoing, "married" ) )
    -> "They are getting married."
```

The same is true of `"They were getting married"`, which arises from subjecting either of the messages above to the `PAST` elaboration (as it might be, they were at the altar and are now wed; or, they were engaged but have now split).

Secondly, and rather more interestingly, the sentence `"They were getting married yesterday"` supports (at least) *three* distinct interpretations. The first is a direct claim about the past, about what they got up to yesterday. The second is a claim about yesterday's plans: that the couple were then engaged to be wed at some unspecified point in the future. The third, finally, is a claim about past plans *for* yesterday: that at some point in the past (unspecified) the happy day was scheduled for yesterday. The point, in a nutshell, is that the sentence does not reveal whether the word `"yesterday"` is coming from the `PAST` elaboration or the `PREORDAINED` one (if the `PREORDAINED` elaboration has been applied at all, that is). I represent the three messages here as follows:

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

### 5.3. REGULAR, EXTENDED, and SCATTERED Messages

There are three more invisible elaborations in my model: `REGULAR`, `EXTENDED`, and `SCATTERED`. It is convenient to discuss these all together, since they have a great deal in common. The relevant parts of type definitions are as follows:

```elm
type Message
    = ...
    | REGULAR (Maybe Frequency) Message
    | EXTENDED Duration Message
    | SCATTERED Tally Message
    | ...

type alias Frequency =
    String

type alias Duration =
    String

type alias Tally =
    String
```

As with the *time* argument for `PAST` and `PREORDAINED` elaborations, the *frequency*, *duration*, and *tally* arguments are all unearthed variables for now; users are obliged to encode these variables into strings for themselves. (But see section 5.7 below for some speculation on how two of them might be dug up.)

The `REGULAR` elaboration generates a new condition whose satisfaction entails - I don't know how else to say it - the *regular* satisfaction of its input condition, with the optional frequency argument specifying the frequency of that regularity. `REGULAR` messages concern the habits of such creatures as are capable of forming them (notably human beings), as well as the typical or predictable behaviour of inanimate objects under certain conditions:

```elm
REGULAR "often" ( Female "Grannie", ( Do "eat", Out ) )
    -> "Grannie often eats out."

REGULAR "occasionally" ( Male "Victor", ( Do "laugh", [ ( At, Female "Grannie" ) ] ) )
    -> "Victor occasionally laughs at Grannie."

REGULAR ( Other "salt", ( Do "dissolve", [ ( In, Other "water" ) ] ) )
    -> "Salt dissolves in water."
```

(`"Salt"` and `"water"` are not proper names, and the last example here is a fudge; but I have not yet described the elaboration that accounts for these words, and it is difficult to think of a suitable example involving only pronouns or proper names. See section 5.7 for a more accurate analysis.)

The `SCATTERED` elaboration likewise generates a new condition whose satisfaction entails multiple satisfactions of its underlying condition. Rather than convey nomological apprehensions, however, these messages affirm nothing over and above the brute multiplicity. The compulsory *tally* argument specifies the total number of separate satisfactions (not necessarily with any great precision, as in the second example below):

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

The same is true, and for the very same reason, of `EXTENDED` messages, which result in a new condition whose satisfaction entails the satisfaction of its input condition during a certain period of time, with the compulsory *duration* argument specifying the length of that period:

```elm
PAST "yesterday" (EXTENDED "for an hour" ( Male, ( Do "see", [ Female ] ) ))
    -> "He saw her for an hour yesterday."

PREORDAINED "tomorrow" (EXTENDED "for an hour" ( Male, ( Do "see" Ongoing, [ Female ] ) ))
    -> "He is seeing her for an hour tomorrow."
```

Several ambiguities arise from the interaction of the four invisible elaborations. Consider, for example, the sentence:

```elm
"He walked to work for a week."
```

Among the several interpretations of this sentence we find (i) a `PAST EXTENDED REGULAR` message, according to which he was briefly in the habit (for one week only) of walking to work; (ii) a `PAST EXTENDED` message, according to which he once took a whole week to walk to work; and (iii) a `PAST REGULAR EXTENDED` message, according to which he used to be in the habit of taking a whole week to walk to work.

And then we have this seemingly straightforward sentence:

```elm
"The film started at 8pm."
```

By my count, this string is accessible to no fewer than *five* distinct interpretations: (i) a simple claim about when the film started (a `PAST` message); (ii) a claim about when it was scheduled to start (a `PAST PREORDAINED` message); (iii) a claim about when showings of used to start (a `PAST REGULAR` message); (iv) a claim about when showings of it used to be scheduled to start (a `PAST PREORDAINED REGULAR` message); and (v) a claim about the time at which the management, when drawing up their plans, generally scheduled showings of it to start (a `PAST REGULAR PREORDAINED` message). (It may be hard to envisage a use for this last message. To aid your imaginations, suppose the management had to fix the timetable anew each morning, and typically ended up placing the film in question in the 8 o'clock slot. This in contrast to the more likely fourth interpretation, in which they settle once and for all on a regular 8 o'clock position.)

I could go on, but hopefully these two examples suffice to illustrate the general point. With invisible elaborations, there is frequently nothing in the sentence that indicates the order in which they have been applied, or even - if their optional arguments are missing, or if the outputs of those arguments could have come from somewhere else - whether or not they have been applied at all. For the record, though I will not argue the point here, I defy anyone to come up with a satisfactory syntactic or pragmatic account of any of these ambiguities. It is only by embracing the code analogy, by modelling the semantic function from message to sentence rather than the other way around, that we can explain these various phenomena.

### 5.4. NEGATIVE Messages

The chief puzzle facing any theory of negation in English is posed by the related ambiguities discovered, for example, in the following two sentences:

```elm
"Claire does not drink."

"I was not busy all day."
```

In the first case, the speaker might be maintaining that Claire is tee-totalled, or might instead be denying that she is an alcoholic. The latter reading is consistent with Claire enjoying a drink now and then, while the former is not. In the second case, the speaker might be affirming that she was free all day yesterday, or might rather be rejecting the claim that she was occupied all day. The latter interpretation is consistent with her having been busy at some point in the day, while the former is not. In sum, the first interpretation of each sentence is a positive message about something internally negative, whereas the second is a negative message about something internally positive. (The possibility of these two kinds of negation is also why double negation isn't always vacuous: `"Claire doesn't not drink"`, for example, can be used perfectly intelligibly to deny that she is tee-totalled.)

My model posits a `NEGATIVE` elaboration, which has the effect, in general, of converting an affirmative message into its corresponding denial. In most cases - we will meet the exceptions in sections 5.5 and 5.7 - this amounts to the creation of a new condition, whose satisfaction entails the non-satisfaction of its input condition (the *complement* of the input condition, in other words). The difference between the pairs of messages noted above is accounted for by the *order* in which this elaboration is applied, relative to the other elaborations in the message (the `REGULAR` and `EXTENDED` elaborations respectively). In the second of each pair, the `NEGATIVE` elaboration is the outermost one, whereas in the first of each pair it is closer to the nucleus, with the other elaboration being applied on top of it. The `REGULAR NEGATIVE` interpretation of the first sentence affirms that Claire is in the habit of abstaining from drink, while the corresponding `NEGATIVE REGULAR` denies that she is in the habit of drinking. The `EXTENDED NEGATIVE` interpretation of the second sentence, similarly, affirms that the speaker was free all day, while its `NEGATIVE EXTENDED` counterpart denies that the speaker was busy all day.

Analagous ambiguities arise through the interaction of the `NEGATIVE` elaboration with the `PREORDAINED` and `SCATTERED` elaborations: `"I am not seeing him tomorrow"` may be taken as a denial of any present plan to that effect (a `NEGATIVE PREORDAINED` message), or as an affirmation of a present plan to avoid him (a `PREORDAINED NEGATIVE` message); `"Grannie did not fall down fifteen times yesterday"` may be said as a precursor to insisting that she took only fourteen tumbles that day (a `NEGATIVE SCATTERED` message), or as a claim that, though she may have faltered fifteen times, on none of those occasions did she ultimately fall (a `SCATTERED NEGATIVE` message).

Yet more ambiguities arise from the possibility of throwing the `NEGATIVE` elaboration in with more than one invisible elaboration. I will illustrate with just one example:

```elm
"Victor did not see Grannie for two hours."
```

Brace yourselves. This sentence encodes, among others: (i) a `PAST NEGATIVE EXTENDED` message (he saw her, but for an hour and a half at most); (ii) a `PAST EXTENDED NEGATIVE` message (for two whole hours, he didn't see her); (iii) a `PAST REGULAR NEGATIVE EXTENDED` message (he was formerly in the habit of avoiding her for two hours at a time); (iv) a `PAST NEGATIVE REGULAR EXTENDED` message (he wasn't formally in the habit of seeing her for two hours at a time); (v) a `PAST EXTENDED REGULAR NEGATIVE` message (his habit of avoiding her lasted a mere two hours); (vi) a `PAST NEGATIVE EXTENDED REGULAR` message (his habit of seeing her lasted more than two hours); (vii) a `PAST NEGATIVE PREORDAINED EXTENDED` message (there was no plan to see her for two hours; perhaps the plan was to see her for only one hour); (viii) a `PAST PREORDAINED EXTENDED NEGATIVE` message (the plan was to avoid her for two hours); (ix) a `PAST EXTENDED PREORDAINED NEGATIVE` message (for two hours, there was a short-lived plan to avoid her). I'll stop here, but by now it should be clear that these by no means exhaust the possibilities.

Admittedly some of the interpretations just given of this sentence will seem implausible; and some of its other interpretations (not listed) will seem outright bizarre. Nevertheless I maintain that they are all perfectly legitimate from a grammatical point of view. If any of them are in any sense ruled out, it can only be because they are weird or pointless, not because they are ungrammatical. Change the nucleus, meanwhile, or some of the surrounding arguments (durations, frequencies, tallies, and so on), and different sets of elaborations leap to mind as plausible or likely. I see no reason to suppose that some combinations of these elaborations are intrinsically problematic. In any case, it is undeniable that there are many ambiguities like these in English, and it may be noted how effortlessly my theory is able to predict and explain them all. As with those highlighted in the previous section, I defy anyone to account for them satisfactorily in syntactic or pragmatic terms.

Before moving on, let us take stock of a few things. Most of the elaborations we have seen so far (and in the contexts we have seen them) generate new conditions. The only exceptions are the `PAST` elaboration, and the `PRIOR` elaboration when it is applied on top of the `PAST` elaboration, which target the time of the condition's satisfaction instead. (The `NEGATIVE` elaboration doesn't always target the condition either, but we have yet to see the elaborations that change its behaviour in this respect.) With the generation of new conditions, meanwhile, the order in which elaborations are applied is almost always significant: a `REGULAR NEGATIVE` message is not the same as its corresponding `NEGATIVE REGULAR`, and so on.

There is, as far as I can see, only one exception to this general rule: a `PRIOR NEGATIVE` is no different from its corresponding `NEGATIVE PRIOR`. The sentence, `"He has not eaten"` can be generated by applying these elaborations in either order, but that does not reflect any ambiguity. There is no discernible difference between being in a state of having not eaten, and not being in a state of having eaten. The same is true of `PAST NEGATIVE` messages and `NEGATIVE PAST` messages. This is perhaps less surprising, however, since the `PAST` elaboration targets a completely separate part of the message. Indeed, the order in which the `PAST` elaboration is applied relative to *any* of the other elaborations examined so far makes no difference whatsoever to the overall message. As a matter of convention, I will always represent it has having been applied *as late as possible* in the overall message. This means that it is typically the outermost elaboration, except when it has been made `PRIOR`, or subjected to one of the elaborations I will look at in section 5.7 (for which the order does matter).

### 5.5. MODAL Messages

We come now to one of the most puzzling aspects of the English code, namely the use of the English modals: **`"will"`**, **`"shall"`**, **`"may"`**, **`"can"`**, `"must"`, `"ought"`, `"need"`, and `"dare"`. Before venturing my hypothesis, let me briefly call into question a long-standing and very popular view: that `"will"` is a marker of the future tense. On this hypothesis, the natural interpretations of the following three sentences differ only in the time of the condition's satisfaction by the object:

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

As a first stab, what these messages seem to have in common is that they reflect the speaker's *best guess* in the absence of concrete observation. The speaker in Paris, looking up at the sky, may opine that it *is* sunny; but the speaker in London, armed only with knowledge of the time of year and the general way of these things, will more likely venture the judgement that it *will be* sunny there. The claim that it will be sunny in Paris *tomorrow*, meanwhile, is surely much more like the Londoner's guess than the Parisian's statement. We make use of the same words to convey it, and we say such things - necessarily - in the absence of observational confirmation.

Secondly, the behaviour of `"will"` in reported speech is difficult to square with the future tense hypothesis. Having said on Monday that it *is* sunny in Paris, I may be correctly reported on Tuesday as having said that it *was* sunny yesterday. This is to be expected, since the `PAST` elaboration does nothing but change the time of the condition's satisfaction. But having said on Wednesday that it *will be* sunny in Paris tomorrow, the correct report on Thursday is that I said it *would be* sunny in Paris today. If my claim on Wednesday was the result of a `FUTURE` elaboration that merely located the condition's satisfaction in the future, the correct report on Thursday should be that I said it *is* sunny in Paris today. But that is plainly *not* what I said. Following on from the first point above, *that* sounds like an observational report, whereas what I affirmed on Wednesday was not based on a magical observation of the future; it was my best guess given the epistemic circumstances.

Thirdly, wherever `"will"` shows up encoding a claim about the future, it is one option among many, the other options being precisely the other modals:

```elm
"It will be sunny in Paris tomorrow."
"It may be sunny in Paris tomorrow."
"It ought to be sunny in Paris tomorrow."
"It needn't be sunny in Paris tomorrow."
...
```

To the mind of a codebreaker, these examples show fairly clearly that `"will"` does not encode futurity, any more than `"may"`, `"ought"`, or `"need"` does. It encodes something on a par with what these other modals encode, and the fact that the messages here are about about the future is to be explained by something else entirely.

There is plenty more that could be said here, but this is not the place to pursue the argument in depth. Rather, this is the place to present my alternative hypothesis, which I believe is vastly more promising. Debates about the relative merits of the two proposals (and indeed of any other proposals intended to accommodate the same data) can then be pursued elsewhere. Let me waste no time in admitting that, while I consider my own hypothesis to be considerably closer to the truth than the future tense hypothesis, I would not be at all surprised (or disappointed) if it ultimately proves to be inadequate. I venture it because it strikes me as the best place to start, in virtue of its simplicity. We ought to see how much of the data can be explained in this eminently simple way, before succumbing to any complications. Then we can be relatively confident that a more complicated theory, if that is what the data eventually force us into, is no more complicated than it needs to be.

Enough preamble. My hypothesis is that the English modals are to be accounted for by a single elaboration which introduces a *modality* into the message, with the choice of modality determining the choice of modal. Thus:

```elm
type Message
    = ...
    | MODAL Modality Message
    | ...

type Modality
    = Yes1    -- "will"
    | Yes2    -- "shall"
    | Yes3    -- "must"/"ought"/"need"
    | Maybe1  -- "may"
    | Maybe2  -- "can"
    | Maybe3  -- "dare"
```

The first use for `MODAL` messages, and the conceptually basic use on my account, is in speculating about matters of present fact. Suppose we are considering whether or not James knows the answer to a certain question. There are two possible factual claims here, a plain one and a `NEGATIVE` one, encoded respectively in the following two sentences:

```elm
"James knows Claire."
"James doesn't know Claire."
```

When it comes to *speculations* about this fact, however, there are more possibilities. For where factual questions call for yes/no answers, with speculations there is room also for *maybe* and *maybe not*. This affords us our first foothold in the theory of the English modalities, and the likely explanation of the difference between `"will"` and `"may"`. Thus:

```elm
MODAL Yes1 ( Other "James", ( Do "know", [ Other "Claire" ] ) )
    -> "James will know Claire."

MODAL Maybe1 ( Other "James", ( Do "know", [ Other "Claire" ] ) )
    -> "James may know Claire."

MODAL Maybe1 (NEGATIVE ( Other "James", ( Do "know", [ Other "Claire" ] ) ))
    -> "James may not know Claire."

MODAL Yes1 (NEGATIVE ( Other "James", ( Do "know", [ Other "Claire" ] ) ))
    -> "James will not know Claire."
```

I have diagnosed the second two messages here as `MODAL NEGATIVE` messages, but one could equally think of them as `NEGATIVE MODAL` messages with the `Yes1` and `Maybe1` modalities reversed; for the contrary of *yes* is *maybe not*, while the contrary of *maybe* is *definitely not* (i.e. *no*). In other words, logically speaking, `NEGATIVE (MODAL Yes1) == MODAL Maybe NEGATIVE`, and `NEGATIVE (MODAL Maybe1) == MODAL Yes NEGATIVE`. (While we are here, it may be noted that this serves as another reason to reject the future tense hypothesis. The contraries of the messages encoded as `"It is/was sunny in Paris today/yesterday"` are encoded as `"It is/was not sunny in Paris today/yesterday"`. But the contrary of the message encoded as `It will be sunny in Paris tomorrow"` is encoded as `"It may not be sunny in Paris tomorrow"`.) When the `NEGATIVE` elaboration is applied on top of the `MODAL` elaboration, therefore, the result is not a negative condition, but a negative modality.

Applying the `MODAL` elaboration to a plain message generates a speculation concerning the present satisfaction of the underlying condition. It is a brute fact about the English code, for which I can give no explanation, that the `MODAL` elaboration cannot be applied on top of `PAST` messages to generate equivalent speculations concerning the *past* satisfaction of the underlying condition: `"James will knew Claire"` is not a sentence of English. The limitation here is harmless, however, since the code offers us free use of the `PRIOR` elaboration for the purpose instead:

```elm
MODAL Yes (PRIOR ( Other "James", ( Do "know", [ Other "Claire" ] ) ))
    -> "James will have known Claire."

MODAL Maybe (PRIOR ( Other "James", ( Do "know", [ Other "Claire" ] ) ))
    -> "James may have known Claire."
```

Given that `MODAL PRIOR` messages are possible, but `MODAL PAST` messages are not, any distinction that might have been drawn between the two is unavailable. Consequently it is unclear whether the first sentence above is best followed up with, `"Yes, he *did* know her"` or, `"Yes, he *has* known her"`. Sometimes the speaker will have a `PRIOR` message in mind, and sometimes a `PAST` message; and sometimes there may simply be no determinate answer either way.

The other way around, the very reverse is true: `PRIOR MODAL` messages do not exist, but `PAST MODAL` messages do. I suggest that it is `PAST MODAL` messages that are responsible for the following sentences:

```elm
PAST (MODAL Yes ( Other "James", ( Do "know", [ Other "Claire" ] ) ))
    -> "James would know Claire."

PAST (MODAL Maybe ( Other "James", ( Do "know", [ Other "Claire" ] ) ))
    -> "James might know Claire."
```

The diagnosis here is not immediately obvious, but it has a great deal to recommend it. First, it is the most natural explanation of the words used, since `"would"` and `"might"` stand to `"will"` and `"may"` just as `"was"` and `"did"` stand to `"is"` and `"does"`. Put crudely, the sentences here *look like* the result of the `PAST` elaboration applied on top of whatever elaboration introduced `"will"` and `"may"`. This observation by itself wouldn't amount to much if the underlying semantics didn't match up with intuitions or usage, but on consideration it matches up remarkably well. Allow me to switch to another example to make the point:

```elm
"James will know the result of the football."
"James would know the result of the football."
```

The first sentence here encodes a speculation based on *up to the minute* information. It is likely on the lips of someone who may or may not know James very well, but has seen that he has been watching the television in the pub all afternoon. The second sentence, in contrast, encodes a speculation which *waives* up to the minute information, drawing on more well established evidence. It is likely on the lips of someone who has no idea what James has been up to today, but knows he is an avid fan who rarely misses a game. To make this more precise, the first encodes the result of *present* speculating about the present, while the second encodes the result of *past* speculating about the present. It is not, of course, that the speculations themselves are present or past; the mental act is inevitably present. Rather it is the time of the imagined *basis* of those speculations.

Before I start introducing other modalities into the picture, let me continue on this examination of some of the more complex messages that can arise through the interaction of the `MODAL` elaboration with the other elaborations we have seen. Consider the following sentences:

```elm
"Grannie will usually walk home."
"Grannie may ocassionally walk home."
```

Both are ambiguous, admitting of (at least) two interpretations. The first of each pair is relatively uninteresting, and not much different from what we have seen so far. They are `MODAL REGULAR` messages, and concern speculations about Grannie's present habits. The have corresponding `MODAL REGULAR PRIOR` messages, concerning speculations about her past habits:

```elm
"Grannie will usually have walked home."
"Grannie may ocassionally have walked home."
```

But more interesting is the second of each pair, which are `REGULAR MODAL` messages. With `REGULAR MODAL` messages, the `REGULAR` elaboration subsumes the modality, giving it very little influence in the overall claim. Indeed, these messages - at least where the modalities `Yes` and `Maybe` are concerned - seem to have almost no informational difference from their plainer `REGULAR` counterparts. More specifically, when the `REGULAR` elaboration is applied on top of the `MODAL` elaboration, it restores the default behaviour of the `PAST` elaboration. A `PAST MODAL` message, as I just explained, does not amount to a speculation about the past satisfaction of some condition, but the result of past speculating about the satisfaction of some condition. A `PAST REGULAR MODAL` message, however, is a more straightforward claim about some past regularity:

```elm
"(These days,) Grannie will usually walk home."
"(In those days,) Grannie would usually walk home."
```








Now let us consider what the messages thus generated amount to, and how this one elaboration can account for the various data. In the first instance (i.e. when they have not been elaborated further), `MODAL` messages are speculations about the unobserved present. Consider the following sentences:

```elm
"James will know the answer."
"James must know the answer."
"James may know the answer.
"James ought to know the answer."
```

The `MODAL` elaboration does not result in any new condition; rather, the modality serves to say something about the underlying condition's satisfaction. In the case of `Will`, what it says about its satisfaction is, simply, *yes*. `Will`, I suggest, is the bare positive modality, something which perhaps explains the temptation to treat `"will"` apart from the other modals, as the marker of a future tense. Compare it with `Must`, which likewise says *yes*, but rather more substantially or emphatically: the ideas of *necessity* and *force* seem close by. Where `Will` and `Must` say *yes*, meanwhile, `May` says *maybe*, and `Ought` says *yes rather than no*. `Ought` stands in between `Will` and `Must` on one side, and `May` on the other. I will say more about the other modalities as we proceed, but for various reasons they seldom or never show up in the absence of other elaborations.

The `MODAL` elaboration interacts interestingly with the `NEGATIVE` elaboration. In the first place, we have `MODAL NEGATIVE` messages, which convey something about the underlying condition's *non*-satisfaction. Consider:

```elm
"James will not know the answer."
"James may not know the answer."
"James ought not to know the answer."
```

If a `MODAL` message with `Will` or `Must` says *yes* to its underlying condition's satisfaction, then a `MODAL NEGATIVE` with the same modality says *no* to it. And if a `MODAL` message with `Ought` says *yes rather than no*, then a `MODAL NEGATIVE` with this same modality says *no rather than yes*. With `May`, the presence or absence of a `NEGATIVE` elaboration underneath serves mainly to emphasise the point one way or the other: *maybe* and *maybe not* are effectively equivalent.

In the second place, we have `NEGATIVE MODAL` messages, which serve to negate, not the underlying condition, but the modality itself. Curiously, not every modality is negatable in every context. `Will` and `Ought`, for example, are never negatable, and `May` is only negatable in a context we have yet to meet. `Must`, however, is always negatable. When negated, however, it shows up in the modal `"need"` rather than `"must"`:

```elm
"James needn't know the answer."
```

I diagnose this sentence as encoding the *denial* of what `"James must know the answer"` encodes: he needn't know if and only if it is not the case that he must know. This explains why the modal `"need"` only ever shows up in the negative: `"James need know the answer"` is not a sentence of English.

The modality `Can`, which has yet to enter into our examples, is like `Must` in being negatable everywhere. In otherwise unelaborated messages, moreover, it almost always shows up negated, as in:

```elm
"James can't know the answer."
```

Note that the message here is indeed a `NEGATIVE MODAL`, not a `MODAL NEGATIVE`; the speaker is not claiming it is possible that James doesn't know, but rather denying it is possible that he does.

`Can` stands to `Must` as `May` stands to `Will`. In other words, where `Will` and `May` simply say *yes* and *maybe*, unadorned, `Must` and `Can` say *yes* and *maybe* more forcefully, with overtones of inevitability. Where `Must` goes hand in hand with the idea of *necessity*, therefore, `Can` goes hand in hand with the idea of *possibility*. But now, it is *possible* for James to know the answer only if he *does* know the answer. Anyone in a position to claim that he *can* know, therefore, would equally be in a position to claim that he *does*. It is for this reason, I suggest, that positive (and otherwise unelaborated) claims involving `Can` are not made. While `"James need know the answer"` is not English, `"James can know the answer"` is; it is just that it encodes a message no one is ever likely to have a use for.

The modals are subject to a systematic ambiguity that I have not yet acknowledged. It corresponds to the familiar philosophical distinction between mind-to-world and world-to-mind "direction of fit". Recall the sentence: `"James ought to know the answer"`. The mind-to-world interpretation of this sentence amounts to a (tentative) speculation as to how things actually stand. One might expect it to be followed up with: `"So let's go and ask him"`. The world-to-mind interpretation, in contrast, is a claim about how things ought to stand (I can think of no other way to say it) in an ideal world. One might expect it to be followed up with: `"So shame on him if he doesn't"`. 


The mind-to-world interpretation of this sentence has it that he probably does. If it turns out that he doesn't in fact know, the sponsor of this interpretation will be obliged to admit, at least in some qualified sense, to having been wrong (though not as wrong, of course, as if she had said that he *will* know, or *must* know, and still less than if she had said that he *does* know). The world-to-mind interpretation, however, is uninterested in whether or not he does; the sponsor of this message is conveying something about her attitudes to the matter



So far we have, with one insignificant exception, been limited to sentences with just one base or finite form of a verb. The exception is `NEGATIVE` messages with `Do` pivots, which triggers output of the dummy **`"do"`**; e.g. `"We do not believe him"`. But simple English sentences can contain multiple verbs in their base or finite form, chained together with the preposition `"to"`:

```elm
"They want to leave."
"They are able to leave."
"They are about to leave."
"They are about to want to leave."
"They have to be about to want to leave."
```

And then there are also sentences in which this chain starts with a modal:

```elm
"They will leave."
"They can leave."
"They must want to leave."
"They should be about to want to leave."
```

How to account for sentences like these is one of the major tasks facing the code breaker of English. Let me dismiss one partial possibility right away: that sentences like `"They will leave"` can be accounted for by positing a `FUTURE` elaboration symmetrical to the `PAST` elaboration. Something like this hypothesis has been extraordinarily popular among philosophers, even to the point of enjoying the status of a truism. But it is ill-suited to the full range of data; and when we start developing a theory better suited to the full range, it quickly becomes clear that it can embrace future-referring uses of `"will"` very naturally, without the need for a whole new elaboration responsible for just some uses of just this one modal.

To account for sentences like these, my own theory contains three elaborations and one special kind of variable. We have met two of the elaborations already, the `PREORDAINED` and `REGULAR` elaborations, but I ignored the relevant special variable - the *displacer* - until now. The third elaboration, which I call simply the `DISPLACED` elaboration, *requires* a displacer, where the other two can get by without one (a difference I will explain later):

```elm
type Message
    = ...
    | DISPLACED Displacer Message
    | PREORDAINED (Maybe Displacer) (Maybe Time) Message
    | REGULAR (Maybe Displacer) (Maybe Frequency) Message
    | ...
```

Before turning to the elaborations, I will lay some groundwork with my account of displacers themselves. They are of two kinds, `Primary` and `Secondary`, the former for introducing new verbs into the sentence, and the latter for introducing a modal. The former comprises a pivot and a counter, just as we saw in the nucleus of plain messages (so I will not bother to repeat their type definitions here):

```elm
type Displacer
    = Primary Pivot (Maybe Counter)
    | Secondary Modality

type Modality
    = SoftYes  -- "will"
    | HardYes  -- "must"/"need"
    | SoftMaybe  -- "may"
    | HardMaybe  -- "can"
    | SoftYesIsh  -- "should"
    | HardYesIsh  -- "ought"
    | Dare  -- "dare"
    | Permission  -- "may"
    | Command  -- "shall"
```

There is not a lot to say about displacers in general, except that the distinction between primary and secondary has semantic as well as syntactic significance; it is not random or coincidental that the modals behave differently from the verbs. We will see more of the semantic differences as we proceed, but at the outset let me advertise the two highlights. First, while primary displacers serve to generate a new condition from an old one, the modalitites or secondary displacers constitute information that remains distinct from the underlying condition. Secondly, and relatedly, the modalities set up a second target for the `NEGATIVE` elaboration, distinct from the condition which it targets by default. We see this point at work in, for example, the sentence `"You can't not go"`, which encodes a message comprising a negated `Can` alongside a negated condition.

Let me get a substantial disclaimer out of the way right up front: not every pivot and counter combination is permissible in English, and moreover not every permissible combination can serve as a primary displacer. Just as I make no attempt at present to rule out the impermissible combinations in general (recall section 4.4), I also make no attempt to rule out, in the present context, the ones that are impermissible as displacers. For example, none of the following is a sentence of English:

```elm
"I call hungry to meet you."
"She laughs in to want a car."
"They are eating to see you tomorrow."
```

But all of these strings can be generated within my system. Uncovering the restrictions that would rule out all and only the impermissible sentences like these is an important task that I have yet to begin.

There is one more qualificatory point to make before we proceed. There are many English sentences that look like they might have been generated by one of the elaborations I will be discussing here, but which I maintain have not been. These are sentences in which a `"to"` appears in between verbs, but with the sense of `"in order to"`; for example:

```elm
"They left to catch the bus."
"She is going out to see her friend."
```

These, I presume, are the result of some other elaboration, not yet incorporated into my model. At any rate, they are *not* the result of any of the elaborations we are now to examine, which give rise to messages of a quite different sort. The `"to"` in between the verbs or modals generated by the messages I am presently interested in never has the sense of `"in order to"`.

`REGULAR` messages are perhaps the easiest to start with. When the `REGULAR` elaboration has no displacer, recall, it results in a new condition that entails the regular satisfaction of its input condition, with an optionally specifiable frequency. Such messages are common for conveying something about an individual's habits; for example:

```elm
REGULAR "often" ( Female "Grannie", ( Do "tease", [ ( Male "Victor" ) ] ) )
    -> "Grannie often teases Victor."

REGULAR "ocassionally" ( Male "Robert", ( Do "sing", [ ( To, SameAsMain ) ] ) )
    -> "Robert ocassionally sings to himself."
```

I suggest that the very same elaboration is at work in the messages encoded in the following sentences, but with a primary displacer:

```elm
REGULAR ( Do "like" ) "often" ( Female "Grannie", ( Do "tease", [ ( Male "Victor" ) ] ) )
    -> "Grannie often likes to tease Victor."

REGULAR ( Be, "liable" ) "ocassionally" ( Male "Robert", ( Do "sing", [ ( To, SameAsMain ) ] ) )
    -> "Robert is ocassionally liable to sing to himself."
```

In support of this diagnosis, notice that the frequency in these messages applies to the underlying condition: to the teasing or the singing, not to the liking or the being known. Moreover it is in the very nature of 

### 5.6. DISPLACED Messages

My model includes a `DISPLACED` elaboration, but let me waste no time in admitting I have little confidence that this elaboration accurately models the realities of English. I have included it as a placeholder for now, a crude way of accounting for various data that call for further investigation. The messages that I have in mind here have much in common with `PRACTICAL`, `PROJECTIVE`, and `EVASIVE` messages, except that where these other messages have a modality, `DISPLACED` messages have a pivot and an optional counter:

```elm
type Message
    = ...
    | DISPLACED Pivot (Maybe Counter) Message
    | ...
```

The point of calling these messages "displaced" is that the pivot and optional counter *displace* those found in the nucleus. The result is a sequence of verbs or verb phrases glued together with the word `"to"`:

```elm
"They want to leave."
"They are able to leave."
"They are about to leave."
"They are about to want to leave."
"They have to be about to want to leave."
```

As the last two examples remind us, the elaboration or elaborations at work here can be applied on top of each other.

Beyond the obvious syntactic similarities, there are semantic similarities between these messages and the messages examined in the previous section. Particularly striking parallels are observed between some uses of `"be able to"` and `"can"` for example, and some uses of `"have to"` or `"need to"` and the modals `"must"` and `"need"`:

```elm
"He can swim a mile."
"He is able to swim a mile."

"You must leave."
"You have to leave."

"You needn't go."
"You don't need to go."
```

We may also observe some of the same patterns. Some `DISPLACED` messages are like `PROJECTIVE` messages in concerning a later satisfaction of the underlying condition:

```elm
"Grannie is about to say something."
"Robert is going to meet me tomorrow."
"Robert is able to meet me tomorrow."
```

Others are like `PRACTICAL` messages in being about the present or past satisfaction of the underlying condition, depending on whether their input message is `PRIOR` or not:

```elm
"He is likely to be seeing her at the moment."
"He is likely to have seen her yesterday."
```

And others, finally, are like `EVASIVE` messages in being about no particular occassions of the underlying condition's satisfaction:

```elm
"Victor likes to tease Grannie."
"Claire is sometimes to be found in the library."
```

Perhaps, then, instead of just one `DISPLACED` elaboration, we should have three, one corresponding to each of the three elaborations examined in the previous section. Or perhaps we should have no new elaborations, but rather expand the definition of those other three so that they can take pivot and counter arguments instead of modality arguments. We would then have just one elaboration responsible, for example, for all of these sentences:

```elm
"I will see him tomorrow."
"I can see him tomorrow."
"I must see him tomorrow."
"I am going to see him tomorrow."
"I am likely to see him tomorrow."
"I hope to see him tomorrow."
"I want to see him tomorrow."
```

There is certainly something tempting in this proposal. But the case is by no means clear, for there are differences separating the versions of these messages with a modality from those involving a pivot and (optional) counter. The most striking of these is the way they behave with respect to the time of the underlying condition. As noted in the previous section, a `PAST PROJECTIVE` message can only be about the present or the future, never the past; `PROJECTIVE` messages can only be about the past if they are `PRIOR PAST PROJECTIVE`s. But no such rule holds for (what I am tentatively diagnosing as) `PAST DISPLACED` messages, which can be about the past without any need for the `PRIOR` elaboration:

```elm
"I was going to see him yesterday."
"I was likely to see him yesterday."
```

Somewhat similarly, `PAST PRACTICAL` messages can be about the present, as in `"Fred would/might/could know the result of the football (so let's ask him)"`. But `PAST DISPLACED` messages are not so liberal: `"Fred had to know the result of the football now"` is not English.

### 5.7. INDIRECT, ENUMERATED, and AMASSED Messages

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

Turning now to the more interesting arguments, *descriptions* are for describing an object rather than naming it with a pronoun or proper name, and thereby referring to it indirectly (hence my choice of label for these elaborations). Their string outputs include so-called "definite" descriptions (a notorious subject of philosophical debate) like `"the king of France"` or `"the elephants in the room"`, but also demonstrative descriptions (e.g. `"this king of France"`, `"those elephants over there"`) and relative descriptions (e.g. `"my favourite king"`, `"your pet elephants"`). The most important part of descriptions is what I call a *pointer*, responsible for the first word in each of these phrases. It has four possible values:

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

Where pointers and quantifiers are responsible for the articles, relative pronouns, and determiners at the start of complex noun phrases, the *haystack* is responsible for most of the rest: the *category* fixes the noun (e.g. `"rice"`), the *property* fixes any adjective preceding the noun (e.g. `"brown rice"`), while the *restriction* fixes any words following the noun (e.g. `"brown rice in a bag"`). These three variables are all instances of unearthed types that users must encode for themselves, at least for now. We already met properties in the context of counters above; categories are new, but just like properties and adjectives, I have no intention of giving my system a large dictionary of categories and nouns any time soon. Restrictions are much more likely to be dug up in a future update, since they are in fact just *balances*, precisely like those we have already seen in the nucleus of plain messages. The reason I have not modelled them like this yet is that there is a complication here that will require a fair bit of work to implement. The complication is that, being balances, they include objects; and objects - wherever they appear in a message - can be targetted by one of the elaborations we are investigation in this section. The balance in the haystack encoded as `"brown rice in a bag"`, for example, has itself been subjected to a dose of the `ENUMERATED` elaboration (whence the noun phrase `"a bag"`). To keep things from getting to large too soon, therefore, I have left restrictions unearthed for now.

It is tempting to think of descriptions, multiplicities, and proportions as simply *overwriting* their target objects, but this is not quite right. First, it is only third person (i.e. `Other`) objects that can be the target of any of these elaborations, and so the object variable itself must be kept around at least to check that it is of the right type. Secondly, the main noun in the noun phrases generated by these variables must either be singular or plural, and which of the two it is is determined by the underlying object itself. And finally, if the targetted object is the main object, it may still be needed to decide the pronoun for any balancing object set to `SameAsMain`. Consider:

```elm
INDIRECT -1 ( That, "person" ) ( Male, ( Like, [ SameAsMain ] ) )
    -> "That person likes himself."

INDIRECT -1 ( That, "person" ) ( Others, ( Like, [ SameAsMain ] ) )
    -> "Those people like themselves."
```

The noun phrases `"that person"` and `"those people"` are determined jointly by the description and the underlying object; the former delivers the determiner **`"that"`** and the noun **`"person"`**, but the latter sets the forms of these words. And the pronouns `"himself"` and `"themselves"` are determined solely by the main object. For these reasons, then, that object must be retained in the overall message, although it is somewhat obscured by the description that elaborates it.

The distinction between multiplicities and proportions is, I hope, intuitively clear. It is related to the distinction between discrete (or "countable") and continuous (or "uncountable") categories, in that multiplicities are for the former and proportions are for the latter. The distinction between discrete and continuous categories is not an absolute one, however, and though it admits of clear paradigms on either side, more or less any category can, with sufficient ingenuity, be taken in both senses. Paradigmatically discrete categories include those encoded in `"leg"`, `"frog"`, or `"person"`, and multiplicities involving these are common: `"one leg"`, `"two legs"`, `"several frogs"`, `"every person"`, and so on. Paradigmatically continuous categories include those encoded in `"air"`, `"meat"`, or `"water"`, and proportions involving these are similarly common: `"most air"`, `"enough meat"`, `"much water"`. But continuous stuff can be divided into discrete chunks, and thereby enumerated: `"several meats"`, for example, can be used to refer to several *types* of meat. On the other side, discrete things can be grouped together and as a continuous whole, with a view to saying something about a proportion of that whole: `"all people"`, `"most cars"`, `"enough frogs"`. Usually this goes along with the plural; but the singular is also possible, if there is some way of intelligibly recasting the category as continuous: `"enough leg"`, for example, might be used in talk about a continous amount of chicken-leg meat.

More precisely, we can note the following general distinction between enumerating and amassing quantifiers: the former insist rigidly that their underlying objects be either singular or plural, whereas the latter are flexible in this regard. `"All water"` and `"all waters"` are both fine, for example, as are `"most meat"` and `"most meats"`. But while `"one car"`, `"each car"`, and `"every car"` are all fine, `"one cars"`, `"each cars"`, and `"every cars"` are not; conversely, `"two cars"`, `"several cars"`, and `"many cars"` are fine, but `"two car"`, `"several car"`, and `"many car"` are not. There is however an exception to this rule: the amassing quantifier `Much` behaves like an enumerating quantifier, in that it insists rigidly on the singular: `"much effort"` is fine, but `"much efforts"` is not. I would very much like an explanation for this anomaly, but at present have none.

By this criterion, `Some` and `Any` would be amassing quantifiers: `"some water"` and `"some waters"` are both fine, as are `"any person"` and `"any people"`. On closer inspection, however, it seems that these two quantifiers can be used in enumerations as well as proportions (when used in enumerations, they are like `A`, `Each`, and `Every` in insisting on the singular). The distinction reveals itself when we consider how these quantifiers most naturally interact with (paradigmatically) discrete and continuous categories in the singular: `"some water"` is most naturally taken as referring to some *proportion* of water, while `"some car"` is most naturally taken as referring to some *one* car; `"any tea"` may be taken in an enumerated sense, to refer to any (one) *type* of tea, or in an amassed sense, to refer to any *amount* of tea.

When they target the main object, the `AMASSED` and `ENUMERATED` elaborations may - depending on the quantifier - change the default target of the `NEGATIVE` elaboration from the condition to the multiplicity or proportion itself. The result is either a `"not"` prefixed to the determiner or, in the case of `"some"`, the replacement of this word with `"no"`. For example:

```elm
NEGATIVE ENUMERATED -1 ( Many, "person" ) ( Others, ( Do "like", [ Female "Grannie" ] ) )
    -> "Not many people like Grannie."

NEGATIVE ENUMERATED -1 ( Some, "one" ) ( Other, ( Be, "good enough", [ For, Hearer ] ) )
    -> "No one is good enough for you."

NEGATIVE AMASSED -1 ( All, "apple" ) ( Others, ( Be, "red" ) )
    -> "Not all apples are red."
```

Some enumerating quantifiers, however, are not negatable in this way: no English sentence begins with `"not a(n)"`, `"not several"`, or `"not each"`. It must be something in the nature of the quantifiers `A`, `Several`, and `Each` that precludes this, but I confess I am not quite able to put my finger on what that something is.

The interaction of the `INDIRECT`, `ENUMERATED`, and `AMASSED` elaborations, both with each other and with other elaborations, is another considerable source of ambiguity, since the order in which these elaborations is applied typically has no effect on the output sentence. Since philosophers are entirely familiar with quantifiers and their scope ambiguities, and since the way in which my model handles the phenomena here is not at all unusual or surprising, I can be relatively brief.

The sentence `"Everyone loves someone"`, for example, admits of two readings: on one reading, `Some` has widest scope, and the claim is that there is some special person who has the remarkable property of being loved by everyone; on the other, `Every` has widest scope, and the claim is merely that everyone has some special person in their lives (not necessarily the same person for all). These ambiguities receive exactly the sort of treatment in my system that you would expect: they depend on the order in which the (in this case `ENUMERATED`) elaborations are applied, something which leaves no mark on the output sentence:

```elm
ENUMERATED 0 ( Some, "one" ) (ENUMERATED -1 ( Every, "one" ) ( Other, ( Love, [ Other ] ) ))
    -> "Everyone loves someone."  -- lucky him

ENUMERATED -1 ( Every, "one" ) (ENUMERATED 0 ( Some, "one" ) ( Other, ( Love, [ Other ] ) ))
    -> "Everyone loves someone."  -- lucky them
```

When what exactly is picked out by some description, multiplicity, or proportion depends on the time at which it is picked out, the order in which any elaboration that effects the time of the condition's satisfaction is applied also matters. For example, the sentence `"The president of the United States was a Democrat"` has two readings. The first maintains that the current president was, at some point in the past, a Democrat (but has perhaps changed affiliations since). The second maintains that, at some point in the past, the then president was a Democrat (but perhaps the current president is not). As you would expect, this difference boils down, in my system, to the difference between an `INDIRECT PAST` message (the current president used to be a Democrat) and a `PAST INDIRECT` message (it used to be that the then president was a Democrat).

Here, as elsewhere, much work remains. I cannot yet account for multi-word determiner phrases like `"too little"` or `"too much"`. I am as yet unsure as to whether these should just be hard-coded as the results of additional quantifiers, or whether it should be possible to construct them out of smaller parts (and if so, how this should be done). I am also unable to account for noun phrases containing more than one article, relative pronoun, or determiner, like `"all the king's horses"`, `"some of the time"`, `"enough of Grannie's nonsense"`, and so on. On the face of it, it is tempting to diagnose these as involving multiple `INDIRECT`, `ENUMERATED`, or `AMASSED` elaborations all applied to the same underlying object, and this may well prove the right analysis. But I simply have not considered the data here enough to venture this hypothesis with any degree of certainty. There is also the puzzle of why the little word `"of"` creeps into so many of these phrases. For the time being, my model tolerates only one of these three elaborations applied to every object.

I mentioned already in section 4.4 that I cannot account for sentences like `"I am here"`, still less sentences like `"I am somewhere/anywhere/everywhere"`. I am reasonably confident that the messages resulting in the latter are `ENUMERATED` elaborations of the message encoded in the former. But until I have incorporated places into my model, I cannot deal with multiplicities involving them either. There is also the fact that descriptions can - unless the pointer they involve is `The` - make do with no haystack at all: `"this"`, `"that"`, `"these"`, and `"those"` make for complete noun phrases in their own right; in the case of the `RelatedTo` pointer, meanwhile, the absence of a haystack triggers the *second* relative form of the pronoun instead of the first: `"mine"`, `"yours"`, `"hers"`, etc. This is a relatively easy addition, but as always one must stop somewhere.

I have restricted my implementation of `INDIRECT`, `ENUMERATED`, and `AMASSED` elaborations to the targetting of *objects*. The *time* argument for the `PAST` and `PREORDAINED` elaborations can also be targetted by the `INDIRECT` and `ENUMERATED` elaborations, however, giving rise to phrases like `"the day after tomorrow"`, `"your birthday"`, `"one day soon"`, or `"several years ago"`. The *duration* argument for the `EXTENDED` elaboration, furthermore, can apparently be targetted, at least somewhere in its inner workings, by the `ENUMERATED` and `AMASSED` elaborations, at least partially accounting for phrases like `"for three hours"`, `"for several minutes"`, or `"all day"`.

The *frequency* argument of the `REGULAR` elaboration, for its part, often (if not always) has the air of a *proportion* of occasions, with an amassing quantifier at its heart: `"sometimes"` appears to result from the `Some` quantifier, and `"always"` from the `All` quantifier; perhaps `"often"` results (somewhat less obviously) from the `Much` quantifier. What is more, when the frequency argument is absent, this has very much the feeling of a proportion of occasions with *no* quantifier, sharing the same sense of generality discovered in, for instance, `"Dogs have four legs"`. I would not say that the frequency argument is itself a potential target of the `AMASSED` elaboration; rather, it appears that it already is, in and of itself, a proportion. And if the frequency argument of `REGULAR` elaborations is a proportion, then the tally argument of `SCATERRED` elaborations is surely a multiplicity: `"once"`, `"twice"`, `"two times"`, `"several times"`, `"many times"`, etc. My model currently leaves the frequency and tally arguments unearthed, but I have little doubt that the key to digging them out will be the amassing and enumerating quantifiers respectively. On that optimistic note, I shall draw a temporary line under my model as it stands. I hope it is fair to say that it constitutes a substantial, plausible, and promising start.
>>>>>>> Stashed changes
