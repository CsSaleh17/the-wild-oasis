import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useGetBookingAfterDate(date) {
  const { data: bookingAfterDate, isPending } = useQuery({
    queryKey: ["bookingsDate", date],
    queryFn: () => getBookingsAfterDate(date),
  });

  return { bookingAfterDate, isPending };
}
