const getTaskList = document.getElementById("todo-list");
const todoTaskId = 1;
//========================adding task to DOM==================================
const addTask = function () {
  const newTaskText = document.getElementById("newtodotask-text");
  addTaskToDom(newTaskText.value, todoTaskId, false);
  const obj = {};
  const objId = "imgtask" + todoTaskId;
  obj[objId] = { done: false };
  obj[objId].text = newTaskText.value;
  patchTask(obj);
  todoTaskId = todoTaskId + 1;
  newTaskText.value = "";
};
//========================creating li, checkbox and delete trash icon============

const addTaskToDom = function (newTaskText, id, done) {
  const newLiElem = document.createElement("li");
  newLiElem.innerHTML = `<div><input type="checkbox" id="check"><label>${newTaskText}</label></div>
    <img id="imgtask${id}" src="images/trash-icon.jpg">`;
  getTaskList.appendChild(newLiElem);
  getTaskList.lastChild.querySelector("input").checked = done;
  getTaskList.lastChild
    .querySelector("img")
    .addEventListener("click", (event) => {
      deleteTask(event.target.id);
      const imgtask = event.target.parentElement;
      imgtask.parentNode.removeChild(imgtask);
    });
  getTaskList.lastChild
    .querySelector("input")
    .addEventListener("click", (event) => {
      const checkId = event.target.parentElement.nextSibling.nextSibling.id;
      changeDone(checkId, event.target.checked);
    });
  getTaskList.lastChild
    .querySelector("label")
    .addEventListener("click", (event) => {
      editTask(event.target);
    });
};
//========================editing and creating new tasks============================

const editTask = function (tasklabel) {
  tasklabel.innerHTML = `<input type="text"> <button class="add-btn">Add</button>`;
  tasklabel.querySelector("button").addEventListener("click", (event) => {
    const changeId = tasklabel.parentElement.nextSibling.nextSibling.id;
    const newText = tasklabel.querySelector("input").value;
    changeText(changeId, newText);
    tasklabel.innerHTML = newText;
  });
};

const start = async function () {
  const tasks = await getTask();
  const keys = Object.keys(tasks);
  const keyNumbers = keys.map((item) => {
    return parseInt(item.substring(4));
  });
  todoTaskId =
    1 +
    keyNumbers.reduce((acc, item) => {
      if (acc < item) {
        return item;
      } else return acc;
    });
  keys.forEach((item, index) => {
    addTaskToDom(tasks[item].text, keyNumbers[index], tasks[item].done);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  start();
});
