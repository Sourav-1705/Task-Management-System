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
		{ value: "Atanu Das", text: "Atanu Das" },
		{ value: "Pallabi Banka", text: "Pallabi Banka" },
		{ value: "Jeet Chakraborty", text: "Jeet Chakraborty" },
		{ value: "Priyanka Sarkar", text: "Priyanka Sarkar" },
		{ value: "Sindhukona Tewari", text: "Sindhukona Tewari" },
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

		// Get form values
		const title = (document.getElementById("taskTitle") as HTMLInputElement)
			.value;
		const details = (
			document.getElementById("taskDetails") as HTMLTextAreaElement
		).value;
		const assignedTo = (
			document.getElementById("assignedTo") as HTMLSelectElement
		).value;
		const priority = (document.getElementById("priority") as HTMLSelectElement)
			.value;

		// Create task element
		createTaskElement(title, details, assignedTo, priority);

		// Reset form
		form.reset();
	});

	// Function to create and add task elements to the list
	function createTaskElement(
		title: string,
		details: string,
		assignedTo: string,
		priority: string
	) {
		const taskElement = document.createElement("div");
		taskElement.className = `task-item priority-${priority.toLowerCase()}`;

		const taskTitle = document.createElement("h3");
		taskTitle.textContent = title;
		taskElement.appendChild(taskTitle);

		const taskDetails = document.createElement("p");
		taskDetails.textContent = details;
		taskElement.appendChild(taskDetails);

		const taskMeta = document.createElement("div");
		taskMeta.className = "task-meta";

		const assignedToSpan = document.createElement("span");
		assignedToSpan.className = "assigned-to";
		assignedToSpan.textContent = `Assigned to: ${assignedTo}`;
		taskMeta.appendChild(assignedToSpan);

		const prioritySpan = document.createElement("span");
		prioritySpan.className = "priority";
		prioritySpan.textContent = `Priority: ${priority}`;
		taskMeta.appendChild(prioritySpan);

		taskElement.appendChild(taskMeta);

		// Add delete button
		const deleteButton = document.createElement("button");
		deleteButton.className = "delete-task";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", () => {
			taskElement.remove();
		});

		taskElement.appendChild(deleteButton);

		// Add to task list
		document.getElementById("tasks")!.appendChild(taskElement);
	}
}