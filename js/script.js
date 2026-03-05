// ===============================
// Dungeon Loot Splitter Script
// ===============================

// Persistent array to store loot objects
const lootArray = [];


// ===============================
// Event Listeners
// ===============================

document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", splitLoot);


// ===============================
// ADD LOOT FUNCTION
// ===============================

function addLoot(){

const lootNameInput = document.getElementById("lootName");
const lootValueInput = document.getElementById("lootValue");
const errorDisplay = document.getElementById("lootError");

const name = lootNameInput.value.trim();
const value = parseFloat(lootValueInput.value);

errorDisplay.textContent = "";

// Validation

if(name === ""){
errorDisplay.textContent = "Loot name cannot be empty.";
return;
}

if(isNaN(value)){
errorDisplay.textContent = "Loot value must be a number.";
return;
}

if(value < 0){
errorDisplay.textContent = "Loot value cannot be negative.";
return;
}

// Add object to array

lootArray.push({
name: name,
value: value
});

// Clear inputs

lootNameInput.value = "";
lootValueInput.value = "";

// Update UI

renderLoot();

}


// ===============================
// RENDER LOOT LIST
// ===============================

function renderLoot(){

const lootList = document.getElementById("lootList");
const totalLootDisplay = document.getElementById("totalLoot");

lootList.innerHTML = "";

let total = 0;

// Traditional for loop

for(let i = 0; i < lootArray.length; i++){

const li = document.createElement("li");

// Name
const nameSpan = document.createElement("span");
nameSpan.textContent = lootArray[i].name;

// Value
const valueSpan = document.createElement("span");
valueSpan.textContent = "$" + lootArray[i].value.toFixed(2);

// Remove button
const removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";

// Remove item when clicked
removeBtn.addEventListener("click", function(){
removeLoot(i);
});

li.appendChild(nameSpan);
li.appendChild(valueSpan);
li.appendChild(removeBtn);

lootList.appendChild(li);

// Add to total
total += lootArray[i].value;

}

// Update total display

totalLootDisplay.textContent = total.toFixed(2);

}


// ===============================
// REMOVE LOOT FUNCTION
// ===============================

function removeLoot(index){

lootArray.splice(index, 1);

renderLoot();

}


// ===============================
// SPLIT LOOT FUNCTION
// ===============================

function splitLoot(){

const partySizeInput = document.getElementById("partySize");
const splitError = document.getElementById("splitError");
const finalTotal = document.getElementById("finalTotal");
const lootPerMember = document.getElementById("lootPerMember");

const partySize = parseInt(partySizeInput.value);

splitError.textContent = "";

// Validate party size

if(isNaN(partySize) || partySize < 1){
splitError.textContent = "Party size must be at least 1.";
return;
}

if(lootArray.length === 0){
splitError.textContent = "No loot to split.";
return;
}

let total = 0;

// Loop to calculate total

for(let i = 0; i < lootArray.length; i++){

total += lootArray[i].value;

}

// Calculate split

const splitAmount = total / partySize;

// Update DOM

finalTotal.textContent = total.toFixed(2);
lootPerMember.textContent = splitAmount.toFixed(2);

}
    // Update DOM with formatted values
    finalTotal.textContent = total.toFixed(2);
    lootPerMember.textContent = splitAmount.toFixed(2);

}
