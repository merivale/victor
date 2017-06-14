# Victor

A model of the English language, thought of as a code for processing *messages* (structured arrangements of informational choices) into *sentences* (strings of words). Inspired by the work of grammarian and logician Victor Howard Dudman. Read on for an outline of the theory, or play around with the current version at  [https://merivale.github.io/victor/](https://merivale.github.io/victor/).

## 1. The Point

Modern philosophical semantics treats languages as functions from strings to messages, routinely enquiring after "the rules that determine the meaning of a sentence". This forces its practitioners into an uncomfortable theoretical position, in which ambiguous sentences are, from the semantic point of view, impossible (because functions, of course, can assign only one output to every input). This may be fine for unambiguous artificial languages, but since the sentences of natural languages are typically rife with ambiguity, philosophers have no option but to offer syntactic or pragmatic accounts of this - as they see it - messy and unwelcome feature of the real world. I argue (though not here) that these accounts are unsatisfactory. What we need are *semantic* explanations of ambiguity.

By modelling languages as codes, i.e. as functions in precisely the *opposite* direction, semantic explanations of ambiguity become possible. The explanation in general is that the encoding function of an ambiguous language is not one-to-one, but many-to-one. In other words, ambiguous languages are *lossy* codes, which do not preserve in their output strings all of the information in their input messages. More than this, however, by articulating the English function, we should be able to see precisely how and why various English ambiguities arise. See section 4 below for examples.

## 2. The Source

My algorithm is written in [Elm](http://elm-lang.org/), with the styles written in [Less](http://lesscss.org/). The compiled HTML+JS+CSS is stored in the gh-pages branch, for easy integration with [GitHub Pages](https://pages.github.com/). The `src` directory contains the main program module, which simply pulls everything together (nothing to see there), and two subdirectories, `Interface` and `Theory`. The former directory contains all the modules responsible for generating the web page users see, for keeping track of user input, and for piecing that input together into a `Message` variable. It is the modules in the latter directory that are of theoretical interest, since they describe what a `Message` variable looks like, and define the encoding function that converts these variables into strings.

There is no need to go into detail about the `Theory` modules here. Anyone interested in the nuts and bolts should simply read the code itself. It is internally documented, and is intended to be intelligible to anyone of a suitably logical turn of mind (although obviously some experience of functional programming would help). Indeed, I consider it a major selling point of my theory that it is computationally very simple, with only as much complexity as the empirical data demand. Readers should start with the `Types` module for my account of `Messages` (and their components), and then glance at the `Words` module. This latter contains a few small functions for generating words and their various forms. It is not very interesting in itself, but is perhaps helpful in serving to solidify an understanding of the grammatical terminology that I use (see section 3 below).

Next, readers should look at the `Sentences` module, which contains the encoding function itself, the function for processing messages into sentences. This function divides into two stages. In the first stage, the message is validated, and the variables that have a bearing on the output sentence are extracted; in the second stage, those variables are used to generate the sentence. The second stage is implemented in the `Sentences` module itself (with help from the little functions exposed by the `Words` module). The first stage is handled by the separate `Messages` module.

I have not yet written any tests, but there is a stub `test` directory as a placeholder for later development in this direction. From the point of view of the theory (never mind the interface), it would be helpful to have tests that run various `Message` variables through my encoding function, and check that the resulting strings are as they should be.

## 3. Grammatical Terminology

I deploy a small amount of grammatical terminology, some of which I expect to be familiar, but some of which is a little idiosyncratic. It is simplest to introduce this all up front. Semantic terminology will be introduced *in situ*.

First, I divide English lexemes into a handful of categories, mostly standard. There are just a couple of things to note: (i) I do not treat modals as a subset of verbs, but as belonging to a distinct category all of their own (more on this below); and (ii) I distinguish between articles and determiners, and in a somewhat unusual way (I classify the so-called "indefinite article" as a determiner, for example). Here are the categories I will be assuming, with some examples:

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

Pronouns and their forms can be counted in various ways, no one way standing out as obviously correct. I count eight, and label them in the standard way: first, second, and third person, each either singular or plural (which makes six), and then an additional two in the third person singular, distinguishing male and female from neuter. Thus:

| Number     | Person       | Pronoun      |
| ---------- | ------------ | ------------ |
| *Singular* | First        | **`"I"`**    |
|            | Second       | **`"you"`**  |
|            | Third Male   | **`"he"`**   |
|            | Third Female | **`"she"`**  |
|            | Third Neuter | **`"it"`**   |
| *Plural*   | First        | **`"we"`**   |
|            | Second       | **`"you"`**  |
|            | Third        | **`"they"`** |

Since the old second person singular **`"thou"`** was usurped by its corresponding plural pronoun **`"you"`**, the latter is no ambiguous. It is simplest to distinguish *two* pronouns here, both spelt the same. The distinction reveals itself in (what I call) the third direct form (`"yourself"` vs `"yourselves"`).

The eight pronouns come in five different forms, three *direct* forms and two *relative* forms:

| Pronoun      | Direct 1 | Direct 2 | Direct 3       | Relative 1 | Relative 2 |
| ------------ | -------- | -------- | -------------- | ---------- | ---------- |
| **`"I"`**    | `"I"`    | `"me"`   | `"myself"`     | `"my"`     | `"mine"`   |
| **`"you"`**  | `"you"`  | `"you"`  | `"yourself"`   | `"your"`   | `"yours"`  |
| **`"he"`**   | `"he"`   | `"him"`  | `"himself"`    | `"his"`    | `"his"`    |
| **`"she"`**  | `"she"`  | `"her"`  | `"herself"`    | `"her"`    | `"her"`    |
| **`"it"`**   | `"it"`   | `"it"`   | `"itself"`     | `"its"`    | `"its"`    |
| **`"we"`**   | `"we"`   | `"us"`   | `"ourselves"`  | `"our"`    | `"ours"`   |
| **`"you"`**  | `"you"`  | `"you"`  | `"yourselves"` | `"your"`   | `"yours"`  |
| **`"they"`** | `"they"` | `"them"` | `"themselves"` | `"their"`  | `"theirs"` |

My labels for these forms is idiosyncratic. People will likely know the third direct form as the *reflexive* form, for instance, and the first relative form as the *possessive* form. I dislike the second of these terms, since the first relative form does not signal the relation of possession in particular, but simply the idea of a relation more generally (see section 5.6 below). The first, however, seems harmless enough. Nevertheless, I have a general preference for bland terminology that doesn't assume or imply too much at the level of interpretation.

This general preference extends itself to my labels for the various forms of the verbs. The English verbs (apart from **`"be"`**, which I will come to in a moment) all come in five forms, a *base* form, two *finite* forms, and two *participle* forms. For example:

| Verb          | Base      | Finite 1    | Finite 2   | Participle 1 | Participle 2 |
| ------------- | --------- | ----------- | ---------- | ------------ | ------------ |
| **`"do"`**    | `"do"`    | `"does"`    | `"did"`    | `"doing"`    | `"done"`     |
| **`"have"`**  | `"have"`  | `"has"`     | `"had"`    | `"having"`   | `"had"`      |
| **`"like"`**  | `"like"`  | `"likes"`   | `"liked"`  | `"liking"`   | `"liked"`    |
| **`"make"`**  | `"make"`  | `"makes"`   | `"made"`   | `"making"`   | `"made"`     |
| **`"sing"`**  | `"sing"`  | `"sings"`   | `"sang"`   | `"singing"`  | `"sung"`     |
| **`"teach"`** | `"teach"` | `"teaches"` | `"taught"` | `"teaching"` | `"taught"`   |

For regular verbs, and for some otherwise irregular ones as well, the second finite form and the second participle form are identical, a fact that must surely have some semantic significance. Nevertheless, it is convenient to draw the distinction for every verb.

At first blush, readers may recognise the first and second finite forms as the "present tense" and "past tense" forms respectively. I strongly oppose this loaded terminology, since it is a matter of considerable controversy what these forms signify, and whether it is (or whether it is always) temporal information. It is better to settle at the outset on some semantically neutral labels. I said *at first blush*; in fact, the "present tense" standardly refers to a *dual* form, which (in my terms) sometimes looks like the base form, and sometimes looks like the first finite form. There is of course a very natural reason for this: `"I like you"` and `"He likes you"` encode messages that differ only in respect of who is doing the liking. But the fact that the base form can be used in this way, as informationally equivalent to the first finite form, is itself a very striking one, that demands its explanation. Talk of a dual "present tense" form serves only to hide this curious feature of English, as though the `"like"` in `"I like you"` was not really the base form of the verb at all, but a finite form that merely happens to look like the base form.

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

While undeniably akin to the verbs, they have no participle forms and no base form. While most grammars treat them as special kinds of verbs, I prefer to place them in a distinct category of their own. As with the uniquely irregular verb **`"be"`**, but even more so in their case, I expect some explanation of the striking syntactic differences from the verbs. In other words, I expect the modals to show up in a closely related but nevertheless distinct part of the English code. If they were not somehow separated within the workings of the function, nothing would prevent them from acquiring all the usual five forms that the verbs enjoy. Or rather, that gets things back to front, since these lexemes seem to have started life as verbs like any other: if they had not migrated to a separate part of the function, then, nothing would explain why they each *lost* three or four of their forms.

## 4. The Theory Part 1/2: The Nucleus

The overarching hypothesis behind my model is that every atomic English message is made up out of a series of zero or more *elaborations* applied to a core *nucleus*. (The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.) Consequently my theory as a whole consists of two interlocking theories: a theory of plain English messages (i.e. those messages composed of an unelaborated nucleus), and a theory of English elaborations. I begin by describing the first of these.

The nucleus of every English message is an ordered pair, containing an *object* and a *condition*, and a plain message affirms the present satisfaction of the condition by the object:

    type alias Nucleus =
        ( Object, Condition )

For example, and using some very crude representations of objects and conditions for now:

    ( Victor, love Grannie )
        -> "Victor loves Grannie."
    
    ( Grannie, live at Cockroach Lane )
        -> "Grannie lives at Cockroach Lane."

There should be nothing surprising here. The object/condition distinction at the level of the message corresponds exactly to the familiar subject/predicate distinction at the level of the sentence. In this respect, my theory is positively boring. Things get more interesting as we start to chip away at the nature of objects and conditions themselves.

### 4.1. Objects

There are three objects available in English, each of which comes in either a singular or a plural form (represented in my model by a boolean argument, `False` for singular and `True` for plural):

    type Object
        = Speaker Bool
        | Hearer Bool
        | Other Bool (Maybe Sex) (Maybe String)
    
    type Sex
        = Male
        | Female

The `Speaker` and `Hearer` objects are encoded in the pronouns `"I"`, `"we"`, and `"you"`. (`"You"` is ambiguous between the singular and the plural, though the singular and plural `Hearer` objects do distinguish themselves in other contexts, when they show up as `"yourself"` and `"yourselves"` respectively.) By default, the `Other` object is encoded in the pronouns `"it"`, `"he"`, `"she"`, and `"they"` (I trust the influence of the optional `Sex` argument here is self-explanatory). In the case of `Other` objects only, English has room for an optional string argument. This argument is intended to house a proper name (`"Victor"`, `"Grannie"`, `"France"`, etc.), which overwrites the default pronoun. There is no restriction in the English code on what can count as a proper name; the only rule is that it should begin with a capital letter.

When referring to objects in what follows, I will adopt the following abbreviating conventions. Rather than write `Speaker False` and `Speaker True`, I will write `Speaker` and `Speakers` respectively; similarly for `Hearer(s)` and `Other(s)`. When the optional sex and string arguments are not present, I will simply omit them, instead of explicitly writing `Nothing`. And when they are present, I will simply write them on their own, as `Male` or `Female` instead of `Just Male` or `Just Female`. Finally, when the sex variable is present, I will not bother to write `Other` in front of it. For example:

| Abbreviation       | Full Meaning                                 |
| ------------------ | -------------------------------------------- |
| `Speaker`          | `Speaker False`                              |
| `Hearers`          | `Hearer True`                                |
| `Male`             | `Other False (Just Male) Nothing`            |
| `Female "Grannie"` | `Other False (Just Female) (Just "Grannie")` |
| `Others`           | `Other True Nothing Nothing`                 |

I hope these conventions are all intuitive and easy to understand. The point of adopting them is just to make the examples that follow easier on all of us. I will introduce similar conventions with regard to the writing out of conditions, once we have started unpacking their component parts.

### 4.2. Conditions Part 1/2: Balances

English conditions, in my model, break down into a *pivot* and a (possibly empty) list of *balances*:

    type alias Condition =
        ( Pivot, List Balance )

Very approximately, and just to set us off on the right foot, the pivot is what gets encoded in the verb at the start of the predicate, while the balances (if any) are what get encoded in the words following that verb. Balances typically are or include additional objects, which I will refer to as *balancing* objects (as opposed to the *main* object that resides next to the condition in the nucleus itself). Balancing objects are variables of exactly the same type as the main object, though in this position they fetch up in different forms of the corresponding pronoun: `"him"` instead of `"he"`, `"her"` instead of `"she"`, `"us"` instead of `"we"`, and so on.

I will examine pivots more closely in the next section. For now, we can continue with the approximation that they are encoded in the verb at the start of the predicate, and I will restrict myself to examples for which this is true. Since objects are already familiar, it will perhaps be easier to unpack the notion of a balance first.

A balance consists of either a *counter* or a *weight* (or both), where the counter is something encoded in a preposition, and a weight is either a repaet of the main object of the nucleus, or a distinct object:

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

There are currently 31 counters in my model, though I didn't bother listing them all above. The full list of 31 is anyway incomplete, but accounts for the most common prepositions. When the weight has the `SameObject` value, the result is a reflexive pronoun like `"myself"`, `"yourself"`, `"yourselves"`, with the pronoun in question being determined by the main object of the nucleus. (It is in this context, as noted above, that the distinction between singular and plural `Hearer` objects reveals itself.) When it has the `Different` value, the additional object argument determines the pronoun, which shows up in a form like `"me"`, `"him"`, `"her"`, etc.

When referring to balances from now on, I will adopt - in addition to the abbreviating conventions already outlined for objects - a few more such conventions in the same spirit. Whenever a counter or a weight is absent, I will simply omit it, rather than explicitly writing `Nothing`; and when it is present, I will simply write it on its own, as e.g. `Against` instead of `Just Against`. When the weight is a different object, I will not bother explictly writing `Different`, but write the object on its own (abbreviated as before). And finally, when a balance contains only a counter or only a weight (i.e. not both), I will drop the brackets around it. For example:

| Abbreviation                  | Full Meaning                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `Out`                         | `( Just Out, Nothing )`                                                        |
| `Others`                      | `( Nothing, Just (Different (Other True Nothing Nothing)) )`                   |
| `( Behind, Hearer )`          | `( Just Behind, Just (Different (Hearer False)) )`                             |
| `( For, SameObject )`         | `( Just For, Just SameObject )`                                                |
| `( With, Female "Grannie" )`  | `( Just With, Just (Different (Other False (Just Female) (Just "Grannie"))) )` |

If it wasn't clear before, I trust this table illustrates the benefits of conventions like these. I adopt them not just to save space, but to make my examples easier to read and understand. Brackets and `Just`s and `False`s all over the place are necessary for compilers, but for human readers they very often serve to obscure more than to illuminate.

And now for some examples themselves, making use of these abbreviating conventions, and with a view to solidifying the understanding of balances:

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

### 4.3. Conditions Part 2/2: Pivots

I divide pivots into three main kinds, as follows:

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

The `Be` pivot, as you would expect, is encoded in the verb `"be"`, and the boolean argument it takes marks whether the condition as a whole is *ongoing* or not; this is the difference between, for example, `"He is silly"` and `"He is being silly"`. The optional property argument is responsible for the output adjective (`"silly"` in the two examples just given). As you can see, the `Property` type at present is just an alias for a `String`, meaning that users are required to encode properties into their corresponding adjectives for themselves. I am not presently inclined to give my model a great dictionary of properties/adjectives.

When a `Be` pivot has a property, typically no balances are required to make a complete condition. In some cases, however, with a suitable property and a suitable counter, a property can exist alongside a balancing object. For example, and adopting some abbreviating conventions along the same lines as those already laid out:

    ( Male "Robert", ( Be "hungry", [] ) )
        -> "Robert is hungry."
    
    ( Hearer, ( Be, [ Male "Robert" ] ) )
        -> "You are Robert."
    
    ( Hearer, ( Be, [ Like, Male "Robert" ] ) )
        -> "You are like Robert."
    
    ( Speakers, ( Be "happy", [ For, Hearers ] ) )
        -> "We are happy for you."

Some readers might be wondering why the property variable is attached to the pivot itself, instead of showing up in the list of balances. There are a few reasons for this. One is that the `Do` pivot - which I will come to shortly - can support balances but cannot support properties. The other is that balances, as I intend them, are predominantly meant for holding *objects*, and properties are fundamentally different kinds of things, belonging in a separate part of the code. The third reason depends on my theory of elaborations, and consequently I cannot explain it here; see section ?? below.

The `Seem` pivot operates exactly like the `Be` pivot, taking a boolean argument specifying whether or not the condition is ongoing, and an optional property argument. It is for messages to the effect that things *seem* as the corresponding `Be` message says they *are*. The optional `Sense` argument specifies the sense to which these appearances present themselves. For example:

    ( Female "Grannie", ( Seem "angry", [] ) )
        -> "Grannie seems angry."
    
    ( Female "Grannie", ( Seem Sight "angry", [] ) )
        -> "Grannie looks angry."
    
    ( Female "Grannie", ( Seem Sound "angry", [] ) )
        -> "Grannie sounds angry."

Finally, the `Do` pivot is essentially my catch-all variable for every other pivot expressible in the English language (of which there are probably tens of thousands). The `Verbality` variable is intended to capture the idea that gets encoded in the verb, but for now it is just an alias for a string, meaning that (as with the `Property` variable) users are obliged to encode these for themselves. My system should generate the appropriate *form* of the verb for your message, but you need to supply the verb yourself (in its base form, e.g. `"eat"`, `"dance"`, `"live"`). Following the `Verbality`, there is a boolean argument representing whether or not the condition in question is ongoing, exactly as it does with the other pivots; this underlies the difference between, for example, `"She lives"` and `"She is living"`.

Despite the enormous variety of `Do` pivots, they all have two things in common, and which distinguish them from `Be` and `Seem` pivots. The first is that they cannot include a `Property`; one can *be* angry, *seem* angry, or *look* angry, but one cannot *jump* angry, or *smile* angry. The second is that, in addition to being ongoing or not, they can also be *passive* or not, and this is the point of the second boolean argument. This underlies the different between, for example, `"Grannie is eating"` and `"Grannie is being eaten"`.

### 4.4. Limitations

It should go without saying that my theory is incomplete, a work in progress that stands in need of significant expansion and refinement. My theory of plain messages in particular - more specifically my theory of English *conditions* - is the most strikingly incomplete aspect of the whole. My aim in this section is to get out in front of any criticisms on this score, by acknowledging the most egregious of these inadequacies, and explaining why I am in no great hurry to address them. The main point, by way of headline, is that I am more interested in the theory of elaborations, and I expect that any philosophers who are likely to take an interest in my work will share this bias. My theory of plain messages is not intended to make any very great headway into that field, then, but rather to provide just enough to serve as the basis for my main project, the theory of elaborations.

The relatively untroubling inadequacy in my theory of plain messages is that it doesn't predict enough of the data. In other words, there are plain messages that my model can neither represent nor encode into their corresponding sentences. This is relatively untroubling because it doesn't indicate that I am on the wrong track; it merely reminds us that - of course - I have yet to reach the end of it. Here is a very simple example of a sentence I am unable to account for:

    "I am here."

For what it is worth, my current thinking is that this sentence should be accounted for by expanding the type definition for a `Weight`, to include options for *places* as well as objects. These options would include, at least, *here*, *there*, *home*, *abroad*, and *away*. By itself, this addition is not difficult to implement, although it would have implications in the implementation of my theory of elaborations that I am not yet sure how to handle. And in any case, quite simply, one has to stop somewhere. (`"Somewhere"`, incidentally, would be the result of elaborating a message with a place variable like *here* or *there* in its underlying condition; my model doesn't predict the uses of this word yet either.)

More worryingly, I am unable to generate compound prepositional phrases like `"in front of"` or `"over and above"`. And while I can generate `"up to"`, I need two balances to do it; for example:

    ( Male, ( Do "look", [ Up, ( To, Female ) ] ) )
        -> "He looks up to her."

This just doesn't seem like the right structural diagnosis. Overall, it looks as though my treatment of counters is not only incomplete but also inaccurate. It is an approximation at best.

More worrying still is that there are ambiguities I am unable to account for. This is particularly regrettable, because the ability to account for ambiguities is precisely the main selling point of my approach as a whole. In my defence, I can account for several ambiguities with my theory of elaborations, and that, as I advertised above, is where my main interests lie. There are some ambiguities, however, that need to be accounted for by the theory of plain messages, and my model is not yet able to do this. The ambiguities in question concern how balances fit into the overall condition, informational differences that are not captured when we represent balances simply as a list. For example:

    "He is looking at Grannie with Victor."

This sentence is ambiguous: is he with Victor, looking at Grannie, or is Grannie with Victor, both being looked at by him? There must be two distinct conditions here, and consequently two distinct messages, both of which fetch up in the same English sentence. But I have no way of representing the difference. On my model as it stands, I have room only for one message to correspond to this sentence:

    ( Male, ( Do "look" Ongoing, [ ( At, Female "Grannie" ), ( With, Male "Victor" ) ] ) )

Evidently, then, there is more to a condition than just a pivot and a bare *list* of balances. To understand a condition fully, one must appreciate how each individual balance relates to the pivot, and that information is not always signalled in the output string. But this is a problem for another day.

Finally, perhaps the most striking weakness in my theory of plain messages is that it currently predicts far too much. This is because my model makes *no attempt whatsoever* to validate input conditions. In constructing balances, users are allowed to combine any counter with any (or no) object; while in constructing the condition itself, they may append any balance to any pivot. As a result it is possible - let me not mince words - to generate *complete and utter nonsense* within my system. For instance:

    ( Male "Victor", ( love, [ At, ( Behind, Female "Grannie" ), For ] ) )
        -> "Victor loves at behind Grannie for."
    
    ( Female "Grannie", ( live, [ Speaker, Hearer, ( Over, SameObject ) ] ) )
        -> "Grannie lives me you over herself."
    
    ( Female "Grannie", ( Be "red", [ Speakers ] ) )
        -> "Grannie is red us."
    
    ( Others, ( Seem Taste "heavy", [ Hearer, ( With, Other ) ] ) )
        -> "They taste heavy you with it."

Obviously this is a very serious inadequacy, and I make no attempt to shy away from this fact. I am not, however, in any great hurry to develop my theory further in this direction, and to write in constraints on what counts as a valid condition. This is for two reasons. First, the task is quite simply an enormous one, requiring the collation of literally tens of thousands of pivots, noting - just for starters - how many balances each of these can support, and which counters are needed or allowed within these balances. It is not a task for one person alone. Secondly, although I by no means wish to belittle the value of this endeavour, my own interests currently lie elsewhere, in the theory of English elaborations. I offer this crude theory of plain messages predominantly just so that I have a basis on which to build this latter theory. And I am anticipating that my critics will share this bias, and therefore show me some leniency with regard to my rough and ready model of conditions.

## 4. The Theory Part 2/2: The Elaborations

The idea of a message elaboration is itself nothing new; philosophers and logicians will recognise it as a propositional operator by another name. I avoid this more familiar terminology partly in deference to Dudman (the "nucleus"/"elaboration" terminology is his), and partly to avoid unwanted connotations from the last hundred years or so of semantic and logical enquiry. While there is a degree of overlap, the elaborations that I posit are in general rather different from the kinds of operators philosophers are familiar with. And this, in turn, is because my approach is so different. Always my aim is to *explain the sentences* that English speakers produce, rather than to capture the logical entailments of English messages in any formal system.

Since elaborations are so central to my theory, I adopt the convention of writing them in ALLCAPS, so as to render them easily distinguishable from the other aspects of my system. There are currently eleven elaborations posited by my model. This list is no doubt incomplete, but it represents - or so I hope - a substantial start. I am not yet in a position to say how many elaborations there are in English, but I would hazard something in the region of twenty.

Though it will not make much sense up front, here is the full type definition for messages (details of the individual elaborations to follow):

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

*[My model was recently changed significantly (13/06/2017), rendering the notes that used to be here largely obsolete. I am in the process of updating them, but in the meantime they are incomplete.]*

### 4.1. NEGATIVE Messages

The chief puzzle facing any theory of negation in English is posed by the related ambiguities discovered, for example, in the following two sentences:

    "Claire doesn't drink."
    
    "I was not busy all day."

In the first case, the speaker might be maintaining that Claire is tee-totalled, or might instead be denying that she is an alcoholic. The latter reading is consistent with Claire enjoying a drink now and then, while the former is not. In the second case, the speaker might be affirming that she was free all day yesterday, or might rather be rejecting the claim that she was occupied all day. The latter interpretation is consistent with her having been busy at some point in the day, while the former is not. In sum, the first interpretation of each sentence is a positive message about something internally negative, whereas the second is a negative message about something internally positive. (The possibility of these two kinds of negation is also why double negation isn't always vacuous: `"Claire doesn't not drink"`, for example, can be used perfectly intelligibly to deny that she is tee-totalled.)

My model posits a NEGATIVE elaboration, which has the effect of converting any affirmative message into its corresponding denial. The difference between the pairs of messages just noted is accounted for by the *order* in which this elaboration is applied, relative to other elaborations in the message. In the second of each pair, the NEGATIVE elaboration is the outermost one, whereas in the first of each pair it is closer to the nucleus, with a further elaboration applied on top of it. For my account of these other elaborations, and hence my complete solution to this puzzle, see sections 4.4 and 4.5 below.

The NEGATIVE elaboration is the most semantically versatile of those posited by my model. While its effect, as I have said, is always to turn an affirmative message into its corresponding denial, there are different components of messages that can be the focus of a denial. What exactly is being denied in a NEGATIVE message depends on the elaboration to which the negation itself is applied, and hence discussion of the other elaborations below will include details on what happens when you negate them.

### 4.2. PAST and PRIOR Messages

*[...]*

### 4.3. DISPLACED Messages

*[...]*

### 4.4. REGULAR and PREORDAINED Messages

*[...]*

### 4.5. EXTENDED and SCATTERED Messages

The elaborations examined in this section share the interesting property of being *invisible*, in the sense that they have, in and of themselves, no effect on the output sentence. They each take an additional argument alongside their input message, and this argument does have a visible effect. Even with this extra argument, however, these elaborations are the source of some striking English ambiguities when they interact with other elaborations, notably negation.

The EXTENDED elaboration, first, has the semantic effect of creating a message that entails the satisfaction of its input condition over an extended period of time, taking an additional argument specifying the *duration* of this period:

    type Message
        = ...
        | EXTENDED Duration Message
    
    type alias Duration =
        String

The elaboration itself, as I have said, has no effect on the sentence. The duration argument, meanwhile, results in an adverbial string appended to the end of the predicate. My model is presently unable to encode durations into adverbial string; users must encode these for themselves. Thus here, as in several other places, the type is just an alias for a string. For example:

    PAST (EXTENDED "for a year" ( Female "Susan", ( Do "study", [ ( In, Other "France" ) ] )))
        -> "Susan studied in France for a year."
    
    PAST (EXTENDED "all day" ( Female "Grannie", ( Do "berate", [ Male "Victor" ] )))
        -> "Grannie berated Victor all day."

The SCATTERED elaboration, second, has the semantic effect of producing a message that entails the satisfaction of its input condition on multiple separate occasions, and its grammatical effect is likewise the appending of an adverbial string, which in this case encodes the *tally* of individual satisfactions:

    type Message
        = ...
        | SCATTERED Tally Message
    
    type alias Tally =
        String

As with the duration argument, my model is not currently able to encode tallies. Some examples:

    PAST (SCATTERED "twice" ( Female "Susan", ( Do "go", [ ( To, Other "France" ) ] ) ))
        -> "Susan went to France twice."
    
    PAST (SCATTERED "fifteen times" ( Female "Grannie", ( Do "fall", [ Down ] ) ))
        -> "Grannie fell down fifteen times."

EXTENDED and SCATTERED messages are not discovered in the wild except when they have been further modified with a PAST elaboration (as in the examples above), or some other elaboration that prevents them from amounting to an affirmation concerning the present. This is for the obvious reason that the present is an instant, and EXTENDED and SCATTERED conditions necessarily require a *region* of time in which to be satisfied.

When negating an EXTENDED or a SCATTERED message, the result is a negation of the duration or tally, not of the underlying condition itself. In order to negate the underlying condition, the NEGATIVE elaboration must be applied *before* the EXTENDED or SCATTERED elaboration. With this point in mind, I can now be clearer about my solution to the puzzle I posed about negation in section 4.1. Recall the ambiguous sentence:

    "I was not busy all day."

I diagnose the first reading, in which the speaker is affirming that she was free all day, as a PAST EXTENDED NEGATIVE message, where the idea of being busy is first negated, then extended to the whole day, and then that resulting message consigned to the past:

    PAST (EXTENDED "all day" (NEGATIVE ( Speaker, ( Be "busy" ) )))

The second reading, in which the speaker is denying that she was occupied all day, is instead a PAST NEGATIVE EXTENDED message:

    PAST (NEGATIVE (EXTENDED "all day" ( Speaker, ( Be "busy" ) )))

Needless to say, the order in which the NEGATIVE and EXTENDED elaborations is applied has a notable semantic effect. But it has no grammatical effect: the output sentence is the same either way.

The very same ambiguity arises through the interaction of the NEGATIVE elaboration with the SCATTERED elaboration, though typically the NEGATIVE SCATTERED interpretation will seem more natural than the SCATTERED NEGATIVE, because it may often be hard to make sense of an occasion on which something *didn't* happen. English speakers will likely read `"Grannie didn't fall down fifteen times"` as a precusor to saying, for example, that she took only *fourteen* tumbles that day. Suppose, however, that she went for a walk last Thursday, faltering fifteen times but always remaining on her feet. Then one would have a natural use for the PAST SCATTERED NEGATIVE as well as the more common PAST NEGATIVE SCATTERED.

### 4.6. INDIRECT, ENUMERATED, and AMASSED Messages

*[...]*
