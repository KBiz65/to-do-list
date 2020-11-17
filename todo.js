allTaskItems = [];

function addItem() {
  const taskToAdd = document.getElementById("task");
  allTaskItems.push({ text: taskToAdd.value, isChecked: false });
  displayItemsList();
  localStorage.setItem("allTasks", JSON.stringify(allTaskItems));
  taskToAdd.value = "";
}

function displayItemsList(isCompleted = false) {
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
  if (isCompleted === true) {
    newInputItem.setAttribute("checked", isCompleted);
  }

  const newTaskTextItem = document.createElement("p");
  newTaskTextItem.setAttribute("id", "taskText");
  if (isCompleted === true) {
    newTaskTextItem.setAttribute("class", "strikethrough");
  }

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

 function retrieveFromStorage() {
  allItemsInStorage = JSON.parse(localStorage.getItem("allTasks")) || [];
   
  for (i = 0; i < allItemsInStorage.length; i++) {
    allTaskItems.push(allItemsInStorage[i]);
    displayItemsList(allItemsInStorage[i].isChecked);
  }
}

function removeFromStorage(target) {
  const taskToDeleteFromStorage = target.previousSibling.textContent;
  allItemsInStorage = JSON.parse(window.localStorage.getItem("allTasks"));
  
  for (i = 0; i < allItemsInStorage.length; i++) {
    if (allItemsInStorage[i].text === taskToDeleteFromStorage) {
      allItemsInStorage.splice(i, 1);
      localStorage.setItem("allTasks", JSON.stringify(allItemsInStorage));
    }
  }
}

window.addEventListener("keypress", (e) => e.code === "Enter" ? addItem() : false
);

const enterButton = document.getElementById("enterButton");
enterButton.addEventListener("click", addItem);

const checkbox = document.getElementById("taskItems");
checkbox.addEventListener("click", function (e) {
  if (e.target.id === "taskComplete") {
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

const deleteButton = document.getElementById("taskItems");
deleteButton.addEventListener("click", function (e) {
  if (e.target.id === "taskDelete") {
    removeFromStorage(e.target);
    const taskToRemove = e.target.parentNode.parentNode;
    taskToRemove.remove();
  }
});

retrieveFromStorage();
