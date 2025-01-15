import './assets/stylesheets/styles.css'

import TodoService from './todo-service.js'
import TodoList from "./todo-list.js";
import Storage from "./storage-service.js";
import UIController from "./ui-controller.js";
// import './assets/fonts/*'
// import './assets/images/*'

function displayStoredLists() {
  Storage.getAll().forEach((item) => {
    const todoListObj = TodoList.fromJSON(item);
    TodoService.todoListUids.add(todoListObj.getUid());
    UIController.renderTodoList(todoListObj);
  })
}

function displayDemoList() {
  if (!Storage.getAll().some((list) => list.title === "Acme TodoList")) {
    const tdl1 = TodoService.createTodoList('Acme TodoList', 'A template todo list just to demonstrate in the UI.');
    TodoService.addTodoItem(tdl1.getUid(), "Eggs", "good protein", "2025-12-31", true, false);
    TodoService.addTodoItem(tdl1.getUid(), "Bacon", "tasty", "2025-11-27", false, true);
    displayStoredLists();
  }
}

// #################### Initialize app ###########################
function init() {
  displayStoredLists();
  displayDemoList();
  UIController.addNewListModalListener();
}

// SCRIPT:
init();

