import { details, projectDisplay } from './getDomElements';
import { element1 } from '../../Restaurant-Page/src/home';

function populateProject(proj, id) {
  const projectElement = document.createElement('div');
  projectElement.classList.add('project');
  projectElement.dataset.uniqueInfo = id;
  projectElement.innerHTML = `
        <div class="projects">
            <div class="projectId" id="projectId">
              <h3><span class="projectActive">#</span>${proj.title}</h3>
              <div class="buttons">
                <button class="activityAddBtn" id="activityAddBtn">+</button>
                <button class="deleteProject">🗑</button>
              </div>
            </div>`;
  priorityColor(proj, projectElement);
  projectDisplay.append(projectElement);
}

function createInnerDisplay(info) {
  const div = createDomElement('div', info.id, 'displaysDiv');
  const headerSection = createDomElement('div', 'headerDiv', 'headerDiv');
  const buttonsDiv = createDomElement('div', 'buttonsDiv', 'buttonsDiv');
  const header = createDomElement('h1', 'dislayHeader', 'dislayHeader');
  const addActivitiesBtn = createDomElement(
    'button',
    'activityAddBtn',
    'activityAddBtn'
  );
  const deleteActivitiesBtn = createDomElement(
    'button',
    'deleteProject',
    'deleteProject'
  );
  const postItSection = createDomElement('div', info.id, 'postItSection');

  div.dataset.uniqueInfo = info.id;
  div.style.height = '100%';
  div.style.width = '100%';
  header.textContent = info.title;

  addActivitiesBtn.textContent = '+';
  deleteActivitiesBtn.textContent = '🗑';

  buttonsDiv.append(addActivitiesBtn, deleteActivitiesBtn);
  headerSection.append(header, buttonsDiv);
  div.append(headerSection);

  div.append(postItSection);
  details.appendChild(div);
  priorityColor(info, headerSection);
}

function populateActivities(
  activities,
  projectId,
  id,
  activityElement,
  newTask
) {
  const projectElement = document.querySelector(
    `[data-unique-info="${projectId}"]`
  );
  if (!projectElement) {
    throw new Error(`Project with ID ${projectId} not found`);
  }

  if (newTask) {
    activityElement = document.createElement('div');
    activityElement.classList.add('activities');
    activityElement.dataset.uniqueInfo = projectId;
    activityElement.id = id;
    activityElement.innerHTML = `
        <p class="title">${activities.title}</p>
          <div class="buttons">
            <button class="activityEditBtn" id="activityEditBtn">🖉</button>
            <button class="delete">🗑</button>
          </div>`;
    priorityColor(activities, activityElement);
    done(activities, activityElement);
    createActivitiesDisplay(projectId, activities);
    projectElement.append(activityElement);
  } else {
  activityElement.querySelector('.title').textContent = activities.title;    updatePostIt(id, activities);

    priorityColor(activities, activityElement);
    done(activities, activityElement);
  }
}

function createActivitiesDisplay(projectId, activity) {
  let postItSection = null;
  details.querySelectorAll('*').forEach((child) => {
    if (child.id == projectId && child.classList.contains('postItSection')) {
      postItSection = child;
    }
  });
  if (!postItSection) {
    console.warn('Post-it section not found for activity:', projectId);
    return;
  }

  const postIt = createDomElement('div', activity.id, 'postIt');
  const actName = createDomElement('h1', 'actHeader', 'actHeader');
  postIt.dataset.uniqueInfo = projectId;
  actName.textContent = activity.title;
  const actDesc = createDomElement('p', 'actDesc', 'actDesc');
  actDesc.textContent = `${activity.description}, due by ${activity.dueDate}`;
  postIt.append(actName, actDesc);
  postItSection.append(postIt);
  priorityColor(activity, postIt);
  done(activity, postIt);
}

function updatePostIt(id, activities) {
  const postIts = document.querySelectorAll('.postIt');
  let postIt = null;
  postIts.forEach((el)=>{
    if (el.id = id){
      postIt = el;
    }
    postIt.children[0].textContent = activities.title ;
    postIt.children[1].textContent = `${activities.description}, due by ${activities.dueDate}`;
    priorityColor(activities, postIt);
  })
  
}

function priorityColor(priorityValue, projectDiv) {
  const colors = {
    Low: '#3cb371',
    Medium: '#ffa500',
    High: '#ff4500',
    Urgent: '#ff1493',
  };
  projectDiv.style.backgroundColor = colors[priorityValue.priority] || '';
}

function populateInfo(activities) {
  const projectInfo = document.createElement('div');
  projectInfo.classList.add('projectInfo');
  projectInfo.innerHTML = `<p>${activities.info}</p>`;
  details.append(projectInfo);
}

function done(activity, activityElement) {
  if (activity.done) {
    activityElement.style.backgroundColor = 'grey';
  }
}

function createDomElement(type, id, className) {
  const item = document.createElement(type);
  item.id = id;
  item.classList.add(className);
  return item;
}

export {
  populateActivities,
  populateProject,
  populateInfo,
  createInnerDisplay,
};
