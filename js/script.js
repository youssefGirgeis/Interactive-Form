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

// activities checkboxes
const activities = document.getElementById("activities");

// activities total cost
const totalCost = document.getElementById("activities-cost");

// payment method drop-down menu
const payment = document.getElementById("payment");

// credit card info
const creditCard = document.getElementById("credit-card");

// paypal info
const paypal = document.getElementById("paypal");

// bitcoin info
const bitcoin = document.getElementById("bitcoin");

// form
const form = document.getElementById("form");

const cvvInput = document.getElementById("cvv");
const zipCodeInput = document.getElementById("zip");

// Helper functions

/**
 *
 * @param cvv - credit card's cvv
 * @returns true if valid and false if not valid
 */
const isValidCVV = (cvv) => {
  const isValid = /^\d{3}$/.test(cvv);
  const borderColor = isValid ? "green" : "red";
  cvvInput.style.borderColor = borderColor;
  return isValid;
};

/**
 *
 * @param zipCode - credit card owner's zip cide
 * @returns true if valid and false if not valid
 */
const isvalidZipCode = (zipCode) => {
  zipCodeInput.style.borderColor = "red";
  // return zipCode.length === 5 && !isNaN(zipCode);
  return /^\d{5}$/.test(zipCode);
};

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

/**
 * Update the total cost when an activity is checked
 */
const updateTotalCost = () => {
  let total = 0;
  activities.addEventListener("change", (e) => {
    if (e.target.checked) total += parseInt(e.target.dataset.cost);
    else total -= parseInt(e.target.dataset.cost);

    totalCost.textContent = `Total: $${total}`;
  });
};

/**
 * hide paypal and bitcoin payment methods when form loads
 */
const hidePaymentMethods = () => {
  paypal.style.display = "none";
  bitcoin.style.display = "none";
};

/**
 * display payment method when selected and hide the others
 */
const selectPayment = () => {
  const paymentMethods = [creditCard, bitcoin, paypal];
  payment[1].selected = true;

  payment.addEventListener("change", (e) => {
    for (const paymentMethod of paymentMethods) {
      if (e.target.value === paymentMethod.id)
        paymentMethod.style.display = "block";
      else paymentMethod.style.display = "none";
    }
  });
};

form.addEventListener("submit", (e) => {
  if (isValidCVV(cvvInput.value) && isvalidZipCode(zipCodeInput.value)) {
    console.log("form is valid");
  } else {
    e.preventDefault();
  }
});

// function call
focusName();
hideOtherRole();
displayOtherRole();
disableColor();
displayColor();
updateTotalCost();
hidePaymentMethods();
selectPayment();
