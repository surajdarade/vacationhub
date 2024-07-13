import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login to view trips" />
    );
  }

  

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return ( 
      <EmptyState
        title="No trips found!"
        subtitle="Looks liks you haven't reserved any trips!"
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;