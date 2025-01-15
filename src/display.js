import { format } from "date-fns";
import { createTodoList, addTodoItem, deleteTodoItem, deleteTodoList } from './index.js';
import todoItemTemplate from './views/partials/_todo-item.html';
import todoListTemplate from './views/partials/_todo-list.html';
import newTodoItemFormTemplate from './views/partials/_new-todo-item-form.html';
window.buildTodoListHtml = buildTodoListHtml;

function buildTodoListHtml(todoListObject) {
  let populatedListHtml = todoListTemplate.replace('{{newTodoItemForm}}', newTodoItemFormTemplate)
  let todoListObjectData = {
    uid: todoListObject.getUid(), title: todoListObject.getTitle(),
    description: todoListObject.getDescription(), todoItems: todoListObject.getTodoItems()
  }
  
  Object.keys(todoListObjectData).forEach((key) => {
    if (key != 'todoItems') {
      populatedListHtml = populatedListHtml.replace(new RegExp(`{{${key}}}`, 'g'), todoListObjectData[key])
    }
  })
  
  let todoItemsString = '';

  todoListObjectData.todoItems.forEach((todoItem) => {
    let todoItemHtml = buildTodoItemHtml(todoItem);
    todoItemsString = todoItemsString.concat(todoItemHtml);
  })

  populatedListHtml = populatedListHtml.replace('{{todoItems}}', todoItemsString);
  return populatedListHtml
}

function buildTodoItemHtml(todoItem) {
  let itemObjectData = {
    parentListUid: todoItem.getParentListUid() ,title: todoItem.getTitle(), description: todoItem.getDescription(),
    dueDate: format(new Date(todoItem.getDueDate()), 'dd.MM.yy'), priority: todoItem.getPriority(),
    done: todoItem.getDone()
  }
  let populatedItemHtml = todoItemTemplate

  Object.keys(itemObjectData).forEach((key) => {
    populatedItemHtml = populatedItemHtml.replace(new RegExp(`{{${key}}}`, 'g'), itemObjectData[key])
    if (key === 'done') {
      populatedItemHtml = itemObjectData[key]
        ? populatedItemHtml.replace('{{checked}}', 'checked')
        : populatedItemHtml.replace('{{checked}}', '');
    }
    if (key === 'priority') {
      if (itemObjectData[key]) {
        populatedItemHtml = populatedItemHtml.replace(' hidden', '');
      }
    }
  })
  return populatedItemHtml;
}

function displayTodoList(todoList) {
  const listsContainer = document.getElementById('todo-lists-container');
  listsContainer.insertAdjacentHTML('beforeend', buildTodoListHtml(todoList));
}

function displayTodoItem(todoItem) {
  const newItemString = buildTodoItemHtml(todoItem);
  const parser = new DOMParser
  const htmlDoc = parser.parseFromString(newItemString, 'text/html');
  const newTodoItemEl = htmlDoc.body.firstElementChild;
  const parentListItemsContainer
    = document.querySelector(`[data-list-uid="${todoItem.getParentListUid()}"] ul.todo-items-container`);
  parentListItemsContainer.append(newTodoItemEl);
}

document.addEventListener('DOMContentLoaded', () => {
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

})

export const display = { buildTodoListHtml, buildTodoItemHtml, displayTodoList, displayTodoItem };