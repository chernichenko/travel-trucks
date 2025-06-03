import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Header.module.scss';

import Logo from '@/assets/logo.svg?react';

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={'/'}>
          <Logo />
        </Link>

        <div className={styles.nav}>
          <Link to='/' className={classNames(styles.link, location.pathname === '/' && styles.active)}>Home</Link>
          <Link to='/catalog' className={classNames(styles.link, location.pathname === '/catalog' && styles.active)}>Catalog</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
