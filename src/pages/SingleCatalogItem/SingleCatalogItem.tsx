import Layout from '../../components/Layout/Layout';
import CamperDetails from '../../components/CamperDetails/CamperDetails';

import styles from './SingleCatalogItem.module.scss';

const SingleCatalogItem = () => {
  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <CamperDetails />
        </div>
      </div>
    </Layout>
  );
};

export default SingleCatalogItem;