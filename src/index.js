import Task from "./task.js";
import Project from "./projects.js";
import "./styles.css";
import { projects, addProject, activeProject, setActiveProject } from "./projectController.js";
import { displayProjects, displayTasks } from "./DOMController.js";

let defaultProject = new Project("Default");

let task1 = new Task("exampleOne", "exampleDescOne", "01.01.1111", "highest priority");
let task2 = new Task("exampleTwo", "exampleDescTwo", "10.01.1111", "medium priority");
let task3 = new Task("exampleThree", "exampleDescThree", "01.05.1111", "low priority");

defaultProject.addTask(task1);
defaultProject.addTask(task2);
defaultProject.addTask(task3);

addProject(defaultProject);
setActiveProject("Default");
console.log(activeProject);

displayProjects();
displayTasks();


