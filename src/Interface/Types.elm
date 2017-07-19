module Interface.Types exposing (..)

{-| The type definitions for the interface.
-}

import Html
import Theory.Types exposing (..)


type alias Model =
    { plus : Bool
    , object : Object
    , verbality : Verbality
    , status : Maybe Status
    , balances : List Balance
    , elaborations : List Elaboration
    }


type alias Elaboration =
    { plus : Bool
    , recipe : Recipe
    , string1 : Maybe String
    , string2 : Maybe String
    , string3 : Maybe String
    , displacer : Maybe Displacer
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
    | MakePREORDAINED
    | MakeREGULAR
    | MakeEXTENDED
    | MakeSCATTERED
    | MakeINDIRECT
    | MakeENUMERATED
    | MakeAMASSED


type Signal
    = TogglePlus
    | SetObject Object
    | SetObjectString String
    | SetVerbality Verbality
    | SetVerbalityString String
    | ToggleVerbalityOngoing
    | ToggleVerbalityPassive
    | SetStatus (Maybe Status)
    | SetStatusString String
    | SetStatusRelator Relator
    | AddBalance
    | RemoveBalance
    | SetBalanceRelator Int (Maybe Relator)
    | SetBalanceWeight Int Weight
    | SetBalanceWeightObject Int Object
    | SetBalanceWeightObjectString Int String
    | AddElaboration Int Recipe
    | RemoveElaboration Int
    | ToggleElaborationPlus Int
    | SetElaborationString1 Int String
    | SetElaborationString2 Int String
    | SetElaborationString3 Int String
    | SetElaborationDisplacer Int (Maybe Displacer)
    | SetElaborationDisplacerVerbality Int Verbality
    | SetElaborationDisplacerVerbalityString Int String
    | ToggleElaborationDisplacerVerbalityOngoing Int
    | ToggleElaborationDisplacerVerbalityPassive Int
    | SetElaborationDisplacerStatus Int (Maybe Status)
    | SetElaborationDisplacerStatusString Int String
    | SetElaborationDisplacerStatusRelator Int Relator
    | SetElaborationDisplacerModality Int Modality
    | SetElaborationTarget Int Int
    | SetElaborationPointer Int Pointer
    | SetElaborationPointerObject Int Object
    | SetElaborationPointerObjectString Int String
    | SetElaborationQuantifier Int (Maybe Quantifier)
    | SetElaborationQuantifierInteger Int String
    | ToggleElaborationOther Int


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
