import Link from "next/link";
import { GetShelterByIdType } from "@/backend/services/shelters";

interface ShelterCardProps {
  shelter: GetShelterByIdType;
}

export default function ShelterCard({ shelter }: ShelterCardProps) {
  return (
    <Link href={`/shelters/${shelter?.id}`} key={shelter?.id}>
      <div className="card bg-white w-96 h-130 rounded-md flex flex-col justify-between">
        <figure>
          <img
            className="w-full h-[200px] object-cover"
            src={shelter?.imageUrl || ""}
            alt={shelter?.name || ""}
          />
        </figure>
        <div className="flex flex-col justify-end">
          <div className="card-body">
            <h2 className="card-title">
              {shelter?.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{shelter?.description}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline font-bold">
                {shelter?.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 