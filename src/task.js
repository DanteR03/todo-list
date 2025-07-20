export default class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "not completed";
    }

    changeTaskStatus() {
        if (this.status === "not completed") {
            this.status = "completed";
        }
        else {
            this.status = "not completed";
        }
    }

    getTaskInfo(key) {
        return this[key];
    }
}