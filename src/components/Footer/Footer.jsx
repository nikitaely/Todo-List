import React from 'react';

import TaskFilter from '../TasksFilter';

import './Footer.css';

function Footer({ count, clearCompleted, showFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter showFilter={showFilter} />
      <button onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
