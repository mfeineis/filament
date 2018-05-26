// The page needs to take care of polyfilling the environment to the necessary level
// FIXME: Find a nice way to provide only the necessary polyfills
import "../polyfills/custom-elements.js";
import "../polyfills/custom-event.js";
import "isomorphic-fetch";

import Rye from "rye-core";

// To include an actual pagelet into the initial payload we just
// pull the file and everything should work seamlessly

import "acme-friendlist";
//import "acme-friendlist.pagelet";
import "acme-popular-products";
//import "acme-popular-products.pagelet";
import "acme-suggestions";
//import "acme-suggestions.pagelet";
import "acme-user-profile";
//import "acme-user-profile.pagelet";
import "acme-weather";
//import "acme-weather.pagelet";

import { setup } from "./bootstrap";

setup(window, document);
