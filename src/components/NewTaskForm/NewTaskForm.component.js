// @flow

import React from 'react';
import StyledNewTaskForm from './NewTaskForm.style';

type Props = {
  addTask: (task) => void,
};

export class NewTaskForm extends React.Component<Props> {
  constructor(props) {
    /* eslint-disable react/no-unused-state */
    super(props);
    this.state = {
      userId: '',
      id: '',
      client: '',
      project: '',
      startDate: '',
      endDate: '',
      leave: false,
    };
    /* eslint-disable react/no-unused-state */
  }

  handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    value = name === 'id' || name === 'userId' ? parseInt(value, 10) : value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const task = Object.assign({}, this.state);
    this.props.addTask(task);
  };

  render() {
    return (
      <StyledNewTaskForm>
        Date: yyyy-mm-dd
        <form>
          {
            ['userId', 'id', 'client', 'project', 'startDate', 'endDate'].map(
              taskProp =>
                <input key={taskProp} placeholder={taskProp} name={taskProp} type="text" onChange={this.handleChange} />
            )
          }
          <button onClick={this.handleSubmit}>
            Add task
          </button>
        </form>
      </StyledNewTaskForm>
    );
  }
}
