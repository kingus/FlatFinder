import axios from "axios";

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("access");
};
