// Show current time

const currentTimeBox = document.querySelector(".current-time");

const today = new Date();
currentTimeBox.innerHTML = "Today is " + today.toLocaleDateString("pl-PL");
