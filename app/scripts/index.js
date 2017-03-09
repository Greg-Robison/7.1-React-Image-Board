var React = require('react');
var ReactDOM = require('react-dom');

// var Form = require('./components/form.jsx').Form;
var ImageBoardContainer = require('./components/image_board.jsx').ImageBoardContainer;
ReactDOM.render(
  React.createElement(ImageBoardContainer),
  document.getElementById('app')
);

// ReactDOM.render(
//   React.createElement(Form),
//   document.getElementById('form')
// );
