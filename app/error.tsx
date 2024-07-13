"use client";

import { useEffect } from "react";

import EmptyState from "./components/EmptyState";

interface EmptyStateProps {
  error: Error;
}

const ErrorState: React.FC<EmptyStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Oops :-(" subtitle="Something went wrong!" />;
};

export default ErrorState;
