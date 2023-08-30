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
          description: "day, month and time of the reservation",
        },
        timeUser: {
          type: "string",
          description: "time of the reservation",
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
  timeUser: string,
  peopleUser: number
) {
  const restaurant = await get_restaurant_data();

  // transform dateUser (day and month adding current year) into date
  const date = chrono.parseDate(dateUser);
  const year = new Date().getFullYear();
  const month = date.getMonth() + 1;
  const dayNo = date.getDate();

  const dateUserInput = chrono
    .parseDate(`reservation on ${year}-${month}-${dayNo} at ${timeUser}`)
    .toString();

  const datestring = dateUserInput.split(" ");
  const weekday = datestring[0];

  const mapRestaurant = restaurant.map((item: Restaurant) => {
    // the restaurant is working that day?
    if (!item.workDays.includes(weekday)) {
      return `the restaurant does not work that day`;
    }

    // the restaurant is working at that time?
    const peoplePerHour = item.peoplePerHour.find((slot: PeoplePerHour) => {
      return slot.time === timeUser;
    });

    if (!peoplePerHour) {
      return `the restaurant does not work at that hour`;
    }

    // filter all reservations with same date
    const currentReservations = item.reservations.filter(
      (res: Reservations) => {
        const resvDate = chrono.parseDate(res.date.toString());

        // the currentResevations have the same date that the users asking?
        const year = new Date().getFullYear();
        const month = resvDate.getMonth() + 1;
        const dayNo = resvDate.getDate();
        const dateResvSaved = chrono
          .parseDate(
            `reservation saved on ${year}-${month}-${dayNo} at ${timeUser}`
          )
          .toString();

        return dateResvSaved === dateUserInput;
      }
    );

    const totalPeople = currentReservations.reduce(
      (sum: number, res: Reservations) => sum + res.people,
      0
    );

    if (totalPeople + peopleUser > peoplePerHour.amountChairs) {
      return `there is no availability`;
    } else {
      return `there is availability`;
    }
  });

  return mapRestaurant;
}

export async function runFunction(name: string, args: any) {
  switch (name) {
    // case "suggest_alternative_times":
    //   return await suggest_alternative_times(
    //     args["dateUser"],
    //     args["peopleUser"]
    //   );
    case "get_restaurant_data":
      return await get_restaurant_data();
    case "check_restaurant_availability":
      return await check_restaurant_availability(
        args["dateUser"],
        args["timeUser"],
        args["peopleUser"]
      );
    default:
      return null;
  }
}
