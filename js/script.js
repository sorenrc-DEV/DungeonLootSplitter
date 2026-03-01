// ===============================
// Dungeon Loot Splitter Script
// ===============================

// Persistent array to store all loot items
// This array holds objects with name + value properties
// It remains in memory while the page is active
const lootArray = [];


// ===============================
// Event Listeners
// ===============================

// Button click triggers addLoot function
document.getElementById("addLootBtn").addEventListener("click", addLoot);

// Button click triggers splitLoot function
document.getElementById("splitLootBtn").addEventListener("click", splitLoot);


// ===============================
// ADD LOOT FUNCTION
// ===============================
function addLoot() {

    // Access DOM elements using getElementById (assignment requirement)
    const lootNameInput = document.getElementById("lootName");
    const lootValueInput = document.getElementById("lootValue");
    const errorDisplay = document.getElementById("lootError");

    // Retrieve and clean user input
    const name = lootNameInput.value.trim();
    const value = parseFloat(lootValueInput.value);

    // Clear previous error messages
    errorDisplay.textContent = "";

    // -------------------------------
    // Input Validation (Conditional Logic)
    // -------------------------------

    // Ensure name is not empty
    if (name === "") {
        errorDisplay.textContent = "Loot name cannot be empty.";
        return; // Stop execution if invalid
    }

    // Ensure value is a number
    if (isNaN(value)) {
        errorDisplay.textContent = "Loot value must be a valid number.";
        return;
    }

    // Prevent negative values
    if (value < 0) {
        errorDisplay.textContent = "Loot value cannot be negative.";
        return;
    }

    // -------------------------------
    // Store Object in Array
    // -------------------------------

    // Push new loot object into persistent array
    lootArray.push({
        name: name,
        value: value
    });

    // Clear form inputs after successful submission
    lootNameInput.value = "";
    lootValueInput.value = "";

    // Re-render loot list to reflect updated array
    renderLoot();

    // Reset split results when new loot is added
    document.getElementById("finalTotal").textContent = "0.00";
    document.getElementById("lootPerMember").textContent = "0.00";
}


// ===============================
// RENDER LOOT FUNCTION
// ===============================
function renderLoot() {

    const lootList = document.getElementById("lootList");
    const totalLootDisplay = document.getElementById("totalLoot");

    // Clear previous list before rebuilding
    lootList.innerHTML = "";

    let total = 0;

    // Traditional for loop required by assignment
    // Loop iterates through array to:
    // 1. Dynamically create list elements
    // 2. Calculate running total
    for (let i = 0; i < lootArray.length; i++) {

        const li = document.createElement("li");

        // Format value to 2 decimal places (currency formatting)
        li.textContent = lootArray[i].name + 
            " - $" + lootArray[i].value.toFixed(2);

        lootList.appendChild(li);

        total += lootArray[i].value;
    }

    // Update total display in DOM
    totalLootDisplay.textContent = total.toFixed(2);
}


// ===============================
// SPLIT LOOT FUNCTION
// ===============================
function splitLoot() {

    const partySizeInput = document.getElementById("partySize");
    const splitError = document.getElementById("splitError");
    const finalTotal = document.getElementById("finalTotal");
    const lootPerMember = document.getElementById("lootPerMember");

    splitError.textContent = "";

    const partySize = parseInt(partySizeInput.value);

    // Validate party size
    if (isNaN(partySize) || partySize < 1) {
        splitError.textContent = "Party size must be at least 1.";
        return;
    }

    // Prevent splitting if no loot exists
    if (lootArray.length === 0) {
        splitError.textContent = "No loot to split.";
        return;
    }

    let total = 0;

    // Traditional for loop to calculate total again
    // (demonstrates independent calculation logic)
    for (let i = 0; i < lootArray.length; i++) {
        total += lootArray[i].value;
    }

    // Divide total evenly among party members
    const splitAmount = total / partySize;

    // Update DOM with formatted values
    finalTotal.textContent = total.toFixed(2);
    lootPerMember.textContent = splitAmount.toFixed(2);
}