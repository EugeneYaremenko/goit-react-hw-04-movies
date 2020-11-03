import React, { Component } from 'react';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  hendleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <form className={styles.SearchForm} onSubmit={this.hendleSubmit}>
        <input
          value={this.state.query}
          onChange={this.handleChange}
          className={styles.SearchFormInput}
          type="text"
          autoFocus
          placeholder="Enter movie name..."
        />

        <button type="submit" className={styles.SearchFormButton}></button>
      </form>
    );
  }
}
