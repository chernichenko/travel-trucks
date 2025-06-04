import Layout from '../../components/Layout/Layout';
import Filters from '../../components/Filters/Filters';
import Campers from '../../components/Campers/Campers';

import styles from './Catalog.module.scss';

const Catalog = () => {

  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Filters />
          </div>
          <div className={styles.right}>
            <Campers />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;