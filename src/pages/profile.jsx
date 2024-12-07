import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useAuth } from "@/src/ctx/auth";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import AppBar from "../components/app-bar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";

export default function ProfilePage() {
  const { user, isLoading, saveUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar />
      <main className="flex flex-col items-center justify-center m-4">
        <Card className="md:w-[30vw]">
          <CardHeader>
            <h1 className="text-2xl font-bold mx-auto">Profile</h1>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                name: user.name,
                email: user.email,
                phone: user.phone,
                birthdate: user.birthdate,
              }}
              onSubmit={(values, { setSubmitting }) => {
                saveUser(values);
                setSubmitting(false);
                alert("Profile updated successfully");
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-4 max-w-md">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Field
                      name="name"
                      as={Input}
                      id="name"
                      placeholder="Your Name"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Field
                      name="email"
                      as={Input}
                      id="email"
                      type="email"
                      placeholder="Your Email"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Field
                      name="phone"
                      as={Input}
                      id="phone"
                      placeholder="Your Phone Number"
                    />
                    {errors.phone && touched.phone && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="birthdate">Birth Date</Label>
                    <Field
                      name="birthdate"
                      as={Input}
                      id="birthdate"
                      type="date"
                      placeholder="Your Birth Date"
                    />
                    {errors.birthdate && touched.birthdate && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.birthdate}
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Updating..." : "Update Profile"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={logout}>
              Logout
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
