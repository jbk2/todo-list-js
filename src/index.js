import './assets/stylesheets/styles.css'
import { v7 as uuidv7 } from 'uuid';
import TodoItem from "./todo-item.js";
import TodoList from "./todo-list.js";
import { display } from "./display.js";
// import './assets/fonts/*'
// import './assets/images/*'

window.TodoList = TodoList;
window.TodoItem = TodoItem;
window.createTodoList = createTodoList;
window.saveTodoList = saveTodoList;
window.addTodoItem = addTodoItem;

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
    display.displayTodoList(newTodoList);
    display.addTodoListEventListener(newTodoList);
    return newTodoList;
  } catch (error) {
    console.error('Error creating and saving TodoList', error);
    throw error
  }
}

function saveTodoList(newTodoList) {
  localStorage.setItem(`${newTodoList.getUid()}`, JSON.stringify(newTodoList.toJSON()));
}

function deleteTodoList(todoListUid) {
  todoListUids.delete(todoListUid)
  localStorage.removeItem(todoListUid)
}

function deleteTodoItem(parentUid, itemTitle) {
  const todoList = TodoList.fromJSON(JSON.parse(localStorage.getItem(parentUid)));
  const todoItem = todoList.findTodoItem(itemTitle)
  todoList.removeTodoItem(todoItem);
  saveTodoList(todoList)
}

function addTodoItem(todoListUid, title, description, dueDate, priority, done) {
  const todoList = TodoList.fromJSON(JSON.parse(localStorage.getItem(todoListUid)));
  const newTodoItem = todoList.addTodoItem(title, description, dueDate, priority, done)
  updateStorage(todoList);
  display.displayTodoItem(newTodoItem)
  return newTodoItem
}

function updateStorage(todoList) {
  let uid = todoList.getUid();
  localStorage.setItem(uid, JSON.stringify(todoList.toJSON()))
}

export { createTodoList, addTodoItem, deleteTodoItem, deleteTodoList };

// SCRIPT:


// load and render any localStorage todoLists

const tdl1 = createTodoList('1st project', 'test project to work on');
addTodoItem(tdl1.getUid(), "Eggs", "basdf", "2025-12-31", true, false);
addTodoItem(tdl1.getUid(), "Bacon", "basdf", "2025-11-27", false, true);

const tdl2 = createTodoList('2nd project', 'another test project to work on');
// addTodoItem(tdl2.getUid(), "Corn flakes", "basdf", "2025-11-27", false, false);
// addTodoItem(tdl2.getUid(), "Milk", "basdf", "2025-11-27", false, true);
