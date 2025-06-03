import { useState } from 'react';
import Input from '../../components/Input/Input';
import Layout from '../../components/Layout/Layout';
import type { IFilterItem } from '../../types';

import styles from './Catalog.module.scss';

import IconMap from '@/assets/icons/icon-map.svg?react';

import IconWind from '@/assets/icons/icon-wind.svg?react';
import IconDiagram from '@/assets/icons/icon-diagram.svg?react';
import IconCup from '@/assets/icons/icon-cup.svg?react';
import IconTv from '@/assets/icons/icon-tv.svg?react';
import IconShower from '@/assets/icons/icon-shower.svg?react';
import IconGrid from '@/assets/icons/icon-grid.svg?react';
import IconGrid9 from '@/assets/icons/icon-grid-9.svg?react';
import IconGridLeft from '@/assets/icons/icon-grid-left.svg?react';


const DATA_EQUIPMENT: IFilterItem[] = [
  { icon: <IconWind />, label: 'AC' },
  { icon: <IconDiagram />, label: 'Automatic' },
  { icon: <IconCup />, label: 'Kitchen' },
  { icon: <IconTv />, label: 'TV' },
  { icon: <IconShower />, label: 'Bathroom' },
];

const DATA_VEHICLE_TYPE: IFilterItem[] = [
  { icon: <IconGridLeft />, label: 'Van' },
  { icon: <IconGrid />, label: 'Fully Integrated' },
  { icon: <IconGrid9 />, label: 'Alcove' },
];

const Catalog = () => {
  const [text, setText] = useState('');

  const renderFilters = (filters: IFilterItem[]) => {
    return filters.map((filterItem, key) => {
      return (
        <div key={key + filterItem.label} className={styles.filterItem}>
          <div className={styles.icon}>
            {filterItem.icon}
          </div>
          <div className={styles.label}>{filterItem.label}</div>
        </div>
      );
    });
  }

  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div>
              <div className={styles.locationText}>Location</div>
              <Input
                type="text"
                placeholder="City"
                icon={<IconMap />}
                value={text}
                onChange={(val) => {
                  setText(val);
                }}
              />
            </div>
            <div className={styles.filterText}>Filters</div>
            <div className={styles.filterSection}>
              <div className={styles.filterSectionTitle}>Vehicle equipment</div>
              <div className={styles.line} />
              <div className={styles.filters}>
                {renderFilters(DATA_EQUIPMENT)}
              </div>
            </div>
            <div className={styles.filterSection}>
              <div className={styles.filterSectionTitle}>Vehicle type</div>
              <div className={styles.line} />
              <div className={styles.filters}>
                {renderFilters(DATA_VEHICLE_TYPE)}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;