"use client";
import { useRouter } from "next/navigation";
import { useCreateShelter } from "@/hooks/useCreateShelter";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";

function Loading() {
    return (
        <div className="container">
            <div className="w-full flex flex-col items-center space-y-4 p-4">
                <Skeleton
                    className="w-full"
                    width={300}
                    height={40}
                    count={5}
                />
            </div>
        </div>
    );
}

export default function NewShelterPage() {
    const router = useRouter();
    const { address } = useAccount();
    const { isLoading, create, shelter } = useCreateShelter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data: any) => {
        console.log(data);
        const newShelter = await create(
            data.name,
            data.symbol,
            data.location,
            data.imageUrl,
            data.description,
            address as string
        );
        router.push(`/shelters/${newShelter?.id}`);
    };

    return (
        <div className="container mx-auto pt-20">
            <div className="flex items-center justify-between p-4">
                <div>
                    <h1 className="text-2xl font-bold">Create new shelter</h1>
                    <p className="text-gray-600 mt-2">Create a new shelter in order to add pets</p>
                </div>
            </div>
            {isLoading && <Loading />}
            {!isLoading && (
                <div className="flex w-full flex-wrap gap-4 bg-[#9FD8F6] h-full min-h-[80vh] justify-center items-start p-2 pt-4 pb-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6 w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    defaultValue=""
                                    {...register("name", { required: "Name is required" })}
                                    className="input w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent"
                                    placeholder="Enter shelter name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
                                <input
                                    type="text"
                                    defaultValue=""
                                    {...register("symbol", { 
                                        required: "Symbol is required",
                                        maxLength: {
                                            value: 4,
                                            message: "Symbol must be 4 characters or less"
                                        }
                                    })}
                                    className="input w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent"
                                    placeholder="Enter symbol (max 4 characters)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    defaultValue=""
                                    {...register("description", { required: "Description is required" })}
                                    className="input w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent min-h-[100px]"
                                    placeholder="Enter shelter description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    defaultValue=""
                                    {...register("imageUrl", { required: "Image URL is required" })}
                                    className="input w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent"
                                    placeholder="Enter image URL"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    defaultValue=""
                                    {...register("location", { required: "Location is required" })}
                                    className="input w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent"
                                    placeholder="Enter shelter location"
                                />
                            </div>
                        </div>

                        {!!errors &&
                            Object.values(errors).length > 0 &&
                            Object.values(errors).map((error) => (
                                <p key={error?.message?.toString()} className="text-red-500 text-sm">
                                    {error?.message?.toString()}
                                </p>
                            ))}

                        <button 
                            type="submit"
                            className="w-full h-[48px] rounded-md bg-pink-200 border-4 border-t-pink-100 border-l-pink-100 border-b-pink-300 border-r-pink-300 hover:border-pink-400 active:border-pink-500 focus:outline-none transition shadow-md flex items-center justify-center text-bold text-gray-800 font-medium"
                        >
                            Create Shelter
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

