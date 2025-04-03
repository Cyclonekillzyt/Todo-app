import { title } from './getDomElements';
import { description } from './getDomElements';
import { dueDate } from './getDomElements';
import { done } from './getDomElements';
import { newTask, editIndex } from './handleClicks';
import { items } from '.';
let activitiesArray = null;
let activity = null;
let priorityValue = null;

class Project {
  constructor(title, dueDate, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = Date.now().toString();
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
    this.id = Date.now().toString();
  }
}

function addProject() {
  const proj = new Project(title.value, dueDate.value, priorityValue || 'Low');
  items.push(proj);
  localStorage.setItem('items', JSON.stringify(items));
  return { proj };
}

function addActivity(id) {
  const task = new Activity(
    title.value,
    description.value,
    dueDate.value,
    priorityValue || 'Low',
    done.checked
  );
  const targetProject = items.find((proj) => proj.id == id);
  if (targetProject) {
    targetProject.activities.push(task);
    localStorage.setItem('items', JSON.stringify(items));
  } else {
    throw new Error(`Project with ID ${id} not found`);
  }
  activity = task;
  const activityElements = document.querySelectorAll('.activityEditBtn');
  return { activity, activityElements };
}

function handleActivityEdit(edit) {
  console.log(edit);
  console.log(items);
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

function saveActivityEdit(id) {
  let parentArray = items.find((proj) =>
    proj.activities.some((child) => child.id == id)
  );
  const activityToEdit = parentArray.activities.find(
    (activity) => activity.id == id
  );
  if (activityToEdit) {
    activityToEdit.title = title.value;
    activityToEdit.description = description.value;
    activityToEdit.dueDate = dueDate.value;
    activityToEdit.priority = priorityValue;
    activityToEdit.done = done.checked;
    localStorage.setItem('items', JSON.stringify(items));
  }
  localStorage.setItem('items', JSON.stringify(items));
  return { activityToEdit };
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
  localStorage.setItem('items', JSON.stringify(items));
}

function handleProjectDelete(id) {
  const projectIndex = items.findIndex((proj) => proj.id == id);
  items.splice(projectIndex, 1);
  localStorage.setItem('items', JSON.stringify(items));
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
  saveActivityEdit,
};
