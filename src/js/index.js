import {
  activateField,
  addProject,
  displayProject,
  modalState,
} from "../js/sidebar";
import {
  editProjectModal,
  deleteProjectModal,
  addTaskModal,
  deleteLocalStorageModal,
} from "./modals";
import { Task, isDefaultProject, projects } from "./projects-n-tasks";
import { Project } from "./projects-n-tasks";

if (!localStorage.getItem("projects")) {
  console.log("Failed loading local storage projects");
  localStorage.setItem("projects", JSON.stringify(projects));
  for (let i = 4; i < projects.length; i++) {
    displayProject(projects[i].id, projects[i].name, projects[i].icon);
  }
  activateField("inbox");
} else {
  console.log(projects);
  for (let i = projects.length - 1; i >= 0; i--) {
    projects.pop();
  }

  projects.push(...JSON.parse(localStorage.getItem("projects")));

  for (let project of projects) {
    Object.setPrototypeOf(project, Project.prototype);
    if (isDefaultProject(project)) {
      continue;
    }

    for (let task of project.tasks) {
      Object.setPrototypeOf(task, Task);
    }
  }

  for (let i = 4; i < projects.length; i++) {
    displayProject(projects[i].id, projects[i].name, projects[i].icon);
  }

  activateField("inbox");
}

document.querySelector(".button1").addEventListener("click", () => {
  deleteLocalStorageModal();
});

document.querySelector("#middlesidebar").addEventListener("click", (event) => {
  let eventId = event.target.id;
  activateField(eventId);
});

document.querySelector("#add-project").addEventListener("click", () => {
  let modalClass = document
    .querySelector("#add-project-modal")
    .getAttribute("class");
  if (modalClass.includes("closed-modal")) {
    modalState("open");
  } else {
    modalState("close");
  }
});

document
  .querySelector("#add-project-modal")
  .addEventListener("click", (event) => {
    let targetId = event.target.id;

    if (targetId === "submit") {
      addProject();
    } else if (targetId === "cancel") {
      modalState("close");
    }
  });

document.querySelector("#footer").addEventListener("click", (event) => {
  let targetId = event.target.id;

  if (targetId === "add-task") {
    addTaskModal();
  } else if (targetId === "edit-project") {
    editProjectModal();
  } else if (targetId === "delete-project") {
    deleteProjectModal();
  }
});
