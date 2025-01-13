import { format } from "date-fns";
import todoItemTemplate from './views/partials/_todo-item.html';
import todoListTemplate from './views/partials/_todo-list.html';

window.buildTodoListHtml = buildTodoListHtml;
window.displayTodoLists = displayTodoLists;

function buildTodoListHtml(listObject) {
  let listObjectData = {
    uid: listObject.getUid(), title: listObject.getTitle(),
    description: listObject.getDescription(), todoItems: listObject.getTodoItems()
  }
  let populatedListHtml = todoListTemplate
  
  Object.keys(listObjectData).forEach((key) => {
    if (key != 'todoItems') {
      populatedListHtml = populatedListHtml.replace(new RegExp(`{{${key}}}`, 'g'), listObjectData[key])
    }
  })
  
  let todoItemsString = '';

  listObjectData.todoItems.forEach((todoItem) => {
    let todoItemHtml = buildTodoItemHtml(todoItem);
    todoItemsString = todoItemsString.concat(todoItemHtml);
  })

  populatedListHtml = populatedListHtml.replace('{{todoItems}}', todoItemsString);
  return populatedListHtml
}

function buildTodoItemHtml(todoItem) {
  let itemObjectData = {
    title: todoItem.getTitle(), description: todoItem.getDescription(),
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

function displayTodoLists(todoListUids) {
  const listsContainer = document.getElementById('todo-lists-container')
  listsContainer.innerHTML = '';

  
  todoListUids.forEach((uid) => {
    const listObject = TodoList.fromJSON(JSON.parse(localStorage.getItem(uid)));
    listsContainer.insertAdjacentHTML('beforeend', buildTodoListHtml(listObject));
  });
}

function refreshListInUi(todoList) {
  let listUiElement = document.querySelector(`[data-list-uid="${todoList.getUid()}"]`);
  let listHtml = buildTodoListHtml(todoList)
  
  if (listUiElement) { // if list already in UI update it
    listUiElement.outerHTML = listHtml;
  } else { // if we've not displayed the list yet then display it
    const listsContainer = document.getElementById('todo-lists-container')
    listsContainer.insertAdjacentHTML('beforeend', listHtml);
  }
}


export const display = { buildTodoListHtml, buildTodoItemHtml, displayTodoLists, refreshListInUi };