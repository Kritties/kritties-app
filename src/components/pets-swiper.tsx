"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./swiper.css";
import PixelButton from "@/components/pixel-button";
import Icons from "@/components/icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GetNextPetsType } from "@/app/api/pets/next/route";
import PixelButtonLink from "./pixel-button-link";

export default function PetsSwiper({
  pets,
  nextPets,
  isLoading,
}: {
  pets: GetNextPetsType[];
  nextPets: () => void;
  isLoading: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const flag = useRef(0);

  useEffect(() => {
    if (
      !isLoading &&
      pets.length > 0 &&
      flag.current < pets.length &&
      activeIndex === pets.length - 1
    ) {
      flag.current = pets.length;
      nextPets();
    }
  }, [activeIndex, pets.length, isLoading, nextPets]);

  return (
    <Swiper
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
      onSlideChange={(e) => {
        setActiveIndex(e.activeIndex);
      }}
    >
      {pets.map((pet) => (
        <SwiperSlide
          key={`pet-${pet.id}`}
          style={{
            backgroundImage: `url(${pet.mainImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1rem",
          }}
        >
          <div className="w-full h-44 rounded-md p-4 bg-[#FAFAF0] flex items-center gap-4">
            <img
              className="!size-36 rounded-md shadow-[3px_3px_0px_0px_#0000001A] object-cover object-center"
              src={pet.nftImageUrl}
              alt={pet.name}
            />
            <div className="flex flex-col flex-1 justify-between h-full">
              <div className="flex flex-col">
                <span className="text-left text-3xl font-bold">{pet.name}</span>
                <p className="text-left text-sm line-clamp-2 max-w-[ch_100]">
                  {pet.description}
                </p>
              </div>
              <div className="flex gap-4 justify-between w-full items-end self-end">
                <Link href={`/shelters/${pet.shelterId}`} className="text-left text-md font-bold text-blue-400 underline">
                  {pet.shelter.name}
                </Link>
                <PixelButtonLink href={`/pets/${pet.id}`}>
                  <Icons.NextIcon className="size-5" />
                </PixelButtonLink>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
