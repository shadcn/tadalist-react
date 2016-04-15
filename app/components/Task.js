// Styles
import Styles from '../assets/scss/components/Task.scss';

// React components
import React from 'react';

class Task extends React.Component {
  // Constructor.
  constructor(props, context) {
    super(props, context);
  }

  delete = (e) => {
    e.preventDefault();
    this.props.handleDeleteTask(this.props.taskId);
  }

  // Render method.
  render() {
    return (
      <li>
        <div className="task">
          <span className="task__title">{ this.props.task.title }</span>
          <a className="button task__button task__button--delete" onClick={ this.delete }>&times;</a>
        </div>
      </li>
    );
  }
}

export default Task;
