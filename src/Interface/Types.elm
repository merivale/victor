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
    | MakePractical
    | MakeProjective
    | MakeEvasive
    | MakePreordained
    | MakeRegular
    | MakeExtended
    | MakeScattered
    | MakeOngoing
    | MakeDetermined
    | MakeImminent
    | MakeApparent
    | MakeIndirect
    | MakeEnumerated
    | MakeAmassed


{-| It makes life much easier to bundle all the ingredients needed for every
elaboration together. For each instance of this record, only a few fields will
be needed, but this is a negligible memory price to pay - and as I say, it makes
the code simpler.
-}
type alias Ingredients =
    { showElaborations : Bool
    , object : Object
    , objectString : String
    , pivot : String
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
    , multiPurposeStyle1 : Bool
    , multiPurposeStyle2 : Bool
    }


{-| Signals to modify the application state.
-}
type Signal
    = RemoveElaborationRecipe Int
    | AddElaborationRecipe Int ElaborationRecipe
    | ToggleShowElaborations Int
    | SetObject Int Object
    | SetObjectString Int String
    | SetPivot Int String
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
    | ToggleMultiPurposeStyle1 Int
    | ToggleMultiPurposeStyle2 Int


{-| When an Indirect, Enumerated, or Amassed elaboration is applied, the view
module shouldn't show the main or balancing object that is overridden by that
elaboration. To this end, two maybe variables of this type are passed around
the recursive View.input function (one for each object).
-}
type Override
    = IndirectOverride
    | EnumeratedOverride
    | AmassedOverride


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
