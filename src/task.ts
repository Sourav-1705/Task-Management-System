import { usersList } from "./config";
import { uploadToStore } from "./upload";

// Function to get form data
const getFormData = () => {
	const title = (document.getElementById("taskTitle") as HTMLInputElement).value;
	const details = (document.getElementById("taskDetails") as HTMLTextAreaElement).value;
	const assignedTo = (document.getElementById("assignedTo") as HTMLSelectElement).value;
	const priority = (document.getElementById("priority") as HTMLSelectElement).value;

	return { title, details, assignedTo, priority };
}
export const createTaskManager = () => {
	const app = document.querySelector<HTMLDivElement>("#app")!;

	// Clear existing content
	app.innerHTML = "";

	// Create container
	const container = document.createElement("div");
	container.className = "container";

	// Create header
	const header = document.createElement("header");
	const h1 = document.createElement("h1");
	h1.textContent = "AMPL Task Manager";
	header.appendChild(h1);
	container.appendChild(header);

	// Create task form section
	const taskForm = document.createElement("div");
	taskForm.className = "task-form";

	const h2Form = document.createElement("h2");
	h2Form.textContent = "Create Task";
	taskForm.appendChild(h2Form);

	const form = document.createElement("form");
	form.id = "taskForm";

	// Input for task title
	const titleInput = document.createElement("input");
	titleInput.type = "text";
	titleInput.id = "taskTitle";
	titleInput.placeholder = "Task Title";
	titleInput.required = true;
	form.appendChild(titleInput);

	// Textarea for task details
	const detailsTextarea = document.createElement("textarea");
	detailsTextarea.id = "taskDetails";
	detailsTextarea.placeholder = "Task Details";
	detailsTextarea.required = true;
	form.appendChild(detailsTextarea);

	// Select for assigned person
	const assignSelect = document.createElement("select");
	assignSelect.id = "assignedTo";
	assignSelect.required = true;

	const assignOptions = [
		{ value: "", text: "Assign to..." },
		...usersList,
	];

	assignOptions.forEach((option) => {
		const optionElement = document.createElement("option");
		optionElement.value = option.value;
		optionElement.textContent = option.text;
		assignSelect.appendChild(optionElement);
	});

	form.appendChild(assignSelect);

	// Select for priority
	const prioritySelect = document.createElement("select");
	prioritySelect.id = "priority";
	prioritySelect.required = true;

	const priorityOptions = [
		{ value: "", text: "Select Priority" },
		{ value: "High", text: "High" },
		{ value: "Medium", text: "Medium" },
		{ value: "Low", text: "Low" },
	];

	priorityOptions.forEach((option) => {
		const optionElement = document.createElement("option");
		optionElement.value = option.value;
		optionElement.textContent = option.text;
		prioritySelect.appendChild(optionElement);
	});

	form.appendChild(prioritySelect);

	// Submit button
	const submitButton = document.createElement("button");
	submitButton.type = "submit";
	submitButton.textContent = "Assign Task";
	form.appendChild(submitButton);

	taskForm.appendChild(form);
	container.appendChild(taskForm);

	// Create task list section
	const taskListDiv = document.createElement("div");
	taskListDiv.id = "taskList";
	taskListDiv.className = "task-list";

	const h2List = document.createElement("h2");
	h2List.textContent = "Assigned Tasks";
	taskListDiv.appendChild(h2List);

	const tasksDiv = document.createElement("div");
	tasksDiv.id = "tasks";
	taskListDiv.appendChild(tasksDiv);

	container.appendChild(taskListDiv);

	// Add container to app
	app.appendChild(container);

	// Add event listener for form submission
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		// Get form data
		const taskData = getFormData();

		// Add task to the list
		addTaskToList(taskData);
		uploadToStore(taskData.title, taskData.details, taskData.assignedTo, taskData.priority);
		// Reset form
		form.reset();
	});
}
// Function to add a task to the assigned tasks list
export const addTaskToList = (taskData: {
	title: string,
	details: string,
	assignedTo: string,
	priority: string
}) => {
	const { title, details, assignedTo, priority } = taskData;
	createTaskElement(title, details, assignedTo, priority);
}
const createTaskElement = (
	title: string,
	details: string,
	assignedTo: string,
	priority: string,
) => {
	const taskElement = document.createElement("div");
	taskElement.className = `task-item priority-${priority.toLowerCase()}`;
	taskElement.style.display = "block";
	taskElement.style.width = "100%";
	taskElement.style.marginBottom = "10px";

	const taskTitle = document.createElement("h3");
	taskTitle.textContent = `Task: ${title}`;
	taskElement.appendChild(taskTitle);

	const taskDetails = document.createElement("p");
	taskDetails.textContent = `Details: ${details}`;
	taskElement.appendChild(taskDetails);

	const taskAssigned = document.createElement("p");
	taskAssigned.className = "task-meta";
	const assignedToSpan = document.createElement("span");
	assignedToSpan.className = "assigned-to";
	assignedToSpan.textContent = `Assigned to: ${assignedTo}`;
	taskAssigned.appendChild(assignedToSpan);
	taskElement.appendChild(taskAssigned);

	const assignedDate = new Date().toLocaleString();
	const assignedDateP = document.createElement("p");
	assignedDateP.className = "task-meta";
	assignedDateP.textContent = `Assigned Date: ${assignedDate}`;
	taskElement.appendChild(assignedDateP);

	const taskPriority = document.createElement("p");
	taskPriority.className = "task-meta";
	const prioritySpan = document.createElement("span");
	prioritySpan.className = "priority";
	prioritySpan.textContent = `Priority: ${priority}`;
	taskPriority.appendChild(prioritySpan);
	taskElement.appendChild(taskPriority);

	// Status Dropdown
	const statusWrapper = document.createElement("p");
	statusWrapper.className = "task-meta";
	const statusLabel = document.createElement("label");
	statusLabel.textContent = "Status: ";
	const statusSelect = document.createElement("select");
	const statuses = ["Pending", "Work In Progress", "Completed"];
	statuses.forEach(status => {
		const option = document.createElement("option");
		option.value = status;
		option.text = status;
		statusSelect.appendChild(option);
	});
	statusWrapper.appendChild(statusLabel);
	statusWrapper.appendChild(statusSelect);
	taskElement.appendChild(statusWrapper);

	// Completed Time
	const completedTimeP = document.createElement("p");
	completedTimeP.className = "task-meta";
	completedTimeP.style.display = "none";
	taskElement.appendChild(completedTimeP);

	// Comment By Dropdown
	const commentByWrapper = document.createElement("p");
	commentByWrapper.className = "task-meta";
	const commentByLabel = document.createElement("label");
	commentByLabel.textContent = "Comment By: ";
	const commentBySelect = document.createElement("select");
	const users = [
		{ value: "", text: "Commented by..." },
		...usersList,
	]
	users.forEach(user => {
		const option = document.createElement("option");
		option.value = user.value;
		option.text = user.text;
		commentBySelect.appendChild(option);
	});
	commentByWrapper.appendChild(commentByLabel);
	commentByWrapper.appendChild(commentBySelect);
	taskElement.appendChild(commentByWrapper);

	// Comment Textarea
	const commentLabel = document.createElement("label");
	commentLabel.textContent = "Comment:";
	commentLabel.htmlFor = `comment-${title}`;

	const commentTextarea = document.createElement("textarea");
	commentTextarea.id = `comment-${title}`;
	commentTextarea.rows = 3;
	commentTextarea.style.width = "-webkit-fill-available";
	commentTextarea.placeholder = "Write your comment here...";

	taskElement.appendChild(commentLabel);
	taskElement.appendChild(commentTextarea);

	// Handle status change
	statusSelect.addEventListener("change", () => {
		if (statusSelect.value === "Completed") {
			const completedTime = new Date().toLocaleString();
			completedTimeP.textContent = `Completed Time: ${completedTime}`;
			completedTimeP.style.display = "block";
			statusSelect.disabled = true;
			commentTextarea.disabled = true;
			commentBySelect.disabled = true;
		}
	});

	// Add to task list
	document.getElementById("tasks")!.appendChild(taskElement);
};



