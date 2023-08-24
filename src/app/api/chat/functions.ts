import { CompletionCreateParams } from "openai/resources/chat/index";
import * as chrono from "chrono-node";
import { Restaurant, PeoplePerHour, Reservations } from "@/types/types";
import { baseURL } from "@/baseURL";

export const functions: CompletionCreateParams.Function[] = [
  {
    name: "extract_user_reservation",
    description:
      "Extracts date and number of people from the user message. Return a json object",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description: "date of the reservation",
        },
        people: {
          type: "number",
          description: "amount of people",
        },
      },
      required: [],
    },
  },
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
async function extract_user_reservation(date: string, people: number) {
  const dateuser = chrono.parseDate(date);
  return { date: dateuser, people };
}

async function get_restaurant_data() {
  const getRest = await fetch(`${baseURL}/api/resdata`);
  const data = await getRest.json();
  return data;
}

async function check_restaurant_availability(
  dateUser: string,
  peopleUser: number
) {
  const getRest = await fetch(`${baseURL}/api/resdata`);
  const restaurant = await getRest.json();
  const { date, people } = await extract_user_reservation(dateUser, peopleUser);

  const filterdate = restaurant.filter((item: Restaurant) =>
    item.reservations.some((ele: Reservations) => ele.date === date)
  );

  if (filterdate.length === 0) {
    return true;
  } else {
    return false;
  }

  //   if (
  //     !restaurant.workDays.includes(day.toLowerCase()) ||
  //     !restaurant.time.includes(time)
  //   ) {
  //     return false;
  //   }

  //   // Get maximum allowed people for that hour
  //   const maxPeople = restaurant.peoplePerHour.find(
  //     (entry: any) => entry.time === time
  //   ).amountChairs;

  //   // Calculate total number of people already reserved for that date and time
  //   const reservedPeople = restaurant.reservations
  //     .filter(
  //       (res: any) => res.date.startsWith(day.toLowerCase()) && res.time === time
  //     )
  //     .reduce((sum: number, res: Reservation) => sum + res.people, 0);

  //   // Check if there's enough space for the new reservation
  //   return maxPeople && maxPeople - reservedPeople >= people;
}

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
