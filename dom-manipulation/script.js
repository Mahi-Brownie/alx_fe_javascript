// ================================
// Dynamic Quote Generator
// ================================

// Step 1: Define the quotes array with objects containing text and category
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Wisdom" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "If you want to achieve greatness, stop asking for permission.", category: "Success" },
  { text: "It always seems impossible until it’s done.", category: "Perseverance" }
];

// Step 2: Function to display a random quote and update the DOM
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" <br> <em>- ${randomQuote.category}</em>`;
}

// Step 3: Function to add a new quote dynamically
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please fill in both fields before adding a quote.");
    return;
  }

  // Create a new quote object
  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory
  };

  // Add it to the quotes array
  quotes.push(newQuote);

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Immediately update DOM with new quote
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${newQuote.text}" <br> <em>- ${newQuote.category}</em>`;
}

// Step 4: Add event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

function showRandomQuote() {
  displayRandomQuote();
}
