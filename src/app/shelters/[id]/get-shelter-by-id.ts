import { Shelter } from "@/app/types/shelter";
import React from "react";

export function useGetShelterById(id: string) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [shelter, setShelter] = React.useState<Shelter>();

  async function fetchById(url: string) {
    const data = await fetch(url).then((res) => res.json() as Promise<Shelter>);
    setShelter({ ...data, pets: (data as unknown as any).animals });
    setIsLoading(false);
  }

  React.useEffect(() => {
    if (id) {
      fetchById(`/api/shelters/${id}`);
    }
  }, [id]);

  return { shelter, isLoading };
}
