import { Outlet } from "react-router-dom";
import { projectAuth } from "../services/firebase/config";

const PrivateRoutes = () => {

  if (!projectAuth.currentUser) {
    // Redirect to login page
    window.location.href = "/login";
  }

  return <Outlet />;
};

export default PrivateRoutes;