import { getLocalVar } from "@/util/localstorage-helper";

export default function (tag) {
    return {
        isCreateAvailable() {
            return JSON.parse(getLocalVar("userData")).permissions.some(
                (el) => el.slug === "create-" + tag
            );
        },
        isUpdateAvailable() {
            return JSON.parse(getLocalVar("userData")).permissions.some(
                (el) => el.slug === "update-" + tag
            );
        },
        isDeleteAvailable() {
            return JSON.parse(getLocalVar("userData")).permissions.some(
                (el) => el.slug === "delete-" + tag
            );
        },
    };
}
