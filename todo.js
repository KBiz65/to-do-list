allTaskItems = [];

function addItem() {
  const taskToAdd = document.getElementById("task");
  allTaskItems.push({ text: taskToAdd.value, isChecked: false });
  displayItemsList();
  localStorage.setItem("allTasks", JSON.stringify(allTaskItems));
  taskToAdd.value = "";
}

function displayItemsList(isCompleted = false) {
  const unorderedList = document.getElementById("task-items");
  const arrayObject = allTaskItems[allTaskItems.length - 1];
  const arrayTask = arrayObject.text;
  const newLineItem = document.createElement("li");
  newLineItem.setAttribute("id", "line-items");

  const newDivItem = document.createElement("div");
  newDivItem.setAttribute("id", "task-line");

  const newInputItem = document.createElement("input");
  newInputItem.setAttribute("id", "task-complete");
  newInputItem.setAttribute("type", "checkbox");
  if (isCompleted === true) {
    newInputItem.setAttribute("checked", isCompleted);
  }

  const newTaskTextItem = document.createElement("p");
  newTaskTextItem.setAttribute("id", "task-text");
  if (isCompleted === true) {
    newTaskTextItem.setAttribute("class", "strikethrough");
  }

  const newImageItem = document.createElement("img");
  newImageItem.setAttribute("id", "task-delete");
  newImageItem.setAttribute("src", "images/redx.png");
  newImageItem.setAttribute("alt", "red brushstroke x");

  newTaskTextItem.appendChild(document.createTextNode(arrayTask));

  newDivItem.appendChild(newInputItem);
  newDivItem.appendChild(newTaskTextItem);
  newDivItem.appendChild(newImageItem);

  newLineItem.appendChild(newDivItem);
  unorderedList.appendChild(newLineItem);
}

function retrieveFromStorage() {
  allItemsInStorage = JSON.parse(localStorage.getItem("allTasks")) || [];
  
  for (i = 0; i < allItemsInStorage.length; i++) {
    allTaskItems.push(allItemsInStorage[i]);
    displayItemsList(allItemsInStorage[i].isChecked);
  }
}

function removeFromStorage(target) {
  const taskToDeleteFromStorage = target.previousSibling.textContent;
  allItemsInStorage = JSON.parse(localStorage.getItem("allTasks"));
  
  for (i = 0; i < allItemsInStorage.length; i++) {
    if (allItemsInStorage[i].text === taskToDeleteFromStorage) {
      allItemsInStorage.splice(i, 1);
      localStorage.setItem("allTasks", JSON.stringify(allItemsInStorage));
    }
  }
}

window.addEventListener("keypress", (e) => e.code === "Enter" ? addItem() : false);

const enterButton = document.getElementById("enter-button");
enterButton.addEventListener("click", addItem);

const checkbox = document.getElementById("task-items");
checkbox.addEventListener("click", function (e) {
  if (e.target.id === "task-complete") {
    if (e.target.checked) {
      const strikethrough = e.target.nextSibling;
      strikethrough.setAttribute("class", "strikethrough");
      
      allItemsInStorage = JSON.parse(window.localStorage.getItem("allTasks"));
      
      allItemsInStorage.forEach(item => {
        if (item.text === strikethrough.textContent) {
          item.isChecked = true;
          localStorage.setItem("allTasks", JSON.stringify(allItemsInStorage));
        }
      });

      } else {
      const strikethrough = e.target.nextSibling;
      strikethrough.removeAttribute("class");

      allItemsInStorage = JSON.parse(window.localStorage.getItem("allTasks"));

      allItemsInStorage.forEach(item => {
        if (item.text === strikethrough.textContent) {
          item.isChecked = false;
          localStorage.setItem("allTasks", JSON.stringify(allItemsInStorage));
        }
      });
    }
  };
});

const deleteButton = document.getElementById("task-items");
deleteButton.addEventListener("click", function (e) {
  if (e.target.id === "taskDelete") {
    removeFromStorage(e.target);
    const taskToRemove = e.target.parentNode.parentNode;
    taskToRemove.remove();
  }
});

retrieveFromStorage();
