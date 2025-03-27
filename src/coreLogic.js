import { title } from './getDomElements';
import { description } from './getDomElements';
import { dueDate } from './getDomElements';
import { done } from './getDomElements';
import { newTask, editPostIt } from './handleClicks';
import { editIndex } from './handleClicks';
const items = [];
let activitiesArray = null;
let activity = null;
let priorityValue = null;

class Project {
  constructor(title, dueDate, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = Date.now();
    this.activities = [];
  }
}

class Activity {
  constructor(title, description, dueDate, priority, done) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
    this.id = Date.now();
  }
}

function addProject() {
  const proj = new Project(title.value, dueDate.value, priorityValue || 'Low');
  let id = proj.id;
  items.push(proj);
  return { id, proj };
}

function addActivity(id) {
  const task = new Activity(
    title.value,
    description.value,
    dueDate.value,
    priorityValue || 'Low',
    done.checked
  );
  let activityId = task.id;
  const targetObject = items.find((proj) => proj.id == id);
  if (targetObject) {
    if (newTask) {
      targetObject.activities.push(task);
    } else {
      const activityToEdit = targetObject.activities.find(
        (activity) => activity.id == editIndex
      );
      if (activityToEdit) {
        activityToEdit.title = task.title;
        activityToEdit.description = task.description;
        activityToEdit.dueDate = task.dueDate;
        activityToEdit.priority = task.priority;
        activityToEdit.done = task.done;
      }
    }
  } else {
    throw new error(`Project with ID ${id} not found`);
  }

  activity = task;
  const activityElements = document.querySelectorAll('.activityEditBtn');
  return { activity, activityElements, activityId };
}

function handleActivityEdit(edit) {
  let parentArray = items.find((proj) =>
    proj.activities.some((child) => child.id == edit)
  );
    activitiesArray = parentArray.activities;
  let find = activitiesArray.find((activity) => activity.id == edit);
  if (find) {
    title.value = find.title;
    description.value = find.description;
    dueDate.value = find.dueDate;
    priorityValue = find.priority;
    done.checked = find.done;
  }
  if (edit !== null) {
    find = activity;
    edit = null;
  } else {
    activitiesArray.push(activity);
  }
}
function handleActivityDelete(id) {
  let parentArray = items.find((proj) =>
    proj.activities.some((child) => child.id == id)
  );
  activitiesArray = parentArray.activities;
  const activityIndex = activitiesArray.findIndex(
    (activity) => activity.id == id
  );
  activitiesArray.splice(activityIndex, 1);
}

function handleProjectDelete(id) {
  const projectIndex = items.findIndex((proj) => proj.id == id);
  items.splice(projectIndex, 1);
}

function checkPriorityValue(el) {
  const priorityEl = el.querySelectorAll('option');
  priorityEl.forEach((element) => {
    element.addEventListener('click', () => {
      priorityValue = element.value;
    });
  });
}

export {
  addProject,
  addActivity,
  handleActivityEdit,
  handleActivityDelete,
  handleProjectDelete,
  checkPriorityValue,
};
