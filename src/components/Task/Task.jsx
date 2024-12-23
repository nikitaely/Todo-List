import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';



export default class Task extends Component {
  task = '';

  componentDidMount() {
    this.timer = setInterval(() => {
      if (!this.props.paused) {
        this.props.updateTimer(this.props.id);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { id, task, date, completed, timer, onDeleted, setCompleted, edit, toggleEdit, editTask, playTimer, pauseTimer } = this.props;
    const minutes = Math.floor(timer / (1000 * 60));
    const seconds = Math.floor((timer % (1000 * 60)) / 1000);

    return (
      <li className={completed ? 'completed' : null}>
        <div className="view">
          <input
            className="toggle"
            checked={completed}
            id={id}
            type="checkbox"
            onChange={() => setCompleted(id)}
          />
          {edit ? (
            <label htmlFor={id}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editTask(id, e.target[0].value);
                }}
              >
                <input className="description" defaultValue={task} autoFocus />
              </form>
            </label>
          ) : (
            <label htmlFor={id}>
              <span className="title">{task}</span>
              <span className="description">
                <button className="icon icon-play" onClick={() => playTimer(id)}></button>
                <button className="icon icon-pause" onClick={() => pauseTimer(id)}></button>
                {`  ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`}
              </span>
              <span className="description">created {formatDistanceToNow(date)} ago</span>
            </label>
          )}
          <button className="icon icon-edit" onClick={() => toggleEdit(id)} />
          <button onClick={() => onDeleted(id)} className="icon icon-destroy" />
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  completed: PropTypes.bool,
  paused: PropTypes.bool,
  timer: PropTypes.number.isRequired,
  edit: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  playTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
};

