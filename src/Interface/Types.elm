module Interface.Types exposing (..)

{-| The type definitions for the interface.
-}

import Html
import Theory.Types exposing (..)


type alias Model =
    { plus : Bool
    , object : Object
    , pivot : Pivot
    , counter : Maybe Counter
    , balances : List Balance
    , elaborations : List Elaboration
    }


type alias Elaboration =
    { plus : Bool
    , recipe : Recipe
    , displacer : Maybe Displacer
    , string1 : Maybe String
    , string2 : Maybe String
    , string3 : Maybe String
    , target : Int
    , pointer : Pointer
    , quantifier : Maybe Quantifier
    , other : Bool
    }


type Recipe
    = MakeNEGATIVE
    | MakePAST
    | MakePRIOR
    | MakeDISPLACED
    | MakeREGULAR
    | MakePREORDAINED
    | MakeEXTENDED
    | MakeSCATTERED
    | MakeINDIRECT
    | MakeENUMERATED
    | MakeAMASSED


type Signal
    = TogglePlus
    | SetObject Object
    | SetObjectString String
    | SetPivot Pivot
    | SetPivotVerbality Verbality
    | TogglePivotOngoing
    | TogglePivotPassive
    | SetCounter (Maybe Counter)
    | SetCounterProperty Property
    | SetCounterRelator Relator
    | AddBalance
    | RemoveBalance
    | SetBalanceRelator Int (Maybe Relator)
    | SetBalanceWeight Int Weight
    | SetBalanceWeightObject Int Object
    | SetBalanceWeightObjectString Int String
    | AddElaboration Int Recipe
    | RemoveElaboration Int
    | ToggleElaborationPlus Int
    | SetDisplacer Int (Maybe Displacer)
    | SetDisplacerPivot Int Pivot
    | SetDisplacerPivotVerbality Int Verbality
    | ToggleDisplacerPivotOngoing Int
    | ToggleDisplacerPivotPassive Int
    | SetDisplacerCounter Int (Maybe Counter)
    | SetDisplacerCounterProperty Int Property
    | SetDisplacerCounterRelator Int Relator
    | SetDisplacerModality Int Modality
    | SetString1 Int String
    | SetString2 Int String
    | SetString3 Int String
    | SetTarget Int Int
    | SetPointer Int Pointer
    | SetPointerObject Int Object
    | SetPointerObjectString Int String
    | SetQuantifier Int (Maybe Quantifier)
    | SetQuantifierInteger Int String
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
