// Run this on window load
window.onload = () => {
    getData();
}

// Global Variables
var table = document.getElementById('todoList');
// Local Storage Variables
var dataArr = new Array();

// Get input from input field
function takeInput() {
    var todo = document.getElementById('todoInput').value.trim();

    // Validate that a real input is entered and not whitespaces
    if (todo) {
        // display to do item
        displayToDo(todo);
        // Clear input field
        clearInput();
        clearData();
        saveData();
    } else {
        alert('Enter a real to do list item...')
        clearInput();
    }
}

function displayToDo(item) {
    // generate an ID - number of rows in table
    var id = table.rows.length;

    var row = table.insertRow();
    // give table row ID
    row.id = id;

    // Insert table data/cell
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);

    // Give each cell a class
    cell1.classList.add('task');
    cell2.classList.add('chkBox');
    cell3.classList.add('deleteBox');

    // Create a label for cell1
    var label = document.createElement('label');
    label.for = id;
    label.innerHTML = item;

    // Create a checkbox for cell2
    var chkBox = document.createElement('input');
    chkBox.type = 'checkbox';
    chkBox.setAttribute('name', id);
    chkBox.addEventListener('change', checked);

    // Create a delete button for cell3
    var remove = document.createElement('button');
    remove.id = id;
    // give button a onclick event
    remove.addEventListener('click', deleteRow);
    remove.innerHTML = '<i class="fas fa-trash-alt"></i>'

    cell1.appendChild(label);
    cell2.appendChild(chkBox);
    cell3.appendChild(remove);
}

// Function to clear input field
function clearInput() {
    document.getElementById('todoInput').value = '';
}

// On click of delete button, delete table row
function deleteRow() {
    document.getElementById(this.id).remove();
    clearData();
    saveData();
}

// Check if checkbox is checked
// If checked, change task label to italic strikethrough text
function checked() {
    var label = document.getElementById(this.name);
    if (this.checked) {
        label.style.fontStyle = 'italic';
        label.style.textDecorationLine = 'line-through';
        label.style.color = '#50507c';
    } else {
        label.style.fontStyle = 'normal';
        label.style.textDecorationLine = 'none';
        label.style.color = 'black';
    }
    clearData();
    saveData();
}

// Manage Local Storage Functions
// Save table data to local storage
function saveData() {
    for (i=0; i<table.rows.length; i++) {
        dataArr.push({
            task: document.getElementsByTagName('label')[i].innerText,
            check: document.getElementsByClassName('chkBox')[i].children[0].checked
        })
    }
    localStorage.setItem('localData', JSON.stringify(dataArr));
}

// Get data from local storage and display to table
function getData() {
    var storage = localStorage.getItem('localData');
    if (storage != null) {
        dataArr = JSON.parse(storage);
        showData();
    }
}

// Display data
function showData() {
    for (i=0; i<dataArr.length; i++) {
        // generate an ID - number of rows in table
        var id = table.rows.length;

        var row = table.insertRow();
        // give table row ID
        row.id = id;

        // Insert table data/cell
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
        var cell3 = row.insertCell(-1);

        // Give each cell a class
        cell1.classList.add('task');
        cell2.classList.add('chkBox');
        cell3.classList.add('deleteBox');

        // Create a label for cell1
        var label = document.createElement('label');
        label.for = id;
        label.innerHTML = dataArr[i].task;

        // Create a checkbox for cell2
        var chkBox = document.createElement('input');
        chkBox.type = 'checkbox';
        chkBox.setAttribute('name', id);
        chkBox.addEventListener('change', checked);
        // Check if data for check box was checked
        if (dataArr[i].check) {
            chkBox.checked = true;
            label.style.fontStyle = 'italic';
            label.style.textDecorationLine = 'line-through';
            label.style.color = '#50507c';
        }

        // Create a delete button for cell3
        var remove = document.createElement('button');
        remove.id = id;
        // give button a onclick event
        remove.addEventListener('click', deleteRow);
        remove.innerHTML = '<i class="fas fa-trash-alt"></i>'

        cell1.appendChild(label);
        cell2.appendChild(chkBox);
        cell3.appendChild(remove);
    }
}

// Empty local storage
function clearData() {
    dataArr = [];
    localStorage.clear();
}