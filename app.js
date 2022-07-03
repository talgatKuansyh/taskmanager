const time = document.querySelector('.time')
const input = document.querySelector('#inputarea')
const area = document.querySelector('.area')
const tasks = document.querySelector('#tasks')
const task = document.querySelector('.task')
const title = document.querySelector('.title')
const length = document.querySelector('.length')


time.innerHTML = new Date().toLocaleString();

let tasksList = [];

if (localStorage.getItem("tasks")) {
    tasksList = JSON.parse(localStorage.getItem("tasks"));
    tasksList.forEach((task) => renderTask(task));  
}


checkList();


area.addEventListener('submit', addTask);
tasks.addEventListener('click', deleteTask);
tasks.addEventListener('click', doneTask);
tasks.addEventListener('click', markTask);

function addTask(event) {
    
    event.preventDefault()

    const taskText = input.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
        marked: false,
    }

    tasksList.push(newTask);

    setLocalStorage()

    renderTask(newTask);
    
    input.value = "";
    input.focus();

    checkList();
};

function deleteTask(event) {

    if (event.target.dataset.action !== 'delete') return;

    const parent = event.target.closest('.task');

    const taskID = Number(parent.id);

    tasksList = tasksList.filter((task) => task.id !== taskID);

    
    parent.remove();
    
    setLocalStorage();

    checkList();

    length.innerHTML = tasksList.length;
}

function doneTask(event) {
    
    if (event.target.dataset.action !== 'done') return;

    const parent = event.target.closest('.task');
    
    const taskID = Number(parent.id);
    
    const task = tasksList.find((task) => task.id === taskID);
    
    task.done = !task.done;
    
    setLocalStorage();
    
    const el = parent.querySelector('.check')

    el.classList.toggle('checked')
    
}

function markTask(event) {

    if (event.target.dataset.action !== 'mark') return;

    const parent = event.target.closest('.task');
    
    const taskID = Number(parent.id);
    
    const task = tasksList.find((task) => task.id === taskID);
    
    task.marked = !task.marked;
    
    setLocalStorage();
    
    const el = parent.querySelector('.mark')

    el.classList.toggle('marked')
    
}

function checkList() {
    
    if (tasksList.length === 0) {

        const checkListHTML = `<div class="title">
                         <i class="fa-solid fa-seedling fa-4x"></i>
                        <div>Your list is empty now</div>
                    </div>`;

        tasks.insertAdjacentHTML("afterbegin", checkListHTML);
    }

    if (tasksList.length > 0) {

        const emptyList = document.querySelector('.title')

        emptyList ? emptyList.remove() : null;
    }

}

function setLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
}

function renderTask(task) {

    const doneStatus = task.done ? 'check checked' : 'check';
    const markStatus = task.marked ? 'mark marked' : 'mark';


    taskHTML = `<div id="${task.id}" class="task">
                    <button class="${doneStatus}" data-action="done"><i class="fa-solid fa-square-check fa-xl"></i></button>
                    <span>${task.text}</span>
                    <button class="${markStatus}" data-action="mark"><i class="fa-solid fa-star fa-xs"></i></button>
                    <button class="delete" data-action="delete"><i class="fa-solid fa-square-xmark fa-xl"></i></button>
                </div>`

    document.getElementById('tasks').insertAdjacentHTML("beforeend", taskHTML); 

    length.innerHTML = tasksList.length;
};