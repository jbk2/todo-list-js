import { deleteTodoList, addTodoItem, deleteTodoItem } from './index.js';

export default class EventManager {
  static handleDeleteList(event) {
    const listUid = event.target.parentNode.dataset.listUid;
    event.target.parentNode.remove();
    deleteTodoList(listUid);
    console.log('This todoList was fully deleted', listUid);
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
    const newTodoItem = addTodoItem(
      parentTodoListUid,
      itemTitle,
      itemDescription,
      itemDueDate,
      itemPriority,
      itemDone
    );
    console.log('This todoItem was added', newTodoItem);
    form.reset();
  }

  static handleDeleteItem(event) {
    const itemTitle = event.target.value;
    const parentListUid = event.target.parentNode.dataset.parentTodoListUid;
    event.target.parentNode.remove();
    deleteTodoItem(parentListUid, itemTitle);
    console.log('This todoItem was fully deleted', parentListUid, ' => ', itemTitle);
  }
}