//Define UI variables
const currentTimeBox = document.querySelector(".current-time");
const taskCounter = document.querySelector(".todo-counter");
const completedCounter = document.querySelector(".done-counter");
const newTaskBtn = document.querySelector(".new-task-btn");
const addNewPage = document.querySelector(".add-new-page");
const taskList = document.querySelector(".todo-list");
const taskInput = document.querySelector("#new-task");
const addTaskBtn = document.querySelector('input[type="submit"]');
const addNewForm = document.querySelector(".input-field form");
const filterInput = document.querySelector("#filter");
const deleteBtn = document.querySelector(".delete-btn");
const showCompletedBtn = document.querySelector(".show-completed-btn");
const completedListPage = document.querySelector(".completed-list-page");
const completedTaskList = document.querySelector(".completed-list");
const markAllBtn = document.querySelector(".all-complete-btn");

// Show current time
const today = new Date();
currentTimeBox.innerHTML = "Today is " + today.toLocaleDateString("pl-PL");

// Show tasks stored in LS
document.addEventListener("DOMContentLoaded", showTasks);

function showTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    const newTask = document.createElement("li");
    newTask.className = "task";
    newTask.appendChild(document.createTextNode(task));
    const markCompleted = document.createElement("a");
    markCompleted.className = "mark-complete";
    markCompleted.innerHTML = '<i class="far fa-check-circle"></i>';
    newTask.appendChild(markCompleted);
    const deleteTask = document.createElement("a");
    deleteTask.className = "delete-task";
    deleteTask.innerHTML = '<i class="far fa-times-circle"></i>';
    newTask.appendChild(deleteTask);
    taskList.appendChild(newTask);
  });
  countTasks();
}

// Show number of tasks to do
function countTasks() {
  taskCounter.innerHTML = taskList.children.length;
}

// Show number of completed tasks
function countCompleted() {
  // let do completed list first!
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
    showCompletedBtn.style.zIndex = 2;
    newTaskBtn.firstElementChild.textContent = "GO";
    newTaskBtn.lastElementChild.textContent = "BACK";
    randomQuote();
  } else {
    addNewPage.classList.remove("show-page");
    showCompletedBtn.style.zIndex = 5;
    newTaskBtn.firstElementChild.textContent = "NEW";
    newTaskBtn.lastElementChild.textContent = "TASK";
  }
}

// Show completed list page
showCompletedBtn.addEventListener("click", showPage2);

function showPage2() {
  if (!completedListPage.className.includes("show-page")) {
    completedListPage.classList.add("show-page");
    showCompletedBtn.firstElementChild.textContent = "GO";
    showCompletedBtn.lastElementChild.textContent = "BACK";
  } else {
    completedListPage.classList.remove("show-page");
    showCompletedBtn.firstElementChild.textContent = "SHOW";
    showCompletedBtn.lastElementChild.textContent = "DONE";
  }
}

// Add new task
addNewForm.addEventListener("submit", addTask);

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add new task");
    return;
  }

  const newTask = document.createElement("li");
  newTask.className = "task";

  newTask.appendChild(document.createTextNode(taskInput.value));
  const markCompleted = document.createElement("a");
  markCompleted.className = "mark-complete";
  markCompleted.innerHTML = '<i class="far fa-check-circle"></i>';
  newTask.appendChild(markCompleted);
  const deleteTask = document.createElement("a");
  deleteTask.className = "delete-task";
  deleteTask.innerHTML = '<i class="far fa-times-circle"></i>';
  newTask.appendChild(deleteTask);
  taskList.appendChild(newTask);
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
  for (let task of taskList.children) {
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
markAllBtn.addEventListener("click", markAllComplete);

function markAllComplete() {
  // check if there is sth in LS
  let completedTasks;
  if (localStorage.getItem("completedTasks") === null) {
    completedTasks = [];
  } else {
    completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
  }

  completedTasks.concat(JSON.parse(localStorage.getItem("tasks")));
  deleteAll();
  showCompletedTasks();
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
    showCompletedTasks();
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

  completedTasks.forEach(function(task) {
    const newTask = document.createElement("li");
    newTask.className = "task";
    newTask.appendChild(document.createTextNode(task));
    // const markCompleted = document.createElement("a");
    // markCompleted.className = "mark-complete";
    // markCompleted.innerHTML = '<i class="far fa-check-circle"></i>';
    // newTask.appendChild(markCompleted);
    // const deleteTask = document.createElement("a");
    // deleteTask.className = "delete-task";
    // deleteTask.innerHTML = '<i class="far fa-times-circle"></i>';
    // newTask.appendChild(deleteTask);
    completedTaskList.appendChild(newTask);
  });
  countCompleted();
}

// Random quotes from hell
const quotes = [
  {
    author: "Zig Ziglar",
    quote:
      "Lack of direction, not lack of time, is the problem. We all have twenty-four hour days."
  },
  {
    author: "Alexander Graham Bell",
    quote:
      "Concentrate all your thoughts upon the work at hand. The sun’s rays do not burn until brought to a focus."
  },
  {
    author: "Will Durant",
    quote:
      "We are what we repeatedly do. Excellence, then, is not an act but a habit."
  },
  {
    author: "Bruce Lee",
    quote: "The successful warrior is the average man, with laser-like focus."
  },
  {
    author: "Denis Waitley",
    quote:
      "Don’t dwell on what went wrong. Instead, focus on what to do next. Spend your energies on moving forward toward finding the answer."
  },
  {
    author: "Mike Hawkins",
    quote:
      "You don’t get results by focusing on results. You get results by focusing on the actions that produce results."
  },
  {
    author: "Brian Tracy",
    quote:
      "A clear vision, backed by definite plans, gives you a tremendous feeling of confidence and personal power."
  },
  {
    author: "Bill Gates",
    quote:
      "My success, part of it certainly, is that I have focused in on a few things."
  },
  {
    author: "Stuart Wilde",
    quote:
      "Discovering what you really want saves you endless confusion and wasted energy."
  },
  {
    author: "Zen proverb",
    quote: "When walking, walk. When eating, eat."
  },
  {
    author: "John Carmack",
    quote: "Focus is a matter of deciding what things you’re not going to do."
  },
  {
    author: "James Caviezel",
    quote:
      "I do what I do, and I do it well, and focus and take it one moment at a time."
  }
];

const quoteBox = document.querySelector("blockquote");
const cite = document.querySelector("cite");

function randomQuote() {
  const quotesAmount = quotes.length;
  const randomNumber = Math.floor(Math.random() * quotesAmount);
  quoteBox.textContent = quotes[randomNumber].quote;
  cite.textContent = quotes[randomNumber].author;
}
