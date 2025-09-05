const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");

let oldInputValue;

//Funções
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
  todo.appendChild(editBtn);

  const deletebtn = document.createElement("button");
  deletebtn.classList.add("remove-todo");
  deletebtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deletebtn);

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
};

const toggleForm = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

// Função para filtrar
const filtrarTodos = () => {
  const todos = document.querySelectorAll(".todo");
  const filtro = filterSelect.value;
  const busca = searchInput.value.toLowerCase();

  todos.forEach(todo => {
    const texto = todo.querySelector("h3").innerText.toLowerCase();
    const estaFeito = todo.classList.contains("done");
    
    let deveMostrar = true;
    
    // Filtro por status
    if (filtro === "done" && !estaFeito) {
      deveMostrar = false;
    }
    if (filtro === "todo" && estaFeito) {
      deveMostrar = false;
    }
    
    // Filtro por busca
    if (busca && !texto.includes(busca)) {
      deveMostrar = false;
    }
    
    // Mostra ou oculta
    if (deveMostrar) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
};

// Função para limpar o input de busca
const limparBusca = () => {
  searchInput.value = "";
  filtrarTodos();
};

//Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
    filtrarTodos(); // Aplica filtro após marcar como feito
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForm();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForm();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForm();
});

filterSelect.addEventListener("change", filtrarTodos);
searchInput.addEventListener("input", filtrarTodos);
eraseButton.addEventListener("click", (e) => {
  e.preventDefault();
  limparBusca();
});