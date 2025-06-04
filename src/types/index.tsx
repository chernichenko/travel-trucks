import type { JSX } from "react";

export interface IFilterItem {
  icon: JSX.Element;
  label: string;
}

export interface ICampersResponse {
  total: number;
  items: ICamper[];
}

export interface ICamper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: IGalleryImage[];
  reviews: IReview[];
}

export interface IReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface IGalleryImage {
  thumb: string;
  original: string;
}