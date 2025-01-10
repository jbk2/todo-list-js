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
window.buildTodoListHtml = buildTodoListHtml;
window.displayTodoLists = displayTodoLists;
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
    console.log("here's todoListUids array", todoListUids);
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

function buildTodoListHtml(listObject) {
  let listObjectData = {
    uid: listObject.getUid(), title: listObject.getTitle(),
    description: listObject.getDescription(), todoItems: listObject.getTodoItems()
  }
  let populatedListHtml = todoListTemplate
  
  Object.keys(listObjectData).forEach((key) => {
    if (key != 'todoItems') {
      populatedListHtml = populatedListHtml.replace(new RegExp(`{{${key}}}`, 'g'), listObjectData[key])
    }
  })
  
  let todoItemsString = '';

  listObjectData.todoItems.forEach((todoItem) => {
    let todoItemHtml = buildTodoItemHtml(todoItem);
    todoItemsString = todoItemsString.concat(todoItemHtml);
  })

  populatedListHtml = populatedListHtml.replace('{{todoItems}}', todoItemsString);
  return populatedListHtml
}

function buildTodoItemHtml(todoItem) {
  let itemObjectData = {
    title: todoItem.getTitle(), description: todoItem.getDescription(),
    dueDate: format(new Date(todoItem.getDueDate()), 'dd.MM.yy'), priority: todoItem.getPriority(),
    done: todoItem.getDone(), parentListUid: todoItem.getParentListUid() 
  }
  let populatedItemHtml = todoItemTemplate

  Object.keys(itemObjectData).forEach((key) => {
    populatedItemHtml = populatedItemHtml.replace(new RegExp(`{{${key}}}`, 'g'), itemObjectData[key])
    if (key === 'done') {
      populatedItemHtml = itemObjectData[key]
        ? populatedItemHtml.replace('{{checked}}', 'checked')
        : populatedItemHtml.replace('{{checked}}', '');
    }
    if (key === 'priority') {
      if (itemObjectData[key]) {
        populatedItemHtml = populatedItemHtml.replace(' hidden', '');
      }
    }
  })
  return populatedItemHtml;
}

function displayTodoLists() {
  const listsContainer = document.getElementById('todo-lists-container')
  listsContainer.innerHTML = '';

  
  todoListUids.forEach((uid) => {
    const listObject = TodoList.fromJSON(JSON.parse(localStorage.getItem(uid)));
    listsContainer.insertAdjacentHTML('beforeend', buildTodoListHtml(listObject));
  });
}

function addTodoItem(todoList, title, description, dueDate, priority, done) {
  todoList.addTodoItem(title, description, dueDate, priority, done)
  updateStorage(todoList);
  refreshListInUi(todoList)
}

function updateStorage(todoList) {
  let uid = todoList.getUid();
  localStorage.setItem(uid, JSON.stringify(todoList.toJSON()))
}

function refreshListInUi(todoList) {
  let listUiElement = document.querySelector(`[data-list-uid="${todoList.getUid()}"]`);
  let listHtml = buildTodoListHtml(todoList)
  
  if (listUiElement) { // if list already in UI update it
    listUiElement.outerHTML = listHtml;
  } else { // if we've not displayed the list yet then display it
    const listsContainer = document.getElementById('todo-lists-container')
    listsContainer.insertAdjacentHTML('beforeend', listHtml);
  }
}

// SCRIPT:
const tdl1 = createTodoList('1st project', 'test project to work on');
addTodoItem(tdl1, "Eggs", "basdf", "2025-12-31", true, false);
addTodoItem(tdl1, "Bacon", "basdf", "2025-11-27", false, true);

const tdl2 = createTodoList('2nd project', 'another test project to work on');
addTodoItem(tdl2, "Corn flakes", "basdf", "2025-11-27", false, false);
addTodoItem(tdl2, "Milk", "basdf", "2025-11-27", false, true);

console.log('now to display the todolist in the ui')
// displayTodoLists();