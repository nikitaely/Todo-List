import React, { Component } from 'react';

import Header from '../Header';
import TodoList from '../TaskList';
import Footer from '../Footer';
import './App.css';

export default class App extends Component {
  maxId = 1;

  state = {
    todoData: [this.createTaskObject('fw'), this.createTaskObject('fw')],
    renderData: () => this.state.todoData.filter((el) => this.filterTask(this.state.filter, el)),
    filter: 'all',
  };

  onDeleted = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = JSON.parse(JSON.stringify(todoData));
      const idx = newTodoData.findIndex((el) => el.id === id);
      newTodoData.splice(idx, 1);
      return {
        todoData: newTodoData,
      };
    });
  };

  createTaskObject(task, timer) {
    return { task, id: this.maxId++, date: Date.now(), timer: timer ? timer : 1000 * 60 * 15 };
  }

  editTask = (taskId, value) => {
    this.setState(({ todoData }) => {
      let newData = JSON.parse(JSON.stringify(todoData));
      let task = newData.find((el) => el.id == taskId);
      task.task = value;
      return {
        todoData: newData,
      };
    });
  };

  createTask = (e) => {
    e.preventDefault();
    if (e.target[0].value.length > 0) {
      let mins = +e.target[1].value || 0;
      let secs = +e.target[2].value || 0;

      let timer = (mins * 60 + secs) * 1000;
      console.log(timer);
      this.setState(({ todoData }) => {
        const newTodoData = JSON.parse(JSON.stringify(todoData));
        newTodoData.push(this.createTaskObject(e.target[0].value, timer));
        for (let target of e.target) target.value = '';
        return {
          todoData: newTodoData,
        };
      });
    }
  };

  setCompleted = (id, value) => {
    const completed = value.target.checked;
    this.setState(({ todoData }) => {
      const newTodoData = JSON.parse(JSON.stringify(todoData));
      const idx = newTodoData.findIndex((el) => el.id === id);
      newTodoData[idx].completed = completed;
      return {
        todoData: newTodoData,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.completed),
    }));
  };

  filterTask(filter, element) {
    switch (filter) {
      case 'all':
        return true;
      case 'active':
        return !element.completed;
      case 'completed':
        return element.completed;
      default:
        throw new Error('Wrong Filter');
    }
  }

  showFilter = (el) => {
    this.setState(() => ({ filter: el.toLowerCase() }));
  };

  render() {
    return (
      <section className="todoapp">
        <Header createTask={this.createTask} />
        <section className="main">
          <TodoList
            tasks={this.state.renderData()}
            onDeleted={this.onDeleted}
            setCompleted={this.setCompleted}
            editTask={this.editTask}
          />
          <Footer
            showFilter={this.showFilter}
            clearCompleted={this.clearCompleted}
            count={this.state.todoData.filter((el) => !el.completed).length}
          />
        </section>
      </section>
    );
  }
}
