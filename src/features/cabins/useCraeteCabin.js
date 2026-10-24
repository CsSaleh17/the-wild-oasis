import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/cabinsApi";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: mutateCreate, isPending } = useMutation({
    mutationFn: createCabin,
    onMutate: () => {
      const toastId = toast.loading("Creating the cabin");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin has been created", {
        id: context.toastId,
      });
    },
    onError: (error, _, context) => {
      toast.error(`Something went wrong!`, {
        id: context.toastId,
      });
    },
  });

  return { mutateCreate, isPending };
}
