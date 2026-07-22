import { useContext } from "react";
import VerifyEmail from "../components/VerifyEmail";
import SignUpForm from "./SignUpForm";
import { AuthContext } from "../../../Provider/AuthProvider";
import FormLayout from "../../../components/FormLayout";

const Signup = () => {
  const {
    showVerificationScreen,
    userEmail,
    signUpFetchStatus,
    handleVerifyEmailSubmit,
    handleSignUpResend,
  } = useContext(AuthContext);

  return (
    <FormLayout>
      {showVerificationScreen ? (
        <VerifyEmail
          onSubmit={handleVerifyEmailSubmit}
          onResend={handleSignUpResend}
          email={userEmail}
        />
      ) : (
        <SignUpForm fetchStatus={signUpFetchStatus} />
      )}
    </FormLayout>
  );
};

export default Signup;
