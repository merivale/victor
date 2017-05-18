module Interface.Types exposing (..)

{-| The type definitions for the interface.
-}

import Array
import Html
import Theory.Types exposing (..)


{-| The application state - contains everything you need to make a message.
-}
type alias Model =
    Array.Array Recipe


type Recipe
    = MakePlain Ingredients
    | MakeElaborate ElaborationRecipe Int Ingredients


type ElaborationRecipe
    = MakeNegative
    | MakePast
    | MakePrior
    | MakeExpanded
    | MakePractical
    | MakeEvasive
    | MakeProjective
    | MakePreordained
    | MakeRegular
    | MakeExtended
    | MakeScattered
    | MakeIndirect
    | MakeEnumerated
    | MakeAmassed


{-| It makes the code much simpler if we bundle all the ingredients needed for
the nucleus and every elaboration together. For each instance of this record,
only a few fields will be needed, but this is a negligible memory price to pay.
-}
type alias Ingredients =
    { showElaborations : Bool
    , object : Object
    , objectString : String
    , pivot : Pivot
    , pivotProperty : String
    , pivotVerb : String
    , ongoing : Bool
    , passive : Bool
    , balance : Maybe Balance
    , balanceString : String
    , balanceObject : Object
    , balanceObjectString : String
    , modality : Modality
    , target : Target
    , pointer : Pointer
    , pointerObject : Object
    , pointerObjectString : String
    , enumeratedQuantifier : Quantifier
    , amassedQuantifier : Maybe Quantifier
    , other : Bool
    , category : String
    , plural : Bool
    , description : String
    , restriction : String
    , multiPurposeString : String
    }


{-| Signals to modify the application state.
-}
type Signal
    = RemoveElaborationRecipe Int
    | AddElaborationRecipe Int ElaborationRecipe
    | ToggleShowElaborations Int
    | SetObject Int Object
    | SetObjectString Int String
    | SetPivot Int Pivot
    | SetPivotProperty Int String
    | SetPivotVerb Int String
    | ToggleOngoing Int
    | TogglePassive Int
    | SetBalance Int (Maybe Balance)
    | SetBalanceString Int String
    | SetBalanceObject Int Object
    | SetBalanceObjectString Int String
    | SetModality Int Modality
    | SetTarget Int Target
    | SetPointer Int Pointer
    | SetPointerObject Int Object
    | SetPointerObjectString Int String
    | SetEnumeratedQuantifier Int Quantifier
    | SetAmassedQuantifier Int (Maybe Quantifier)
    | ToggleOther Int
    | SetCategory Int String
    | TogglePlural Int
    | SetDescription Int String
    | SetRestriction Int String
    | SetMultiPurposeString Int String


{-| Some convenient type shorthands for input element properties (used in the
Interface.Input module).
-}
type alias PanelProperties =
    { elaborationRecipe : Maybe ElaborationRecipe
    , showElaborations : Bool
    , index : Int
    , body : List (Html.Html Signal)
    }


type alias TextProperties =
    { value : String
    , placeholder : String
    , signal : String -> Signal
    }


type alias RadioCheckboxProperties =
    { id : String
    , label : String
    , checked : Bool
    , signal : Signal
    }


type alias SelectProperties a =
    { value : a
    , options : List a
    , signal : a -> Signal
    , toLabel : a -> String
    }


type alias ButtonProperties =
    { label : String
    , signal : Signal
    , customClass : Maybe String
    }
