import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/users";

export function useGetUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { user, isPending };
}
