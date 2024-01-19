import {activateField, addProject, modalState} from '../js/sidebar';
import { displayMainContent } from './main-content';

document.querySelector('#middlesidebar').addEventListener('click', (event) => {
    let eventId = event.target.id;
    activateField(eventId);
    displayMainContent();
});


document.querySelector('.add-project').addEventListener('click', () => {
    modalState('open');
})

document.querySelector('.cancel').addEventListener('click', () => {
    modalState('close');
})

document.querySelector('.submit').addEventListener('click', () => {
    addProject();
})