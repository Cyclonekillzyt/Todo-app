import { details } from "./getDomElements";
import { projectDisplay } from "./getDomElements";

export function createDomElements() {
  function populateProject(proj, id) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
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
      throw error(`Project with ID ${projectId} not found`);
    }

    if (!newTask) {
      activityElement.querySelector(".title").textContent = activities.title;
    } else {
      activityElement = document.createElement("div");
      activityElement.classList.add("activities");
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
      projectElement.append(activityElement);
    }

    return {
      updateActivity: () => {
        activityElement.querySelector(".title").textContent = activities.title;
        priorityColor(activities, activityElement);
        done(activities, activityElement)
      },
    };
  }
  function priorityColor(priorityValue, projectDiv) {
    if (priorityValue.priority == "Low") {
      projectDiv.style.backgroundColor = "green";
    } else if (priorityValue.priority == "Medium") {
      projectDiv.style.backgroundColor = "blue";
    } else if (priorityValue.priority == "High") {
      projectDiv.style.backgroundColor = "yellow";
    } else if (priorityValue.priority == "Urgent") {
      projectDiv.style.backgroundColor = "red";
    }
    console.log(priorityValue)
  }

  function populateInfo(activities) {
    const projectInfo = document.createElement("div");
    projectInfo.classList.add("projectInfo");
    projectInfo.innerHTML = `<p>${activities.info}</p>`;
    details.append(projectInfo);
  }

  function done(activity, activityElement){
   if (activity.done == true){
    
     activityElement.style.backgroundColor = "grey";
   }
  }

  return { populateActivities, populateProject, populateInfo };
}

