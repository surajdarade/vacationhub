import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavouritesClientProps {
    currentUser: SafeUser | null;
    listings?: SafeListing[];
}

const FavouritesClient: React.FC<FavouritesClientProps> = ({listings, currentUser}) => {
    return ( <Container>
        <Heading
          title="Favourites"
          subtitle="Favourites marked by you!"
        />
        <div className="mt-10 grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings?.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container> );
}
 
export default FavouritesClient;