export interface IApartment {
  _id?: number;
  street: string;
  building: string;
  flat: string;
  floor: number;
  generalArea: number;
  lifeArea: number;
  kitchenArea:number;
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
  date?: string;
  firstName: string;
  lastName: string;
  phone1: string;
  phone2?: string;
  registerCity?: string;
  img?:string;
  comment?:string;
}

export interface IBooking {
  apartmentId: string;
  startDateTime:string;
  endDateTime: string;
  clientId: string;
  numberOfGuests: number;
}