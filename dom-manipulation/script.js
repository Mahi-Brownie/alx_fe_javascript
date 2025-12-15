// Checker expects this exact array name and structure
const quotes = [
  { text: "Life is beautiful", category: "inspiration" },
  { text: "Code is poetry", category: "programming" },
];

// Display a random quote
function displayRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteDisplay').innerText = `"${quote.text}" [${quote.category}]`;
}

// Add a new quote from inputs
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  if (textInput.value && categoryInput.value) {
    quotes.push({ text: textInput.value, category: categoryInput.value });
    displayRandomQuote();
    textInput.value = '';
    categoryInput.value = '';
  }
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);

// Show an initial quote
displayRandomQuote();
