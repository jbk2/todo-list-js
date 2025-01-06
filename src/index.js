import './assets/stylesheets/styles.css'
import { format } from "date-fns";
import TodoItem from "./todo-item.js";
import TodoList from "./todo-list.js";
// import './assets/fonts/*'
// import './assets/images/*'

// NOTES
// Projects have ToDo Items
// ToDo Items have:


let date = new Date();
let formattedDate = format(date, "dd/MM/yyyy")
console.log(formattedDate);

const td1 = new TodoItem("Eggs", "basdf", date, false, false)
const td2 = new TodoItem("bacon", "basdf", date, false, false)
const td3 = new TodoItem("toast", "basdf", date, false, false)
console.log(td1, td2, td3);

const tdl1 = new TodoList('1st project', 'test project to work on');

tdl1.addTodoItem(td1);
tdl1.addTodoItem(td2);
console.log(tdl1.getTodoItems());
// console.log(`with to do added`, tdl1);

// tdl1.removeTodoItem(td1)
// console.log(`with td1 removed`, tdl1)