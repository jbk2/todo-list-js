import './assets/stylesheets/styles.css'
import { v7 as uuidv7 } from 'uuid';
import TodoItem from "./todo-item.js";
import TodoList from "./todo-list.js";
import Storage from "./storage-service.js";
import UIController from "./ui-controller.js";
import { display } from "./display.js";
// import './assets/fonts/*'
// import './assets/images/*'

window.TodoList = TodoList;
window.TodoItem = TodoItem;
window.createTodoList = createTodoList;
window.saveTodoList = saveTodoList;
window.addTodoItem = addTodoItem;

// #################### List functions ###########################
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
    UIController.renderTodoList(newTodoList);
    return newTodoList;
  } catch (error) {
    console.error('Error creating and saving TodoList', error);
    throw error
  }
}
function saveTodoList(newTodoList) {
  Storage.save(`${newTodoList.getUid()}`, newTodoList.toJSON())
}

function deleteTodoList(todoListUid) {
  todoListUids.delete(todoListUid)
  Storage.delete(todoListUid)
}

// #################### Item functions ###########################
function addTodoItem(todoListUid, title, description, dueDate, priority, done) {
  const todoList = TodoList.fromJSON(Storage.load(todoListUid));
  const newTodoItem = todoList.addTodoItem(title, description, dueDate, priority, done)
  Storage.save(todoList.getUid(), todoList.toJSON())
  UIController.renderTodoItem(newTodoItem)
  return newTodoItem
}

function deleteTodoItem(parentUid, itemTitle) {
  const todoList = TodoList.fromJSON(Storage.load(parentUid));
  const todoItem = todoList.findTodoItem(itemTitle)
  todoList.removeTodoItem(todoItem);
  saveTodoList(todoList);
}


// #################### Display functions ###########################
function displayStoredLists() {
  Storage.getAll().forEach((item) => {
    const todoListObj = TodoList.fromJSON(item);
    todoListUids.add(todoListObj.getUid());
    UIController.renderTodoList(todoListObj);
  })
}

function displayDemoList() {
  if (!Storage.getAll().some((list) => list.title === "Acme TodoList")) {
    const tdl1 = createTodoList('Acme TodoList', 'A template todo list just to demonstrate in the UI.');
    addTodoItem(tdl1.getUid(), "Eggs", "good protein", "2025-12-31", true, false);
    addTodoItem(tdl1.getUid(), "Bacon", "tasty", "2025-11-27", false, true);
  }
}


// #################### Initialize app ###########################
function init() {
  displayStoredLists();
  displayDemoList();
  UIController.addNewListModalListener();
}

export { createTodoList, addTodoItem, deleteTodoItem, deleteTodoList };

// SCRIPT:
init();

