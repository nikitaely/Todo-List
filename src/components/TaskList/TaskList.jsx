import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onDeleted, setCompleted, editTask, toggleEdit, playTimer, pauseTimer, updateTimer } = this.props;
    
    const elements = tasks.map((el) => {
      return (
        <Task
          key={el.id}
          task={el.task}
          completed={el.completed}
          date={el.date}
          id={el.id}
          timer={el.timer}
          edit={el.edit}
          paused={el.paused}
          setCompleted={(val) => setCompleted(el.id, val)}
          onDeleted={() => onDeleted(el.id)}
          editTask={(value) => editTask(el.id, value)}
          toggleEdit={() => toggleEdit(el.id)}
          playTimer={() => playTimer(el.id)}
          pauseTimer={() => pauseTimer(el.id)}
          updateTimer={() => updateTimer(el.id)}
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
  onDeleted: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  playTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
};
