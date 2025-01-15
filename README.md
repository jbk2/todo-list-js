_Built & versions up to date from 04.01.25_

## Webpack Template - description

This is a template webpack project setup with the following packages:

- webpack & webpack-cli: Bundles JavaScript, CSS, and more.
- html-webpack-plugin: Automatically generates or updates an HTML file to include references to bundled assets.
- style-loader: Injects CSS into the DOM via <style> tags.
- css-loader: Resolves @import and url() statements in CSS for Webpack to process.
- html-loader: Processes HTML files to resolve asset references like images or links.
- webpack-dev-server: Provides a development server that rebuilds, updates source maps, and refreshes the browser in real time, run `npx webpack serve`.

## Usage
Clone this repo, change the "name" in package.json, then run `npm install` to install the dependencies.

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

## Imminent ToDo's
