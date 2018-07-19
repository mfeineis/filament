module Filament.Home.Translation
    exposing
        ( LangKey(..)
        , t
        )

import Intl exposing (Spec)
import Filament.Home.Locale as Locale exposing (Locale(..))


type LangKey
    = StoryMoveBack
    | StoryMoveForward
    | StoryRecord
    | StoryStopRecording
    | SwitchLangTo Locale
    | Welcome


t : LangKey -> Spec
t key =
    case key of
        StoryMoveBack ->
            Intl.spec "story.moveBack"

        StoryMoveForward ->
            Intl.spec "story.moveForward"

        StoryRecord ->
            Intl.spec "story.record"

        StoryStopRecording ->
            Intl.spec "story.record.stop"

        SwitchLangTo lang ->
            Intl.spec ("switch.lang.to." ++ Locale.toLanguageString lang)

        Welcome ->
            Intl.spec "welcome"

