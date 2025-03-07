import { formElement } from "./getDomElements";
import { addProjectBtn } from "./getDomElements";
import { toggleFormDisplay } from "./handleFormToggle";
import { handleLibrary } from "./coreLogic";
import { createDomElements } from "./createElements";
import { exitBtn } from "./getDomElements";
import { projectDisplay } from "./getDomElements";
import { priority } from "./getDomElements";
import { checkPriorityValue } from "./coreLogic";
export let editIndex = null;
export let newTask = false;
let tasks = null;
export function handleClicks() {
  let projectId;
  let state = null;
  addProjectBtn.addEventListener("click", () => {
    toggleFormDisplay().showProjectForm();
    checkPriorityValue(priority);
    state = "project";
  });

  projectDisplay.addEventListener("click", (event) => {
    if (event.target.classList.contains("activityAddBtn")) {
      toggleFormDisplay().showActivityForm();
      checkPriorityValue(priority);
      state = "activity";
      newTask = true;
      projectId = event.target.closest("[data-unique-info]").dataset.uniqueInfo;
    }
    if (event.target.classList.contains("activityEditBtn")) {
      newTask = false;
      editIndex = event.target.parentElement.parentElement.id;
      tasks = event.target.parentElement.parentElement;
      handleLibrary().handleActivityEdit(editIndex);
      toggleFormDisplay().showActivityForm();
    }
    if (event.target.classList.contains("delete")) {
      handleLibrary().handleActivityDelete(
        event.target.parentElement.parentElement.id
      );
      event.target.parentElement.parentElement.remove();
    }
    if (event.target.classList.contains("deleteProject")) {
      const uniqueInfo =
        event.target.closest("[data-unique-info]")?.dataset.uniqueInfo;

      const elements = document.querySelectorAll(
        `[data-unique-info="${uniqueInfo}"]`
      );
      elements.forEach((item) => {
        item.remove();
      });
      handleLibrary().handleProjectDelete(uniqueInfo);
      event.target.parentElement.parentElement.remove();
    }
  });

  formElement.addEventListener("submit", (e) => {
    if (state == "project") {
      e.preventDefault();
      const addProject = handleLibrary().addProject();
      let proj = addProject.proj;
      let id = addProject.id;
      createDomElements().populateProject(proj, id);
      toggleFormDisplay().hideForm();
    } else if (state == "activity") {
      e.preventDefault();
      const addActivities = handleLibrary().addActivity(projectId);
      let activities = addActivities.activity;
      let id = addActivities.activityId;
      const create = createDomElements().populateActivities;
      const { updateActivity } = create(
        activities,
        projectId,
        id,
        tasks,
        newTask
      );
      if (!newTask) {
        updateActivity();
      }
      toggleFormDisplay().hideForm();
    } else {
    }
  });

  exitBtn.addEventListener("click", () => {
    toggleFormDisplay().hideForm();
  });
}
