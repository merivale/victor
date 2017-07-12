module Interface.Types exposing (..)

{-| The type definitions for the interface.
-}

import Html
import Theory.Types exposing (..)


type alias Model =
    { plus : Bool
    , object : Object
    , pivot : Pivot
    , balances : List Balance
    , elaborations : List Elaboration
    }


type alias Elaboration =
    { plus : Bool
    , recipe : Recipe
    , string1 : Maybe String
    , string2 : Maybe String
    , string3 : Maybe String
<<<<<<< Updated upstream
    , target : Target
=======
    , pivot : Pivot
    , counter : Maybe Counter
    , modality : Modality
    , target : Int
>>>>>>> Stashed changes
    , pointer : Pointer
    , quantifier : Maybe Quantifier
    , other : Bool
    }


type Recipe
    = MakeNEGATIVE
    | MakePAST
    | MakePRIOR
    | MakeREGULAR
    | MakePREORDAINED
    | MakeEXTENDED
    | MakeSCATTERED
    | MakeDISPLACED
    | MakePRACTICAL
    | MakePROJECTIVE
    | MakeEVASIVE
    | MakeINDIRECT
    | MakeENUMERATED
    | MakeAMASSED


type Signal
    = TogglePlus
    | SetObject Object
    | SetObjectString String
    | SetPivot Pivot
    | SetPivotSense (Maybe Sense)
    | SetPivotVerbality Verbality
    | TogglePivotOngoing
    | TogglePivotPassive
    | SetPivotProperty Property
    | AddBalance
    | RemoveBalance
    | SetBalanceCounter Int (Maybe Counter)
    | SetBalanceWeight Int (Maybe Weight)
    | SetBalanceObject Int Object
    | SetBalanceObjectString Int String
    | AddElaboration Int Recipe
    | RemoveElaboration Int
    | ToggleElaborationPlus Int
<<<<<<< Updated upstream
    | SetDisplacer Int (Maybe Displacer)
    | SetDisplacerPivot Int Pivot
    | SetDisplacerPivotSense Int (Maybe Sense)
    | SetDisplacerPivotVerbality Int Verbality
    | ToggleDisplacerPivotOngoing Int
    | ToggleDisplacerPivotPassive Int
    | SetDisplacerPivotProperty Int Property
    | SetDisplacerModality Int Modality
    | SetString1 Int String
    | SetString2 Int String
    | SetString3 Int String
    | SetTarget Int Target
    | SetTargetInt Int Int
=======
    | SetString1 Int String
    | SetString2 Int String
    | SetString3 Int String
    | SetDisplacedPivot Int Pivot
    | SetDisplacedPivotVerbality Int Verbality
    | ToggleDisplacedPivotOngoing Int
    | ToggleDisplacedPivotPassive Int
    | SetDisplacedCounter Int (Maybe Counter)
    | SetDisplacedCounterProperty Int Property
    | SetDisplacedCounterRelator Int Relator
    | SetModality Int Modality
    | SetTarget Int Int
>>>>>>> Stashed changes
    | SetPointer Int Pointer
    | SetPointerObject Int Object
    | SetPointerObjectString Int String
    | SetQuantifier Int (Maybe Quantifier)
    | ToggleOther Int


type alias ButtonProperties =
    { label : String
    , signal : Signal
    , title : String
    }


type alias TextProperties =
    { value : String
    , placeholder : String
    , signal : String -> Signal
    , disabled : Bool
    }


type alias CheckboxProperties =
    { id : String
    , label : String
    , checked : Bool
    , signal : Signal
    }


type alias SelectProperties a =
    { value : a
    , options : List a
    , equivalent : a -> a -> Bool
    , signal : a -> Signal
    , toLabel : a -> String
    }
