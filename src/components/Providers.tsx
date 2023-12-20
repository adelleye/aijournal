"use client";
// Importing necessary libraries and components
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Defining the type of props that the Providers component will receive
type Props = {
  children: React.ReactNode;
};

// Creating a new instance of QueryClient
const queryClient = new QueryClient();

// Defining the Providers component
const Providers = ({ children }: Props) => {
  // The component returns a QueryClientProvider that wraps around the children components
  // This allows the children components to have access to the QueryClient instance
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Exporting the Providers component so it can be used in other parts of the application
export default Providers;
