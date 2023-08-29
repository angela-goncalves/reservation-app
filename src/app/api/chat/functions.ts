import { CompletionCreateParams } from "openai/resources/chat/index";
import * as chrono from "chrono-node";
import { Restaurant, PeoplePerHour, Reservations } from "@/types/types";
import { baseURL } from "@/baseURL";

export const functions: CompletionCreateParams.Function[] = [
  {
    name: "check_restaurant_availability",
    description: "Check the availabily of the restaurant.",
    parameters: {
      type: "object",
      properties: {
        dateUser: {
          type: "string",
          description: "date of the reservation",
        },
        peopleUser: {
          type: "number",
          description: "amount of people",
        },
      },
      required: ["date", "people"],
    },
  },
  {
    name: "get_restaurant_data",
    description:
      "Get all the restaurant's info including the reservations saved",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

async function get_restaurant_data() {
  const getRest = await fetch(`${baseURL}/api/resdata`);
  const data = await getRest.json();
  return data;
}

async function check_restaurant_availability(
  dateUser: string,
  peopleUser: number
) {
  const restaurant = await get_restaurant_data();

  const date = chrono.parseDate(dateUser);

  //take the week day from the costumer's date
  const datestring = date.toString().split(" ");
  const day = datestring[0];

  // the restaurant is working that day?
  if (!restaurant.workDays.includes(day)) {
    return false;
  }
  // the restaurant is working at that time?
  const time = datestring[4];
  if (!restaurant.time.includes(time)) {
    return false;
  }

  const slot = restaurant.peoplePerHour.find(
    (slot: PeoplePerHour) => slot.time === time
  );
  if (!slot) {
    return false;
  }

  const currentReservations = restaurant.reservations.filter(
    (res: Reservations) => {
      const datestring = res.date.toString().split(" ");
      const dayRes = datestring[0];
      const timeRes = datestring[4];
      dayRes === day && timeRes === time;
    }
  );

  const totalPeople = currentReservations.reduce(
    (sum: number, res: Reservations) => sum + res.people,
    0
  );

  return slot.amountChairs - totalPeople >= peopleUser ? true : false;
}
// async function suggest_alternative_times(){

//     const restaurant = await get_restaurant_data();
//     const { date, people } = await extract_user_reservation(
//       dateUser,
//       peopleUser
//     );

//     const filterdate = restaurant.filter((item: Restaurant) =>
//       item.reservations.some((ele: Reservations) => ele.date === date)
//     );

//     console.log(people);
//     if (filterdate.length === 0) {
//       return true;
//     } else {
//       return false;
//     }
// }

export async function runFunction(name: string, args: any) {
  switch (name) {
    case "get_restaurant_data":
      return await get_restaurant_data();
    case "check_restaurant_availability":
      return await check_restaurant_availability(
        args["dateUser"],
        args["peopleUser"]
      );
    default:
      return null;
  }
}
