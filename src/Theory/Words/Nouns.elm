module Theory.Words.Nouns exposing (plural)

import Dict
import Theory.Words.Utils as Utils


plural : String -> String
plural noun =
    Maybe.withDefault (guessPlural noun) (Dict.get noun nouns)


guessPlural : String -> String
guessPlural singular =
    if Utils.consontanty singular then
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
