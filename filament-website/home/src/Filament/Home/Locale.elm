module Filament.Home.Locale exposing (Locale(..), decode, encode, toLanguageString)

import Json.Decode as Decode exposing (Decoder, Value)
import Json.Encode as Encode


type Locale
    = EnglishUS
    | GermanDE


decode : Decoder Locale
decode =
    let
        fromString it =
            case it of
                "de" ->
                    Decode.succeed GermanDE

                "de-DE" ->
                    Decode.succeed GermanDE

                "en" ->
                    Decode.succeed EnglishUS

                "en-US" ->
                    Decode.succeed EnglishUS

                _ ->
                    -- Falling back to English
                    Decode.succeed EnglishUS
    in
    Decode.decodeString fromString


encode : Locale -> Value
encode locale =
    Encode.string (toString locale)


toLanguageString : Locale -> String
toLanguageString locale =
    case locale of
        EnglishUS ->
            "en"

        GermanDE ->
            "de"


toString : Locale -> String
toString locale =
    case locale of
        EnglishUS ->
            "en-US"

        GermanDE ->
            "de-DE"
