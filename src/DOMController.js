import Task from "./task.js";
import Project from "./projects.js";
import { projects, addProject, activeProject, setActiveProject, deleteProject } from "./projectController.js";
import { format } from "date-fns";

let editTaskModal = document.querySelector("#edit-task-form-modal");
let newTaskModal = document.querySelector("#task-form-modal");
let newProjectModal = document.querySelector("#project-form-modal");


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

function taskDetailsButton(e) {
    let clickedTaskId = +e.target.parentElement.id;
    let clickedTask = activeProject.findTask("id", clickedTaskId);
    let editTaskForm = document.querySelector("#edit-task-form-modal");
    editTaskForm.dataset.taskId = clickedTaskId;
    let taskFormTitle = document.querySelector("#edit-task-form-modal #title");
    taskFormTitle.value = clickedTask.title;
    let taskFormDescription = document.querySelector("#edit-task-form-modal #description");
    taskFormDescription.value = clickedTask.description;
    let taskFormDueDate = document.querySelector("#edit-task-form-modal #dueDate");
    taskFormDueDate.value = clickedTask.dueDate;
    let taskFormPriority = document.querySelector("#edit-task-form-modal #priority");
    taskFormPriority.value = clickedTask.priority;
    let taskFormStatus = document.querySelector("#edit-task-form-modal #status");
    if (clickedTask.completed === false) {
        taskFormStatus.checked = false
    } else {
        taskFormStatus.checked = true
    }
    editTaskForm.showModal();
}

function displayProjects() {
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

function displayTasks() {
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
            let dueDateFormatted = format(task.dueDate, "yyyy-MM-dd");
            dueDatePara.textContent = dueDateFormatted;
            let priorityPara = document.createElement("p");
            priorityPara.textContent = task.priority;
            let statusPara = document.createElement("p");
            if (task.completed === false) {
                statusPara.textContent = "not completed"
            } else {
                statusPara.textContent = "completed"
            }
            let editButton = document.createElement("button");
            editButton.addEventListener("click", (e) => taskDetailsButton(e));
            editButton.textContent = "Details";
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
    let taskFormPriority = document.querySelector("#task-form-modal #priority");
    if (taskFormTitle.checkValidity() === false) {
        taskFormTitle.reportValidity();
    } else {
        activeProject.addTask(new Task(taskFormTitle.value, taskFormDescription.value, taskFormDueDate.value, taskFormPriority.value));
        Task.incrementIdCounter();
        displayTasks();
        taskFormTitle.value = "";
        taskFormDescription.value = "";
        taskFormDueDate.value = format(new Date(), "yyyy-MM-dd");
        taskFormPriority.value = "high";
        newTaskModal.close();
    };
}

function taskCloseButton(e) {
    e.preventDefault();
    newTaskModal.close();
}

function editTaskSubmitButton(e) {
    e.preventDefault();
    let editTaskForm = document.querySelector("#edit-task-form-modal");
    let editedTask = activeProject.findTask("id", +editTaskForm.dataset.taskId);
    let taskFormTitle = document.querySelector("#edit-task-form-modal #title");
    let taskFormDescription = document.querySelector("#edit-task-form-modal #description");
    let taskFormDueDate = document.querySelector("#edit-task-form-modal #dueDate");
    let taskFormPriority = document.querySelector("#edit-task-form-modal #priority");
    let taskFormStatus = document.querySelector("#edit-task-form-modal #status");
    if (taskFormTitle.checkValidity() === false) {
        taskFormTitle.reportValidity();
    } else {
        editedTask.changeTaskInfo("title", taskFormTitle.value);
        editedTask.changeTaskInfo("description", taskFormDescription.value);
        editedTask.changeTaskInfo("dueDate", taskFormDueDate.value);
        editedTask.changeTaskInfo("priority", taskFormPriority.value);
        if (taskFormStatus.checked) {
            editedTask.changeTaskInfo("completed", true)
        } else {
            editedTask.changeTaskInfo("completed", false)
        }
        editTaskForm.dataset.taskId = "";
        displayTasks();
        editTaskForm.close();
    }
}

function editTaskCloseButton(e) {
    e.preventDefault();
    editTaskModal.close();
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

export function initializeDOM() {
    let taskButton = document.querySelector("#add-task-button");
    let projectButton = document.querySelector("#add-project-button");
    let taskSubmitButtons = document.querySelector("#task-form-modal .form-submit-button");
    let taskCloseButtons = document.querySelector("#task-form-modal .form-close-button");
    let projectSubmitButtons = document.querySelector("#project-form-modal .form-submit-button");
    let projectCloseButtons = document.querySelector("#project-form-modal .form-close-button");
    let editTaskSubmitButtons = document.querySelector("#edit-task-form-modal .form-submit-button");
    let editTaskCloseButtons = document.querySelector("#edit-task-form-modal .form-close-button");
    taskButton.addEventListener("click", () => newTaskModal.showModal());
    projectButton.addEventListener("click", () => newProjectModal.showModal());
    taskSubmitButtons.addEventListener("click", (e) => taskSubmitButton(e));
    taskCloseButtons.addEventListener("click", (e) => taskCloseButton(e));
    projectSubmitButtons.addEventListener("click", (e) => projectSubmitButton(e));
    projectCloseButtons.addEventListener("click", (e) => projectCloseButton(e));
    editTaskCloseButtons.addEventListener("click", (e) => editTaskCloseButton(e));
    editTaskSubmitButtons.addEventListener("click", (e) => editTaskSubmitButton(e));
    addProject(new Project("Default"));
    Project.incrementIdCounter();
    setActiveProject(0);
    activeProject.addTask(new Task("Default", "Default", format(new Date(), "yyyy-MM-dd"), "medium"));
    Task.incrementIdCounter();
    displayProjects();
    displayTasks();
}