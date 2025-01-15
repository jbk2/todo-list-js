import { display } from "./display";
import EventManager from './event-manager';
class UIController {
  static renderTodoList(todoList) {
    display.displayTodoList(todoList);
    UIController.addTodoListEventListener(todoList);
  }

  static renderTodoItem(todoItem) {
    display.displayTodoItem(todoItem);
  }

  static addTodoListEventListener(todoList) {
    const listElement = document.querySelector(`section[data-list-uid="${todoList.getUid()}"]`);

    listElement.addEventListener('click', (event) => {
      if (event.target.matches('.delete-list-btn')) {
        EventManager.handleDeleteList(event);
      } else if (event.target.matches('.new-item-submit-btn')) {
        EventManager.handleAddItem(event);
      } else if (event.target.matches('.delete-item-btn')) {
        EventManager.handleDeleteItem(event);
      }
    });
  }

}

export default UIController;
