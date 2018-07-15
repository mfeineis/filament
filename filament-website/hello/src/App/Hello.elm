port module App.Hello exposing (main)

import Browser
import Html exposing (Html)
import Intl
import Json.Decode as Decode exposing (Value)


port fromElm : String -> Cmd msg


port toElm : (String -> msg) -> Sub msg


main : Program Value Model Msg
main =
    Browser.element
        { init = init
        , subscriptions = \_ -> toElm Interop
        , update = update
        , view = view
        }


type Msg
    = Interop String


type alias Model =
    { i18nKey : Maybe Intl.ContextKey
    }


init : Value -> ( Model, Cmd Msg )
init flags =
    let
        i18nKey =
            Decode.decodeValue Intl.decodeContextKey flags
                |> Result.toMaybe
    in
    ( { i18nKey = i18nKey }
    , fromElm "This should work!"
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


view : Model -> Html Msg
view model =
    case model.i18nKey of
        Nothing ->
            Html.text "Translations not available!"

        Just i18nKey ->
            Intl.context i18nKey
                [ Intl.text (Intl.spec "hello.welcome")
                ]
