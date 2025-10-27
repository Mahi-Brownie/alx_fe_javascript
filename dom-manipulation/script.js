// ===============================
// Dynamic Quote Generator
// ===============================

// 1️⃣ Quotes array with text and category properties
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
  { text: "It always seems impossible until it’s done.", category: "Perseverance" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Courage" },
  { text: "Your limitation—it’s only your imagination.", category: "Inspiration" }
];

// 2️⃣ Function to select a random quote and update the DOM
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update DOM with quote
  quoteDisplay.innerHTML = `"${randomQuote.text}" <br><em>- ${randomQuote.category}</em>`;
}

// 3️⃣ Function to add a new quote to the array and update the DOM
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  // Validate input
  if (newText === "" || newCategory === "") {
    alert("Please fill in both the quote text and category.");
    return;
  }

  // Add new quote to array
  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);

  // Clear input fields
  textInput.value = "";
  categoryInput.value = "";

  // Update the DOM with the new quote
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${newQuote.text}" <br><em>- ${newQuote.category}</em>`;
}

// 4️⃣ Add event listeners for both buttons
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);
