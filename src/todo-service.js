// todo-service.js
import { v7 as uuidv7 } from 'uuid';
import Storage from './storage-service';
import TodoList from './todo-list';

export default class TodoService {
  static todoListUids = new Set();

  static createTodoList(title, description) {
    let uid;
    do {
      uid = `todoList:${uuidv7()}`;
    } while (this.todoListUids.has(uid));

    const newTodoList = new TodoList(title, description, uid);
    this.saveTodoList(newTodoList);
    this.todoListUids.add(uid);
    return newTodoList;
  }

  static saveTodoList(todoList) {
    Storage.save(todoList.getUid(), todoList.toJSON());
  }

  static deleteTodoList(todoListUid) {
    this.todoListUids.delete(todoListUid);
    Storage.delete(todoListUid);
  }

  static addTodoItem(todoListUid, title, description, dueDate, priority, done) {
    const todoList = TodoList.fromJSON(Storage.load(todoListUid));
    const newTodoItem = todoList.addTodoItem(title, description, dueDate, priority, done);
    this.saveTodoList(todoList);
    return newTodoItem;
  }

  static deleteTodoItem(parentUid, itemTitle) {
    const todoList = TodoList.fromJSON(Storage.load(parentUid));
    const todoItem = todoList.findTodoItem(itemTitle);
    todoList.removeTodoItem(todoItem);
    this.saveTodoList(todoList);
  }
}