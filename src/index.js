import './assets/stylesheets/styles.css'
import { format } from "date-fns";
import { v7 as uuidv7 } from 'uuid';
import TodoItem from "./todo-item.js";
import TodoList from "./todo-list.js";
import todoItemTemplate from './views/partials/_todo-item.html';
import todoListTemplate from './views/partials/_todo-list.html';
// import './assets/fonts/*'
// import './assets/images/*'

window.TodoList = TodoList;
window.TodoItem = TodoItem;
window.createTodoList = createTodoList;
window.saveTodoList = saveTodoList;
window.buildTodoList = buildTodoList;
window.displayTodoLists = displayTodoLists;

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

function deleteTodoList() {
  // delete from todoListUIDs
  // delete from localStorage
}

function buildTodoList(listObject) {
  console.log('heres the list passed into build list', listObject);
  let listObjectData = {
    uid: listObject.getUid(),
    title: listObject.getTitle(),
    description: listObject.getDescription()
  }
  let populatedList = todoListTemplate

  Object.keys(listObjectData).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    populatedList = populatedList.replace(regex, listObjectData[key])
  })

  return populatedList
}

function displayTodoLists() {
  const listsContainer = document.getElementById('todo-lists-container')
  
  todoListUids.forEach((uid) => {
    const listObject = TodoList.fromJSON(JSON.parse(localStorage.getItem(uid)));
    listsContainer.insertAdjacentHTML('beforeend', buildTodoList(listObject));
  });
}


// SCRIPT:
const tdl1 = createTodoList('1st project', 'test project to work on');
tdl1.addTodoItem("Eggs", "basdf", "2025-12-31", false, false);
tdl1.addTodoItem("Bacon", "basdf", "2025-11-27", false, false);

const tdl2 = createTodoList('2nd project', 'another test project to work on');
tdl2.addTodoItem("Corn flakes", "basdf", "2025-11-27", false, false);
tdl2.addTodoItem("Milk", "basdf", "2025-11-27", false, false);
// console.log('new todo tdl2', tdl2);


// console.log("tdl1's UID", tdl1.getUid());
// console.log("tdl1's first item's UID", tdl1.getFirstTodoItem().getParentListUid());

console.log('now to display the todolist in the ui')
displayTodoLists();