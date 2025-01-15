_Built & versions up to date as at 04.01.25_

# Description
An SPA, simple Todo List application, built with vanilla JS using webpack. A [part](https://www.theodinproject.com/lessons/javascript-todo-list) of The Odin Project's curriculum.

- TodoList & TodoItem constructor classes
- Program logic in index.js and display logic in display.js
- Uses partial templating in src/views/partials
- Uses Webpack to bundle JS, fonts, css
- Persists data to localStorage

## Webpack Template - description
Using Webpack (env. scoped dependencies) & NPM, see webpack.*.js & package.json for details, amongst others these libraries are used:

- webpack & webpack-cli
- html-webpack-plugin
- style-loader
- css-loader
- html-loader
- webpack-dev-server
- datefns
- uuid

## ToDo's
- Create #updateTodoList() - to update either list or items:
  (update priority, title (list & item), due date, done, list description)
  - must update localStorage object
  - must re-render the updated list
- Populate sidebar
  - clickable list index? 
  - Items by dueDate?
- Adjust Item date logic so that if no dueDate selected the field is empty
- Order todoItems by dueDate
- Enable expansion of todoItem, by clicking on todoItem title.
- Split css out into separate files
