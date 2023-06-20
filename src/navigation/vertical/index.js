/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
import roles from "@/navigation/vertical/roles";
import cars from "@/navigation/vertical/cars";
import insurance from "@/navigation/vertical/insurance";
import common from "@/navigation/vertical/common";
import marketplace from "@/navigation/vertical/marketplace";

const userData = JSON.parse(localStorage.getItem("userData"));

let array = [...common, ...insurance, ...marketplace, ...cars, ...roles];

// Array of sections
export default array;
