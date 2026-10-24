import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo } from "../../services/users";
import toast from "react-hot-toast";

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();
  const { mutate: mutateUpdatedUser, isPending } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateUserInfo({ password, fullName, avatar }),
    onSuccess: () => {
      toast.success("User info has been successfuly updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutateUpdatedUser, isPending };
}
