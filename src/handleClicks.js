import { formElement } from './getDomElements';
import { addProjectBtn } from './getDomElements';
import {
  showProjectForm,
  showActivityForm,
  hideForm,
  checkElementCount,
} from './handleFormToggle';
import {
  handleActivityEdit,
  handleActivityDelete,
  handleProjectDelete,
  checkPriorityValue,
  addProject,
  addActivity,
  saveActivityEdit
} from './coreLogic';
import {
  populateProject,
  populateActivities,
  createInnerDisplay,
  createActivitiesDisplay,
  displayActivityEdit,
  deletePostIt,
} from './createElements';
import { items } from '.';
import { exitBtn } from './getDomElements';
import { projectDisplay } from './getDomElements';
import { priority } from './getDomElements';
import { details } from './getDomElements';
export let editIndex = null;
export let newTask = false;
export let editPostIt = false;
let tasks = null;
export let state = null;
export function handleClicks() {
  let projectId;
  addProjectBtn.addEventListener('click', () => {
    showProjectForm();
    checkPriorityValue(priority);
    state = 'project';
  });

  [projectDisplay, details].forEach((el) => {
    if (el) {
      el.addEventListener('click', (event) => {
        if (
          event.target.classList.contains('projectId') ||
          event.target.closest('.projectId')
        ) {
          checkElementCount(
            event.target.closest('[data-unique-info]').dataset.uniqueInfo
          );
        }
        if (event.target.classList.contains('activityAddBtn')) {
          showActivityForm();
          checkPriorityValue(priority);
          state = 'activity';
          newTask = true;
          editPostIt = false;
          projectId = event.target.closest('[data-unique-info]').id;
        }
        if (
          event.target.classList.contains('activityEditBtn') ||
          (event.target.parentElement &&
            event.target.parentElement.classList.contains('activityEditBtn'))
        ) {
          newTask = false;
          editIndex = event.target.parentElement.parentElement.id;
          state = 'activity';
          tasks = event.target.parentElement.parentElement;
          handleActivityEdit(editIndex);
          showActivityForm();
        }
        if (event.target.classList.contains('delete')) {
          deletePostIt(event.target.parentElement.parentElement.id);
          handleActivityDelete(event.target.parentElement.parentElement.id);
          event.target.parentElement.parentElement.remove();
          
        }
        if (event.target.classList.contains('deleteProject')) {
          const uniqueInfo =
            event.target.closest('[data-unique-info]')?.dataset.uniqueInfo;
          const elements = document.querySelectorAll(
            `[data-unique-info="${uniqueInfo}"]`
          );
          elements.forEach((item) => {
            item.remove();
          });
          handleProjectDelete(uniqueInfo);
          event.target.parentElement.parentElement.remove();
        }
      });
    }
  });

  formElement.addEventListener('submit', (e) => {
    if (state == 'project') {
      e.preventDefault();
      const addProj = addProject();
      let proj = addProj.proj;
      populateProject(proj);
      createInnerDisplay(proj);
      hideForm();
    } else if (state == 'activity' && newTask) {
      e.preventDefault();
      const addActivities = addActivity(projectId);
      let activities = addActivities.activity;
      populateActivities(activities, projectId);
      createActivitiesDisplay(projectId, activities);
      console.log(items)
      hideForm();
    }
    else if(state == 'activity' && !newTask){
      e.preventDefault();
      const editActivites = saveActivityEdit(editIndex);
      let activityToEdit = editActivites.activityToEdit;
      displayActivityEdit(tasks, activityToEdit)
      console.log(items);
      hideForm();
    }
  });

  exitBtn.addEventListener('click', () => {
    hideForm();
  });
}
