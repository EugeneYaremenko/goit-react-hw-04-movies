import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TMDbApi from '../services/TMDb-api';
import Spinner from '../components/Spinner/Spinner';

export default class HomePage extends Component {
  state = {
    trendings: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });

    TMDbApi.fetchShowTrending()
      .then(trendings => this.setState({ trendings }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { trendings } = this.state;
    const { match } = this.props;

    return (
      <div>
        <h1>Trending today</h1>

        {this.state.loading && <Spinner />}

        {trendings.length > 0 && (
          <ul>
            {trendings.map(trending => (
              <li key={trending.id}>
                <Link to={`${match.url}movies/${trending.id}`}>
                  {trending.title ? trending.title : trending.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
