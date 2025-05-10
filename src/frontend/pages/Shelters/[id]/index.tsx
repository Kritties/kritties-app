"use client";
import { useGetShelterById } from "@/hooks/useGetShelterById";
import { usePathname, useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { MapPinIcon, BuildingOfficeIcon, WalletIcon } from "@heroicons/react/24/outline";

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

export default function ShelterDetailPage() {
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
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-start space-x-6">
          <img
            className="w-[120px] h-[120px] rounded-lg object-cover shadow-md"
            src={shelter.imageUrl || ""}
            alt={shelter.name}
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{shelter.name}</h1>
            <p className="text-gray-600 mb-4">{shelter.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPinIcon className="w-5 h-5" />
                <span>{shelter.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BuildingOfficeIcon className="w-5 h-5" />
                <span>Contract: {shelter.contractAddress?.slice(0, 6)}...{shelter.contractAddress?.slice(-4)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <WalletIcon className="w-5 h-5" />
                <span>Owner: {shelter.ownerWallet?.slice(0, 6)}...{shelter.ownerWallet?.slice(-4)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Available Pets</h2>
          <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
            {shelter.animals.length} pets
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shelter.animals.map((pet) => (
            <button 
              key={pet.id} 
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105" 
              onClick={() => handlePetClick(pet.id)}
            >
              <div className="relative w-full aspect-square mb-3">
                <img
                  className="w-full h-full object-cover object-center rounded-lg"
                  src={pet.nftImageUrl}
                  alt={pet.name}
                />
              </div>
              <span className="font-medium text-gray-800">{pet.name}</span>
              <span className="text-sm text-gray-500 mt-1">Click to view details</span>
            </button>
          ))}
        </div>

        {shelter.animals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No pets available in this shelter yet.</p>
          </div>
        )}
      </div>
    </div>
  );
} 