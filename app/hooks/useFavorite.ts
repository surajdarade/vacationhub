import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUserFavorites {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorites) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) loginModal.onOpen();
      try {
        let request;

        if (hasFavourited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, hasFavourited, listingId, loginModal, router]
  );

  return {
    hasFavourited,
    toggleFavorite,
  };
};

export default useFavorite;