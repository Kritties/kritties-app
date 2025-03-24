"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./swiper.css";
import PixelButton from "@/components/pixel-button";
import Icons from "@/components/icons";
import { useEffect, useState } from "react";

interface Pet {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  secondImageUrl: string;
  shelterName: string;
}

const randBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const pets: Pet[] = Array.from({ length: 20 }, (_, i) => {
  const imageIndex = randBetween(1, 3)
  return {
    id: i.toString(),
    name: `Pet ${imageIndex}`,
    description: `Description for Pet`,
    imageUrl: `/pets/${imageIndex}-big.jpg`,
    secondImageUrl: `/pets/${imageIndex}-small.jpg`,
    shelterName: `Shelter`,
  }
})

export default function PetsSwiper() {
  const [currentPets, setCurrentPets] = useState<Pet[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log("activeIndex", activeIndex);

    if (currentPets.length === 0) {
      setCurrentPets(pets.slice(0, 2));
    } else if (activeIndex === currentPets.length - 1) {
      setCurrentPets((prev) => {
        const newItems = [...prev, ...pets.slice(activeIndex + 1, activeIndex + 2)];
        return newItems;
      });
    }
  }, [activeIndex]);

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
      {currentPets.map((pet) => (
        <SwiperSlide
          key={`pet-${pet.id}`}
          style={{
            backgroundImage: `url(${pet.imageUrl})`,
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
              src={pet.secondImageUrl}
              alt={pet.name}
            />
            <div className="flex flex-col flex-1 justify-between h-full">
              <div className="flex flex-col">
                <span className="text-left text-3xl font-bold">{pet.name}</span>
                <p className="text-left text-sm">{pet.description}</p>
              </div>
              <div className="flex gap-4 justify-between w-full items-end self-end">
                <span className="text-left text-md font-bold">{pet.shelterName}</span>
                <PixelButton>
                  <Icons.NextIcon className="size-5" />
                </PixelButton>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
