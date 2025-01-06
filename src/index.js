import './assets/stylesheets/styles.css'
import { format } from "date-fns";
import TodoItem from "./todo-item.js";
import TodoList from "./todo-list.js";
import { v7 as uuidv7 } from 'uuid';
// import './assets/fonts/*'
// import './assets/images/*'

// NOTES
// Projects have ToDo Items
// ToDo Items have:

const todoListUids = [];

function createTodoList(title, description) {
  let uid = uuidv7();
  let newTodoList = new TodoList(title, description, uid);
  saveTodoList(newTodoList);
  todoListUids.push(uid);
  return newTodoList;
}

function saveTodoList(newTodoList) {
  localStorage.setItem(`TodoList-${newTodoList.getTitle()}`, JSON.stringify(newTodoList.toJSON()));
}


// SCRIPT:
const tdl1 = createTodoList('1st project', 'test project to work on');
console.log('new todo tdl1', tdl1);

console.log('adding todo item next')
tdl1.addTodoItem("Eggs", "basdf", "2025-12-31", false, false);
console.log('tdl1 with a new todoItem', tdl1);
console.log("tdl1's UID", tdl1.getUid());
console.log("tdl1's first item's UID", tdl1.getFirstTodoItem().getParentListUid());