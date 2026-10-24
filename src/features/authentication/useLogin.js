import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/users";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
      toast.success("Successfully logedin");
    },
    onError: (error) => {
      toast.error(error.message);
      navigate("/login");
    },
  });

  return { login, isPending };
}
