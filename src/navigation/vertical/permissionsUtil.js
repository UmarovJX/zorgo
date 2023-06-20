import { getLocalVar } from "@/util/localstorage-helper";
const perms = {};
JSON.parse(getLocalVar("userData")).permissions.forEach((el) => {
    perms[el.slug] = true;
});

export default perms;