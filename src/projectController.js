let projects = [];
let activeProject = "";

function addProject(project) {
    projects.push(project);
}

function setActiveProject(projectTitle) {
    projects.forEach((project) => {
        if (project.title === projectTitle) {
            activeProject = project;
        }
    })
}

export { projects, activeProject, addProject, setActiveProject }