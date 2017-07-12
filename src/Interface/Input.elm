module Interface.Input
    exposing
        ( button
        , iconButton
        , label
        , text
        , number
        , checkbox
        , select
        , selectGroup
        , emptyInput
        )

{-| Module for creating HTML elements for gathering user input.
-}

import Html
import Html.Attributes as Attr
import Html.Events as Events
import Interface.Types exposing (..)


button : ButtonProperties -> Html.Html Signal
button { label, signal, title } =
    Html.button
        [ Events.onClick signal
        , Attr.class "button"
        , Attr.title title
        ]
        [ Html.text label ]


iconButton : ButtonProperties -> Html.Html Signal
iconButton { label, signal, title } =
    Html.button
        [ Events.onClick signal
        , Attr.class ("button " ++ label)
        , Attr.title title
        ]
        []


label : String -> Html.Html Signal
label text =
    Html.label
        [ Attr.class "label" ]
        [ Html.text text ]


text : TextProperties -> Html.Html Signal
text { value, placeholder, signal, disabled } =
    Html.input
        [ Attr.type_ "text"
        , Attr.class "text"
        , Attr.value value
        , Attr.placeholder placeholder
        , Events.onInput signal
        , Attr.disabled disabled
        ]
        []


number : TextProperties -> Html.Html Signal
number { value, placeholder, signal, disabled } =
    Html.input
        [ Attr.type_ "number"
        , Attr.class "text"
        , Attr.value value
        , Attr.placeholder placeholder
        , Events.onInput signal
        , Attr.disabled disabled
        ]
        []


checkbox : CheckboxProperties -> Html.Html Signal
checkbox { id, label, checked, signal } =
    Html.label
        [ Attr.for id, Attr.class "checkbox" ]
        [ Html.input
            [ Attr.type_ "checkbox"
            , Attr.checked checked
            , Attr.id id
            , Events.onClick signal
            ]
            []
        , Html.text label
        ]


select : SelectProperties a -> Html.Html Signal
select { value, options, equivalent, signal, toLabel } =
    Html.select
        [ Attr.class "select"
        , Events.onInput (signal << fromId options)
        ]
        (List.map (option toLabel value equivalent) options)


selectGroup : List ( String, List a ) -> SelectProperties a -> Html.Html Signal
selectGroup groups { value, options, equivalent, signal, toLabel } =
    Html.select
        [ Attr.class "select"
        , Events.onInput (signal << fromId options)
        ]
        (List.map (optionGroup toLabel value equivalent) groups)


optionGroup : (a -> String) -> a -> (a -> a -> Bool) -> ( String, List a ) -> Html.Html Signal
optionGroup toLabel value equivalent ( label, options ) =
    Html.optgroup
        [ Attr.attribute "label" label ]
        (List.map (option toLabel value equivalent) options)


option : (a -> String) -> a -> (a -> a -> Bool) -> a -> Html.Html Signal
option toLabel current equivalent value =
    Html.option
        [ Attr.value (toString value)
        , Attr.selected (equivalent current value)
        ]
        [ Html.text (toLabel value) ]


fromId : List a -> (String -> a)
fromId options =
    let
        fromString s =
            case List.head (List.filter (\x -> toString x == s) options) of
                Nothing ->
                    Debug.crash "select element is broken :("

                Just a ->
                    a
    in
        fromString


emptyInput : Html.Html Signal
emptyInput =
    Html.input
        [ Attr.type_ "text"
        , Attr.class "text"
        , Attr.disabled True
        ]
        []
