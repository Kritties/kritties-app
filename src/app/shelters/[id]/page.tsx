"use client";
import { usePathname, useRouter } from "next/navigation";
import { useGetShelterById } from "./get-shelter-by-id";
import Skeleton from "react-loading-skeleton";

function Loading() {
  return (
    <div className="container mx-auto pt-20">
      <div className="flex items-center space-x-4 p-4">
        <Skeleton width={60} height={60} />
      </div>

      <div className="px-4">
        <Skeleton height={20} width={300} />
        <Skeleton height={20} width={300} />
      </div>
      <h3 className="mt-8 mb-4 text-center">Pets</h3>

      <div className="flex w-full min-h-[400px] flex-wrap gap-4 bg-[#9FD8F6] h-full wfull justify-center p-2 pt-4 pb-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((pet) => (
          <Skeleton key={pet} width={120} height={120} />
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
              className="w-[120px] h-[120px]"
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
