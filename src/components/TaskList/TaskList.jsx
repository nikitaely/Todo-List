import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onDeleted, setCompleted, editTask } = this.props;
    const elements = tasks.map((el) => {
      return (
        <Task
          setCompleted={(val) => setCompleted(el.id, val)}
          onDeleted={() => onDeleted(el.id)}
          key={el.id}
          task={el.task}
          completed={el.completed}
          date={el.date}
          id={el.id}
          timer={el.timer}
          editTask={(value) => editTask(el.id, value)}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
TaskList.defaultProps = {
  tasks: [{ task: 'FirstTask' }],
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  setCompleted: PropTypes.func,
};
