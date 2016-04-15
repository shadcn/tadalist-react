// Styles
import Styles from '../assets/scss/components/App.scss';

// Config
import config from '../../config.json';

// React components
import React from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

import { omit } from 'lodash';

// Firebase
import Firebase from 'firebase';
const firebaseRef = new Firebase(config.firebase);
const firebaseTasksRef = firebaseRef.child('tasks');

// App component
class App extends React.Component {
  // Constructor
  constructor(props, context) {
    super(props, context);

    // Properties.
    this.tasks = {};

    // Default states.
    this.state = { tasks: {} }
  }

  componentDidMount = () => {
    // Load tasks from Firebase.
    this.tasks = [];
    firebaseTasksRef.orderByPriority().once("value", (snapshot) => {
      snapshot.forEach( (taskSnapshot) => {
        this.tasks[taskSnapshot.key()] = taskSnapshot.val();
      });

      // Reverse the order.
      this.tasks = this.tasks.reverse();

      // Update the state.
      this.setState({ tasks: this.tasks });
    },
      (errorObject) => console.log("The read failed: " + errorObject.code)
    );

    // Update the state when a tasks is added.
    firebaseTasksRef.limitToLast(1).on('child_added', (snapshot) => {
      this.tasks[snapshot.key()] = snapshot.val();
      this.setState({ tasks: this.tasks });
    });

    // Remove tasks when deleted.
    firebaseTasksRef.on('child_removed', (snapshot) => {
      this.tasks = omit(this.tasks, snapshot.key());
      this.setState({ tasks: this.tasks });
    });

    // Update task when changes.
    firebaseTasksRef.on('child_changed', (snapshot) => {
      this.tasks[snapshot.key()] = snapshot.val();
      this.setState({ tasks: this.tasks });
    });
  }

  // Handle form Submit.
  onSubmit = (task) => this.addTask(task);

  // Adds a task
  addTask = (task) => {
    firebaseRef.child('tasks').push({ title: task });
  }

  // Deletes a task
  deleteTask = (task_id) => {
    // Delete task on firebasel
    firebaseTasksRef.child(task_id).remove();
  }

  // Render callback.
  render = () => {
    return (
      <div>
        <TaskList tasks={ this.state.tasks } handleDeleteTask={ this.deleteTask } />
        <AddTaskForm handleSubmit={ this.onSubmit } />
      </div>
    )
  }
}

export default App;
