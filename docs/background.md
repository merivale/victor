---
id: background
class: docs
---
# 1. Background

Victor is a computational model of the English language, thought of as a code for processing *messages* (structured arrangements of informational choices) into *sentences* (strings of words). It was inspired by the work of the philosopher and grammarian Victor Howard Dudman.

## 1. Context

The idea that languages can be modelled as codes for processing messages into sentences has a homely intuitive appeal, reflecting the commonsensical belief that they are tools for putting our thoughts into words. It also has a suitably rigourous analytical origin, in the form of Claude Shannon's information theory, the mathematical basis of communications engineering. To the best of my knowledge it was Shannon's colleague Warren Weaver who first suggested this model could also be applied to natural languages, in his popularising introduction to Shannon's work. The analogy was subsequently picked up by several linguisticians, and still holds sway in that field today. But linguisticians, I contend, have yet to take the analogy sufficiently seriously, in a sense that I will explain presently.

More worryingly, the analogy has come under attack from philosophers, largely (I surmise) as a result of its association with the idealism or psychologism that Gottlob Frege so famously opposed. Thus Michael Dummett:

> Philosophers before Frege assumed ... that what a speaker knows [when he knows a language] is a kind of code. Concepts are coded into words and thoughts, which are compounded out of concepts, into sentences, whose structure mirrors, by and large, the complexity of the thoughts. We need language, on this view, only because we happen to lack the faculty of telepathy, that is, of the direct transmission of thoughts. Communication is thus essentially like the use of a telephone: the speaker codes his thought in a transmissible medium, which is then decoded by the hearer. The whole analytical school of philosophy is founded on the rejection of this conception, first clearly repudiated by Frege.

I happen to think that Frege's arguments on this score were rather weak, or at the very least that he and his successors are guilty of having thrown the baby out with the bathwater. For present purposes, however, it suffices to point out that the code analogy itself does not entail anything about the metaphysics of linguistic information, beyond the fact that it exists, and that it is logically distinct from the signals that are used to transmit it, both points that Frege himself accepted. While these are admittedly substantial claims, and as such the potential subject of philosophical dispute, they are comparatively uncontroversial. If some argument in support of them is wanted, meanwhile, I offer the standard Quinean defence: the theory is effective, and the postulation of messages as distinct from sentences is necessary for the theory.

What is most significant about the code analogy, from a philosophical point of view, is not so much the distinction between signal and information, between sentence and message, as the relationship that it posits between these two sides of the communicative coin. The standard formal approach in contemporary philosophy is to model natural languages---like the artificial logical languages of Frege and his successors---as functions from signs to what is signified. As David Lewis puts it:

> What is a language? Something which assigns meanings to certain strings of types of sounds or of marks. It could therefore be a function, a set of ordered pairs of strings and meanings. The entities in the domain of the function are certain finite sequences of types of vocal sounds, or of types of inscribable marks; if *σ* is in the domain of a language *£*, let us call *σ* a sentence of *£*. The entities in the range of the function are meanings; if *σ* is a sentence of *£*, let us call *£(σ)* the meaning of *σ* in *£*.

Modern philosophical semantics is precisely the study of these meaning-determining rules. Thus A. P. Martinich: "Every semantics consists of two parts: rules that specify the meanings of the basic elements of the language (either words or the simplest sentences); and rules that specify how the meanings of the complex sentences are determined." According to the code analogy, however, languages are functions running in precisely the *opposite* direction, with sentences as the *outputs* of the system rather than its inputs.

And so I return, in a roundabout way, to what I mean by taking the code analogy seriously: I mean embracing the formal methodology that this analogy suggests. The methodology is that of the codebreaker, whose aim is to uncover the semantic trigger behind every syntactic decision in the language, and to describe in detail the function that generates the output signal from the informational input. Better yet, modern day codebreakers really have no reason not to realise this function in a concrete computer algorithm. Such algorithms leave the theoretician nowhere to hide, ensuring a complete and precise specification of the theory, while also providing an invaluable tool for testing that theory against the linguistic data. To this end, I have produced (what I am fairly sure is) *the first such algorithm for English*. Of course it is far from being able to predict everything, and in some respects it predicts too much. In other words, not only are there still many grammatical sentences that it doesn't generate, there are also some ungrammatical strings that it does. But every science must begin somewhere, and my claim for the theory at this stage is merely that it constitutes a substantial and promising start, more than enough for a satisfactory proof of concept.

Both my model and my method are heavily informed by the work of the late 20th century theoretician V. H. Dudman. More than anyone else that I know of, he took the code analogy seriously in the sense that I have in mind here. He did not go so far as to implement his model algorithmically, but though his discussions were informal, he very rigorously described significant parts of the English encoding function as he saw it. The function I have implemented is rather different from his, and we differ in particular on the matter of message structure. Nevertheless, my theory retains the spirit (if not the form) of some of his most significant claims. With his work to build on, moreover, I have been able to move the collective endeavour further forward, most notably by incorporating articles and determiners (`"the"`, `"this"`, `"that"`, `"all"`, `"any"`, `"every"`, `"some"`, etc.) into my model.

Dudman started life as a philosopher and logician (and more specifically a Frege scholar), but upon embracing the code analogy he abandoned his Fregean roots, writing that "it is the key to Frege's philosophy of language that he got the relationship between the sentence and its informational burden back to front". From then on he styled himself as a grammarian bent on persuading philosophers of logic and language to approach their subject grammatically. "Grammar is a necessary preliminary to semantics," he wrote. From a purely marketing point of view, this was perhaps not the best decision, for it obscures the fact that the codebreaker's methodology is scarcely less radical in grammatical circles than it is in philosophical ones. His philosophical antagonists, it seems to me, never really understood what Dudman meant by "grammar", and thereby missed the full force of his arguments. To make matters worse, there is a venerable tradition in analytic philosophy, going right back to Bertrand Russell, of viewing "surface" grammar as positively at odds with the "deeper" logical realities. Insofar as there was ever any truth to these worries, it seems to me, they simply reflected bad grammatical theory; and insofar as the grammar was sound, they reflected dubious logical and semantic speculation lazily divorced from grammatical fact. For the codebreaker, grammar, logic, and semantics are all facets of one and the same scientific enterprise.

The strength of my methodological case ultimately rests with the predictive and explanatory power of the theory itself. In other words, the methodology is justified by its results, not by any abstract reasoning *a priori*. At this juncture, therefore, the reader may prefer to move straight on to the [theoretical overview](/overview). For those who would like some additional context, however, I offer below some general motivations for my project. The main argument is that there are some important linguistic phenomena that have, I believe, yet to be adequately explained by either grammarians or philosophers working in the current paradigm, but that submit to elegant and satisfying explanations when we reverse the direction of semantic enquiry.

## 2. The Science of Language

Modern philosophical semantics, I have said, treats the message as a function of the sentence. More fully, the standard picture nowadays is that the science of language divides into three parts. The first, *syntax*, seeks to uncover the rules governing the construction of grammatical or well-formed sentences. The second and third, *semantics* and *pragmatics*, attempt to articulate the meanings of the sentences thus constructed, and the relationship between the signs and what they signify. Semantics is the study of the meanings of sentences *in general*, on the assumption that these meanings are related functionally to the sentences that convey them. Pragmatics is the study of the meanings of sentences *in context*, something that is observed to go above and beyond their semantic or literal meaning. It is generally assumed that this layer of meaning is not functionally determined, and consequently not susceptible to the sort of formal treatment typical of philosophical semantics; the sentence determines a literal meaning, on this view, but that literal meaning then serves (together with other contextual factors) as *evidence for* the pragmatically enriched information.

In the light of this, the codebreaker's methodology represents something of a paradigm shift in the science of language. Philosophical semantics, as Dudman urged, has got the relationship between the sentence and its informational burden back to front. Semantic information is not linguistically *determined* meaning, but linguistically *encoded* meaning. The upshot of this seemingly small but nonetheless significant reversal, is that the previously distinct subjects of syntax and semantics fuse into one larger programme: the function that connects sentences to their semantic interpretations is also the function that generates those sentences in the first place. With apologies to Noam Chomsky, therefore, the project of generative grammar---the project of uncovering rules for generating sentences independently of their interpretations---becomes redundant following this methodological revolution. The re-imagined project of philosophical semantics, meanwhile, in picking up the grammatical slack, takes on a much more overtly empirical character, with one of its main purposes being now to *explain the sentences* that speakers of a given language produce.

This last point will be clearer if illustrated with a particular example. According to standard semantic theory, the sentence `"If Socrates was a man, Socrates was mortal"`, conveys a compound message, whose two component messages are conveyed by the sentences `"Socrates was a man"` and `"Socrates was mortal"`. I agree, and in partial confirmation of this diagnosis we may observe---straightforwardly enough---that these two shorter sentences are both found inside the longer one. But now consider the sentence `"If it rains, we will get wet"`. Standard semantic theory likewise diagnoses this sentence as conveying a compound message, whose two component messages are conveyed by the sentences `"It will rain"` and `"We will get wet"`. I do *not* agree, for several reasons that I won't go into here. But *one* of those reasons, very simply, is that the string `"It will rain"` does not occur anywhere in the larger sentence.

The point of this example is not to argue that the standard analysis of the second conditional message is wrong; that is a much longer argument for another day. The point is rather to illustrate the change in perspective that my proposal entails. Thus far, the standard analysis has been maintained on the basis of logical and semantic intuitions alone, *in spite of* the very obvious syntactic evidence to the contrary. This latter evidence is simply dismissed as a quite separate problem for English grammar, and I have never seen a defender of the standard analysis attempt to explain it. Now I am certainly not suggesting that logical and semantic intuitions are irrelevant in the science of language. Far from it, they are absolutely essential to our enquiry. But for the codebreaker, these intuitions need to be backed up and potentially modified by a hard look at the empirical data, and by a rigorous attempt to specify how the information as we model it fetches up in the sentences as we see them. Making claims about the structure of our messages based solely on intuition is, it seems to me, like making claims about the structure of chemical compounds based solely on taste. The codebreaker's methodology is spectroscopy for semantics, and no linguistic scientist can afford to ignore it.

This, in a nutshell, is what Dudman meant by his insistence that philosophers of language approach semantics more grammatically. As I have already said, however, this remark invites misunderstanding, since the codebreaker's methodology is as unfamiliar to grammarians as it is to philosophers. If philosophers of language need to approach their subject more grammatically, grammarians need to approach their subject more philosophically. For where philosophical theories of semantics are general in nature, with little regard paid to the syntactic particularities, grammatical theories of semantics are sensitive to those particulars, but frustratingly refuse to generalise. Grammarians seem content to catalogue the several different uses of a given syntactic device, while showing little interest in speculation about any deeper regularities that might underlie the surface variety.

Nowhere is this lack of interest in underlying regularities more striking than in grammatical discussions of the meanings of the inflectional forms of the English verbs and modals. The present tense form, it is said, is used not only to talk about the present (`"He is hungry"`, `"I can hear someone at the door"`), but also the future (`"We are meeting them tomorrow"`, `"I can see you next week"`, `"If she leaves on Thursday, ..."`), and all time (`"Salt dissolves in water"`, `"You always say that"`). The past tense form, meanwhile, is observed not only in talk about the past (`"He was hungry"`, `"I could hear someone at the door"`), but also the future (`"We were meeting them tomorrow"`, `"I could see you next week"`), and what is often diagnosed as “unreality”, be it past, present, or future (`"If she had been here yesterday, ..."`/`"If she was here now, ..."`/`"If she came here tomorrow, ..."`). This is all well and good, as far as it goes. But to the mind of a truly systematic enquirer, it does not go nearly far enough. What we want is a general theory that predicts and explains all of these intriguingly different uses.

By modelling the semantic function in my preferred direction, we have a way of bringing semantic theories directly into contact with the observable data. These theories can no longer ignore the words English speakers use to convey their messages, or dismiss them as problems for the separate fields of grammar or syntax. Consequently my approach promises the best of both worlds: the formal rigour and quest for general theory typical of modern philosophical semantics, but with the kind of attention to empirical detail that we find in contemporary grammatical enquiry. Nor is this an empty promise. Building on Dudman's work, I have developed a unified theory of tense and time in English, which reduces all of the surface variety observable in the use of the finite forms of the English verbs and modals to the interplay of just a handful of very simple rules. If Dudman and I are right, then English is neither the complex and capricious system grammarians often describe, nor the irregular mess philosophers typically assume. It is an elegant, precise, and formally specifiable code.

## 3. Ambiguity

There is also another, more particular reason why the direction in which we model the semantic function matters, and it is based on the phenomenon of ambiguity. From the theoretical point of view, this phenomenon divides into three different cases, corresponding to the standard trichotomy of syntax, semantics, and pragmatics. Syntactic ambiguity is the phenomenon of multiple sentences, each one unambiguous in itself, ambiguously having the same appearance. The string, `"They can fish"`, for example, is ambiguous between a claim about their ability to catch aquatic animals, and a claim about their tendency to put those animals in cans. On reflection, however, it is plausible to maintain that there is not really one sentence here, but two. The first contains the present tense form of the modal **`"can"`** followed by the base form of the verb **`"fish"`**, while the second contains the present tense form of the verb **`"can"`** followed by the plural form of the noun **`"fish"`**. A sentence is made up of words, and consequently different words---even if they happen to look the same in one or other of their forms---make for different sentences.

Pragmatic ambiguity, next, is the phenomenon of one sentence having a skeletal semantic interpretation that can, in different contexts, be fleshed out in different ways. Consider, for example, the sentence, `"I enjoyed your book"`. In what respect is the book in question yours? Are you its author, its editor, or its owner? And in what way, exactly, did I enjoy it? Did I enjoy reading it, studying it, discussing it, or perhaps eating it? Taken whichever way, there is only one sentence here. But there is also only one message, i.e. one literal and context-independent interpretation, namely that I enjoyed (in one way or another) the book that is related (somehow or other) to you. The ambiguity here is a matter for pragmatics, the result of there being different kinds of pragmatic information that can fill out the form of the unambiguous semantic information.

Semantic ambiguity, finally, is the phenomenon of one sentence having more than one literal and context-independent interpretation. For example, the sentence `"If the telephone rang, he would ignore it"` can convey both a past generalisation, and a one-off prediction about the future. There is no lexical ambiguity here, and the sentence is the same said either way. But nor is this a matter of a skeletal message being fleshed out in different ways; there is no single skeletal message that can be either about the past or about the future, and which is neither a one-off claim nor a generalisation. On the contrary, the *flesh* of these two messages, so to speak, is precisely what they have in common. Where they differ is in their bones.

The decision to treat the message as a function of the sentence forces us into an uncomfortable position, whereby semantic ambiguity, in the sense just described, becomes a theoretical impossibility. This is for the simple reason that functions, by definition, must assign a unique output to every input. Admittedly, the diagnosis of any given ambiguity as syntactic, semantic, or pragmatic is a matter for theoretical debate. Suppose the example I gave just now is not really a genuine case of semantic ambiguity, but turns out to be better explained in either syntactic or pragmatic terms. If that's the case, then maybe there are after all *no* genuine cases of semantic ambiguity. I myself, of course, would argue that there are; indeed, I *will* argue that there are in the course of expounding my theory. For now, however, the first thing to note is simply that the mainstream approach gives a hostage to fortune in this respect, and for no apparent reason. Codebreakers can offer syntactic and pragmatic explanations of ambiguity like anyone else; and we can also, should the need arise, offer semantic explanations.

The obverse of semantic ambiguity is the phenomenon of *stylistic variance*, whereby the same information is encoded in more than one sentence. Stylistic variance includes optional abbreviations (`"She is not hungry"`/`"She's not hungry"`/`"She isn't hungry"`), word order (`"He left yesterday"`/`"Yesterday he left"`), and a few other things besides. On the face of it, this phenomenon poses an exactly analogous threat to the codebreaker's methodology that semantic ambiguity poses to the mainstream alternative. This way around, however, the problem is easily solved, and its solution is obvious: we must simply build stylistic as well as informational choices into our model.

The present incarnation of my model does not include any options for stylistic variance, allowing just one "canonic" output for every informational combination. In the interests of completeness, I do intend to add stylistic choices in due course. In the first instance, however, I felt it would make both the theory and the code easier to understand if I restricted my model exclusively to informational factors. I trust it is obvious that the simplification this entails is harmless, and easily remedied.

## 4. Phrase Markers

Philosophers traditionally divide non-pragmatic ambiguities into *lexical* and *structural*. The former are ambiguities attributable to an individual word or lexeme; not, on the standard account, because the lexeme is itself ambiguous, but because multiple lexemes may ambiguously have the same appearance in some of their forms. The example I gave of a syntactic ambiguity at the start of the previous section was the result of two such lexical ambiguities (**`"can"`** the verb versus **`"can"`** the modal, and **`"fish"`** the verb versus **`"fish"`** the noun). Structural ambiguities, meanwhile, are ambiguities that arise through the *combination* of words, when it is unclear how the meanings of those words are supposed to slot together in the overall message. For example:

```haskell
"Donald is dangerous and mad or just plain stupid."
```

```haskell
"I didn't eat for four hours."
```

The first of these sentences is ambiguous between a conjunctive claim (he is dangerous, and he is either mad or just plain stupid) and a disjunctive claim (either he is dangerous and mad, or he is just plain stupid). The second is ambiguous between a denial that I ate for four hours (it was three and a half at most) and an assertion that, for four hours, no food passed my lips.

If sentences are strings of words, then lexical ambiguity is the only kind of ambiguity that will submit to a syntactic treatment. And so it is on my view, where structural ambiguities all call for *semantic* explanations. In the face of the problem posed by ambiguity, however, the traditional approach to semantics is sustained in part by a view of sentences as more elaborate *structures* of words, something like---if not exactly---the phrase markers postulated by generative grammar. On this view, there are many more sentences than there initially appear to be, and structural ambiguities are also susceptible of syntactic explanations. The idea here is seldom spelt out explicitly, but we find it most clearly in the Tarski-Davidson tradition of truth-conditional semantics. Thus Richard Larson and Gabriel Segal, for instance, maintain that "strings of words that are ambiguous in meaning are always also ambiguous in form", and consequently that "ambiguity is not really a semantic property at all but rather a syntactic property".

Returning to the two examples just given, we can attribute the ambiguity in these cases to matters of *scope*, something which is not marked in the string of words, but which could easily be marked in a more perspicuous syntactic structure like a phrase marker. Rather than write out the whole phrase markers, we can in these cases illustrate the point with some rough and ready bracketing:

```haskell
"Donald is: [dangerous] and [mad or just plain stupid]."
"Donald is: [dangerous and mad] or [just plain stupid]."
```

```haskell
"I didn't-[eat for four hours]."
"I didn't-[eat] for four hours."
```

These structural explanations have the appearance of being satisfactory. Indeed I believe that, at their core, they *are* satisfactory; it is just that for me the structural differences are to be sought in the underlying messages themselves, not in the postulated syntactically structured items.

The trouble with these syntactic explanations is that they fail to generalise. The example of a semantic ambiguity that I gave in the previous section was carefully chosen with this in mind:

```haskell
"If the telephone rang, he would ignore it."
```

This sentence, recall, is ambiguous between a past generalisation, and a one-off prediction about the future. But there is no visible scope ambiguity here, and there is in any case only one phrase marker corresponding to this sentence. It is very unclear how the standard approach can accommodate examples like these.

Nor is this the end of their difficulties. Consider, for example, the following two sentences:

```haskell
"They are getting married."
```

```haskell
"Grannie enjoyed a spliff."
```

The first of these sentences is ambiguous between a claim about a current wedding, and a claim about an upcoming one. Let us call the first the *direct* interpretation, and the second---following standard grammatical practice---the *futurate* interpretation. The second of these sentences, meanwhile, is ambiguous between a claim about an isolated incident, and a claim about Grannie's former habits. The first may again be considered the *direct* interpretation; let us dub the second the *habitual* interpretation.

Self-evidently, the ambiguities here cannot be explained in structural terms. There is nothing in either pair of messages to set up any conflicts over scope. Defenders of the syntactic approach therefore have no choice but to treat these ambiguities as lexical, and there is in each case only one plausible culprit: the verb at the start of the predicate. But of course there is nothing special about the verbs **`"be"`** and **`"enjoy"`** in this regard. The trio of direct, futurate, and habitual uses of the English verb is a quite general phenomenon. Consequently defenders of the status quo are forced into the unhappy position that the English verbs are all triply lexically ambiguous.

Nor can we stop here. A fully accurate theory of English must also accommodate the habitual-futurate and the futurate-habitual uses:

```haskell
"They are always getting married in July."
-- and every year some excuse is found to postpone it again
```

```haskell
-- cannabis just doesn't do it for her any more:
"Starting tomorrow, Grannie gets her kicks from harder stuff."
```

Apparently, then, English verbs are lexically ambiguous in at least *five* different ways: direct, habitual, futurate, habitual-futurate, and futurate-habitual. This is a most unwelcome consequence. Aside from the fact that it is not in nature of lexical ambiguities to be systematic in this way, it should anyway be clear that this is really no explanation at all. For the careful theoretician, lexical ambiguity is the account of last resort, tantamount to the postulation of a brute, inexplicable coincidence.

We have come full circle. Current best grammatical theory has no satisfactory account of the various uses of the inflectional forms of the verbs and modals, being content merely to catalogue them, without venturing any explanation in terms of deeper underlying regularities. Current best philosophical theory, meanwhile, can offer no satisfactory account of the ambiguities that arise in connection with these different uses, being obliged to suppose that the verbs and modals themselves are systematically ambiguous. By reversing the direction of semantic enquiry, I believe, we can do much better.