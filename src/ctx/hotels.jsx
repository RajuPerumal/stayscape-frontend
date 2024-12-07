import axios from "axios";
import { useRef } from "react";
import { useEffect, useContext } from "react";
import { createContext, useState } from "react";
import { Outlet } from "react-router";

export const HotelContext = createContext({
  hotels: [],
  currAmenities: [],
  setHotels: () => {},
  setCurrAmenities: () => {},
  priceRange: [0, 10000],
  setPriceRange: () => {},
  stars: [],
  setStars: () => {},
  city: null,
  setCity: () => {},
  cities: [],
});

export const useHotels = () => {
  return useContext(HotelContext);
};

export default function HotelProvider() {
  const [hotels, setHotels] = useState([]);
  const [currAmenities, setCurrAmenities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [stars, setStars] = useState([]);
  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);
  const allHotels = useRef([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/hotels`).then((response) => {
      allHotels.current = response.data;
      const uniqueCities = new Set(response.data.map((hotel) => hotel.city));
      setCities(Array.from(uniqueCities));
      setHotels(response.data);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(currAmenities).length === 0) {
      setHotels(allHotels.current);
    } else {
      setHotels(
        allHotels.current.filter((hotel) =>
          currAmenities.every((amenity) => hotel.amenities.includes(amenity))
        )
      );
    }
  }, [currAmenities]);

  useEffect(() => {
    if (priceRange[0] === 0 && priceRange[1] === 10000) {
      setHotels(allHotels.current);
    } else {
      setHotels(
        allHotels.current.filter(
          (hotel) =>
            hotel.newPrice >= priceRange[0] && hotel.newPrice <= priceRange[1]
        )
      );
    }
  }, [priceRange]);

  useEffect(() => {
    if (stars.length === 0) {
      setHotels(allHotels.current);
    } else {
      setHotels(
        allHotels.current.filter(
          (hotel) =>
            stars.includes(
              hotel.reviews > 0 ? Math.round(hotel.rating / hotel.reviews) : 0
            )
        )
      );
    }
  }, [stars]);

  useEffect(() => {
    if (city === null) {
      setHotels(allHotels.current);
    } else {
      setHotels(
        allHotels.current.filter((hotel) => hotel.city === city)
      );
    }
  }, [city]);

  return (
    <HotelContext.Provider
      value={{
        hotels,
        currAmenities,
        setHotels,
        setCurrAmenities,
        priceRange,
        setPriceRange,
        stars,
        setStars,
        city,
        setCity,
        cities
      }}
    >
      <Outlet />
    </HotelContext.Provider>
  );
}
