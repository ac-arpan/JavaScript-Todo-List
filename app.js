// Selectors
let todoInput = document.querySelector('.todo-input');
let todoButton = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');
let filterOption = document.querySelector('.filter-todo');

// Eventlisteners

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
// Functions

function addTodo(e) {
    console.log("Good to go");

    //Todo div
    if (todoInput.value != "") {
        // save in local storage
        saveLocalTodos(todoInput.value);
        let html = `<div class="todo">
                        <li class="todo-item">${todoInput.value}</li>
                        <button class=" complete-button"><i class="fas fa-check"></i></button>
                        <button class=" trash-button"><i class="fas fa-trash"></i></button>
                    </div>`
        todoList.innerHTML += html;
        todoInput.value = "";
    }

    e.preventDefault();
}

function deleteCheck(e) {
    // console.log(e.target);
    const item = e.target;
    //Delete the todo
    if (item.classList[0] === 'trash-button') {
        // Parent class is 'todo'

        //animation of deleting
        item.parentElement.classList.add('fall');

        // delete the item after transition ends
        item.parentElement.addEventListener('transitionend', function () {
            item.parentElement.remove();
        });

        // remove from local storage
        removeLocalTodos(item.parentElement);

    }
    // Check the todo
    if (item.classList[0] === 'complete-button') {
        item.parentElement.classList.toggle('completed');
    }

}

function filterTodo(e) {
    // console.log(e.target.value);
    const todos = todoList.children;
    // console.log(todos);
    Array.from(todos).forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    });

}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        let html = `<div class="todo">
                        <li class="todo-item">${todo}</li>
                        <button class=" complete-button"><i class="fas fa-check"></i></button>
                        <button class=" trash-button"><i class="fas fa-trash"></i></button>
                    </div>`
        todoList.innerHTML += html;
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    
    //updating local storage
    localStorage.setItem('todos',JSON.stringify(todos));

}