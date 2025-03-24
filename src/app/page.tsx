import PetsSwiper from "@/components/pets-swiper";

export default function Home() {
  return (
    <div className="absolute top-0 w-full h-[calc(100%-48px)]">
      <div className="mx-auto max-w-lg  bg-gray-800 min-w-xs h-full">
        <PetsSwiper />
      </div>
    </div>
  );
}
