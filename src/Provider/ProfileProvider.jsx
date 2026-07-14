import { createContext } from "react";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const editPersonalInfo = (data) => {
    const {} = data;
  };

  const editAbout = (data) => {
    const {} = data;
  };

  const editSkills = (data) => {
    const {} = data;
  };

  return (
    <ProfileContext.Provider
      value={{ editAbout, editPersonalInfo, editSkills }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
