module Theory.Words.Verbs
    exposing
        ( conjugate
        , participle1
        , participle2
        )

import Dict
import Maybe
import Theory.Plain.Nucleus as Nucleus
import Theory.Words.Utils as Utils


conjugate : Nucleus.Object -> Bool -> String -> String
conjugate object past base =
    if past && base == "be" then
        if (Nucleus.isSpeaker object || Nucleus.isOther object) && not (Nucleus.isPlural object) then
            "was"
        else
            "were"
    else if base == "be" then
        if (Nucleus.isSpeaker object) && not (Nucleus.isPlural object) then
            "am"
        else if (Nucleus.isOther object) && not (Nucleus.isPlural object) then
            "is"
        else
            "are"
    else if past then
        finite2 base
    else if (Nucleus.isOther object) && not (Nucleus.isPlural object) then
        finite1 base
    else
        base


finite1 : String -> String
finite1 base =
    Maybe.withDefault
        (guessFinite1 base)
        (Maybe.map (\x -> x.f1) (Dict.get base verbs))


finite2 : String -> String
finite2 base =
    Maybe.withDefault
        (guessFinite2 base)
        (Maybe.map (\x -> x.f2) (Dict.get base verbs))


participle1 : String -> String
participle1 base =
    Maybe.withDefault
        (guessParticiple1 base)
        (Maybe.map (\x -> x.p1) (Dict.get base verbs))


participle2 : String -> String
participle2 base =
    Maybe.withDefault
        (guessFinite2 base)
        (Maybe.map (\x -> x.p2) (Dict.get base verbs))


guessFinite1 : String -> String
guessFinite1 base =
    if Utils.consontanty base then
        (String.dropRight 1 base) ++ "ies"
    else if List.member (String.right 2 base) [ "ch", "sh", "ss" ] then
        base ++ "es"
    else
        base ++ "s"


guessFinite2 : String -> String
guessFinite2 base =
    if String.right 1 base == "e" then
        base ++ "d"
    else if Utils.consontanty base then
        (String.dropRight 1 base) ++ "ied"
    else
        base ++ "ed"


guessParticiple1 : String -> String
guessParticiple1 base =
    if String.right 2 base == "ee" then
        base ++ "ing"
    else if String.right 2 base == "ie" then
        (String.dropRight 2 base) ++ "ying"
    else if String.right 1 base == "e" then
        (String.dropRight 1 base) ++ "ing"
    else
        base ++ "ing"


verbs : Dict.Dict String { f1 : String, f2 : String, p1 : String, p2 : String }
verbs =
    Dict.fromList
        [ ( "abide", { f1 = "abides", f2 = "abode", p1 = "abiding", p2 = "abode" } )
        , ( "admit", { f1 = "admits", f2 = "admitted", p1 = "admitting", p2 = "admitted" } )
        , ( "arise", { f1 = "arises", f2 = "arose", p1 = "arising", p2 = "arisen" } )
        , ( "awake", { f1 = "awakes", f2 = "awoke", p1 = "awaking", p2 = "awoken" } )
        , ( "ban", { f1 = "bans", f2 = "banned", p1 = "banning", p2 = "banned" } )
        , ( "bat", { f1 = "bats", f2 = "batted", p1 = "batting", p2 = "batted" } )
        , ( "be", { f1 = "is", f2 = "was", p1 = "being", p2 = "been" } )
        , ( "bear", { f1 = "bears", f2 = "bore", p1 = "bearing", p2 = "borne" } )
        , ( "beat", { f1 = "beats", f2 = "beat", p1 = "beating", p2 = "beaten" } )
        , ( "become", { f1 = "becomes", f2 = "became", p1 = "becoming", p2 = "become" } )
        , ( "befall", { f1 = "befalls", f2 = "befell", p1 = "befalling", p2 = "befallen" } )
        , ( "beg", { f1 = "begs", f2 = "begged", p1 = "begging", p2 = "begged" } )
        , ( "begin", { f1 = "begins", f2 = "began", p1 = "beginning", p2 = "begun" } )
        , ( "behold", { f1 = "beholds", f2 = "beheld", p1 = "beholding", p2 = "beheld" } )
        , ( "bend", { f1 = "bends", f2 = "bent", p1 = "bending", p2 = "bent" } )
        , ( "bereave", { f1 = "bereaves", f2 = "bereft", p1 = "bereaving", p2 = "bereft" } )
        , ( "beseech", { f1 = "beseeches", f2 = "besought", p1 = "beseeching", p2 = "besought" } )
        , ( "bet", { f1 = "bets", f2 = "bet", p1 = "betting", p2 = "bet" } )
        , ( "bid", { f1 = "bids", f2 = "bid", p1 = "bidding", p2 = "bid" } )
        , ( "bind", { f1 = "binds", f2 = "bound", p1 = "binding", p2 = "bound" } )
        , ( "bite", { f1 = "bites", f2 = "bit", p1 = "biting", p2 = "bitten" } )
        , ( "bleed", { f1 = "bleeds", f2 = "bled", p1 = "bleeding", p2 = "bled" } )
        , ( "blot", { f1 = "blots", f2 = "blotted", p1 = "blotting", p2 = "blotted" } )
        , ( "blow", { f1 = "blows", f2 = "blew", p1 = "blowing", p2 = "blown" } )
        , ( "blur", { f1 = "blurs", f2 = "blurred", p1 = "blurring", p2 = "blurred" } )
        , ( "break", { f1 = "breaks", f2 = "broke", p1 = "breaking", p2 = "broken" } )
        , ( "breed", { f1 = "breeds", f2 = "bred", p1 = "breeding", p2 = "bred" } )
        , ( "bring", { f1 = "brings", f2 = "brought", p1 = "bringing", p2 = "brought" } )
        , ( "broadcast", { f1 = "broadcasts", f2 = "broadcast", p1 = "broadcasting", p2 = "broadcast" } )
        , ( "build", { f1 = "builds", f2 = "built", p1 = "building", p2 = "built" } )
        , ( "burn", { f1 = "burns", f2 = "burnt", p1 = "burning", p2 = "burnt" } )
        , ( "burst", { f1 = "bursts", f2 = "burst", p1 = "bursting", p2 = "burst" } )
        , ( "bust", { f1 = "busts", f2 = "bust", p1 = "busting", p2 = "bust" } )
        , ( "buy", { f1 = "buys", f2 = "bought", p1 = "buying", p2 = "bought" } )
        , ( "cast", { f1 = "casts", f2 = "cast", p1 = "casting", p2 = "cast" } )
        , ( "catch", { f1 = "catches", f2 = "caught", p1 = "catching", p2 = "caught" } )
        , ( "chat", { f1 = "chats", f2 = "chatted", p1 = "chatting", p2 = "chatted" } )
        , ( "chide", { f1 = "chides", f2 = "chid", p1 = "chiding", p2 = "chidden" } )
        , ( "chip", { f1 = "chips", f2 = "chipped", p1 = "chipping", p2 = "chipped" } )
        , ( "choose", { f1 = "chooses", f2 = "chose", p1 = "choosing", p2 = "chosen" } )
        , ( "chop", { f1 = "chops", f2 = "chopped", p1 = "chopping", p2 = "chopped" } )
        , ( "clap", { f1 = "claps", f2 = "clapped", p1 = "clapping", p2 = "clapped" } )
        , ( "cleave", { f1 = "cleaves", f2 = "clove", p1 = "cleaving", p2 = "cloven" } )
        , ( "cling", { f1 = "clings", f2 = "clung", p1 = "clinging", p2 = "clung" } )
        , ( "clip", { f1 = "clips", f2 = "clipped", p1 = "clipping", p2 = "clipped" } )
        , ( "come", { f1 = "comes", f2 = "came", p1 = "coming", p2 = "come" } )
        , ( "compel", { f1 = "compels", f2 = "compelled", p1 = "compelling", p2 = "compelled" } )
        , ( "control", { f1 = "controls", f2 = "controlled", p1 = "controlling", p2 = "controlled" } )
        , ( "cost", { f1 = "costs", f2 = "cost", p1 = "costing", p2 = "cost" } )
        , ( "counsel", { f1 = "counsels", f2 = "counselled", p1 = "counselling", p2 = "counselled" } )
        , ( "creep", { f1 = "creeps", f2 = "crept", p1 = "creeping", p2 = "crept" } )
        , ( "crib", { f1 = "cribs", f2 = "cribbed", p1 = "cribbing", p2 = "cribbed" } )
        , ( "cut", { f1 = "cuts", f2 = "cut", p1 = "cutting", p2 = "cut" } )
        , ( "dam", { f1 = "dams", f2 = "dammed", p1 = "damming", p2 = "dammed" } )
        , ( "deal", { f1 = "deals", f2 = "dealt", p1 = "dealing", p2 = "dealt" } )
        , ( "dig", { f1 = "digs", f2 = "dug", p1 = "digging", p2 = "dug" } )
        , ( "dim", { f1 = "dims", f2 = "dimmed", p1 = "dimming", p2 = "dimmed" } )
        , ( "dip", { f1 = "dips", f2 = "dipped", p1 = "dipping", p2 = "dipped" } )
        , ( "do", { f1 = "does", f2 = "did", p1 = "doing", p2 = "done" } )
        , ( "drag", { f1 = "drags", f2 = "dragged", p1 = "dragging", p2 = "dragged" } )
        , ( "draw", { f1 = "draws", f2 = "drew", p1 = "drawing", p2 = "drawn" } )
        , ( "dream", { f1 = "dreams", f2 = "dreamt", p1 = "dreaming", p2 = "dreamt" } )
        , ( "drink", { f1 = "drinks", f2 = "drank", p1 = "drinking", p2 = "drunk" } )
        , ( "drip", { f1 = "drips", f2 = "dripped", p1 = "dripping", p2 = "dripped" } )
        , ( "drive", { f1 = "drives", f2 = "drove", p1 = "driving", p2 = "driven" } )
        , ( "drop", { f1 = "drops", f2 = "dropped", p1 = "dropping", p2 = "dropped" } )
        , ( "drum", { f1 = "drums", f2 = "drummed", p1 = "drumming", p2 = "drummed" } )
        , ( "dwell", { f1 = "dwells", f2 = "dwelt", p1 = "dwelling", p2 = "dwelt" } )
        , ( "dye", { f1 = "dyes", f2 = "dyed", p1 = "dyeing", p2 = "dyed" } )
        , ( "eat", { f1 = "eats", f2 = "ate", p1 = "eating", p2 = "eaten" } )
        , ( "fall", { f1 = "falls", f2 = "fell", p1 = "falling", p2 = "fallen" } )
        , ( "fan", { f1 = "fans", f2 = "fanned", p1 = "fanning", p2 = "fanned" } )
        , ( "feed", { f1 = "feeds", f2 = "fed", p1 = "feeding", p2 = "fed" } )
        , ( "feel", { f1 = "feels", f2 = "felt", p1 = "feeling", p2 = "felt" } )
        , ( "fight", { f1 = "fights", f2 = "fought", p1 = "fighting", p2 = "fought" } )
        , ( "find", { f1 = "finds", f2 = "found", p1 = "finding", p2 = "found" } )
        , ( "fit", { f1 = "fits", f2 = "fitted", p1 = "fitting", p2 = "fitted" } )
        , ( "flap", { f1 = "flaps", f2 = "flapped", p1 = "flapping", p2 = "flapped" } )
        , ( "flee", { f1 = "flees", f2 = "fled", p1 = "fleeing", p2 = "fled" } )
        , ( "fling", { f1 = "flings", f2 = "flung", p1 = "flinging", p2 = "flung" } )
        , ( "flop", { f1 = "flops", f2 = "flopped", p1 = "flopping", p2 = "flopped" } )
        , ( "fly", { f1 = "flies", f2 = "flew", p1 = "flying", p2 = "flown" } )
        , ( "forbid", { f1 = "forbids", f2 = "forbade", p1 = "forbidding", p2 = "forbidden" } )
        , ( "forecast", { f1 = "forecasts", f2 = "forecast", p1 = "forecasting", p2 = "forecast" } )
        , ( "foretell", { f1 = "foretells", f2 = "foretold", p1 = "foretelling", p2 = "foretold" } )
        , ( "forget", { f1 = "forgets", f2 = "forgot", p1 = "forgetting", p2 = "forgotten" } )
        , ( "forgive", { f1 = "forgives", f2 = "forgave", p1 = "forgiving", p2 = "forgiven" } )
        , ( "forsake", { f1 = "forsakes", f2 = "forsook", p1 = "forsaking", p2 = "forsaken" } )
        , ( "freeze", { f1 = "freezes", f2 = "froze", p1 = "freezing", p2 = "frozen" } )
        , ( "fulfil", { f1 = "fulfils", f2 = "fulfilled", p1 = "fulfilling", p2 = "fulfilled" } )
        , ( "gag", { f1 = "gags", f2 = "gagged", p1 = "gagging", p2 = "gagged" } )
        , ( "gainsay", { f1 = "gainsays", f2 = "gainsaid", p1 = "gainsaying", p2 = "gainsaid" } )
        , ( "get", { f1 = "gets", f2 = "got", p1 = "getting", p2 = "got" } )
        , ( "give", { f1 = "gives", f2 = "gave", p1 = "giving", p2 = "given" } )
        , ( "go", { f1 = "goes", f2 = "went", p1 = "going", p2 = "gone" } )
        , ( "grab", { f1 = "grabs", f2 = "grabbed", p1 = "grabbing", p2 = "grabbed" } )
        , ( "grin", { f1 = "grins", f2 = "grinned", p1 = "grinning", p2 = "grinned" } )
        , ( "grind", { f1 = "grinds", f2 = "ground", p1 = "grinding", p2 = "ground" } )
        , ( "grip", { f1 = "grips", f2 = "gripped", p1 = "gripping", p2 = "gripped" } )
        , ( "grow", { f1 = "grows", f2 = "grew", p1 = "growing", p2 = "grown" } )
        , ( "hang*", { f1 = "hangs", f2 = "hung", p1 = "hanging", p2 = "hung" } )
        , ( "have", { f1 = "has", f2 = "had", p1 = "having", p2 = "had" } )
        , ( "hear", { f1 = "hears", f2 = "heard", p1 = "hearing", p2 = "heard" } )
        , ( "hew", { f1 = "hews", f2 = "hewed", p1 = "hewing", p2 = "hewn" } )
        , ( "hide", { f1 = "hides", f2 = "hid", p1 = "hiding", p2 = "hidden" } )
        , ( "hit", { f1 = "hits", f2 = "hit", p1 = "hitting", p2 = "hit" } )
        , ( "hold", { f1 = "holds", f2 = "held", p1 = "holding", p2 = "held" } )
        , ( "hop", { f1 = "hops", f2 = "hopped", p1 = "hopping", p2 = "hopped" } )
        , ( "hug", { f1 = "hugs", f2 = "hugged", p1 = "hugging", p2 = "hugged" } )
        , ( "hum", { f1 = "hums", f2 = "hummed", p1 = "humming", p2 = "hummed" } )
        , ( "hurt", { f1 = "hurts", f2 = "hurt", p1 = "hurting", p2 = "hurt" } )
        , ( "impel", { f1 = "impels", f2 = "impelled", p1 = "impelling", p2 = "impelled" } )
        , ( "imperil", { f1 = "imperils", f2 = "imperilled", p1 = "imperilling", p2 = "imperilled" } )
        , ( "inlay", { f1 = "inlays", f2 = "inlaid", p1 = "inlaying", p2 = "inlaid" } )
        , ( "input", { f1 = "inputs", f2 = "input", p1 = "inputting", p2 = "input" } )
        , ( "jam", { f1 = "jams", f2 = "jammed", p1 = "jamming", p2 = "jammed" } )
        , ( "jog", { f1 = "jogs", f2 = "jogged", p1 = "jogging", p2 = "jogged" } )
        , ( "keep", { f1 = "keeps", f2 = "kept", p1 = "keeping", p2 = "kept" } )
        , ( "kid", { f1 = "kids", f2 = "kidded", p1 = "kidding", p2 = "kidded" } )
        , ( "kneel", { f1 = "kneels", f2 = "knelt", p1 = "kneeling", p2 = "knelt" } )
        , ( "knit", { f1 = "knits", f2 = "knitted", p1 = "knitting", p2 = "knitted" } )
        , ( "knot", { f1 = "knots", f2 = "knotted", p1 = "knotting", p2 = "knotted" } )
        , ( "know", { f1 = "knows", f2 = "knew", p1 = "knowing", p2 = "known" } )
        , ( "label", { f1 = "labels", f2 = "labelled", p1 = "labelling", p2 = "labelled" } )
        , ( "lay", { f1 = "lays", f2 = "laid", p1 = "laying", p2 = "laid" } )
        , ( "lead", { f1 = "leads", f2 = "led", p1 = "leading", p2 = "led" } )
        , ( "lean", { f1 = "leans", f2 = "leant", p1 = "leaning", p2 = "leant" } )
        , ( "leap", { f1 = "leaps", f2 = "leapt", p1 = "leaping", p2 = "leapt" } )
        , ( "learn", { f1 = "learns", f2 = "learnt", p1 = "learning", p2 = "learnt" } )
        , ( "leave", { f1 = "leaves", f2 = "left", p1 = "leaving", p2 = "left" } )
        , ( "lend", { f1 = "lends", f2 = "lent", p1 = "lending", p2 = "lent" } )
        , ( "let", { f1 = "lets", f2 = "let", p1 = "letting", p2 = "let" } )
        , ( "level", { f1 = "levels", f2 = "levelled", p1 = "levelling", p2 = "levelled" } )
        , ( "lie*", { f1 = "lies", f2 = "lay", p1 = "lying", p2 = "lain" } )
        , ( "light", { f1 = "lights", f2 = "lit", p1 = "lighting", p2 = "lit" } )
        , ( "lose", { f1 = "loses", f2 = "lost", p1 = "losing", p2 = "lost" } )
        , ( "make", { f1 = "makes", f2 = "made", p1 = "making", p2 = "made" } )
        , ( "man", { f1 = "mans", f2 = "manned", p1 = "manning", p2 = "manned" } )
        , ( "mean", { f1 = "means", f2 = "meant", p1 = "meaning", p2 = "meant" } )
        , ( "meet", { f1 = "meets", f2 = "met", p1 = "meeting", p2 = "met" } )
        , ( "mislead", { f1 = "misleads", f2 = "misled", p1 = "misleading", p2 = "misled" } )
        , ( "mistake", { f1 = "mistakes", f2 = "mistook", p1 = "mistaking", p2 = "mistaken" } )
        , ( "mow", { f1 = "mows", f2 = "mowed", p1 = "mowing", p2 = "mown" } )
        , ( "mug", { f1 = "mugs", f2 = "mugged", p1 = "mugging", p2 = "mugged" } )
        , ( "nap", { f1 = "naps", f2 = "napped", p1 = "napping", p2 = "napped" } )
        , ( "nip", { f1 = "nips", f2 = "nipped", p1 = "nipping", p2 = "nipped" } )
        , ( "nod", { f1 = "nods", f2 = "nodded", p1 = "nodding", p2 = "nodded" } )
        , ( "occur", { f1 = "occurs", f2 = "occurred", p1 = "occurring", p2 = "occurred" } )
        , ( "offset", { f1 = "offsets", f2 = "offset", p1 = "offsetting", p2 = "offset" } )
        , ( "omit", { f1 = "omits", f2 = "omitted", p1 = "omitting", p2 = "omitted" } )
        , ( "output", { f1 = "outputs", f2 = "output", p1 = "outputting", p2 = "output" } )
        , ( "overtake", { f1 = "overtakes", f2 = "overtook", p1 = "overtaking", p2 = "overtaken" } )
        , ( "partake", { f1 = "partakes", f2 = "partook", p1 = "partaking", p2 = "partaken" } )
        , ( "pat", { f1 = "pats", f2 = "patted", p1 = "patting", p2 = "patted" } )
        , ( "pay", { f1 = "pays", f2 = "paid", p1 = "paying", p2 = "paid" } )
        , ( "pedal", { f1 = "pedals", f2 = "pedalled", p1 = "pedalling", p2 = "pedalled" } )
        , ( "permit", { f1 = "permits", f2 = "permitted", p1 = "permitting", p2 = "permitted" } )
        , ( "picnic", { f1 = "picnics", f2 = "picnicked", p1 = "picnicking", p2 = "picnicked" } )
        , ( "plan", { f1 = "plans", f2 = "planned", p1 = "planning", p2 = "planned" } )
        , ( "plead", { f1 = "pleads", f2 = "pled", p1 = "pleading", p2 = "pled" } )
        , ( "plod", { f1 = "plods", f2 = "plodded", p1 = "plodding", p2 = "plodded" } )
        , ( "plot", { f1 = "plots", f2 = "plotted", p1 = "plotting", p2 = "plotted" } )
        , ( "plug", { f1 = "plugs", f2 = "plugged", p1 = "plugging", p2 = "plugged" } )
        , ( "pop", { f1 = "pops", f2 = "popped", p1 = "popping", p2 = "popped" } )
        , ( "prefer", { f1 = "prefers", f2 = "preferred", p1 = "preferring", p2 = "preferred" } )
        , ( "preset", { f1 = "presets", f2 = "preset", p1 = "presetting", p2 = "preset" } )
        , ( "program", { f1 = "programs", f2 = "programmed", p1 = "programming", p2 = "programmed" } )
        , ( "put", { f1 = "puts", f2 = "put", p1 = "putting", p2 = "put" } )
        , ( "quarrel", { f1 = "quarrels", f2 = "quarrelled", p1 = "quarrelling", p2 = "quarrelled" } )
        , ( "quit", { f1 = "quits", f2 = "quit", p1 = "quitting", p2 = "quit" } )
        , ( "read", { f1 = "reads", f2 = "read", p1 = "reading", p2 = "read" } )
        , ( "rebuild", { f1 = "rebuilds", f2 = "rebuilt", p1 = "rebuilding", p2 = "rebuilt" } )
        , ( "recur", { f1 = "recurs", f2 = "recurred", p1 = "recurring", p2 = "recurred" } )
        , ( "redo", { f1 = "redoes", f2 = "redid", p1 = "redoing", p2 = "redone" } )
        , ( "refer", { f1 = "refers", f2 = "referred", p1 = "referring", p2 = "referred" } )
        , ( "regret", { f1 = "regrets", f2 = "regretted", p1 = "regretting", p2 = "regretted" } )
        , ( "remake", { f1 = "remakes", f2 = "remade", p1 = "remaking", p2 = "remade" } )
        , ( "rend", { f1 = "rends", f2 = "rent", p1 = "rending", p2 = "rent" } )
        , ( "resell", { f1 = "resells", f2 = "resold", p1 = "reselling", p2 = "resold" } )
        , ( "reset", { f1 = "resets", f2 = "reset", p1 = "resetting", p2 = "reset" } )
        , ( "rewind", { f1 = "rewinds", f2 = "rewound", p1 = "rewinding", p2 = "rewound" } )
        , ( "rid", { f1 = "rids", f2 = "rid", p1 = "ridding", p2 = "rid" } )
        , ( "ride", { f1 = "rides", f2 = "rode", p1 = "riding", p2 = "ridden" } )
        , ( "ring", { f1 = "rings", f2 = "rang", p1 = "ringing", p2 = "rung" } )
        , ( "rise", { f1 = "rises", f2 = "rose", p1 = "rising", p2 = "risen" } )
        , ( "rob", { f1 = "robs", f2 = "robbed", p1 = "robbing", p2 = "robbed" } )
        , ( "rot", { f1 = "rots", f2 = "rotted", p1 = "rotting", p2 = "rotted" } )
        , ( "rub", { f1 = "rubs", f2 = "rubbed", p1 = "rubbing", p2 = "rubbed" } )
        , ( "run", { f1 = "runs", f2 = "ran", p1 = "running", p2 = "run" } )
        , ( "sag", { f1 = "sags", f2 = "sagged", p1 = "sagging", p2 = "sagged" } )
        , ( "sap", { f1 = "saps", f2 = "sapped", p1 = "sapping", p2 = "sapped" } )
        , ( "saw", { f1 = "saws", f2 = "sawed", p1 = "sawing", p2 = "sawn" } )
        , ( "say", { f1 = "says", f2 = "said", p1 = "saying", p2 = "said" } )
        , ( "scam", { f1 = "scams", f2 = "scammed", p1 = "scamming", p2 = "scammed" } )
        , ( "scan", { f1 = "scans", f2 = "scanned", p1 = "scanning", p2 = "scanned" } )
        , ( "scar", { f1 = "scars", f2 = "scarred", p1 = "scarring", p2 = "scarred" } )
        , ( "scrub", { f1 = "scrubs", f2 = "scrubbed", p1 = "scrubbing", p2 = "scrubbed" } )
        , ( "see", { f1 = "sees", f2 = "saw", p1 = "seeing", p2 = "seen" } )
        , ( "seek", { f1 = "seeks", f2 = "sought", p1 = "seeking", p2 = "sought" } )
        , ( "sell", { f1 = "sells", f2 = "sold", p1 = "selling", p2 = "sold" } )
        , ( "send", { f1 = "sends", f2 = "sent", p1 = "sending", p2 = "sent" } )
        , ( "set", { f1 = "sets", f2 = "set", p1 = "setting", p2 = "set" } )
        , ( "sew", { f1 = "sews", f2 = "sewed", p1 = "sewing", p2 = "sewn" } )
        , ( "shake", { f1 = "shakes", f2 = "shook", p1 = "shaking", p2 = "shaken" } )
        , ( "shear", { f1 = "shears", f2 = "shore", p1 = "shearing", p2 = "shorn" } )
        , ( "shed", { f1 = "sheds", f2 = "shed", p1 = "shedding", p2 = "shed" } )
        , ( "shine", { f1 = "shines", f2 = "shone", p1 = "shining", p2 = "shone" } )
        , ( "shit", { f1 = "shits", f2 = "shit", p1 = "shitting", p2 = "shit" } )
        , ( "shoot", { f1 = "shoots", f2 = "shot", p1 = "shooting", p2 = "shot" } )
        , ( "shop", { f1 = "shops", f2 = "shopped", p1 = "shopping", p2 = "shopped" } )
        , ( "show", { f1 = "shows", f2 = "showed", p1 = "showing", p2 = "shown" } )
        , ( "shrink", { f1 = "shrinks", f2 = "shrank", p1 = "shrinking", p2 = "shrunk" } )
        , ( "shrug", { f1 = "shrugs", f2 = "shrugged", p1 = "shrugging", p2 = "shrugged" } )
        , ( "shun", { f1 = "shuns", f2 = "shunned", p1 = "shunning", p2 = "shunned" } )
        , ( "shut", { f1 = "shuts", f2 = "shut", p1 = "shutting", p2 = "shut" } )
        , ( "signal", { f1 = "signals", f2 = "signalled", p1 = "signalling", p2 = "signalled" } )
        , ( "sin", { f1 = "sins", f2 = "sinned", p1 = "sinning", p2 = "sinned" } )
        , ( "sing", { f1 = "sings", f2 = "sang", p1 = "singing", p2 = "sung" } )
        , ( "singe", { f1 = "singes", f2 = "singed", p1 = "singeing", p2 = "singed" } )
        , ( "sink", { f1 = "sinks", f2 = "sank", p1 = "sinking", p2 = "sunk" } )
        , ( "sip", { f1 = "sips", f2 = "sipped", p1 = "sipping", p2 = "sipped" } )
        , ( "sit", { f1 = "sits", f2 = "sat", p1 = "sitting", p2 = "sat" } )
        , ( "skid", { f1 = "skids", f2 = "skidded", p1 = "skidding", p2 = "skidded" } )
        , ( "skip", { f1 = "skips", f2 = "skipped", p1 = "skipping", p2 = "skipped" } )
        , ( "slam", { f1 = "slams", f2 = "slammed", p1 = "slamming", p2 = "slammed" } )
        , ( "slap", { f1 = "slaps", f2 = "slapped", p1 = "slapping", p2 = "slapped" } )
        , ( "slay", { f1 = "slays", f2 = "slew", p1 = "slaying", p2 = "slain" } )
        , ( "sleep", { f1 = "sleeps", f2 = "slept", p1 = "sleeping", p2 = "slept" } )
        , ( "slide", { f1 = "slides", f2 = "slid", p1 = "sliding", p2 = "slid" } )
        , ( "slim", { f1 = "slims", f2 = "slimmed", p1 = "slimming", p2 = "slimmed" } )
        , ( "sling", { f1 = "slings", f2 = "slung", p1 = "slinging", p2 = "slung" } )
        , ( "slink", { f1 = "slinks", f2 = "slunk", p1 = "slinking", p2 = "slunk" } )
        , ( "slip", { f1 = "slips", f2 = "slipped", p1 = "slipping", p2 = "slipped" } )
        , ( "slit", { f1 = "slits", f2 = "slit", p1 = "slitting", p2 = "slit" } )
        , ( "smell", { f1 = "smells", f2 = "smelt", p1 = "smelling", p2 = "smelt" } )
        , ( "smite", { f1 = "smites", f2 = "smote", p1 = "smiting", p2 = "smitten" } )
        , ( "snap", { f1 = "snaps", f2 = "snapped", p1 = "snapping", p2 = "snapped" } )
        , ( "sneak", { f1 = "sneaks", f2 = "snuck", p1 = "sneaking", p2 = "snuck" } )
        , ( "sob", { f1 = "sobs", f2 = "sobbed", p1 = "sobbing", p2 = "sobbed" } )
        , ( "speak", { f1 = "speaks", f2 = "spoke", p1 = "speaking", p2 = "spoken" } )
        , ( "speed", { f1 = "speeds", f2 = "sped", p1 = "speeding", p2 = "sped" } )
        , ( "spell", { f1 = "spells", f2 = "spelt", p1 = "spelling", p2 = "spelt" } )
        , ( "spend", { f1 = "spends", f2 = "spent", p1 = "spending", p2 = "spent" } )
        , ( "spill", { f1 = "spills", f2 = "spilt", p1 = "spilling", p2 = "spilt" } )
        , ( "spin", { f1 = "spins", f2 = "span", p1 = "spinning", p2 = "spun" } )
        , ( "spit", { f1 = "spits", f2 = "spat", p1 = "spitting", p2 = "spat" } )
        , ( "split", { f1 = "splits", f2 = "split", p1 = "splitting", p2 = "split" } )
        , ( "spoil", { f1 = "spoils", f2 = "spoilt", p1 = "spoiling", p2 = "spoilt" } )
        , ( "spot", { f1 = "spots", f2 = "spotted", p1 = "spotting", p2 = "spotted" } )
        , ( "spread", { f1 = "spreads", f2 = "spread", p1 = "spreading", p2 = "spread" } )
        , ( "spring", { f1 = "springs", f2 = "sprang", p1 = "springing", p2 = "sprung" } )
        , ( "stand", { f1 = "stands", f2 = "stood", p1 = "standing", p2 = "stood" } )
        , ( "steal", { f1 = "steals", f2 = "stole", p1 = "stealing", p2 = "stolen" } )
        , ( "stem", { f1 = "stems", f2 = "stemmed", p1 = "stemming", p2 = "stemmed" } )
        , ( "step", { f1 = "steps", f2 = "stepped", p1 = "stepping", p2 = "stepped" } )
        , ( "stick", { f1 = "sticks", f2 = "stuck", p1 = "sticking", p2 = "stuck" } )
        , ( "sting", { f1 = "stings", f2 = "stung", p1 = "stinging", p2 = "stung" } )
        , ( "stink", { f1 = "stinks", f2 = "stank", p1 = "stinking", p2 = "stunk" } )
        , ( "stir", { f1 = "stirs", f2 = "stirred", p1 = "stirring", p2 = "stirred" } )
        , ( "stop", { f1 = "stops", f2 = "stopped", p1 = "stopping", p2 = "stopped" } )
        , ( "strap", { f1 = "straps", f2 = "strapped", p1 = "strapping", p2 = "strapped" } )
        , ( "strew", { f1 = "strews", f2 = "strewed", p1 = "strewing", p2 = "strewn" } )
        , ( "stride", { f1 = "strides", f2 = "strode", p1 = "striding", p2 = "stridden" } )
        , ( "strike", { f1 = "strikes", f2 = "struck", p1 = "striking", p2 = "stricken" } )
        , ( "string", { f1 = "strings", f2 = "strung", p1 = "stringing", p2 = "strung" } )
        , ( "strip", { f1 = "strips", f2 = "stripped", p1 = "stripping", p2 = "stripped" } )
        , ( "strive", { f1 = "strives", f2 = "strove", p1 = "striving", p2 = "striven" } )
        , ( "submit", { f1 = "submits", f2 = "submitted", p1 = "submitting", p2 = "submitted" } )
        , ( "swear", { f1 = "swears", f2 = "swore", p1 = "swearing", p2 = "sworn" } )
        , ( "sweat", { f1 = "sweats", f2 = "sweat", p1 = "sweating", p2 = "sweat" } )
        , ( "sweep", { f1 = "sweeps", f2 = "swept", p1 = "sweeping", p2 = "swept" } )
        , ( "swell", { f1 = "swells", f2 = "swelled", p1 = "swelling", p2 = "swollen" } )
        , ( "swim", { f1 = "swims", f2 = "swam", p1 = "swimming", p2 = "swum" } )
        , ( "swing", { f1 = "swings", f2 = "swung", p1 = "swinging", p2 = "swung" } )
        , ( "swot", { f1 = "swots", f2 = "swotted", p1 = "swotting", p2 = "swotted" } )
        , ( "take", { f1 = "takes", f2 = "took", p1 = "taking", p2 = "taken" } )
        , ( "tap", { f1 = "taps", f2 = "tapped", p1 = "tapping", p2 = "tapped" } )
        , ( "teach", { f1 = "teaches", f2 = "taught", p1 = "teaching", p2 = "taught" } )
        , ( "tear", { f1 = "tears", f2 = "tore", p1 = "tearing", p2 = "torn" } )
        , ( "tell", { f1 = "tells", f2 = "told", p1 = "telling", p2 = "told" } )
        , ( "think", { f1 = "thinks", f2 = "thought", p1 = "thinking", p2 = "thought" } )
        , ( "throw", { f1 = "throws", f2 = "threw", p1 = "throwing", p2 = "thrown" } )
        , ( "thrust", { f1 = "thrusts", f2 = "thrust", p1 = "thrusting", p2 = "thrust" } )
        , ( "tip", { f1 = "tips", f2 = "tipped", p1 = "tipping", p2 = "tipped" } )
        , ( "transfer", { f1 = "transfers", f2 = "transferred", p1 = "transferring", p2 = "transferred" } )
        , ( "trap", { f1 = "traps", f2 = "trapped", p1 = "trapping", p2 = "trapped" } )
        , ( "travel", { f1 = "travels", f2 = "travelled", p1 = "travelling", p2 = "travelled" } )
        , ( "tread", { f1 = "treads", f2 = "trod", p1 = "treading", p2 = "trodden" } )
        , ( "trip", { f1 = "trips", f2 = "tripped", p1 = "tripping", p2 = "tripped" } )
        , ( "trot", { f1 = "trots", f2 = "trotted", p1 = "trotting", p2 = "trotted" } )
        , ( "tug", { f1 = "tugs", f2 = "tugged", p1 = "tugging", p2 = "tugged" } )
        , ( "typeset", { f1 = "typesets", f2 = "typeset", p1 = "typesetting", p2 = "typeset" } )
        , ( "understand", { f1 = "understands", f2 = "understood", p1 = "understanding", p2 = "understood" } )
        , ( "undo", { f1 = "undoes", f2 = "undid", p1 = "undoing", p2 = "undone" } )
        , ( "upset", { f1 = "upsets", f2 = "upset", p1 = "upsetting", p2 = "upset" } )
        , ( "wake", { f1 = "wakes", f2 = "woke", p1 = "waking", p2 = "woken" } )
        , ( "waylay", { f1 = "waylays", f2 = "waylaid", p1 = "waylaying", p2 = "waylaid" } )
        , ( "wear", { f1 = "wears", f2 = "wore", p1 = "wearing", p2 = "worn" } )
        , ( "weave", { f1 = "weaves", f2 = "wove", p1 = "weaving", p2 = "woven" } )
        , ( "wed", { f1 = "weds", f2 = "wed", p1 = "wedding", p2 = "wed" } )
        , ( "weep", { f1 = "weeps", f2 = "wept", p1 = "weeping", p2 = "wept" } )
        , ( "wend", { f1 = "wends", f2 = "went", p1 = "wending", p2 = "went" } )
        , ( "wet", { f1 = "wets", f2 = "wet", p1 = "wetting", p2 = "wet" } )
        , ( "whip", { f1 = "whips", f2 = "whipped", p1 = "whipping", p2 = "whipped" } )
        , ( "win", { f1 = "wins", f2 = "won", p1 = "winning", p2 = "won" } )
        , ( "wind", { f1 = "winds", f2 = "wound", p1 = "winding", p2 = "wound" } )
        , ( "withdraw", { f1 = "withdraws", f2 = "withdrew", p1 = "withdrawing", p2 = "withdrawn" } )
        , ( "worship", { f1 = "worships", f2 = "worshipped", p1 = "worshipping", p2 = "worshipped" } )
        , ( "wrap", { f1 = "wraps", f2 = "wrapped", p1 = "wrapping", p2 = "wrapped" } )
        , ( "wring", { f1 = "wrings", f2 = "wrung", p1 = "wringing", p2 = "wrung" } )
        , ( "write", { f1 = "writes", f2 = "wrote", p1 = "writing", p2 = "written" } )
        ]
