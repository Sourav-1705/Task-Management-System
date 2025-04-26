import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { firebaseConfig } from './config';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const tasksRef = ref(database, 'tasks');

export const uploadToStore = (title: string, details: string, assignedTo: string, priority: string): Promise<void> => {
	// TODO: upload to store
	const taskData = {
		title,
		details,
		assignedTo,
		priority,
		createdAt: new Date().toISOString()
	};
	return push(tasksRef, taskData)
		.then(() => {
			console.log('Task saved successfully');
		})
		.catch((error: any) => {
			console.error('Error saving task:', error);
			throw error; // Re-throw to handle in the calling function
		});
}