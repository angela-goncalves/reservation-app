import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const restaurants = [
  {
    name: "picaron",
    id: 2,
    time: ["19:00", "20:00", "21:00", "22:00"],
    workDays: ["friday", "saturday", "sunday"],
    peoplePerHour: [
      { time: "19:00", amountChairs: 80 },
      { time: "20:00", amountChairs: 75 },
      { time: "21:00", amountChairs: 75 },
      { time: "22:00", amountChairs: 75 },
    ],
    reservations: [
      {
        id: 1,
        name: "sultanita",
        mail: "perenzeja@example.com",
        telf: 1130845667,
        time: "20:00",
        people: 4,
        date: "friday, august 26th",
        comments: "",
        spetialRequest: "",
        eat: ["pezca del dia", "aranita", "palta"],
        drink: ["zapata tinto wine", "water no soda"],
        bill: "30000",
      },
    ],
  },
];

export async function GET() {
  return NextResponse.json(restaurants);
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id } = req.body();
    return id;
  }
}
