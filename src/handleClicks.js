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
} from './coreLogic';
import {
  populateProject,
  populateActivities,
  createInnerDisplay,
} from './createElements';
import { exitBtn } from './getDomElements';
import { projectDisplay } from './getDomElements';
import { priority } from './getDomElements';
import { details } from './getDomElements';
export let editIndex = null;
export let newTask = false;
export let editPostIt = false;
let tasks = null;
export function handleClicks() {
  let projectId;
  let state = null;
  addProjectBtn.addEventListener('click', () => {
    showProjectForm();
    checkPriorityValue(priority);
    state = 'project';
  });

  [projectDisplay, details].forEach((el) => {
    if (el) {
      el.addEventListener('click', (event) => {
        if (event.target.classList.contains('projectId')) {
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
          projectId =
            event.target.closest('[data-unique-info]').dataset.uniqueInfo;
        }
        if (event.target.classList.contains('activityEditBtn')) {
          newTask = false;
          editIndex = event.target.parentElement.parentElement.id;
          tasks = event.target.parentElement.parentElement;
          handleActivityEdit(editIndex);
          showActivityForm();
          console.log(tasks);
        }
        if (event.target.classList.contains('delete')) {
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
      let id = addProj.id;
      checkElementCount();
      populateProject(proj, id);
      createInnerDisplay(proj);
      hideForm();
    } else if (state == 'activity') {
      e.preventDefault();
      const addActivities = addActivity(projectId);
      let activities = addActivities.activity;
      let id = addActivities.activityId;
      populateActivities(activities, projectId, id, tasks, newTask);
      hideForm();
    }
  });

  exitBtn.addEventListener('click', () => {
    hideForm();
  });
}
