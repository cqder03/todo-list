const projects = [];

class Project {
    constructor(name, id, description, icon) {
        this.name = name;
        this.id = id,
        this.description = description;
        this.icon = icon;
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
    }
}

class Task {
    constructor(id, description, priority, date) {
        this.id = `task-${returnTaskNumber(id)}`;
        this.description = description;
        this.priority = priority;
        this.date = date;
    }
}

function returnTaskNumber(id) {
    for (let project of projects) {
        if (project.id === id) {
            return project.tasks.length + 1;
        }
    }
}

function checkDuplicate(id) {
    for (let proj of projects) {
        if (proj.id === id) {
            return true;
        } 
    }
}

projects.push(new Project('Inbox', 'inbox', 'All created tasks will appear here.', '📥'));
projects.push(new Project('Today', 'today', 'All tasks with expiration date of today will appear here', '⭐'));
projects.push(new Project('This week', 'week', 'All tasks with expiration date of this week will appear here', '📅'));
projects.push(new Project('Logbook', 'logbook', 'All tasks that are complited will appear here', '📒'));


projects[0].addTask(new Task(projects[0].id, 'Adding random description for the first task this can also be considered a name of the task',
'low', '2024-03-21'));
projects[0].addTask(new Task(projects[0].id, 'Adding random description for the first task this can also be considered a name of the task',
'medium', '2024-03-21'));
projects[0].addTask(new Task(projects[0].id, 'Adding random description for the first task this can also be considered a name of the task',
'low', '2024-03-21'));
export {projects, Project, checkDuplicate}