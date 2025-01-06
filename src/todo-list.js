import TodoItem from "./todo-item";

class TodoList {
  #creationDate;
  #title;
  #description;
  #todoItems;

  constructor(title, description, todoItems = []) {
    this.setCreationDate();
    this.setTitle(title);
    this.setDescription(description);
    this.setTodoItems(todoItems);
  }

  setCreationDate() {
    this.#creationDate = new Date();
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

  setTodoItems(todoItems) {
    if(!(todoItems instanceof Array)) {
      throw new Error('Todo items must be an Array object instance');
    }
    if( !(todoItems.every(i => i instanceof TodoItem)) ) {
      throw new Error("every item of the TodoItems array must be a TodoItem instance");
    }
    this.#todoItems = todoItems;
  }
  getTodoItems() {
    return this.#todoItems;
  }

  addTodoItem(todoItem) {
    if(!(todoItem instanceof TodoItem)) {
      throw new Error('todoItem must be an instance of a TodoItem object')
    };
    this.#todoItems.push(todoItem);
    return this.getTodoItems();
  }

  removeTodoItem(todoItem) {
    this.setTodoItems(this.#todoItems.filter((item) => item !== todoItem))
  }
}

export default TodoList;