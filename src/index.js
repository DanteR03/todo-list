import Task from "./task.js";

let task1 = new Task("exampleOne", "exampleDescOne", "01.01.1111", "highest priority");
let task2 = new Task("exampleTwo", "exampleDescTwo", "10.01.1111", "medium priority");
let task3 = new Task("exampleThree", "exampleDescThree", "01.05.1111", "low priority");

console.log(task1, task2, task3);