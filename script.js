// State management
let todos = [];
let currentFilter = 'all';

// DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const itemCount = document.getElementById('itemCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load todos from localStorage on page load
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') {
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

// Filter todos
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

// Render todos
function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<li class="empty-state">No tasks found. Add one above!</li>';
    } else {
        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </li>
        `).join('');
    }

    updateItemCount();
}

// Update item count
function updateItemCount() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    itemCount.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;
}

// Clear completed todos
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

// Set filter
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active filter button
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTodos();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// Make functions globally available for inline event handlers
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;

// Initialize app
loadTodos();
