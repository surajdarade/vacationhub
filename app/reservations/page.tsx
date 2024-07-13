import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login to view reservations at your properties!"
      />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found!"
        subtitle="Looks liks you property isn't reserved yet!"
      />
    );
  }

  return <ReservationsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
