---
id: elaborations
class: docs
---
# 5. Elaborations

## 1. Introduction

This section assumes you are already familiar with the outline of my theory, and with my theory of plain messages. Here I introduce my theory of elaborations, by describing the seven *short* elaborations in my model. Short elaborations, in contrast to *long* elaborations, are those that do not introduce any additional verb phrases or modals into the start of the predicate.

## 2. PAST and PRIOR Messages

A plain English message, recall, affirms the present satisfaction of the condition by the object. I explain talk of past or future satisfactions with my theory of elaborations. The nature of these elaborations, and the way in which they interact, is one of the most intriguing features of the English code. The semantic results can be extremely complex and sophisticated, but it is all acheived---at least if my theory is correct---through the predicatable coordination of devices that are themselves beautifully simple.

Things need to be introduced in manageable chunks. I will begin, in this section, with a look at the `PAST` and `PRIOR` elaborations, which make talk about the past possible. Here are the relevant parts of the type definitions:

```haskell
type Message
  = ...
  | PAST (Maybe String) Message
  | PRIOR Message
  | ...
```

The syntactic effect of the `PAST` elaboration is to replace the present tense form of the verb with its corresponding past tense form. Its semantic effect, meanwhile, is to indicate that the time of the input condition’s satisfaction is past rather than present. For example:

```haskell
PAST ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
  -> "Grannie left me."

PAST "last year" ( Others, ( Do "go", [ To, Other "America" ] ) )
  -> "They went to America last year."
```

The optional string argument is intended to encode the *time* of the condition's satisfaction with more precision. At present, however, this argument is an unearthed variable, that users are obliged to encode for themselves.

Going by its grammatical effect, the `PRIOR` elaboration is easily distinguished from the `PAST` elaboration. Where the latter swaps the present tense form of the verb for its past tense form, the former swaps it for the corresponding form of the verb **`"have"`**, followed by the second participle form of the original verb:

```haskell
PRIOR ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
  -> "Grannie has left me."

PRIOR ( Others, ( Do "go", [ To, Other "America" ] ) )
  -> "They have gone to America."
```

Grammarians standardly call this the "perfect". While its effect on the sentence is easy to see, it is harder to say what the underlying informational trigger is, and in particular how exactly this trigger differs from the `PAST` elaboration, to which it bears a very obvious resemblance. (It is surely no coincidence that the second finite form and the second participle form are identical for all regular verbs.)

One difference, immediately visible in my type definition for messages, is that the `PRIOR` elaboration does not take an additional time argument. In support of this, note that `"They have gone to America last year"` is not a sentence of English. Admittedly one can say, for example, `"I have eaten this morning"`. However, one can only say this while it is still morning, when `"this morning"` consequently signals the present rather than the past; as it does in, for instance, `"I am hungry this morning"`. One can also say things like, `"They have already been to America"`, but `"already"` here cannot be the result of an additional argument to the `PRIOR` elaboration, since it also arises without that elaboration (`"They already left for America"`). In both cases, therefore, the additional words---`"this morning"` and `"already"`---cannot be owing to any additional argument to the `PRIOR` elaboration itself. My model does not yet account for these words, but my assumption is that they will each be accounted for by an additional elaboration.

(To get a little ahead of myself, and somewhat speculatively, perhaps we need a `PRESENT` elaboration whose sole purpose is to allow for the introduction of a more detailed or explicit specification of the present time of the condition's satisfaction. It would need to be incompatible with the `PAST` elaboration, of course, but not with the `PRIOR` elaboration. And then perhaps we need a---let's say---`PREVIOUS` elaboration, responsible for the introduction of the adverb `"already"`. This would of course be incompatible with `PRESENT` or plain messages, but a common companion of the `PAST` and `PRIOR` elaborations alike.)

A second difference between the `PAST` and `PRIOR` elaborations is that, where the former merely indicates that the satisfaction of the input condition is past, the latter indicates that it is past *with respect to something else*. Hence my choice of terminology: what is past is simply past, but what is prior is prior *to* something. More specifically, when applied to a plain message, the `PRIOR` elaboration doesn't *directly* produce a message concerning the past satisfaction of its underlying condition; rather, it produces a *new* condition, one whose satisfaction (at any given point in time) entails the satisfaction of the underlying condition *prior* to that point. This, I take it, explains why it cannot take an additional time argument in the same way that the `PAST` elaboration does.

By default, of course, the satisfaction of any condition is present. And so by default a `PRIOR` message affirms the present satisfaction of its `PRIOR` condition. Thus, while `PAST` and `PRIOR` messages are alike in affirming the past satisfaction of their underlying conditions, they do this in different ways. The `PAST` elaboration does this directly, but the `PRIOR` elaboration does it indirectly, via affirming the present satisfaction of a new condition that in turn entails the prior satisfaction of the underlying one. (If my parenthetical speculation a moment ago is right, then this would explain why the `PRIOR` elaboration, unlike the `PAST` elaboration, is consistent with the hypothesised `PRESENT` elaboration.)

The `PAST` and `PRIOR` elaborations by themselves are wonderfully simple. The `PAST` elaboration, moreover, operates on `PRIOR` messages in just the same way that it operates on plain ones. The `PRIOR` elaboration, after all, just modifies the condition, so there is nothing else for the `PAST` elaboration to do except locate the otherwise present satisfaction of this condition in the past. Thus we have the so-called "past perfect", which I refer to as a `PAST PRIOR`:

```haskell
PAST PRIOR ( Female "Grannie", ( Do "leave", [ Speaker ] ) )
  -> "Grannie had left me." -- But now, perhaps, she has returned.
```

Things start to get rather more interesting, however, when the `PRIOR` elaboration is applied on top of the `PAST` elaboration. For in this case, it does not result in the generation of a new condition. Rather, the `PRIOR` elaboration now locates the satisfaction of the underlying condition *directly* at some point prior to the already past point of satisfaction set up by the `PAST` elaboration. The overall effect is what grammarians call the "past past". Compare:

```haskell
PAST "when you arrived" (PRIOR ( Speaker, ( Do "see", [ Male ] ) ))
  -> "I had [already] seen him when you arrived."

PRIOR (PAST "an hour before you arrived" ( Speaker, ( Do "see", [ Male ] ) ))
  -> "I had seen him an hour before you arrived."
```

Note that, in the second example, `"an hour before you arrived"` serves to encode the time at which I *saw* him; whereas in the first, `"when you arrived"` encodes the time at which I *had* (already) seen him. In further confirmation of the claim that the second sentence does not encode a `PAST PRIOR` message, notice that `"I have seen him an hour before you arrived"`---like `"They have been to America last year"`---is not a sentence of English.

## 3. PREORDAINED Messages

At this juncture one might expect me to introduce a `FUTURE` elaboration, as a direct analogue to the `PAST` elaboration, whose purpose is to locate the time of the underlying condition's satisfaction in the future. Talk about the future in English, however, is a more complicated affair than talk about the present or the past, and there is in my view no such straightforwardly symmetric elaboration. The `PREORDAINED` elaboration, which I will start to examine in this section, is the closest thing to a `FUTURE` elaboration in my system. If anything, however, it has a closer symmetry with the `PRIOR` than with the `PAST` elaboration, inasmuch as it locates the satisfaction of a condition as future *with respect to some other point*. It does this, moreover, by generating a new condition, whose satisfaction at a given point concerns the later satisfaction of its underlying condition. But there is yet more to this elaboration, that outstrips anything observed in the `PRIOR` elaboration, as we will see.

Here is the relevant part of my type definition:

```haskell
type Message
  = ...
  | PREORDAINED (Maybe String) Message
  | ...
```

The optional (and unearthed) string argument---much like the optional string argument to the `PAST` elaboration---encodes the time of the underlying condition's satisfaction with more precision. In this one respect, at least, the `PREORDAINED` elaboration is more like the `PAST` than the `PRIOR` elaboration.

The `PREORDAINED` elaboration is one of two English elaborations related to the broad notion of *expectation* (we will meet the other in [section 4](#4-regular-extended-and-scattered-messages) below). Expectations are (as I will term it) either *coloured* or *uncoloured*, and in the former case---hence the choice of metaphor---there is a whole spectrum of possibilities. This distinction will become clearer as we proceed, and as we see it played out in the various cases. Let me start by saying that uncoloured expectations are *disinterested*. Paradigmatically, they concern inaminate objects, and they concern animate creatures only insofar as their actions can be impartially predicted. Coloured expectations, in contrast, are exclusively related to the actions of intentional agents---notably human beings, but by extention some other animals---who have plans and goals and habits, and whose behaviour may be judged (and characters informed) by moral and other standards. The variety of colours reflects the variety of notions in this area: intentions, wishes, hopes, plans, promises, etc. on the one hand; and morals, manners, practicalities, etc. on the other.

The full range of colours available to `PREORDAINED` messages will not emerge until the next section, when I will expand the definition of these messages. For now, the only colour for `PREORDAINED` messages is the notion of a *prearrangement*. For example:

```haskell
PREORDAINED "tomorrow" ( Speaker, Be, "busy" )
  -> "I am busy tomorrow."

PREORDAINED "next month" ( Others, Do "get" Ongoing, "married" )
  -> "They are getting married next month."

PREORDAINED "at dawn" ( Speakers, Do "attack" )
  -> "We attack at dawn."
```

With uncoloured `PREORDAINED` messages, meanwhile, "predetermination" is the more appropriate term. For instance:

```haskell
PREORDAINED "tomorrow" ( Other, ( Be, [ Other "Tuesday" ] ) )
  -> "It is Tuesday tomorrow."

PREORDAINED "at 7.03pm tomorrow" ( Other "the sun", ( Do "set" ) )
  -> "The sun sets at 7.03pm tomorrow."
```

(I am here treating `"the sun"` as a proper name, because I have not yet explained how to generate it as a definite description; see the page on [pointers and quantifiers, section 2]({{ site.baseurl }}{% link quantifiers.md %}#2-descriptions-multiplicities-and-proportions). I will do this sort of thing several times in what follows, and I will not bother with this proviso again.)

With the `PREORDAINED` elaboration, there is (I am fairly sure) never any ambiguity as to whether the message is coloured or uncoloured; invariably there is only ever one plausible interpretation. However that may be, I diagnose the phenomenon of colouring as *pragmatic* rather than semantic. In other words, colour (or the lack of it) is certainly an aspect of the overall information conveyed in an English exchange, but it is not information that is anywhere consulted in the generation of the sentence. Consequently it does not feature as an informational ingredient of my messages.

It is important to be clear that these are all claims about *present* prearrangements or predeterminations. While `PREORDAINED` messages are about the future, therefore, they are about the future only *indirectly*. First and foremost, they are about the *present*: present prearrangements or predeterminations *for* the future. In this respect, as I have already advertised, the `PREORDAINED` elaboration is much more like the `PRIOR` elaboration than it is like the `PAST` elaboration. It locates something as future *with respect to something else*, via the generation of a new condition. And just as it is possible to have `PAST PRIOR` messages, it is also possible to have `PAST PREORDAINED` messages, which are claims about past prearrangements or predeterminations that are, perhaps, no longer present:

```haskell
PAST (PREORDAINED "next month" ( Others, ( Do "get" Ongoing, "married" ) ))
  -> "They were getting married next month." -- but there was a problem with the venue and it’s had to be postponed

PAST (PREORDAINED "at 7.03pm tomorrow" ( Other "the sun", ( Do "set" ) ))
  -> "The sun set at 7.03pm tomorrow." -- but then an asteroid knocked us into a new orbit
```

For that matter, we can also have `PRIOR PAST PREORDAINED` messages:

```haskell
PRIOR (PAST (PREORDAINED "tomorrow" ( Speaker, ( Be, "busy" ) )))
  -> "I had been busy tomorrow." -- before I heard of the accident, but then I cleared my schedule
```

With this in mind, let me stress that the optional time argument needn't specify a time in the future; the constraint is rather that it must specify a time that is *later* than the time of the prearrangment or predetermination. Thus we find `PAST PREORDAINED` messages (and `PRIOR PAST PREORDAINED` messages) for which the time specified is itself past:

```haskell
PAST (PREORDAINED "yesterday" ( Speaker, ( Be, "busy" ) ))
  -> "I was busy yesterday." -- but then I changed my plans

PRIOR (PAST (PREORDAINED "yesterday" ( Speaker, ( Be, "busy" ) )))
  -> "I had been busy yesterday." -- before I heard of the accident ...
```

So far I have been emphasising the symmetry between the `PRIOR` and the `PREORDAINED` elaborations, but there are asymmetries as well. First, the new condition generated by the `PRIOR` elaboration (when it does generate a new condition) entails the *actual* prior satisfaction of its underlying condition. The message as a whole is true only if the underlying condition was in fact satisfied at that prior time. The new condition generated by the `PREORDAINED` elaboration, however, does *not* entail the actual satisfaction of its underlying condition at the later time. Rather, it entails---as I have been saying---the existence of some prearrangement or predetermination to that effect. But plans, as we all know, can change, and it may be perfectly true that someone is getting married next month, even if she later calls it off (at which point it will still be true that she *was* getting married next month). With predeterminations, there is room for metaphysical debate: some would argue that, if an asteroid hits tonight and moves us into a new orbit, then the sun never set at 7.03pm tomorrow after all. But however that may be, English allows us---if we want it---the facility to communicate on the assumption that predeterminations can also change, saying for instance that the sun *did* set at 7.03pm tomorrow, even though it no longer *does*. It is not for semantics to settle this metaphysical dispute.

The second asymmetry is syntactic rather than semantic. The `PREORDAINED` elaboration, unlike the `PRIOR` elaboration, has the curious feature of being *invisible*. By this I mean that it has, in and of itself, no impact on the output sentence. The optional time argument, it is true, shows up in an adverbial expression at the end of the predicate. But the elaboration itself leaves no mark (where the `PRIOR` elaboration, of course, replaces the first verb in the predicate with the corresponding form of the verb **`"have"`** followed by the second participle form of the original verb). As we will see in the next section, the `PREORDAINED` elaboration is not the only one to be invisible in this sense. And the existence of invisible elaborations, as you might well expect, is one very considerable source of ambiguity: from the sentence alone, it may be unclear which invisible elaborations (if any) have been applied, and moreover which order they have been applied in.

More on that in the next section. In the meantime, let me end this section by accounting for a couple of comparatively straightforward ambiguities arising from the `PAST` and `PREORDAINED` elaborations alone, in virtue of the latter's invisibility. First, when the optional time argument is absent from a `PREORDAINED` elaboration, it simply cannot be deduced from the sentence whether the elaboration has been applied or not. Thus the sentence `"They are getting married"` admits of a plain interpretation (they are at the altar as we speak) as well as a `PREORDAINED` one (they are engaged to be married):

```haskell
( Others, ( Do "get" Ongoing, "married" ) )
  -> "They are getting married."

PREORDAINED ( Others, ( Do "get" Ongoing, "married" ) )
  -> "They are getting married."
```

The same is true of `"They were getting married"`, which arises from subjecting either of the messages above to the `PAST` elaboration (as it might be, they were at the altar and are now wed; or, they were engaged but have now split).

Secondly, the sentence `"They were getting married yesterday"` supports (at least) *three* distinct interpretations. The first is a direct claim about the past, about what they got up to yesterday. The second is a claim about yesterday's plans: that the couple were then engaged to be wed at some unspecified later date. The third, finally, is a claim about past plans *for* yesterday: that at some point in the past (unspecified) the happy day was scheduled for yesterday. The point, in a nutshell, is that the sentence does not reveal whether the word `"yesterday"` is coming from the `PAST` elaboration or the `PREORDAINED` one (if the `PREORDAINED` elaboration has been applied at all, that is). I represent the three messages here as follows:

```haskell
PAST "yesterday" ( Others, ( Do "get" Ongoing, "married" ) )
  -> "They were getting married yesterday."

PAST "yesterday" (PREORDAINED ( Others, ( Do "get" Ongoing, "married" ) ))
  -> "They were getting married yesterday."

PAST (PREORDAINED "yesterday" ( Others, ( Do "get" Ongoing, "married" ) ))
  -> "They were getting married yesterday."
```

When both elaborations include a time argument, the one for the outermost argument shows up at the end of the sentence, and there is no ambiguity:

```haskell
PAST "last month" (PREORDAINED "yesterday" ( Others, ( Do "get" Ongoing, "married" ) ))
  -> "They were getting married yesterday last month."
```

In this case, it would be more natural to bring the output of the outermost time argument to the front of the sentence:

```haskell
"Last month, they were getting married yesterday."
```

My model is not yet able to generate sentences like these, however, and rigidly insists on placing the outputs of all time arguments at the end of the sentence. As noted earlier, my model currently implements only informational choices, leaving stylistic choices for a later update.

## 4. REGULAR, EXTENDED, and SCATTERED Messages

Closely related to the `PREORDAINED` elaboration is the `REGULAR` elaboration, which is the second of the two elaborations to concern expectations, and consequently to open the door to the phenomenon of colouring. The `REGULAR` elaboration is also like the `PREORDAINED` elaboration in being invisible. This is a trait these elaborations share with two more: the `EXTENDED` and `SCATTERED` elaborations. Having taken my time in introducing the `PREORDAINED` elaboration, I will now pick up the pace a little, and examine these other three elaborations at once. The relevant part of the type definition is as follows:

```haskell
type Message
  = ...
  | REGULAR (Maybe String) Message
  | EXTENDED String Message
  | SCATTERED String Message
  | ...
```

The `REGULAR` elaboration generates a new condition whose satisfaction entails the *general* satisfaction of its input condition, with the unearthed string argument optionally encoding the *frequency* of that generality. The coloured uses of the `REGULAR` elaboration concern the habits of such creatures as are capable of forming them:

```haskell
REGULAR "often" ( Female "Grannie", ( Do "eat", Out ) )
  -> "Grannie often eats out."

REGULAR "occasionally" ( Male "Victor", ( Do "laugh", [ ( At, Female "Grannie" ) ] ) )
  -> "Victor occasionally laughs at Grannie."
```

Its uncoloured uses, meanwhile, concern the typical or predictable behaviour of inanimate objects under certain conditions:

```haskell
REGULAR ( Other "salt", ( Do "dissolve", [ ( In, Other "water" ) ] ) )
  -> "Salt dissolves in water."
```

As with the `PREORDAINED` elaboration, the possibility of colouring in the `REGULAR` elaboration does not appear to give rise to any ambiguity (there is only ever one plausible interpretation); but if it did it would call for a pragmatic rather than a semantic treatment. Colour (or the lack of it) is not an ingredient of the message, but a part of what is communicated over and above the information encoded in the sentence.

The `SCATTERED` elaboration likewise generates a new condition whose satisfaction entails multiple satisfactions of its underlying condition. Rather than convey nomological apprehensions, however, these messages affirm nothing more than the brute multiplicity. The unearthed string argument encodes the *tally*, i.e. the total number of separate satisfactions (not necessarily with any great precision, as in the second example below):

```haskell
PAST "last week" (SCATTERED "twice" ( Female "Grannie", ( Do "eat", Out ) ))
  -> "Grannie ate out twice last week."

PAST "in 1986" (SCATTERED "several times" ( Male "Victor", ( Do "laugh", [ ( At, Female "Grannie" ) ] ) ))
  -> "Victor laughed at Grannie several times in 1986."
```

`SCATTERED` elaborations are not discovered in the wild unless they have been subjected to some further elaboration---such as the `PAST` elaboration in the examples above---that prevents them from amounting to claims about multiple *present* satisfactions. This is for the obvious reason that multiple satisfactions simply take too long. It needn't be the `PAST` elaboration that does it; the `PREORDAINED` elaboration also works:

```haskell
PREORDAINED "tomorrow" (SCATTERED "twice" ( Speakers, ( Do "attack" ) ))
  -> "We attack twice tomorrow." -- once at dawn, and then again from the other side an hour later
```

The same is true, and for the very same reason, of `EXTENDED` messages, which result in a new condition whose satisfaction entails the satisfaction of its input condition during a certain period of time, with the unearthed string argument encoding the *duration* of that period:

```haskell
PAST "yesterday" (EXTENDED "for an hour" ( Male, ( Do "see", [ Female ] ) ))
  -> "He saw her for an hour yesterday."

PREORDAINED "tomorrow" (EXTENDED "for an hour" ( Male, ( Do "see" Ongoing, [ Female ] ) ))
  -> "He is seeing her for an hour tomorrow."
```

There appears to be very little overlap between tallies, frequencies, and durations. One exception to this rule springs to mind, however: `"always"` can encode both a frequency and a duration. For example:

```haskell
REGULAR "always" ( Do "smile", [ At, Male ] )
  -> "She always smiles at him."

PAST (EXTENDED "always" ( Male, ( Do "like", [ Female ] ) ))
  -> "He always liked her."
```

A good deal of ambiguity arises from the interaction of the four invisible elaborations. Consider, for example, the sentence:

```haskell
"He walked to work for a week."
```

Among the several interpretations of this sentence we find (i) a `PAST EXTENDED REGULAR` message, according to which he was briefly in the habit (for one week only) of walking to work; (ii) a `PAST EXTENDED` message, according to which he once took a whole week to walk to work; and (iii) a `PAST REGULAR EXTENDED` message, according to which he used to be in the habit of taking a whole week to walk to work.

And then we have this seemingly straightforward sentence:

```haskell
"The film started at 8pm."
```

By my count, this string is accessible to no fewer than five distinct interpretations: (i) a simple claim about when the film started (a `PAST` message); (ii) a claim about when it was scheduled to start (a `PAST PREORDAINED` message); (iii) a claim about when showings of used to start (a `PAST REGULAR` message); (iv) a claim about when showings of it used to be scheduled to start (a `PAST PREORDAINED REGULAR` message); and (v) a claim about the time at which the management, when drawing up their plans, generally scheduled showings of it to start (a `PAST REGULAR PREORDAINED` message). (It may be hard to envisage a use for this last message. To aid your imaginations, suppose the management had to fix the timetable anew each morning, and typically ended up placing the film in question in the 8 o’clock slot. This in contrast to the more likely fourth interpretation, in which they settle once and for all on a regular 8 o’clock position.)

I could go on, but hopefully these two examples suffice to illustrate the general point. With invisible elaborations, there is frequently nothing in the sentence that indicates the order in which they have been applied, or even---if their optional arguments are missing, or if the outputs of those arguments could have come from somewhere else---whether or not they have been applied at all. I defy anyone to come up with a satisfactory syntactic or pragmatic account of any of these ambiguities. It is only by embracing the codebreaker's methodology, by modelling the semantic function from message to sentence rather than the other way around, that we can explain these various phenomena.

## 5. NEGATIVE Messages

The chief puzzle facing any theory of negation in English is posed by the related ambiguities discovered, for example, in the following two sentences:

```haskell
"Claire does not drink."

"I was not busy all day."
```

In the first case, the speaker might be maintaining that Claire is tee-totalled, or might instead be denying that she is an alcoholic. The latter reading is consistent with Claire enjoying a drink now and then, while the former is not. In the second case, the speaker might be affirming that she was free all day yesterday, or might rather be rejecting the claim that she was occupied all day. The latter interpretation is consistent with her having been busy at some point in the day, while the former is not. In sum, the first interpretation of each sentence is a positive message about something internally negative, whereas the second is a negative message about something internally positive. (The possibility of these two kinds of negation is also why double negation isn't always vacuous: `"Claire doesn’t not drink"`, for example, can be used perfectly intelligibly to deny that she is tee-totalled.)

My model posits a `NEGATIVE` elaboration, which has the effect, in general, of converting an affirmative message into its corresponding denial. In practice, this amounts to the creation of a new condition, whose satisfaction entails the non-satisfaction of its input condition (the *complement* of the input condition, in other words). The difference between the pairs of messages noted above is accounted for by the *order* in which this elaboration is applied, relative to the other elaborations in the message (the `REGULAR` and `EXTENDED` elaborations respectively). In the second of each pair, the `NEGATIVE` elaboration is the outermost one, whereas in the first of each pair it is closer to the nucleus, with the other elaboration being applied on top of it. The `REGULAR NEGATIVE` interpretation of the first sentence affirms that Claire is in the habit of abstaining from drink, while the corresponding `NEGATIVE REGULAR` denies that she is in the habit of drinking. The `EXTENDED NEGATIVE` interpretation of the second sentence, similarly, affirms that the speaker was free all day, while its `NEGATIVE EXTENDED` counterpart denies that the speaker was busy all day.

Analogous ambiguities arise through the interaction of the `NEGATIVE` elaboration with the `PREORDAINED` and `SCATTERED` elaborations: `"I am not seeing him tomorrow"` may be taken as a denial of any present plan to that effect (a `NEGATIVE PREORDAINED` message), or as an affirmation of a present plan to avoid him (a `PREORDAINED NEGATIVE` message); `"Grannie did not fall down fifteen times yesterday"` may be said as a precursor to insisting that she took only fourteen tumbles that day (a `NEGATIVE SCATTERED` message), or as a claim that, though she may have faltered fifteen times, on none of those occasions did she ultimately fall (a `SCATTERED NEGATIVE` message).

Yet more ambiguities arise from the possibility of throwing the `NEGATIVE` elaboration in with more than one invisible elaboration. I will illustrate with just one example:

```haskell
"Victor did not see Grannie for two hours."
```

Brace yourselves. This sentence encodes, among others: (i) a `PAST NEGATIVE EXTENDED` message (he saw her, but for an hour and a half at most); (ii) a `PAST EXTENDED NEGATIVE` message (for two whole hours, he didn't see her); (iii) a `PAST REGULAR NEGATIVE EXTENDED` message (he was formerly in the habit of avoiding her for two hours at a time); (iv) a `PAST NEGATIVE REGULAR EXTENDED` message (he wasn't formally in the habit of seeing her for two hours at a time); (v) a `PAST EXTENDED REGULAR NEGATIVE` message (his habit of avoiding her lasted a mere two hours); (vi) a `PAST NEGATIVE EXTENDED REGULAR` message (his habit of seeing her lasted more than two hours); (vii) a `PAST NEGATIVE PREORDAINED EXTENDED` message (there was no plan to see her for two hours; perhaps the plan was to see her for only one hour); (viii) a `PAST PREORDAINED EXTENDED NEGATIVE` message (the plan was to avoid her for two hours); (ix) a `PAST EXTENDED PREORDAINED NEGATIVE` message (for two hours, there was a short-lived plan to avoid her). I'll stop here, but by now it should be clear that these by no means exhaust the possibilities.

Admittedly some of the interpretations just given of this sentence will seem implausible; and some of its other interpretations (not listed) will seem outright bizarre. Nevertheless I maintain that they are all perfectly legitimate from a grammatical point of view. If any of them are in any sense ruled out, it can only be because they are weird or pointless, not because they are ungrammatical. Change the nucleus, meanwhile, or some of the surrounding arguments (durations, frequencies, tallies, and so on), and different sequences of elaborations leap to mind as plausible or likely. I see no reason to suppose that some combinations of these elaborations are intrinsically problematic. In any case, it is undeniable that there are many ambiguities like these in English, and it may be noted how effortlessly my theory is able to predict and explain them all. As with those highlighted in the previous section, I defy anyone to account for them satisfactorily in syntactic or pragmatic terms.

## 6. When Order Does (And Doesn't) Matter

Before moving on, let us take stock of a few things. Most of the elaborations we have seen so far (in the contexts in which we have seen them) generate new conditions. The only exceptions are the `PAST` elaboration, and the `PRIOR` elaboration when it is applied on top of the `PAST` elaboration, which target the time of the condition’s satisfaction instead. (The `NEGATIVE` elaboration doesn't always target the condition either, but we have yet to see the contexts in which it doesn't.) With the generation of new conditions, meanwhile, the order in which elaborations are applied is almost always significant: a `REGULAR EXTENDED` message is not the same as its corresponding `EXTENDED REGULAR`, and so on.

There is, as far as I can see, only one exception to this general rule: a `PRIOR NEGATIVE` is no different from its corresponding `NEGATIVE PRIOR`. The sentence, `"He has not eaten"` can be generated by applying these elaborations in either order, but that does not reflect any ambiguity. There is no discernible difference between being in a state of having not eaten, and not being in a state of having eaten. The same is true of `PAST NEGATIVE` messages and `NEGATIVE PAST` messages. This is perhaps less surprising, however, since the `PAST` elaboration targets a completely separate part of the message. Indeed, the order in which the `PAST` elaboration is applied relative to *any* of the other elaborations examined so far makes no difference whatsoever to the overall message. As a matter of convention, I will always represent it has having been applied *as late as possible* in the overall message.
