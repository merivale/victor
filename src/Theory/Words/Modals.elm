module Theory.Words.Modals exposing (modal)

import Theory.Ideas.Displacers as Displacers


modal : Bool -> Bool -> Displacers.Modality -> String
modal past negated modality =
    case modality of
        Displacers.Yes1 ->
            if past then
                "would"
            else
                "will"

        Displacers.Yes2 ->
            if past then
                "should"
            else
                "shall"

        Displacers.Yes3 ->
            if negated then
                "need"
            else if past then
                "ought"
            else
                "must"

        Displacers.Maybe1 ->
            if past then
                "might"
            else
                "may"

        Displacers.Maybe3 ->
            if past then
                "could"
            else
                "can"

        Displacers.Maybe4 ->
            "dare"
