import type { ICamper } from '../../types';
import Button from '../Button/Button';
import type { JSX } from 'react';

import styles from './CamperCard.module.scss';

import IconRating from '@/assets/icons/icon-rating.svg?react';
import IconMap from '@/assets/icons/icon-map.svg?react';
import IconTransmission from '@/assets/icons/icon-diagram.svg?react';
import IconShower from '@/assets/icons/icon-shower.svg?react';
import IconTV from '@/assets/icons/icon-tv.svg?react';
import IconKitchen from '@/assets/icons/icon-fridge.svg?react';
import IconAC from '@/assets/icons/icon-wind.svg?react';
import IconGrid from '@/assets/icons/icon-grid.svg?react';
import IconGrid9 from '@/assets/icons/icon-grid-9.svg?react';
import IconGridLeft from '@/assets/icons/icon-grid-left.svg?react';

interface ICamperCard {
  camper: ICamper;
}

const CamperCard = ({ camper }: ICamperCard) => {
  const featuresMap: {
  key: keyof Pick<ICamper, "transmission" | "AC" | "bathroom" | "kitchen" | "TV" | "form">;
  icon: JSX.Element | ((value: string) => JSX.Element | null);
  label: (value: string) => string;
}[] = [
    {
      key: "transmission",
      icon: <IconTransmission />,
      label: (val) => val,
    },
    {
      key: "AC",
      icon: <IconAC />,
      label: () => "AC",
    },
    {
      key: "bathroom",
      icon: <IconShower />,
      label: () => "Bathroom",
    },
    {
      key: "kitchen",
      icon: <IconKitchen />,
      label: () => "Kitchen",
    },
    {
      key: "TV",
      icon: <IconTV />,
      label: () => "TV",
    },
    {
      key: "form",
      icon: (val: string) => {
        switch (val) {
          case "panelTruck":
            return <IconGridLeft />;
          case "fullyIntegrated":
            return <IconGrid />;
          case "alcove":
            return <IconGrid9 />;
          default:
            return null;
        }
      },
      label: (val: string) => {
        const map: Record<string, string> = {
          panelTruck: "Van",
          fullyIntegrated: "Fully Integrated",
          alcove: "Alcove",
        };
        return map[val] || val;
      },
    }
  ];

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={camper.gallery[0]?.thumb} alt={camper.name} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{camper.name}</h3>
          <div className={styles.price}>€{camper.price.toFixed(2)}</div>
        </div>
        <div className={styles.meta}>
          <div className={styles.rating}>
            <IconRating />
            {camper.rating.toFixed(1)} ({camper.reviews.length} Reviews)
          </div>
          <div className={styles.location}>
            <IconMap />
            {camper.location}
          </div>
        </div>
        <p className={styles.description}>
          <span>{camper.description}</span>
        </p>
        <div className={styles.features}>
          {featuresMap.map(({ key, icon, label }) => {
            const value = camper[key as keyof ICamper];
            if (!value) return null;

            const stringValue = String(value);
            const iconNode = typeof icon === "function" ? icon(stringValue) : icon;
            const labelText = label(stringValue);

            return (
              <span key={key} className={styles.feature}>
                {iconNode} {labelText}
              </span>
            );
          })}
        </div>
        <Button href={`/camper/${camper.id}`}>Show more</Button>
      </div>
    </div>
  );
};

export default CamperCard;