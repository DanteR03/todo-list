import Task from "./task.js";
import Project from "./projects.js";
import { projects } from "./projectController.js";

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        );
    }
}

export function storeProjects() {
        console.log(JSON.stringify(projects))
}

export function getProjects() {
    return localStorage.getItem("storedProjects");
}
