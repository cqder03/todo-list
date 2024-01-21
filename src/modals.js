import { isDefaultProject, projects, Task } from "./js/projects-n-tasks";
import { displayMainContent, displayTask } from "./js/main-content";
import { activateField } from "./js/sidebar";
import { activeProject } from "./js/projects-n-tasks";

function editProjectModal() {
    let activeId = projects[activeProject()].id;

    if (isDefaultProject(activeId)) {
        alert('You can only edit added projects');
        return;
    }
    
    const editProjectModal = document.createElement('div');
    const modalControls = document.createElement('div');
    const namePara = document.createElement('p');
    const iconPara = document.createElement('p');
    const descriptionPara = document.createElement('p');
    const nameInput = document.createElement('input');
    const iconInput = document.createElement('input');
    const descriptionArea = document.createElement('textarea');
    const cancelButton = document.createElement('button');
    const submitButton = document.createElement('button');
    
    editProjectModal.setAttribute('id', 'edit-project-modal');
    modalControls.setAttribute('id', 'modal-controls');
    descriptionArea.setAttribute('id', 'edit-project-description');
    descriptionPara.setAttribute('class', 'edit-project-para');
    namePara.setAttribute('class', 'edit-project-para');
    iconPara.setAttribute('class', 'edit-project-para');
    nameInput.setAttribute('id', 'edit-project-name');
    iconInput.setAttribute('id', 'edit-project-icon');
    cancelButton.setAttribute('id', 'cancel-modal');
    submitButton.setAttribute('id', 'submit-modal');


    descriptionPara.textContent = 'Edit project description';
    namePara.textContent = 'Change project name';
    iconPara.textContent = 'Change project icon';
    cancelButton.textContent = 'Cancel';
    submitButton.textContent = 'Submit';
    nameInput.value = projects[activeProject()].name;
    iconInput.value = projects[activeProject()].icon;
    descriptionArea.textContent = projects[activeProject()].description;

    editProjectModal.appendChild(namePara);
    editProjectModal.appendChild(nameInput);
    editProjectModal.appendChild(iconPara);
    editProjectModal.appendChild(iconInput);
    editProjectModal.appendChild(descriptionPara);
    editProjectModal.appendChild(descriptionArea);
    editProjectModal.appendChild(modalControls);
    modalControls.appendChild(cancelButton);
    modalControls.appendChild(submitButton);

    document.querySelector('#main-content').appendChild(editProjectModal);

    modalControls.addEventListener('click', (event) => {
        let eventId = event.target.id;

        if (eventId === 'cancel-modal') {
            document.querySelector('#main-content').removeChild(editProjectModal);
        } else if (eventId === 'submit-modal') {
            if (nameInput.value === '' || iconInput.value || descriptionArea === '') {
                alert('All fields need to be filled up');
                return;
            }
            projects[activeProject()].name = nameInput.value;
            projects[activeProject()].icon = iconInput.value;
            projects[activeProject()].description = descriptionArea.value;
            document.querySelector(`div#${projects[activeProject()].id} > .iconHolderSpan`).textContent = iconInput.value;
            document.querySelector(`div#${projects[activeProject()].id} > .textHolderSpan`).textContent = nameInput.value;
            displayMainContent();
            document.querySelector('#main-content').removeChild(editProjectModal);
        }
    });
}

function deleteProjectModal() {
    let activeId = projects[activeProject()].id;

    if (isDefaultProject(activeId)) {
        alert('You can only delete added projects');
        return;
    }

    const deleteProjectModal = document.createElement('div');
    const modalControls = document.createElement('div');
    const deleteProjectPara = document.createElement('p');
    const cancelButton = document.createElement('button');
    const submitButton = document.createElement('button');
    
    deleteProjectModal.setAttribute('id', 'delete-project-modal');
    modalControls.setAttribute('id', 'delete-modal-controls');
    deleteProjectPara.setAttribute('class', 'delete-project-para');
    cancelButton.setAttribute('id', 'cancel-modal');
    submitButton.setAttribute('id', 'submit-modal');

    deleteProjectPara.textContent = 'Are you sure you want to delete this project?';
    cancelButton.textContent = 'Cancel';
    submitButton.textContent = 'Submit';

    deleteProjectModal.appendChild(deleteProjectPara);
    deleteProjectModal.appendChild(modalControls);
    modalControls.appendChild(cancelButton);
    modalControls.appendChild(submitButton);

    document.querySelector('#main-content').appendChild(deleteProjectModal);

    modalControls.addEventListener('click', (event) => {
        let eventId = event.target.id;

        if (eventId === 'cancel-modal') {
            document.querySelector('#main-content').removeChild(deleteProjectModal);
        } else if (eventId === 'submit-modal') {
            
            let active = activeProject();
            document.querySelector(`#${projects[active].id}`).remove();
            activateField('inbox');
            projects.splice(active, 1);
            document.querySelector('#main-content').removeChild(deleteProjectModal);
            displayMainContent();
        }
    });

}

function editTaskModal(id) {
    const editTaskModal = document.createElement('div');
    const modalControls = document.createElement('div');
    const descriptionArea = document.createElement('textarea');
    const descriptionPara = document.createElement('p');
    const datePara = document.createElement('p');
    const taskPara = document.createElement('p');
    const datePicker = document.createElement('input');
    const prioritySelector = document.createElement('select');
    const lowP = document.createElement('option');
    const mediumP = document.createElement('option');
    const highP = document.createElement('option');
    const cancelButton = document.createElement('button');
    const submitButton = document.createElement('button');
    let taskParent = document.querySelector(`#${id}`);
    
    editTaskModal.setAttribute('id', 'add-task-modal');
    modalControls.setAttribute('id', 'modal-controls');
    descriptionArea.setAttribute('id', 'add-task-description');
    datePicker.setAttribute('type', 'date');
    datePicker.setAttribute('id', 'task-date');
    descriptionPara.setAttribute('class', 'add-task-para');
    datePara.setAttribute('class', 'add-task-para');
    taskPara.setAttribute('class', 'add-task-para');
    prioritySelector.setAttribute('id', 'priority-selector');
    lowP.value = 'low';
    mediumP.value = 'medium';
    highP.value = 'high';
    cancelButton.setAttribute('id', 'cancel-modal');
    submitButton.setAttribute('id', 'submit-modal');
    
    descriptionPara.textContent = 'Enter task description';
    datePara.textContent = 'Enter date';
    taskPara.textContent = 'Select priority';
    lowP.textContent = 'Low';
    mediumP.textContent = 'Medium';
    highP.textContent = 'High';
    cancelButton.textContent = 'Cancel';
    submitButton.textContent = 'Submit';

    descriptionArea.textContent = taskParent.querySelector('.task-text-content').textContent;
    datePicker.value = taskParent.querySelector('.task-date').textContent;

    if (taskParent.querySelector(".priority-preview").textContent === 'Low') {
        lowP.setAttribute('selected', 'selected');
    } else if (taskParent.querySelector(".priority-preview").textContent === 'Medium') {
        mediumP.setAttribute('selected', 'selected');
    } else if (taskParent.querySelector(".priority-preview").textContent === 'High') {
        highP.setAttribute('selected', 'selected');
    }

    let activeTaskIndex;
    for (let task of projects[activeProject()].tasks) {
        if (task.id === id) {
            activeTaskIndex = projects[activeProject()].tasks.indexOf(task);
        }
    }
    
    editTaskModal.appendChild(descriptionPara);
    editTaskModal.appendChild(descriptionArea);
    editTaskModal.appendChild(datePara);
    editTaskModal.appendChild(datePicker);
    editTaskModal.appendChild(taskPara);
    editTaskModal.appendChild(prioritySelector);
    editTaskModal.appendChild(modalControls);
    prioritySelector.appendChild(lowP);
    prioritySelector.appendChild(mediumP);
    prioritySelector.appendChild(highP);
    modalControls.appendChild(cancelButton);
    modalControls.appendChild(submitButton);

    modalControls.addEventListener('click', (event) => {
        let eventId = event.target.id;
        
        if (eventId === 'cancel-modal') {
            document.querySelector('#main-content').removeChild(editTaskModal);
        } else if (eventId === 'submit-modal') {
            if (datePicker.value === '' || descriptionArea.value === '') {
                alert('All fields need to be filled');
                return;
            }
            projects[activeProject()].tasks[activeTaskIndex].description = descriptionArea.value;            
            projects[activeProject()].tasks[activeTaskIndex].priority = prioritySelector.value;
            projects[activeProject()].tasks[activeTaskIndex].date = datePicker.value;
            displayMainContent();
            document.querySelector('#main-content').removeChild(editTaskModal);
        }
    });

    document.querySelector('#main-content').appendChild(editTaskModal);
}

function addTaskModal() {
    let activeId = projects[activeProject()].id;

    if (isDefaultProject(activeId)) {
        alert('You can only add tasks in added projects');
        return;
    }

    const addTaskModal = document.createElement('div');
    const modalControls = document.createElement('div');
    const descriptionArea = document.createElement('textarea');
    const descriptionPara = document.createElement('p');
    const datePara = document.createElement('p');
    const taskPara = document.createElement('p');
    const datePicker = document.createElement('input');
    const prioritySelector = document.createElement('select');
    const lowP = document.createElement('option');
    const mediumP = document.createElement('option');
    const highP = document.createElement('option');
    const cancelButton = document.createElement('button');
    const submitButton = document.createElement('button');
    
    addTaskModal.setAttribute('id', 'add-task-modal');
    modalControls.setAttribute('id', 'modal-controls');
    descriptionArea.setAttribute('id', 'add-task-description');
    datePicker.setAttribute('type', 'date');
    datePicker.setAttribute('id', 'task-date');
    descriptionPara.setAttribute('class', 'add-task-para');
    datePara.setAttribute('class', 'add-task-para');
    taskPara.setAttribute('class', 'add-task-para');
    prioritySelector.setAttribute('id', 'priority-selector');
    lowP.value = 'low';
    mediumP.value = 'medium';
    highP.value = 'high';
    cancelButton.setAttribute('id', 'cancel-modal');
    submitButton.setAttribute('id', 'submit-modal');
    
    descriptionPara.textContent = 'Enter task description';
    datePara.textContent = 'Enter date';
    taskPara.textContent = 'Select priority';
    lowP.textContent = 'Low';
    mediumP.textContent = 'Medium';
    highP.textContent = 'High';
    cancelButton.textContent = 'Cancel';
    submitButton.textContent = 'Submit';
    
    addTaskModal.appendChild(descriptionPara);
    addTaskModal.appendChild(descriptionArea);
    addTaskModal.appendChild(datePara);
    addTaskModal.appendChild(datePicker);
    addTaskModal.appendChild(taskPara);
    addTaskModal.appendChild(prioritySelector);
    addTaskModal.appendChild(modalControls);
    prioritySelector.appendChild(lowP);
    prioritySelector.appendChild(mediumP);
    prioritySelector.appendChild(highP);
    modalControls.appendChild(cancelButton);
    modalControls.appendChild(submitButton);
    
    modalControls.addEventListener('click', (event) => {
        let eventId = event.target.id;
        
        if (eventId === 'cancel-modal') {
            document.querySelector('#main-content').removeChild(addTaskModal);
        } else if (eventId === 'submit-modal') {
            if (datePicker.value === '' || descriptionArea.value === '') {
                alert('All fields need to be filled');
                return;
            }
            projects[activeProject()].addTask(new Task(projects[activeProject()].id, descriptionArea.value, prioritySelector.value, datePicker.value));
            displayTask(projects[activeProject()].tasks[projects[activeProject()].tasks.length - 1], projects[activeProject()].id);
            document.querySelector('#main-content').removeChild(addTaskModal);
        }
    });

    document.querySelector('#main-content').appendChild(addTaskModal);
}



export {editProjectModal, deleteProjectModal, addTaskModal, editTaskModal};