// Array of quotes
const quotes = [
  "The future belongs to those who believe in the beauty of their dreams.",
  "It always seems impossible until it’s done.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "You miss 100% of the shots you don’t take.",
  "Don’t watch the clock; do what it does. Keep going."
];

//  Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteText = document.getElementById("quote-text");
  quoteText.textContent = randomQuote;
}

//  Function to add a new quote
function addQuote() {
  const newQuoteInput = document.getElementById("new-quote");
  const newQuote = newQuoteInput.value.trim();

  if (newQuote !== "") {
    quotes.push(newQuote);
    newQuoteInput.value = "";
    displayRandomQuote(); // Update DOM after adding
  }
}

// Event listeners for buttons
document
  .getElementById("new-quote-btn")
  .addEventListener("click", displayRandomQuote);

document
  .getElementById("add-quote-btn")
  .addEventListener("click", addQuote);

//  Display an initial quote when the page loads
window.addEventListener("load", displayRandomQuote);
