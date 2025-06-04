import { useState, useEffect } from 'react';
import type { ICamper } from '../../types';
import Button from '../Button/Button';
import classNames from 'classnames';
import CamperFeatures from '../CamperFeatures/CamperFeature';

import styles from './CamperCard.module.scss';

import IconRating from '@/assets/icons/icon-rating.svg?react';
import IconMap from '@/assets/icons/icon-map.svg?react';
import IconHeart from '@/assets/icons/icon-heart.svg?react';

interface ICamperCard {
  camper: ICamper;
}

const FAVORITES_KEY = 'favoriteCampers';

const CamperCard = ({ camper }: ICamperCard) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      const favorites: string[] = JSON.parse(stored);
      if (favorites.includes(camper.id)) {
        setIsFavorite(true);
      }
    }
  }, [camper.id]);

  const toggleFavorite = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const favorites: string[] = stored ? JSON.parse(stored) : [];

    let updated: string[];

    if (favorites.includes(camper.id)) {
      updated = favorites.filter(id => id !== camper.id);
      setIsFavorite(false);
    } else {
      updated = [...favorites, camper.id];
      setIsFavorite(true);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={camper.gallery[0]?.thumb} alt={camper.name} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{camper.name}</h3>
          <div className={styles.headerRight}>
            <div className={styles.price}>€{camper.price.toFixed(2)}</div>
            <div
              className={classNames(styles.favorite, { [styles.active]: isFavorite })}
              onClick={toggleFavorite}
            >
              <IconHeart />
            </div>
          </div>
        </div>
        <div className={styles.meta}>
          <div className={styles.rating}>
            <IconRating />
            <span>{camper.rating.toFixed(1)} ({camper.reviews.length} Reviews)</span>
          </div>
          <div className={styles.location}>
            <IconMap />
            {camper.location}
          </div>
        </div>
        <p className={styles.description}>
          <span>{camper.description}</span>
        </p>
        <CamperFeatures camper={camper} />
        <Button href={`/catalog/${camper.id}`} target="_blank">Show more</Button>
      </div>
    </div>
  );
};

export default CamperCard;