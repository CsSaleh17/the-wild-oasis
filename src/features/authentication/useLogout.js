import { useMutation } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/users";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      navigate("/login");
      toast.success("Loged out successfully");
    },
    onError: () => {
      toast.error("Something went wrong while logging out");
    },
  });

  return { logout, isPending };
}
