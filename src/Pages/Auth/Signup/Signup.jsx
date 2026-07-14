import { useContext } from "react";
import VerifyEmail from "../components/VerifyEmail";
import SignUpForm from "./SignUpForm";
import { AuthContext } from "../../../Provider/AuthProvider";

const Signup = () => {
  const {
    showVerificationScreen,
    userEmail,
    signUpFetchStatus,
    handleVerifyEmailSubmit,
    handleSignUpResend,
  } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-50 to-white px-4">
      {showVerificationScreen ? (
        <VerifyEmail
          onSubmit={handleVerifyEmailSubmit}
          onResend={handleSignUpResend}
          email={userEmail}
        />
      ) : (
        <SignUpForm fetchStatus={signUpFetchStatus} />
      )}
    </div>
  );
};

export default Signup;
