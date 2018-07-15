module Filament.Home.Translation exposing (LangKey(..), t)

import Intl exposing (Spec)


type LangKey
    = Welcome


t : LangKey -> Spec
t key =
    case key of
        Welcome ->
            Intl.spec "home.welcome"
