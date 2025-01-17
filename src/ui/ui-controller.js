import { display } from "./display.js";
import TodoService from '../services/todo-service.js'
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
    const newListTitleInput = newListForm.querySelector('input[name="title"]');
    const newListTitleError = newListForm.querySelector('span#title-error');
    let validationEnabled = false;
  
    // Open modal
    addListModalBtn.addEventListener('click', () => {
      resetFormState();
      newListModal.showModal();
    });
  
    // Close modal
    closeModalBtn.addEventListener('click', () => {
      resetFormState();
      newListModal.close();
    });
  
    // Form submission handler
    newListForm.addEventListener('submit', (event) => {
      event.preventDefault();
      validationEnabled = true;
  
      if (validate(event.target.title)) {
        const title = event.target.title.value;
        const description = event.target.description.value;
        const newList = TodoService.createTodoList(title, description);
        display.displayTodoList(newList);
        UIController.addListListener(newList);
        resetFormState();
        newListModal.close();
      }
    });
  
    // Input handler
    newListTitleInput.addEventListener('input', (event) => {
      if (validationEnabled) {
        validate(event.target);
      }
    });
  
    // Validate input and show/hide error messages
    function validate(element) {
      if (element.validity.valid) {
        clearError(); // Clear error if input is valid
        return true;
      } else {
        if (element.validity.valueMissing) {
          newListTitleError.textContent = "You must enter a value.";
        } else if (element.validity.tooShort) {
          newListTitleError.textContent = "You must enter more than 4 characters.";
        } else if (element.validity.tooLong) {
          newListTitleError.textContent = "You must enter less than 20 characters.";
        } else if (element.validity.patternMismatch) {
          newListTitleError.textContent =
            "You must enter alphanumeric chars or any of these; @,.'\\/!?£$%.";
        }
        newListTitleError.className = "error active";
        return false;
      }
    }
  
    // Clear error messages
    function clearError() {
      newListTitleError.textContent = "";
      newListTitleError.className = "error";
    }
  
    // Reset form state
    function resetFormState() {
      validationEnabled = false;
      newListForm.reset();
      clearError();
      newListTitleInput.value = "";
    }
  }
}

export default UIController;