// Quotes array with text and category properties
const quotes = [
  {
    text: "Faith is taking the first step even when you don't see the whole staircase.",
    category: "inspirational"
  },
  {
    text: "Discipline beats motivation every single time.",
    category: "motivation"
  },
  {
    text: "Small consistent steps create massive change.",
    category: "life"
  }
];

// Display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent =
    `"${randomQuote.text}" — (${randomQuote.category})`;
}

// Add a new quote dynamically
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    return;
  }

  quotes.push({
    text: newText,
    category: newCategory
  });

  textInput.value = "";
  categoryInput.value = "";

  displayRandomQuote();
}

// Event listener for the button
document
  .getElementById("newQuote")
  .addEventListener("click", displayRandomQuote);
