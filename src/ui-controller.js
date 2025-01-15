import { display } from "./display";

class UIController {
  static renderTodoList(todoList) {
    display.displayTodoList(todoList);
    display.addTodoListEventListener(todoList);
  }

  static renderTodoItem(todoItem) {
    display.displayTodoItem(todoItem);
  }
}

export default UIController;
