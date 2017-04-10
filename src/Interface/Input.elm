module Interface.Input
    exposing
        ( input
        , button
        , label
        , text
        , radio
        , checkbox
        , select
        , selectGroup
        )

{-| HTML for gathering the inputs for message content. Note that the select
dropdown menu isn't a native HTML select element. This is partly to enable a
greater level of custom CSS styling, but mainly because getting input from
native select menus in Elm is a pain (you have to encode the values as strings,
then decode them again, and deal with possible errors...).
-}

import Html
import Html.Attributes as Attr
import Html.Events as Events
import Interface.Types exposing (..)


input : PanelProperties -> Html.Html Signal
input { elaborationRecipe, showElaborations, index, body } =
    let
        heading =
            case elaborationRecipe of
                Nothing ->
                    Html.div [ Attr.class "title" ] [ Html.text "Nucleus" ]

                Just simpleRecipe ->
                    Html.div [ Attr.class "title" ] [ Html.text (elaborationRecipeToString simpleRecipe) ]

        showElaborationsButton =
            if showElaborations then
                button { label = "-", signal = ToggleShowElaborations index, customClass = Just "green" }
            else
                button { label = "+", signal = ToggleShowElaborations index, customClass = Just "green" }

        deleteElaborationButton =
            button { label = "×", signal = RemoveElaborationRecipe index, customClass = Just "red" }
    in
        case elaborationRecipe of
            Nothing ->
                Html.div
                    [ Attr.class "input" ]
                    [ Html.div [ Attr.class "heading" ] [ showElaborationsButton, heading ]
                    , elaborations index showElaborations
                    , Html.div [ Attr.class "body" ] body
                    ]

            Just simpleRecipe ->
                Html.div
                    [ Attr.class "input" ]
                    [ Html.div [ Attr.class "heading" ] [ showElaborationsButton, heading, deleteElaborationButton ]
                    , elaborations index showElaborations
                    , Html.div [ Attr.class "body" ] body
                    ]


elaborations : Int -> Bool -> Html.Html Signal
elaborations index show =
    let
        elaborationsClass =
            if show then
                "elaborations active"
            else
                "elaborations"
    in
        Html.div
            [ Attr.class elaborationsClass ]
            [ Html.div []
                (List.map (elaborationButton index)
                    [ MakeNegative
                    , MakePast
                    , MakePrior
                    , MakePractical
                    , MakeProjective
                    , MakeEvasive
                    ]
                )
            , Html.div []
                (List.map (elaborationButton index)
                    [ MakePreordained
                    , MakeRegular
                    , MakeExtended
                    , MakeScattered
                    , MakeOngoing
                    , MakeDetermined
                    ]
                )
            , Html.div []
                (List.map (elaborationButton index)
                    [ MakeImminent
                    , MakeApparent
                    , MakeIndirect
                    , MakeEnumerated
                    , MakeAmassed
                    ]
                )
            ]


elaborationButton : Int -> ElaborationRecipe -> Html.Html Signal
elaborationButton index elaborationRecipe =
    button
        { label = elaborationRecipeToString elaborationRecipe
        , signal = AddElaborationRecipe index elaborationRecipe
        , customClass = Nothing
        }


elaborationRecipeToString : ElaborationRecipe -> String
elaborationRecipeToString elaborationRecipe =
    String.dropLeft 4 (toString elaborationRecipe)


button : ButtonProperties -> Html.Html Signal
button { label, signal, customClass } =
    let
        classes =
            case customClass of
                Nothing ->
                    "button"

                Just a ->
                    "button " ++ a
    in
        Html.button
            [ Events.onClick signal, Attr.class classes ]
            [ Html.text label ]


label : String -> Html.Html Signal
label text =
    Html.label [ Attr.class "label" ] [ Html.text text ]


text : TextProperties -> Html.Html Signal
text { value, placeholder, signal } =
    Html.input
        [ Attr.type_ "text"
        , Attr.class "text"
        , Attr.value value
        , Attr.placeholder placeholder
        , Events.onInput signal
        ]
        []


radio : String -> RadioCheckboxProperties -> Html.Html Signal
radio name { id, label, checked, signal } =
    Html.label
        [ Attr.for id, Attr.class "radio" ]
        [ Html.input
            [ Attr.type_ "radio"
            , Attr.name name
            , Attr.checked checked
            , Attr.id id
            , Events.onClick signal
            ]
            []
        , Html.text label
        ]


checkbox : RadioCheckboxProperties -> Html.Html Signal
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
select { value, options, signal, toLabel } =
    Html.select
        [ Attr.class "select", Events.onInput (signal << fromId options) ]
        (List.map (option toLabel value) options)


selectGroup : List ( String, List a ) -> SelectProperties a -> Html.Html Signal
selectGroup groups { value, options, signal, toLabel } =
    Html.select
        [ Attr.class "select", Events.onInput (signal << fromId options) ]
        (List.map (optionGroup toLabel value) groups)


optionGroup : (a -> String) -> a -> ( String, List a ) -> Html.Html Signal
optionGroup toLabel value ( label, options ) =
    Html.optgroup [ Attr.attribute "label" label ] (List.map (option toLabel value) options)


option : (a -> String) -> a -> a -> Html.Html Signal
option toLabel current value =
    let
        attributes =
            if current == value then
                [ Attr.value (toString value), Attr.selected True ]
            else
                [ Attr.value (toString value) ]
    in
        Html.option attributes [ Html.text (toLabel value) ]


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
