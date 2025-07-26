import Task from "./task.js";
import Project from "./projects.js";
import { projects, addProject, activeProject, setActiveProject, deleteProject } from "./projectController.js";
import { format } from "date-fns";

function projectSwitchButton(e) {
    let clickedProjectId = +e.target.parentElement.id;
    setActiveProject(clickedProjectId);
    displayTasks();
}

function projectDeleteButton(e) {
    let clickedProjectId = +e.target.parentElement.id;
    deleteProject("id", clickedProjectId);
    displayProjects();
    displayTasks();
}

function taskDeleteButton(e) {
    let clickedTaskId = +e.target.parentElement.id;
    activeProject.deleteTask("id", clickedTaskId);
    displayTasks();
}

export function displayProjects() {
    let projectContainer = document.querySelector("#project-items-container");
    projectContainer.innerHTML = "";
    let projectItems = projects;
    projectItems.forEach((project) => {
        let itemContainer = document.createElement("div");
        itemContainer.classList.add("project-item");
        itemContainer.id = project.id;
        let titlePara = document.createElement("p");
        titlePara.textContent = project.title;
        let switchButton = document.createElement("button");
        switchButton.textContent = "Switch";
        switchButton.addEventListener("click", (e) => projectSwitchButton(e));
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (e) => projectDeleteButton(e));
        itemContainer.append(titlePara, switchButton, deleteButton);
        projectContainer.append(itemContainer);
    })
}

export function displayTasks() {
    let tasksContainer = document.querySelector("#todo-items-container");
    tasksContainer.innerHTML = "";
    let tasks = activeProject.tasks;
    if (tasks.length > 0) {
        tasks.forEach((task) => {
            let taskContainer = document.createElement("div");
            taskContainer.classList.add("todo-item");
            taskContainer.id = task.id;
            let titlePara = document.createElement("p");
            titlePara.textContent = task.title;
            let descriptionPara = document.createElement("p");
            descriptionPara.textContent = task.description;
            let dueDatePara = document.createElement("p");
            dueDatePara.textContent = task.dueDate;
            let priorityPara = document.createElement("p");
            priorityPara.textContent = task.priority;
            let statusPara = document.createElement("p");
            statusPara.textContent = task.status;
            let editButton = document.createElement("button");
            editButton.textContent = "Edit";
            let deleteButton = document.createElement("button");
            deleteButton.addEventListener("click", (e) => taskDeleteButton(e));
            deleteButton.textContent = "Delete";
            taskContainer.append(titlePara, descriptionPara, dueDatePara, priorityPara, statusPara, editButton, deleteButton);
            tasksContainer.append(taskContainer);
        })
    }
}

function taskSubmitButton(e) {
    e.preventDefault();
    let taskFormTitle = document.querySelector("#task-form-modal #title");
    let taskFormDescription = document.querySelector("#task-form-modal #description");
    let taskFormDueDate = document.querySelector("#task-form-modal #dueDate");
    let taskFormDueDateFormatted = format(new Date(taskFormDueDate.value), "dd-MM-yyyy");
    let taskFormPriority = document.querySelector("#task-form-modal #priority");
    if (taskFormTitle.checkValidity() === false) {
        taskFormTitle.reportValidity();
    } else {
        activeProject.addTask(new Task(taskFormTitle.value, taskFormDescription.value, taskFormDueDateFormatted, taskFormPriority.value));
        Task.incrementIdCounter();
        displayTasks();
        taskFormTitle.value = "";
        taskFormDescription.value = "";
        taskFormDueDate.value = "1111-01-01";
        taskFormPriority.value = "high";
        newTaskModal.close();
    };
}

function taskCloseButton(e) {
    e.preventDefault();
    newTaskModal.close();
}

function projectSubmitButton(e) {
    e.preventDefault();
    let projectFormTitle = document.querySelector("#project-form-modal #title");
    if (projectFormTitle.checkValidity() === false) {
        projectFormTitle.reportValidity();
    } else {
        addProject(new Project(projectFormTitle.value));
        Project.incrementIdCounter();
        displayProjects();
        projectFormTitle.value = "";
        newProjectModal.close();
    };
}

function projectCloseButton(e) {
    e.preventDefault();
    newProjectModal.close();
}



let taskButton = document.querySelector("#add-task-button");
let newTaskModal = document.querySelector("#task-form-modal");
let projectButton = document.querySelector("#add-project-button");
let newProjectModal = document.querySelector("#project-form-modal");
taskButton.addEventListener("click", () => newTaskModal.showModal());
projectButton.addEventListener("click", () => newProjectModal.showModal());
let taskSubmitButtons = document.querySelector("#task-form-modal .form-submit-button");
let taskCloseButtons = document.querySelector("#task-form-modal .form-close-button");
taskSubmitButtons.addEventListener("click", (e) => taskSubmitButton(e));
taskCloseButtons.addEventListener("click", (e) => taskCloseButton(e));
let projectSubmitButtons = document.querySelector("#project-form-modal .form-submit-button");
let projectCloseButtons = document.querySelector("#project-form-modal .form-close-button");
projectSubmitButtons.addEventListener("click", (e) => projectSubmitButton(e));
projectCloseButtons.addEventListener("click", (e) => projectCloseButton(e));