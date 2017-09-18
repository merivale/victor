module Theory.Plain.Nucleus exposing (..)


type alias Nucleus =
    ( Object, Condition )


type Object
    = Speaker Bool
    | Hearer Bool
    | Other Bool (Maybe Sex) (Maybe String)


type Sex
    = Male
    | Female


isSpeaker : Object -> Bool
isSpeaker object =
    case object of
        Speaker plural ->
            True

        _ ->
            False


isOther : Object -> Bool
isOther object =
    case object of
        Other plural sex string ->
            True

        _ ->
            False


isPlural : Object -> Bool
isPlural object =
    case object of
        Speaker plural ->
            plural

        Hearer plural ->
            plural

        Other plural sex string ->
            plural


type alias Condition =
    ( Pivot, List Balance )


type alias Pivot =
    ( Verbality, Maybe Status )


type Verbality
    = Be Bool
    | Do String Bool Bool


type Status
    = Absolute String
    | Relative Relator


type alias Balance =
    ( Maybe Relator, Weight )


type Weight
    = SameAsMain
    | Different Object


type Relator
    = About
    | Above
    | After
    | Against
    | At
    | Before
    | Behind
    | Below
    | Beyond
    | By
    | Down
    | For
    | From
    | In
    | Inside
    | Into
    | Like
    | Of
    | Off
    | On
    | Opposite
    | Out
    | Outside
    | Over
    | Through
    | To
    | Towards
    | Under
    | Up
    | With
    | Without
