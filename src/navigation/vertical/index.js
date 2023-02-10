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
import users from "@/navigation/vertical/users";
import services from "@/navigation/vertical/services";
import dealers from "@/navigation/vertical/dealers";
import brands from "@/navigation/vertical/brands";
import years from "@/navigation/vertical/years";
import models from "@/navigation/vertical/models";
import osago from "@/navigation/vertical/osago";
import companies from "@/navigation/vertical/companies";
import travel from "@/navigation/vertical/travel";
import partners from "@/navigation/vertical/partners";

// Array of sections
export default [
    {
        header: 'Страхование',
    },
    ...services,
    ...osago,
    ...travel,
    ...companies,
    {
        header: 'Общее'
    },
    ...partners,
    // ...dealers,
    // ...brands,
    // ...models,
    // ...years,
    // ...roles,
    // ...users,
]
