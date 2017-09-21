module Interface.Model.Examples
    exposing
        ( allExamples
        , longExamples
        , longFirst
        , objectExamples
        , objectFirst
        , plainExamples
        , plainFirst
        , shortExamples
        , shortFirst
        )

{-| This module simply outputs lists of Models, used for generating example
Messages for illustrating the theory.
-}

import Interface.Model.Types exposing (..)
import Theory.Long.Displacers exposing (..)
import Theory.Object.Pseudo exposing (..)
import Theory.Plain.Nucleus exposing (..)


{-| All examples.
-}
allExamples : List Model
allExamples =
    plainExamples ++ shortExamples ++ longExamples ++ objectExamples


{-| Examples of plain Messages.
-}
plainFirst : Model
plainFirst =
    { plus = False
    , object = Speaker False
    , verbality = Be False
    , status = Nothing
    , balances = [ ( Nothing, Different (Other False (Just Male) (Just "Victor")) ) ]
    , elaborations = []
    }


plainExamples : List Model
plainExamples =
    [ plainFirst
    , { plus = False
      , object = Speaker False
      , verbality = Be False
      , status = Just (Absolute "happy")
      , balances = [ ( Just For, Different (Hearer False) ) ]
      , elaborations = []
      }
    , { plus = False
      , object = Other False (Just Female) Nothing
      , verbality = Be False
      , status = Just (Relative Out)
      , balances = [ ( Just With, Different (Other False (Just Male) (Just "Fred")) ) ]
      , elaborations = []
      }
    , { plus = False
      , object = Other True Nothing Nothing
      , verbality = Do "look" False False
      , status = Just (Relative Up)
      , balances = [ ( Just To, Different (Other False (Just Female) Nothing) ) ]
      , elaborations = []
      }
    , { plus = False
      , object = Speaker True
      , verbality = Do "like" False False
      , status = Nothing
      , balances = [ ( Nothing, Different (Other True Nothing Nothing) ) ]
      , elaborations = []
      }
    , { plus = False
      , object = Other True Nothing Nothing
      , verbality = Do "live" False False
      , status = Nothing
      , balances = [ ( Just In, Different (Other False Nothing (Just "France")) ) ]
      , elaborations = []
      }
    , { plus = False
      , object = Speaker False
      , verbality = Do "sing" True False
      , status = Nothing
      , balances = []
      , elaborations = []
      }
    , { plus = False
      , object = Other True Nothing Nothing
      , verbality = Do "laugh" True False
      , status = Nothing
      , balances = []
      , elaborations = []
      }
    , { plus = False
      , object = Speaker True
      , verbality = Do "leave" True False
      , status = Nothing
      , balances =
            [ ( Nothing, Different (Other False Nothing Nothing) )
            , ( Just To, Different (Other True Nothing Nothing) )
            ]
      , elaborations = []
      }
    ]


{-| Examples of short Messages.
-}
shortFirst : Model
shortFirst =
    { plus = False
    , object = Other True Nothing Nothing
    , verbality = Do "get" True False
    , status = Just (Absolute "married")
    , balances = []
    , elaborations =
        [ { elaboration | recipe = MakePAST, string1 = Just "yesterday" } ]
    }


shortExamples : List Model
shortExamples =
    [ shortFirst
    , { plus = False
      , object = Other True Nothing Nothing
      , verbality = Do "get" True False
      , status = Just (Absolute "married")
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakePREORDAINED }
            , { elaboration | recipe = MakePAST, string1 = Just "yesterday" }
            ]
      }
    , { plus = False
      , object = Other False (Just Female) (Just "Claire")
      , verbality = Do "drink" False False
      , status = Nothing
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakeREGULAR }
            , { elaboration | recipe = MakeNEGATIVE }
            ]
      }
    , { plus = False
      , object = Other False (Just Female) (Just "Claire")
      , verbality = Do "drink" False False
      , status = Nothing
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakeNEGATIVE }
            , { elaboration | recipe = MakeREGULAR }
            ]
      }
    , { plus = False
      , object = Other False (Just Male) (Just "Victor")
      , verbality = Do "see" False False
      , status = Nothing
      , balances = [ ( Nothing, Different (Other False (Just Female) (Just "Grannie")) ) ]
      , elaborations =
            [ { elaboration | recipe = MakeEXTENDED, string1 = Just "for two hours" }
            , { elaboration | recipe = MakeNEGATIVE }
            , { elaboration | recipe = MakePAST }
            ]
      }
    , { plus = False
      , object = Other False (Just Male) (Just "Victor")
      , verbality = Do "see" False False
      , status = Nothing
      , balances = [ ( Nothing, Different (Other False (Just Female) (Just "Grannie")) ) ]
      , elaborations =
            [ { elaboration | recipe = MakeNEGATIVE }
            , { elaboration | recipe = MakeEXTENDED, string1 = Just "for two hours" }
            , { elaboration | recipe = MakePAST }
            ]
      }
    , { plus = False
      , object = Other False (Just Female) (Just "Grannie")
      , verbality = Do "fall" False False
      , status = Just (Relative Over)
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakeSCATTERED, string1 = Just "fifteen times" }
            , { elaboration | recipe = MakeNEGATIVE }
            , { elaboration | recipe = MakePAST, string1 = Just "yesterday" }
            ]
      }
    , { plus = False
      , object = Other False (Just Female) (Just "Grannie")
      , verbality = Do "fall" False False
      , status = Just (Relative Over)
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakeNEGATIVE }
            , { elaboration | recipe = MakeSCATTERED, string1 = Just "fifteen times" }
            , { elaboration | recipe = MakePAST, string1 = Just "yesterday" }
            ]
      }
    ]


{-| Examples of long Messages.
-}
longFirst : Model
longFirst =
    { plus = False
    , object = Other False (Just Female) Nothing
    , verbality = Do "see" False False
    , status = Nothing
    , balances = [ ( Nothing, Different (Other False (Just Male) Nothing) ) ]
    , elaborations =
        [ { elaboration | recipe = MakeDISPLACED, displacer = Just (Primary ( Do "go" True False, Nothing )) } ]
    }


longExamples : List Model
longExamples =
    [ longFirst
    , { plus = False
      , object = Other False (Just Female) Nothing
      , verbality = Do "see" False False
      , status = Nothing
      , balances = [ ( Nothing, Different (Other False (Just Male) Nothing) ) ]
      , elaborations =
            [ { elaboration | recipe = MakeDISPLACED, displacer = Just (Primary ( Do "go" True False, Nothing )) }
            , { elaboration | recipe = MakePREORDAINED, string1 = Just "tomorrow" }
            ]
      }
    , { plus = False
      , object = Other False (Just Female) Nothing
      , verbality = Do "see" False False
      , status = Nothing
      , balances = [ ( Nothing, Different (Other False (Just Male) Nothing) ) ]
      , elaborations =
            [ { elaboration | recipe = MakePREORDAINED, string1 = Just "tomorrow", displacer = Just (Primary ( Do "go" True False, Nothing )) }
            ]
      }
    , { plus = False
      , object = Other False (Just Male) (Just "Victor")
      , verbality = Do "know" False False
      , status = Nothing
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakeDISPLACED, displacer = Just (Secondary Yes1) } ]
      }
    , { plus = False
      , object = Other False (Just Male) (Just "Victor")
      , verbality = Do "know" False False
      , status = Nothing
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakeDISPLACED, displacer = Just (Secondary Yes1) }
            , { elaboration | recipe = MakePAST }
            ]
      }
    , { plus = False
      , object = Other False Nothing Nothing
      , verbality = Do "rain" False False
      , status = Nothing
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakePREORDAINED, string1 = Just "tomorrow", displacer = Just (Secondary Yes1) } ]
      }
    , { plus = False
      , object = Other False Nothing Nothing
      , verbality = Do "rain" False False
      , status = Nothing
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakePREORDAINED, string1 = Just "tomorrow", displacer = Just (Secondary Maybe1) } ]
      }
    , { plus = False
      , object = Other False Nothing Nothing
      , verbality = Do "rain" False False
      , status = Nothing
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakePREORDAINED, string1 = Just "tomorrow", displacer = Just (Secondary Maybe3) }
            , { elaboration | recipe = MakePAST }
            ]
      }
    , { plus = False
      , object = Hearer False
      , verbality = Do "hurt" False False
      , status = Nothing
      , balances = [ ( Nothing, Different (Other False (Just Male) Nothing) ) ]
      , elaborations =
            [ { elaboration | recipe = MakePAST }
            , { elaboration | recipe = MakeDISPLACED, displacer = Just (Secondary Maybe1) }
            , { elaboration | recipe = MakePAST }
            ]
      }
    , { plus = False
      , object = Hearer False
      , verbality = Do "hurt" False False
      , status = Nothing
      , balances = [ ( Nothing, Different (Other False (Just Male) Nothing) ) ]
      , elaborations =
            [ { elaboration | recipe = MakePREORDAINED, displacer = Just (Secondary Maybe1) }
            , { elaboration | recipe = MakePAST }
            , { elaboration | recipe = MakePRIOR }
            ]
      }
    , { plus = False
      , object = Speaker False
      , verbality = Do "try" False False
      , status = Nothing
      , balances = [ ( Nothing, Different (Other False Nothing Nothing) ) ]
      , elaborations =
            [ { elaboration | recipe = MakeREGULAR, string1 = Just "sometimes", displacer = Just (Secondary Yes1) } ]
      }
    , { plus = False
      , object = Speaker False
      , verbality = Do "try" False False
      , status = Nothing
      , balances = [ ( Nothing, Different (Other False Nothing Nothing) ) ]
      , elaborations =
            [ { elaboration | recipe = MakeREGULAR, string1 = Just "occasionally", displacer = Just (Secondary Maybe1) } ]
      }
    , { plus = False
      , object = Other False (Just Male) Nothing
      , verbality = Do "eat" False False
      , status = Just (Relative Out)
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakeREGULAR, displacer = Just (Primary ( Do "tend" False False, Nothing )) } ]
      }
    , { plus = False
      , object = Other False (Just Male) Nothing
      , verbality = Do "eat" False False
      , status = Just (Relative Out)
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakeREGULAR, displacer = Just (Primary ( Do "use" False False, Nothing )) }
            , { elaboration | recipe = MakePAST }
            ]
      }
    ]


{-| Examples of object Messages.
-}
objectFirst : Model
objectFirst =
    { plus = False
    , object = Other False (Just Male) Nothing
    , verbality = Be False
    , status = Just (Absolute "bald")
    , balances = []
    , elaborations =
        [ { elaboration | recipe = MakeINDIRECT, string1 = Just "king", string3 = Just "of France" } ]
    }


objectExamples : List Model
objectExamples =
    [ objectFirst
    , { plus = False
      , object = Other False (Just Male) Nothing
      , verbality = Be False
      , status = Just (Absolute "insane")
      , balances = []
      , elaborations =
            [ { elaboration | recipe = MakeINDIRECT, pointer = RelatedTo (Other False (Just Male) (Just "Smith")), string1 = Just "murderer" }
            ]
      }
    ]


{-| Default elaboration ingredients.
-}
elaboration : Elaboration
elaboration =
    { plus = False
    , recipe = MakeNEGATIVE
    , string1 = Nothing
    , string2 = Nothing
    , string3 = Nothing
    , displacer = Nothing
    , target = -1
    , pointer = The
    , quantifier = Nothing
    , other = False
    }
