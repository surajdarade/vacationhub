"use client";

import { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface ReservationsClientProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const onCancel = useCallback((reservationId: string) => {
    setDeletingId(reservationId);

    axios
      .delete(`/api/reservations/${reservationId}`)
      .then(() => {
        toast.success("Guest Reservation Cancelled!");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setDeletingId(""));
  }, [router]);

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Current reservations at your properties!"
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
            actionLabel="Cancel Guest Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
