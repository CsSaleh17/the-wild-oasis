import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filteredValue = searchParams.get("status") || "all";
  const filter = {
    method: "eq",
    type: "status",
    filteredValue,
  };

  const sortedValue = searchParams.get("sortBy") || "startDate-desc";
  const [sortValue, direction] = sortedValue.split("-");
  const sortBy = {
    sortValue,
    direction,
  };

  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  const { data: { data: bookings, count } = {}, isPending } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  if (page < Math.ceil(count / PAGE_SIZE))
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  return { bookings, isPending, count };
}
