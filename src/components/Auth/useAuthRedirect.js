// src/hooks/useAuthRedirect.js
import { useNavigate, useLocation } from "react-router-dom";

export default function useAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  // function to redirect to login
  const goToLogin = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  // function to redirect to signup
  const goToSignup = () => {
    navigate("/register", { state: { from: location.pathname } });
  };

  return { goToLogin, goToSignup };
}
