// global varibales

//Name
const nameInput = document.getElementById("name");

// input for the other role
const customRole = document.getElementById("other-job-role");

// Job Role drop-down menu
const jobRole = document.getElementById("title");

// colors drop-down menu
const colors = document.getElementById("color");

// design drop-down menu
const design = document.getElementById("design");

// Main functions

/**
 * When the page first loads,
 * the first text field should have the focus state
 */
const focusName = () => {
  nameInput.focus();
};

/**
 * hide the "other job role" input when the form first loads
 */
const hideOtherRole = () => {
  customRole.hidden = true;
};

/**
 * display/hide "other job role" input based on user's selection
 */
const displayOtherRole = () => {
  jobRole.addEventListener("change", (e) => {
    if (e.target.value === "other") customRole.hidden = false;
    else customRole.hidden = true;
  });
};

/**
 * Diable the color menu when form loads
 */
const disableColor = () => {
  colors.disabled = true;
};

/**
 * Enable the color menu and display colors
 * based on the user's design (design menu) selection
 */
const displayColor = () => {
  design.addEventListener("change", (e) => {
    colors.disabled = false;
    for (let i = 1; i < colors.length; i++) {
      if (colors[i].dataset.theme != e.target.value) {
        colors[i].hidden = true;
      } else {
        colors[i].hidden = false;
      }
    }
  });
};

// function call
focusName();
hideOtherRole();
displayOtherRole();
disableColor();
displayColor();
