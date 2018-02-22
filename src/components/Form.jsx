import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

class Form extends React.Component {
  state = {
    title: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    const { title } = this.state;
    if (title) {
      this.props.onAdd(title);
      this.setState({ title: '' });
    }
  };

  handleChange = event => {
    const title = event.target.value;

    this.setState({ title });
  };

  render() {
    const { title } = this.state;
    const disabled = !this.state.title;

    return (
      <form className="todo-add-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Что нужно сделать?"
          onChange={this.handleChange}
        />

        <Button type="submit" disabled={disabled}>
          Добавить
        </Button>
      </form>
    );
  }
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };
}

export default Form;
