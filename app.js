//  1.  Eine Factory Function für neue Tasks erstellen:
//      - Parameter: Name, Category, isDone
//      - Die Task zum Array pushen
//      - Die Task anzeigen lassen

document.addEventListener("DOMContentLoaded", () => {
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

	const createNewTask = (name, category, isDone) => {
		return {
			name,
			category,
			isDone,
		};
	};

	const createFrontend = (() => {
		// Shortening queryselectors
		const qs = (el) => document.querySelector(el);

		const appContainer = qs("#app");
		const taskContainer = qs("#taskContainer");
		const categoryContainer = qs("#categorieList");
		let tasks = taskManager.getTasks();
		const categories = ["📌 Wichtig", "⏳ Dringend", "📝 Allgemein", "🏠 Haushalt", "🍽 Essen & Einkaufen", "🏋️‍♂️ Fitness & Gesundheit", "📚 Lernen & Weiterbildung", "🎯 Ziele & Projekte", "🎉 Freizeit & Hobbys", "📧 E-Mails & Kommunikation", "📅 Meetings & Termine", "🚀 Projekte & Deadlines", "🔍 Recherchen & Ideen", "💰 Finanzen & Rechnungen", "🔄 Wiederkehrend", "✈️ Reisen & Urlaube"];

		const initialUpdate = () => {
			updateTasks();
			updateCategories();
		};

		const updateTasks = (passedTasks) => {
			taskContainer.innerHTML = "";
			const taskList = document.createElement("ul");
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

	// Initial Tasks
	const task1 = createNewTask("Sauber machen", "🏠 Haushalt", false);
	const task2 = createNewTask("JavaScript lernen", "📚 Lernen & Weiterbildung", false);
	const task3 = createNewTask("Einkaufen", "🍽 Essen & Einkaufen", false);
	const task4 = createNewTask("Arzttermin", "🏥 Gesundheit", false);
	const task5 = createNewTask("Meeting vorbereiten", "📧 E-Mails & Kommunikation", false);
	const task6 = createNewTask("Wäsche waschen", "🏠 Haushalt", false);
	const task7 = createNewTask("Node.js lernen", "📚 Lernen & Weiterbildung", false);
	const task8 = createNewTask("Lebensmittel einkaufen", "🍽 Essen & Einkaufen", false);
	const task9 = createNewTask("Blutdruck messen", "🏥 Gesundheit", false);
	const task10 = createNewTask("Projektbericht schreiben", "📧 E-Mails & Kommunikation", false);
	const task11 = createNewTask("Staub wischen", "🏠 Haushalt", false);
	const task12 = createNewTask("React lernen", "📚 Lernen & Weiterbildung", false);
	const task13 = createNewTask("Hundefutter kaufen", "🍽 Essen & Einkaufen", false);
	const task14 = createNewTask("Zahnarzttermin", "🏥 Gesundheit", false);
	const task15 = createNewTask("E-Mails beantworten", "📧 E-Mails & Kommunikation", false);

	taskManager.addTask(task1);
	taskManager.addTask(task2);
	taskManager.addTask(task3);
	taskManager.addTask(task4);
	taskManager.addTask(task5);
	taskManager.addTask(task6);
	taskManager.addTask(task7);
	taskManager.addTask(task8);
	taskManager.addTask(task9);
	taskManager.addTask(task10);
	taskManager.addTask(task11);
	taskManager.addTask(task12);
	taskManager.addTask(task13);
	taskManager.addTask(task14);
	taskManager.addTask(task15);

	createFrontend.initialUpdate();

	const taskCategories = document.querySelectorAll(".taskCategory");
	taskCategories.forEach((category) => {
		category.addEventListener("click", () => {
			const targetCategory = category.textContent;
			createFrontend.filterTasks(targetCategory);
			createFrontend.removeActiveClass();
			category.classList.add("activeButton");
		});
	});
	document.querySelector(".allCats").addEventListener("click", () => {
		createFrontend.updateTasks();
	});
});
