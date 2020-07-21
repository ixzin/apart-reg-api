export interface IApartment {
  id?: number;
  street: string;
  building: string;
  floor: number;
}
export interface IClient {
  name: string;
  fullName?: string;
  phone: string;
  additionalPhone?: string;
  city?: string;
}