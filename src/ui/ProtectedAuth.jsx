import { useNavigate } from "react-router-dom";
import { useGetUser } from "../features/authentication/useGetUser";

function ProtectedAuth({ children }) {
  const { user, isPending } = useGetUser();
  const navigate = useNavigate();

  if (user?.role !== "authenticated" && !isPending)
    return navigate("/login", { replace: true });

  if (user?.role === "authenticated") return children;
}

export default ProtectedAuth;
