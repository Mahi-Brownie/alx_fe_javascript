// --- Local Storage Keys ---
const QUOTES_KEY = "dynamicQuotes";
const LAST_QUOTE_KEY = "lastViewedQuote"; // For session storage

// --- Quotes Array ---
let quotes = [];

// --- DOM Elements ---
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
const exportJsonBtn = document.getElementById('exportJson');
const importFileInput = document.getElementById('importFile');

// --- Load Quotes from Local Storage ---
function loadQuotes() {
  const storedQuotes = localStorage.getItem(QUOTES_KEY);
  if (storedQuotes) {
    try {
      quotes = JSON.parse(storedQuotes);
    } catch (err) {
      console.error("Error parsing stored quotes:", err);
      quotes = [];
    }
  } else {
    // Default quotes if none are stored
    quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
      { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" }
    ];
    saveQuotes();
  }
}

// --- Save Quotes to Local Storage ---
function saveQuotes() {
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

// --- Show Random Quote ---
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Please add some!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;

  // Save last viewed quote to session storage
  sessionStorage.setItem(LAST_QUOTE_KEY, JSON.stringify(quote));
}

// --- Add New Quote ---
function addQuote() {
  const text = newQuoteTextInput.value.trim();
  const category = newQuoteCategoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  newQuoteTextInput.value = "";
  newQuoteCategoryInput.value = "";
  alert("New quote added successfully!");
}

// --- Export Quotes to JSON File ---
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- Import Quotes from JSON File ---
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (err) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(file);
}

// --- Event Listeners ---
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
exportJsonBtn.addEventListener('click', exportQuotes);
importFileInput.addEventListener('change', importFromJsonFile);

// --- Initialize App ---
loadQuotes();
const lastQuote = sessionStorage.getItem(LAST_QUOTE_KEY);
if (lastQuote) {
  const quote = JSON.parse(lastQuote);
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
} else {
  showRandomQuote();
}
