import TodoService from '../services/todo-service.js'
import StorageService from '../services/storage-service.js'
import { display } from './display.js'

export default class EventHandler {
  static handleDeleteList(event) {
    const listUid = event.target.parentNode.dataset.listUid;
    event.target.parentNode.remove();
    console.log('This todoList is being fully deleted: =>', StorageService.load(listUid));
    TodoService.deleteTodoList(listUid);
  }

  static handleAddItem(event) {
    event.preventDefault();
    const form = event.target.parentNode;
    const parentTodoListUid = form['parent-todo-list-uid'].value;
    const itemTitle = form['title'].value;
    const itemDueDate = form['due-date'].value;
    const itemPriority = form['priority'].checked;
    const itemDescription = '';
    const itemDone = false;
    const newTodoItem = TodoService.addTodoItem(
      parentTodoListUid,
      itemTitle,
      itemDescription,
      itemDueDate,
      itemPriority,
      itemDone
    );
    display.displayTodoItem(newTodoItem);
    console.log('This todoItem was added & displayed', newTodoItem);

    form.reset();
  }

  static handleDeleteItem(event) {
    const itemTitle = event.target.value;
    const parentListUid = event.target.parentNode.dataset.parentTodoListUid;
    event.target.parentNode.remove();
    TodoService.deleteTodoItem(parentListUid, itemTitle);
    console.log('This todoItem was fully deleted', parentListUid, ' => ', itemTitle);
  }
}