import './assets/stylesheets/styles.css'
import { format } from "date-fns";
import TodoItem from "./todo-item.js";
import Project from "./project.js";
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

const project1 = new Project('1st project', 'test project to work on');
console.log(project1);

project1.addTodoItem(td1);
project1.addTodoItem(td2);
console.log(`with to do added`, project1);

project1.removeTodoItem(td1)
console.log(`with td1 removed`, project1);



