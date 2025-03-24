"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetDonationsByUser } from "./get-donations";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const wallet = params.id; // esto te da el param "id"
    const donations = useGetDonationsByUser(wallet as string);
    console.log("donations", donations, params);
    const handlePetClick = (petId: string) => {
        router.push(`/pets/${petId}`);
    };

    if (!donations) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="flex items-center space-x-4 p-4 pt-20">
                <h1>User: {wallet}</h1>
            </div>
            <p>{""}</p>
            <h3 className="mt-8 mb-4 text-center">Pets</h3>

            <div className="flex w-full flex-wrap gap-4 bg-[#9FD8F6] h-full justify-center items-start p-2 pt-4 pb-4">
                {donations?.map((petDonations: any) => (
                    <div className="card bg-white w-96 h-130 rounded-md flex flex-col justify-between">
                        <figure>
                            <img
                                className="w-full h-auto rounded-md"
                                src={petDonations.pet.imageUrl}
                                alt=""
                            />
                        </figure>
                        <div className="flex flex-col justify-end">
                            <div className="card-body ">
                                <h2 className="card-title">
                                    {petDonations.pet.name}
                                    <div className="badge badge-secondary">
                                        NEW
                                    </div>
                                </h2>
                                <p>{petDonations.pet.description}</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline font-bold">
                                        ${petDonations.totalAmount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
