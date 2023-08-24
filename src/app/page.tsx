import Chat from "@/components/chat";
import { baseURL } from "@/baseURL";

export default async function Home() {
  const getRest = await fetch(`${baseURL}/api/resdata`);
  const restaurant = await getRest.json();
  return <Chat rest={restaurant} />;
}
