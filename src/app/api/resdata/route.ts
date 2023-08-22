import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const restaurant = [
  {
    name: "Ru's Kitchen",
    id: 1,
    time: ["19:00", "20:00", "21:00", "22:00"],
    date: "friday, saturday and sunday",
    peoplePerHour: 30,
    reservation: [
      {
        id: 487,
        name: "sultanita",
        mail: "perenzeja@example.com",
        telf: 1130845667,
        time: "20:00",
        people: 4,
        date: "friday, august 25th",
        comments: "",
        spetialRequest: "",
        eat: ["lumpia", "pollo picante", "carne picante"],
        drink: ["zapata tinto wine", "water no soda"],
        bill: "",
      },
    ],
  },
  {
    name: "picaron",
    id: 2,
    time: ["19:00", "20:00", "21:00", "22:00"],
    date: "friday, saturday and sunday",
    peoplePerHour: 30,
    reservation: [
      {
        id: 487,
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
  return NextResponse.json(restaurant);
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id } = req.body();
    return id;
  }
}
