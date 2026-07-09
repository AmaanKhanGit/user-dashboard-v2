import FormLayout from "../../../components/FormLayout";
import AuthCard from "../../../components/AuthCard";
import Button from "../../../components/Layout/Button";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyEmailAddressSignup } from "../../../API/query/userQuery";
import toast from "react-hot-toast";
const RegietserSuccess = () => {
  const { token } = useParams();

  //& now we don't make any changes we'll just varify the token we're getting

  const { isSuccess } = useQuery({
    queryKey: ["varify-token", token],
    queryFn: () => verifyEmailAddressSignup({ token }),
    enabled: Boolean(token),
    onError: (error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  return (
    <FormLayout>
      {isSuccess && (
        <AuthCard className="w-125">
          <div className="flex flex-col items-center gap-3">
            <FaCheckCircle className="text-5xl text-green-800" />
            <h2 className="text-xl font-medium">Successfully Registered</h2>
            <p className="text-center text-gray-400">
              Hurray! You have successfully created your account. Enter the app
              to explore all it’s features.
            </p>
          </div>
          <Link to="/signin">
            <Button className="w-full"> Enter the App</Button>
          </Link>
        </AuthCard>
      )}
    </FormLayout>
  );
};

export default RegietserSuccess;
