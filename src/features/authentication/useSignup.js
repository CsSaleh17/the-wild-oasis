import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/users";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupAPI({ email, password, fullName }),
    onSuccess: () => {
      toast.success("User hase been successfully signed up");
    },

    onError: (err) => toast.error(err.message),
  });

  return { signup, isPending };
}
