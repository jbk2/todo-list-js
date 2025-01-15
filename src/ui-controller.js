import { display } from "./display";
import TodoService from './todo-service.js'
import EventHandler from './event-handler.js';
class UIController {
  static renderTodoList(todoList) {
    display.displayTodoList(todoList);
    UIController.addListListener(todoList);
  }

  static renderTodoItem(todoItem) {
    display.displayTodoItem(todoItem);
  }

  static addListListener(todoList) {
    const listElement = document.querySelector(`section[data-list-uid="${todoList.getUid()}"]`);

    listElement.addEventListener('click', (event) => {
      if (event.target.matches('.delete-list-btn')) {
        EventHandler.handleDeleteList(event);
      } else if (event.target.matches('.new-item-submit-btn')) {
        EventHandler.handleAddItem(event);
      } else if (event.target.matches('.delete-item-btn')) {
        EventHandler.handleDeleteItem(event);
      }
    });
  }

  static addNewListModalListener() {
    const addListModalBtn = document.getElementById('add-todo-list-modal');
    const newListModal = document.getElementById('new-list-dialog');
    const closeModalBtn = document.getElementById('close-dialog-btn');
    const newListForm = document.querySelector('#new-todo-list-form');

    addListModalBtn.addEventListener('click', ()=> {
      newListModal.showModal();
    })
    
    closeModalBtn.addEventListener('click', ()=> {
      newListModal.close();
    })
    
    newListForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = event.target.title.value
      const description = event.target.description.value
      display.displayTodoList(TodoService.createTodoList(title, description))
      newListForm.reset();
      newListModal.close();
    })
  }  
}

export default UIController;