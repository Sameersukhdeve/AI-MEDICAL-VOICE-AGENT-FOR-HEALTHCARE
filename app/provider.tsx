"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      createNewUser();
    }
  }, [user, isLoaded]);

  const createNewUser = async () => {
    try {
      const result = await axios.post("/api/users", {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
      });

      console.log(result.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return <>{children}</>;
}

export default Provider;