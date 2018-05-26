
export function setup(window, document) {

    const suggestion = document.createElement("rye-suggestions");
    suggestion.setAttribute("userId", "katara");

    document.querySelector("body").appendChild(suggestion);

    const profile = document.createElement("rye-user-profile");
    profile.setAttribute("userId", "aang");

    document.querySelector("body").appendChild(profile);
}

