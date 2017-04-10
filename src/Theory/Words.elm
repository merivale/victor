module Theory.Words
    exposing
        ( plural
        , present
        , past
        , prior
        , ongoing
        )

{-| Functions for generating the plural form of a noun (given its singular), and
the various forms of verbs (given the base form, e.g. "have", "do", "go").

These functions don't generate the finite forms of "be", because this verb is
uniquely awkward (having two more finite forms than every other verb), and
consequently is best handled as a special case. Also these functions cannot
distinguish different verbs that have the same base form but differ in other
forms - e.g. "hang/hung" vs "hang/hanged", "lie/lied" vs "lie/lay". There's
nothing very satisfactory I can do about this until I start encoding pivots for
myself. In the meantime, using the ordinary base form will default to the
regular verb ("hang/hanged", "lie/lied"). If you want the irregular verb, input
"hang*" or "lie*" into the system; this will trigger a match in the dictionary
of irregularities.
-}

import Dict


{-| The exposed functions. In each case they try to guess the appropriate form,
unless an exception has been written explicitly into one of the two dictionaries
below. These dictionaries contain words that my guessing functions are known to
get wrong, either because they are irregular or because my guessing functions
can't handle the kind of regularity they instantiate.

In case anyone is wondering, the kind of regularity that my guessing functions
cannot handle concerns whether or not to double the consonant at the end of a
verb in its past and ongoing forms, which depends - at least in so far as it is
regular - on where the stress falls.
-}
plural : String -> String
plural noun =
    Maybe.withDefault
        (guessPlural noun)
        (Dict.get noun nouns)


present : String -> String
present base =
    Maybe.withDefault
        (guessPresent base)
        (Maybe.map (\x -> x.present) (Dict.get base verbs))


past : String -> String
past base =
    Maybe.withDefault
        (guessPastPrior base)
        (Maybe.map (\x -> x.past) (Dict.get base verbs))


prior : String -> String
prior base =
    Maybe.withDefault
        (guessPastPrior base)
        (Maybe.map (\x -> x.prior) (Dict.get base verbs))


ongoing : String -> String
ongoing base =
    Maybe.withDefault
        (guessOngoing base)
        (Maybe.map (\x -> x.ongoing) (Dict.get base verbs))


{-| Functions for guessing regular forms.
-}
guessPlural : String -> String
guessPlural singular =
    if consontanty singular then
        (String.dropRight 1 singular) ++ "ies"
    else if List.member (String.right 2 singular) [ "ch", "sh", "ss" ] then
        singular ++ "es"
    else if (String.right 3 singular) == "sis" then
        (String.dropRight 3 singular) ++ "ses"
    else if (String.right 3 singular) == "xis" then
        (String.dropRight 3 singular) ++ "xes"
    else if (String.right 1 singular) == "f" then
        (String.dropRight 1 singular) ++ "ves"
    else if (String.right 2 singular) == "fe" then
        (String.dropRight 2 singular) ++ "fes"
    else if (String.right 1 singular) == "o" then
        (String.dropRight 1 singular) ++ "oes"
    else if (String.right 2 singular) == "ix" then
        (String.dropRight 2 singular) ++ "ices"
    else
        singular ++ "s"


guessPresent : String -> String
guessPresent base =
    if consontanty base then
        (String.dropRight 1 base) ++ "ies"
    else if List.member (String.right 2 base) [ "ch", "sh", "ss" ] then
        base ++ "es"
    else
        base ++ "s"


guessPastPrior : String -> String
guessPastPrior base =
    if String.right 1 base == "e" then
        base ++ "d"
    else if consontanty base then
        (String.dropRight 1 base) ++ "ied"
    else
        base ++ "ed"


guessOngoing : String -> String
guessOngoing base =
    if String.right 2 base == "ee" then
        base ++ "ing"
    else if String.right 2 base == "ie" then
        (String.dropRight 2 base) ++ "ying"
    else if String.right 1 base == "e" then
        (String.dropRight 1 base) ++ "ing"
    else
        base ++ "ing"


{-| Check if a word ends with a consonant followed by "y" - used by a couple of
the guessing functions above.
-}
consontanty : String -> Bool
consontanty base =
    let
        ultimate =
            String.right 1 base

        penultimate =
            String.slice -2 -1 base
    in
        ultimate == "y" && not (List.member penultimate [ "a", "e", "i", "o", "u" ])


{-| A dictionary of nouns that the guessPlural function gets wrong.
-}
nouns : Dict.Dict String String
nouns =
    Dict.fromList
        [ ( "addendum", "addenda" )
        , ( "alga", "algae" )
        , ( "alumna", "alumnae" )
        , ( "alumnus", "alumni" )
        , ( "antenna", "antennae" )
        , ( "bacillus", "bacilli" )
        , ( "bacterium", "bacteria" )
        , ( "beau", "beaux" )
        , ( "bison", "bison" )
        , ( "child", "children" )
        , ( "corps", "corps" )
        , ( "corpus", "corpora" )
        , ( "criterion", "criteria" )
        , ( "curriculum", "curricula" )
        , ( "datum", "data" )
        , ( "deer", "deer" )
        , ( "die", "dice" )
        , ( "erratum", "errata" )
        , ( "fireman", "firemen" )
        , ( "fish", "fish" )
        , ( "foot", "feet" )
        , ( "fungus", "fungi" )
        , ( "genus", "genera" )
        , ( "goose", "geese" )
        , ( "louse", "lice" )
        , ( "man", "men" )
        , ( "means", "means" )
        , ( "medium", "media" )
        , ( "memorandum", "memoranda" )
        , ( "millennium", "milennia" )
        , ( "moose", "moose" )
        , ( "mouse", "mice" )
        , ( "nebula", "nebulae" )
        , ( "nucleus", "nuclei" )
        , ( "ovum", "ova" )
        , ( "ox", "oxen" )
        , ( "person", "people" )
        , ( "phenomenon", "phenomena" )
        , ( "radius", "radii" )
        , ( "series", "series" )
        , ( "sheep", "sheep" )
        , ( "species", "species" )
        , ( "stimulus", "stimuli" )
        , ( "stratum", "strata" )
        , ( "symposium", "symposia" )
        , ( "tableau", "tableaux" )
        , ( "tooth", "teeth" )
        , ( "vertebra", "vertebrae" )
        , ( "vita", "vitae" )
        , ( "woman", "women" )
        ]


{-| A dictionary of verbs that at least one of the guessing functions for verb
forms gets wrong.
-}
verbs : Dict.Dict String { present : String, past : String, prior : String, ongoing : String }
verbs =
    Dict.fromList
        [ ( "abide", { present = "abides", past = "abode", prior = "abode", ongoing = "abiding" } )
        , ( "admit", { present = "admits", past = "admitted", prior = "admitted", ongoing = "admitting" } )
        , ( "arise", { present = "arises", past = "arose", prior = "arisen", ongoing = "arising" } )
        , ( "awake", { present = "awakes", past = "awoke", prior = "awoken", ongoing = "awaking" } )
        , ( "ban", { present = "bans", past = "banned", prior = "banned", ongoing = "banning" } )
        , ( "bat", { present = "bats", past = "batted", prior = "batted", ongoing = "batting" } )
        , ( "be", { present = "is", past = "was", prior = "been", ongoing = "being" } )
        , ( "bear", { present = "bears", past = "bore", prior = "borne", ongoing = "bearing" } )
        , ( "beat", { present = "beats", past = "beat", prior = "beaten", ongoing = "beating" } )
        , ( "become", { present = "becomes", past = "became", prior = "become", ongoing = "becoming" } )
        , ( "befall", { present = "befalls", past = "befell", prior = "befallen", ongoing = "befalling" } )
        , ( "beg", { present = "begs", past = "begged", prior = "begged", ongoing = "begging" } )
        , ( "begin", { present = "begins", past = "began", prior = "begun", ongoing = "beginning" } )
        , ( "behold", { present = "beholds", past = "beheld", prior = "beheld", ongoing = "beholding" } )
        , ( "bend", { present = "bends", past = "bent", prior = "bent", ongoing = "bending" } )
        , ( "bereave", { present = "bereaves", past = "bereft", prior = "bereft", ongoing = "bereaving" } )
        , ( "beseech", { present = "beseeches", past = "besought", prior = "besought", ongoing = "beseeching" } )
        , ( "bet", { present = "bets", past = "bet", prior = "bet", ongoing = "betting" } )
        , ( "bid", { present = "bids", past = "bid", prior = "bid", ongoing = "bidding" } )
        , ( "bind", { present = "binds", past = "bound", prior = "bound", ongoing = "binding" } )
        , ( "bite", { present = "bites", past = "bit", prior = "bitten", ongoing = "biting" } )
        , ( "bleed", { present = "bleeds", past = "bled", prior = "bled", ongoing = "bleeding" } )
        , ( "blot", { present = "blots", past = "blotted", prior = "blotted", ongoing = "blotting" } )
        , ( "blow", { present = "blows", past = "blew", prior = "blown", ongoing = "blowing" } )
        , ( "blur", { present = "blurs", past = "blurred", prior = "blurred", ongoing = "blurring" } )
        , ( "break", { present = "breaks", past = "broke", prior = "broken", ongoing = "breaking" } )
        , ( "breed", { present = "breeds", past = "bred", prior = "bred", ongoing = "breeding" } )
        , ( "bring", { present = "brings", past = "brought", prior = "brought", ongoing = "bringing" } )
        , ( "broadcast", { present = "broadcasts", past = "broadcast", prior = "broadcast", ongoing = "broadcasting" } )
        , ( "build", { present = "builds", past = "built", prior = "built", ongoing = "building" } )
        , ( "burn", { present = "burns", past = "burnt", prior = "burnt", ongoing = "burning" } )
        , ( "burst", { present = "bursts", past = "burst", prior = "burst", ongoing = "bursting" } )
        , ( "bust", { present = "busts", past = "bust", prior = "bust", ongoing = "busting" } )
        , ( "buy", { present = "buys", past = "bought", prior = "bought", ongoing = "buying" } )
        , ( "cast", { present = "casts", past = "cast", prior = "cast", ongoing = "casting" } )
        , ( "catch", { present = "catches", past = "caught", prior = "caught", ongoing = "catching" } )
        , ( "chat", { present = "chats", past = "chatted", prior = "chatted", ongoing = "chatting" } )
        , ( "chide", { present = "chides", past = "chid", prior = "chidden", ongoing = "chiding" } )
        , ( "chip", { present = "chips", past = "chipped", prior = "chipped", ongoing = "chipping" } )
        , ( "choose", { present = "chooses", past = "chose", prior = "chosen", ongoing = "choosing" } )
        , ( "chop", { present = "chops", past = "chopped", prior = "chopped", ongoing = "chopping" } )
        , ( "clap", { present = "claps", past = "clapped", prior = "clapped", ongoing = "clapping" } )
        , ( "cleave", { present = "cleaves", past = "clove", prior = "cloven", ongoing = "cleaving" } )
        , ( "cling", { present = "clings", past = "clung", prior = "clung", ongoing = "clinging" } )
        , ( "clip", { present = "clips", past = "clipped", prior = "clipped", ongoing = "clipping" } )
        , ( "come", { present = "comes", past = "came", prior = "come", ongoing = "coming" } )
        , ( "compel", { present = "compels", past = "compelled", prior = "compelled", ongoing = "compelling" } )
        , ( "control", { present = "controls", past = "controlled", prior = "controlled", ongoing = "controlling" } )
        , ( "cost", { present = "costs", past = "cost", prior = "cost", ongoing = "costing" } )
        , ( "counsel", { present = "counsels", past = "counselled", prior = "counselled", ongoing = "counselling" } )
        , ( "creep", { present = "creeps", past = "crept", prior = "crept", ongoing = "creeping" } )
        , ( "crib", { present = "cribs", past = "cribbed", prior = "cribbed", ongoing = "cribbing" } )
        , ( "cut", { present = "cuts", past = "cut", prior = "cut", ongoing = "cutting" } )
        , ( "dam", { present = "dams", past = "dammed", prior = "dammed", ongoing = "damming" } )
        , ( "deal", { present = "deals", past = "dealt", prior = "dealt", ongoing = "dealing" } )
        , ( "dig", { present = "digs", past = "dug", prior = "dug", ongoing = "digging" } )
        , ( "dim", { present = "dims", past = "dimmed", prior = "dimmed", ongoing = "dimming" } )
        , ( "dip", { present = "dips", past = "dipped", prior = "dipped", ongoing = "dipping" } )
        , ( "do", { present = "does", past = "did", prior = "done", ongoing = "doing" } )
        , ( "drag", { present = "drags", past = "dragged", prior = "dragged", ongoing = "dragging" } )
        , ( "draw", { present = "draws", past = "drew", prior = "drawn", ongoing = "drawing" } )
        , ( "dream", { present = "dreams", past = "dreamt", prior = "dreamt", ongoing = "dreaming" } )
        , ( "drink", { present = "drinks", past = "drank", prior = "drunk", ongoing = "drinking" } )
        , ( "drip", { present = "drips", past = "dripped", prior = "dripped", ongoing = "dripping" } )
        , ( "drive", { present = "drives", past = "drove", prior = "driven", ongoing = "driving" } )
        , ( "drop", { present = "drops", past = "dropped", prior = "dropped", ongoing = "dropping" } )
        , ( "drum", { present = "drums", past = "drummed", prior = "drummed", ongoing = "drumming" } )
        , ( "dwell", { present = "dwells", past = "dwelt", prior = "dwelt", ongoing = "dwelling" } )
        , ( "dye", { present = "dyes", past = "dyed", prior = "dyed", ongoing = "dyeing" } )
        , ( "eat", { present = "eats", past = "ate", prior = "eaten", ongoing = "eating" } )
        , ( "fall", { present = "falls", past = "fell", prior = "fallen", ongoing = "falling" } )
        , ( "fan", { present = "fans", past = "fanned", prior = "fanned", ongoing = "fanning" } )
        , ( "feed", { present = "feeds", past = "fed", prior = "fed", ongoing = "feeding" } )
        , ( "feel", { present = "feels", past = "felt", prior = "felt", ongoing = "feeling" } )
        , ( "fight", { present = "fights", past = "fought", prior = "fought", ongoing = "fighting" } )
        , ( "find", { present = "finds", past = "found", prior = "found", ongoing = "finding" } )
        , ( "fit", { present = "fits", past = "fitted", prior = "fitted", ongoing = "fitting" } )
        , ( "flap", { present = "flaps", past = "flapped", prior = "flapped", ongoing = "flapping" } )
        , ( "flee", { present = "flees", past = "fled", prior = "fled", ongoing = "fleeing" } )
        , ( "fling", { present = "flings", past = "flung", prior = "flung", ongoing = "flinging" } )
        , ( "flop", { present = "flops", past = "flopped", prior = "flopped", ongoing = "flopping" } )
        , ( "fly", { present = "flies", past = "flew", prior = "flown", ongoing = "flying" } )
        , ( "forbid", { present = "forbids", past = "forbade", prior = "forbidden", ongoing = "forbidding" } )
        , ( "forecast", { present = "forecasts", past = "forecast", prior = "forecast", ongoing = "forecasting" } )
        , ( "foretell", { present = "foretells", past = "foretold", prior = "foretold", ongoing = "foretelling" } )
        , ( "forget", { present = "forgets", past = "forgot", prior = "forgotten", ongoing = "forgetting" } )
        , ( "forgive", { present = "forgives", past = "forgave", prior = "forgiven", ongoing = "forgiving" } )
        , ( "forsake", { present = "forsakes", past = "forsook", prior = "forsaken", ongoing = "forsaking" } )
        , ( "freeze", { present = "freezes", past = "froze", prior = "frozen", ongoing = "freezing" } )
        , ( "fulfil", { present = "fulfils", past = "fulfilled", prior = "fulfilled", ongoing = "fulfilling" } )
        , ( "gag", { present = "gags", past = "gagged", prior = "gagged", ongoing = "gagging" } )
        , ( "gainsay", { present = "gainsays", past = "gainsaid", prior = "gainsaid", ongoing = "gainsaying" } )
        , ( "get", { present = "gets", past = "got", prior = "got", ongoing = "getting" } )
        , ( "give", { present = "gives", past = "gave", prior = "given", ongoing = "giving" } )
        , ( "go", { present = "goes", past = "went", prior = "gone", ongoing = "going" } )
        , ( "grab", { present = "grabs", past = "grabbed", prior = "grabbed", ongoing = "grabbing" } )
        , ( "grin", { present = "grins", past = "grinned", prior = "grinned", ongoing = "grinning" } )
        , ( "grind", { present = "grinds", past = "ground", prior = "ground", ongoing = "grinding" } )
        , ( "grip", { present = "grips", past = "gripped", prior = "gripped", ongoing = "gripping" } )
        , ( "grow", { present = "grows", past = "grew", prior = "grown", ongoing = "growing" } )
        , ( "hang*", { present = "hangs", past = "hung", prior = "hung", ongoing = "hanging" } )
        , ( "have", { present = "has", past = "had", prior = "had", ongoing = "having" } )
        , ( "hear", { present = "hears", past = "heard", prior = "heard", ongoing = "hearing" } )
        , ( "hew", { present = "hews", past = "hewed", prior = "hewn", ongoing = "hewing" } )
        , ( "hide", { present = "hides", past = "hid", prior = "hidden", ongoing = "hiding" } )
        , ( "hit", { present = "hits", past = "hit", prior = "hit", ongoing = "hitting" } )
        , ( "hold", { present = "holds", past = "held", prior = "held", ongoing = "holding" } )
        , ( "hop", { present = "hops", past = "hopped", prior = "hopped", ongoing = "hopping" } )
        , ( "hug", { present = "hugs", past = "hugged", prior = "hugged", ongoing = "hugging" } )
        , ( "hum", { present = "hums", past = "hummed", prior = "hummed", ongoing = "humming" } )
        , ( "hurt", { present = "hurts", past = "hurt", prior = "hurt", ongoing = "hurting" } )
        , ( "impel", { present = "impels", past = "impelled", prior = "impelled", ongoing = "impelling" } )
        , ( "imperil", { present = "imperils", past = "imperilled", prior = "imperilled", ongoing = "imperilling" } )
        , ( "inlay", { present = "inlays", past = "inlaid", prior = "inlaid", ongoing = "inlaying" } )
        , ( "input", { present = "inputs", past = "input", prior = "input", ongoing = "inputting" } )
        , ( "jam", { present = "jams", past = "jammed", prior = "jammed", ongoing = "jamming" } )
        , ( "jog", { present = "jogs", past = "jogged", prior = "jogged", ongoing = "jogging" } )
        , ( "keep", { present = "keeps", past = "kept", prior = "kept", ongoing = "keeping" } )
        , ( "kid", { present = "kids", past = "kidded", prior = "kidded", ongoing = "kidding" } )
        , ( "kneel", { present = "kneels", past = "knelt", prior = "knelt", ongoing = "kneeling" } )
        , ( "knit", { present = "knits", past = "knitted", prior = "knitted", ongoing = "knitting" } )
        , ( "knot", { present = "knots", past = "knotted", prior = "knotted", ongoing = "knotting" } )
        , ( "know", { present = "knows", past = "knew", prior = "known", ongoing = "knowing" } )
        , ( "label", { present = "labels", past = "labelled", prior = "labelled", ongoing = "labelling" } )
        , ( "lay", { present = "lays", past = "laid", prior = "laid", ongoing = "laying" } )
        , ( "lead", { present = "leads", past = "led", prior = "led", ongoing = "leading" } )
        , ( "lean", { present = "leans", past = "leant", prior = "leant", ongoing = "leaning" } )
        , ( "leap", { present = "leaps", past = "leapt", prior = "leapt", ongoing = "leaping" } )
        , ( "learn", { present = "learns", past = "learnt", prior = "learnt", ongoing = "learning" } )
        , ( "leave", { present = "leaves", past = "left", prior = "left", ongoing = "leaving" } )
        , ( "lend", { present = "lends", past = "lent", prior = "lent", ongoing = "lending" } )
        , ( "let", { present = "lets", past = "let", prior = "let", ongoing = "letting" } )
        , ( "level", { present = "levels", past = "levelled", prior = "levelled", ongoing = "levelling" } )
        , ( "lie*", { present = "lies", past = "lay", prior = "lain", ongoing = "lying" } )
        , ( "light", { present = "lights", past = "lit", prior = "lit", ongoing = "lighting" } )
        , ( "lose", { present = "loses", past = "lost", prior = "lost", ongoing = "losing" } )
        , ( "make", { present = "makes", past = "made", prior = "made", ongoing = "making" } )
        , ( "man", { present = "mans", past = "manned", prior = "manned", ongoing = "manning" } )
        , ( "mean", { present = "means", past = "meant", prior = "meant", ongoing = "meaning" } )
        , ( "meet", { present = "meets", past = "met", prior = "met", ongoing = "meeting" } )
        , ( "mislead", { present = "misleads", past = "misled", prior = "misled", ongoing = "misleading" } )
        , ( "mistake", { present = "mistakes", past = "mistook", prior = "mistaken", ongoing = "mistaking" } )
        , ( "mow", { present = "mows", past = "mowed", prior = "mown", ongoing = "mowing" } )
        , ( "mug", { present = "mugs", past = "mugged", prior = "mugged", ongoing = "mugging" } )
        , ( "nap", { present = "naps", past = "napped", prior = "napped", ongoing = "napping" } )
        , ( "nip", { present = "nips", past = "nipped", prior = "nipped", ongoing = "nipping" } )
        , ( "nod", { present = "nods", past = "nodded", prior = "nodded", ongoing = "nodding" } )
        , ( "occur", { present = "occurs", past = "occurred", prior = "occurred", ongoing = "occurring" } )
        , ( "offset", { present = "offsets", past = "offset", prior = "offset", ongoing = "offsetting" } )
        , ( "omit", { present = "omits", past = "omitted", prior = "omitted", ongoing = "omitting" } )
        , ( "output", { present = "outputs", past = "output", prior = "output", ongoing = "outputting" } )
        , ( "overtake", { present = "overtakes", past = "overtook", prior = "overtaken", ongoing = "overtaking" } )
        , ( "partake", { present = "partakes", past = "partook", prior = "partaken", ongoing = "partaking" } )
        , ( "pat", { present = "pats", past = "patted", prior = "patted", ongoing = "patting" } )
        , ( "pay", { present = "pays", past = "paid", prior = "paid", ongoing = "paying" } )
        , ( "pedal", { present = "pedals", past = "pedalled", prior = "pedalled", ongoing = "pedalling" } )
        , ( "permit", { present = "permits", past = "permitted", prior = "permitted", ongoing = "permitting" } )
        , ( "picnic", { present = "picnics", past = "picnicked", prior = "picnicked", ongoing = "picnicking" } )
        , ( "plan", { present = "plans", past = "planned", prior = "planned", ongoing = "planning" } )
        , ( "plead", { present = "pleads", past = "pled", prior = "pled", ongoing = "pleading" } )
        , ( "plod", { present = "plods", past = "plodded", prior = "plodded", ongoing = "plodding" } )
        , ( "plot", { present = "plots", past = "plotted", prior = "plotted", ongoing = "plotting" } )
        , ( "plug", { present = "plugs", past = "plugged", prior = "plugged", ongoing = "plugging" } )
        , ( "pop", { present = "pops", past = "popped", prior = "popped", ongoing = "popping" } )
        , ( "prefer", { present = "prefers", past = "preferred", prior = "preferred", ongoing = "preferring" } )
        , ( "preset", { present = "presets", past = "preset", prior = "preset", ongoing = "presetting" } )
        , ( "program", { present = "programs", past = "programmed", prior = "programmed", ongoing = "programming" } )
        , ( "put", { present = "puts", past = "put", prior = "put", ongoing = "putting" } )
        , ( "quarrel", { present = "quarrels", past = "quarrelled", prior = "quarrelled", ongoing = "quarrelling" } )
        , ( "quit", { present = "quits", past = "quit", prior = "quit", ongoing = "quitting" } )
        , ( "read", { present = "reads", past = "read", prior = "read", ongoing = "reading" } )
        , ( "rebuild", { present = "rebuilds", past = "rebuilt", prior = "rebuilt", ongoing = "rebuilding" } )
        , ( "recur", { present = "recurs", past = "recurred", prior = "recurred", ongoing = "recurring" } )
        , ( "redo", { present = "redoes", past = "redid", prior = "redone", ongoing = "redoing" } )
        , ( "refer", { present = "refers", past = "referred", prior = "referred", ongoing = "referring" } )
        , ( "regret", { present = "regrets", past = "regretted", prior = "regretted", ongoing = "regretting" } )
        , ( "remake", { present = "remakes", past = "remade", prior = "remade", ongoing = "remaking" } )
        , ( "rend", { present = "rends", past = "rent", prior = "rent", ongoing = "rending" } )
        , ( "resell", { present = "resells", past = "resold", prior = "resold", ongoing = "reselling" } )
        , ( "reset", { present = "resets", past = "reset", prior = "reset", ongoing = "resetting" } )
        , ( "rewind", { present = "rewinds", past = "rewound", prior = "rewound", ongoing = "rewinding" } )
        , ( "rid", { present = "rids", past = "rid", prior = "rid", ongoing = "ridding" } )
        , ( "ride", { present = "rides", past = "rode", prior = "ridden", ongoing = "riding" } )
        , ( "ring", { present = "rings", past = "rang", prior = "rung", ongoing = "ringing" } )
        , ( "rise", { present = "rises", past = "rose", prior = "risen", ongoing = "rising" } )
        , ( "rob", { present = "robs", past = "robbed", prior = "robbed", ongoing = "robbing" } )
        , ( "rot", { present = "rots", past = "rotted", prior = "rotted", ongoing = "rotting" } )
        , ( "rub", { present = "rubs", past = "rubbed", prior = "rubbed", ongoing = "rubbing" } )
        , ( "run", { present = "runs", past = "ran", prior = "run", ongoing = "running" } )
        , ( "sag", { present = "sags", past = "sagged", prior = "sagged", ongoing = "sagging" } )
        , ( "sap", { present = "saps", past = "sapped", prior = "sapped", ongoing = "sapping" } )
        , ( "saw", { present = "saws", past = "sawed", prior = "sawn", ongoing = "sawing" } )
        , ( "say", { present = "says", past = "said", prior = "said", ongoing = "saying" } )
        , ( "scam", { present = "scams", past = "scammed", prior = "scammed", ongoing = "scamming" } )
        , ( "scan", { present = "scans", past = "scanned", prior = "scanned", ongoing = "scanning" } )
        , ( "scar", { present = "scars", past = "scarred", prior = "scarred", ongoing = "scarring" } )
        , ( "scrub", { present = "scrubs", past = "scrubbed", prior = "scrubbed", ongoing = "scrubbing" } )
        , ( "see", { present = "sees", past = "saw", prior = "seen", ongoing = "seeing" } )
        , ( "seek", { present = "seeks", past = "sought", prior = "sought", ongoing = "seeking" } )
        , ( "sell", { present = "sells", past = "sold", prior = "sold", ongoing = "selling" } )
        , ( "send", { present = "sends", past = "sent", prior = "sent", ongoing = "sending" } )
        , ( "set", { present = "sets", past = "set", prior = "set", ongoing = "setting" } )
        , ( "sew", { present = "sews", past = "sewed", prior = "sewn", ongoing = "sewing" } )
        , ( "shake", { present = "shakes", past = "shook", prior = "shaken", ongoing = "shaking" } )
        , ( "shear", { present = "shears", past = "shore", prior = "shorn", ongoing = "shearing" } )
        , ( "shed", { present = "sheds", past = "shed", prior = "shed", ongoing = "shedding" } )
        , ( "shine", { present = "shines", past = "shone", prior = "shone", ongoing = "shining" } )
        , ( "shit", { present = "shits", past = "shit", prior = "shit", ongoing = "shitting" } )
        , ( "shoot", { present = "shoots", past = "shot", prior = "shot", ongoing = "shooting" } )
        , ( "shop", { present = "shops", past = "shopped", prior = "shopped", ongoing = "shopping" } )
        , ( "show", { present = "shows", past = "showed", prior = "shown", ongoing = "showing" } )
        , ( "shrink", { present = "shrinks", past = "shrank", prior = "shrunk", ongoing = "shrinking" } )
        , ( "shrug", { present = "shrugs", past = "shrugged", prior = "shrugged", ongoing = "shrugging" } )
        , ( "shun", { present = "shuns", past = "shunned", prior = "shunned", ongoing = "shunning" } )
        , ( "shut", { present = "shuts", past = "shut", prior = "shut", ongoing = "shutting" } )
        , ( "signal", { present = "signals", past = "signalled", prior = "signalled", ongoing = "signalling" } )
        , ( "sin", { present = "sins", past = "sinned", prior = "sinned", ongoing = "sinning" } )
        , ( "sing", { present = "sings", past = "sang", prior = "sung", ongoing = "singing" } )
        , ( "singe", { present = "singes", past = "singed", prior = "singed", ongoing = "singeing" } )
        , ( "sink", { present = "sinks", past = "sank", prior = "sunk", ongoing = "sinking" } )
        , ( "sip", { present = "sips", past = "sipped", prior = "sipped", ongoing = "sipping" } )
        , ( "sit", { present = "sits", past = "sat", prior = "sat", ongoing = "sitting" } )
        , ( "skid", { present = "skids", past = "skidded", prior = "skidded", ongoing = "skidding" } )
        , ( "skip", { present = "skips", past = "skipped", prior = "skipped", ongoing = "skipping" } )
        , ( "slam", { present = "slams", past = "slammed", prior = "slammed", ongoing = "slamming" } )
        , ( "slap", { present = "slaps", past = "slapped", prior = "slapped", ongoing = "slapping" } )
        , ( "slay", { present = "slays", past = "slew", prior = "slain", ongoing = "slaying" } )
        , ( "sleep", { present = "sleeps", past = "slept", prior = "slept", ongoing = "sleeping" } )
        , ( "slide", { present = "slides", past = "slid", prior = "slid", ongoing = "sliding" } )
        , ( "slim", { present = "slims", past = "slimmed", prior = "slimmed", ongoing = "slimming" } )
        , ( "sling", { present = "slings", past = "slung", prior = "slung", ongoing = "slinging" } )
        , ( "slink", { present = "slinks", past = "slunk", prior = "slunk", ongoing = "slinking" } )
        , ( "slip", { present = "slips", past = "slipped", prior = "slipped", ongoing = "slipping" } )
        , ( "slit", { present = "slits", past = "slit", prior = "slit", ongoing = "slitting" } )
        , ( "smell", { present = "smells", past = "smelt", prior = "smelt", ongoing = "smelling" } )
        , ( "smite", { present = "smites", past = "smote", prior = "smitten", ongoing = "smiting" } )
        , ( "snap", { present = "snaps", past = "snapped", prior = "snapped", ongoing = "snapping" } )
        , ( "sneak", { present = "sneaks", past = "snuck", prior = "snuck", ongoing = "sneaking" } )
        , ( "sob", { present = "sobs", past = "sobbed", prior = "sobbed", ongoing = "sobbing" } )
        , ( "speak", { present = "speaks", past = "spoke", prior = "spoken", ongoing = "speaking" } )
        , ( "speed", { present = "speeds", past = "sped", prior = "sped", ongoing = "speeding" } )
        , ( "spell", { present = "spells", past = "spelt", prior = "spelt", ongoing = "spelling" } )
        , ( "spend", { present = "spends", past = "spent", prior = "spent", ongoing = "spending" } )
        , ( "spill", { present = "spills", past = "spilt", prior = "spilt", ongoing = "spilling" } )
        , ( "spin", { present = "spins", past = "span", prior = "spun", ongoing = "spinning" } )
        , ( "spit", { present = "spits", past = "spat", prior = "spat", ongoing = "spitting" } )
        , ( "split", { present = "splits", past = "split", prior = "split", ongoing = "splitting" } )
        , ( "spoil", { present = "spoils", past = "spoilt", prior = "spoilt", ongoing = "spoiling" } )
        , ( "spot", { present = "spots", past = "spotted", prior = "spotted", ongoing = "spotting" } )
        , ( "spread", { present = "spreads", past = "spread", prior = "spread", ongoing = "spreading" } )
        , ( "spring", { present = "springs", past = "sprang", prior = "sprung", ongoing = "springing" } )
        , ( "stand", { present = "stands", past = "stood", prior = "stood", ongoing = "standing" } )
        , ( "steal", { present = "steals", past = "stole", prior = "stolen", ongoing = "stealing" } )
        , ( "stem", { present = "stems", past = "stemmed", prior = "stemmed", ongoing = "stemming" } )
        , ( "step", { present = "steps", past = "stepped", prior = "stepped", ongoing = "stepping" } )
        , ( "stick", { present = "sticks", past = "stuck", prior = "stuck", ongoing = "sticking" } )
        , ( "sting", { present = "stings", past = "stung", prior = "stung", ongoing = "stinging" } )
        , ( "stink", { present = "stinks", past = "stank", prior = "stunk", ongoing = "stinking" } )
        , ( "stir", { present = "stirs", past = "stirred", prior = "stirred", ongoing = "stirring" } )
        , ( "stop", { present = "stops", past = "stopped", prior = "stopped", ongoing = "stopping" } )
        , ( "strap", { present = "straps", past = "strapped", prior = "strapped", ongoing = "strapping" } )
        , ( "strew", { present = "strews", past = "strewed", prior = "strewn", ongoing = "strewing" } )
        , ( "stride", { present = "strides", past = "strode", prior = "stridden", ongoing = "striding" } )
        , ( "strike", { present = "strikes", past = "struck", prior = "stricken", ongoing = "striking" } )
        , ( "string", { present = "strings", past = "strung", prior = "strung", ongoing = "stringing" } )
        , ( "strip", { present = "strips", past = "stripped", prior = "stripped", ongoing = "stripping" } )
        , ( "strive", { present = "strives", past = "strove", prior = "striven", ongoing = "striving" } )
        , ( "submit", { present = "submits", past = "submitted", prior = "submitted", ongoing = "submitting" } )
        , ( "swear", { present = "swears", past = "swore", prior = "sworn", ongoing = "swearing" } )
        , ( "sweat", { present = "sweats", past = "sweat", prior = "sweat", ongoing = "sweating" } )
        , ( "sweep", { present = "sweeps", past = "swept", prior = "swept", ongoing = "sweeping" } )
        , ( "swell", { present = "swells", past = "swelled", prior = "swollen", ongoing = "swelling" } )
        , ( "swim", { present = "swims", past = "swam", prior = "swum", ongoing = "swimming" } )
        , ( "swing", { present = "swings", past = "swung", prior = "swung", ongoing = "swinging" } )
        , ( "swot", { present = "swots", past = "swotted", prior = "swotted", ongoing = "swotting" } )
        , ( "take", { present = "takes", past = "took", prior = "taken", ongoing = "taking" } )
        , ( "tap", { present = "taps", past = "tapped", prior = "tapped", ongoing = "tapping" } )
        , ( "teach", { present = "teaches", past = "taught", prior = "taught", ongoing = "teaching" } )
        , ( "tear", { present = "tears", past = "tore", prior = "torn", ongoing = "tearing" } )
        , ( "tell", { present = "tells", past = "told", prior = "told", ongoing = "telling" } )
        , ( "think", { present = "thinks", past = "thought", prior = "thought", ongoing = "thinking" } )
        , ( "throw", { present = "throws", past = "threw", prior = "thrown", ongoing = "throwing" } )
        , ( "thrust", { present = "thrusts", past = "thrust", prior = "thrust", ongoing = "thrusting" } )
        , ( "tip", { present = "tips", past = "tipped", prior = "tipped", ongoing = "tipping" } )
        , ( "transfer", { present = "transfers", past = "transferred", prior = "transferred", ongoing = "transferring" } )
        , ( "trap", { present = "traps", past = "trapped", prior = "trapped", ongoing = "trapping" } )
        , ( "travel", { present = "travels", past = "travelled", prior = "travelled", ongoing = "travelling" } )
        , ( "tread", { present = "treads", past = "trod", prior = "trodden", ongoing = "treading" } )
        , ( "trip", { present = "trips", past = "tripped", prior = "tripped", ongoing = "tripping" } )
        , ( "trot", { present = "trots", past = "trotted", prior = "trotted", ongoing = "trotting" } )
        , ( "tug", { present = "tugs", past = "tugged", prior = "tugged", ongoing = "tugging" } )
        , ( "typeset", { present = "typesets", past = "typeset", prior = "typeset", ongoing = "typesetting" } )
        , ( "understand", { present = "understands", past = "understood", prior = "understood", ongoing = "understanding" } )
        , ( "undo", { present = "undoes", past = "undid", prior = "undone", ongoing = "undoing" } )
        , ( "upset", { present = "upsets", past = "upset", prior = "upset", ongoing = "upsetting" } )
        , ( "wake", { present = "wakes", past = "woke", prior = "woken", ongoing = "waking" } )
        , ( "waylay", { present = "waylays", past = "waylaid", prior = "waylaid", ongoing = "waylaying" } )
        , ( "wear", { present = "wears", past = "wore", prior = "worn", ongoing = "wearing" } )
        , ( "weave", { present = "weaves", past = "wove", prior = "woven", ongoing = "weaving" } )
        , ( "wed", { present = "weds", past = "wed", prior = "wed", ongoing = "wedding" } )
        , ( "weep", { present = "weeps", past = "wept", prior = "wept", ongoing = "weeping" } )
        , ( "wend", { present = "wends", past = "went", prior = "went", ongoing = "wending" } )
        , ( "wet", { present = "wets", past = "wet", prior = "wet", ongoing = "wetting" } )
        , ( "whip", { present = "whips", past = "whipped", prior = "whipped", ongoing = "whipping" } )
        , ( "win", { present = "wins", past = "won", prior = "won", ongoing = "winning" } )
        , ( "wind", { present = "winds", past = "wound", prior = "wound", ongoing = "winding" } )
        , ( "withdraw", { present = "withdraws", past = "withdrew", prior = "withdrawn", ongoing = "withdrawing" } )
        , ( "worship", { present = "worships", past = "worshipped", prior = "worshipped", ongoing = "worshipping" } )
        , ( "wrap", { present = "wraps", past = "wrapped", prior = "wrapped", ongoing = "wrapping" } )
        , ( "wring", { present = "wrings", past = "wrung", prior = "wrung", ongoing = "wringing" } )
        , ( "write", { present = "writes", past = "wrote", prior = "written", ongoing = "writing" } )
        ]
