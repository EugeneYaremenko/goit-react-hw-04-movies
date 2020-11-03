import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import routes from '../../routes';

const Navigation = () => {
  return (
    <ul className={styles.navigation}>
      <li>
        <NavLink
          exact
          to={routes.homePage}
          className={styles.navigationLink}
          activeClassName={styles.navigationLinkActive}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={routes.moviesPage}
          className={styles.navigationLink}
          activeClassName={styles.navigationLinkActive}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
