# Victor

A model of the English language, thought of as a code for processing *messages* (structured arrangements of informational choices) into *sentences* (strings of words). Inspired by the work of grammarian and logician Victor Howard Dudman, and with a gracious nod to Claude Shannon, the founder of information theory. Read on for an outline of the model and the philosophy behind it, and play around with the current version at [https://merivale.github.io/victor/](https://merivale.github.io/victor/).

For exposition purposes, the model is divided into four layers of increasing complexity (each one in its own git branch). There is also a zeroth layer for the full theory (the `master` branch), identical to the fourth but without the introductory explanations. Users unfamiliar with the theory should look at the README for the full theory first, then move through the four layers of the model in turn.

- Full Theory (the `master` branch)
    - [view README and source](https://github.com/merivale/victor/)
    - [experiment with the model](https://merivale.github.io/victor/)

1. Plain Messages (the `plain` branch)
    - [view README and source](https://github.com/merivale/victor/tree/plain)
    - [experiment with the model](https://merivale.github.io/victor/plain.html)
2. Short Elaborations (the `short` branch)
    - [view README and source](https://github.com/merivale/victor/tree/short)
    - [experiment with the model](https://merivale.github.io/victor/short.html)
3. Long Elaborations (the `long` branch)
    - [view README and source](https://github.com/merivale/victor/tree/long)
    - [experiment with the model](https://merivale.github.io/victor/long.html)
4. Object Elaborations (the `object` branch)
    - [view README and source](https://github.com/merivale/victor/tree/object)
    - [experiment with the model](https://merivale.github.io/victor/object.html)

## The Full Theory

You are currently viewing the README for the full theory (the `master` branch).

1. [The Point](#1-the-point)
2. [The Source](#2-the-source)
3. [The Theory](#3-the-theory)
4. [Tense, Time, and Targets](#4-tense-time-and-targets)

### 1. The Point

My project does not fit neatly into existing intellectual paradigms. Indeed, it seeks to subvert them. Dudman presented his work as a contribution to philosophical semantics, urging that this subject needed to be approached grammatically. But the codebreaker's methodology is scarcely less radical in grammatical circles than it is in philosophical ones. (Many linguists, it is true, have embraced the code *analogy*; but the methodology that analogy suggests remains largely untested.) I am apt to suspect that philosophers missed the significance of Dudman's ideas largely as a result of failing to appreciate what he meant by "grammar". To make matters worse, there is a venerable tradition in analytic philosophy, going right back to Bertrand Russell, of viewing "surface" grammar as positively at odds with the "deeper" logical realities. Insofar as there was ever any truth to these worries, they simply reflected bad grammatical theory; and insofar as the grammar was sound, they reflected dubious logical and semantic speculation lazily divorced from empirical fact. For the codebreaker, grammar, logic, and semantics are all facets of one and the same scientific enterprise.

The standard picture in philosophical circles nowadays is that the science of language divides into three parts. The first, *syntax*, seeks to uncover the rules governing the construction of grammatical or well-formed sentences. The second and third, *semantics* and *pragmatics*, attempt to articulate the meanings of the sentences thus constructed, and the relationship between these two sides of the communicative coin (the signs and what they signify). Semantics is the study of the meanings of sentences in general, on the assumption that there are such things, and that they are related functionally to the sentences that convey them. Pragmatics is the study of the meanings of sentences in context, something that is observed to go above and beyond their semantic or literal meaning. It is generally assumed that this layer of meaning is not functionally determined, and consequently not susceptible to the sort of formal treatment typical of philosophical semantics; the sentence determines a literal meaning, on this view, but that literal meaning then serves (together with other contextual factors) as evidence for the pragmatically enriched information.

When philosophers think of grammar, they think of syntax; grammar, to their minds, is the study of how sentences are formed. Grammarians, however, are not generally in the habit of trying to specify formal syntactic rules of the sort philosophers routinely describe for their artificial languages (with the exception of practitioners of generative grammar, that is, who are in the habit of doing precisely this). Moreover, grammarians typically see their remit as extending beyond syntax; into morphology and phenology, for instance, but more importantly for present purposes into semantics as well. But the grammatical approach to semantics differs strikingly from the philosophical approach: where philosophers delight in general rules, and tend to downplay their exceptions (or perhaps shrug them off as problems for pragmatics), grammarians prefer to catalogue the several different uses of a given syntactic device, showing little interest in speculation about any deeper regularities that might underlie the surface variety.

Nowhere is this lack of interest in underlying regularities more striking than in grammatical discussions of the meanings of the inflectional forms of the English verbs and modals. The present tense, it is said, is used to talk about the present (`"He is hungry"`, `"I can hear someone at the door"`), the future (`"We are meeting them tomorrow"`, `"I can see you next week"`, `"If she leaves on Thursday, ..."`), all time (`"Salt dissolves in water"`, `"You always say that"`), and even no time at all (`"Two plus two equals four"`, `"A vixen is a female fox"`). The past tense, meanwhile, is observed in talk about the past (`"He was hungry"`, `"I could hear someone at the door"`), the future (`"We were meeting them tomorrow"`, `"I could see you next week"`), and what is often diagnosed as "unreality", be it past, present, or future (`"If she had been here yesterday, ..."`/`"If she was here now, ..."`/`"If she came by here tomorrow, ..."`). This is all well and good, as far as it goes. But to the mind of a truly scientific enquirer, it does not go nearly far enough. What we want is a general theory that predicts and explains all of these intriguingly different uses.

When we turn to the philosophers, alas, we are no less disappointed. They love their general rules, but conversely tend to show little interest in the tantalisingly varied data of English usage. Philosophical theories of tense and time achieve regularity simply by stipulation. And if these stipulations don't match the English language? Well, that just goes to show how messy natural languages are (more work for pragmatics, I suppose), how misleading the grammar of English is, and what a good thing it is that Frege and Russell set us on the track of developing clear and precise artificial languages in which to conduct our business instead.

We can do better. And the way to do better is to embrace the codebreaker's methodology. Philosophical semantics treats languages as functions from sentences to their (literal and context-independent) interpretations, with the inputs to those functions coming from the quite separate field of grammar or syntax. I suggest that they are approaching the problem the wrong way around. Languages should be modelled as functions in precisely the *opposite* direction, as codes for processing messages into sentences. Syntax and semantics would then no longer be separate subjects, but one and the same: the function that connects sentences to their interpretations is also the function that generates those sentences in the first place.

By modelling the function in my preferred direction, therefore, we have a way of bringing semantic theories directly into contact with the observable data. These theories can no longer ignore or dismiss the words English speakers use to convey their messages, as problems for grammar or pragmatics. Consequently my approach promises the best of both worlds: the formal rigour and quest for general theory typical of modern philosophical semantics, but with the kind of attention to empirical detail that we find in contemporary grammatical enquiry. Nor is this an empty promise. Building on Dudman's work, I am developing a unified theory of tense and time in English, which reduces all of the surface variety observable in the use of the finite forms of the English verbs to the interplay of just a handful of very simple rules. If Dudman and I are right, then English is neither the complex and capricious system grammarians often describe, nor the irregular mess philosophers typically assume. It is an elegant, precise, and formally specifiable code.

There is also another, more specific reason why the direction in which we model the semantic function matters, and it is based on the phenomenon of ambiguity. The decision to treat the message as a function of the sentence forces us into an uncomfortable theoretical position, whereby ambiguous sentences are, from the semantic point of view, quite simply impossible. This may be fine for unambiguous artificial languages, but since the sentences of natural languages are typically rife with ambiguity, philosophers have no option but to offer syntactic or pragmatic accounts of this - as they see it - messy and unwelcome feature of the real world. I argue (though not here) that these accounts are unsatisfactory. What we need are *semantic* explanations of ambiguity. By modelling languages as codes, i.e. as functions from messages to sentences, semantic explanations of ambiguity become possible. The explanation in general is that the encoding function of an ambiguous language is not one-to-one, but many-to-one. Ambiguous languages are thus *lossy* codes, which do not preserve in their output strings all of the information in their input messages. More than this, however, by articulating the English encoding function, we are able to see precisely how and why various English ambiguities arise.

(The obverse of ambiguity is the phenomenon of stylistic variance, whereby the same information is encoded in more than one sentence. Stylistic variance includes optional abbreviations (`"She is not hungry"`/`"She's not hungry"`/`"She isn't hungry"`), word order (`"He left yesterday"`/`"Yesterday he left"`), and a few other things as well. It poses no threat to the code analogy. It simply means that we must build stylistic as well as informational choices into the code. The better to focus on the latter for now, my model does not yet include any stylistic variables, insisting on just one "canonical" output for every infomational input. In a later iteration, however, I do intend to add some stylistic arguments to my function.)

### 2. The Source

My algorithm is written in [Elm](http://elm-lang.org/), with the styles written in [Less](http://lesscss.org/). The compiled HTML+JS+CSS is stored in the gh-pages branch, for easy integration with [GitHub Pages](https://pages.github.com/). The `src` directory contains the main program module, which simply pulls everything together (nothing to see there), and two subdirectories, `Interface` and `Theory`. The former directory contains all the modules responsible for generating the web page users see, for keeping track of user input, and for piecing that input together into a message variable. It is the modules in the latter directory that are potentially of theoretical interest, since they describe what a message variable looks like, and define the encoding function that converts these variables into strings.

There is no need to go into detail about the `Theory` modules here. Anyone interested in the nuts and bolts should simply read the code itself. It is internally documented, and is intended to be intelligible to anyone of a suitably logical turn of mind (although obviously some experience of functional programming would help). Indeed, I consider it a major selling point of my theory that it is computationally very simple. Readers should start with the `Types` module for my account of messages (and their components), and then glance at the `Words` module. This latter contains a few small functions for generating words and their various forms. It is not very interesting in itself, but is perhaps helpful in serving to solidify an understanding of the grammatical terminology that I use.

Next, readers should look at the `Sentences` module, which contains the encoding function itself, the function for processing messages into sentences. This function divides into two stages. In the first stage, the message is validated, and the variables that have a bearing on the output sentence are extracted; in the second stage, those variables are used to generate the sentence itself. The second stage is implemented directly within the `Sentences` module (with help from the little functions exposed by the `Words` module). The first stage is handled by the separate `Messages` module.

I have not yet written any tests, but there is a stub `test` directory as a placeholder for later development in this direction. From the point of view of the theory (never mind the interface), it would be helpful to have tests that run various message variables through my encoding function, and check that the resulting strings are as they should be.

### 3. The Theory

The overarching hypothesis behind my model is that every atomic English message is made up out of a series of zero or more *elaborations* applied to a core *nucleus*. (The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.) Consequently my theory as a whole consists of two interlocking theories: a theory of plain English messages (i.e. those messages composed of an unelaborated nucleus), and a theory of English elaborations.

The nucleus of every English message is an ordered pair, containing an *object* and a *condition*:

```elm
type alias Nucleus =
    ( Object, Condition )
```

For example, and using some very crude representations of objects and conditions for now (see the [Plain Messages](https://github.com/merivale/victor/tree/plain) layer for details):

```elm
( Victor, love Grannie )
    -> "Victor loves Grannie."

( Grannie, live at Cockroach Lane )
    -> "Grannie lives at Cockroach Lane."
```

There should be nothing very surprising here. The object/condition distinction at the level of the message corresponds exactly to the familiar subject/predicate distinction at the level of the sentence. In this respect, my theory is positively boring.

Every plain English message, I submit, affirms the present satisfaction of the condition by the object. Denials, generalisations, talk about the past and the future, and various other things besides, are all handled by my theory of elaborations.

The idea of a message elaboration is itself nothing new; philosophers and logicians will recognise it as a propositional operator by another name. I avoid this more familiar terminology partly in deference to Dudman (the "nucleus"/"elaboration" terminology is his), and partly to avoid unwanted connotations from the last hundred years or so of semantic and logical enquiry. While there is a degree of overlap, the elaborations that I posit are in general rather different from the kinds of operators philosophers are familiar with. And this, in turn, is because my approach is so different. Always my aim is to explain the sentences that English speakers produce, rather than to capture the logical entailments of English messages in any formal system.

Since elaborations are so central to my theory, I adopt the convention of writing them in `ALLCAPS`, so as to render them easily distinguishable from the other aspects of my system. There are currently 11 elaborations posited by my model. This list is no doubt incomplete, but it represents - or so I hope - a substantial start. Though it will not make much sense up front, here is the full type definition for messages:

```elm
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
```

The definition is recursive, reflecting the fact that the elaborations can all be applied on top of each other, presumptively without limit or restriction. In fact there are some combinations that English rules inadmissible, but not many (details as we come to them). Rather than write a more convoluted type definition that makes these combinations impossible, I have instead written some validation checks into the encoding function itself (see the `Messages` module). The function returns an error in cases of such invalid input.

For ease of exposition, I divide these elaborations into *short* elaborations, *long* elaborations, and *object* elaborations. There is nothing theoretically very significant about this distinction; it simply enables me to introduce things in manageable chunks. Hence the Short Elaborations, Long Elaborations, and Object Elaborations layers, that add progressively more elaborations to my model.

### 4. Tense, Time, and Targets

The elaborations that I posit all have what I call *global scope*, but *local influence*. By this I mean that they all operate on messages as a whole (global scope), but that their semantic effect invariably applies only to one particular component of the message (local influence): sometimes the object, sometimes the condition (or a component part of the condition), sometimes an extra-nuclear argument introduced by a previous elaboration, and in a couple of cases the time of the condition's satisfaction. I will refer to this as the *target* of the elaboration.

In messages with elaborate conditions (i.e. with elaborations that target the condition), we can distinguish the *outermost* condition from the *underlying* condition. Having done so, we can then further distinguish the time of the former's satisfaction from the time of the latter's satisfaction. Consider, for example, the following pair of sentences:

```elm
"He is going to see her next week."

"He was going to see her next week."
```

For my full account of the messages these sentences encode, see the [Long Elaborations](https://github.com/merivale/victor/tree/long) layer. For now, suffice it to note that they both have the same underlying condition (encoded as `"see her"`), and the same outermost condition (encoded as `"go to see her next week"`), with the latter being an elaboration of the former. The first message affirms the present satisfaction of the outermost condition, while the second message affirms the past satisfaction of the outermost condition. In both cases, meanwhile, the time of the underlying condition's satisfaction is future.

The failure to distinguish between the outermost condition and the underlying condition, and more specifically between the times of their respective satisfaction, is a source of considerable confusion in speculation about the semantic significance of tense. As a result, existing theories of tense and time are extremely complicated, maintaining that the present tense sometimes signals the present, sometimes the future, sometimes all time, and so on; and that the past tense sometimes signals the past, sometimes the future, sometimes unreality, or what have you (recall [section 1](#1-the-point) above). My own theory of the significance of tense, in contrast, is simplicity itself: the present tense always encodes present time, while the past tense always encodes past time. Crucially, however, this is (at least in simple sentences, to which my theory is currently limited) the time of the *outermost* condition's satisfaction. The time of the *underlying* condition's satisfaction, meanwhile, is another matter entirely, as is the "reality" or otherwise of its satisfaction.

It is not so much that my theory is simpler than the alternatives (it is simpler, but not in the way you might immediately expect, as I will explain in a moment). To account for the complexity in the data, theoretical complexity needs to be posited somewhere or other. The point is that, in my view, the complexity is not in the relationship between time and the form of the verb or modal, but in the relationship between plain conditions and their more elaborate counterparts. English has elaborations that generate conditions whose satisfaction at a given point in time concerns the *earlier* satisfaction of the underlying condition, the *later* satisfaction of the underlying condition, *multiple* satisfactions of the underlying condition at different times, or even the *imagined* and potentially *unreal* satisfaction of the underlying condition. This makes possible a rich variety of talk within a system that is, at bottom, binary: the satisfaction of the outermost condition is only ever present or past.

In particular, I maintain that the satisfaction of the outermost condition is never future (though of course the satisfaction of the underlying condition often is). More particularly still, I diagnose sentences like `"He will/can/may see her next week"` as encoding messages that affirm, not the future satisfaction of a plain condition (encoded as `"see her"`), but the present satisfaction of an elaborate condition (encoded as `"will/can/may see her next week"`); and sentences like `"He would/could/might see her next week"` as encoding messsages that affirm the corresponding past satisfaction of this very same condition. Of course this diagnosis will be controversial, and it is far from obvious. I hope, however, that it is not obviously *false* either, and that in any case sceptical readers will suspend their disbelief at least until they have heard me out.

The way in which my theory is ultimately simpler than its rivals is in its realisation of the English encoding function. If the semantic complexity we are presently considering can be attributed to the elaborations that target conditions, rather than to the relationship bewteen time and the form of the verb or modal, then the functional mapping from message to sentence becomes considerably simpler. In a nutshell, plain messages call for the present tense form, `PAST` messages (which change the time of the outermost condition's satisfaction from present to past) call for the past tense form, while assorted other elaborations call for the addition of more words to the sentence (notably another verb or modal at the start of the predicate, shunting the previous verb further along in the sentence). Indeed, though there is plenty of other evidence to corroborate my theory, I take its eminent simplicity in this respect to be a considerable point in its favour. Rival theories would necessarily entail much more computational complexity.

If I am right, then it is an interesting question *why* English has no future tense, *why* it does not afford its speakers the facility to convey messages about the future satisfaction of an outermost condition. Philosophers have tended to assume that semantic theories should reflect metaphysical realities, and have also tended, at least in recent times, to suppose that the future is metaphysically no less real than the present and the past. As a result of these two tendencies, theories like mine have scarcely even been considered. For my part, I incline to agree with the second of these tendencies (the predictive success of the theory of relativity, it seems to me, makes this overwhelmingly more likely than the alternative). But that is by the by. The relevant point is that I strongly *disagree* with the first tendency. What semantic theories should reflect, simply enough, is the linguistic data. Whether the theories those data suggest reflect metaphysical realities or not is an empirical question. If my reading of the data is on the right lines, meanwhile, then English reflects *epistemic* realities much more than metaphysical ones. When it comes to the past and the present, we can and do make observational reports; when it comes to the future, however, the most we can do is predict. This difference, I submit, is built into the English code at the most fundamental level.
