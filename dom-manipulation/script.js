// --- Storage Keys ---
const QUOTES_KEY = "dynamicQuotes";
const LAST_QUOTE_KEY = "lastViewedQuote";
const LAST_FILTER_KEY = "lastSelectedCategory";

// --- Mock Server URL (replace with your real endpoint if available) ---
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Simulating server
// For real sync, you'd replace with your actual API endpoint

let quotes = [];

// --- DOM Elements ---
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
const exportJsonBtn = document.getElementById('exportJson');
const importFileInput = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');
const syncStatus = document.getElementById('syncStatus');
const manualSyncBtn = document.getElementById('manualSync');

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
    quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
      { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" }
    ];
    saveQuotes();
  }
}

// --- Save Quotes ---
function saveQuotes() {
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

// --- Populate Category Dropdown ---
function populateCategories() {
  const categories = ["All Categories", ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");

  const savedFilter = localStorage.getItem(LAST_FILTER_KEY);
  if (savedFilter && categories.includes(savedFilter)) {
    categoryFilter.value = savedFilter;
  }
}

// --- Show Random Quote ---
function showRandomQuote() {
  let filteredQuotes = quotes;
  const selectedCategory = categoryFilter.value;
  if (selectedCategory && selectedCategory !== "All Categories") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
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
  populateCategories();

  newQuoteTextInput.value = "";
  newQuoteCategoryInput.value = "";
  alert("New quote added successfully!");
}

// --- Filter Quotes ---
function filterQuotes() {
  localStorage.setItem(LAST_FILTER_KEY, categoryFilter.value);
  showRandomQuote();
}

// --- Export Quotes ---
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

// --- Import Quotes ---
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
        populateCategories();
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

// --- Simulated Server Sync ---
async function syncWithServer() {
  setSyncStatus("🔄 Syncing with server...");

  try {
    const res = await fetch(SERVER_URL);
    const serverData = await res.json();

    // Simulate server quotes (JSONPlaceholder doesn't have quotes, so we fake categories)
    const serverQuotes = serverData.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    // Conflict resolution: server wins
    let conflicts = [];
    serverQuotes.forEach(sq => {
      const match = quotes.find(lq => lq.text === sq.text);
      if (!match) {
        quotes.push(sq);
      } else {
        conflicts.push(sq);
      }
    });

    saveQuotes();
    populateCategories();

    if (conflicts.length > 0) {
      alert(`Conflict detected: ${conflicts.length} quote(s) replaced by server version.`);
    }

    setSyncStatus("✅ Sync complete.");
  } catch (error) {
    console.error("Sync failed:", error);
    setSyncStatus("❌ Sync failed.");
  }
}

// --- Sync Status Helper ---
function setSyncStatus(msg) {
  syncStatus.textContent = msg;
}

// --- Event Listeners ---
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
exportJsonBtn.addEventListener('click', exportQuotes);
importFileInput.addEventListener('change', importFromJsonFile);
categoryFilter.addEventListener('change', filterQuotes);
manualSyncBtn.addEventListener('click', syncWithServer);

// --- Init ---
loadQuotes();
populateCategories();

// Show last viewed quote or random one
const lastQuote = sessionStorage.getItem(LAST_QUOTE_KEY);
if (lastQuote) {
  const quote = JSON.parse(lastQuote);
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
} else {
  showRandomQuote();
}

// Periodic background sync every 60 seconds
setInterval(syncWithServer, 60000);
