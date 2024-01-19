import { projects } from "./projects-n-tasks";

function removeTasks() {
    let taskWrapper = document.querySelector('.task-wrapper');
        let child = taskWrapper.lastElementChild;
        while (child) {
            taskWrapper.removeChild(child);
            child = taskWrapper.lastElementChild;
        }
}

function displayMainContent() {
    removeTasks();
    let defaultFields = document.querySelectorAll('.default-field');
    let addedFields = document.querySelectorAll('.added-field');
    let allFields = Array.prototype.concat.call(...defaultFields , ...addedFields );
    let activeId;

    for (let field of allFields) {
        if (field.getAttribute('class').includes('active')) {
            activeId = field.getAttribute('id'); 
        }
    }

    let mainContentTitleBefore = document.querySelector('.main-content-title-before');
    let mainContentTitle = document.querySelector('.main-content-title');
    let mainContentDescription = document.querySelector('.main-content-description');
    let taskWrapper = document.querySelector('.task-wrapper');

    for (let project of projects) {
        if (project.id === activeId) {
            mainContentTitleBefore.textContent = project.icon;
            mainContentTitle.textContent = project.name;
            mainContentDescription.textContent = project.description;
        }
    }

    let div = document.createElement('div');
    div.setAttribute('id', 'added-div');
    div.textContent = `Hi i'm new div of ${activeId} field`;

    document.querySelector('.task-wrapper').appendChild(div);
}

// function displayTask() {
//     let task = document.createElement('div');
//     let taskTextContent = document.createElement('span');
//     let taskOptionContainer = document.createElement('div');
//     let editTaskBtn = document.createElement('button');
//     let doneTaskBtn = document.createElement('button');
//     let priorityPreview = document.createElement('button');
//     let taskDate = document.createElement('input');

//     task.classList.add('task');
//     taskTextContent.classList.add('task-text-content');
//     taskOptionContainer.classList.add('task-option-container');
//     editTaskBtn.classList.add('edit-task');
//     doneTaskBtn.classList.add('done-task');
//     priorityPreview.classList.add('priority-preview');
//     taskDate.classList.add('task-date');

// }


export {displayMainContent}