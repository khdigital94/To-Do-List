document.addEventListener("DOMContentLoaded", () => {
	// Shortening queryselectors
	const qs = (el) => document.querySelector(el);

	const taskManager = (() => {
		let tasks = [];

		const addTask = (task) => {
			tasks.push(task);
		};
		const editTask = (task, newName, newCategory) => {
			task.name = newName;
			task.category = newCategory;
		};
		const finishTask = (task) => {
			return (task.isDone = true);
		};
		const getTasks = (task) => {
			return tasks;
		};

		return {
			tasks,
			addTask,
			editTask,
			finishTask,
			getTasks,
		};
	})();

	const frontendManager = (() => {
		const appContainer = qs("#app");
		const taskContainer = qs("#taskContainer");
		const categoryContainer = qs("#categorieList");
		const formCatSelect = qs("#formCatSelect");

		const tasks = taskManager.getTasks();
		const categories = ["📌 Wichtig", "⏳ Dringend", "📝 Allgemein", "🏠 Haushalt", "🍽 Essen & Einkaufen", "🏋️‍♂️ Fitness & Gesundheit", "📚 Lernen & Weiterbildung", "🎯 Ziele & Projekte", "🎉 Freizeit & Hobbys", "📧 E-Mails & Kommunikation", "📅 Meetings & Termine", "🚀 Projekte & Deadlines", "🔍 Recherchen & Ideen", "💰 Finanzen & Rechnungen", "🔄 Wiederkehrend", "✈️ Reisen & Urlaube"];

		const initialUpdate = () => {
			categories.forEach((category) => {
				formCatSelect.innerHTML += `
                <option>${category}</option>
            `;
			});

			updateTasks();
			updateCategories();
		};

		const updateTasks = (passedTasks) => {
			const taskList = qs(".taskList");
			taskList.innerHTML = "";
			taskContainer.appendChild(taskList);
			currentTasks = passedTasks || tasks;

			currentTasks.forEach((task) => {
				const id = crypto.randomUUID();
				taskList.innerHTML += `
                    <li data-id="${id}">
                        <h3>${task.name}</h3> 
                        <p>Kategorie: ${task.category}</p>
                    </li>
                `;
			});
		};

		const updateCategories = () => {
			categoryContainer.innerHTML = "";
			const categoryList = document.createElement("ul");
			categoryContainer.appendChild(categoryList);
			const currentCats = [];

			categoryList.innerHTML += `
                    <li><button class="allCats taskCategory activeButton">Alle</button></li>
                `;

			tasks.forEach((task) => {
				if (!currentCats.includes(task.category)) {
					currentCats.push(task.category);
					categoryList.innerHTML += `
                    <li><button class="taskCategory">${task.category}</button></li>
                `;
				}
			});
		};

		const removeActiveClass = () => {
			const btns = document.querySelectorAll("button");
			btns.forEach((button) => {
				button.classList.remove("activeButton");
			});
		};

		const filterTasks = (category) => {
			const arr = tasks.filter((task) => task.category === category);
			updateTasks(arr);
		};

		return { initialUpdate, updateTasks, updateCategories, removeActiveClass, filterTasks };
	})();

	const createNewTask = (name, category, isDone) => {
		return {
			name,
			category,
			isDone,
		};
	};

	// Initial tasks
	const task1 = createNewTask("Sauber machen", "🏠 Haushalt", false);
	const task2 = createNewTask("JavaScript lernen", "📚 Lernen & Weiterbildung", false);
	const task3 = createNewTask("Einkaufen", "🍽 Essen & Einkaufen", false);

	// Adding tasks to array
	taskManager.addTask(task1);
	taskManager.addTask(task2);
	taskManager.addTask(task3);

	frontendManager.initialUpdate();

	// Variables
	const taskCategories = document.querySelectorAll(".taskCategory");
	const newTaskBtn = qs("#newTaskBtn");
	const formSubmitBtn = qs("#formSubmitBtn");
	const newTaskPopup = qs(".newTaskPopup");
	const popupOverlay = qs(".popupOverlay");
	const form = qs("form");
	const formTaskInput = qs("#formTaskInput");
	const formCatSelect = qs("#formCatSelect");

	// Filtering tasks
	taskCategories.forEach((category) => {
		category.addEventListener("click", () => {
			const targetCategory = category.textContent;
			frontendManager.filterTasks(targetCategory);
			frontendManager.removeActiveClass();
			category.classList.add("activeButton");
		});
	});

	// All tasks filter button
	document.querySelector(".allCats").addEventListener("click", () => {
		frontendManager.updateTasks();
	});

	// Shows and hides popup overlay
	popupOverlay.addEventListener("click", (target) => {
		popupOverlay.classList.toggle("showOverlay");
		popupOverlay.classList.toggle("hideOverlay");
		newTaskPopup.classList.toggle("showPopup");
		newTaskPopup.classList.toggle("hidePopup");
	});

	// Shows and hides new task popup
	newTaskBtn.addEventListener("click", () => {
		popupOverlay.classList.toggle("showOverlay");
		popupOverlay.classList.toggle("hideOverlay");
		newTaskPopup.classList.toggle("showPopup");
		newTaskPopup.classList.toggle("hidePopup");
	});

	// Creates new task, adds it to our array and displays in the frontend
	formSubmitBtn.addEventListener("click", (event) => {
		event.preventDefault();

		if (formTaskInput.value === "") {
			alert("Du musst eine Beschreibung für dein To-Do hinzufügen.");
		} else if (formCatSelect.value === "Kategorie auswählen...") {
			alert("Du musst eine Kategorie auswählen.");
		} else {
			taskManager.addTask(createNewTask(formTaskInput.value, formCatSelect.value, false));
			frontendManager.updateTasks();
			frontendManager.updateCategories();

			formTaskInput.value = "";
			formCatSelect.value = "Kategorie auswählen...";

			popupOverlay.classList.toggle("showOverlay");
			popupOverlay.classList.toggle("hideOverlay");
			newTaskPopup.classList.toggle("showPopup");
			newTaskPopup.classList.toggle("hidePopup");
		}
	});
});
