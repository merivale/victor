module Interface.Model.Types exposing (..)

{-| Type definitions for the interface. The model contains all of the
ingredients necessary to make a message. But to make changing those ingredients
easier, they are not stored directly in message form. For those familiar with
Elm standard practices, note the use of `Signal` instead of `Msg` for the type
sent to the update function; this is to avoid confusion with `Message`, a key
term of art within my theory.
-}

import Html
import Theory.Long.Displacers exposing (..)
import Theory.Object.Pseudo exposing (..)
import Theory.Plain.Nucleus exposing (..)


{-| The model (and its component types).
-}
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


{-| Signals sent to the update function to step the application forward.
-}
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


{-| Some handy aliases used to group arguments sent to functions that create
input elements.
-}
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
