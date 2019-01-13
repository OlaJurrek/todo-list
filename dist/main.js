// Show current time
const currentTimeBox = document.querySelector(".current-time");

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

document.body.addEventListener("focusout", stayUpAll);

function stayUpAll(e) {
  if (e.target.className == "animated-form" && e.target.value !== "") {
    e.target.nextElementSibling.style.transition = "none";
    e.target.nextElementSibling.classList.add("label-up");
  }
  if (e.target.className == "animated-form" && e.target.value == "") {
    console.log("hi there");
    console.log(e.target.className);
    e.target.nextElementSibling.style.transition = "all .4s ease-in-out";
    e.target.nextElementSibling.classList.remove("label-up");
  }
}
const filterInput = document.querySelector(".filter-field input");
// filterInput.addEventListener("blur", stayUp);

function stayUp() {
  if (this.value !== "") {
  } else {
    this.nextElementSibling.style.transition = "all .4s ease-in-out";
    this.nextElementSibling.classList.remove("label-up");
  }
}

// Show add new task page
const addNewBtn = document.querySelector(".add-new-btn");
const addNewPage = document.querySelector(".add-new-page");

addNewBtn.addEventListener("click", showPage);

function showPage() {
  if (!addNewPage.className.includes("show-page")) {
    addNewPage.classList.add("show-page");
    addNewBtn.classList.add("move-btn");
    addNewBtn.firstElementChild.textContent = "GO";
    addNewBtn.lastElementChild.textContent = "BACK";
  } else {
    addNewPage.classList.remove("show-page");
    addNewBtn.classList.remove("move-btn");
    addNewBtn.firstElementChild.textContent = "NEW";
    addNewBtn.lastElementChild.textContent = "TASK";
  }
}

// Add new task
const taskList = document.querySelector(".tasks-list");
const taskInput = document.querySelector("#new-task");
const addTaskBtn = document.querySelector('input[type="submit"]');
const addNewForm = document.querySelector(".input-field form");

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
