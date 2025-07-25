export let projects = [];
export let activeProject = "";

export function addProject(project) {
    projects.push(project);
}

export function setActiveProject(projectId) {
    projects.forEach((project) => {
        if (project.id === projectId) {
            activeProject = project;
        }
    })
}

function findProject(key, value) {
    let foundProject = "";
    projects.forEach((project) => {
        if (project[key] === value) {
            foundProject = project;
        }
    });
    return foundProject;
}

export function deleteProject(key, value) {
    let deletedProject = findProject(key, value);
    let deletedProjectIndex = projects.indexOf(deletedProject);
    if (deletedProjectIndex !== -1) {
        projects.splice(deletedProjectIndex, 1);
    }
}


