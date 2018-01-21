---
id: overview
class: docs
---
# 2. Overview

## 1. Source Code

The algorithm is written it in [Elm](http://elm-lang.org/), a statically typed functional programming language based on Haskell, that compiles to HTML and JavaScript. There is no need to go into great detail about the reasons for this choice. It is essential to my aims that the program be readily accessible to anyone who might take an interest in the theory. Consequently the obvious thing to do is develop a web application, avoiding the need for users to download or install any additional software, and the need for me to compile different versions for different operating systems. Writing the source code directly in JavaScript, however, is undesirable for a number of reasons, most of which will be familiar to anyone with experience of that hastily-written language, and none of which need repeating here. Elm offers all the benefits of web deployment with none of the drawbacks of JavaScript, not to mention all the intrinsic advantages of a well-developed and robust language like Haskell.

The source code, avaiable for inspection at [https://github.com/merivale/victor/](https://github.com/merivale/victor/) is divided into two subdirectories, `Interface` and `Theory`. The former directory contains all of the modules responsible for generating the web page users see, for keeping track of user input, and for piecing that input together into a message variable. It is the modules in the latter directory that are of theoretical interest, since they describe what a message variable looks like, and define the encoding function that converts these variables into strings.

The `Theory` directory contains two modules, `Sentences` and `Messages`, together with a small `Utils` module exposing a handful of useful but theoretically uninteresting functions. The `Sentences` module defines the English sentence, as a function of a message. The encoding function is in two main stages: (1) an "exploding" stage, in which the message is unpacked recursively, validated, and all of the variables that will have an impact on the output sentence are extracted; (2) an "imploding" stage, in which those variables are brought to bear in generating the sentence itself.

The "imploding" function is defined in the `Sentences` module itself (outsourcing some legwork to the various modules in the `Words` subdirectory). The "exploding" function is defined in the `Messages` module, which also contains the type definition of the message variable. For readability, some informational ingredients are defined in separate modules in the `Ideas` subdirectory.

## 2. Plain Messages and Elaborate Messages

The overarching hypothesis behind my model is that every English message is made up out of a series of zero or more *elaborations* applied to a core *nucleus*. (The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.) My theory as a whole therefore consists of two interlocking theories: a theory of plain English messages (i.e. those messages composed of an unelaborated nucleus), and a theory of English elaborations.

The nucleus of every English message is an ordered pair, containing an *object* and a *condition*:

```haskell
type alias Nucleus =
  ( Object, Condition )
```

For example, and using some very crude representations of objects and conditions for now:

```haskell
( Victor, love Grannie )
  -> "Victor loves Grannie."
```

```haskell
( Grannie, live at Cockroach Lane )
  -> "Grannie lives at Cockroach Lane."
```

There should be nothing very surprising here. The object/condition distinction at the level of the message corresponds exactly to the familiar subject/predicate distinction at the level of the sentence.

Every plain message, I submit, affirms the present satisfaction of the condition by the object. Denials, generalisations, talk about the past and the future, compound messages, and various other things besides, are all handled by my theory of elaborations.

The idea of a message elaboration is itself nothing new; philosophers and logicians will recognise it as a propositional operator by another name. I adopt this unfamiliar terminology so as to avoid unwanted connotations from the last hundred years or so of semantic and logical enquiry. While there is a degree of overlap, the elaborations that I posit are in general rather different from the kinds of operators philosophers are familiar with. And this, in turn, is because my approach is so different. Always my aim is to explain the sentences that English speakers produce, rather than to capture the logical entailments of English messages in a formal system.

Since elaborations are so central to my theory, I adopt the convention of writing them in `ALLCAPS`, so as to render them easily distinguishable from the other aspects of my system. There are currently eleven elaborations in my model. This list is no doubt incomplete, and the number is of course liable to go up (or even down) as the theory is refined and expanded. Though it will not make much sense up front, here is the full type definition for messages:

```haskell
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

The definition is recursive, reflecting the fact that the elaborations can all be applied on top of each other, presumptively without limit or restriction. In fact there are some combinations that English rules inadmissible, but not many (details as we come to them). Rather than write a more convoluted type definition that makes these combinations impossible, I have instead written some validation checks into the encoding function itself. The function returns an error in cases of such invalid input.

## 3. Tense and Time

In messages with elaborate conditions, we can distinguish the *outermost* condition from the *underlying* condition; and, having done so, we can further distinguish the time of the former's satisfaction from the time of the latter’s satisfaction. Consider, for example, the following pair of sentences:

```haskell
"He is going to see her next week."
"He was going to see her next week."
```

My full account of the messages these sentences encode will be given later. For now, suffice it to note that they both have the same underlying condition (encoded as `"see her"`), and the same outermost condition (encoded as `"be going to see her next week"`), with the latter being an elaboration of the former. The first message affirms the *present* satisfaction of the outermost condition, while the second message affirms the *past* satisfaction of the outermost condition. In both cases, meanwhile, the time of the *underlying* condition's satisfaction is future.

The failure to distinguish between the outermost condition and the underlying condition, and more specifically between the times of their respective satisfaction, is a source of considerable confusion in speculation about the semantic significance of the present and past tense forms of the English verbs and modals. As a result, existing theories of the significance of these forms are extremely complicated, maintaining that the present tense sometimes signals the present, sometimes the future, sometimes all time; and that the past tense sometimes signals the past, sometimes the future, sometimes unreality, or what have you (recall the [background, section 2]({{ site.baseurl }}{% link background.md %}#2-the-science-of-language)). My own theory of the significance of tense, in contrast, is simplicity itself: the present tense always encodes present time, while the past tense always encodes past time. Crucially, however, this is (at least in simple sentences) the time of the *outermost* condition's satisfaction. The time of the *underlying* condition's satisfaction, meanwhile, is another matter entirely, as is the "reality" or otherwise of its satisfaction.

It is not so much that my theory is simpler than the alternatives (it is simpler, but not in the way you might immediately expect, as I will explain in a moment). To account for the complexity in the data, theoretical complexity needs to be posited somewhere or other. The point is that, in my view, the complexity is not in the relationship between tense and time, but in the relationship between plain conditions and their more elaborate counterparts. English has elaborations that generate conditions whose satisfaction at a given point in time concerns the *earlier* satisfaction of the underlying condition, the *later* satisfaction of the underlying condition, *multiple* satisfactions of the underlying condition at different times, or even the *imagined* and potentially *unreal* satisfaction of the underlying condition. This makes possible a rich variety of talk within a system that is, at bottom, binary: the satisfaction of the outermost condition is only ever present or past.

In particular, I maintain that the satisfaction of the outermost condition is never future (though of course the satisfaction of the underlying condition often is). More particularly still, I diagnose sentences like `"He will see her next week"` as encoding messages that affirm, not the future satisfaction of a plain condition (encoded as `"see her"`), but the present satisfaction of an elaborate condition (encoded as `"will see her next week"`); and sentences like `"He would see her next week"` as encoding messages that affirm the corresponding past satisfaction of this very same condition. Of course this diagnosis will be controversial, and it is far from obvious. I hope, however, that it is not obviously *false* either, and that in any case sceptical readers will suspend their disbelief at least until they have heard me out.

The way in which my theory is ultimately simpler than its rivals is in its realisation of the English encoding function. If the semantic complexity we are presently considering can be attributed to the elaborations that target conditions, rather than to the relationship between tense and time, then the functional mapping from message to sentence becomes considerably simpler. In a nutshell, plain messages call for the present tense, `PAST` messages (which change the time of the outermost condition's satisfaction from present to past) call for the past tense, while assorted other elaborations call for the addition of more words to the sentence (notably another verb or modal at the start of the predicate). Indeed, though there is plenty of other evidence to corroborate my theory, I take its eminent simplicity in this respect to be a considerable point in its favour.

If I am right, then it is an interesting question *why* English does not afford its speakers the facility to convey messages about the future satisfaction of an outermost condition. Philosophers have tended to assume that semantic theories should reflect metaphysical realities, and have also tended, at least in recent times, to suppose that the future is metaphysically no less real than the present and the past. As a result of these two tendencies, it is taken for granted that there can be no great asymmetry between talk about the present and the past on the one hand, and talk about the future on the other. For my part, I incline to agree that there is nothing metaphysically unusual about the future (the predictive success of the theory of relativity, in particular, makes this very hard to deny). But that is by the by. The relevant point is that I see no reason to suppose that semantic theories should reflect metaphysical realities. What semantic theories should reflect, simply enough, is the linguistic data. Whether the theories those data support match up with metaphysical realities or not is a purely empirical question. If my reading of the data is on the right lines, meanwhile, then English coincides with *epistemic* realities more than metaphysical ones. When it comes to the past and the present, we can and do make observational reports; when it comes to the future, the most we can do is predict, on the basis of present or past evidence. This difference, I submit, is built into the English code at the most fundamental level.
