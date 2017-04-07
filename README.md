# Victor

A partial model the English language, thought of as a code for processing `messages` (structured arrangements of informational and stylistic choices) into `sentences` (strings of words). Inspired by the work of logician and grammarian Victor Howard Dudman.

The algorithm is written in [Elm](http://elm-lang.org/). The compiled code is stored in the `docs` folder, for easy integration with [GitHub Pages](https://pages.github.com/); thus you can play around with the current version at [https://merivale.github.io/victor/](https://merivale.github.io/victor/).

## 1. Overview

The overarching hypothesis behind this model is that every atomic English message is made up out of a series of zero or more `elaborations` applied to a core `nucleus`. The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.

A major selling point of the model, and more generally of the idea to treat natural languages as codes in this way, is that it enables us to explain the widespread phenomenon of ambiguity in semantic terms (contrary to current mainstream thought in philosophical semantics, which treats it as either a syntactic or a pragmatic phenomenon). The explanation of ambiguity in general is that the encoding function is not one-to-one, but many-to-one. Furthermore, by articulating the English function, we can see precisely how and why various English ambiguities arise. In some cases it is simply because an elaboration leaves no mark on the output sentence, but more often it is because multiple elaborations (or multiple sequences of elaborations) happen to coincide in the same output. Examples will be given in section 3 below.

## 2. The Nucleus

The nucleus of an atomic English message is made up of just two or three items: an `object`, a `pivot`, and (optionally) a `balance`. The `object` is whatever the message is about, and may take any one of the following values:

    type Object
        = Speaker
        | Hearer
        | Male (Maybe String)
        | Female (Maybe String)
        | Thing (Maybe String)
        | Speakers
        | Hearers
        | PeopleOrThings (Maybe String)

The optional string argument in four of these cases is intended to house a proper name; otherwise English defaults to the appropriate pronoun ("he", "she", "it", "they"). In the other cases only the pronoun is available ("I", "you", "we").

The `pivot` and optional `balance` together make up the `condition` that is predicated of this `object`. My model does not yet handle these `conditions` with any great precision. Users are obliged to encode the `pivot` for themselves (into a verb), and will often need to encode the `balance` for themselves as well. The exceptions to the latter rule are when the `balance` is another `object`, either identical to the main `object` (as in, "He likes himself"), or distinct (as in, "He likes her"). Thus:

    type Balance
        = SameObject
        | DifferentObject Object
        | CustomBalance String

A plain, unelaborated English message affirms the present satisfaction of the `condition` by the `object`. More elaborate messages may alter any of these three things, by (1) replacing the present for some other point or region of time, (2) modifying the `condition`, or (3) modifying or overriding the `object`.

## 3. The Elaborations

There are currently 17 elaborations posited by my model. This list is obviously incomplete, but represents - or so I hope - a decent start. Details on what these various elaborations do will be added to this document soon.

### 3.1. Negative

[Details coming soon.]

### 3.2. Past and Prior

[Details coming soon.]

### 3.3. Practical, Projective, and Evasive

[Details coming soon.]

### 3.4. Preordained and Regular

[Details coming soon.]

### 3.5. Extended and Scattered

[Details coming soon.]

### 3.6. Ongoing, Determined, Imminent, and Apparent

[Details coming soon.]

### 3.7. Indirect, Enumerated, and Amassed

[Details coming soon.]
