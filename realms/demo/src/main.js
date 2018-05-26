// The page needs to take care of polyfilling the environment to the necessary level
// FIXME: Find a nice way to provide only the necessary polyfills
import "../polyfills/custom-elements.js";
import "../polyfills/custom-event.js";
import "isomorphic-fetch";

import Rye from "rye-core";

// To include an actual pagelet into the initial payload we just
// pull the file and everything should work seamlessly

import "rye-friendlist";
//import "rye-friendlist.pagelet";
import "rye-popular-products";
//import "rye-popular-products.pagelet";
import "rye-suggestions";
//import "rye-suggestions.pagelet";
import "rye-user-profile";
//import "rye-user-profile.pagelet";
import "rye-weather";
//import "rye-weather.pagelet";

import { setup } from "./bootstrap";

setup(window, document);
