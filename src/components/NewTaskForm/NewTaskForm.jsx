import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

const clamp = (value, min, max) => (value > max ? max : value < min ? min : value);

function setMin(e) {
  let value = e.target.value;
  if (value != '') e.target.value = clamp(+value, 0, 9999) || 0;
}

function setSec(e) {
  let value = e.target.value;
  if (value != '') e.target.value = clamp(+value, 0, 59) || 0;
}

export default class NewTodo extends Component {
  render() {
    return (
      <form className="new-todo-form" onSubmit={this.props.createTask}>
        <label htmlFor="plc">
          <input className="new-todo" id="plc" placeholder="What needs to be done?" autoFocus />
        </label>
        <label htmlFor="min">
          <input className="new-todo-form__timer" id="min" placeholder="Min" onChange={setMin} />
        </label>
        <label htmlFor="sec">
          <input className="new-todo-form__timer" id="sec" placeholder="Sec" onChange={setSec} />
        </label>

        {/*Форма с несколькими инпутами не обрабавтывается в onSubmit без него ;(*/}

        <label>
          <input type="submit" style={{ display: 'none' }}></input>
        </label>
      </form>
    );
  }
}

NewTodo.propTypes = {
  createTask: PropTypes.func,
};
