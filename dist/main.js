// Show current time
const currentTimeBox = document.querySelector(".current-time");

const today = new Date();
currentTimeBox.innerHTML = "Today is " + today.toLocaleDateString("pl-PL");

// Block label to come back into position if there is a value
const inputs = document.querySelectorAll('input[type="text"]');

// {inputs.forEach(function(input) {
//   if (input.value != "") {
//     input.nextElementSibling.style.transition = "none";
//   }
// });

//2nd attemp
const filterInput = document.querySelector(".filter-field input");

filterInput.addEventListener("focus", function() {
  filterInput.nextElementSibling.classList.add("label-up");
});

filterInput.addEventListener("blur", function() {
  if (filterInput.value !== "") {
    filterInput.nextElementSibling.style.transition = "none";
    filterInput.nextElementSibling.classList.add("label-up");
  } else {
    filterInput.nextElementSibling.style.transition = "all .4s ease-in-out";
    filterInput.nextElementSibling.classList.remove("label-up");
  }
});

// if (filterInput.value !== "") {
//   filterInput.nextElementSibling.style.background = "teal";
// }
