import React, { Component } from 'react';
import TMDbApi from '../services/TMDb-api';
import Spinner from '../components/Spinner/Spinner';

export default class Reviews extends Component {
  state = {
    reviews: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });

    TMDbApi.fetchShowMovieReviews(this.props.match.params.movieId)
      .then(data => data.results)
      .then(reviews => this.setState({ reviews }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <>
        {this.state.loading && <Spinner />}

        <ul className="reviews">
          {this.state.reviews.length > 0 ? (
            this.state.reviews.map(review => (
              <li key={review.id}>
                <p>{review.content}</p>
                <p><b>{review.author}</b></p>
              </li>
            ))
          ) : (
            <li>We don't have any for this movie</li>
          )}
        </ul>
      </>
    );
  }
}
