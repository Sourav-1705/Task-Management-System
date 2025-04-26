import { getDatabase, ref, get } from 'firebase/database';

/**
 * Fetches all tasks from Firebase and returns them as an array
 * @returns Promise with an array of tasks sorted by creation date (newest first)
 */
export const fetchTasksFromFirebase = (): Promise<Array<any>> => {
	const database = getDatabase();
	const tasksRef = ref(database, 'tasks');

	return get(tasksRef)
		.then((snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();

				// Convert object to array and add ID to each task
				const tasksArray = Object.entries(data).map(([id, task]) => ({
					id,
					...(task as any)
				}));

				// Sort by creation date (newest first)
				return tasksArray.sort((a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			} else {
				// Return empty array if no tasks exist
				return [];
			}
		})
		.catch((error) => {
			console.error("Error fetching tasks:", error);
			throw error;
		});
}