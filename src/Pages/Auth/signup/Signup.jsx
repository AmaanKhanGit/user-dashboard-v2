import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string, ref } from "yup";
import FormLayout from "../../../components/FormLayout";
import AuthCard from "../../../components/AuthCard";
import Button from "../../../components/Layout/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../../API/query/userQuery";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const signUpValidationSchema = object({
    firstName: string().required("Name is required"),
    lastName: string().required("Last is required"),
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    repeatPassword: string()
      .oneOf([ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    mutationKey: ["signup key"],
    onSuccess: (_, variables) => {
      navigate(`/register-email-varify/${variables.email}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <FormLayout>
      <AuthCard className="w-130">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
          }}
          onSubmit={(val) => {
            mutate({
              firstName: val.firstName,
              lastName: val.lastName,
              email: val.email,
              password: val.password,
            });
          }}
          validationSchema={signUpValidationSchema}
        >
          <Form className="flex flex-col gap-2 bg-white">
            <div className="flex gap-3 max-sm:flex-col">
              <div className="flex flex-1 flex-col gap-3 px-3 py-2">
                <label className="text-sm font-medium" htmlFor="firstName">
                  First Name
                </label>
                <Field
                  className="h-10 w-full rounded-[10px] border border-gray-400 px-4 py-2 text-sm text-gray-600 outline-purple-600"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                />
                <ErrorMessage
                  name="firstName"
                  className="error text-sm text-red-500"
                  component="div"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 px-3 py-2">
                <label className="text-sm font-medium" htmlFor="lastName">
                  Last Name
                </label>
                <Field
                  className="h-10 w-full rounded-[10px] border border-gray-400 px-4 py-2 text-sm text-gray-600 outline-purple-600"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                />
                <ErrorMessage
                  name="lastName"
                  className="error text-sm text-red-500"
                  component="div"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 px-3 py-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Field
                className="h-10 w-full rounded-[10px] border border-gray-400 px-4 py-2 text-sm text-gray-600 outline-purple-600"
                id="email"
                name="email"
                placeholder="johndoe@example.com"
              />
              <ErrorMessage
                name="email"
                className="error text-sm text-red-500"
                component="div"
              />
            </div>
            <div className="flex flex-col gap-3 px-3 py-2">
              <label className="text-sm font-medium" htmlFor="password">
                Create Password
              </label>
              <Field
                className="h-10 w-full rounded-[10px] border border-gray-400 px-4 py-2 text-sm text-gray-600 outline-purple-600"
                id="password"
                name="password"
                type="password"
              />
              <ErrorMessage
                name="password"
                className="error text-sm text-red-500"
                component="div"
              />
            </div>
            <div className="flex flex-col gap-2 px-3 py-2">
              <label className="text-sm font-medium" htmlFor="repeatPassword">
                Repeat Password
              </label>
              <Field
                className="h-10 w-full rounded-[10px] border border-gray-400 px-4 py-2 text-sm text-gray-600 outline-purple-600"
                id="repeatPassword"
                name="repeatPassword"
                type="password"
              />
              <ErrorMessage
                name="repeatPassword"
                className="error text-sm text-red-500"
                component="div"
              />
            </div>
            <Button type="submit">Create Account</Button>
            <p className="textgray-300 self-center text-sm text-gray-600">
              Already have an account?
              <Link to="/signin" className="ml-1 text-purple-600">
                Login
              </Link>
            </p>
          </Form>
        </Formik>
      </AuthCard>
    </FormLayout>
  );
};
export default Signup;
