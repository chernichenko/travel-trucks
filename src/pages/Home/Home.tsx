import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.bg}>
          <img src="./hero.png" alt="bg" />
        </div>

        <div className={styles.container}>
          <div className={styles.title}>Campers of your dreams</div>
          <div className={styles.text}>You can find everything you want in our catalog</div>
          <Button href="/catalog">
            View Now
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;