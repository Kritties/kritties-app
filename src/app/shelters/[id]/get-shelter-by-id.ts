import React from "react";

import LogoImage from "@/libs/mock-data/shelter-1.png";
import Pet1Image from "@/libs/mock-data/pet-1.png";
import Pet2Image from "@/libs/mock-data/pet-2.png";
import Pet3Image from "@/libs/mock-data/pet-3.png";
import Pet4Image from "@/libs/mock-data/pet-4.png";
import Pet5Image from "@/libs/mock-data/pet-5.png";

type Shelter = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pets: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
}
const mocked: Shelter = {
  id: "1",
  name: `Doggy Land`,
  description:
    "We give rescued dogs love and a chance for a better life. We promote responsible adoption and create lasting bonds between pets and people.",
  imageUrl: LogoImage.src,
  pets: [
    {
      id: "1",
      name: "Liza",
      imageUrl: Pet1Image.src,
    },
    {
      id: "2",
      name: "Candy",
      imageUrl: Pet2Image.src,
    },
    {
      id: "3",
      name: "Wero",
      imageUrl: Pet3Image.src,
    },
    {
      id: "4",
      name: "Tom",
      imageUrl: Pet4Image.src,
    },
    {
      id: "5",
      name: "Bongo",
      imageUrl: Pet5Image.src,
    },
  ]
  };

export function useGetShelterById(id: string) {
  const [shelter, setShelter] = React.useState<Shelter>();

  React.useEffect(() => {
    if (id) {
      Promise.resolve(mocked).then(setShelter);
    }
  }, [id]);

  return shelter;
}
