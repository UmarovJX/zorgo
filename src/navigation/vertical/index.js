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
import dealers from "@/navigation/vertical/dealers";
import brands from "@/navigation/vertical/brands";
import years from "@/navigation/vertical/years";
import models from "@/navigation/vertical/models";
import insurance from "@/navigation/vertical/insurance";
import common from "@/navigation/vertical/common";

const userData = JSON.parse(localStorage.getItem('userData'))

let array = []
if (userData.role.id === 2) {
    array = [
        {
            header: 'Страхование'
        },
        {
            title: 'Осаго',
            route: 'osago',
            icon: 'FileIcon'
        },
        {
            title: 'Путешествие',
            route: 'travel',
            icon: 'FileIcon'
        },
    ]
} else {
    array = [
        ...insurance,
        ...common,
        // ...dealers,
        // ...brands,
        // ...models,
        // ...years,
        ...roles,
        ...users,
    ]
}
// Array of sections
export default array
