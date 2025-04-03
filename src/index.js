import './styles.css';
export let items = JSON.parse(localStorage.getItem('items')) || [];
import { handleClicks } from './handleClicks';
import { loadProjectsFromStorage } from './onLoad';

loadProjectsFromStorage();
handleClicks();

