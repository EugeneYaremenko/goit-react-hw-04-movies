import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getQueryParams from '../utils/getQueryParams';
import TMDbApi from '../services/TMDb-api';
import Spinner from '../components/Spinner/Spinner';
import Searchbar from '../components/Searchbar/Searchbar';

export default class MoviesPage extends Component {
  state = {
    searchMovies: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);

    if (query) {
      TMDbApi.fetchShowSearchMovies(query)
        .then(searchMovies => this.setState({ searchMovies }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      TMDbApi.fetchShowSearchMovies(nextQuery)
        .then(searchMovies => this.setState({ searchMovies }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleChangeQuery = query => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${query}&page=1`,
    });
  };

  render() {
    const { searchMovies } = this.state;
    const { match } = this.props;

    return (
      <div>
        <Searchbar onSubmit={this.handleChangeQuery} />

        {this.state.loading && <Spinner />}

        {searchMovies.length > 0 && (
          <ul>
            {searchMovies.map(searchMovies => (
              <li key={searchMovies.id}>
                <Link
                  to={{
                    pathname: `${match.url}/${searchMovies.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {searchMovies.title ? searchMovies.title : searchMovies.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
