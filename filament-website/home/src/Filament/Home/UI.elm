module Filament.Home.UI
    exposing
        ( button
        , pageContent
        , pageHeader
        )


import Css exposing (..)
import Html exposing (Html)
import Html.Styled as Styled
    exposing
        ( div
        , header
        , span
        , styled
        )
import Html.Styled.Attributes as Attr exposing (class, css, id)


button : List (Html.Attribute msg) -> List (Html msg) -> Html msg
button attrs children =
    Styled.button
        ((List.map Attr.fromUnstyled attrs) ++ [ class "ci-button" ])
        (List.map Styled.fromUnstyled children)
        |> Styled.toUnstyled


pageHeader : List (Html msg) -> Html msg
pageHeader children =
    header
        [ class "ci-header"
        ]
        (List.map Styled.fromUnstyled children)
        |> Styled.toUnstyled


pageContent : List (Html msg) -> Html msg
pageContent children =
    header
        [ class "ci-main"
        ]
        (List.map Styled.fromUnstyled children)
        |> Styled.toUnstyled
