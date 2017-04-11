# Victor

A partial model the English language, thought of as a code for processing `messages` (structured arrangements of informational and stylistic choices) into `sentences` (strings of words). Inspired by the work of logician and grammarian Victor Howard Dudman.

The algorithm is written in [Elm](http://elm-lang.org/), with the styles written in [Less](http://lesscss.org/). The compiled HTML+JS+CSS is stored in the `docs` folder, for easy integration with [GitHub Pages](https://pages.github.com/); thus you can play around with the current version at [https://merivale.github.io/victor/](https://merivale.github.io/victor/).

## 1. Overview

The overarching hypothesis behind this model is that every atomic English message is made up out of a series of zero or more `elaborations` applied to a core `nucleus`. The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.

A major selling point of the model, and more generally of the idea to treat natural languages as codes in this way, is that it enables us to explain the widespread phenomenon of ambiguity in semantic terms (contrary to current mainstream thought in philosophical semantics, which treats it as either a syntactic or a pragmatic phenomenon). The explanation of ambiguity in general is that the encoding function is not one-to-one, but many-to-one. Furthermore, by articulating the English function, we can see precisely how and why various English ambiguities arise. In some cases it is simply because an elaboration leaves no mark on the output sentence, but more often it is because multiple elaborations (or multiple sequences of elaborations) happen to coincide in the same output. Examples will be given in section 3 below. In computational terms, English is a *lossy* code, which does not preserve in its output strings all of the information in its originating messages.

## 2. The Nucleus

The nucleus of every atomic English message in my model is made up of two items, plus a couple of (theoretically uninteresting) stlylistic choices:

    type alias Nucleus =
        { object : Object
        , condition : Condition
        , style : Style
        }

The `object` is whatever the message is about, and may take any one of the following values:

    type Object
        = Speaker
        | Hearer
        | Male (Maybe String)
        | Female (Maybe String)
        | Thing (Maybe String)
        | Speakers
        | Hearers
        | PeopleOrThings (Maybe String)

The optional string argument in four of these cases is intended to house a proper name; otherwise English defaults to the appropriate pronoun (`"he"`, `"she"`, `"it"`, `"they"`). In the other cases only the pronoun is available (`"I"`, `"you"`, `"we"`).

The `condition` is whatever is predicated of this `object`, and it breaks down further into a `pivot` and an optional `balance`. My model does not yet handle these `conditions` with any great precision. Users are obliged to encode the `pivot` for themselves (into a verb), and will often need to encode the `balance` for themselves as well. The exceptions to the latter rule are when the `balance` is another `object`, either identical to the main `object` (as in, `"He likes himself"`), or distinct (as in, `"He likes her"`). Thus:

    type alias Condition =
        { pivot : String
        , balance : Maybe Balance
        }
    
    type Balance
        = SameObject
        | DifferentObject Object
        | CustomBalance String

The plainest of English sentences comprises a `subject` and a `predicate`, where the `object` is encoded in the former, and the `condition` is encoded in the latter. The `predicate` can be broken down further into the `fulcrum` (which encodes the `pivot`) and an optional `counter` (which encodes the `balance`). Consider for example the following message:

    Plain
        { object = Speaker
        , condition =
            { pivot = "be"
            , balance = DifferentObject (Male "Victor")
            }
        , style =
            { abbreviateFulcrum = False
            , abbreviateNot = False
            }
        }

When fed through my encoding function, this produces the string `"I am Victor"`. If the `abbreviateFulcrum` flag is set to true, the result would instead be `"I'm Victor"`. The `abbreviateNot` flag should be self-explanatory, though it is only relevant when the message is negated (see section 3.1 below).

A plain, unelaborated English message affirms the present satisfaction of the `condition` by the `object`. More elaborate messages may alter any of these three things, by (1) replacing the present for some other point or region of time, (2) modifying the `condition`, or (3) modifying or overriding the `object`.

## 3. The Elaborations

There are currently 17 elaborations posited by my model. This list is obviously incomplete, but represents - or so I hope - a decent start.

### 3.1. Negative Messages

The chief puzzle facing any theory of negation in English is posed by the related ambiguities discovered, for example, in the following two sentences:

    "Claire doesn't drink."
    
    "I was not busy all day."

In the first case, the speaker might be maintaining that Claire is tee-totalled, or might instead be denying that she is an alcoholic. The latter reading is consistent with Claire enjoying a drink now and then, while the former is not. In the second case, the speaker might be affirming that she was free all day yesterday, or might rather be rejecting the claim that she was occupied all day. The latter interpretation is consistent with her having been busy at some point in the day, while the former is not. In sum, the first interpretation of each sentence is a positive message about something internally negative, whereas the second is a negative message about something internally positive. (The possibility of these two kinds of negation is also why double negation isn't always vacuous: `"Claire doesn't not drink"`, for example, can be used perfectly intelligibly to deny that she is tee-totalled.)

My model posits a `Negative` elaboration, which has the semantic effect of converting any affirmative message into its corresponding denial. Its grammatical effect, meanwhile, is in most cases the introduction of the word `"not"` after the `fulcrum` (for the other cases, see section 3.7 below). The difference between the pairs of messages just noted is accounted for by the *order* in which this elaboration is applied, relative to other elaborations in the message. In the second of each pair, the `Negative` elaboration is the outermost one, whereas in the first of each pair it is closer to the `Nucleus`, with a further elaboration applied on top of it. For my account of these other elaborations, and hence my complete solution to this puzzle, see sections 3.3 and 3.4 below.

The `Negative` elaboration is the most semantically versatile of those posited by my model. While its effect, as I have said, is always to turn an affirmative message into its corresponding denial, there are different components of messages that can be the focus of a denial. What exactly is being denied in a `Negative` message depends on the elaboration to which the negation itself is applied, and hence discussion of the other elaborations below will include details on what happens when you negate them.

### 3.2. Past and Prior Messages

Plain English messages affirm the *present* satisfaction of the `condition` by the `object`. That the present is the default tense for English messages is suggested by the fact that, with the exception of the highly irregular verb `"be"` and the third person singular form of other verbs, the present form is simply the base form: `"have"`, `"do"`, `"eat"`, `"walk"`, etc. It is also suggested by the so-called "timeless" use of the present for abstract, mathematical, or logical claims for which time is irrelevant: `"Two plus two equals four"`, `"A vixen is a female fox"`, etc. It also accords nicely with our tendency to *update* state reports to the present, even when our evidence supports only the claim that they held in the past: `"My car is parked outside"`, `"Fred is in his office"`. Ultimately, however, the evidence for this assumption is holistic, arising from the overall power of the theory in which it is embedded.

If the present is the default tense for plain English messages, past tense messages can only arise through some `Past` elaboration, and this is precisely what I maintain. Semantically, this elaboration turns any message about the present into its corresponding message about the past. Grammatically, its effect is to change the form of the verb or modal at the `fulcrum` of the sentence: `"I am Victor"` becomes `"I was Victor"`, and so on.

English also has a `Prior` elaboration, whose semantic effect is to locate the `condition`'s satisfaction in some point or region of time prior to some other point in time. By default, the other point in time is the present, in which case the semantic difference between `Past` and `Prior` is only very slight. In any case, the grammatical upshot of this elaboration is to displace the fulcrum with the corresponding finite form of the verb `"have"`, and convert the previous fulcrum to its prior participle form: `"I am Victor"` becomes `"I have been Victor"`, while `"I was Victor"` becomes `"I had been Victor"`. Though the semantic similarity between `Past` and `Prior` is anyway obvious, it is worth noting that for the regular English verbs the past form and the prior participle form are identical; e.g. `"He walked to work"`, `"He has walked to work"`.

What I am calling a `Prior` message will be familiar to grammarians under the guise of the "perfective". I do not much care for that term, which doesn't seem to me to capture the essence of this elaboration's semantic effect as precisely as does the label "prior". Standard English grammars also acknowledge a "past past" tense, encoded with `"had"` + the prior participle. Consequently they discover an ambituity in sentences like `"He had walked to work"`, which admit of a "past past" interpretation as well as a "past perfective". I agree with the observations, but account for them rather differently: it is all a matter of the order in which the `Past` and `Prior` elaborations are applied. A `Prior` message is "perfective" in the terminology I shun, and a `Past Prior` message is a "past perfective". I diagnose the "past past" tense, meanwhile, as a `Prior Past` message. The order in which the elaborations is applied has no effect on the output sentence, leading to the ambiguity we observe.

Negating a `Past` or `Prior` message does nothing special. More precisely, a `Negative Past` message is semantically identical to a `Past Negative` message, and likewise for `Negative Prior` and `Prior Negative` messages. To put it another way, the `Past` and `Prior` elaborations are entirely independent of the `Negative` elaboration. This reflects a general point in my model: while the order in which elaborations are applied typically makes a semantic difference, this need not always be so. Sometimes all that matters is *that* an elaboration has been applied, not *when* it was applied.

### 3.3. Extended and Scattered Messages

The elaborations examined in this section share the interesting property of being "invisible", in the sense that they have, in and of themselves, no effect on the output sentence. They each take an additional argument alongside their input message, and this argument does have a visible effect. Even with this extra argument, however, these elaborations are the source of some striking English ambiguities when they interact with other elaborations.

The `Extended` elaboration, first, has the semantic effect of creating a message that entails the satisfaction of its input condition over an *extended* period of time, taking an additional argument specifying the `duration` of this period. The elaboration itself, as I have said, has no effect on the sentence. The `duration` argument, meanwhile, results in an adverbial string appended to the end of the predicate. For example:

    "Susan studied in France for a year."
    
    "Grannie teased the cobra all day."

The `Scattered` elaboration, second, has the semantic effect of producing a message that entails the satisfaction of its input condition on *multiple* occasions, and its grammatical effect is likewise the appending of an adverbial string, which in this case encodes the `tally` of individual satisfactions. For example:

    "Susan went to France twice."
    
    "Grannie fell downstairs fifteen times."

`Extended` and `Scattered` messages are not discovered in the wild except when they have been further modified with a `Past` elaboration (as above), or some other elaboration that prevents them from amounting to an affirmation of the *present* satisfaction of the `Extended` or `Scattered` condition. This is for the obvious reason that the present is an instant, and `Extended` and `Scattered` conditions necessarily require a *region* of time in which to be satisfied.

When negating an `Extended` or a `Scattered` message, the result is a denial of the `duration` or `tally`, not of the underlying condition itself. In order to negate the underlying condition, the `Negative` elaboration must be applied *before* the `Extended` or `Scattered` elaboration. With this point in mind, I can now be clearer about my solution to the puzzle I posed about negation in section 3.1. Recall the ambiguous sentence:

    "I was not busy all day."

I diagnose the first reading, in which the speaker is affirming that she was free all day, as a `Past Extended Negative` message, where the idea of being busy is first negated, then extended to the whole day, and then that resulting message consigned to the past. The second reading, in which the speaker is denying that she was occupied all day, is instead a `Past Negative Extended` message. Needless to say, the order in which the `Negative` and `Extended` elaborations is applied has a notable semantic effect, but no grammatical effect: the output sentence is the same either way.

The very same ambiguity arises through the interaction of the `Negative` elaboration with the `Scattered` elaboration, though typically the `Negative Scattered` interpretation will seem more natural than the `Scattered Negative`, because it may often be hard to make sense of an occasion on which something *didn't* happen. Typically, English speakers will likely read `"Grannie didn't fall downstairs fifteen times"` as a precusor to saying, for example, that she took only *fourteen* tumbles that day. Suppose, however, that she attempted the stairs fifteen times last Thursday, faltering each time but always remaining on her feet. Then one would have a natural use for the `Past Scattered Negative` as well as the more common `Past Negative Scattered`.

### 3.4. Preordained and Regular Messages

The two elaborations discussed in this section have a lot in common with those discussed in the previous section. They are likewise invisible, though they also both take an additional argument that is not invisible. Unlike the previous two elaborations, however, this additional argument is optional; and when it is absent, even more potential ambiguity arises.

The `Preordained` elaboration is a particularly important one, since its presence - and moreover its *misdiagnosis* - has led to accounts of tense in English that are considerably more complicated than they should be. The semantic effect of this elaboration is a message affirming the *prearranged* or *predetermined* satsifaction of its underlying condition at some later time. The time in question constitutes an optional argument which, when present, results - just like the two elaborations examined in the previous section - in an adverbial string at the end of the predicate. For example:

    "Terry and Julie are getting married next June."
    
    "The sun sets at 7.22pm tomorrow."

The first message here illustrates the prearranged case, while the second illustrates the predetermined one. The `Preordained` terminology is intended to cover both. Grammarians will know these as "futurate" messages.

The standard grammatical treatment of "futurate" messages takes them to be direct affirmations about the future. This is doubly unfortunate. In the first place, it means that the so-called "present" form of the verb is both badly labelled and ambiguous: sometimes it means the present, but sometimes (as here) it means the future. In the second place, it fails to accommodate *past* "futurate" messages:

    "Terry and Julie were getting married next June (but then there was a double booking at the venue/her father objected/his previous marriage came to light/...)."
    
    "The sun set at 7.22pm tomorrow (but that was on the old timekeeping convention/before the asteroid knocked us into our new orbit/...)."

In these cases, plainly enough, what is affirmed is the *past* existence of some prearrangement or predetermination, which is presumptively no longer present. Just so, in the previous cases what is affirmed is the *present* existence of such a preordainment. This diagnosis better reflects the semantic and grammatical facts, and also saves us from the unwelcome conclusion that the present form of the verb is ambiguous: it always signals *something* as present, it is simply that the something in question may vary.

The `Regular` elaboration entails - I don't know how else to say it - the *regular* satisfaction of its underlying condition, and takes an optional additional argument specifying the `frequency` of this regularity. `Regular` messages come in a few different flavours: claims about the habits of such animals as are capable of forming them, claims about man-made regularities, and also claims about the reliable tendencies of the inaminate world. For example:

    "Grannie often teases the cobra."
    
    "The train to London invariably departs from platform 8."
    
    "Salt dissolves in water."

In this case, notice, the optional `frequency` argument is most naturally placed just before the fulcrum, and that is where my encoding function currently places it. A fuller model, however, would provide some stylistic freedom here which I have not yet implemented, since the following sentences are also perfectly good English:

    "Often Grannie teases the cobra."
    
    "Grannie teases the cobra often."

The `Preordained` and the `Regular` elaborations both interact with the `Negative` elaboration in much the same way as we saw in the previous section with the `Extended` and `Scattered` elaborations. There is a crucial semantic difference between a `Preordained Negative` or `Regular Negative` message on the one hand, and a `Negative Preordained` or `Negative Regular` message on the other. In the case of `Regular` messages which do have the optional `frequency` argument, there need be no ambiguity, since the order in which the elaborations is applied is reflected in the order of "not" and the adverb:

    "Fred doesn't usually take the bus to work."
    
    "Fred usually doesn't take the bus to work."

When the frequency argument is absent, however, the now familiar ambiguity emerges. This is precisely the ambiguity in the other example I gave in section 3.1:

    "Claire doesn't drink."

This sentence, we can now see, sports both a `Regular Negative` interpretation (she is tee-totalled) and a `Negative Regular` interpretation (she isn't an alcoholic).

The four invisible elaborations not only result in ambiguties when they interact with negation, but also when they interact with each other. Consider the following entertainingly ambiguous sentence:

    "The film began at 8 o'clock."

By my count, this sentence is accessible to no fewer than *five* distinct interpretations: a simple claim about when the film started (a past plain nucleus), a claim about when it was scheduled to start (a past preordained message), a claim about when showings of started (a past regular message), a claim about when showings of it were scheduled to start (a past preordained regular message), and finally a claim about the time at which the management, when drawing up their plans, generally scheduled showings of it to start (a past regular preordained message). (It may be hard to envisage a use for this last message. To aid your imaginations, suppose the management had to fix the timetable anew each morning, and typically ended up placing the film in question in the 8 o'clock slot. This in contrast to the more likely fourth interpretation, in which they settle once and for all on a regular 8 o'clock position.)

### 3.5. Ongoing, Determined, Imminent, and Apparent Messages

Unlike the elaborations of the previous section, the elaborations discussed in this section are all visible. Specifically, they all displace the fulcrum in the output sentence. Examples all at once:

    Plain:      "He is silly."
    Ongoing:    "He is being silly."
    Determined: "He is going to be silly (tomorrow)."
    Imminent:   "He is about to be silly."
    Apparent:   "He appears/seems to be silly."

There are, I presume, quite a few English elaborations that have the effect of introducing a new verb and displacing the old one; thus what grammarians term "catenative" verbs. The four I have implemented so far are intended only as a representative sample. (For the record, I anticipate that a complete model of English would posit fewer elaborations of this nature than there are catenative verbs, since some such elaborations will take additional arguments, and be responsible for several of the verbs at once. For example, I suspect there is just one `Intentional` elaboration that generates all of:

    "He wants/hopes/intends/wishes/plans/expects/... to be silly (tomorrow)."

But these represent questions for another day.)

[...]

### 3.6. Practical, Projective, and Evasive Messages

There is no `Future` elaboration in my model, and this is not simply because I haven't got around to including it: on the contrary, I positively deny that any such elaboration exists in English. There are many reasons for this, and I do not propose to go into them at length here. Instead, I will simply outline my alternative, in the hopes that its elegance and predictive power will speak for itself.

In addition to its copious verbs, English boasts a small handful of modals, which distinguish themselves by having only finite forms (i.e. no base form and no participle forms). Half of them, moreover, have only one finite form, where the verbs all have two (present and past). They are: `"will/would"`, `"shall/should"`, `"may/might"`, `"can/could"`, `"must"`, `"ought"`, `"need"`, and `"dare"`. To explain the use of these curious words, I posit nine English `modalities`, and three elaborations that take these `modalities` as arguments.

[...]

### 3.7. Indirect, Enumerated, and Amassed Messages

[...]
