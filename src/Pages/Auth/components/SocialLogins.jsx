import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const SocialLogins = () => {
  // AuthContext: use the social login handler from context here.
  const { handleSocialLogin } = useContext(AuthContext);

  return (
    <div className="social-logins flex w-full flex-col gap-3">
      <button
        onClick={() => handleSocialLogin("oauth_google")}
        type="button"
        name="google"
        className="social-btn social-google flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
        aria-label="Sign in with Google"
      >
        <div className="flex w-50 items-center justify-start gap-4">
          <FaGoogle />
          <span>Continue with Google</span>
        </div>
      </button>

      <button
        onClick={() => handleSocialLogin("oauth_facebook")}
        type="button"
        name="facebook"
        className="social-btn social-facebook flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
        aria-label="Sign in with Facebook"
      >
        <div className="flex w-50 items-center justify-start gap-4">
          <FaFacebook />
          <span>Continue with Facebook</span>
        </div>
      </button>

      <button
        onClick={() => handleSocialLogin("oauth_github")}
        type="button"
        name="github"
        className="social-btn social-github flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
        aria-label="Sign in with GitHub"
      >
        <div className="flex w-50 items-center justify-start gap-4">
          <FaGithub />
          <span>Continue with GitHub</span>
        </div>
      </button>
    </div>
  );
};

export default SocialLogins;
