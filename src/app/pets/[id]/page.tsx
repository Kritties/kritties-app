"use client";
import AttributeCard from "@/components/attribute-card";
import { useGetPetById } from "./pet-service";
import { usePathname } from "next/navigation";
import { DonateModal } from "./donate-modal";
import Skeleton from "react-loading-skeleton";

function Loading() {
  return (
    <div className="container mx-auto mpt-[4rem] gap-4">
      <Skeleton height={400} />
      <div className="p-4 gap-4">
        <Skeleton height={20} />

        <div className="grid grid-cols-2 gap-4 mt-2">
          <AttributeCard isLoading />
          <AttributeCard isLoading />
          <AttributeCard isLoading />
          <AttributeCard isLoading />
        </div>

        <h3 className="mt-8 mb-2 align-baseline">
          About <Skeleton width={60} />
        </h3>
        <Skeleton height={100} />

        <div className="flex justify-end mt-8 w-full">
          <Skeleton height={60} width={350} />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const pathname = usePathname();
  const id = pathname.split("/").pop() as string;

  const pet = useGetPetById(id);

  if (!pet) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mpt-[4rem]">
      <img
        className="w-full h-full max-h-[400px] object-cover"
        src={pet.nftImageUrl}
        alt={pet.name}
      />

      <div className="p-4">
        <h2 className="mb-4 align-baseline">{pet.name}</h2>

        <div className="grid grid-cols-2 gap-4">
          <AttributeCard
            attribute={{ name: "Age", value: pet.age.toString() }}
          />
          <AttributeCard attribute={{ name: "Sex", value: "Male" }} />
          <AttributeCard attribute={{ name: "Weight", value: "30 KG" }} />
          <AttributeCard attribute={{ name: "Breed", value: "Half-breed" }} />
        </div>

        <h3 className="mt-8 align-baseline">About {pet.name}</h3>
        <p>{pet.description}</p>

        <div className="flex justify-end mt-8">
          <DonateModal pet={pet} />
        </div>
      </div>
    </div>
  );
}
