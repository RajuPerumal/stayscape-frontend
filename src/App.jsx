import axios from "axios";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import AuthProvider from "./ctx/auth";
import HotelLayout from "./layouts/hotel-layout";
import HomePage from "./pages/home";
import Hotels from "./pages/hotels";
import ViewHotel from "./pages/view-hotel";

const LoginPage = lazy(() => import("./pages/login"));
const SignupPage = lazy(() => import("./pages/signup"));
const BookHotel = lazy(() => import("./pages/book-hotel"));
const MyBookings = lazy(() => import("./pages/my-bookings"));
const Profile = lazy(() => import("./pages/profile"));

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="signup" element={<SignupPage />}></Route>
          <Route path="profile" element={<Profile />} />
          <Route path="hotels" element={<HotelLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":hotelId" element={<ViewHotel />} />
            <Route path=":hotelId/book" element={<BookHotel />} />
            <Route path="my-bookings" element={<MyBookings />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
