// Styles
import AddTaskFormStyles from '../assets/scss/components/AddTaskForm.scss';

// React components
import React from 'react';

class Form extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: ''
    }
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({ value: '' })
  }

  render() {
    return <form className="add-task-form" onSubmit={ this.onSubmit }>
      <input type="text" value={ this.state.value } onChange={ this.onChange } placeholder="What do you want to do?" />
      <input type="submit" value="Add" />
    </form>
  }
}

export default Form;
