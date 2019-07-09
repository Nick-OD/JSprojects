//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');



//Load all eventListeners
loadEventListeners();


function loadEventListeners(){

  //DOM Load Event
  document.addEventListener('DOMContentLoaded',getTasks);

  //Add Task Event
  form.addEventListener('submit', addTask);

  //Remove task event
  taskList.addEventListener('click', removeTask);

  //Clear Task event
  clearBtn.addEventListener('click', clearTasks);

  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);

}

//Get Tasks from LS
function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Creat li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //Creat Text node and append
    li.appendChild(document.createTextNode(task));
    //Create new link
    const link =  document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e){
if (taskInput.value === ''){
  alert('Add Task');
}

// Creat li element
const li = document.createElement('li');
li.className = 'collection-item';
//Creat Text node and append
li.appendChild(document.createTextNode(taskInput.value));
//Create new link
const link =  document.createElement('a');
link.className = 'delete-item secondary-content';
//Add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
//Append link to li
li.appendChild(link);

//Append li to ul
taskList.appendChild(li);

//Store in LS
storeTaskInLS(taskInput.value);

//Clear input
taskInput.value = ' ';

  e.preventDefault();
}

//Store Task

function storeTaskInLS(task){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Remove Task
function removeTask(e){
if (e.target.parentElement.classList.contains('delete-item')){
  if (confirm('Are You Sure?')){
    e.target.parentElement.parentElement.remove();

    //REmove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}
}

//Remoce from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(tasks){
    if (taskItem.textContent === task){
        tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear Tasks

function clearTasks() { 
 // taskList.innerHTML = '';


 //Faster
 while(taskList.firstChild) {
  taskList.removeChild(taskList.firstChild);
 }

 //Clear from LS
 clearTasksFromLS();
}

function clearTasksFromLS(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else{
      task.style.display = 'none';
    }
  });
}