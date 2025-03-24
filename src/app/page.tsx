"use client";

import PetsSwiper from "@/components/pets-swiper";
import { useGetNextPets } from "./get-next-pets";

const LoadingComponent = () => {
  return (
    <div className="absolute top-0 w-full z-50">
      <div className="mx-auto max-w-lg min-w-xs h-full p-4">
        <div className="loading loading-ring loading-xl text-white" />
      </div>
    </div>
  );
};

export default function Home() {
  const { isLoading, pets, nextPets } = useGetNextPets();

  return (
    <>
      {isLoading && <LoadingComponent />}
      <div className="absolute top-0 w-full h-[calc(100%-48px)]">
        <div className="mx-auto max-w-lg bg-gray-800 min-w-xs h-full">
          <PetsSwiper pets={pets} nextPets={nextPets} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
