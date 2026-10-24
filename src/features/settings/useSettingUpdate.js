import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending } = useMutation({
    mutationFn: updateSettingAPI,
    onMutate: () => {
      const toastId = toast.loading("Updating settings");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["setting"] });
      toast.success("Setting updated", {
        id: context.toastId,
      });
    },
    onError: (error, _, context) => {
      toast.error("Something went wrong!", {
        id: context.toastId,
      });
    },
  });

  return { updateSetting, isPending };
}
