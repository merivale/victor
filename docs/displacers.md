---
id: displacers
class: docs
---
# Displacers

## 1. Introduction

By now, readers should be familiar with my theory of plain messages (chapter 3), and my theory of short elaborations (chapter 4). The purpose of this chapter is to introduce *long* elaborations, which are those elaborations that result in an additional verb phrase or modal at the start of the predicate. This entails an expansion of the definitions of the `PREORDAINED` and `REGULAR` elaborations, and the introduction of a new `DISPLACED` elaboration, as follows:

```haskell
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
= Yes1 -- "will"
| Yes2 -- "shall"
| Yes3 -- "must"/"ought"/"need"
| Maybe1 -- "may"
| Maybe3 -- "can"
| Maybe4 -- "dare"
```

Thus far, our examples have been limited to sentences with just one verb phrase, and no modal. The displacer variable, and these three elaborations that make room for it, account for the generation of sentences with modals or more than one verb phrase. The point of the label, to be clear, is that this variable *displaces* the pivot in the nucleus of the message.

When the `PREORDAINED` or `REGULAR` elaborations have no displacer variable, I will refer to them as *conservative*. Conservative `PREORDAINED` and `REGULAR` messages are thus short elaborations, and were already introduced in the previous layer. When either of these elaborations has a primary or a secondary displacer, I will refer to them instead as *primary* or *secondary* respectively; and likewise with the `DISPLACED` elaboration, which is never conservative.

(The reason the `DISPLACED` elaboration is never conservative is because a conservative `DISPLACED` message is essentially just a plain message. Unlike the `PREORDAINED` and `REGULAR` elaborations, which have semantic significance over and above any displacer that they might introduce, the `DISPLACED` elaboration has no informational value in its own right, and serves merely to introduce a displacer. All of this will become clearer when we have seen and compared these elaborations in action.)

Here is a quick taste of the sorts of things we’ll be dealing with:

```haskell
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

I will tackle the data here in two stages, starting with primary displacers (i.e. pivots, which are responsible for additional verb phrases) in [section 2](#2-primary-displaced-preordained-and-regular-messages), and moving on to secondary displacers (i.e. modalities, which are encoded in the English modals) in [section 3](#3-secondary-displaced-messages) and [section 4](#4-secondary-preordained-and-regular-messages).

First, however, some more general remarks are called for. I have already advertised that there is no future tense in my model of English, and that sentences like `"He will see her next week"` encode present tensed messages, messages affirming the present satisfaction of an elaborate condition which, in turn, concerns the later satisfaction of its underlying condition (recall [section 2 of the README in the `src/Theory` directory](https://github.com/merivale/victor/tree/master/src/Theory#2-tense-and-time)). This, indeed, is the way of the `PREORDAINED` elaboration quite generally. We have already seen as much in the case of conservative `PREORDAINED` messages (discussed in [section 3 of the README in the `src/Theory/Short` directory](https://github.com/merivale/victor/tree/master/src/Theory/Short#3-preordained-messages)); the following sections will argue the same in the case of primary and secondary `PREORDAINED` messages. To make way for this account, I will start by (very briefly) calling into question the popular alternative view: that `"will"` is a marker of the future tense.

On this future tense hypothesis, the natural interpretations of the following three sentences differ only in the time of the condition’s satisfaction by the object:

```haskell
"It will be sunny in Paris tomorrow."

"It is sunny in Paris at the moment."

"It was sunny in Paris yesterday."
```

In the context of the theory I have been outlining, the future tense hypothesis would be captured by positing a `FUTURE` elaboration exactly symmetrical to the `PAST` elaboration, and responsible for the first sentence above (just as the `PAST` elaboration is responsible for the third).

There are several reasons for rejecting this hypothesis. I have promised to be brief, so I will mention just three. First, `"will"` is not only found in sentences encoding messages about the future. On the contrary, all three times are available:

```haskell
"It will be sunny in Paris tomorrow."

"It will be sunny in Paris at the moment."

"It will have been sunny in Paris yesterday."
```

As a first stab, what these messages seem to have in common is that they reflect the speaker’s *best guess* in the absence of concrete observation. The speaker in Paris, looking up at the sky, may opine that it *is* sunny; but the speaker in London, armed only with knowledge of the time of year and the general way of these things, will more likely venture the judgement that it *will be* sunny there. The claim that it will be sunny in Paris *tomorrow*, meanwhile, is surely much more like the Londoner’s guess than the Parisian’s report. We make use of the same words to convey it, and we say such things—necessarily—in the absence of observational confirmation.

Secondly, the behaviour of `"will"` in reported speech is difficult to square with the future tense hypothesis. Having said on Monday that it *is* sunny in Paris, I may be correctly reported on Tuesday as having said that it *was* sunny yesterday. This is to be expected, since the `PAST` elaboration does nothing but change the time of the condition’s satisfaction. But having said on Wednesday that it *will be* sunny in Paris tomorrow, the correct report on Thursday is that I said it *would be* sunny in Paris today. If my claim on Wednesday was the result of a `FUTURE` elaboration that merely located the condition’s satisfaction in the future, the correct report on Thursday should be that I said it *is* sunny in Paris today (since that future satisfaction is now present). But that is plainly *not* what I said. Following on from the first point above, that sounds like an observational report, whereas what I affirmed on Wednesday was not based on a magical observation of the future; it was my best guess given the epistemic circumstances. (What reported speech suggests is the hypothesis that `"will be"`, in these cases, encodes something like a *present* guess, where `"would be"` encodes the corresponding *past* guess. On my view, this is indeed exactly the case.)

Thirdly, wherever `"will"` shows up encoding a claim about the future, it is just one option among many, the other options being—in the first instance—the other modals:

```haskell
"It will be sunny in Paris tomorrow."

"It may be sunny in Paris tomorrow."

"It ought to be sunny in Paris tomorrow."

"It needn’t be sunny in Paris tomorrow."

...
```

To the mind of a codebreaker, these examples show fairly clearly that `"will"` does not encode futurity, any more than `"may"`, `"ought"`, or `"need"` do. Rather it encodes something on a par with what these other modals encode, and the fact that the messages here are about the future is to be explained by something else entirely.

I said that the other modals are the alternatives only in the first instance. In the second instance, we have the primary displacers as well:

```haskell
"It is going to be sunny in Paris tomorrow."

"It has to be sunny in Paris tomorrow."

"It is likely to be sunny in Paris tomorrow."

...
```

With all of this in mind, perhaps the simplest, most forceful objection to the future tense hypothesis is that it is hopelessly specific, positing one whole elaboration to account for *just one* of the uses of *just one* of the English modals, which in turn are the result of *just one* of the two kinds of displacers.

There is plenty more that could be said here, but this is not the place to pursue the argument in depth. Rather, this is the place to present my alternative hypothesis, which I believe is vastly more promising. Debates about the relative merits of the two proposals (and indeed of any other proposals intended to accommodate the same data) can then be pursued elsewhere.

## 2. Primary DISPLACED, PREORDAINED, and REGULAR Messages

Consider again the examples listed at the start of the previous section, though now with those including a modal removed:

```haskell
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

The first thing to note here is that the `"to"` in these sentences is not used in the sense of `"in order to"`. We can also say things like, `"He went out to go to the shops"`, but the message here is that he went out *in order to* go to the shops. Sentences like these, I suggest, must be the result of an altogether different elaboration, which I do not yet have in my model. That elaboration, whatever it is, introduces the *second* of the two verb phrases, elaborating the simpler message that he went out. The primary `DISPLACED` elaboration, in contrast, and the `PREORDAINED` and `REGULAR` elaborations when they too have a primary displacer, introduce the *first* of the two verb phrases: `"He seems to be upset"` encodes an elaboration of the plain message encoded as `"He is upset"`.

The next thing to note is that not every pivot can act as a primary displacer in this way. `"It is red to rain"` is not a sentence of English, for example. And while `"He sings to laugh"` has an interpretation, the interpretation is that he sings *in order to* laugh; the `Do "sing"` pivot cannot be used as a primary displacer. In fact the vast majority of pivots cannot be used as primary displacers, and it would be far simpler to list the ones that can than the ones that can’t. However, since more research is necessary before I can venture anything like a complete list, I have for the time being simply allowed *any* pivot to act in this role. Consequently it is possible, in my system, to generate nonsense strings like `"It is red to rain"`. This is a hole that will have to be plugged at a later date.

The English codebreaker faces a number of intriguing puzzles, among them how to account for the two strikingly different uses of the `"be going to"` construction, as illustrated in the following pair of sentences:

```haskell
"She is going to France."

"She is going to leave."
```

It is possible, of course, that `"be going to"` is simply inherently ambiguous, the result of two completely distinct ideas. But that would be a most disappointing discovery. The scientific mind abhors coincidence, and hungers for a deeper account, for some more general principles that might predict the two different uses without appealing to brute, lexical ambiguity.

The first of these sentences is ambiguous between a plain reading (she is en route as we speak) and a conservative `PREORDAINED` reading (the plans have been made). Thus, to be clear:

```haskell
( Female, Do "go" Ongoing, [ To, Other "France" ] )
-> "She is going to France."

PREORDAINED ( Female, Do "go" Ongoing, [ To, Other "France" ] )
-> "She is going to France." -- e.g. next month
```

Either way, this is what we might call the *basic* use of `"be going to"`; it simply arises from the `Do "go" Ongoing` verbality, and encodes the idea of going in the literal sense of moving from one place to another. Notice that neither of these messages can include any specification of the time at which she arrives. `"She is going to France tomorrow"` only has a `PREORDAINED` interpretation, and `"tomorrow"` here serves to encode the time at which she leaves, not the time at which she gets there. Thus, while the idea of going somewhere naturally invites thoughts of a later arrival, the verbality itself cannot support any specification of that later time.

These two messages do not contain any displacer. The `"be going to"`, in both cases, is coming directly from the nucleus. It is when this phrase is introduced by a displacer that things start to get interesting. Consider the following sentence:

```haskell
"She is going to see him."
```

There are now *three* relevant interpretations. On the first, she is on the way to see him as we speak. On the second, there is a prearrangement in place for her to go and see him at some unspecified time in the future. These two messages correspond to the two just examined, the second being a conservative `PREORDAINED` version of the first. But there is now also a third interpretation, unlike any we have seen before, according to which she herself needn’t be going anywhere. On this reading, her seeing him in the future is expected, but it might perfectly well be because he is coming to see her.

I diagnose the first of these three interpretations—she is on the way to his location as we speak—as a (merely) `DISPLACED` message. Thus:

```haskell
DISPLACED ( Do "go" Ongoing ) ( Female, Do "see", [ Male ] )
-> "She is going to see him."
```

The `DISPLACED` elaboration, when introducing a primary displacer, has the effect of modifying the underlying condition. The displacer itself contributes to the message just what it would contribute were it directly in the nucleus. Going to see him, in this sense, is no different from going to France, except of course for the different endpoint of the journey.

The second of the three interpretations is a conservative `PREORDAINED DISPLACED` message, simply the conservative `PREORDAINED` version of the first:

```haskell
PREORDAINED (DISPLACED ( Do "go" Ongoing ) ( Female, Do "see", [ Male ] ))
-> "She is going to see him."
```

There is nothing unusual here. What the first interpretation alleges to be happening right now, the second alleges to be prearranged for some later time. This is exactly the way of conservative `PREORDAINED` messages in general.

The interesting case is the third interpretation, which I diagnose, not as a `PREORDAINED DISPLACED` message, but rather as primary `PREORDAINED` message, i.e. the result of the `PREORDAINED` elaboration with a primary displacer:

```haskell
PREORDAINED ( Do "go" Ongoing ) ( Female, Do "see", [ Male ] )
-> "She is going to see him."
```

The difference between the second and third interpretations is that, where the former applies the idea of prearrangement to the previously displaced condition, the latter builds the displacer into the idea of the prearrangement itself. The result is a prearrangement with the metaphorical character of a journey: the plans being what they are, she is currently “on the way” to a state of affairs in which the two of them meet. This is consistent with him being the one who will do the actual moving.

We have been considering an example of prearrangement. But the `PREORDAINED` elaboration with the `Do "go" Ongoing` pivot admits of uncoloured uses as well, just like the conservative `PREORDAINED` elaboration. `"It is going to rain"`, for example, conveys nothing about any prearrangements, but rather concerns present predeterminations for the future. The fact that the coloured/uncoloured distinction applies in both primary and conservative `PREORDAINED` messages, and moreover in exactly the same way, is additional evidence that what we have here is the work of a single elaboration.

The `DISPLACED` elaboration takes no arguments besides the displacer and the underlying message. In particular, it takes no additional argument specifying the time of the underlying condition’s satisfaction. The sentence, `"She is going to see him tomorrow"`, for example, has two interpretations, a conservative `PREORDAINED DISPLACED` message and a primary `PREORDAINED` message. Either way, however, `"tomorrow"` can only be coming from the `PREORDAINED` elaboration. Just as the condition of *going to France* cannot include any specification of the time of arrival, so the more elaborate `DISPLACED` condition of *going to see him* cannot include any specification of the time of the meeting.

This point is helpful in distinguishing primary `DISPLACED` messages from primary `PREORDAINED` messages. All `PREORDAINED` messages necessarily concern a later satisfaction of the underlying condition. With primary `DISPLACED` messages, some do and some do not. Even when they do, however, there is a simple test to see whether a primary displacer has come from the `DISPLACED` elaboration or from the `PREORDAINED` elaboration: consider whether the message can include a specification of the time of the underlying condition’s satisfaction. For example, one might have thought that `"It is about to rain"`, like `"It is going to rain"`, comes from the `PREORDAINED` elaboration, on the grounds that the imminent rain is future. I submit that it comes from the `DISPLACED` elaboration, however, since—unlike with `"It is going to rain"`—no specification of *when* it rains is possible in this case. `"It is about to rain in five minutes"` is not English. Nor is this anything to do with the immediacy conveyed by `"about to"`; `"It is about to rain in one second"` is no less permissible.

I said that, with primary `DISPLACED` messages, some concern a later satisfaction of the underlying condition and some do not. That is not a very satisfactory general remark. I submit that they concern the present satisfaction of the underlying condition by default, and concern its later satisfaction only if the nature of the displacer forces this upon us. The `Do "go" Ongoing` and `( Be, About )` displacers *do* force this upon us. But many other primary displacers do not, as we will see in a moment. That the present is the default here chimes with my corresponding proposal for plain messages, and with the use of the base form for encoding any displaced pivots following the displacer.

The primary displacer `( Be, "likely" )` shows up in both `DISPLACED` and `PREORDAINED` messages, which explains an ambiguity in the sentences thereby produced, which can be taken to concern likelihoods either for the present or for the future:

```haskell
DISPLACED ( Be, "likely" ) ( Male, ( Be, [ In, Other "Spain" ] ) )
-> "He is likely to be in Spain." -- right now

PREORDAINED ( Be, "likely" ) ( Male, ( Be, [ In, Other "Spain" ] ) )
-> "He is likely to be in Spain." -- next week
```

In keeping with the general principle just proposed (that `DISPLACED` messages concern the *present* satisfaction of the underlying condition by default), the first of these messages must concern the likelihood that he is in Spain at the point of speech. In the second of these messages, meanwhile, the claim is not that there are plans for next week’s likelihood to be high (that would be a `PREORDAINED DISPLACED` message), but that the plans are such that the *present* likelihood is high. The likelihood itself is not preordained; rather, the likelihood and the idea of preordainment work together to say something jointly about the prospect of his being in Spain next week. This is exactly analogous to the difference, examined above, between `PREORDAINED (DISPLACED (Do "go" Ongoing))` messages and `PREORDAINED (Do "go" Ongoing)` messages.

The very same dichotomy is observable with displacers concerning intentional attitudes that can be directed either at the present or the future. For example:

```haskell
DISPLACED ( Do "want" ) ( Speaker, Do "live", [ In, Other "Portugal" ] )
-> "I want to live in Portugal." -- right now

PREORDAINED ( Do "want" ) ( Speaker, Do "live", [ In, Other "Portugal" ] )
-> "I want to live in Portugal." -- when I retire
```

In the second of these messages, it is not that I plan now to have, when I retire, a desire to live in Portugal (which would be a `PREORDAINED DISPLACED` message). Rather, I have a desire now to live there when I retire. Again, the wanting and the idea of preordainment combine to form a desire for something future. In this way, we see once again that the two uses of `"be going to"` are part of a more general pattern, an eminently more satisfying explanation than one that simply resorts to lexical ambiguity.

Having seen some examples of the difference between primary `DISPLACED` and primary `PREORDAINED` messages, the idea of primary `REGULAR` messages should now be relatively easy to introduce. It seems to me there are not many primary displacers that can be used with the `REGULAR` elaboration. Here are examples of the most obvious:

```haskell
REGULAR ( Do "like" ) ( Male "Victor", Do "tease", [ Other "Grannie" ] )
-> "Victor likes to tease Grannie."

REGULAR (Do "tend" ) ( Male "Victor", Do "tease", [ Other "Grannie" ] )
-> "Victor tends to tease Grannie."

PAST (REGULAR (Do "use" ) ( Male "Victor", Do "tease", [ Other "Grannie" ] ))
-> "Victor used to tease Grannie."
```

In the second of these examples, it is hard to think of an equivalent message in which the optional frequency argument is also present. The frequency seems already to be covered (albeit vaguely) by the primary displacer. The third example represents a very curious puzzle that I confess I have not yet been able to solve. Why does this construction only occur in the past? What relationship does this use of `"use"` have with its other uses? Perhaps none; but as with the two uses of `"be going to"`, that would be a most disappointing admission. Perhaps the way in which the `REGULAR` elaboration deploys its displacer argument can form the basis of a more satisfying account.

(Part of the solution to this puzzle does appeal to a lexical ambiguity. There are two English verbs spelt `"use"`, but pronounced differently. The first—as in `"He used my hammer"`—is pronounced with a long `"u"`; the second—as in `"He is used to it by now"`—is pronounced with a short `"u"`. It is this second verb that we discover in sentences like `"Victor used to tease Grannie"`, and I assume that it is the result of a single unambiguous informational trigger. This informational trigger has a somewhat different import when introduced as the displacer for a `REGULAR` elaboration. What remains a mystery to me is why this verb only ever shows up in its second finite or second participle forms.)

Messages with a primary displacer can of course be made `PAST` or `PRIOR` (or both) in all the usual ways, giving rise to sentences like, `"It was about to rain"`, `"He has had to leave"`, or `"I had hoped to see you"`. The `DISPLACED` elaboration can also be applied on top of the `PRIOR` elaboration, with predictable results:

```haskell
PRIOR ( Male, Do "leave" )
-> "He has left."

DISPLACED ( Do "seem" ) (PRIOR ( Male, Do "leave" ))
-> "He seems to have left."
```

Less obviously, I suggest that the `DISPLACED` elaboration can also be applied on top of the `PAST` elaboration, with similar syntactic results. That is to say, I suggest that sentences like, `"He seems to have left"` are ambiguous between `DISPLACED PRIOR` interpretations (it seems that he has left) and `DISPLACED PAST` interpretations (it seems that he left). The distinction here reveals itself when we include the optional time argument to the `PAST` elaboration:

```haskell
DISPLACED ( Do "seem" ) (PRIOR ( Male, Do "leave" ))
-> "He seems to have left."

DISPLACED ( Do "seem" ) (PAST "yesterday" ( Male, Do "leave" ))
-> "He seems to have left yesterday."
```

The second sentence here cannot be the result of a `DISPLACED PRIOR` message, since `PRIOR` messages cannot take an additional time argument; `"He has left yesterday"` is not a sentence of English. That it is a `DISPLACED PAST` message—an elaboration of the message encoded as `"He left yesterday"`—therefore seems the only plausible diagnosis.

## 3. Secondary DISPLACED Messages

Where primary displacers are pivots, secondary displacers are *modalities*, which latter ideas are responsible for the selection of a modal. I account for the eight English modals with just six modalities:

```haskell
type Modality
= Yes1 -- "will"
| Yes2 -- "shall"
| Yes3 -- "must"/"ought"/"need"
| Maybe1 -- "may"
| Maybe3 -- "can"
| Maybe4 -- "dare"
```

As this type definition indicates, I divide the English modalities into two logical categories, *yes* and *maybe*. This logical distinction will be made clearer as we proceed. Each of these two fundamental types then comes in four different *flavours* (though flavours 2 and 4 each exist in only one of the logical categories). I begin with the examination of modalities in `DISPLACED` messages, turning to their contribution to `PREORDAINED` and `REGULAR` messages in [section 4](#4-secondary-preordained-and-regular-messages) below.

In the first instance, secondary `DISPLACED` messages are speculations about matters of present fact. Thus suppose, for example, that we are considering whether or not James knows Claire. There are two possible factual claims here, a plain one and a `NEGATIVE` one, encoded respectively in the following two sentences:

```haskell
"James knows Claire."

"James does not know Claire."
```

When it comes to *speculations* about this fact, however, there is a third possibility. For where factual questions call for yes/no answers, with speculations there is room also for *maybe*. This affords us our first foothold in the theory of the English modalities, and the likely explanation of the semantic difference underlying the choice between `"will"` and `"may"`. Thus:

```haskell
DISPLACED Yes1 ( Male "James", Do "know", [ Female "Claire" ] )
-> "James will know Claire."

DISPLACED Maybe1 ( Male "James", Do "know", [ Female "Claire" ] )
-> "James may know Claire."

DISPLACED Maybe1 (NEGATIVE ( Male "James", Do "know", [ Female "Claire" ] ))
-> "James may not know Claire."

DISPLACED Yes1 (NEGATIVE ( Male "James", Do "know", [ Female "Claire" ] ))
-> "James will not know Claire."
```

I have diagnosed the last two examples here as `DISPLACED NEGATIVE` messages, but one could equally think of them as `NEGATIVE DISPLACED` messages with the `Yes1` and `Maybe1` modalities reversed; for the contrary of *yes* is *maybe not*, while the contrary of *maybe* is *no* (i.e. *yes* to the corresponding denial). In other words, logically speaking, `NEGATIVE (DISPLACED Yes1) == DISPLACED Maybe1 NEGATIVE`, and `NEGATIVE (DISPLACED Maybe1) == DISPLACED Yes1 NEGATIVE`. (While we are here, it may be noted that this serves as another reason to reject the future tense hypothesis. The contraries of the messages encoded as `"It is/was sunny in Paris today/yesterday"` are encoded as `"It is/was not sunny in Paris today/yesterday"`. But the contrary of the message encoded as `It will be sunny in Paris tomorrow"` is encoded as `"It may not be sunny in Paris tomorrow"`.)

Applying the `DISPLACED` elaboration to a plain message generates a judgement concerning the *present* satisfaction of the underlying condition. English also allows for the communication of judgements concerning the *past* satisfaction of the underlying condition. In encoding these, the second finite form of the verb is not a grammatical possibility: we do not say, `"Susan will ate"`, for example. Instead, English deploys its other trick for talking about the past, namely the one used in `PRIOR` messages. For example:

```haskell
DISPLACED Yes1 (PAST "this morning" ( Female "Susan", ( Do "eat" ) ))
-> "Susan will have eaten this morning."

DISPLACED Maybe1 (PAST "this morning" ( Female "Susan", ( Do "eat" ) ))
-> "Susan may have eaten this morning."
```

The use of `"have"` followed by the second participle form of the verb notwithstanding, I diagnose these as `DISPLACED PAST` messages rather than `DISPLACED PRIOR` messages, for two reasons. First, the grammatical point is that they have room for an additional time argument (encoded here as `"this morning"`) in the same way that `PAST` messages do, and `PRIOR` messages do not. Secondly, the intuitive point is that these seem to be judgements concerning whether or not Susan *ate* this morning, rather than whether or not she *has eaten*. Not that judgements about whether or not she *has eaten* are impossible: on the contrary, these are simply secondary `DISPLACED PRIOR` messages, and in general phrases like `"will have eaten"` are ambiguous between `DISPLACED PAST` and `DISPLACED PRIOR` readings:

```haskell
DISPLACED Yes1 (PAST ( Female "Susan", ( Do "eat" ) ))
-> "Susan will have eaten." -- at 7 o’clock this morning

DISPLACED Yes1 (PRIOR ( Female "Susan", ( Do "eat" ) ))
-> "Susan will have eaten." -- already / by now
```

Just as the difference between `PAST` and `PRIOR` messages is in general a subtle one, in some cases having very little practical import, so the difference between `DISPLACED PAST` and `DISPLACED PRIOR` messages is also very slight. In cases where the difference is negligible, it may be unclear which of the two the speaker has in mind (if she even has one definitely in mind at all). Nevertheless, the ambiguity in general remains. And this, I should add, is precisely what we already observed in [section 2](#2-primary-displaced-preordained-and-regular-messages) regarding the application of the primary `DISPLACED` elaboration on top of the `PAST` and `PRIOR` elaborations.

Secondary `PRIOR DISPLACED` messages do not exist, but secondary `PAST DISPLACED` messages do. I suggest that it is secondary `PAST DISPLACED` messages that are responsible for the following sentences:

```haskell
PAST (DISPLACED Yes1 ( Other "James", Do "know", [ Other "Claire" ] ))
-> "James would know Claire."

PAST (DISPLACED Maybe1 ( Other "James", Do "know", [ Other "Claire" ] ))
-> "James might know Claire."
```

The diagnosis here is not immediately obvious, but it has a great deal to recommend it. First, it is the most natural explanation of the words used, since `"would"` and `"might"` stand to `"will"` and `"may"` just as `"was"` and `"did"` stand to `"is"` and `"does"`. Put crudely, the sentences here *look like* the result of the `PAST` elaboration applied on top of whatever elaboration introduced `"will"` and `"may"`. This observation by itself wouldn’t amount to much if the underlying semantics didn’t match up with intuitions or usage, but on consideration it matches up remarkably well. Allow me to switch to another example to make the point:

```haskell
DISPLACED Yes1 ( Male "James", Do "know", [ Other "the result of the football" ] )
-> "James will know the result of the football."

PAST (DISPLACED Yes1 ( Male "James", Do "know", [ Other "the result of the football" ] ))
-> "James would know the result of the football."
```

The first sentence here encodes a speculation based on *up to the minute* information. It is likely on the lips of someone who may or may not know James very well, but has seen that he has been watching the television in the pub all afternoon. The second sentence, in contrast, encodes a speculation which *waives* such recent information, drawing on more well established evidence. It is likely on the lips of someone who has no idea what James has been up to today, but knows he is an avid fan who rarely misses a game. To make this more precise, let us say that the satisfaction of a secondary `DISPLACED` condition at a given point in time concerns the satisfaction of its underlying condition *based on evidence up to and including that point*.

Let us now broaden our investigation to include the other flavours of English modalities. Consider:

```haskell
"James must know the result of the football."

"James ought to know the result of the football."

"James needn’t know the result of the football."

"James should know the result of the football."

"James can’t know the result of the football."

"James daren’t know the result of the football."
```

In general, these sentences all encode judgements concerning the present satisfaction of the underlying condition, on a par with those we have seen already with the `Yes1` and `Maybe1` modalities at the start of the condition. But the flavour of the modality is now different. Let us start with the informational triggers behind `"must"` and `"can"`, which have the flavour of *necessity* and *possibility* respectively. To say that James *must* know the result is to convey that he will know it, but rather more emphatically: it is necessary that he knows it, there is no way he could fail to know it.

On the other side, it is a curious fact that `"can"` does not occur in these contexts unless it is negated. (The sentence `"James can know the result of the football"` has an interpretation, but it is not a judgement as to whether or not he does, but a message granting permission to tell him. We will examine these messages in the next section.) I explain this fact as follows. Since the meaning of `"can"` concerns what is possible, James *can* know the result only if he *does*. Consequently the only basis for the `DISPLACED` claim would also be a basis for the simpler and stronger unelaborated claim, which we therefore resort to instead. Saying that James *can’t* know the result, however, is very different from saying that he *doesn’t*. It is tantamount to saying that the available facts *rule out* the possibility of his knowing. The judgement that James can’t know, to be clear, is a `NEGATIVE DISPLACED` claim, not a `DISPLACED NEGATIVE`: its sponsor does not affirm the possibility of James failing to know, but rather denies the possibility of him knowing.

It seems to me that `"must"` stands to `"can"` more or less exactly as `"will"` stands to `"may"`. We have here, I suggest, just one other flavour of modality, with its two logical sides; thus `Yes3` for `"must"` and `Maybe3` for `"can"`. (Why 3 instead of 2? I will explain the reason for this numbering at the end of this section.) In full, then, here are my analyses of these messages:

```haskell
DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] )
-> "James must know the result of the football."

NEGATIVE (DISPLACED Maybe3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
-> "James can’t know the result of the football."
```

While `"James can’t know"` encodes a `NEGATIVE DISPLACED` claim, `"James must not know"` encodes a `DISPLACED NEGATIVE`: the latter claim is not that it isn’t necessary that he knows, but that it is necessary that he doesn’t. Of course, if it is necessary that he doesn’t, then it is impossible that he does, and the same logical relationship holds between `Yes3` and `Maybe3` as holds between `Yes1` and `Maybe1`; i.e. `DISPLACED Yes3 NEGATIVE == NEGATIVE (DISPLACED Maybe3)` and `DISPLACED Maybe3 NEGATIVE == NEGATIVE (DISPLACED Yes3)`. Thus `"James can’t know"` encodes something logically equivalent to `"James must not know"`. But now, since `"James must not know"` encodes a `DISPLACED NEGATIVE`, we are left wondering how to convey the corresponding `NEGATIVE DISPLACED`. I suggest that it is encoded with the modal `"need"`, which is thus informationally identical to `"must"`:

```haskell
NEGATIVE (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
-> James needn’t know the result of the football."
```

This hypothesis has several things to recommend it. First, it is gratifyingly simple, since it does not require us to posit any additional modality responsible exclusively for the modal `"need"`; the one responsible for `"must"` already suffices. Secondly, it explains why the modal `"need"` only ever occurs in `NEGATIVE` messages (`"James need know the result of the football"` is not a sentence of English). Thirdly, and related to these first two points, on this hypothesis we do not need to build any extra constraints into the code. If there was an additional modality responsible for `"need"` but not responsible for `"must"`, then we would have to add in that the latter can never be negated, while the former must always be.

As already noted, `"can"` does not occur in these contexts unless it is negated. I explain this fact with reference to the underlying modality, and the logical point that James *can* know only if he *does*, whereupon the latter becomes the more natural thing to say. The same restriction, however, is not observed with `"could"`: `"James could know"` and `"James couldn’t know"` are both equally acceptable. This is not to be explained by supposing that `"could"` encodes a different modality from `"can"`. That hypothesis is most unwelcome, since these are just two forms of the same modal. Much more welcome would be a hypothesis that explained the difference in *temporal* terms, since—to outward appearances at least—`"could"` stands to `"can"` as `"would"` stands to `"will"`, and `"did"` stands to `"does"`. Gratifyingly, just such a hypothesis fares admirably against the data. I propose that `"James could know"` and `"James couldn’t know"` are both the results of `PAST DISPLACED` messages, just like `"James would know"` and `"James might know"`:

```haskell
PAST (DISPLACED Maybe3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
-> "James could know the result of the football."

PAST (NEGATIVE (DISPLACED Maybe3 ( Male "James", Do "know", [ Other "the result of the football" ] )))
-> "James couldn’t know the result of the football."
```

The judgement that James *can’t* know, like the judgement that he *will* or *may* know, is based on up to the minute information. Consequently it is the *present* state of the world that the speaker takes to be ruling out this possibility; and that is why, on the other side, he *can* know only if he *does*. There is no parallel obstacle to saying that he *could* know, however, since the sponsor of this judgement is *waiving* present facts. The overall effect is that the possibility in question is felt to be more “distant”, because grounded exclusively on past evidence. The speaker is leaving it open that more recent events may render his knowing the result impossible.

With this in mind, let me venture a less visually obvious hypothesis: that `"ought"` stands to `"must"` as `"could"` stands to `"can"`. In other words, `"ought"` is not the result of any additional flavour of modality, but rather the result of applying the `PAST` elaboration to a `DISPLACED` message with the `Yes3` modality; thus:

```haskell
PAST (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
-> "James ought to know the result of the football."
```

That `"ought"` is the result of the `PAST` elaboration is by no means immediately clear, and further evidence for this claim will be given in the next section, when I examine the modal in some other contexts. For now, I offer two things in support of the proposal. First, much like my proposal with regard to the modal `"need"`, it has the merits of simplicity. Not only do we require no further modality to account for the additional modal, we also need no extra validation rules. If `"ought"` was the result of a whole new modality, we should have to add that the modality behind `"must"` cannot be subjected the `PAST` elaboration, while the modality behind `"ought"` has to be. (Well, it has to be if my suggestion that it is caused by the `PAST` elaboration is accepted; otherwise it presumably *can’t* be, since there is in any case only one possibility.) Secondly, the semantics seems intuitively to fit: the judgement that James ought to know invokes a more distant kind of necessity than the judgement that he must know; in much the same way as the judgement that he couldn’t know invokes a more distant kind of possibility than the judgement that he can’t know.

If my proposals about `"must"`, `"need"`, and `"ought"` sharing the same underlying modality are right, then the obvious question is why this modality calls for different words when made `NEGATIVE` or `PAST`. I confess I have no very satisfactory answer to this question. I surmise that, as English evolved, three somewhat different ideas converged on the same informational territory, while each of the corresponding words refused to drop out of use. In the end, they settled on dividing up the ground: `"must"` for the unelaborated, `"need"` for the `NEGATIVE`, and `"ought"` for the `PAST`. This leaves one case unaccounted for: the `PAST NEGATIVE`. Should this be handled by `"ought"` or by `"need"`? I submit that it is handled by the latter, and consequently that `"need"` is ambiguous between a merely `NEGATIVE` and a `PAST NEGATIVE` interpretation:

```haskell
NEGATIVE (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
-> "James needn’t know the result of the football."

PAST (NEGATIVE (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] )))
-> "James needn’t know the result of the football."
```

In other words, the string `"James needn’t know"` encodes both a denial of the claim that he *must* know, and a denial of the claim that he *ought* to know. More evidence that the modal `"need"` can be taken in a past as well as a present sense will be given in the next section, alongside additional evidence that the modal `"ought"` can only be taken in a past sense.

The first and third flavours of English modalities—at least if I am right about the relationship between `"must"`, `"need"`, and `"ought"`—exhibit a fairly tidy pattern. There are two more flavours, however, that make things a little messier. The first is responsible for the modal **`"shall"`**, and it is logically a *yes* modality. The second is responsible for the modal `"dare"`, and it is logically a *maybe* modality. These are clearly different flavours, however, and do not relate to each other in the same way that the other two flavours do: where **`"will"`** has **`"may"`**, **`"shall"`** has nothing; and where **`"can"`** has `"must"`/`"need"`/`"ought"`, `"dare"` has nothing. Thus I use different number suffixes for the underlying modalities here, writing them as `Yes2` and `Maybe4` respectively.

Like `"need"`, `"dare"` seems—with one possible exception—only ever to occur in negated contexts: `"James dare know the result of the football"` is not English. Why this might be, however, I cannot say. All I can think is that it has something to do with the nature of `Maybe4` itself, that something in this informational choice precludes its occurence in positive form. But perhaps even this vague assertion is wrong, because there is arguably one exception to the general rule: `"I dare say"`. If this sentence is not *sui generis*, if it is not merely a fixed, hard-coded expression, then it must be the result of a non-negative `DISPLACED` message with the `Maybe4` modality for a displacer. For this reason, I have not (yet) ruled out the possibility of non-negative `Maybe4` messages in my model, though perhaps I should. Not only does `Maybe4` have no logical *yes* counterpart, it also refuses to succumb to the `PAST` elaboration; the closest English allows here is to switch to the verb **`"dare"`**, and venture a past judgement with the `Yes1` modality: `"He wouldn’t dare"`. There is no getting away from it: the `Maybe4` modality is peculiar.

The modal **`"shall"`**, together with its underlying modality `Yes2`, is also somewhat atypical. The first thing to note is that this modality is not available in `DISPLACED` messages unless that message is elaborated further. `"James shall know the result of the football"` has an interpretation, but it is a message insisting that James be told at some point in the future, not a speculation concerning whether or not he knows at present. We will examine its ilk in the next section. For now, we may note that the `PAST` elaboration makes this modality possible in `DISPLACED` messages:

```haskell
PAST (DISPLACED Yes3 ( Male "James", Do "know", [ Other "the result of the football" ] ))
-> "James should know the result of the football."
```

Intuitively, this message is almost identical to the corresponding message involving the `Yes3` modality: `"James should know"` and `"James ought to know"` are virtually synonymous. (On the assumption that `"should"` is indeed the result of the `PAST` elaboration—which it certainly *appears* to be—this fact is some more small support for my claim that `"ought"` is likewise the result of this elaboration.) The claim as a whole evokes a more distant kind of necessity than the claim that he *must* know. It must be, then, that `Yes2` and `Yes3` are informationally very close, such that in the present context their difference becomes vanishingly small. In other contexts, however, `Yes2` appears to have a closer affinity with `Yes1` (as we will see in the next section). And in general, if I want to deny that he *should* know, should I say that he *needn’t* know or that he *might not* know? It is hard to choose. Overall, I suggest that `Yes2` lies informationally *between* `Yes1` and `Yes3`. And that, belatedly, is the reason for the numbering, which might at first have looked a little odd.

## 4. Secondary PREORDAINED and REGULAR Messages

The secondary `DISPLACED` elaboration can be applied on top of the conservative `PREORDAINED` and conservative `REGULAR` elaborations. The result, in either case, is nothing particularly remarkable, but needs mentioning in order to clear the way for some more interesting messages that I will examine in this section. In both cases, the result is a judgement just like the ones met in the previous section, concerning the satsifaction of the underlying condition; it is simply that the underlying condition is either a conservative `PREORDAINED` or a conservative `REGULAR` one. For example, `"They will be getting married next month"` can be read as a speculation concerning their present plans; while `"She may take the bus to work"` may encode a speculation concerning her present commuting habits. Matters are considerably more intriguing when the `PREORDAINED` and `REGULAR` *themselves* incorporate a secondary displacer.

Where secondary `DISPLACED` messages (otherwise unelaborated) are judgements concerning the present satisfaction of the condition, and secondary `DISPLACED PAST` messages are judgements concerning the past satisfaction of the condition, secondary `PREORDAINED` messages are judgements concerning the *future* satisfaction of the condition. For example:

```haskell
PREORDAINED Yes1 "tomorrow" ( Other, Be, "sunny", [ In, Other "Paris" ] )
-> "It will be sunny in Paris tomorrow."

PREORDAINED Maybe1 "next year" ( Others, Do "get" Ongoing, "married" )
-> "They may get married next year."
```

These examples are naturally taken as uncoloured messages, the speaker’s distinterested predictions for the future. As with `PREORDAINED` messages in general however, there is also the possibility of colour. But where conservative and primary `PREORDAINED` messages have only one colour (that of a prearrangement), secondary `PREORDAINED` messages come with a positive explosion of colour possibilities. The most common colourings for the `Yes1` and `Maybe1` modalities are *intentionality* and *permission* respectively. Thus the first message below is naturally taken as a statement of intent, if not a promise, while the second is most plausibly understood as allowing something rather than merely stating a possibility:

```haskell
PREORDAINED Yes1 "next week" ( Speaker, Do "call", [ Hearer ] )
-> "I will call you next week."

PREORDAINED Maybe1 "at four o’clock" ( Hearer, Do "leave" )
-> "You may leave at four o’clock."
```

While the obvious colouring for the `Yes1` modality is that of intentionality, however, the colouring of *command* is also available, and may be read into—for example—the sentence, `"You will not speak to me like that again"`. And while the obvious colouring for the `Maybe1` modality is that of permissibility, the colouring of practical possibility is also available, as in, `"You may see the doctor at four o’clock"`. With the other flavours of modality, yet more colours reveal themselves. Consider:

```haskell
"I must mow the lawn."

"You must come and see us soon."

"We should/ought to go and see them."
```

The first has (or can have) the colour of personal resolve, while the second has the colour of insistence. The third might be seen in the colour of a generally good idea, or in the colour of a moral imperative. Consider further:

```haskell
"I can’t tell you."

"You needn’t worry about it."

"You shall not steal."
```

The first has a range of colours of broadly the same hue: it would be a bad idea to tell you, a breach of trust, I am legally or morally bound to remain silent, and so on. The second might be taken in either a moral or a pragmatic shade. The third has a clear colour of command.

The `Yes1` and `Yes2` modalities (encoded in **`"will"`** and **`"shall"`** respectively) can both take on the colour of intent, and both the colour of command. There is however a tendency for `Yes1` to attract the former, and for `Yes2` to attract the latter. In the first finite form, indeed, `"shall"` is almost always taken in a commanding colour, unless the main object is in the first person. (For reasons I cannot fathom, there used to be a prescriptive rule in certain circles insisting on `"shall"` in the first person, and `"will"` in the second and third. But there is no discernible basis for this rule in actual usage.) Somewhat similarly, the `Maybe1` and `Maybe3` modalities (encoded in **`"may"`** and **`"can"`** respectively) can both take on the colour of permission, and both the colour of possibility; though there is a tendency for `Maybe1` to attract the former, and `Maybe3` to attract the latter. Thus the familiar and irritating joke, `"Can I leave now?"`: `"You can, but you may not"`.

The satisfaction of a secondary `PREORDAINED` condition at a given point in time, like the satisfaction of a secondary `DISPLACED` condition, concerns the satisfaction of the underlying condition *based on evidence up to and including that point*. Consider the contrast exhibited in the following pair of messages:

```haskell
PREORDAINED Yes1 ( Male "Terry", Do "make", [ Other "a fine husband", ( For, Female "Julie" ) ] )
-> "Terry will make a fine husband for Julie."

PAST (PREORDAINED Yes1 ( Male "Terry", Do "make", [ Other "a fine husband", ( For, Female "Julie" ) ] )
-> "Terry would make a fine husband for Julie."
```

The difference here is subtle, but nevertheless tangible. Most notably, the sponsor of the first message commits herself to the judgement that Terry and Julie will get married, while the sponsor of the second commits herself to no such thing. I account for the difference as follows. In the first case, Terry’s making a fine husband for Julie is envisaged as the natural outcome of *present* realities. If he won’t marry her at all, then he won’t make her a husband of any kind, let alone a fine one. In the second case, by contrast, Terry’s making her a fine husband is imagined as the outcome of *past* realities. The result is a message that implies the same assessment of Terry’s marital worth as the first, but without the implication of impending nuptials. In the speaker’s imagined scenario, the two are allowed to find their way into wedlock from whatever unhurried beginnings.

More striking is the secondary `PRIOR PAST PREORDAINED` message, common in counterfactual scenarios. When Julie has married someone else, a speaker may continue to maintain Terry’s suitability as follows:

```haskell
PRIOR (PAST (PREORDAINED Yes1 ( Male "Terry", Do "make", [ Other "a fine husband", ( For, Female "Julie" ) ] ) ))
-> "Terry would have made a fine husband for Julie."
```

The point is that Julie’s past wedding to someone else now rules out the possibility of a marriage to Terry. Consequently the speaker is obliged to retreat to a point prior to the already past marriage to someone else.

This diagnosis also explains a systematic ambiguity in phrases like `"he might/could have gone"`, which can convey secondary `PAST DISPLACED PAST` messages (it is possible that he went), and also secondary `PRIOR PAST PREORDAINED` messages (before the event, it was possible for him to go). For example:

```haskell
PRIOR (PAST (PREORDAINED Maybe1 ( Other "that dart", Do "land", [ In, Other "baby’s eye" ] ) ))
-> "That dart might have landed in baby’s eye." -- it was a close thing, please be more careful in the future

PAST (DISPLACED Maybe1 (PAST ( Other "that dart", Do "land", [ In, Other "baby’s eye" ] ) ))
-> "That dart might have landed in baby’s eye." -- I can’t find it anywhere else, and that would explain why she won’t stop crying
```

Secondary `PRIOR PAST PREORDAINED` messages, as already noted, are common in counterfactual contexts: it didn’t in fact happen, but before the fact it would/could/should/etc. have happened. Note however that such messages do not *entail* that whatever it was didn’t happen, and are also common in reconstructive reasoning, where the point is rather to avoid commitment on the matter one way or the other:

```haskell
PRIOR (PAST (PREORDAINED Maybe1 ( Male, Do "come", [ Other "this way" ] ) ))
-> "He might have come this way." -- and if he had, he would have left footprints, so let’s see if there are any
```

The case of secondary `PRIOR PAST PREORDAINED` messages provide the clearest evidence for two things that I claimed in the previous section, namely that the modal `"need"` can be used in a past as well as a present sense, and that `"ought"` is used only in a past sense. For consider the following sentences, all of which seem to sport a secondary `PRIOR PAST PREORDAINED` message identical except for the modality:

```haskell
"I wouldn’t have done that."

"I shouldn’t have done that."

"I couldn’t have done that."

"I might not have done that."

"I needn’t have done that."

"I ought not to have done that."
```

In contrast, notice that `"I must not have done that"` and `"I daren’t have done that"` have no analogous interpretations.

Secondary `REGULAR` messages, in some cases, are almost indiscernible from their conservative `REGULAR` counterparts, the modality adding little of informational value. Consider:

```haskell
REGULAR Yes1 "often" ( Male "Norman", Do "walk", [ To, Other "work" ] )
-> "Norman will often walk to work."

REGULAR Maybe1 "occasionally" ( Male "Norman", Do "walk", [ To, Other "work" ] )
-> "Norman may occassionally walk to work."
```

In at least one case, however, the additional information is substantial. What I have in mind here are the uses of the `Maybe3` modality with the flavour of *ability*; for example:

```haskell
REGULAR Maybe3 ( Male "Robert", Do "swim" )
-> "Robert can swim."

REGULAR Maybe3 ( Female "Susan", Do "speak", [ Other "four languages" ] )
-> "Susan can speak four languages."
```

While secondary `DISPLACED` and `PREORDAINED` messages are judgements about the unobserved, secondary `REGULAR` messages are rather more straightforward factual claims (albeit general ones). In particular, they do not exhibit the very striking behaviour of the other two with regard to tense, where the time of the outermost condition’s satisfaction reflects the time of the latest evidence that the speaker takes to be bearing on the question of the underlying condition’s satisfaction. With secondary `REGULAR` messages, consequently, it is considerably more obvious that the second form of the fulcrum simply encodes past time:

```haskell
PAST (REGULAR Yes1 "often" ( Male "Norman", Do "walk", [ To, Other "work" ] ))
-> "Norman would often walk to work." -- but nowadays he mostly drives

PAST (REGULAR Maybe3 ( Male "Robert", Do "swim" ))
-> "Robert could swim." -- alas, not any more

PAST (REGULAR Maybe3 ( Female "Susan", Do "speak", [ Other "four languages" ] ))
-> "Susan could speak four languages." -- when she was alive
```

There is more to say, but I will stop here for now. I do not claim to have accounted for all of the uses of the English modals in this section and the previous one. Nor do I claim that the resources of my theory as it stands will ultimately be able to account for all of them; that remains to be seen. All I can hope is that my model represents a plausible first approximation of the truth.
