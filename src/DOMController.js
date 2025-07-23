import Task from "./task.js";
import Project from "./projects.js";
import { projects, addProject, activeProject, setActiveProject } from "./projectController.js";

export function displayProjects() {
    let projectContainer = document.querySelector("#project-items-container");
    let projectItems = projects;
    projectItems.forEach((project) => {
        let itemContainer = document.createElement("div");
        itemContainer.id = "project-item";
        let titlePara = document.createElement("p");
        titlePara = project.title;
        let switchButton = document.createElement("button");
        switchButton.textContent = "Switch";
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        itemContainer.append(titlePara, switchButton, deleteButton);
        projectContainer.append(itemContainer);
    })
}