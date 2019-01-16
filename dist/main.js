//Define UI variables
const currentTimeBox = document.querySelector(".current-time");
const addNewBtn = document.querySelector(".add-new-btn");
const addNewPage = document.querySelector(".add-new-page");
const taskList = document.querySelector(".task-list");
const taskInput = document.querySelector("#new-task");
const addTaskBtn = document.querySelector('input[type="submit"]');
const addNewForm = document.querySelector(".input-field form");
const filterInput = document.querySelector("#filter");
const deleteBtn = document.querySelector(".delete-btn");

// Show current time
const today = new Date();
currentTimeBox.innerHTML = "Today is " + today.toLocaleDateString("pl-PL");

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
addNewBtn.addEventListener("click", showPage);

function showPage() {
  if (!addNewPage.className.includes("show-page")) {
    addNewPage.classList.add("show-page");
    addNewBtn.classList.add("move-btn");
    addNewBtn.firstElementChild.textContent = "GO";
    addNewBtn.lastElementChild.textContent = "BACK";
    randomQuote();
  } else {
    addNewPage.classList.remove("show-page");
    addNewBtn.classList.remove("move-btn");
    addNewBtn.firstElementChild.textContent = "NEW";
    addNewBtn.lastElementChild.textContent = "TASK";
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
  taskInput.value = "";
  showPage();
  e.preventDefault();
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
}

//Delete specific one
taskList.addEventListener("click", deleteOne);

function deleteOne(e) {
  if (e.target.parentElement.className == "delete-task") {
    e.target.parentElement.parentElement.remove();
  }
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
