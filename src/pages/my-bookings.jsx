import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, PhoneIcon, BuildingIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import axios from "axios";
import {CircleUserRound} from "lucide-react";

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch the bookings from an API here
    axios
      .get(`${import.meta.env.VITE_API_URL}/hotels/bookings`)
      .then((res) => {
        if (res.status === 200) {
          setBookings(res.data);
        }
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Card key={booking._id}>
              <CardHeader className="p-0">
                <img
                  src={booking.hotel.image}
                  alt={booking.hotel.name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
                <CardTitle className="ml-6">{booking.hotel.name}</CardTitle>
                <CardDescription className="ml-6">Booking ID: {booking._id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center">
                    <CircleUserRound className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm">Booked for: {booking.name}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm">
                      {format(new Date(booking.checkIn), "PPP")} -{" "}
                      {format(new Date(booking.checkOut), "PPP")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm">{booking.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <BuildingIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm">Hotel location: {booking.hotel.location}</span>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {new Date(booking.checkIn) > new Date()
                      ? "Upcoming"
                      : "Past"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
