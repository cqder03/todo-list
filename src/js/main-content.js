import { editProjectModal, editTaskModal } from "../modals";
import { ArangeTasks, activeProject, doneTask, projects } from "./projects-n-tasks";

function removeTasks() {
    let taskWrapper = document.querySelector('.task-wrapper');
        let child = taskWrapper.lastElementChild;
        while (child) {
            taskWrapper.removeChild(child);
            child = taskWrapper.lastElementChild;
        }
}


function displayTask(oneOf) {
    let task = document.createElement('div');
    let taskTextContent = document.createElement('span');
    let taskOptionContainer = document.createElement('div');
    let editTaskBtn = document.createElement('button');
    let doneTaskBtn = document.createElement('button');
    let priorityPreview = document.createElement('button');
    let taskDate = document.createElement('button');

    task.classList.add('task');
    task.setAttribute('id', oneOf.id);
    taskTextContent.classList.add('task-text-content');
    taskOptionContainer.classList.add('task-options-container');
    editTaskBtn.classList.add('edit-task');
    doneTaskBtn.classList.add('done-task');
    priorityPreview.classList.add('priority-preview');
    taskDate.classList.add('task-date');

    taskTextContent.textContent = oneOf.description;
    editTaskBtn.textContent = 'Edit';
    doneTaskBtn.textContent = 'Done';
    priorityPreview.textContent = `${oneOf.priority.slice(0, 1).toUpperCase()}${oneOf.priority.slice(1)}`;
    taskDate.textContent = oneOf.date;
    setPriority(task, oneOf.priority);

    editTaskBtn.addEventListener('click', () => {
        editTaskModal(oneOf.id);
    });

    doneTaskBtn.addEventListener('click', () => {
        doneTask(oneOf.id);
    });

    document.querySelector('.task-wrapper').appendChild(task);
    task.appendChild(taskTextContent);
    task.appendChild(taskOptionContainer);
    taskOptionContainer.appendChild(editTaskBtn);
    taskOptionContainer.appendChild(doneTaskBtn);
    taskOptionContainer.appendChild(priorityPreview);
    taskOptionContainer.appendChild(taskDate);

}

function displayMainContent() {
    removeTasks();
    let defaultFields = document.querySelectorAll('.default-field');
    let addedFields = document.querySelectorAll('.added-field');
    let allFields = Array.prototype.concat.call(...defaultFields , ...addedFields );
    let activeId = projects[activeProject()].id;

    let mainContentTitleBefore = document.querySelector('.main-content-title-before');
    let mainContentTitle = document.querySelector('.main-content-title');
    let mainContentDescription = document.querySelector('.main-content-description');
    let taskWrapper = document.querySelector('.task-wrapper');
    ArangeTasks();

    for (let project of projects) {
        if (project.id === activeId) {
            mainContentTitleBefore.textContent = project.icon;
            mainContentTitle.textContent = project.name;
            mainContentDescription.textContent = project.description;

            for (let task of project.tasks) {
                displayTask(task);
            }
        }
        
    }

}


function setPriority(task, priority) {
    if (priority === 'low') {
        task.classList.add('low-priority')
    } else if (priority === 'medium') {
        task.classList.add('medium-priority')
    } else if (priority === 'high') {
        task.classList.add('high-priority')
    }
}

export {displayMainContent ,displayTask}