import FormLayout from "../../../components/FormLayout";
import AuthCard from "../../../components/AuthCard";
import Button from "../../../components/Layout/Button";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const ResetSuccess = () => {
  return (
    <FormLayout>
      <AuthCard className="w-125">
        <div className="flex flex-col items-center gap-3">
          <FaCheckCircle className="text-5xl text-green-800" />
          <h2 className="text-xl font-medium">Password reset done</h2>
          <p className="text-center text-gray-400">
            Now you can access your account
          </p>
        </div>
        <Link to="/signin">
          <Button className="w-full"> Sign In</Button>
        </Link>
      </AuthCard>
    </FormLayout>
  );
};

export default ResetSuccess;
