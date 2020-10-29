function addItem() {
  const inputElement = document.getElementById("task");
  const task = inputElement.value;
  console.log(task);
  inputElement.value = "";
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
document.querySelector(".enterButton").addEventListener("click", addItem);
