// global varibales

//Name
const nameInput = document.getElementById("name");

// input for the other role
const customRole = document.getElementById("other-job-role");

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

// function calls
focusName();
hideOtherRole();
