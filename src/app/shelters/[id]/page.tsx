"use client";
import { usePathname, useRouter } from "next/navigation";
import { useGetShelterById } from "./get-shelter-by-id";

function Loading() {
  return (
    <div className="container mx-auto pt-20">
      <div className="flex items-center space-x-4 p-4">
        <div className="skeleton w-[60px] h-[60px] rounded-full"></div>
      </div>

      <div className="px-4 space-y-2">
        <div className="skeleton h-[20px] w-[300px]"></div>
        <div className="skeleton h-[20px] w-[300px]"></div>
      </div>

      <h3 className="mt-8 mb-4 text-center">Pets</h3>

      <div className="flex w-full min-h-[400px] flex-wrap gap-4 bg-[#9FD8F6] justify-center p-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton w-[120px] h-[120px]"></div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop() as string;

  const { shelter, isLoading } = useGetShelterById(id);

  const handlePetClick = (petId: string) => {
    router.push(`/pets/${petId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!shelter) {
    return <div>Shelter not found</div>;
  }

  return (
    <div className="container mx-auto pt-20">
      <div className="flex items-center space-x-4 p-4">
        <img
          className="w-[60px] h-[60px]"
          src={shelter.imageUrl || ""}
          alt={shelter.name}
        />
        <h1>{shelter.name}</h1>
      </div>
      <p className="px-4">{shelter.description}</p>
      <h3 className="mt-8 mb-4 text-center">Pets</h3>

      <div className="flex w-full flex-wrap gap-4 bg-[#9FD8F6] h-full wfull justify-center items-center p-2 pt-4 pb-4">
        {shelter.animals.map((pet) => (
          <button key={pet.id} className="flex flex-col items-center" onClick={() => handlePetClick(pet.id)}>
            <img
              className="w-[120px] h-[120px] object-cover object-center"
              src={pet.nftImageUrl}
              alt={pet.name}
            />
            {pet.name}
          </button>
        ))}
      </div>
    </div>
  );
}
