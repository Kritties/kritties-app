import { GetShelterByIdType } from "@/backend/services/shelters";
import React from "react";

export function useGetShelterById(id: string) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [shelter, setShelter] = React.useState<GetShelterByIdType>();

  async function fetchById(url: string) {
    const data = await fetch(url).then((res) => res.json() as Promise<GetShelterByIdType>);
    setShelter(data);
    setIsLoading(false);
  }

  React.useEffect(() => {
    if (id) {
      fetchById(`/api/shelters/${id}`);
    }
  }, [id]);

  return { shelter, isLoading };
} 