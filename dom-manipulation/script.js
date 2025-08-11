// Quotes array with text and category
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" }
];

// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');

// Show a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Please add some!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// Add a new quote dynamically
function addQuote() {
  const text = newQuoteTextInput.value.trim();
  const category = newQuoteCategoryInput.value.trim();

  if (text === "" || category === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Create quote object
  const newQuote = { text, category };

  // Add to quotes array
  quotes.push(newQuote);

  // Clear inputs
  newQuoteTextInput.value = "";
  newQuoteCategoryInput.value = "";

  // Show confirmation
  alert("New quote added successfully!");
}

// Event Listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);

// Show a random quote on page load
showRandomQuote();
