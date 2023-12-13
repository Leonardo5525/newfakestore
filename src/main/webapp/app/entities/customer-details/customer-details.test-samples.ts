import { ICustomerDetails, NewCustomerDetails } from './customer-details.model';

export const sampleWithRequiredData: ICustomerDetails = {
  id: 31215,
  gender: 'MALE',
  phone: '+351 965420542',
  addressLine1: 'huzzah loudly',
  city: 'Sabugal',
  country: 'Grécia',
};

export const sampleWithPartialData: ICustomerDetails = {
  id: 21047,
  gender: 'MALE',
  phone: '+351 916675820',
  addressLine1: 'ick',
  addressLine2: 'foolishly but',
  city: 'Montijo',
  country: 'Bósnia e Herzegovina',
};

export const sampleWithFullData: ICustomerDetails = {
  id: 25223,
  gender: 'MALE',
  phone: '+351 923948651',
  addressLine1: 'goodwill fooey celebrity',
  addressLine2: 'yowza',
  city: 'Portimão',
  country: 'Canadá',
};

export const sampleWithNewData: NewCustomerDetails = {
  gender: 'MALE',
  phone: '+351 915497243',
  addressLine1: 'qua',
  city: 'Esmoriz',
  country: 'Nova Caledónia',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
