export default class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    findTask(key, value) {
        let foundTask = "";
        this.tasks.forEach((task) => {
            if (task[key] === value) {
                foundTask = task;
            }
        });
        return foundTask;
    }

    deleteTask(key, value) {
        let deletedTask = this.findTask(key, value);
        let deletedTaskIndex = this.tasks.indexOf(deletedTask);    
        if (deletedTaskIndex !== -1) {
            this.tasks.splice(deletedTaskIndex, 1);
        }
    }
}