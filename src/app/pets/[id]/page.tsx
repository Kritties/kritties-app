"use client";
import AttributeCard from "@/components/attribute-card";
import { useGetPetById } from "./pet-service";
import { usePathname } from "next/navigation";
import { DonateModal } from "./donate-modal";

function Loading() {
  return (
    <div className="container mx-auto gap-4">
      <div className="skeleton h-[400px] w-full"></div>
      <div className="p-4 gap-4">
        <div className="skeleton h-[20px] w-full"></div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="skeleton h-[100px] w-full"></div>
          <div className="skeleton h-[100px] w-full"></div>
          <div className="skeleton h-[100px] w-full"></div>
          <div className="skeleton h-[100px] w-full"></div>
        </div>

        <h3 className="mt-8 mb-2 align-baseline flex items-center gap-2">
          About <div className="skeleton w-[60px] h-[20px]"></div>
        </h3>
        <div className="skeleton h-[100px] w-full"></div>

        <div className="flex justify-end mt-8 w-full">
          <div className="skeleton h-[60px] w-[350px]"></div>
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
