module Theory.Ideas.Displacers exposing (..)

import Theory.Ideas.Nucleus as Nucleus


type Displacer
    = Primary Nucleus.Pivot
    | Secondary Modality


type Modality
    = Yes1
    | Yes2
    | Yes3
    | Maybe1
    | Maybe3
    | Maybe4
