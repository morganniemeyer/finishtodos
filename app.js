/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
// Part A: import create todo
import {
    createTodo,
    getTodos,
    completeTodo,
    deleteAllTodos,
} from './fetch-utils.js';
// Part B: import get todos
// Part C: import complete todos
// Part D: import delete all function
import { renderTodo } from './render-utils.js';

/* Get DOM Elements */
const addTodoForm = document.getElementById('add-todo-form');
const removeButton = document.getElementById('remove-button');
const errorDisplay = document.getElementById('error-display');
const todoList = document.getElementById('todo-list');

/* State */
let todos = [];
let error = null;

/* Events */

window.addEventListener('load', async () => {
    const response = await getTodos();
    error = response.error;
    todos = response.data;

    if (error) {
        displayError();
    }

    if (todos) {
        displayTodos();
    }
});

addTodoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addTodoForm);
    const newTodo = {
        description: formData.get('description'),
    };

    // > Part A: Call the function to create a todo, passing in "newTodo":
    const response = await createTodo(newTodo); // ???
    error = response.error;
    const todo = response.data;

    if (error) {
        displayError();
    } else {
        todos.push(todo);
        displayTodos();
        addTodoForm.reset();
    }
});

removeButton.addEventListener('click', async () => {
    // > Part D: Call the async supabase function to delete all todos
    const response = await deleteAllTodos(); // change me
    error = response.error;

    if (error) {
        displayError();
    } else {
        // > Part D: reset todos state to an empty array:
        todos = [];
        displayTodos();
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayTodos() {
    todoList.innerHTML = '';

    for (const todo of todos) {
        const todoEl = renderTodo(todo);
        todoList.append(todoEl);

        todoEl.addEventListener('click', async () => {
            const response = await completeTodo(todo.id);
            error = response.error;
            const updatedTodo = response.data;
            //          - redisplay the todos
            if (error) {
                displayError();
            } else {
                const index = todos.indexOf(todo);
                todos[index] = updatedTodo;
                displayTodos();
            }
        });
    }
}
