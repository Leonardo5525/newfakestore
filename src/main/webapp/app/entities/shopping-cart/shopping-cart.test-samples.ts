import dayjs from 'dayjs/esm';

import { IShoppingCart, NewShoppingCart } from './shopping-cart.model';

export const sampleWithRequiredData: IShoppingCart = {
  id: 2486,
  placedDate: dayjs('2023-12-13T09:49'),
  status: 'COMPLETED',
  totalPrice: 9499.23,
  paymentMethod: 'IDEAL',
};

export const sampleWithPartialData: IShoppingCart = {
  id: 13371,
  placedDate: dayjs('2023-12-12T19:11'),
  status: 'CANCELLED',
  totalPrice: 26641.17,
  paymentMethod: 'CREDIT_CARD',
};

export const sampleWithFullData: IShoppingCart = {
  id: 19676,
  placedDate: dayjs('2023-12-13T08:13'),
  status: 'COMPLETED',
  totalPrice: 15557.35,
  paymentMethod: 'IDEAL',
  paymentReference: 'huzzah brownie yowza',
};

export const sampleWithNewData: NewShoppingCart = {
  placedDate: dayjs('2023-12-12T19:38'),
  status: 'PENDING',
  totalPrice: 19996.69,
  paymentMethod: 'CREDIT_CARD',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
