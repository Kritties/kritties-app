"use client";
import { useGetPetById } from "./getPetByid";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const id = pathname.split("/").pop() as string;

  const pet = useGetPetById(id);

  if (!pet) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto">
      <div className="flex items-center space-x-4  p-4">
        <img
          className="w-[60px] h-[60px]"
          src={pet.imageUrl}
          alt={pet.name}
        />
        <h1>{pet.name}</h1>
      </div>
      <p>{pet.description}</p>
      <h3 className="mt-8">{pet.name}</h3>
    </div>
  );
}
