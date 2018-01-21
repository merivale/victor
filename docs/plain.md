---
id: plain
class: docs
---
# 4. Plain Messages

## 1. Introduction

As explained in the [theoretical overview](/overview), the nucleus of every English message is an ordered pair, containing an *object* and a *condition*:

```haskell
type alias Nucleus =
  ( Object, Condition )
```

Every plain English message, to repeat, affirms the present satisfaction of the condition by the object. Conditions break down further into a *pivot* and a (possibly empty) list of *balances*. Pivots, in turn, consist of a *verbality* optionally followed by a *status*, and balances comprise a *weight* optionally prefixed with a *relator*. Thus:

```haskell
type alias Condition =
  ( Pivot, List Balance )

type alias Pivot =
  ( Verbality, Maybe Status )

type alias Balance =
  ( Maybe Relator, Weight )
```

This is a lot of technical terms to introduce at once; I will explain the details slowly over the next two sections. First, however, some examples should help to give an approximate idea:

<table>
  <tr>
    <th>Object</th>
    <th colspan="6">Condition</th>
  </tr>
  <tr>
    <th></th>
    <th colspan="2">Pivot</th>
    <th colspan="2">Balance 1</th>
    <th colspan="2">Balance 2</th>
  </tr>
  <tr>
    <th></th>
    <th>Verbality</th>
    <th>Status</th>
    <th>Relator</th>
    <th>Weight</th>
    <th>Relator</th>
    <th>Weight</th>
  </tr>
  <tr>
    <td>I</td>
    <td>am</td>
    <td>happy</td>
    <td>for</td>
    <td>you.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>She</td>
    <td>is</td>
    <td>out</td>
    <td>with</td>
    <td>Fred.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>They</td>
    <td>look</td>
    <td>up</td>
    <td>to</td>
    <td>her.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>We</td>
    <td>like</td>
    <td>-</td>
    <td>-</td>
    <td>them.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>They</td>
    <td>live</td>
    <td>-</td>
    <td>in</td>
    <td>France.</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>I</td>
    <td>am singing.</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>They</td>
    <td>are laughing.</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>We</td>
    <td>are leaving</td>
    <td>-</td>
    <td>-</td>
    <td>it</td>
    <td>to</td>
    <td>them.</td>
  </tr>
</table>

As these examples illustrate, every nucleus must have at least an object and a verbality. Many conditions, however, include a status and one or more balances as well. We will examine the nucleus of English messages from the outside in, looking at objects and balances in [section 2](#2-objects-and-balances), and pivots in [section 3](#3-pivots).

## 2. Objects and Balances

There are three types of objects available in English, each of which comes in either singular or plural (represented in my model by a boolean argument, `False` for singular and `True` for plural):

```haskell
type Object
  = Speaker Bool
  | Hearer Bool
  | Other Bool (Maybe Sex) (Maybe String)

type Sex
  = Male
  | Female
```

The `Speaker` and `Hearer` objects are encoded in the first and second person pronouns respectively. By default, the `Other` object is encoded in the third person pronouns (I trust the influence of the optional `Sex` argument here is self-explanatory). However, English also has room for an optional string argument in this case, a proper name that overwrites the default pronoun. There is no restriction in the English code on what can count as a proper name; the only rule is that it should begin with a capital letter.

(For readers unfamiliar with this style of programming, a `Maybe x` variable can take one of two values: `Nothing` or `Just x`. The `Nothing` value acts like the `null` value used in some other programming languages. The difference is that, in languages that allow `null` as a value, *any* variable can take that value, making every value effectively optional. In Elm, as in Haskell, optional variables must be explicitly defined as such with `Maybe`.)

When referring to objects in what follows, I will adopt the following abbreviating conventions. Rather than write `Speaker False` and `Speaker True`, I will write `Speaker` and `Speakers` respectively; similarly for `Hearer(s)` and `Other(s)`. When the optional sex and string arguments are not present, meanwhile, I will simply omit them, instead of explicitly writing `Nothing`. And when they are present, I will write them on their own, as `Male` or `Female` instead of `Just Male` or `Just Female`. Finally, when the sex variable is present, I will not bother to write `Other` in front of it. For example:

| Abbreviation       | Full Meaning                                 |
| ------------------ | -------------------------------------------- |
| `Speaker`          | `Speaker False`                              |
| `Hearers`          | `Hearer True`                                |
| `Male`             | `Other False (Just Male) Nothing`            |
| `Female "Grannie"` | `Other False (Just Female) (Just "Grannie")` |
| `Others`           | `Other True Nothing Nothing`                 |

I hope these conventions are all intuitive and easy to understand. The point of adopting them is to make the examples that follow easier on all of us.

Objects occur in two places in the nucleus: as the *main* object which satisfies the condition, or as a *balancing* object inside the condition itself. The main object is encoded in the first direct form of the pronoun (`"I"`, `"you"`, `"they"`, etc.). Balancing objects are normally encoded in the second direct form (`"me"`, `"you"`, `"them"`, etc.).

A balance consists of a *weight*, optionally preceded by a *relator*:

```haskell
type alias Balance =
  ( Maybe Relator, Weight )

type Relator
  = About
  | Above
  | After
  | Against
  | At
  | Before
  | Behind
...

type Weight
  = SameAsMain
  | Different Object
```

Relators are encoded in prepositions. There are 31 relators in my model at present (I didn't bother listing them all above). This list is incomplete, but it accounts for many common prepositions. Relators will reappear in the context of pivots; see [section 3](#3-pivots). Weights, meanwhile, are the balancing objects mentioned a moment ago. These are essentially just objects like the main object of the nucleus, but with the added possibility that they may refer back to the main object itself (in which case they generate the third direct form of the pronoun, rather than the second; e.g. `"myself"`, `"yourself"`, `"themselves"`).

Some more abbreviating conventions relating to balances: Whenever a relator is absent, I will omit it, rather than explicitly writing `Nothing`; and when it is present, I will write it on its own, as e.g. `Against` instead of `Just Against`. When the weight is not the same as the main object, I will not bother explicitly writing `Different`, but write the object on its own (abbreviated as before). And finally, when a balance contains only a weight (i.e. no relator), I will drop the brackets around it. For example:

| Abbreviation                 | Full Meaning                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `Others`                     | `( Nothing, Just (Different (Other True Nothing Nothing)) )`                   |
| `( Behind, Hearer )`         | `( Just Behind, Just (Different (Hearer False)) )`                             |
| `( For, SameAsMain )`        | `( Just For, Just SameAsMain )`                                                |
| `( With, Female "Grannie" )` | `( Just With, Just (Different (Other False (Just Female) (Just "Grannie"))) )` |

If it wasn't clear before, I trust this table illustrates the benefits of conventions like these. I adopt them not just to save space, but to make my examples easier to read and understand. Brackets and `Just`s and `False`s all over the place are necessary for compilers, but for human readers they very often serve to obscure more than to illuminate.

Objects are always encoded in either pronouns or proper names. Nouns and noun phrases---`"water"`, `"some water"`, `"a glass of water"`, `"that glass of water"`, `"her glass of water"`, etc.---are accounted for by my theory of elaborations. See the section on [Quantifiers](/quantifiers) for details.

## 3. Pivots

At the heart of the nucleus is the pivot, which breaks down further into a *verbality* and an optional *status*:

```haskell
type alias Pivot =
  ( Verbality, Maybe Status )

type Verbality
  = Be Bool
  | Do String Bool Bool

type Status
  = Absolute String
  | Relative Relator
```

Statuses, first of all, are of two kinds, either `Absolute` or `Relative`. `Absolute` statuses are *properties*, encoded in adjectives (`"happy"`, `"hilarious"`, `"hungry"`, etc.). My model does not currently contain any properties or adjectives, however, and consequently the `Absolute` value simply takes a string argument. What this means is that users are obliged to encode their properties for themselves, inputting the resulting adjective directly into the system. I call values for which this is the case *unearthed* variables; as we will see, there are a few such unearthed variables in my model. I will say something more general about this in [section 4](#4-limitations) below. `Relative` statuses, meanwhile, are for relators, which are encoded in prepositions (`"at"`, `"by"`, `"in"`, `"with"`, etc.). We already met these in [section 2](#2-objects-and-balances).

Going back to the start of the pivot, we have the verbality, which determines the choice of verb. It can take one of two values:

```haskell
type Verbality
  = Be Bool
  | Do String Bool Bool
```

The `Be` verbality, unsurprisingly, triggers selection of the verb **`"be"`**, with the form of this verb being determined by the main object of the nucleus, according to the following schema:

| Object      | Form    |
| ----------- | ------- |
| `Speaker`   | `"am"`  |
| `Other`     | `"is"`  |
| *otherwise* | `"are"` |

The boolean argument this verbality takes indicates whether or not the condition as a whole is *ongoing*; when set to true, this introduces the participle form `"being"` immediately after the finite form as determined by the object. It underlies the difference between, for example, `"He is silly"` and `"He is being silly"`. (The adjective `"silly"`, in these examples, comes from the status variable.)

If there is an English condition comprising nothing other than the `Be` verbality (i.e. a pivot with no status, followed by an empty list of balances), then it is the condition of existence; as in the standard translation of Descartes' famous claim, `"I think, therefore I am"`. For what it's worth, I myself find it hard to interpret sentences like `"I am"` or `"They are"` as encoding existential claims. Such semi-sentences seem to me to demand the response, *are what?* And so I am tempted to say that there is no English condition comprising the `Be` verbality on its own, and that the proper translation of Descartes is `"... therefore I exist"`. But my intuition is not shared by all English speakers, and I needn't insist on the point.

At any rate, there are certainly plenty of English conditions made up of the `Be` verbality together with a status. When the status is `Absolute` (i.e. a property), the condition is that of having that property:

```haskell
( Speaker, Be, "hungry" )
  -> "I am hungry."

( Hearer, Be, "silly" )
  -> "He is silly."

( Others, Be, "beautiful" )
  -> "They are beautiful."
```

When the status is relative (i.e. a relator), the condition is that of being in a certain *standing*. For example:

```haskell
( Speaker, Be, Out )
  -> "I am out."

( Female "Grannie", Be, Up )
  -> "Grannie is up."

( Speakers, Be, Over )
  -> "We are over."
```

To be clear, I am adopting some more abbreviating conventions here. To begin with, I do not bother with brackets around either the condition or its underlying pivot, since there is no possibility of confusion, and including them would therefore make things longer and harder to read for no reason. And when the list of balances is empty (as in all the examples above) I omit it, instead of explicitly writing `[]`. When the *ongoing* boolean argument to the `Be` verbality is `False` (as above), I likewise omit it; when it is `True`, I will write it as `Ongoing` instead, so that readers don't have to remember what its purpose is. With statuses, finally, I will omit them when they are absent (instead of explicitly writing `Nothing`), and just write the crucial value when they are present, since there is again no possibility of confusion. Thus I write `"hungry"` instead of `Just (Absolute "hungry")`, or `Out` instead of `Just (Relative Out)`.

Not every condition involving the `Be` verbality can be made ongoing. It is only those for which some intelligible distinction can be made. `"I am being up"`, for example, is not a sentence of English, presumably because there is no way in which its interpretation might differ from that of `"I am up"`. In contrast, `"He is being silly"` is perfectly fine, and marks an important informational difference from `"He is silly"`. The former conveys something about his present behaviour, while the latter conveys something about his present character.

The `Do` verbality is responsible for all other English verbs. As with properties and adjectives, however, my model does not currently include any of these options itself. For now users are obliged---except in the special case of `Be`---to encode the core of their verbalities for themselves. My system generates the appropriate *form* of the verb for your message, but you need to supply the verb yourself (in its base form, e.g. `"eat"`, `"dance"`, `"live"`). This is the point of the string argument. The form of the verb is then determined by the object: the first finite form in the case of the `Other` object singular, and the base form otherwise.

Following the string argument of the `Do` verbality, there is a boolean argument representing whether or not the condition in question is *ongoing*, exactly as it does with the `Be` verbality; this underlies the difference between, for example, `"She lives"` and `"She is living"`. The second boolean argument, not available for the `Be` verbality, indicates whether or not the condition as a whole is *passive*; this accounts for the difference between, for example, `"She eats"` or `"She is eating"` on the one hand, and `"She is eaten"` or `"She is being eaten"` on the other.

Some `Do` verbalities (though not many) can pair up with properties, much like the `Be` verbality; for example:

```haskell
( Female, Do "seem", "hungry" )
  -> "She seems hungry."

( Others, Do "look", "serious" )
  -> "They look serious."

( Female "Grannie", Do "become" Ongoing, "ridiculous" )
  -> "Grannie is becoming ridiculous."
```

Like the `Be` verbality, these cannot be made passive. In the present incarnation of my model, however, this possibility has not been ruled out, a wrinkle I will need to iron out in a future update.

Rather more `Do` verbalities can pair up with relators; for example:

```haskell
( Male, Do "go" Ongoing, Out )
  -> "He is going out."

( Hearer, Do "look" Ongoing, Down )
  -> "You are looking down."

( Female "Grannie", Do "fall" Ongoing, Over )
  -> "Grannie is falling over."
```

Many `Do` verbalities, as we will see in a moment, support balances as well. In general, there is little to say about the semantics of `Do` verbalities. They are considerably varied. There are tens of thousands of them, and the study of them is an enormous subject in its own right (not attempted here).

One thing to say in general is that the satisfaction of some conditions with `Do` verbalities necessarily *takes time*, and that for this reason the `Ongoing` flag is typically called for when these verbalities occur in unelaborated messages: `"They are eating out"` rather than `"They eat out"`. The latter sentence has a perfectly sound interpretation (concerning their general eating habits), but it is an elaborated message; see the section on [Elaborations](/elaborations).

There is a degree of fluidity between `Be` verbalities and `Do` verbalities when the latter are either ongoing or passive. For example, the message encoded as `"It is interesting"` could be the result either of the `Be` verbality followed by a property encoded as `"interesting"`, or of the `Do "interest" Ongoing` verbality. Similarly, `"It is allowed"` could be the result either of the `Be` verbality followed by a property encoded as `"allowed"`, or of the `Do "allow" Passive` verbality. I suggest it doesn't much matter which analysis we opt for. Since my model only allows for one status following the verbality, however, a sentence like `"They are allowed in"` can only be the result of a passive `Do` verbality; the status generates the preposition `"in"`, and so `"allowed"` must be coming directly from the verbality in this case.

When the `Be` verbality is paired with a status, typically no balances are required to make a complete condition. In some cases, however, with a suitable status, a balance can also be included:

```haskell
( Male, Be, Out [ ( With, Male "Robert" ) ] )
  -> "He is out with Robert."

( Speakers, Be, "happy", [ ( For, Hearers ) ] )
  -> "We are happy for you."
```

When the `Be` verbality has no subsequent status, one possibility is to balance out the pivot with another object, the overall result being an identity claim:

```haskell
( Speaker, Be, [ Male "Victor" ] )
  -> "I am Victor."
```

Another possibility is to balance it out with an object prefixed with the `Like` relator, the overall result being a similarity claim. Such balances are also common with the `Do` verbalities that (like the `Be` verbality) can be paired with properties:

```haskell
( Speaker, Be, [ ( Like, Male "Victor" ) ] )
  -> "I am like Victor."

( Hearer, Do "sound", [ ( Like, Female ) ] )
  -> "You sound like her."

( Female, Do "look", [ ( Like, Hearer ) ] )
  -> "She looks like you."
```

Balances of all kinds are common with other `Do` verbalities:

```haskell
( Male "Victor", Do "love", [ Female "Grannie" ] )
  -> "Victor loves Grannie."

( Female "Grannie", Do "live", [ ( At, Other "Cockroach Lane" ) ] )
  -> "Grannie lives at Cockroach Lane."

( Female "Grannie", Do "live", [ ( At, Other "Cockroach Lane" ), ( With, Female "Susan" ) ] )
  -> "Grannie lives at Cockroach Lane with Susan."
```

## 4. Limitations

It should go without saying that my theory is incomplete, a work in progress that stands in need of significant expansion and refinement. My theory of plain messages in particular---more specifically my theory of English *conditions*---is perhaps the most strikingly incomplete aspect of the whole. My aim in this section is to get out in front of any criticisms on this score, by acknowledging the most egregious of these inadequacies, and explaining why I am in no great hurry to address them. The main point, by way of headline, is that I am more interested in the theory of elaborations, and I expect that any philosophers who are likely to take an interest in my work will share this bias. My theory of plain messages is not intended to make any very great headway into that field, then, but rather to provide just enough to serve as the basis for my main project, the theory of elaborations.

There are two immediately obvious inadequacies, namely that my theory does not cover all of the ground (there are sentences that it cannot account for), and that, even in the ground that it does cover, it leaves some things unearthed (the properties and verbalities that users are currently obliged to encode for themselves). Both of these inadequacies are relatively untroubling. If you-ll excuse the change of metaphor, neither of them indicates that I am on the wrong track; they merely remined us that---of course---I have yet to reach the end of that track. While I am here, I may add that precisely the same limitations apply to my theory of elaborations too: there are many elaborate messages that my system cannot encode, and with the ones that it does encode, it still relies on users encoding certain unearthed variables for themselves.

In developing my theory in the future, I will naturally want to dig up some of the presently unearthed variables. In some cases, however, I will be in no great hurry to do so. It seems to me that there is nothing particularly puzzling or intriguing, from a theoretical point of view, about properties and the way in which they are encoded into adjectives, and uncovering this variable would simply be a matter of giving my system an enormous dictionary. The same is true of what I call *categories* (which are encoded into nouns), another unearthed variable that we will meet in my theory of elaborations. And the same is mostly true of verbalities, except that in their case at least a degree of excavation would be necessary for the implementation of any validation checks on conditions (see the end of this section).

Regarding the uncovered ground, here are three simple sentences that my theory is not yet able to account for:

```haskell
"I am here."

"She likes singing."

"Singing is fun."
```

For what it's worth, my current thinking is that there are in English at least two other kinds of `Other` (third person) objects not presently captured in my model: places and conditions. These, I suggest, would account for the first sentence and the last two sentences above respectively. (Sentences like `"She likes to sing"` are dealt with by my theory of elaborations.) But there will always be more to do, and one has to pause somewhere along the way. (I presume that `"somewhere"`, incidentally, would be the result of elaborating a message with a place variable in its nucleus; my model doesn't predict the uses of this word yet either.) I am also unable to generate compound prepositional phrases like `"in front of"` or `"on top of"`.

More worrying still is that there are ambiguities I am unable to account for. This is particularly regrettable, because the ability to account for ambiguities is precisely one of the main selling points of my approach as a whole. In my defence, I can account for several ambiguities with my theory of elaborations (as we will see), and that, as I advertised earlier, is where my main interests lie. There are some ambiguities, however, that need to be accounted for by the theory of plain messages, and my model is not yet able to do this. The ambiguities in question concern how balances fit into the overall condition, informational differences that are not captured when we represent balances simply as a list. For example:

```haskell
"Claire is looking at Grannie with Victor."
```

This sentence is ambiguous: is Claire with Victor, looking at Grannie, or is Grannie with Victor, both being looked at by Claire? There must be two distinct conditions here, and consequently two distinct messages, both of which fetch up in the same English sentence. But I have no way of representing the difference. On my model as it stands, I have room only for one message to correspond to this sentence:

```haskell
( Male, Do "look" Ongoing, [ ( At, Female "Grannie" ), ( With, Male "Victor" ) ] )
```

Evidently, then, there is more to a condition than just a pivot and a bare *list* of balances. To understand a condition fully, one must also appreciate how each individual balance relates to the pivot. Sometimes that relation is signalled explicitly by the relator (`"He gave the book to her"`), and sometimes it is signalled implicitly by the order of the balances (`"He gave her the book"`). But sometimes---as in the ambiguous example just now---there is yet more information that goes unsignalled. But representing this information in my model of messages is a problem for another day.

(A tentative suggestion: Perhaps the definition of a weight needs to be made recursive, allowing for balances within weights. The representation above, then, would be of the message in which he is with Victor, both of them looking at Grannie. The message where Victor is with Grannie instead would involve a balance within a weight:

```haskell
( At, ( Female "Grannie", ( With, Male "Victor" ) ) )
```

In plainer terms, the difference would be between *looking at-Grannie with-Victor* (two separate balances) and *looking at Grannie-with-Victor* (one balance, with another balance inside it). With balances being encoded in order, and sub-balances before the next balance at the same level in the list, it is easy to see how the ambiguity in the sentence would then arise.)

Finally, perhaps the most striking weakness in my theory of plain messages is that it currently predicts far too much. This is because my model makes no attempt to validate input conditions. In constructing balances, users are allowed to combine any relator with any object; while in constructing the condition itself, they may combine any status with any verbality, and then append any list of balances whatsoever. As a result it is possible---let me not mince words---to generate *complete and utter nonsense* within my system. For instance:

```haskell
( Male "Victor", Do "love", At, [ ( Behind, Female "Grannie" ) ] )
  -> "Victor loves at behind Grannie."

( Female "Grannie", Do "live", [ Speaker, Hearer, ( Over, SameObject ) ] )
  -> "Grannie lives me you over herself."

( Female "Grannie", Be, "red", [ Speakers ] )
  -> "Grannie is red us."

( Others, Do "taste", "heavy", [ Hearer, ( With, Other ) ] )
  -> "They taste heavy you with it."
```

Obviously this is a very serious inadequacy, and I make no attempt to shy away from this fact. I am not, however, in any great hurry to develop my theory further in this direction, and to write in constraints on what counts as a valid condition. This is for two reasons. First, the task is quite simply an enormous one, requiring the collation of tens of thousands of verbalities, noting---just for starters---what statuses each of these can be paired with, and what sort of balances the ensuing pivots can support. It is not a task for one person alone. Secondly, although I by no means wish to belittle the value of this endeavour, my own interests currently lie elsewhere, in the theory of English elaborations. I offer this crude theory of plain messages predominantly just so that I have a basis on which to build this latter theory. And I am anticipating that my critics will share this bias, and therefore show me some leniency with regard to my rough and ready model of conditions.
