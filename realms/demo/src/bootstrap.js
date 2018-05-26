
export function setup(window, document) {

    const friends = document.createElement("rye-friendlist");
    friends.setAttribute("userId", "oppa");
    document.querySelector("body").appendChild(friends);

    const popular = document.createElement("rye-popular-products");
    popular.setAttribute("userId", "iro");
    document.querySelector("body").appendChild(popular);

    const suggestion = document.createElement("rye-suggestions");
    suggestion.setAttribute("userId", "katara");
    document.querySelector("body").appendChild(suggestion);

    const profile = document.createElement("rye-user-profile");
    profile.setAttribute("userId", "aang");
    document.querySelector("body").appendChild(profile);

    const weather = document.createElement("rye-weather");
    weather.setAttribute("userId", "soka");
    document.querySelector("body").appendChild(weather);
}

