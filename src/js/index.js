import {activateField, addProject, modalState} from '../js/sidebar';


document.querySelector('#middlesidebar').addEventListener('click', (event) => {
    let eventId = event.target.id;
    activateField(eventId);
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