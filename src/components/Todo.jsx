import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import Button from './Button';

class Todo extends React.Component {
  state = {
    editing: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing) {
      this.refs.title.focus();
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const title = this.refs.title.value;

    this.props.onEdit(this.props.id, title);
    this.setState({ editing: false });
  };

  handleDelete = () => {
    debugger;
    this.props.onDelete(this.props.id);
  };

  handleToggle = () => {
    this.props.onToggle(this.props.id);
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  renderDisplay() {
    const className = `todo${this.props.completed ? ' completed' : ''}`;
    const { completed, title } = this.props;
    return (
      <div className={className}>
        <Checkbox checked={completed} onChange={this.handleToggle} />

        <span className="todo-title">{title}</span>

        <Button className="edit icon" icon="edit" onClick={this.handleEdit} />
        <Button
          className="delete icon"
          icon="delete"
          onClick={this.handleDelete}
        />
      </div>
    );
  }

  renderForm() {
    const { title } = this.props;
    return (
      <form className="todo-edit-form" onSubmit={this.handleSubmit}>
        <input type="text" ref="title" defaultValue={title} />
        <Button className="save icon" icon="save" type="submit" />
      </form>
    );
  }

  render() {
    return this.state.editing ? this.renderForm() : this.renderDisplay();
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  };
}

export default Todo;
