// Define main UI variables
const taskInput = document.querySelector("#new-task");
const addNewForm = document.querySelector(".input-field form");
const taskList = document.querySelector(".todo-list");
const completedTaskList = document.querySelector(".completed-list");

/* -------------------------------------------
------------  Displaying Tasks ---------------
---------------------------------------------*/

// Create a task element in UI
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

// Show new tasks stored in LS
document.addEventListener("DOMContentLoaded", showNewTasks);

function showNewTasks() {
  // Check if there are any new tasks in LS
  const tasks = checkLocalStorage("tasks");
  // Display new tasks in UI
  for (const task of tasks) {
    createTaskInUI(task, taskList, "new");
  }
  countTasks();
}

// Show completed tasks stored in LS
document.addEventListener("DOMContentLoaded", showCompletedTasks);

function showCompletedTasks() {
  // Check if there are any completed tasks in LS
  const completedTasks = checkLocalStorage("completedTasks");
  // Display completed tasks in UI
  for (const task of completedTasks) {
    createTaskInUI(task, completedTaskList);
  }
  countCompleted();
}

// Add new task
addNewForm.addEventListener("submit", addNewTask);

function addNewTask(e) {
  if (taskInput.value === "") {
    showAlert();
    e.preventDefault();
    return;
  }
  // Add new task to UI
  createTaskInUI(taskInput.value, taskList, "new");
  // Add to LS
  addToLocalStorage(taskInput.value, "tasks");
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

/* -------------------------------------------
------------  Completing Tasks ---------------
---------------------------------------------*/

// Mark all tasks as complete
const markAllBtn = document.querySelector(".all-complete-btn");

markAllBtn.addEventListener("click", markAllComplete);

function markAllComplete() {
  // Check if there are any new tasks and stop executing if not
  if (taskList.children.length === 0) return;
  // Check if there is completed task list in LS
  let completedTasks = checkLocalStorage("completedTasks");
  // Get the whole new task list from LS and add to completed task list in LS
  const justCompletedTasks = JSON.parse(localStorage.getItem("tasks"));
  completedTasks = completedTasks.concat(justCompletedTasks);
  // Set new completed task list to LS
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  // Clear new task list in UI & LS
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
    // Remove this task from list of new tasks in LS
    removeFromLocalStorage(completedTask.textContent, "tasks");
    // Add it to completed task list in LS
    addToLocalStorage(completedTask.textContent, "completedTasks");
    // Remove it from new task list in UI
    completedTask.remove();
    // Add it to completed task list in UI
    createTaskInUI(completedTask.textContent, completedTaskList);
    // Update counters
    countTasks();
    countCompleted();
  }
}

/* ----------------------------------------
------------  Deleting Tasks ---------------
-----------------------------------------*/

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

// Delete one new task
taskList.addEventListener("click", deleteOneNew);

function deleteOneNew(e) {
  if (e.target.parentElement.className == "delete-task") {
    let deleteMe = e.target.parentElement.parentElement;
    removeFromLocalStorage(deleteMe.textContent, "tasks");
    deleteMe.remove();
    countTasks();
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
    removeFromLocalStorage(deleteMe.textContent, "completedTasks");
    deleteMe.remove();
    countCompleted();
  }
}

/* --------------------------------------------
-----------  Filtering Tasks  ----------------
-------------------------------------------- */

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

/* --------------------------------------------
-----------  Counting Tasks  ----------------
-------------------------------------------- */

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

/* --------------------------------------------
-----------  Managing Local Storage  ----------
-------------------------------------------- */

// Check if there is the list you need in Local Storage
function checkLocalStorage(LSlist) {
  if (localStorage.getItem(LSlist.toString()) === null) {
    LSlist = [];
  } else {
    LSlist = JSON.parse(localStorage.getItem(LSlist.toString()));
  }
  return LSlist;
}

// Add new item to the specific list in LocalStorage
function addToLocalStorage(newItem, LSlist) {
  tasks = checkLocalStorage(LSlist.toString());
  tasks.push(newItem);
  localStorage.setItem(LSlist, JSON.stringify(tasks));
}

// Remove one item from the speficic list in Local Storage
function removeFromLocalStorage(itemToRemove, LSlist) {
  const tasks = JSON.parse(localStorage.getItem(LSlist));
  tasks.forEach(function(task) {
    if (task == itemToRemove) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem(LSlist, JSON.stringify(tasks));
}
