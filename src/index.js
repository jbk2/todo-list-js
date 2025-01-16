import './assets/stylesheets/styles.css'

import TodoService from './services/todo-service.js'
import TodoList from "./components/todo-list.js";
import Storage from "./services/storage-service.js";
import UIController from "./ui/ui-controller.js";
import { display } from './ui/display.js'
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
    let demoList = TodoService.createTodoList('Acme TodoList', 'A template todo list just to demonstrate in the UI.');
    const demoListUid = demoList.getUid();

    TodoService.addTodoItem(demoListUid, "Eggs", "good protein", "2025-12-31", true, false);
    TodoService.addTodoItem(demoListUid, "Bacon", "tasty", "2025-11-27", false, true);
    
    demoList = TodoList.fromJSON(Storage.load(demoListUid))
    // insert demoList as first list
    const listsContainer = document.getElementById('todo-lists-container');
    listsContainer.insertAdjacentHTML('afterbegin', display.buildTodoListHtml(demoList));
    UIController.addListListener(demoList)
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

