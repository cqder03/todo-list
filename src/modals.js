import { Task } from "./js/projects-n-tasks";

function editProjectModal() {
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
}

function deleteProjectModal() {
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
}

function editTaskModal() {

}

function addTaskModal() {
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
            alert('You submited task');
        }
    });

    document.querySelector('#main-content').appendChild(addTaskModal);
}
export {editProjectModal, deleteProjectModal, addTaskModal};