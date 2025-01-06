import './assets/stylesheets/styles.css'
import { format } from "date-fns";
import TodoItem from "./todo-item.js";
// import './assets/fonts/*'
// import './assets/images/*'

// NOTES
// Projects have ToDo Items
// ToDo Items have:



let date = new Date();
let formattedDate = format(date, "dd/MM/yyyy")
console.log(formattedDate);

const td1 = new TodoItem("Eggs", "basdf", date, false, false)

console.log(td1);