port module Filament.Home exposing (main)

import Browser exposing (UrlRequest(..))
import Browser.Navigation as Navigation
import Filament.Home.Locale as Locale exposing (Locale(..))
import Filament.Home.Translation exposing (LangKey(..), t)
import Filament.Home.UI as UI
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events exposing (onClick)
import Intl
import Json.Decode as Decode exposing (Value)
import Url exposing (Url)


port changeLocale : Value -> Cmd msg


port localeChanged : (Value -> msg) -> Sub msg


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
    let
        decodeLocale v =
            case Decode.decodeValue Locale.decode v of
                Err reason ->
                    Noop

                Ok locale ->
                    LocaleChanged locale
    in
    Sub.batch
        [ localeChanged decodeLocale
        ]


type alias Flags =
    { i18nKey : Intl.ContextKey
    , locale : Locale
    }


flagsDecoder : Decode.Decoder Flags
flagsDecoder =
    Decode.map2 Flags
        (Decode.field "i18nKey" Intl.decodeContextKey)
        (Decode.field "locale" Locale.decode)


init : Value -> Url -> Navigation.Key -> ( AppModel, Cmd Msg )
init flags url navKey =
    case Decode.decodeValue flagsDecoder flags of
        Err reason ->
            ( Invalid reason, Cmd.none )

        Ok { i18nKey, locale } ->
            routeIt url
                { displayLocale = locale
                , i18nKey = i18nKey
                , future = []
                , navKey = navKey
                , now =
                    { counter = 0
                    }
                , past = []
                , route = Home
                , storyMode = Interactive
                }
                |> (\( m, cmds ) -> ( Valid m, cmds ))


type Route
    = Home
    | GetStarted


routeIt : Url -> Model -> ( Model, Cmd Msg )
routeIt url model =
    case Maybe.withDefault "home" url.fragment of
        "getstarted" ->
            ( { model | route = GetStarted }, Cmd.none )

        "home" ->
            ( { model | route = Home }, Cmd.none )

        _ ->
            ( { model | route = Home }, Cmd.none )


type Msg
    = Noop
      -- Story
    | MoveBack
    | MoveForward
    | ToggleRecordStory
      -- Routing
    | UrlChanged Url
    | UrlRequestedByLink UrlRequest
      -- Locale
    | LocaleChanged Locale
    | SwitchLocale Locale
      -- Domain
    | Decrement
    | Increment


type AppModel
    = Invalid Decode.Error
    | Valid Model


type StoryMode
    = Replay
    | Interactive


type alias State =
    { counter : Int
    }


type alias Model =
    { displayLocale : Locale
    , i18nKey : Intl.ContextKey
    , future : List State
    , navKey : Navigation.Key
    , now : State
    , past : List State
    , route : Route
    , storyMode : StoryMode
    }



-- UPDATE


update : Msg -> AppModel -> ( AppModel, Cmd Msg )
update msg appModel =
    let
        updateValid ({ navKey } as model) =
            case msg of
                Noop ->
                    ( model, Cmd.none )

                MoveBack ->
                    let
                        ( past, now, future ) =
                            case model.past of
                                [] ->
                                    ( model.past, model.now, model.future )

                                newNow :: rest ->
                                    ( rest
                                    , newNow
                                    , model.now :: model.future
                                    )
                    in
                    ( { model
                        | past = past
                        , now = now
                        , future = future
                      }
                    , Cmd.none
                    )

                MoveForward ->
                    let
                        ( past, now, future ) =
                            case model.future of
                                [] ->
                                    ( model.past, model.now, model.future )

                                newNow :: rest ->
                                    ( model.now :: model.past
                                    , newNow
                                    , rest
                                    )
                    in
                    ( { model
                        | past = past
                        , now = now
                        , future = future
                      }
                    , Cmd.none
                    )

                ToggleRecordStory ->
                    ( case model.storyMode of
                        Replay ->
                            { model
                                | storyMode = Interactive
                            }

                        Interactive ->
                            { model
                                | storyMode = Replay
                            }
                    , Cmd.none
                    )

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

                -- Locale
                LocaleChanged locale ->
                    let
                        newModel =
                            -- FIXME: Do we want a locale change to be part
                            --        of the state we want to be able to replay?
                            { model | displayLocale = locale }
                    in
                    ( newModel, Cmd.none )

                SwitchLocale locale ->
                    ( model, changeLocale (Locale.encode locale) )

                -- Domain
                Decrement ->
                    if canInteract model then
                        let
                            decrement ({ counter } as state) =
                                { state
                                    | counter = counter - 1
                                }

                            newModel =
                                pushState model
                        in
                        ( { newModel | now = decrement newModel.now }
                        , Cmd.none
                        )
                    else
                        ( model, Cmd.none )

                Increment ->
                    if canInteract model then
                        let
                            increment ({ counter } as state) =
                                { state
                                    | counter = counter + 1
                                }

                            newModel =
                                pushState model
                        in
                        ( { newModel | now = increment newModel.now }
                        , Cmd.none
                        )
                    else
                        ( model, Cmd.none )
    in
    case appModel of
        Invalid _ ->
            ( appModel, Cmd.none )

        Valid model ->
            updateValid model |> (\( m, cmds ) -> ( Valid m, cmds ))


pushState : Model -> Model
pushState ({ past, now, future } as model) =
    { model
        | past = now :: past
        , future = []
    }



-- FRAGMENTS


flmntHello : List (Html.Attribute Msg) -> Html Msg
flmntHello attrs =
    Html.node "flmnt-hello" attrs []


flmntGetStarted : List (Html.Attribute Msg) -> Html Msg
flmntGetStarted attrs =
    Html.node "flmnt-getstarted" attrs []



-- VIEW


view : AppModel -> Browser.Document Msg
view appModel =
    let
        viewValid ({ route } as model) =
            case model.route of
                GetStarted ->
                    viewGetStarted model

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


viewGetStarted : Model -> Browser.Document Msg
viewGetStarted model =
    { title = "Getting Started - filamentjs"
    , body =
        [ Intl.context model.i18nKey
            [ Intl.text (t Welcome)
            , Html.div []
                [ flmntGetStarted []
                ]
            , flmntHello []
            ]
        ]
    }


canInteract : { a | storyMode : StoryMode } -> Bool
canInteract { storyMode } =
    storyMode == Interactive


canMoveBack : { a | past : List State } -> Bool
canMoveBack { past } =
    List.length past > 0


canMoveForward : { a | future : List State } -> Bool
canMoveForward { future } =
    List.length future > 0


viewHome : Model -> Browser.Document Msg
viewHome model =
    { title = "Home - filamentjs"
    , body =
        [ Intl.context model.i18nKey
            [ UI.pageHeader
                [ UI.button
                    [ onClick ToggleRecordStory
                    ]
                    [ case model.storyMode of
                        Replay ->
                            Intl.text (t StoryRecord)

                        Interactive ->
                            Intl.text (t StoryStopRecording)
                    ]
                , UI.button
                    [ Attr.disabled <|
                        canInteract model
                            || not (canMoveBack model)
                    , onClick MoveBack
                    ]
                    [ Intl.text (t StoryMoveBack)
                    , if List.isEmpty model.past then
                        Html.text ""
                      else
                        Html.text ("(" ++ String.fromInt (List.length model.past) ++ ")")
                    ]
                , UI.button
                    [ Attr.disabled <|
                        canInteract model
                            || not (canMoveForward model)
                    , onClick MoveForward
                    ]
                    [ Intl.text (t StoryMoveForward)
                    , if List.isEmpty model.future then
                        Html.text ""
                      else
                        Html.text ("(" ++ String.fromInt (List.length model.future) ++ ")")
                    ]
                , UI.button
                    [ Attr.disabled (model.displayLocale == EnglishUS)
                    , onClick (SwitchLocale EnglishUS)
                    ]
                    [ Intl.text (t (SwitchLangTo EnglishUS)) ]
                , UI.button
                    [ Attr.disabled (model.displayLocale == GermanDE)
                    , onClick (SwitchLocale GermanDE)
                    ]
                    [ Intl.text (t (SwitchLangTo GermanDE)) ]
                ]
            , UI.pageContent
                [ Html.div []
                    [ Intl.text (t Welcome)
                    , Html.text " to Filament.Home"
                    ]
                , flmntHello []
                , Html.div []
                    [ UI.button
                        [ Attr.disabled (not (canInteract model))
                        , onClick Decrement
                        ]
                        [ Html.text "-" ]
                    , Html.text (String.fromInt model.now.counter)
                    , UI.button
                        [ Attr.disabled (not (canInteract model))
                        , onClick Increment
                        ]
                        [ Html.text "+" ]
                    ]
                ]
            ]
        ]
    }
