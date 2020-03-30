import React, { Fragment} from 'react';

import './App.css';

//Components

import InputTodo from "./componets/InputTodo";
import ListTodos from "./componets/ListTodos";

function App() {
  return (
    <Fragment>
      <div class="container">
      <InputTodo />
      <ListTodos />
      </div>
      </Fragment>
  );
}

export default App;
