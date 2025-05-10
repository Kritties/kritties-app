"use client";
import { useGetShelters } from "@/hooks/useGetShelters";
import Skeleton from "react-loading-skeleton";
import ShelterCard from "@/components/shelter-card";
import Link from "next/link";

function Loading() {
  return (
    <div className="container mx-auto pt-20">
      <div className="flex items-center justify-between p-4">
        <h1>Shelters</h1>
        <Skeleton width={120} height={40} />
      </div>
      <div className="flex w-full flex-wrap gap-4 bg-[#9FD8F6] h-full min-h-[80vh] justify-center items-start p-2 pt-4 pb-4">
        {[0, 1, 2, 3, 4, 5].map((shelter) => (
          <div key={shelter} className="card bg-white w-96 h-130 rounded-md flex flex-col justify-between">
            <figure>
              <Skeleton height={200} />
            </figure>
            <div className="flex flex-col justify-end">
              <div className="card-body">
                <Skeleton height={24} width={200} />
                <Skeleton height={60} />
                <div className="card-actions justify-end">
                  <Skeleton height={24} width={100} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SheltersPage() {
  const { shelters, isLoading } = useGetShelters();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto pt-20">
      <div className="flex items-center justify-between p-4">
        <h1>Shelters</h1>
        <Link 
          href="/shelters/new"
          className="btn btn-primary bg-pink-200 border-4 border-t-pink-100 border-l-pink-100 border-b-pink-300 border-r-pink-300 hover:border-pink-400 active:border-pink-500 focus:outline-none transition shadow-md"
        >
          New Shelter
        </Link>
      </div>
      <div className="flex w-full flex-wrap gap-4 bg-[#9FD8F6] h-full min-h-[80vh] justify-center items-start p-2 pt-4 pb-4">
        {shelters?.map((shelter) => (
          <ShelterCard key={shelter?.id} shelter={shelter} />
        ))}
      </div>
    </div>
  );
} 