// Loan calculator: computes the fixed monthly payment of a loan.

const form = document.getElementById("loan-form");
const errorBox = document.getElementById("error");
const resultBox = document.getElementById("result");

// Format a number with 2 decimals and thousands separators.
function formatMoney(value) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Standard loan formula: payment = P * r / (1 - (1 + r)^-n)
// P = loan amount, r = monthly rate, n = number of months
function monthlyPayment(principal, yearlyRatePercent, months) {
  const r = yearlyRatePercent / 100 / 12;
  if (r === 0) return principal / months; // no interest
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  resultBox.hidden = true;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const months = parseInt(document.getElementById("months").value, 10);

  if (!(amount > 0)) return showError("Enter a loan amount greater than 0.");
  if (!(rate >= 0)) return showError("Enter an interest rate of 0 or more.");
  if (!(months >= 1)) return showError("Enter a duration of at least 1 month.");

  const monthly = monthlyPayment(amount, rate, months);
  const total = monthly * months;

  errorBox.hidden = true;
  document.getElementById("monthly").textContent = formatMoney(monthly);
  document.getElementById("total").textContent = formatMoney(total);
  document.getElementById("interest").textContent = formatMoney(total - amount);
  resultBox.hidden = false;
});
