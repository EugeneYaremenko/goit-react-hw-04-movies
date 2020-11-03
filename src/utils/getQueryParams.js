import queryString from 'query-string';

export default function getQueryParams(searchString) {
  return queryString.parse(searchString);
}
