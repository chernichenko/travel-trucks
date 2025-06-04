import type { JSX } from 'react';
import type { ICamper } from '../../types';
import styles from './CamperFeatures.module.scss';

import IconTransmission from '@/assets/icons/icon-diagram.svg?react';
import IconAC from '@/assets/icons/icon-wind.svg?react';
import IconShower from '@/assets/icons/icon-shower.svg?react';
import IconKitchen from '@/assets/icons/icon-fridge.svg?react';
import IconTV from '@/assets/icons/icon-tv.svg?react';
import IconGrid from '@/assets/icons/icon-grid.svg?react';
import IconGrid9 from '@/assets/icons/icon-grid-9.svg?react';
import IconGridLeft from '@/assets/icons/icon-grid-left.svg?react';

interface Props {
  camper: ICamper;
  className?: string;
}

const CamperFeatures = ({ camper, className }: Props) => {
  const featuresMap: {
    key: keyof Pick<ICamper, 'transmission' | 'AC' | 'bathroom' | 'kitchen' | 'TV' | 'form'>;
    icon: JSX.Element | ((value: string) => JSX.Element | null);
    label: (value: string) => string;
  }[] = [
    {
      key: 'transmission',
      icon: <IconTransmission />,
      label: (val) => val,
    },
    {
      key: 'AC',
      icon: <IconAC />,
      label: () => 'AC',
    },
    {
      key: 'bathroom',
      icon: <IconShower />,
      label: () => 'Bathroom',
    },
    {
      key: 'kitchen',
      icon: <IconKitchen />,
      label: () => 'Kitchen',
    },
    {
      key: 'TV',
      icon: <IconTV />,
      label: () => 'TV',
    },
    {
      key: 'form',
      icon: (val: string) => {
        switch (val) {
          case 'panelTruck':
            return <IconGridLeft />;
          case 'fullyIntegrated':
            return <IconGrid />;
          case 'alcove':
            return <IconGrid9 />;
          default:
            return null;
        }
      },
      label: (val: string) => {
        const map: Record<string, string> = {
          panelTruck: 'Van',
          fullyIntegrated: 'Fully Integrated',
          alcove: 'Alcove',
        };
        return map[val] || val;
      },
    },
  ];

  return (
    <div className={`${styles.features} ${className || ''}`}>
      {featuresMap.map(({ key, icon, label }) => {
        const value = camper[key];
        if (!value) return null;

        const stringValue = String(value);
        const iconNode = typeof icon === 'function' ? icon(stringValue) : icon;
        const labelText = label(stringValue);

        return (
          <span key={key} className={styles.feature}>
            {iconNode} {labelText}
          </span>
        );
      })}
    </div>
  );
};

export default CamperFeatures;