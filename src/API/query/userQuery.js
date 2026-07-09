import Axios from "../Axios";

const USER_URL = "/user";

export const signinUser = async ({ password, email }) => {
  try {
    const { data } = await Axios.post(`${USER_URL}/signin`, {
      password,
      email,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Sign-in failed");
  }
};

export const signupUser = async ({ password, email, firstName, lastName }) => {
  try {
    const { data } = await Axios.post(`${USER_URL}/signup`, {
      password,
      email,
      firstName,
      lastName,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Sign-up failed");
  }
};

export const sendVarificationMail = async ({ email }) => {
  try {
    const { data } = await Axios.post(`${USER_URL}/send-verification-mail`, {
      email,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Sign-up failed");
  }
};

export const verifyEmailAddressSignup = async ({ token }) => {
  try {
    const { data } = await Axios.post(`${USER_URL}/verify-user-mail`, {
      token,
    });
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Email verification failed",
    );
  }
};

export const sendForgotMail = async ({ email }) => {
  try {
    const { data } = await Axios.post(`${USER_URL}/forgot-password`, {
      email,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Forgot failed");
  }
};

export const verifyForgotToken = async ({ token, password }) => {
  try {
    const { data } = await Axios.post(`${USER_URL}/verify-forgot-mail`, {
      token,
      password,
    });
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Email verification failed",
    );
  }
};
