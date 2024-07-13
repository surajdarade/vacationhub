"use client";

import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/Container";

interface TripsClientProps {
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
}

const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    (reservationId: string) => {
      setDeletingId(reservationId);
      axios
        .delete(`/api/reservations/${reservationId}`)
        .then(() => {
          toast.success("Reservation Cancelled!");
          router.refresh();
        })
        .catch((error) => toast.error(error?.message))
        .finally(() => setDeletingId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="When you've been going and where you're going"
      />
      <div className="mt-10 grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
