import { displayMainContent } from "./main-content";
import { displayProject } from "./sidebar";

const projects = [];

class Project {
  constructor(name, id, description, icon) {
    this.name = name;
    this.id = id;
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
    this.id = `${id}-task-${returnTaskNumber(id)}`;
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

function checkAvailability(id) {
  for (let proj of projects) {
    if (proj.id === id) {
      return true;
    }
  }
}

function activeProject() {
  let defaultFields = document.querySelectorAll(".default-field");
  let addedFields = document.querySelectorAll(".added-field");
  let allFields = Array.prototype.concat.call(...defaultFields, ...addedFields);
  let activeId;
  let activeProjectIndex;

  for (let field of allFields) {
    if (field.getAttribute("class").includes("active")) {
      activeId = field.getAttribute("id");
    }
  }

  for (let project of projects) {
    if (project.id === activeId) {
      activeProjectIndex = projects.indexOf(project);
    }
  }

  return activeProjectIndex;
}

function isDefaultProject(id) {
  if (id === "inbox" || id === "today" || id === "week" || id === "logbook") {
    return true;
  }
}

function doneTask(taskId) {
  for (let project of projects) {
    if (isDefaultProject(project.id)) {
      continue;
    }
    project.tasks.forEach((task) => {
      if (taskId === task.id) {
        let taskIndex = project.tasks.indexOf(task);
        projects[3].addTask(task);
        project.tasks.splice(taskIndex, 1);
      }
    });
  }
  displayMainContent();
}

function deleteTask(taskId) {
  for (let project of projects) {
    if (isDefaultProject(project.id)) {
      continue;
    }
    project.tasks.forEach((task) => {
      if (taskId === task.id) {
        let taskIndex = project.tasks.indexOf(task);
        project.tasks.splice(taskIndex, 1);
      }
    });
    console.log(project.tasks);
  }
}

function ArangeTasks() {
  projects[0].tasks = [];
  for (let project of projects) {
    if (isDefaultProject(project.id)) {
      continue;
    }
    project.tasks.forEach((task) => {
      projects[0].addTask(task);
    });
  }

  projects[1].tasks = [];
  for (let project of projects) {
    if (isDefaultProject(project.id)) {
      continue;
    }
    project.tasks.forEach((task) => {
      let today = new Date();
      let formattedToday = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
      let taskDate = new Date(task.date);
      let formattedTaskDate = `${taskDate.getFullYear()}-${taskDate.getMonth()}-${taskDate.getDate()}`;
      if (formattedToday === formattedTaskDate) {
        projects[1].addTask(task);
      }
    });
  }

  projects[2].tasks = [];
  for (let project of projects) {
    if (isDefaultProject(project.id)) {
      continue;
    }
    project.tasks.forEach((task) => {
      let today = new Date();
      let startOfTheWeek = new Date(today);
      startOfTheWeek.setDate(
        startOfTheWeek.getDate() - startOfTheWeek.getDay()
      );
      let endOfTheWeek = new Date(today);
      endOfTheWeek.setDate(
        endOfTheWeek.getDate() + (6 - endOfTheWeek.getDay())
      );
      let taskDate = new Date(task.date);
      let formattedStartOfTheWeek = `${startOfTheWeek.getFullYear()}-${startOfTheWeek.getMonth()}-${startOfTheWeek.getDate()}`;
      let formattedEndOfTheWeek = `${endOfTheWeek.getFullYear()}-${endOfTheWeek.getMonth()}-${endOfTheWeek.getDate()}`;
      let formattedTaskDate = `${taskDate.getFullYear()}-${taskDate.getMonth()}-${taskDate.getDate()}`;
      if (
        formattedTaskDate >= formattedStartOfTheWeek &&
        formattedTaskDate <= formattedEndOfTheWeek
      ) {
        projects[2].addTask(task);
      }
    });
  }
}

projects.push(
  new Project("Inbox", "inbox", "All created tasks will appear here.", "📥")
);
projects.push(
  new Project(
    "Today",
    "today",
    "All tasks with expiration date of today will appear here",
    "⭐"
  )
);
projects.push(
  new Project(
    "This week",
    "week",
    "All tasks with expiration date of this week will appear here",
    "📅"
  )
);
projects.push(
  new Project(
    "Logbook",
    "logbook",
    "All tasks that are completed will appear here",
    "📒"
  )
);
projects.push(
  new Project(
    "Example project",
    "example-project",
    "Example as default project and place to place tasks that will appear in other categories",
    "[icon]"
  )
);

projects[4].addTask(
  new Task(
    projects[4].id,
    "Random task serving as example and space filler",
    "low",
    "2024-01-21"
  )
);

export {
  projects,
  Project,
  Task,
  checkAvailability,
  activeProject,
  ArangeTasks,
  isDefaultProject,
  doneTask,
  deleteTask,
};
