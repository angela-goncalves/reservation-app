export interface Restaurant {
  name: string;
  id: number;
  time: string[];
  workDays: string[];
  peoplePerHour: PeoplePerHour[];
  reservations: Reservations[];
}

export interface PeoplePerHour {
  time: string;
  amountChairs: number;
}

export interface Reservations {
  id: number;
  name: string;
  mail: string;
  telf: number;
  time: string;
  people: number;
  comments: string;
  date: Date;
  spetialRequest: string;
  eat: string[];
  drink: string[];
  bill: string;
}
