import { display } from "./display";
import EventManager from './event-manager';
class UIController {
  static renderTodoList(todoList) {
    display.displayTodoList(todoList);
    UIController.addTodoListListener(todoList);
  }

  static renderTodoItem(todoItem) {
    display.displayTodoItem(todoItem);
  }

  static addTodoListListener(todoList) {
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

  static addNewTodoListListener() {
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
      createTodoList(title, description)
      newListModal.close();
    })
  }  
}

export default UIController;