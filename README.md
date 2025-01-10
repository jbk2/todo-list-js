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

- Create #updateTodoList() - to update either list or listItems:
  - must update localStorage object
  - must re-render the updated list

- Add a delete todoItem button to each todoItem:
  - must remove the item from the list in the Dom
  - must remove the item from the list in localStorage

- Add a delete todoList button
  - must remove the list from the Dom
  - must remove the list from localStorage