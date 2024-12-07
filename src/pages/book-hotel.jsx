import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "../ctx/auth";
import {useEffect, useState} from "react";
import {MapPin} from "lucide-react";
import {isAfter} from "date-fns";

export default function BookingPage() {
  const [hotel, setHotel] = useState(null)
  const { hotelId } = useParams();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/hotels/${hotelId}`)
        .then((res) => {
          if (res.status === 200) {
            setHotel(res.data);
          }
        });
    } else if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, hotelId, isLoading]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/hotels/${hotelId}/book`,
        values
      );
      if (res.status === 201) {
        alert("Hotel Booked Successfully");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book Your Stay</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{hotel.name}</h2>
          <p>{hotel.location}</p>
          <p className="flex items-center"><MapPin className="mr-1 h-4 w-4" /> {hotel.city}</p>
          <p className="mb-4">Rating: {hotel.rating} / 5</p>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Price Details</h3>
            <p className="mb-2">Price per night: ₹{hotel.newPrice}</p>
            <p className="mb-2">Taxes and fees: ₹{hotel.taxes}</p>
            <p className="font-bold">Total: ₹{hotel.newPrice + hotel.taxes}</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                name: "",
                phone: "",
                checkIn: null,
                checkOut: null,
              }}
              validate={(values) => {
                const errors = {};
                const today = new Date();
                const checkInDate = new Date(values.checkIn);
                const checkOutDate = new Date(values.checkOut);
                if (isAfter(today, checkInDate)) {
                  errors.checkIn = "Check-in date must be in the future";
                }
                if (checkInDate > checkOutDate) {
                  errors.checkIn = "Check-in date must be before check-out date";
                }
                return errors;
              }}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Field
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      required
                      className="p-2 ml-2 bg-secondary"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Field
                      name="phone"
                      id="phone"
                      required
                      placeholder="Your Phone Number"
                      className="p-2 ml-2 bg-secondary"
                    />
                    {errors.phone && touched.phone && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <Field
                      name="checkIn"
                      type="date"
                      required
                      className="p-2 ml-2 bg-secondary"
                    />
                    <ErrorMessage
                      name="checkIn"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <Field
                      name="checkOut"
                      type="date"
                      required
                      className="p-2 ml-2 bg-secondary"
                    />
                    <ErrorMessage
                      name="checkOut"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
