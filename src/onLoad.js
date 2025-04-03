import {
  populateProject,
  populateActivities,
  createInnerDisplay,
  createActivitiesDisplay,
} from './createElements';
import { items } from '.';

export function loadProjectsFromStorage() {
  items.forEach((proj) => {
    populateProject(proj, proj.id);
    createInnerDisplay(proj);
    proj.activities.forEach((activity) => {
      createActivitiesDisplay(proj.id, activity);
      populateActivities(activity, proj.id);
    });
  });
}
