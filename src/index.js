import './assets/stylesheets/styles.css'
import { format } from "date-fns";
import { v7 as uuidv7 } from 'uuid';
import TodoItem from "./todo-item.js";
import TodoList from "./todo-list.js";
import todoItemTemplate from './views/partials/_todo-item.html';
import todoListTemplate from './views/partials/_todo-list.html';
// import './assets/fonts/*'
// import './assets/images/*'

const todoListUids = new Set();

function createTodoList(title, description) {
  let uid;
  do {
    uid = `todoList:${uuidv7()}`;
  } while(todoListUids.has(uid));

  try {
    const newTodoList = new TodoList(title, description, uid);
    saveTodoList(newTodoList);
    todoListUids.add(uid);  
    return newTodoList;
  } catch (error) {
    console.error('Error creating and saving TodoList', error);
    throw error
  }
}

function saveTodoList(newTodoList) {
  localStorage.setItem(`${newTodoList.getUid()}`, JSON.stringify(newTodoList.toJSON()));
}

function displayTodoLists() {

}


// SCRIPT:
const tdl1 = createTodoList('1st project', 'test project to work on');
console.log('new todo tdl1', tdl1);

console.log('adding todo item next')
tdl1.addTodoItem("Eggs", "basdf", "2025-12-31", false, false);
console.log('tdl1 with a new todoItem', tdl1);
console.log("tdl1's UID", tdl1.getUid());
console.log("tdl1's first item's UID", tdl1.getFirstTodoItem().getParentListUid());