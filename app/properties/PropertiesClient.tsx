"use client";

import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/Container";

interface PropertiesClientProps {
  currentUser?: SafeUser | null;
  listings?: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    (listingId: string) => {
      setDeletingId(listingId);
      axios
        .delete(`/api/listings/${listingId}`)
        .then(() => {
          toast.success("Listing Deleted!");
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
        title="Properties"
        subtitle="List of your properties!"
      />
      <div className="mt-10 grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            onAction={onCancel}
            actionId={listing.id}
            disabled={deletingId === listing.id}
            actionLabel="Delete Listing"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
