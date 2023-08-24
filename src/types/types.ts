export interface Restaurant {
  id: number;
  name: string;
  peoplePerHour: PeoplePerHour[];
  reservations: Reservations[];
  time: string[];
  workDays: string[];
}

export interface PeoplePerHour {
  time: string;
  amountChairs: number;
}

export interface Reservations {
  bill: string;
  comments: string;
  date: Date;
  drink: string[];
  eat: string[];
  id: number;
  mail: string;
  name: string;
  people: number;
  spetialRequest: string;
  telf: number;
  time: string;
}
