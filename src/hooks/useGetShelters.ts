import { GetShelterByIdType } from "@/backend/services/shelters";
import React from "react";

export function useGetShelters() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [shelters, setShelters] = React.useState<GetShelterByIdType[]>([]);

  async function fetchShelters() {
    const data = await fetch("/api/shelters").then((res) => res.json() as Promise<GetShelterByIdType[]>);
    setShelters(data);
    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchShelters();
  }, []);

  return { shelters, isLoading };
} 