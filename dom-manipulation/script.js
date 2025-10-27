// ===============================
// Dynamic Quote Generator
// ===============================

// 1️ Quotes array with text and category properties
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
  { text: "It always seems impossible until it’s done.", category: "Perseverance" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Courage" },
  { text: "Your limitation—it’s only your imagination.", category: "Inspiration" }
];

// 2️ Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${randomQuote.text}" <br><em>- ${randomQuote.category}</em>`;
}

// 3️Function to add a new quote to the array and update the DOM
function addQuote() {
  const textInput = document.getElementById("new-quote");
  const categoryInput = document.getElementById("new-category");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim() || "Uncategorized";

  if (newText !== "") {
    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";

    // Update DOM with new quote
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `"${newQuote.text}" <br><em>- ${newQuote.category}</em>`;
  }
}

// 4️ Add event listeners for both buttons
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);
