export type UserType = {
  firstName: {
    type: String;
    required: true;
  };
  lastName: {
    type: String;
    required: true;
  };
  email: {
    type: String;
    required: true;
  };
  password: {
    type: String;
    required: true;
  };
};

export type CarDetailsType = {
  vatType: { type: String; required: true };
  year: { type: number; required: true };
  location: { type: String; required: true };
  address: { type: String; required: true };
  mileage: { type: String; required: true };
  fuelType: { type: String; required: true };
  power: { type: String; required: true };
  condition: { type: String; required: true };
  color: { type: String; required: true };
  intColor: { type: String; required: true };
};

export type CarType = {
  bidCreatedAt?: String;
  email: String;
  bidPrice: String;
  id?: String;
  carModel?: String;
  brand?: String;
  startPrice?: Number;
  sale?: Number;
  description?: String;
  carDetails?: Array<String>;
  img?: Array<String>;
  userId?: String;
  bidContestants?: String;
  endTime?: string;
  createdAt?: string;
};

export type BrandType = {
  id: String;
  brandTitle: String;
  img: String;
};
