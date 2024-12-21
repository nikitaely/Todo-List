import React from 'react';

import NewTaskForm from '../NewTaskForm';

function Header({ createTask }) {
  return (
    <header>
      <h1>todos</h1>
      <NewTaskForm createTask={createTask} />
    </header>
  );
}

export default Header;
