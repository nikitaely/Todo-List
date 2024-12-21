import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

function edit(el) {
  console.log(el);
  this.setState(({ edit }) => ({ edit: !edit }));
}

function editText(el) {
  el.preventDefault();
  el.target[0].value = this.task;
  let text = el.target[0].value;
  if (text.length > 0) {
    this.props.editTask(text);
  }
  this.setState(() => ({ edit: false }));
}

function pauseTimer() {
  this.setState({ paused: true });
}
function playTimer() {
  this.setState({ paused: false });
}

function timerTask() {
  let { timer } = this.state;
  let minutes = Math.floor(timer / (1000 * 60));
  let seconds = Math.floor((timer % (1000 * 60)) / 1000);

  if (timer > 0) {
    return `  ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  } else {
    return '  0:0';
  }
}

function TaskText(edit) {
  if (edit) {
    return (
      <label htmlFor={this.props.id}>
        <form onSubmit={editText.bind(this)}>
          <input className="description" value={this.task} autoFocus></input>
        </form>
      </label>
    );
  } else
    return (
      <label htmlFor={this.props.id}>
        <span className="title">{this.task}</span>
        <span className="description">
          <button className="icon icon-play" onClick={playTimer.bind(this)}></button>
          <button className="icon icon-pause" onClick={pauseTimer.bind(this)}></button>
          {timerTask.call(this)}
        </span>
        <span className="description">created {formatDistanceToNow(this.date)} ago</span>
      </label>
    );
}

export default class Task extends Component {
  task = '';

  state = {
    date: this.date || Date.now(),
    edit: false,
    paused: true,
    timer: this.props.timer,
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({ paused }) => ({
        date: this.date,
        timer: paused ? this.state.timer : this.state.timer - 1000,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { task, date, onDeleted, completed, setCompleted } = this.props;
    this.date = date;
    this.task = task;
    return (
      <li className={completed ? 'completed' : null}>
        <div className="view">
          <input
            className="toggle"
            defaultChecked={!!completed}
            id={this.props.id}
            type="checkbox"
            onClick={setCompleted}
          />
          {TaskText.call(this, this.state.edit)}
          <button className="icon icon-edit" onClick={edit.bind(this)} />
          <button onClick={onDeleted} className="icon icon-destroy" />
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  completed: false,
};
Task.propTypes = {
  timer: PropTypes.number,
  date: PropTypes.number,
  completed: PropTypes.bool,
  task: PropTypes.string,
  onDeleted: PropTypes.func,
  setCompleted: PropTypes.func,
};
