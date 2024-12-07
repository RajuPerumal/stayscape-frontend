import { ReviewList } from "@/src/components/hotel-reviews";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { useHotels } from "@/src/ctx/hotels";
import axios from "axios";
import {
  Car,
  MapPin,
  MenuIcon as Restaurant,
  Star,
  Waves,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAuth } from "../ctx/auth";

export default function HotelDetailsPage() {
  const { hotels } = useHotels();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [booking, setBooking] = useState(null);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (location.state) {
      setHotel(location.state.hotel);
      setIsLoading(false);
    } else {
      const currHotel = hotels.find((hotel) => hotel._id === params.id);
      if (currHotel) {
        setHotel(currHotel);
        setIsLoading(false);
      } else {
        axios
          .get(`${import.meta.env.VITE_API_URL}/hotels/${params.hotelId}`)
          .then((response) => {
            if (response.status === 200) {
              setHotel(response.data);
              setIsLoading(false);
            }
          })
          .catch((error) => {
            setIsError(true);
            setIsLoading(false);
          });
      }
    }
  }, [params.id, location.state, hotels]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        Something went wrong while fetching data
      </div>
    );
  }

  if (!hotel) {
    return <div className="container mx-auto px-4 py-8">Hotel not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-bold mr-2">
              {hotel.rating > 0 ? hotel.rating / hotel.reviews : "0"}
            </span>
            <span className="text-gray-600">({hotel.reviews} reviews)</span>
          </div>
          <div className="flex items-center mb-4 text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{hotel.location}</span>
          </div>
          <div className="relative w-full h-0 pb-[56.25%] mb-6">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="rounded-lg absolute top-0 left-0 w-full h-full"
            />
          </div>
          <p className="text-gray-700 mb-6">{hotel.description}</p>
          <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {hotel.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center">
                {amenity === "Free Wi-Fi" && <Wifi className="w-5 h-5 mr-2" />}
                {amenity === "Parking" && <Car className="w-5 h-5 mr-2" />}
                {amenity === "Swimming Pool" && (
                  <Waves className="w-5 h-5 mr-2" />
                )}
                {amenity === "Restaurant" && (
                  <Restaurant className="w-5 h-5 mr-2" />
                )}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price details card - will be full width on mobile and move above reviews */}
        <div className="md:col-start-3 md:row-start-1">
          <div className="bg-white shadow-lg rounded-lg p-6 md:sticky md:top-6">
            <h2 className="text-2xl font-semibold mb-4">Price Details</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Original Price</span>
              <span className="line-through">₹{hotel.oldPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Offer Price</span>
              <span className="font-semibold text-green-600">
                ₹{hotel.newPrice}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Taxes & Fees</span>
              <span>₹{hotel.taxes}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                ₹{hotel.newPrice + hotel.taxes}
              </span>
            </div>
            {hotel.coupleFriendly && (
              <Badge className="mb-4">Couple Friendly</Badge>
            )}
            {hotel.offer && (
              <p className="text-green-600 mb-4">{hotel.offer}</p>
            )}
            <Button
              className="w-full"
              onClick={() => {
                if (user) {
                  navigate(`/hotels/${hotel._id}/book`);
                } else {
                  navigate("/login");
                }
              }}
            >
              {!booking
                ? "Book Now"
                : `Booked for ${booking.checkIn} to ${booking.checkOut}`}
            </Button>
          </div>
        </div>

        {/* Reviews section - will be pushed below price details on mobile */}
        <div className="md:col-span-2">
          <Separator className="my-6" />
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <ReviewList hotelId={hotel._id} />
        </div>
      </div>
    </div>
  );
}
