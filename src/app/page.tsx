"use client";

import { useRouter } from "next/navigation";
import { Shelter } from "./types/shelter";
import { useEffect, useState } from "react";

export default function Home() {
  const [shelters, setShelters] = useState<Shelter[]>();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/shelters")
      .then((res) => res.json())
      .then((data) => setShelters(data));
  }, []);

  return (
    <>
      <div>hello this is the list of shelters</div>

      {shelters?.map((shelter) => (
        <button
          className="w-full"
          key={shelter.id}
          onClick={() => router.push(`/shelters/${shelter.id}`)}
        >
          <div className=" border border-gray-200 p-4 m-4">
            <h1>{shelter.name}</h1>
          </div>
        </button>
      ))}
    </>
  );
}
