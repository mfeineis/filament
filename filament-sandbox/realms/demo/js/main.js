// The page needs to take care of polyfilling the environment to the necessary level
// FIXME: Find a nice way to provide only the necessary polyfills
import "../polyfills/custom-elements.js";
import "../polyfills/custom-event.js";
import "isomorphic-fetch";

import Filament from "filament";

// To include an actual fragment into the initial payload we just
// pull the file and everything should work seamlessly

import "acme-friendlist";
//import "acme-friendlist.fragment";
import "acme-popular-products";
//import "acme-popular-products.fragment";
import "acme-suggestions";
//import "acme-suggestions.fragment";
import "acme-user-profile";
//import "acme-user-profile.fragment";
import "acme-weather";
//import "acme-weather.fragment";

import { setup } from "./bootstrap";

setup(window, document);
