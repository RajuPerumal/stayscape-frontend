import AppBar from "../components/app-bar";
import HotelProvider from "../ctx/hotels";

export default function HotelLayout() {
  return (
    <div className="flex flex-col px-2">
      <AppBar />
      <main className="flex flex-row">
        <HotelProvider />
      </main>
    </div>
  );
}
