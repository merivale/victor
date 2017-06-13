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

The overarching hypothesis behind my model is that every atomic English message is made up out of a series of zero or more *elaborations* applied to a core *nucleus*. (The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.) Consequently my theory as a whole consists of two interlocking theories: a theory of plain English messages (i.e. those messages composed of an unelaborated nucleus), and a theory of English elaborations. Naturally enough, I will start with the first.

The nucleus of every English message is an ordered pair, containing an *object* and a *condition*, and a plain message affirms the present satisfaction of the condition by the object:

    type alias Nucleus =
        ( Object, Condition )

For example, and using some very crude representations of objects and conditions for now:

    ( Victor, love Grannie )
        -> "Victor loves Grannie."
    
    ( Grannie, live at Cockroach Lane )
        -> "Grannie lives at Cockroach Lane."

There should be nothing surprising here. The object/condition distinction at the level of the message corresponds exactly to the familiar subject/predicate distinction at the level of the sentence. In this respect, my theory is positively boring. Things get more interesting as we start to chip away at the nature of objects and conditions themselves.

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

When referring to objects in what follows, I will adopt the following abbreviating conventions. Rather than write `Speaker False` and `Speaker True`, I will write `Speaker` and `Speakers` respectively; similarly for `Hearer(s)` and `Other(s)`. When the optional sex and string arguments are not present, I will simply omit them, instead of explicitly writing `Nothing`. And when they are present, I will simply write them on their own, as `Male` or `Female` instead of `Just Male` or `Just Female`. Finally, when the sex variable is present, I will not bother to write `Other` in front of it. For example:

| Abbreviation       | Full Meaning                                 |
| ------------------ | -------------------------------------------- |
| `Speaker`          | `Speaker False`                              |
| `Hearers`          | `Hearer True`                                |
| `Male`             | `Other False (Just Male) Nothing`            |
| `Female "Grannie"` | `Other False (Just Female) (Just "Grannie")` |
| `Others`           | `Other True Nothing Nothing`                 |

I hope these conventions are all intuitive and easy to understand. The point of adopting them is just to make the examples that follow easier on all of us. I will introduce similar conventions with regard to the writing out of conditions, once we have started unpacking their component parts.

### 3.2. Conditions Part 1/2: Balances

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

At this point I must issue a major disclaimer. It should go without saying that my theory is incomplete and in need of further development and refinement. Nowhere is its partial nature more evident, however, than in its failure to provide *any kind of validation whatsoever* for conditions. In the construction of a balance, it allows users to combine any counter with any (or no) object; while in the construction of a condition itself, it allows any balances to be appended to any pivot. Consequently it is possible - let me not mince words - to generate complete and utter nonsense within my system. For instance:

    ( Male "Victor", ( love, [ At, ( Behind, Female "Grannie" ), For ] ) )
        -> "Victor loves at behind Grannie for."
    
    ( Female "Grannie", ( live, [ Speaker, Hearer, ( Over, SameObject ) ] ) )
        -> "Grannie lives me you over herself."

What this means, from an empirical point of view, is that my theory of plain English messages predicts whole swathes of messages that it shouldn't predict, messages that are incoherent and which - when fed through my encoding function - result in nonsensical or even ungrammatical sentences.

Obviously this is a very serious inadequacy, and I make no attempt to shy away from this fact. I am not, however, in any great hurry to develop my theory further in this direction, and to write in constraints on what counts as a valid condition. This is for two reasons. First, the task is quite simply an enormous one, requiring the collation of literally tens of thousands of pivots, noting - just for starters - how many balances each of these can accompany, and which counters are needed or allowed within these balances. It is not a task for one person alone. Secondly, although I by no means wish to belittle the value of this endeavour, my own interests currently lie elsewhere, in the theory of English elaborations. I offer this - very rough and ready - theory of plain messages predominantly just so that I have a basis on which to build this latter theory. I am anticipating that my critics will share this bias, and therefore show me some leniency with regard to my model of conditions.

### 3.3. Conditions Part 2/2: Pivots

...

*[My model was recently changed significantly (13/06/2017), rendering the notes that used to be here largely obsolete. I am in the process of updating them, and will post them back here soon.]*

## 4. The Theory Part 2/2: The Elaborations

The idea of a message elaboration is itself nothing new; philosophers and logicians will recognise it as a propositional operator by another name. I avoid this more familiar terminology partly in deference to Dudman (the "nucleus"/"elaboration" terminology is his), and partly to avoid unwanted connotations from the last hundred years or so of semantic and logical enquiry. While there is a degree of overlap, the elaborations that I posit are in general rather different from the kinds of operators philosophers are familiar with. And this, in turn, is because my approach is so different. Always my aim is to *explain the sentences* that English speakers produce, rather than to capture the logical entailments of English messages in any formal system.

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

...

*[My model was recently changed significantly (13/06/2017), rendering the notes that used to be here largely obsolete. I am in the process of updating them, and will post them back here soon.]*
