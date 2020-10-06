export interface IAuth {
  access_token: string;
  refresh_token: string;
  expires_on: number;
}

export interface IApartment {
  _id?: number;
  street: string;
  building: string;
  flat: string;
  floor: number;
  generalArea: number;
  lifeArea: number;
  kitchenArea: number;
  rooms: number;
}

export interface IUser {
  _id: string;
  login: string;
  password: string;
  date?: string;
  fullName?: string;
  phone?: string;
  additionalPhone?: string;
}

export interface IClient {
  clientId?: string;
  date?: string;
  firstName: string;
  lastName: string;
  phone1: string;
  phone2?: string;
  registerCity?: string;
  registerDate?: string;
  img?: string;
  comment?: string;
}

export interface ISavedClient extends IClient {
  _id: string;
}

export interface IBooking {
  apartmentId: string;
  client: IClient;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  numberOfGuests: number;
}