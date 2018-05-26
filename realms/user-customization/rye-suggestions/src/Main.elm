module Main exposing (main)

import Browser
import Html exposing (Html)
import Json.Decode as Decode exposing (Value)


main : Program Value Model Msg
main =
    Browser.embed
        { init = init
        , subscriptions = always Sub.none
        , update = update
        , view = view
        }


type alias Model =
    {}


type Msg
    = Noop


init : Value -> ( Model, Cmd Msg )
init json =
    ( {}, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


view : Model -> Html Msg
view model =
    Html.pre [] [ Html.text "Suggestions powered by Elm" ]
