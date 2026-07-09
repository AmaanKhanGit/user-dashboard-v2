import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import FormLayout from "../../../components/FormLayout";
import Button from "../../../components/Layout/Button";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../../components/AuthCard";
import { ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { sendForgotMail } from "../../../API/query/userQuery";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const forgotPasswordValidationSchema = object({
    email: string().email("Invalid email").required("Email is required"),
  });

  const { mutate } = useMutation({
    mutationKey: ["send-forgot-mail"],
    mutationFn: sendForgotMail,
    onSettled: (data, _, variables) => {
      // console.log(data);
      const { previewUrl } = data;
      window.location.href = previewUrl;
      // navigate(`/forgot-success/${variables.email}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <FormLayout>
      <AuthCard className="w-120">
        <div className="flex flex-col gap-3">
          <div className="" onClick={() => navigate(-1)}>
            <ArrowLeft className="cursor-pointer" />
          </div>
          <h2 className="text-xl font-medium">Forgot Password</h2>
          <p className="text-gray-400">
            Enter your email address for which account you want to reset your
            password.
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(val) => mutate({ email: val.email })}
          validationSchema={forgotPasswordValidationSchema}
        >
          <Form className="flex flex-col gap-3 bg-white">
            <div className="flex flex-col gap-4 py-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Field
                className="h-10 w-full rounded-[10px] border border-gray-400 px-4 py-2 text-sm text-gray-600 outline-purple-600"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                className="error text-sm text-red-500"
                component="div"
              />
            </div>

            <Button type="submit" className="hollowBtn">
              Reset password
            </Button>
          </Form>
        </Formik>
      </AuthCard>
    </FormLayout>
  );
};

export default ForgotPassword;
