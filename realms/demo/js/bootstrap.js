
export function setup(window, document) {

    const friends = document.createElement("acme-friendlist");
    friends.setAttribute("userId", "oppa");
    document.querySelector("body").appendChild(friends);

    const popular = document.createElement("acme-popular-products");
    popular.setAttribute("userId", "iro");
    document.querySelector("body").appendChild(popular);

    const suggestion = document.createElement("acme-suggestions");
    suggestion.setAttribute("userId", "katara");
    document.querySelector("body").appendChild(suggestion);

    const profile = document.createElement("acme-user-profile");
    profile.setAttribute("userId", "aang");
    document.querySelector("body").appendChild(profile);

    const weather = document.createElement("acme-weather");
    weather.setAttribute("userId", "soka");
    document.querySelector("body").appendChild(weather);
}

