import TodoItem from "./todo-item";

class TodoList {
  #creationDate;
  #title;
  #description;
  #uid;
  #todoItems = [];

  constructor(title, description, uid) {
    this.setCreationDate();
    this.setTitle(title);
    this.setDescription(description);
    this.setUid(uid);
  }

  setCreationDate(creationDate = new Date()) {
    this.#creationDate = creationDate;
  }
  
  getCreationDate() {
    return this.#creationDate;
  }
  
  setTitle(title) {
    if (typeof title != 'string' || title.trim() === '') {
      throw new Error('Title must be a non-empty string');
    }
    this.#title = title;
  }

  getTitle() {
    return this.#title;
  }

  setDescription(description) {
    if (typeof description != 'string' || description.trim() === '' || description.length < 4) {
      throw new Error('Description must be a non-empty string of more than 4 chars');
    }
    this.#description = description;
  }

  getDescription() {
    return this.#description;
  }

  setUid(uid) {
    this.#uid = uid;
  }

  getUid() {
    return this.#uid;
  }
  
  addTodoItem(title, description, dueDate, priority, done) {
    let newTodoItem = new TodoItem(title, description, dueDate, priority, done, this.getUid())
    this.#todoItems.push(newTodoItem);
    return newTodoItem;
  }

  removeTodoItem(todoItem) {
    this.setTodoItems(this.#todoItems.filter((item) => item !== todoItem))
  }
  
  getTodoItems() {
    return this.#todoItems;
  }

  getFirstTodoItem() {
    return this.#todoItems[0];
  }

  getLastTodoItem() {
    return this.#todoItems[-1];
  }

  toJSON() {
    return {
      creationDate: this.#creationDate.toISOString(),
      title: this.#title,
      description: this.#description,
      uid: this.#uid,
      todoItems: this.#todoItems.map(item => item.toJSON()),
    }
  }

  static fromJSON(json) {
    let todo = new TodoList(
      json.title,
      json.description,
      json.uid
    );
    todo.setCreationDate(new Date(json.creationDate));
    todo.#todoItems = json.todoItems.map(item => TodoItem.fromJSON(item));

    return todo;
  }
}

export default TodoList;

// e.g. JSON'ified TodoList object:
// 
// { "creationDate":"2025-01-06T15:51:49.610Z",
//   "title":"1st project",
//   "description":"test project to work on",
//   "todoItems":[
//     {"title":"Eggs","description":"basdf","dueDate":"2025-01-06T15:51:49.608Z","priority":false,"done":false},
//     {"title":"bacon","description":"basdf","dueDate":"2025-01-06T15:51:49.608Z","priority":false,"done":false}
//   ]
// }

// next steps:
// create List UUID, add parentListId to todoItem when addTodoItem called

// 