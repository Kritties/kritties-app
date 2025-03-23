import { Pet } from "./pet";

export type Shelter = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pets: Pet[];
};