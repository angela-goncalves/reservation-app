import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const restaurant = [
  {
    name: "picaron",
    id: 2,
    workDays: ["Fri", "Sat", "Sun"],
    category: "indie",
    location: { address: "123 Street", city: "XYZ", zipcode: "00000" },
    contact: { email: "info@example.com", phone: "123-456-7890" },
    peoplePerHour: [
      { time: "20:00", amountChairs: 20 },
      { time: "20:30", amountChairs: 18 },
      { time: "21:00", amountChairs: 15 },
      { time: "21:30", amountChairs: 18 },
      { time: "22:00", amountChairs: 15 },
    ],
    reviews: [
      { rating: 5, comment: "Great food!" },
      { rating: 3, comment: "Okay-ish" },
    ],
    reservations: [
      {
        id: 1,
        name: "sultanita",
        mail: "perenzeja@example.com",
        phone: 1130845667,
        people: 4,
        date: "2023-09-29, 20:00:00",
        comments: "",
        specialRequest: "",
        eat: ["pezca del dia", "aranita", "palta"],
        drink: ["zapata tinto wine", "water no soda"],
        bill: "30000",
        status: "confirmed",
        paymentMethod: "Credit Card",
      },
      {
        id: 2,
        name: "fulanita",
        mail: "fulanita@example.com",
        phone: 1130845667,
        people: 2,
        date: "2023-09-29, 20:00:00",
        comments: "",
        specialRequest: "",
        eat: ["pezca del dia", "aranita", "palta"],
        drink: ["zapata tinto wine", "water no soda"],
        bill: "30000",
        status: "confirmed",
        paymentMethod: "Credit Card",
      },
      {
        id: 3,
        name: "clarita",
        mail: "clarita@example.com",
        phone: 1112345678,
        people: 3,
        date: "2023-09-29, 20:00:00",
        specialRequest: "",
        eat: ["pezca del dia", "aranita", "palta"],
        drink: ["zapata tinto wine", "water no soda"],
        bill: "30000",
        status: "confirmed",
        paymentMethod: "Credit Card",
      },
      {
        id: 4,
        name: "sebastian",
        mail: "sebastian@example.com",
        phone: 1130845667,
        people: 6,
        date: "2023-09-29, 20:00:00",
        comments: "",
        specialRequest: "",
        eat: ["pezca del dia", "aranita", "palta"],
        drink: ["zapata tinto wine", "water no soda"],
        bill: "30000",
        status: "pending",
        paymentMethod: "Credit Card",
      },
      {
        id: 5,
        name: "leonardo",
        mail: "leonardo@example.com",
        phone: 1130845667,
        people: 5,
        date: "2023-09-29, 20:00:00",
        comments: "",
        specialRequest: "",
        eat: ["pezca del dia", "aranita", "palta"],
        drink: ["zapata tinto wine", "water no soda"],
        bill: "30000",
        status: "pending",
        paymentMethod: "Credit Card",
      },
      {
        id: 6,
        name: "jorge",
        mail: "jorge@example.com",
        phone: 1130845667,
        people: 5,
        date: "2023-09-30, 19:00:00",
        comments: "",
        specialRequest: "",
        eat: ["pezca del dia", "aranita", "palta"],
        drink: ["zapata tinto wine", "water no soda"],
        bill: "30000",
        status: "pending",
        paymentMethod: "Credit Card",
      },
      {
        id: 16,
        name: "carlos",
        mail: "carlos@example.com",
        phone: 1130845667,
        people: 2,
        date: "2023-09-30, 20:00:00",
        comments: "",
        specialRequest: "",
        eat: ["pezca del dia", "aranita", "palta"],
        drink: ["zapata tinto wine", "water no soda"],
        bill: "30000",
        status: "pending",
        paymentMethod: "Credit Card",
      },
    ],
  },
];

export async function GET() {
  return NextResponse.json(restaurant);
}
