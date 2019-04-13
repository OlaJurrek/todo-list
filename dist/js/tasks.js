//Define main UI variables
const taskInput = document.querySelector("#new-task");
const addNewForm = document.querySelector(".input-field form");
const taskList = document.querySelector(".todo-list");
const completedTaskList = document.querySelector(".completed-list");

// Show new tasks stored in LS
document.addEventListener("DOMContentLoaded", showTasks);

function showTasks() {
  // Check if there are any tasks in LS
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // Display all tasks in UI
  for (const task of tasks) {
    createTaskInUI(task, taskList, "new");
  }
  countTasks();
}

// Show completed task on completed task page
document.addEventListener("DOMContentLoaded", showCompletedTasks);

function showCompletedTasks() {
  // check if there is sth in LS
  let completedTasks;
  if (localStorage.getItem("completedTasks") === null) {
    completedTasks = [];
  } else {
    completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
  }

  for (const task of completedTasks) {
    createTaskInUI(task, completedTaskList);
  }
  countCompleted();
}

// Show number of tasks to do
const taskCounter = document.querySelector(".todo-counter");

function countTasks() {
  taskCounter.innerHTML = taskList.children.length;
}

// Show number of completed tasks
const completedCounter = document.querySelector(".done-counter");

function countCompleted() {
  completedCounter.innerHTML = completedTaskList.children.length;
}

// Add new task
addNewForm.addEventListener("submit", addNewTask);

function createTaskInUI(value, list, status = "completed") {
  // Create new li element
  const task = document.createElement("li");
  task.className = "task";
  task.appendChild(document.createTextNode(value));
  if (status === "new") {
    // Create and add completed icon
    const markCompleted = document.createElement("a");
    markCompleted.className = "mark-complete";
    markCompleted.innerHTML = '<i class="far fa-check-circle"></i>';
    task.appendChild(markCompleted);
  }
  // Create and add delete icon
  const deleteTask = document.createElement("a");
  deleteTask.className = "delete-task";
  deleteTask.innerHTML = '<i class="far fa-times-circle"></i>';
  task.appendChild(deleteTask);
  // Add li to list
  list.appendChild(task);
}

function addNewTask(e) {
  if (taskInput.value === "") {
    showAlert();
    e.preventDefault();
    return;
  }
  // Add new task to UI
  createTaskInUI(taskInput.value, taskList, "new");
  // Add to LS
  addToLocalStorage(taskInput.value);
  // Change counter
  countTasks();
  // Clear input field
  taskInput.value = "";
  // Go back to main page
  showNewTaskPage();
  e.preventDefault();
}

// Show alert if input field is empty
function showAlert() {
  const label = document.querySelector("#new-task-form label");
  label.classList.add("alert");
  label.textContent = "Add a new task first";
  setTimeout(function() {
    label.classList.remove("alert");
    label.textContent = "What do you REALLY need to do?";
  }, 1500);
}

// Add new task to LocalStorage
function addToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Task filters
document.querySelector("#new-filter").addEventListener("keyup", filterTasks);
document
  .querySelector("#completed-filter")
  .addEventListener("keyup", filterTasks);

function filterTasks(e) {
  const filteredList = e.target.parentElement.parentElement.nextElementSibling;
  for (const task of filteredList.children) {
    if (task.textContent.indexOf(e.target.value) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  }
}

// Delete all new tasks
const deleteAllNewBtn = document.querySelector("main .all-delete-btn");

deleteAllNewBtn.addEventListener("click", deleteAllNew);

function deleteAllNew() {
  while (taskList.firstChild) {
    taskList.lastChild.remove();
  }
  localStorage.removeItem("tasks");
  countTasks();
}

//Delete one new task
taskList.addEventListener("click", deleteOne);

function deleteOne(e) {
  if (e.target.parentElement.className == "delete-task") {
    let deleteMe = e.target.parentElement.parentElement;
    removeTaskFromLocalStorage(deleteMe.textContent, "tasks");
    deleteMe.remove();
    countTasks();
  }
}

// Remove one task from LS
function removeTaskFromLocalStorage(taskToRemove, LSlist) {
  const tasks = JSON.parse(localStorage.getItem(LSlist));
  tasks.forEach(function(task) {
    if (task == taskToRemove) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem(LSlist, JSON.stringify(tasks));
}

// Mark all tasks as complete
const markAllBtn = document.querySelector(".all-complete-btn");

markAllBtn.addEventListener("click", markAllComplete);

function markAllComplete() {
  // Check if there are any new tasks and stop executing if not
  if (taskList.children.length === 0) return;
  // Check if there is completed task list in LS
  let completedTasks;
  if (localStorage.getItem("completedTasks") === null) {
    completedTasks = [];
  } else {
    completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
  }
  // Get the whole new task list from LS and add to completed task list
  const justCompletedTasks = JSON.parse(localStorage.getItem("tasks"));
  completedTasks = completedTasks.concat(justCompletedTasks);
  // Set new completed task list to LS
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  // Clear new task list in LS
  deleteAllNew();
  // Add all new tasks to completed task list in UI
  for (const task of justCompletedTasks) {
    createTaskInUI(task, completedTaskList);
  }
  countCompleted();
}

// Mark one task as complete
taskList.addEventListener("click", markOneComplete);

function markOneComplete(e) {
  if (e.target.parentElement.className == "mark-complete") {
    let completedTask = e.target.parentElement.parentElement;
    removeTaskFromLocalStorage(completedTask.textContent, "tasks");
    let completedTasks;
    if (localStorage.getItem("completedTasks") === null) {
      completedTasks = [];
    } else {
      completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
    }

    completedTasks.push(completedTask.textContent);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    completedTask.remove();
    createTaskInUI(completedTask.textContent, completedTaskList);
    countTasks();
    countCompleted();
  }
}

// Delete all completed tasks
const deleteAllCompletedBtn = document.querySelector(
  ".completed-list-page .all-delete-btn"
);

deleteAllCompletedBtn.addEventListener("click", deleteAllCompleted);

function deleteAllCompleted() {
  while (completedTaskList.firstChild) {
    completedTaskList.lastChild.remove();
  }
  localStorage.removeItem("completedTasks");
  countCompleted();
}

// Delete one completed task
completedTaskList.addEventListener("click", deleteOneCompleted);

function deleteOneCompleted(e) {
  if (e.target.parentElement.className == "delete-task") {
    let deleteMe = e.target.parentElement.parentElement;
    removeTaskFromLocalStorage(deleteMe.textContent, "completedTasks");
    deleteMe.remove();
    countCompleted();
  }
}
