export function renderTodo(todo) {
    const li = document.createElement('li');

    // > Part C: Conditionally add a "complete" class to the li
    // if the todo is complete
    if (todo.complete) {
        li.classList.add('complete');
    }

    const p = document.createElement('p');
    p.textContent = todo.description;
    li.append(p);

    return li;
}
