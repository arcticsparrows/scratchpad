/*
  const makes sure the value stays the same.
  noteInput, addNoteButton, etc. are the names I gave to my elements (with ID) from HTML like item-input and add-item-button.
  document.getElementById is a built-in JavaScript function that finds an element in the HTML with the ID.
*/

const noteInput = document.getElementById('note-input');
const addNoteButton = document.getElementById('add-note-button');
const draftBoard = document.getElementById('draft-board');
const clearAllButton = document.getElementById('clear-all');
const listArr = []; // Creates an empty array or list, ready to store items later.

function checkDuplicate() { // checkDuplicate is the name of the function.
    const itemText = noteInput.value.trim();
    /* 
      itemText is the variable and is equal to noteInput.value, which just fetches (reads) the text typed in the input box so JavaScript knows what to work with, while adding .trim removes any extra spaces at the beginning and end. 
    */ 

    if (itemText && !listArr.includes(itemText)) {
    /* itemText stores what the user typed, and if the input box is empty, it counts as false; if there’s text, it counts as true. The && (AND) means both conditions must be true for the code to run; otherwise, it goes to else. listArr.includes(itemText) checks if the item is already in the list, and ! (NOT) flips the result—if the item is found, it becomes false, and if it’s not found, it becomes true.*/
        listArr.push(itemText); // .push → Adds itemText to the listArr array.
        renderList(); // A render function, updating the list by erasing and rewriting all items, ensuring new ones appear, in this case.
    } else { // Runs when the if condition is false (meaning the item is a duplicate or nothing was typed).
        alert("You can't add a blank note or a duplicate.");
    }
}

function removeItem(index) { // removeItem is the function's name, while index is the parameter used to remove the item.
    listArr.splice(index, 1); // splice, in this case, removes an item, and the 1 represents the amount to be deleted.
    renderList();
    // A render function, updating the list by erasing and rewriting all items, ensuring the removed item no longer appears, in this case.
}

function renderList() {
    draftBoard.innerHTML = ''; // Removes everything inside the <ul> element, including the list items.
    listArr.forEach((gift, index) => { 
        /* 
          Using forEach loops through each item in your list (listArr), creates an <li> for each item, and displays them on the webpage. gift is the name of the items. The whole line means "For every item in listArr, use the current value (gift) and its position (index) to do something inside the curly braces ({})." 
        */
        const listItem = document.createElement('li'); // document.createElement creates a new HTML element, specifically a <li>.
        listItem.textContent = gift; // It's like giving listItem the text from gift so it displays that text.

        const deleteButton = document.createElement('button'); // Creates a news button named deleteButton.
        deleteButton.textContent = 'Remove'; // The button displays the text "Delete."
        deleteButton.onclick = () => removeItem(index); 
        // When the button is clicked, it calls the removeItem function and pass the index of the item to remove.
        listItem.appendChild(deleteButton); // The parent element is listItem, and a child element, deleteButton, will be added inside it.

        draftBoard.appendChild(listItem); // The parent element is draftBoard, and a child element, listItem, will be added inside it.
    });
    noteInput.value = ''; 
    // Clears the input field by setting its value to an empty string, so the text inside it disappears after adding an item.
}

// addNoteButton waits for the event (getting clicked), then it checks if there's a duplicate by running the checkDuplicate function.
addNoteButton.addEventListener('click', checkDuplicate);

// noteInput waits for a key to be pressed (an event). If the key pressed is Enter, the checkDuplicate function will run.
noteInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate();
    }
});

// clearAllButton waits for a click event, then clears listArr by setting its length to 0, and calls renderList to update the list display.
clearAllButton.addEventListener('click', () => { //
    listArr.length = 0;  
    renderList();  
});

/*
  The () before => is required since it's part of the arrow function syntax, but it will be empty if there are no parameters needed for that function or in other words, we don't need to add anything since it doesn't need any input values to work, and just runs the code inside {} when triggered.
*/