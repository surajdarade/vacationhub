export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/trips", "/favourites", "/properties", "/reservations"],
};
