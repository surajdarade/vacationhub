import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import EmptyState from "../components/EmptyState";
import FavouritesClient from "./FavouritesClient";

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login to view your favourites!"
      />
    );
  }

  const listings = await getFavouriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favourites found!"
        subtitle="You haven't added anything yet!"
      />
    );
  }

  return (
    <FavouritesClient listings={listings} currentUser={currentUser} />
  );
};

export default FavouritesPage;
