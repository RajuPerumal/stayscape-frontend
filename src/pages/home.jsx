import { CalendarIcon, MapPinIcon, StarIcon } from "lucide-react";
import { Link } from "react-router";
import AppBar from "../components/app-bar";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Book Your Dream Vacation as <span className="underline">StayScape</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Find and book the perfect hotel for your next adventure with
                  ease. Discover amazing deals and unforgettable experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <CalendarIcon className="h-8 w-8 text-purple-500" />
                <h3 className="text-xl font-bold">Easy Booking</h3>
                <p className="text-zinc-500 text-center">
                  Book your stay in just a few clicks with our user-friendly
                  interface.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <MapPinIcon className="h-8 w-8 text-purple-500" />
                <h3 className="text-xl font-bold">Wide Selection</h3>
                <p className="text-zinc-500 text-center">
                  Choose from thousands of hotels worldwide, from budget to
                  luxury.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <StarIcon className="h-8 w-8 text-purple-500" />
                <h3 className="text-xl font-bold">Best Prices</h3>
                <p className="text-zinc-500 text-center">
                  Get the best deals and exclusive discounts on your bookings.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Customers Say
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 border p-4 rounded-lg">
                <p className="text-zinc-500 text-center italic">
                  &quot;Amazing app! Found the perfect hotel for my vacation in
                  minutes.&quot;
                </p>
                <p className="font-semibold">- Sarah J.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 border p-4 rounded-lg">
                <p className="text-zinc-500 text-center italic">
                  &quot;Great deals and a super easy booking process. Highly
                  recommended!&quot;
                </p>
                <p className="font-semibold">- Mike T.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 border p-4 rounded-lg">
                <p className="text-zinc-500 text-center italic">
                  &quot;The best hotel booking app I&apos;ve ever used. Saved me
                  so much time and money!&quot;
                </p>
                <p className="font-semibold">- Emily R.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Start Your Journey?
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start exploring amazing hotels around the world.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link
                  className="bg-purple-500 text-white hover:bg-purple-700 px-12 py-3 rounded-md font-semibold"
                  to="/hotels"
                >
                  Browse hotels
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-zinc-500">
          © 2024 StayScape. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

export function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
