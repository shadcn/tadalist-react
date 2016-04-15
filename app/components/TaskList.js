// Styles
import TaskListStyles from '../assets/scss/components/TaskList.scss';

// React components
import React from 'react';
import Task from './Task';

class TaskList extends React.Component {
  // Constructor.
  constructor(props, context) {
    super(props, context);
  }

  renderTasks() {
    let output = [];
    for (let task_id in this.props.tasks) {
      output.push(<Task task={this.props.tasks[task_id]} taskId={task_id} key={task_id} handleDeleteTask={ this.props.handleDeleteTask } />)
    }
    return output;
  }

  // Render method.
  render() {
    return (
      <ul className="tasklist">
        { this.renderTasks() }
      </ul>
    );
  }
}

export default TaskList;
