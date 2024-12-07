import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button } from "@/src/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../ctx/auth";
import axios from "axios";

export default function Signup() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        values
      );
      if (res.status === 201) {
        setUser(res.data);
        navigate("/hotels");
      } else {
        alert(res.data.message);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Sign up</h1>
          <p>Create your account by entering your data below</p>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
              }
              return errors;
            }}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <Field
                  type="text"
                  name="name"
                  required
                  className="w-full p-2 border bg-secondary"
                  placeholder="Name"
                />
                <Field
                  type="email"
                  name="email"
                  required
                  className="w-full p-2 border bg-secondary"
                  placeholder="Email"
                />
                <Field
                  type="tel"
                  name="phone"
                  className="w-full p-2 border bg-secondary"
                  placeholder="Phone"
                />
                <Field
                  type="date"
                  name="birthdate"
                  className="w-full p-2 border bg-secondary"
                  placeholder="Birthdate"
                />
                <Field
                  type="password"
                  name="password"
                  required
                  className="w-full p-2 border bg-secondary"
                  placeholder="Password"
                />
                <Field
                  type="password"
                  name="confirmPassword"
                  required
                  className="w-full p-2 border bg-secondary"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
                <Button type="submit" disabled={isSubmitting}>
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
