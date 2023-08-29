export interface Location {
  address: string;
  city: string;
  zipcode: string;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface PeoplePerHour {
  time: string;
  amountChairs: number;
}

export interface Review {
  rating: number;
  comment: string;
}

export interface Reservations {
  id: number;
  name: string;
  mail: string;
  phone: number;
  people: number;
  date: Date;
  comments: string;
  specialRequest: string;
  eat: string[];
  drink: string[];
  bill: string;
  status: string;
  paymentMethod: string;
}

export interface Restaurant {
  name: string;
  id: number;
  time: string[];
  workDays: string[];
  category: string;
  location: Location;
  contact: Contact;
  peoplePerHour: PeoplePerHour[];
  reviews: Review[];
  reservations: Reservations[];
}
