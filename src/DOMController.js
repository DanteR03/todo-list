import Task from "./task.js";
import Project from "./projects.js";
import { projects, addProject, activeProject, setActiveProject } from "./projectController.js";

export function displayProjects() {
    let projectContainer = document.querySelector("#project-items-container");
    let projectItems = projects;
    projectItems.forEach((project) => {
        let itemContainer = document.createElement("div");
        itemContainer.classList.add("project-item");
        let titlePara = document.createElement("p");
        titlePara.textContent = project.title;
        let switchButton = document.createElement("button");
        switchButton.textContent = "Switch";
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        itemContainer.append(titlePara, switchButton, deleteButton);
        projectContainer.append(itemContainer);
    })
}

export function displayTasks() {
    let tasksContainer = document.querySelector("#todo-items-container");
    let tasks = activeProject.tasks;
    tasks.forEach((task) => {
        let taskContainer = document.createElement("div");
        taskContainer.classList.add("todo-item");
        let titlePara = document.createElement("p");
        titlePara.textContent = task.title;
        let descriptionPara = document.createElement("p");
        descriptionPara.textContent = task.description;
        let dueDatePara = document.createElement("p");
        dueDatePara.textContent = task.dueDate;
        let priorityPara = document.createElement("p");
        priorityPara.textContent = task.priority;
        let statusPara = document.createElement("p");
        statusPara.textContenr = task.status;
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        taskContainer.append(titlePara, descriptionPara, dueDatePara, priorityPara, statusPara, editButton, deleteButton);
        tasksContainer.append(taskContainer);
    })
}

let taskButton = document.querySelector("#add-task-button");
let newTaskModal = document.querySelector("#task-form-modal");
taskButton.addEventListener("click", () => newTaskModal.showModal());