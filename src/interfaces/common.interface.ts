export interface IApartment {
  id?: number;
  street: string;
  building: string;
  floor: number;
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
  date?: string;
  firstName: string;
  lastName: string;
  phone1: string;
  phone2?: string;
  registerCity?: string;
  img?:string;
}

export interface IBooking {
  apartmentId: string;
  startDateTime:string;
  endDateTime: string;
  clientId: string;
  numberOfGuests: number;
}