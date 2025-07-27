export default class Task {
    static #idCounter = 0;

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.id = Task.#idCounter;
    }

    static incrementIdCounter() {
        Task.#idCounter++
    }

    changeTaskInfo(key, value) {
        this[key] = value;
    }

    getTaskInfo(key) {
        return this[key];
    }
}