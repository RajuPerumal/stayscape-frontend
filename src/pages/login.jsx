import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/src/components/ui/card";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router";
import {useAuth} from "../ctx/auth";

export default function Login() {
  const navigate = useNavigate();
  const {setUser} = useAuth()

  const onSubmit = async (values, { setSubmitting }) => {
    try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      values
    );
    if (res.status === 200) {
      navigate("/hotels");
      setUser(res.data)
    } else {
      alert(res.data.message);
      setSubmitting(false);
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data);
    setSubmitting(false);
  }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Login</h1>
          <p>Login to your account using email and password</p>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <Field
                  type="email"
                  name="email"
                  required
                  className="w-full p-2 border bg-secondary"
                  placeholder="Email"
                />
                <Field
                  type="password"
                  name="password"
                  required
                  className="w-full p-2 border bg-secondary"
                  placeholder="Password"
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
