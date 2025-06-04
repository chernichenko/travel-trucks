import Input from '../../components/Input/Input';
import type { IFilterItem } from '../../types';
import { DATA_EQUIPMENT, DATA_VEHICLE_TYPE } from './data';
import { useFilterClickHandler } from '../../hooks/useFilterClickHandler';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setLocation } from '../../store/filterSlice';
import { useCampersFetcher } from '../../hooks/useCampersFetcher';
import { setOffset } from '../../store/camperSlice';

import styles from './Filters.module.scss';

import IconMap from '@/assets/icons/icon-map.svg?react';

const Filters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(s => s.filters);
  const filterItemClickHandler = useFilterClickHandler();
  useCampersFetcher();

  const renderFilters = (filtersList: IFilterItem[]) => {
    return filtersList.map((filterItem, key) => {
      const isActive = (() => {
        switch (filterItem.label) {
          case "AC":
            return filters.AC;
          case "Automatic":
            return filters.transmission === "automatic";
          case "Kitchen":
            return filters.kitchen;
          case "TV":
            return filters.TV;
          case "Bathroom":
            return filters.bathroom;
          case "Van":
            return filters.form === "van";
          case "Fully Integrated":
            return filters.form === "fully integrated";
          case "Alcove":
            return filters.form === "alcove";
          default:
            return false;
        }
      })();

      return (
        <div
          key={key + filterItem.label}
          className={`${styles.filterItem} ${isActive ? styles.active : ""}`}
          onClick={() => filterItemClickHandler(filterItem.label)}
        >
          <div className={styles.icon}>
            {filterItem.icon}
          </div>
          <div className={styles.label}>{filterItem.label}</div>
        </div>
      );
    });
  };

  return (
    <>
      <div>
        <div className={styles.locationText}>Location</div>
        <Input
          type="text"
          placeholder="City"
          icon={<IconMap />}
          value={filters?.location}
          onChange={(val) => {
            dispatch(setOffset(0));
            dispatch(setLocation(val));
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
    </>
  );
};

export default Filters;
