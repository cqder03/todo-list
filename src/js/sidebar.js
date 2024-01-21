import { displayMainContent } from './main-content';
import { projects, Project, checkAvailability} from './projects-n-tasks';

function activateField(id) {
    let defaultIds = [];
    document.querySelectorAll('.default-field').forEach((field) => defaultIds.push(field.getAttribute('id')));
    let addedIds = [];
    document.querySelectorAll('.added-field').forEach((field) => addedIds.push(field.getAttribute('id')));

    if (defaultIds.includes(id) || addedIds.includes(id)) {
        activeField(id);
        displayMainContent()
    }
}

function activeField(field) {
    let defaultFields = document.querySelectorAll('.default-field');
    let addedFields = document.querySelectorAll('.added-field');
    let allFields = Array.prototype.concat.call(...defaultFields , ...addedFields);
    
    allFields.forEach(element => {
        element.classList.remove('active');
    });

    document.querySelector(`#${field}`).classList.add('active');
}

function addProject() {
    
    const projectName = document.querySelector('#add-project-name').value;
    const projectDescription = document.querySelector('#add-project-description').value;
    const project = document.createElement('div');
    const iconHolder = document.createElement('span');
    const textHolder = document.createElement('span');
    let id = setProjectId(projectName);;

     
    
     if (checkAvailability(id)) {
        alert('You can\'t use the same name as old pojects');
        document.querySelector('#add-project-name').value = '';
        return;
     }

     if (projectName === '') {
        alert('You need to enter project name'); 
        return;
     } else if (projectDescription === '') {
        alert('You need to enter project description');
        return;
     }

    project.setAttribute('id', id);
    project.classList.add('added-field');

    iconHolder.textContent = '[icon]';
    iconHolder.classList.add('iconHolderSpan');
    
    textHolder.textContent = projectName;
    textHolder.classList.add('textHolderSpan');

    
    document.querySelector('.added-fields').appendChild(project);
    project.appendChild(iconHolder);
    project.appendChild(textHolder);
    
    projects.push(new Project(projectName, id, projectDescription, '[icon]'));
    modalState('close');
}

function modalState(state) {
    
    if (state === 'close') {
    document.querySelector('#add-project-name').value = '';
    document.querySelector('#add-project-description').value = '';
    document.querySelector('#add-project-modal').classList.add('closed-modal');
    } else if (state = 'open') {
        document.querySelector('#add-project-modal').classList.remove('closed-modal');
    }
}

function setProjectId(projectName) {
    if (projectName.includes(' ')) {
        return projectName.replaceAll(' ', '-').toLowerCase();
     } else {
        return projectName.toLowerCase();
     }
}

export {activateField, addProject, modalState, setProjectId};