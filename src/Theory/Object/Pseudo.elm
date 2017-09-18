module Theory.Object.Pseudo exposing (..)

import Theory.Plain.Nucleus as Nucleus


type alias Description =
    ( Pointer, Bool, Haystack )


type alias Multiplicity =
    ( Quantifier, Bool, Haystack )


type alias Proportion =
    ( Maybe Quantifier, Bool, Haystack )


type Pointer
    = The
    | This
    | That
    | RelatedTo Nucleus.Object


type Quantifier
    = A
    | Integer Int
    | Several
    | Many
    | Each
    | Every
    | Both
    | Some
    | Any
    | All
    | Much
    | Most
    | Enough


isEnumerating : Quantifier -> Bool
isEnumerating quantifier =
    case quantifier of
        Integer int ->
            True

        _ ->
            List.member
                quantifier
                [ A
                , Several
                , Many
                , Each
                , Every
                , Both
                , Some
                , Any
                ]


isAmassing : Maybe Quantifier -> Bool
isAmassing quantifier =
    List.member
        quantifier
        [ Nothing
        , Just Some
        , Just Any
        , Just All
        , Just Much
        , Just Most
        , Just Enough
        ]


isNegatable : Quantifier -> Bool
isNegatable quantifier =
    case quantifier of
        Integer int ->
            True

        _ ->
            List.member
                quantifier
                [ Many
                , Every
                , Both
                , Some
                , Any
                ]


requiresPlural : Quantifier -> Bool
requiresPlural quantifier =
    case quantifier of
        Integer int ->
            (abs int) /= 1

        _ ->
            List.member
                quantifier
                [ Several
                , Many
                , Both
                ]


type alias Haystack =
    ( String, Maybe String, Maybe String )
