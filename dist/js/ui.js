// Show current time
const currentTimeBox = document.querySelector(".current-time");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
const today = new Date();
currentTimeBox.innerHTML =
  "Today is " + today.toLocaleDateString("en-GB", options);

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
const newTaskBtn = document.querySelector(".new-task-btn");
const addTaskBtn = document.querySelector("button.round-btn");
const addNewPage = document.querySelector(".add-new-page");

newTaskBtn.addEventListener("click", showNewTaskPage);

function showNewTaskPage() {
  if (!addNewPage.className.includes("show-page")) {
    addNewPage.classList.add("show-page");
    addTaskBtn.style.visibility = "visible";
    newTaskBtn.firstElementChild.textContent = "GO";
    newTaskBtn.lastElementChild.textContent = "BACK";
    // Display random quote
    getQuotes();
  } else {
    addNewPage.classList.remove("show-page");
    addTaskBtn.style.visibility = "hidden";
    newTaskBtn.firstElementChild.textContent = "NEW";
    newTaskBtn.lastElementChild.textContent = "TASK";
  }
}

// Show completed list page
const showCompletedBtn = document.querySelector(".show-completed-btn");
const completedListPage = document.querySelector(".completed-list-page");

showCompletedBtn.addEventListener("click", showCompletedPage);

function showCompletedPage() {
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

// Show random quotes from hell
const quoteBox = document.querySelector("blockquote");
const cite = document.querySelector("cite");

function getQuotes() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "js/quotes.json", true);

  xhr.onload = function() {
    if (this.status === 200) {
      const quotes = JSON.parse(this.responseText);
      randomQuote(quotes);
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
