import styled from "styled-components";
import Stats from "./Stats";
import { useSearchParams } from "react-router-dom";
import { useGetBookingAfterDate } from "./useGetBookingsAfterDate";
import Spinner from "../../ui/Spinner";
import { subDays } from "date-fns";
import { useMemo } from "react";
import { useCabins } from "../cabins/useCabins";
import TodayActivity from "../check-in-out/TodayActivity";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : searchParams.get("last");
  const { cabins } = useCabins();

  const date = useMemo(
    () => subDays(new Date(), numDays).toISOString(),
    [numDays],
  );

  const { bookingAfterDate, isPending } = useGetBookingAfterDate(date);
  if (isPending) return <Spinner />;

  const confirmedStays = bookingAfterDate.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookingAfterDate}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookingAfterDate} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
