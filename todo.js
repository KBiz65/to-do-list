allTaskItems = [];

function addItem() {
  const taskToAdd = document.getElementById("task");
  // console.log(taskToAdd.value);
  allTaskItems.push({ text: taskToAdd.value, isChecked: false });
  displayItemsList();
  saveToStorage(allTaskItems);
  taskToAdd.value = "";
}

function displayItemsList() {
  const unorderedList = document.getElementById("taskItems");
  const arrayObject = allTaskItems[allTaskItems.length - 1];
  const arrayTask = arrayObject.text;
  const newLineItem = document.createElement("li");
  newLineItem.setAttribute("id", "lineItems");

  const newDivItem = document.createElement("div");
  newDivItem.setAttribute("id", "taskLine");

  const newInputItem = document.createElement("input");
  newInputItem.setAttribute("id", "taskComplete");
  newInputItem.setAttribute("type", "checkbox");

  const newTaskTextItem = document.createElement("p");
  newTaskTextItem.setAttribute("id", "taskText");

  const newImageItem = document.createElement("img");
  newImageItem.setAttribute("id", "taskDelete");
  newImageItem.setAttribute("src", "images/redx.png");
  newImageItem.setAttribute("alt", "red brushstroke x");

  newTaskTextItem.appendChild(document.createTextNode(arrayTask));

  newDivItem.appendChild(newInputItem);
  newDivItem.appendChild(newTaskTextItem);
  newDivItem.appendChild(newImageItem);

  newLineItem.appendChild(newDivItem);
  unorderedList.appendChild(newLineItem);
}

function saveToStorage(taskToAdd) {
  console.log(taskToAdd);
  console.log(allTaskItems.length);
  window.localStorage.setItem("allTasks", JSON.stringify(taskToAdd));
}

function retrieveFromStorage() {
  allItemsInStorage = JSON.parse(window.localStorage.getItem("allTasks"));
  // console.log(allItemsInStorage);

  if (allItemsInStorage === null) {
    //if nothing is in storage, it does nothing except print to the console
    console.log("Nothing is in broswer storage");
  } else {
    // if things are in storage it retrieves the items and displays them on page
    console.log(allItemsInStorage);

    for (i = 0; i < allItemsInStorage.length; i++) {
      allTaskItems.push(allItemsInStorage[i]);
      console.log(allItemsInStorage[i].isChecked);

      if (allItemsInStorage[i].isChecked === false) {
        displayItemsList(false);
      } else {
        displayItemsList(true);
      }
    }
  }
}

window.addEventListener(
  "keypress",
  function (e) {
    if (e.keyCode === 13) {
      addItem();
    }
  },
  false
);

const enterButton = document
  .getElementById("enterButton")
  .addEventListener("click", addItem);

const checkbox = document.getElementById("taskItems");
checkbox.addEventListener("click", function (e) {
  if (e.target.id === "taskComplete") {
    if (e.target.checked) {
      // checkbox is checked
      const strikethrough = e.target.nextSibling;
      strikethrough.setAttribute("class", "strikethrough");
      // change storage value isChecked to true
      allItemsInStorage = JSON.parse(window.localStorage.getItem("allTasks"));
      // iterate through storage items to find the correct task to change value to true
      for (i = 0; i < allItemsInStorage.length; i++) {
        if (allItemsInStorage[i].text === strikethrough.textContent) {
          console.log(allItemsInStorage);
          allItemsInStorage[i].isChecked = true;
          window.localStorage.setItem(
            "allTasks",
            JSON.stringify(allItemsInStorage)
          );
        }
      }
    } else {
      // checkbox is not checked
      const strikethrough = e.target.nextSibling;
      strikethrough.removeAttribute("class");

      allItemsInStorage = JSON.parse(window.localStorage.getItem("allTasks"));
      // iterate through storage items to find the correct task to change value to true
      for (i = 0; i < allItemsInStorage.length; i++) {
        if (allItemsInStorage[i].text === strikethrough.textContent) {
          console.log(allItemsInStorage);
          allItemsInStorage[i].isChecked = false;
          window.localStorage.setItem(
            "allTasks",
            JSON.stringify(allItemsInStorage)
          );
        }
      }
    }
  }
});

const deleteButton = document.getElementById("taskItems");
deleteButton.addEventListener("click", function (e) {
  // runs when the red x picture is clicked
  if (e.target.id === "taskDelete") {
    const taskToRemove = e.target.parentNode.parentNode;
    taskToRemove.remove();
  }
});

retrieveFromStorage();
