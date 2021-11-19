// global varibales

//Name
const nameInput = document.getElementById("name");

// input for the other role
const customRole = document.getElementById("other-job-role");

// Job Role drop-down menu
const jobRole = document.getElementById("title");

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

// function call
focusName();
hideOtherRole();
displayOtherRole();
