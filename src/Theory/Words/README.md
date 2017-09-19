# Victor / src / Theory / Words

The modules in this directory are shared among the different layers of the theory (though some of them are not used in every layer). They contain basic functions for encoding individual informational fragments into words, which are called by the main encoding function. While not of much theoretical interest in themselves, these may serve to solidify an understanding of the small amount of (largely standard) grammatical terminology that I deploy.

Notably absent from the list below are *adjectives*, which encode what I call *properties*. Properties are currently unearthed variables in my model (in the sense explained in [section 4 of the README in the `src/Theory/Plain` directory](https://github.com/merivale/victor/tree/master/src/Theory/Plain#4-limitations)). This means that users must encode properties for themselves, inputting the resulting adjectives directly into the system. Consequently I have no use at present for an `Adjectives` module.

## 1. Nouns and Pronouns

*Categories* are encoded in *nouns*. Like properties, these are currently unearthed variables in my model, which users are obliged to encode for themselves. The `Nouns` module, however, exposes a function for converting the singular form of a noun into its corresponding plural. This is done by first looking the noun up in a dictionary of irregularities, and failing that by guessing the appropriate form (`"-y" -> "-ies"`, `"-ch" -> "ches"`, etc.).

*Objects* are encoded in *pronouns*. (See [section 2 of the README in the `src/Theory/Plain` directory](https://github.com/merivale/victor/tree/master/src/Theory/Plain#2-objects-and-balances) for an account of objects.) Pronouns come in five forms, three *direct* and two *relative*, as follows:

| Object     | Direct 1 | Direct 2 | Direct 3       | Relative 1 | Relative 2 |
| ---------- | -------- | -------- | -------------- | ---------- | ---------- |
| `Speaker`  | `"I"`    | `"me"`   | `"myself"`     | `"my"`     | `"mine"`   |
| `Hearer`   | `"you"`  | `"you"`  | `"yourself"`   | `"your"`   | `"yours"`  |
| `Other`    | `"it"`   | `"is"`   | `"itself"`     | `"its"`    | `"its"`    |
| `Male`     | `"he"`   | `"him"`  | `"himself"`    | `"his"`    | `"his"`    |
| `Female`   | `"she"`  | `"her"`  | `"herself"`    | `"her"`    | `"hers"`   |
| `Speakers` | `"we"`   | `"us"`   | `"ourselves"`  | `"our"`    | `"ours"`   |
| `Hearers`  | `"you"`  | `"you"`  | `"yourselves"` | `"your"`   | `"yours"`  |
| `Others`   | `"they"` | `"them"` | `"themselves"` | `"their"`  | `"theirs"` |

The `Pronouns` module exposes five functions, one for each of these forms.

## 2. Verbs and Modals

*Verbalities* are encoded in *verbs*. Like properties and categories, these are currently unearthed variables in my model, which users are obliged to encode for themselves. The `Verbs` module, however, exposes some functions for generating the various inflectional forms of a verb from its base form. As with nouns, this is done by first looking the verb up in a dictionary of irregularities, and failing that by guessing the appropriate form.

With the exception of the verb **`"be"`**, which I will come to in a moment, the English verbs all come in five forms: a *base* form, two *finite* forms, and two *participle* forms. Thus:

| Base     | Finite 1  | Finite 2   | Participle 1 | Participle 2 |
| -------- | --------- | ---------- | ------------ | ------------ |
| `"do"`   | `"does"`  | `"did"`    | `"doing"`    | `"done"`     |
| `"have"` | `"has"`   | `"had"`    | `"having"`   | `"had"`      |
| `"like"` | `"likes"` | `"liked"`  | `"liking"`   | `"liked"`    |
| `"put"`  | `"puts"`  | `"put"`    | `"putting"`  | `"put"`      |
| `"rest"` | `"rests"` | `"rested"` | `"resting"`  | `"rested"`   |
| `"sing"` | `"sings"` | `"sang"`   | `"singing"`  | `"sung"`     |
| ...      |           |            |              |              |

Note that the second finite form and the second participle form are the same for all regular verbs (and for some otherwise irregular verbs too). Nevertheless it is convenient to draw the distinction in every case, as this makes for a simpler encoding function overall.

The uniquely irregular verb **`"be"`** has a base form and two participle forms like any other verb (`"be"`, `"being"`, `"been"`). Where the other verbs have two finite forms, however, this verb has five: `"am"`, `"is"`, `"are"`, `"was"`, and `"were"`.

*Modalities* are encoded in *modals*. These are somewhat akin to verbs, but have only finite forms (and some of them only one finite form at that):

| Finite 1  | Finite 2   |
| --------- | ---------- |
| `"can"`   | `"could"`  |
| `"dare"`  | -          |
| `"must"`  | -          |
| `"may"`   | `"might"`  |
| `"need"`  | `"need"`   |
| -         | `"ought"`  |
| `"shall"` | `"should"` |
| `"will"`  | `"would"`  |

On semantic grounds, I diagnose `"ought"` as a second finite form, and `"need"` as ambiguous between a first and a second finite form. See [sections 3 and 4 of the README in the `src/Theory/Long` directory](https://github.com/merivale/victor/tree/master/src/Theory/Long#3-secondary-displaced-messages) for details.

Following standard practice, I will also refer to the *present tense* and *past tense* forms of the verbs and modals. In the case of the modals, these correspond directly to the first and second finite forms respectively. In the case of the verb **`"be"`**, the present tense is realised by the first three finite forms (`"am"`, `"is"`, `"are"`), and the past tense is realised by the last two (`"was"`, `"were"`). With all other verbs, the present tense is realised by the base form and the first finite form (e.g. `"do"`, `"does"`; `"have"`, `"has"`), and the past tense corresponds simply to the second finite form (`"did"`, `"had"`, etc.). When the present or past tense can be realised by more than one form, the choice of form is determined by the object, and encodes no additional information.

## 3. Prepositions, Articles, and Determiners

*Relators* are encoded in *prepositions*, *pointers* are encoded in *articles*, and *quantifiers* are encoded in *determiners*. There is very little to say about any of this. For my account of relators, see [section 2 of the README in the `src/Theory/Plain` directory](https://github.com/merivale/victor/tree/master/src/Theory/Plain#2-objects-and-balances); for my account of pointers and quantifiers, see [the README in the `src/Theory/Object` directory](https://github.com/merivale/victor/tree/master/src/Theory/Object).

It may just be noted that my syntactic terminology here is not entirely standard, in that I count the so-called “indefinite article” (`"a"`/`"an"`) as a determiner rather than an article. The articles, for me, are `"the"`, `"this"`, `"that"`, `"these"`, and `"those"`. The determiners are words like `"all"`, `"any"`, `"each"`, `"most"`, `"some"`, and I classify `"a"`/`"an"` alongside these words on semantic grounds.

## 4. Fulcrums, Counters, and Miscellaneous Utilities

In addition to the modules covered above, which contain functions for encoding individual informational choices into words, there are also two modules for encoding some small groups of choices into longer phrases. *Pivots*, which comprise a verbality followed by an optional status, are encoded into *fulcrums*. *Balances*, which consist of an object optionally prefixed with a relator, are encoded into *counters*. For my account of pivots and balances, see [the README in the `src/Theory/Plain` directory](https://github.com/merivale/victor/tree/master/src/Theory/Plain).

There is nothing really to say about the small functions in the `Fulcrums` and `Counters` modules. They are included in this directory simply to avoid some clutter in the main encoding function itself, and so that they can be used in every layer of the theory without code duplication. The same is true of the handful of functions exposed by the `Utils` module.
