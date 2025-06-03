import type { ReactNode } from 'react';
import Header from '../Header/Header';

import styles from './Layout.module.scss';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;