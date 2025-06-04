import { useEffect, useState, type ReactNode } from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className={styles.mobileMessage}>
        Mobile version coming soon.
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;