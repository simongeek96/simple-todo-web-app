"use strict"

let addTaskBtn = document.getElementById('add-task-btn');
let descTaskInput = document.getElementById('description-task');
let todosWrapper = document.querySelector('.todos__wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

// function-constructor
function Task(description) {
  this.description = description;
  this.completed = false;
}

//creating template with task
const createTemplate = (task, index) => {
  return `
    <div class="todos__todo-item ${task.completed ? 'checked' : ''
    }">
      <div class="todos__description">
        ${task.description}
      </div>
      <div class="todos__buttons">
        <input onclick="completeTask(${index})" type="checkbox" class="todos__buttons--complete" ${task.completed ? 'checked' : ''
    }>
    <button onclick="deleteTask(${index})" class="todos__buttons--delete">
      <i class="fa-regular fa-trash-can"></i>
    </button>
      </div >
  </div >
    `
}

//filtering tasks, checked or unchecked ones
function filterTasks() {
  const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
  const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
  tasks = [...activeTasks, ...completedTasks].filter(item => item.description.trim() != "");
}

fillHtmlList();

//filling HTML page
function fillHtmlList() {
  todosWrapper.innerHTML = "";
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll('.todos__todo-item');
  }
}

// fillHtmlList();

// updating local storage
function updateLocal() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//checking (completing) tasks
function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add('checked');
  } else {
    todoItemElems[index].classList.remove('checked');
  }
  updateLocal();
  fillHtmlList();
}

// adding tasks
addTaskBtn.addEventListener('click', () => {
  if (descTaskInput.value == "") {
    descTaskInput.classList.add('error');
  } else {
    tasks.push(new Task(descTaskInput.value));
    descTaskInput.classList.remove('error');
    updateLocal();
    fillHtmlList();
    descTaskInput.value = '';
  }
});

//deleting tasks
function deleteTask(index) {
  todoItemElems[index].classList.add('deleting');
  tasks.splice(index, 1);
  setTimeout(() => {
    updateLocal();
    fillHtmlList();
  }, 500)
}

//(coming soon)
// const toggleLightDark = document.querySelector(".btn-toggle");

// toggleLightDark.addEventListener("click", function () {
//   document.body.classList.toggle("dark-theme");
// });


// this one
// !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

//same as

/*
if (!localStorage.tasks) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
*/

// other commented code (experimental)

/*
addTaskBtn.addEventListener('click', () => {
  if (descTaskInput.value == "") {
    descTaskInput.classList.add('error');
  } else {
    tasks.unshift(new Task(descTaskInput.value));
    descTaskInput.classList.remove('error');
    updateLocal();
    fillHtmlList();
    descTaskInput.value = '';
  }
});
*/

/*
addTaskBtn.addEventListener('click', () => {
  if (descTaskInput.value != "") {
    tasks.push(new Task(descTaskInput.value));
    updateLocal();
    fillHtmlList();
    descTaskInput.value = '';
  } else if (descTaskInput.value == "" && descTaskInput.value.indexOf(" ") >= 0) {
    alert("Enter task for first!");
    return false;
  }
});
*/