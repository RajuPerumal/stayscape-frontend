import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Heart, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router";

export function HotelCard({ hotel }) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-0">
        <div className="relative h-48">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="object-cover w-full h-full"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:text-red-500"
          >
            <Heart className="h-6 w-6" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{hotel.name}</CardTitle>
        <div className="flex items-center mb-2">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-bold mr-2">
            {hotel.rating > 0 ? hotel.rating / hotel.reviews : "0"}
          </span>
          <span className="text-sm text-gray-600">
            ({hotel.reviews} reviews)
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{hotel.location}</p>
        <div className="flex items-center mb-2">
          <MapPin className="h-5 w-5 text-gray-600 mr-1" />
          <span className="text-sm text-gray-600">{hotel.city}</span>
        </div>
        <p className="text-xs text-blue-600 mb-2 flex items-center">
          <span className="font-bold mr-1">Amenities: </span>
          {new Intl.ListFormat("en", { style: "long" }).format(hotel.amenities)}
        </p>
        {hotel.coupleFriendly && (
          <Badge variant="secondary" className="mb-2">
            Couple Friendly
          </Badge>
        )}
        {hotel.offer && (
          <p className="text-sm text-green-600 mb-2">{hotel.offer}</p>
        )}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-sm line-through text-gray-400">
              ₹{hotel.oldPrice}
            </span>
            <span className="text-lg font-bold ml-2">₹{hotel.newPrice}</span>
          </div>
          <span className="text-sm text-gray-600">+₹{hotel.taxes} taxes</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => navigate(`/hotels/${hotel._id}`, { state: { hotel } })}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
