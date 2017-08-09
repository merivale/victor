# Victor

A model of the English language, thought of as a code for processing *messages* (structured arrangements of informational choices) into *sentences* (strings of words). Inspired by the work of grammarian and logician Victor Howard Dudman, and with a gracious nod to Claude Shannon, the founder of information theory. Read on for an outline of the model and the philosophy behind it, and play around with the current version at [https://merivale.github.io/victor/](https://merivale.github.io/victor/).

For exposition purposes, the model is divided into four layers (GitHub branches) of increasing complexity. There is also a zeroth layer (the master branch) for the full theory, identical to the fourth but without the introductory explanations. Users unfamiliar with the theory should view the README for the Full Theory first, then move through the four layers of the model in turn.

- Full Theory (the `master` branch)
    - [view README and source](https://github.com/merivale/victor/)
    - [experiment with the model](https://merivale.github.io/victor/)

1. Plain Messages (the *plain* branch)
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

You are currently viewing the README for the Full Theory (the `master` branch).

1. [The Point](#1-the-point)
2. [The Source](#2-the-source)

### 1. The Point

My project does not fit neatly into existing intellectual paradigms. Indeed, it seeks to subvert them. Dudman presented his work as a contribution to philosophical semantics, urging that this subject needed to be approached grammatically. But the codebreaker's methodology is scarcely less radical in grammatical circles than it is in philosophical ones. (Many linguists, it is true, have embraced the code *analogy*; but the methodology that analogy suggests remains largely untested.) I am apt to suspect that philosophers missed the significance of Dudman's ideas largely as a result of failing to appreciate what he meant by "grammar". To make matters worse, there is a venerable tradition in analytic philosophy, going right back to Bertrand Russell, of viewing "surface" grammar as positively at odds with the "deeper" logical realities. Insofar as there was ever any truth to these worries, they simply reflected bad grammatical theory; and insofar as the grammar was sound, they reflected dubious logical and semantic speculation lazily divorced from empirical fact. For the codebreaker, grammar, logic, and semantics are all facets of one and the same scientific enterprise.

The standard picture in philosophical circles nowadays is that the science of language divides into three parts. The first, *syntax*, seeks to uncover the rules governing the construction of grammatical or well-formed sentences. The second and third, *semantics* and *pragmatics*, attempt to articulate the meanings of the sentences thus constructed, and the relationship between these two sides of the communicative coin (the signs and what they signify). Semantics is the study of the meanings of sentences in general, on the assumption that there are such things, and that they are related functionally to the sentences that convey them. Pragmatics is the study of the meanings of sentences in context, something that is observed to go above and beyond their semantic or literal meaning. It is generally assumed that this layer of meaning is not functionally determined, and consequently not susceptible to the sort of formal treatment typical of philosophical semantics; the sentence determines a literal meaning, on this view, but that literal meaning then serves (together with other contextual factors) as evidence for the pragmatically enriched information.

When philosophers think of grammar, they think of syntax; grammar, to their minds, is the study of how sentences are formed. Grammarians, however, are not generally in the habit of trying to specify formal syntactic rules of the sort philosophers routinely describe for their artificial languages (with the exception of practitioners of generative grammar, that is, who are in the habit of doing precisely this). Moreover, grammarians typically see their remit as extending beyond syntax; into morphology and phenology, for instance, but more importantly for present purposes into semantics as well. But the grammatical approach to semantics differs strikingly from the philosophical approach: where philosophers delight in general rules, and tend to downplay their exceptions (or perhaps shrug them off as problems for pragmatics), grammarians prefer to catalogue the several different uses of a given syntactic device, showing little interest in speculation about any deeper regularities that might underlie the surface variety.

Nowhere is this lack of interest in underlying regularities more striking than in grammatical discussions of the meanings of the inflectional forms of the English verbs. The so-called "present tense" form, it is said, is used to talk about the present (`"I am hungry"`), the future (`"We are seeing him tomorrow"`, `"If she leaves next week, ..."`), and all time (`"Salt dissolves in water"`, `"You always say that"`). The so-called "past tense" form, meanwhile, is observed in talk about the past (`"I was hungry"`), the future (`"We were seeing him tomorrow"`), and what is often diagnosed as "unreality", be it past, present, or future (`"If she had been here yesterday, ..."`/`"If she was here now, ..."`/`"If she came by here tomorrow, ..."`). This is all well and good, as far as it goes. But to the mind of a truly scientific enquirer, it does not go nearly far enough. What we want is a general theory that predicts and explains all of these intriguingly different uses.

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
