import {activateField, addProject, modalState} from '../js/sidebar';
import {editProjectModal, deleteProjectModal, addTaskModal} from '../modals';
import { projects } from './projects-n-tasks';

activateField('inbox');

document.querySelector('#middlesidebar').addEventListener('click', (event) => {
    let eventId = event.target.id;
    activateField(eventId);
    
});

document.querySelector('#add-project').addEventListener('click', () => {
    let modalClass = document.querySelector('#add-project-modal').getAttribute('class');
    if (modalClass.includes('closed-modal')) {
        modalState('open');
    } else {
        modalState('close');
    }
    
});



document.querySelector('#add-project-modal').addEventListener('click', (event) => {
    let targetId = event.target.id;

     if (targetId === 'submit') {
        addProject();
    } else if (targetId === 'cancel') {
        modalState('close');
    }
})

document.querySelector('#footer').addEventListener('click', (event) => {
    let targetId = event.target.id;

    if (targetId === 'add-task') {
        addTaskModal();
    } else if (targetId === 'edit-project') {
        editProjectModal();
    } else if (targetId === 'delete-project') {
        deleteProjectModal();
    }
});
