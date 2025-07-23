export let projects = [];
export let activeProject = "";

export function addProject(project) {
    projects.push(project);
}

export function setActiveProject(projectTitle) {
    projects.forEach((project) => {
        if (project.title === projectTitle) {
            activeProject = project;
        }
    })
}
