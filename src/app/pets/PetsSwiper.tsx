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
  imageUrl: string;
  secondImageUrl: string;
}

const pets: Pet[] = [
  {
    id: "1",
    name: "Liza",
    imageUrl: "/pets/1.jpg",
    secondImageUrl: "/pets/2.jpg",
  },
  {
    id: "2",
    name: "Candy",
    imageUrl: "/pets/2.jpg",
    secondImageUrl: "/pets/1.jpg",
  },
  {
    id: "3",
    name: "Wero",
    imageUrl: "/pets/3.jpg",
    secondImageUrl: "/pets/1.jpg",
  },
  {
    id: "4",
    name: "Tom",
    imageUrl: "/pets/1.jpg",
    secondImageUrl: "/pets/2.jpg",
  },
  {
    id: "5",
    name: "Bongo",
    imageUrl: "/pets/2.jpg",
    secondImageUrl: "/pets/3.jpg",
  },
  {
    id: "6",
    name: "Coco",
    imageUrl: "/pets/3.jpg",
    secondImageUrl: "/pets/2.jpg",
  },
];

export default function PetsSwiper() {
  const [currentPets, setCurrentPets] = useState<Pet[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (currentPets.length === 0) {
      setCurrentPets((prev) => [...prev, ...pets.slice(0, 2)]);
    } else if (activeIndex === currentPets.length - 1) {
      setCurrentPets((prev) => [
        ...prev,
        ...pets.slice(activeIndex + 1, activeIndex + 2),
      ]);
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
            padding: "1rem"
          }}
        >
          <div className="w-full h-52 rounded-md p-4 bg-white">
            <PixelButton>
              <Icons.NextIcon />
            </PixelButton>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
