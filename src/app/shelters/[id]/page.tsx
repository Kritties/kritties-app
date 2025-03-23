"use client";
import { usePathname, useRouter } from "next/navigation";
import { useGetShelterById } from "./get-shelter-by-id";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop() as string;

  const shelter = useGetShelterById(id);

  const handlePetClick = (petId: string) => {
    router.push(`/pets/${petId}`);
  };

  if (!shelter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center space-x-4  p-4">
        <img
          className="w-[60px] h-[60px]"
          src={shelter.imageUrl}
          alt={shelter.name}
        />
        <h1>{shelter.name}</h1>
      </div>
      <p>{shelter.description}</p>
      <h3 className="mt-8 mb-4 text-center">Pets</h3>

      <div className="flex w-full flex-wrap gap-4 bg-[#9FD8F6] h-full wfull justify-center items-center p-2 pt-4 pb-4">
        {shelter.pets.map((pet) => (
          <button key={pet.id} className="flex flex-col items-center" onClick={() => handlePetClick(pet.id)}>
            <img
              className="w-[120px] h-[120px]"
              src={pet.imageUrl}
              alt={pet.name}
            />
            {pet.name}
          </button>
        ))}
      </div>
    </div>
  );
}
