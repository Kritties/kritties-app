import z from "zod";
import { useState } from "react";
import { useAccount } from 'wagmi';

import { Pet } from "@/app/types/pet";
import { Button } from "@/components/button";
import { useDonationContract } from "@/hooks/useKrittiesContract";
import { useTokenContract } from "@/hooks/useTokenContract";
import { contracts, defaultChainId } from "@/utils/contracts";

const donationSchema = z.object({
  amount: z.number().min(1, "Donation amount must be greater than 0"),
});

export function DonateModal({ pet }: { pet: Pet }) {
  // TODO: use hook form
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const { address: userAddress, chainId = defaultChainId } = useAccount();
  const { paymentToken, kritties } = contracts[chainId!];

  const { donate } = useDonationContract(kritties);
  const { approve, getAllowance } = useTokenContract(paymentToken.address);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedAmount = donationSchema.parse({ amount });
      const amountConverted = validatedAmount.amount * (10 ** paymentToken.decimals);
      const allowance = await getAllowance(userAddress!, kritties);

      if (allowance < amountConverted) {
        await approve(kritties, BigInt(amountConverted));
      }
      await donate(paymentToken.address, BigInt(amountConverted));

      // TODO: Proceed with the donation logic...
    } catch (err) {
      console.error("Validation error:", err);
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message); // Display the first validation error message
      }
    }
  };

  return (
    <>
      <label
        htmlFor="donate-modal"
        className="w-full p-2 rounded-md bg-pink-200 border-4 border-t-pink-100 border-l-pink-100 border-b-pink-300 border-r-pink-300 hover:border-pink-400 active:border-pink-500 focus:outline-none transition shadow-md flex items-center justify-center text-bold"
      >
        Donate
      </label>
      <input type="checkbox" id="donate-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box relative bottom-0 flex flex-col gap-4 bg-[#9FD8F6] rounded-[1rem]">
          <h3 className="flex justify-center text-lg font-bold">
            Send donation to {pet.name}
          </h3>

          <div>
            <input
              type="text"
              placeholder="$ 10"
              className="input h-[40px] bg-[#DDF0FA] input-bordered w-full max-w-xs"
              onChange={(e) => setAmount(+e.target.value)}
            />
            {error && <p className="text-sm! text-red-500!">{error}</p>}
          </div>

          <p className="m-auto text-center max-w-[75%]">
            Make sure the information is correct before sending the funds.
          </p>

          <Button onClick={handleSubmit}>Confirm Donation</Button>
          <label
            htmlFor="donate-modal"
            className="w-full h-[40px] p-2 rounded-md bg-green-200 border-4 border-t-green-100 border-l-green-100 border-b-green-300 border-r-green-300 hover:border-green-400 active:border-green-500 focus:outline-none transition shadow-md flex items-center justify-center text-bold"
          >
            Cancel
          </label>
        </div>
      </div>
    </>
  );
}
