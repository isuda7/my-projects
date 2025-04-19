import React from "react";

const AppContext = React.createContext({
  languageId: "en",
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phoneNumber: "",
  avatar: null,
  country: "",
  isInPublicDirectory: false,
  biography: "",
  teamId: null,
  onLanguageChange: () => {},
  onProfileChange: () => {},
});

export default AppContext;
