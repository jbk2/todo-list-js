class TodoItem {
  #title;
  #description;
  #dueDate;
  #priority;
  #done;
  #parentListUid;

  constructor(title, description, dueDate, priority, done, parentListUid) {
    this.setTitle(title);
    this.setDescription(description);
    this.setDueDate(dueDate);
    this.setPriority(priority);
    this.setDone(done);
    this.setParentListUid(parentListUid);
  }

  setTitle(title) {
    if (typeof title != 'string' || title.trim() === '') {
      throw new Error('Title must be a non-empty string');
    }
    // MUST VALIDATE AGAINST SAME TITLE ALREADY IN LOCALSTORAGE
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
  
  setDueDate(dueDate) {
    let date = dueDate instanceof Date ? dueDate : new Date(dueDate);
    if (isNaN(date.getTime())) {
      throw new Error('dueDate must be a valid date (ISO 8601 format or Date object).');
    }
    this.#dueDate = date;
  }
  getDueDate() {
    return this.#dueDate;
  }

  setPriority(priority) {
    if (typeof priority !== 'boolean') {
      throw new Error('Priority must be a boolean.');
    }
    this.#priority = priority;
  }
  getPriority() {
    return this.#priority;
  }

  setDone(done) {
    if (typeof done !== 'boolean') {
      throw new Error('Done must must be a boolean.');
    }
    this.#done = done;
  }
  getDone() {
    return this.#done;
  }
  
  setParentListUid(uid) {
    this.#parentListUid = uid;
  }
  getParentListUid() {
    return this.#parentListUid;
  }


  toJSON() {
    return {
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      done: this.#done,
      parentListUid: this.#parentListUid
    };
  }

  static fromJSON(json) {
    return new TodoItem(
      json.title,
      json.description,
      new Date(json.dueDate),
      json.priority,
      json.done,
      json.parentListUid
    );
  }
}

export default TodoItem;