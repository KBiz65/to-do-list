function addItem() {
  const taskToAdd = document.getElementById("task");
  console.log(taskToAdd.value);
  saveToStorage(taskToAdd);
  document.getElementById("taskItems").innerHTML =
    "<li>" + taskToAdd.value + "</li>";
  taskToAdd.value = "";
}

function saveToStorage(taskToAdd) {
  if (localStorage.getItem("allTasks") === null) {
    window.localStorage.setItem("allTasks", JSON.stringify(taskToAdd.value));
  } else {
    newTask = JSON.parse(window.localStorage.getItem("allTasks"));
    window.localStorage.setItem("allTasks", JSON.stringify(newTask));
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
