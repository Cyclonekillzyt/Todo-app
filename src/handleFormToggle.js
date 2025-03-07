import { activityProjectForm, complete, priority } from "./getDomElements";
import { description } from "./getDomElements";
import { descriptionLabel } from "./getDomElements";
import { done } from "./getDomElements";
import { formType } from "./getDomElements";
import { title } from "./getDomElements";
import { dueDate } from "./getDomElements";
export function toggleFormDisplay() {
  function showActivityForm() {
    activityProjectForm.style.display = "flex";
    description.style.display = "flex";
    descriptionLabel.style.display = 'flex';
    complete.style.display = "flex";
    done.style.display = "flex";
  }
  function hideForm() {
    activityProjectForm.style.display = "none";
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "";
    done.checked = false;
  }
  function showProjectForm() {
    formType.textContent = "Project";
    description.style.display = "none";
    descriptionLabel.style.display = 'none';
    complete.style.display = "none";
    done.style.display = "none";
    activityProjectForm.style.display = "flex";
  }
  function editProject(proj) {
    formType.textContent = proj.title;
    activityProjectForm.style.display = "flex";
  }
  function editActivity(activities) {
    formType.textContent = activities.name;
    activityProjectForm.style.display = "flex";
  }
  return { showActivityForm, hideForm, showProjectForm, editProject, editActivity };
}
