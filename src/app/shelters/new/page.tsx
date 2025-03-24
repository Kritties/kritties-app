"use client";
import { useRouter } from "next/navigation";
import { useCreateShelter } from "./create-shelter";
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

export default function Page() {
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
            <div className="flex items-center space-x-4 p-4">
                <h1>Create new shelter</h1>
            </div>
            <p className="px-4">Create a new shelter in order to add pets</p>
            {isLoading && <Loading />}
            {!isLoading && (
                <div className="flex w-full flex-wrap gap-4 h-full justify-center items-center p-2 pt-4 pb-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 w-full"
                    >
                        {/* register your input into the hook by invoking the "register" function */}
                        <input
                            type="text"
                            defaultValue=""
                            {...register("name", { required: true })}
                            className="input w-full"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            defaultValue=""
                            {...register("description", { required: true })}
                            className="input w-full"
                            placeholder="Description"
                        />
                        <input
                            type="text"
                            defaultValue=""
                            {...register("imageUrl", { required: true })}
                            className="input w-full"
                            placeholder="Image URL"
                        />
                        <input
                            type="text"
                            defaultValue=""
                            {...register("location", { required: true })}
                            className="input w-full"
                            placeholder="Location"
                        />

                        {/* errors will return when field validation fails  */}
                        {!!errors &&
                            Object.values(errors).length > 0 &&
                            Object.values(errors).map((error) => (
                                <p key={error?.message?.toString()}>
                                    {error?.message?.toString()}
                                </p>
                            ))}

                        <input type="submit" />
                    </form>
                </div>
            )}
        </div>
    );
}
