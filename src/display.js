import { format } from "date-fns";
import { addTodoItem, deleteTodoItem, deleteTodoList } from './index.js';
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
    done: todoItem.getDone(), parentListUid: todoItem.getParentListUid() 
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
  const listsContainer = document.getElementById('todo-lists-container')
  listsContainer.insertAdjacentHTML('beforeend', buildTodoListHtml(todoList));
}

function displayTodoItem(todoItem) {
  const newItemString = buildTodoItemHtml(todoItem);
  const parser = new DOMParser
  const htmlDoc = parser.parseFromString(newItemString, 'text/html');
  const newTodoItemEl = htmlDoc.body.firstElementChild;
  const parentListItemsContainer
    = document.querySelector(`[data-list-uid="${todoItem.getParentListUid()}"] ul.todo-items-container`);
  const newItemFormLi = parentListItemsContainer.querySelector('.new-todo-item');
  parentListItemsContainer.insertBefore(newTodoItemEl, newItemFormLi.nextSibling);
}

function showNewTodoListDialogue() {

}

document.addEventListener('DOMContentLoaded', () => {
  const todoLists = document.querySelectorAll('.todo-list-card');
  
  todoLists.forEach((todoList) => {
    todoList.addEventListener('click', (event) => {
      switch (true) {
        case event.target.matches('.delete-list-btn'): {
          const listUid = event.target.parentNode.dataset.listUid
          event.target.parentNode.remove();
          deleteTodoList(listUid);
          console.log('This todoList was fully deleted', listUid)
          break;
        }
        case event.target.matches('.new-item-submit-btn'): {
          event.preventDefault();
          const form = event.target.parentNode; const parentTodoListUid = form['parent-todo-list-uid'].value;
          const itemTitle = form['title'].value; const itemDueDate = form['due-date'].value;
          const itemPriority = form['priority'].checked; const itemDescription = '';
          const itemDone = false;
          const newTodoItem = addTodoItem(parentTodoListUid, itemTitle, itemDescription, itemDueDate, itemPriority, itemDone);
          console.log('This todoItem was added', newTodoItem)
          form.reset();
          break;
        }
        case event.target.matches('.delete-item-btn'): {
          const itemTitle = event.target.value;
          const parentListUid = event.target.parentNode.dataset.parentTodoListUid
          event.target.parentNode.remove();
          deleteTodoItem(parentListUid, itemTitle);
          console.log('This todoItem was fully deleted', parentListUid, ' => ' ,  itemTitle)
          break;
        }
      }
    })
  })

  const addTodoListBtn = document.getElementById('add-todo-list');
  const newListDialog = document.getElementById('new-list-dialog');
  const closeDialogBtn = document.getElementById('close-dialog-btn');
  addTodoListBtn.addEventListener('click', ()=> {
    newListDialog.showModal();
  })
  closeDialogBtn.addEventListener('click', ()=> {
    newListDialog.close();
  })
})

export const display = { buildTodoListHtml, buildTodoItemHtml, displayTodoList, displayTodoItem };