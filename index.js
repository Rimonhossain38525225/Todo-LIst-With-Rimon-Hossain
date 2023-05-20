// mini project 5 | A complete todo App (part-1)

// const card = document.querySelector(".card");
// const cardBody = document.querySelector(".card-body");
// const addTodoButton = document.getElementById("addTodoButton");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.getElementById("inputtodo");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");

// getTodoFormLocalStorage
const getTodoFormLocalStorage = () => {
  return localStorage.getItem("myTodos")
    ? JSON.parse(localStorage.getItem("myTodos"))
    : [];
};

// create show message aded or delete create
const showMessage = (text, status) => {
  messageElement.innerHTML = text;
  messageElement.classList.add(`todo-${status}`);

  setTimeout(() => {
    messageElement.innerHTML = "";
    messageElement.classList.remove(`todo-${status}`);
  }, 1000);
};

// Create todo and delete
const createTodo = (uniqueTodoId, todoValue) => {
  const todoElement = document.createElement("li");
  todoElement.id = uniqueTodoId;
  todoElement.classList.add("li-style");
  todoElement.innerHTML = `
        <span>${todoValue}</span>
        <span> <button class="btn" id="delete-button"> <i class="fa fa-trash" aria-hidden="true"></i></button> </span>
    `;

  // create todo
  todoLists.appendChild(todoElement);

  // find delete button and delete
  const todoDeleteButton = todoElement.querySelector("#delete-button");
  todoDeleteButton.addEventListener("click", (event) => {
    const selectedTodilist =
      event.target.parentElement.parentElement.parentElement;

    todoLists.removeChild(selectedTodilist);
    // showdeleted message
    showMessage("Todolist is deleted successful", "fail");

    // localStorage id match kore delete korte hobe
    console.log(selectedTodilist.id); // emni use koresi console.log
    let todos = getTodoFormLocalStorage();
    todos = todos.filter((todo) => {
      return todo.uniqueTodoId != selectedTodilist.id;
    });
    localStorage.setItem("myTodos", JSON.stringify(todos));
  });
};

/*==========================================
Adding lestener and created todo
=============================================*/
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;

  // jenaret unique id
  const uniqueTodoId = Date.now().toString();
  createTodo(uniqueTodoId, todoValue);

  // show message aded or delete
  showMessage("Todolist is Created successful", "success");

  // localStorage   use todos
  const todos = getTodoFormLocalStorage();
  todos.push({ uniqueTodoId, todoValue });
  localStorage.setItem("myTodos", JSON.stringify(todos));

  todoInput.value = "";
});
/*==========================================
Adding lestener and created todo
=============================================*/
// loead todos all localStorage when to be window reload ..and create  todos
window.addEventListener("DOMContentLoaded", () => {
  const todos = getTodoFormLocalStorage();
  todos.map((todo) => createTodo(todo.uniqueTodoId, todo.todoValue));
});
