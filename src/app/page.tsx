import Chat from "@/components/chat";

export default async function Home() {
  const getRest = await fetch("http://localhost:3000/api/resdata");
  const restaurant = await getRest.json();
  return <Chat rest={restaurant} />;
}
