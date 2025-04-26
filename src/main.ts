import { fetchTasksFromFirebase } from './pull';
import './style.css';
import { addTaskToList, createTaskManager } from './task';

createTaskManager();
fetchTasksFromFirebase().then((tasks: Array<any>) => {
	tasks.forEach(task => {
		addTaskToList(task);
	});
});