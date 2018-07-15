module Filament.Home exposing (main)

import Browser exposing (UrlRequest(..))
import Browser.Navigation as Navigation
import Filament.Home.Translation exposing (LangKey(..), t)
import Html
import Intl
import Json.Decode as Decode exposing (Value)
import Url exposing (Url)


main : Program Value AppModel Msg
main =
    Browser.application
        { init = init
        , onUrlChange = UrlChanged
        , onUrlRequest = UrlRequestedByLink
        , subscriptions = subscriptions
        , update = update
        , view = view
        }


subscriptions : AppModel -> Sub Msg
subscriptions _ =
    Sub.none


routeIt : Url -> Model -> ( Model, Cmd Msg )
routeIt url model =
    case url.fragment of
        _ ->
            ( { model | route = Home }, Cmd.none )


type alias Flags =
    { i18nKey : Intl.ContextKey
    }


flagsDecoder : Decode.Decoder Flags
flagsDecoder =
    Decode.map Flags
        (Decode.field "i18nKey" Intl.decodeContextKey)


init : Value -> Url -> Navigation.Key -> ( AppModel, Cmd Msg )
init flags url navKey =
    case Decode.decodeValue flagsDecoder flags of
        Err reason ->
            ( Invalid reason, Cmd.none )

        Ok { i18nKey } ->
            routeIt url
                { i18nKey = i18nKey
                , navKey = navKey
                , route = Home
                }
                |> (\(m, cmds) -> ( Valid m, cmds ))


type Route
    = Home


type Msg
    = UrlChanged Url
    | UrlRequestedByLink UrlRequest


type AppModel
    = Invalid Decode.Error
    | Valid Model


type alias Model =
    { i18nKey : Intl.ContextKey
    , navKey : Navigation.Key
    , route : Route
    }



-- UPDATE


update : Msg -> AppModel -> ( AppModel, Cmd Msg )
update msg appModel =
    let
        updateValid ({ navKey } as model) =
            case msg of
                -- Routing
                UrlRequestedByLink (Internal url) ->
                    ( model
                    , Navigation.pushUrl navKey (Url.toString url)
                    )

                UrlRequestedByLink (External url) ->
                    ( model
                    , Navigation.load url
                    )

                UrlChanged url ->
                    routeIt url model
    in
    case appModel of
        Invalid _ ->
            ( appModel, Cmd.none )

        Valid model ->
            updateValid model |> (\( m, cmds ) -> ( Valid m, cmds ))



-- VIEW


view : AppModel -> Browser.Document Msg
view appModel =
    let
        viewValid ({ route } as model) =
            case model.route of
                Home ->
                    viewHome model
    in
    case appModel of
        Invalid reason ->
            { title = "Error"
            , body =
                [ Html.text "Something went wrong!"
                ]
            }

        Valid model ->
            viewValid model


viewHome : Model -> Browser.Document Msg
viewHome model =
    { title = "Home - filamentjs"
    , body =
        [ Intl.context model.i18nKey
            [ Intl.text (t Welcome)
            , Html.text " to Filament.Home"
            ]
        ]
    }
