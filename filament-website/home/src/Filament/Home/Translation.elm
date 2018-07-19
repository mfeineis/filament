module Filament.Home.Translation
    exposing
        ( LangKey(..)
        , t
        )

import Intl exposing (Spec)


type LangKey
    = StoryMoveBack
    | StoryMoveForward
    | StoryRecord
    | StoryStopRecording
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

        Welcome ->
            Intl.spec "welcome"
