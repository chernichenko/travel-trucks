import type { IFilterItem } from '../../types';

import IconWind from '@/assets/icons/icon-wind.svg?react';
import IconDiagram from '@/assets/icons/icon-diagram.svg?react';
import IconCup from '@/assets/icons/icon-cup.svg?react';
import IconTv from '@/assets/icons/icon-tv.svg?react';
import IconShower from '@/assets/icons/icon-shower.svg?react';
import IconGrid from '@/assets/icons/icon-grid.svg?react';
import IconGrid9 from '@/assets/icons/icon-grid-9.svg?react';
import IconGridLeft from '@/assets/icons/icon-grid-left.svg?react';

export const DATA_EQUIPMENT: IFilterItem[] = [
  { icon: <IconWind />, label: 'AC' },
  { icon: <IconDiagram />, label: 'Automatic' },
  { icon: <IconCup />, label: 'Kitchen' },
  { icon: <IconTv />, label: 'TV' },
  { icon: <IconShower />, label: 'Bathroom' },
];

export const DATA_VEHICLE_TYPE: IFilterItem[] = [
  { icon: <IconGridLeft />, label: 'Van' },
  { icon: <IconGrid />, label: 'Fully Integrated' },
  { icon: <IconGrid9 />, label: 'Alcove' },
];