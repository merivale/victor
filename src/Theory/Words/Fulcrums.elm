module Theory.Words.Fulcrums exposing (fulcrum)

import Theory.Ideas.Nucleus as Nucleus
import Theory.Words.Prepositions as Prepositions
import Theory.Words.Verbs as Verbs


fulcrum : Bool -> Nucleus.Pivot -> ( String, List String )
fulcrum prior ( verbality, status ) =
    let
        ( base, rest ) =
            case verbality of
                Nucleus.Be True ->
                    ( "be", "being" :: complement status )

                Nucleus.Be False ->
                    ( "be", complement status )

                Nucleus.Do string True True ->
                    ( "be", [ "being", Verbs.participle2 string ] ++ complement status )

                Nucleus.Do string True False ->
                    ( "be", [ Verbs.participle1 string ] ++ complement status )

                Nucleus.Do string False True ->
                    ( "be", [ Verbs.participle2 string ] ++ complement status )

                Nucleus.Do string False False ->
                    ( string, complement status )
    in
    if prior then
        ( "have", Verbs.participle2 base :: rest )
    else
        ( base, rest )


complement : Maybe Nucleus.Status -> List String
complement status =
    case status of
        Nothing ->
            []

        Just (Nucleus.Absolute string) ->
            [ string ]

        Just (Nucleus.Relative relator) ->
            [ Prepositions.preposition relator ]
