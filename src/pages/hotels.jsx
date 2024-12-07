import { useState } from "react";
import { HotelCard } from "@/src/components/hotel-card";
import { HotelFilters } from "@/src/components/hotel-filters";
import { useHotels } from "@/src/ctx/hotels";
import { Sheet, SheetTrigger, SheetContent } from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { FilterIcon } from "lucide-react";

export default function Hotels() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { hotels } = useHotels();

  return (
    <div className="w-screen flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block md:w-[20%] overflow-hidden p-4">
        <HotelFilters />
      </div>
      <div className="md:hidden">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <HotelFilters />
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:w-[80%] h-[calc(100dvh-56px)] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
