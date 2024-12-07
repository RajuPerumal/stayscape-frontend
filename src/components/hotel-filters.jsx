import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Slider } from "@/src/components/ui/slider";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useHotels } from "../ctx/hotels";

export function HotelFilters() {
  const [isCitiesOpen, setIsCitiesOpen] = useState(false);
  const {
    priceRange,
    setPriceRange,
    currAmenities,
    setCurrAmenities,
    stars,
    setStars,
    city,
    setCity,
    cities
  } = useHotels();

  return (
    <div className="space-y-4">
      <Popover open={isCitiesOpen} onOpenChange={setIsCitiesOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isCitiesOpen}
            className="w-full justify-between border-primary"
          >
            {city ?? "Select City"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search city..." />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {cities.map((currCity) => <CommandItem
                  key={currCity}
                  value={currCity}
                  onSelect={() => {
                    setCity(currCity === city ? null : currCity);
                    setIsCitiesOpen(false);
                  }}
                >
                  {currCity}
                </CommandItem>)}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <Slider
          min={0}
          max={10000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Star Rating</h3>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={`star-${rating}`}
              checked={stars.includes(rating)}
              onCheckedChange={(checked) =>
                setStars(
                  checked
                    ? [...stars, rating]
                    : stars.filter((s) => s !== rating)
                )
              }
            />
            <Label htmlFor={`star-${rating}`}>{rating} Stars</Label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Amenities</h3>
        {["Wifi", "Parking", "Pool", "Gym", "Restaurant"].map((amenity) => (
          <div key={amenity} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={`amenity-${amenity}`}
              checked={currAmenities.includes(amenity)}
              onCheckedChange={(checked) =>
                setCurrAmenities(
                  checked
                    ? [...currAmenities, amenity]
                    : currAmenities.filter((a) => a !== amenity)
                )
              }
            />
            <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
