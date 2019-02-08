//Define main UI variables
const newTaskBtn = document.querySelector(".new-task-btn");
const addNewPage = document.querySelector(".add-new-page");
const taskList = document.querySelector(".todo-list");
const taskInput = document.querySelector("#new-task");
const addTaskBtn = document.querySelector("button.round-btn");
const addNewForm = document.querySelector(".input-field form");
const filterInput = document.querySelector("#filter");
const deleteBtn = document.querySelector(".delete-btn");
const showCompletedBtn = document.querySelector(".show-completed-btn");
const completedListPage = document.querySelector(".completed-list-page");
const completedTaskList = document.querySelector(".completed-list");

// Show current time
const currentTimeBox = document.querySelector(".current-time");
const today = new Date();
currentTimeBox.innerHTML = "Today is " + today.toLocaleDateString("pl-PL");

// Show tasks stored in LS
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
  // Update new task counter
  countTasks();
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

// Label goes up if the input is focused
document.body.addEventListener("focusin", labelUp);

function labelUp(e) {
  if (e.target.className == "animated-form") {
    e.target.nextElementSibling.classList.add("label-up");
  }
}

// Block label to come back into position if there is a value in the input
document.body.addEventListener("focusout", stayUp);

function stayUp(e) {
  if (e.target.className == "animated-form" && e.target.value !== "") {
    e.target.nextElementSibling.style.transition = "none";
    e.target.nextElementSibling.classList.add("label-up");
  }
  if (e.target.className == "animated-form" && e.target.value == "") {
    e.target.nextElementSibling.style.transition = "all .4s ease-in-out";
    e.target.nextElementSibling.classList.remove("label-up");
  }
}

// Show add new task page
newTaskBtn.addEventListener("click", showPage);

function showPage() {
  if (!addNewPage.className.includes("show-page")) {
    addNewPage.classList.add("show-page");
    addTaskBtn.style.zIndex = 5;
    newTaskBtn.firstElementChild.textContent = "GO";
    newTaskBtn.lastElementChild.textContent = "BACK";
    // Display random quote
    getQuotes();
  } else {
    addNewPage.classList.remove("show-page");
    addTaskBtn.style.zIndex = -1;
    newTaskBtn.firstElementChild.textContent = "NEW";
    newTaskBtn.lastElementChild.textContent = "TASK";
  }
}

// Show completed list page
showCompletedBtn.addEventListener("click", showPage2);

function showPage2() {
  if (!completedListPage.className.includes("show-page")) {
    completedListPage.classList.add("show-page");
    showCompletedBtn.style.top = "1.3rem";
    showCompletedBtn.firstElementChild.textContent = "GO";
    showCompletedBtn.lastElementChild.textContent = "BACK";
  } else {
    completedListPage.classList.remove("show-page");
    showCompletedBtn.style.top = "7.5rem";
    showCompletedBtn.firstElementChild.textContent = "SHOW";
    showCompletedBtn.lastElementChild.textContent = "DONE";
  }
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
    alert("Add new task");
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
  showPage();
  e.preventDefault();
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

// Filter tasks
filterInput.addEventListener("keyup", filterTasks);

function filterTasks() {
  for (const task of taskList.children) {
    if (task.textContent.indexOf(filterInput.value) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  }
}

// Delete all
deleteBtn.addEventListener("click", deleteAll);

function deleteAll() {
  while (taskList.firstChild) {
    taskList.lastChild.remove();
  }
  localStorage.removeItem("tasks");
  countTasks();
}

//Delete specific one
taskList.addEventListener("click", deleteOne);

function deleteOne(e) {
  if (e.target.parentElement.className == "delete-task") {
    let deleteMe = e.target.parentElement.parentElement;
    removeTaskFromLocalStorage(deleteMe.textContent);
    deleteMe.remove();
    countTasks();
  }
}

// Remove one task from LS
function removeTaskFromLocalStorage(taskToRemove) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function(task) {
    if (task == taskToRemove) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
  deleteAll();
  // Add all new tasks to completed task list in UI
  for (const task of justCompletedTasks) {
    createTaskInUI(task, completedTaskList);
  }
  // Update completed tasks counter
  countCompleted();
}

// Mark one task as complete
taskList.addEventListener("click", markOneComplete);

function markOneComplete(e) {
  if (e.target.parentElement.className == "mark-complete") {
    let completedTask = e.target.parentElement.parentElement;
    removeTaskFromLocalStorage(completedTask.textContent);
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

// Random quotes from hell
const quoteBox = document.querySelector("blockquote");
const cite = document.querySelector("cite");

function getQuotes() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "qutes.json", true);

  xhr.onload = function() {
    if (this.status === 200) {
      const quotes = JSON.parse(this.responseText);
      randomQuote(quotes);
    } else {
      // Remove left border and quotes on page if it's impossible to display a quote
      quoteBox.remove();
    }
  };

  xhr.send();
}

function randomQuote(quotes) {
  const quotesAmount = quotes.length;
  const randomNumber = Math.floor(Math.random() * quotesAmount);
  quoteBox.textContent = quotes[randomNumber].quote;
  cite.textContent = quotes[randomNumber].author;
}
