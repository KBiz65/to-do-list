allTaskItems = [];

function addItem() {
  const taskToAdd = document.getElementById("task");
  console.log(taskToAdd.value);
  allTaskItems.push(taskToAdd.value);
  // console.log(allTaskItems);
  displayItemsList();
  // saveToStorage(taskToAdd);
  taskToAdd.value = "";
}

function displayItemsList() {
  const unorderedList = document.getElementById("taskItems");
  const arrayTask = allTaskItems[allTaskItems.length - 1];
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

// function saveToStorage(taskToAdd) {
//   window.localStorage.setItem("allTasks", JSON.stringify(allTaskItems));
//   console.log(JSON.parse(window.localStorage.getItem("allTasks")));
//   } else {
//       oldTasks = JSON.parse(window.localStorage.getItem("allTasks"));
//       window.localStorage.setItem(
//         "allTasks",
//         JSON.stringify(oldTasks + taskToAdd.value)
//       );
//       console.log(JSON.parse(window.localStorage.getItem("allTasks")));
//     }
// }

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
