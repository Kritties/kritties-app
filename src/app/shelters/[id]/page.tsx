"use client";
import { useGetShelterById } from "./get-shelter-by-id";

export default function Page() {
  const shelter = useGetShelterById("1");

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
      <h3 className="mt-8">Pets</h3>

      <div className="flex w-full flex-wrap gap-4 bg-[#9FD8F6] h-full wfull justify-center items-center p-2 pt-4 pb-4">
        {shelter.pets.map((pet) => (
          <div key={pet.id} className="flex flex-col items-center">
            <img className="w-[120px] h-[120px]" src={pet.imageUrl} alt={pet.name} />
            {pet.name}
            </div>
        ))}
      </div>
    </div>
  );
}
