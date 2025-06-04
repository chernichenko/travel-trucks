import { useAppDispatch, useAppSelector } from '../../hooks';
import CamperCard from '../CamperCard/CamperCard';
import Loader from '../Loader/Loader';
import { setOffset } from '../../store/camperSlice';
import styles from './Campers.module.scss';
import Button from '../Button/Button';

const Campers = () => {
  const dispatch = useAppDispatch();
  const { campers, loading, totalCount, offset, limit } = useAppSelector(s => s.campers);

  const handleLoadMore = () => {
    dispatch(setOffset(offset + limit));
  };

  return (
    <div className={styles.wrap}>
      {loading && offset === 0 ? (
        <Loader />
      ) : campers.length > 0 ? (
        <>
          <div className={styles.campers}>
            {campers.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </div>
          {campers.length < totalCount && (
            <div className={styles.buttonWrap}>
              <Button variant='white' onClick={handleLoadMore}>
                Load more
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.empty}>No campers found. Try adjusting your filters and search again.</div>
      )}
    </div>
  );
};

export default Campers;