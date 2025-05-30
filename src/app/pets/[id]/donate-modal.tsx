import z from "zod";
import { Address } from "viem";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Pet } from "@prisma/client";

import { Button } from "@/components/button";

import { useDonationContract } from "@/hooks/useKrittiesContract";
import { useTokenContract } from "@/hooks/useTokenContract";

import { chainId, contracts } from "@/utils/contracts";
import { saveDonation } from "./pet-service";

const donationSchema = z.object({
  amount: z.number().min(1, "Donation amount must be greater than 0"),
});

function DonateStep({
  pet,
  donatorAddress,
  onSuccess,
}: {
  pet: Pet;
  donatorAddress: Address;
  onSuccess: () => void;
}) {
  const [allowance, setAllowance] = useState<bigint>();
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const { paymentToken, kritties } = contracts[chainId!];

  const { donate } = useDonationContract(kritties);
  const { approve, getAllowance } = useTokenContract(paymentToken.address);

  useEffect(() => {
    if (!donatorAddress || !kritties) return;
    getAllowance(donatorAddress, kritties).then(setAllowance);
  }, [donatorAddress, kritties]);

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedAmount = donationSchema.parse({ amount });
      const amountConverted =
        validatedAmount.amount * 10 ** paymentToken.decimals;

      await approve(kritties, BigInt(amountConverted));
      setAllowance(BigInt(amountConverted));
    } catch (err) {
      console.error("Validation error:", err);
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message); // Display the first validation error message
      }
    }
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedAmount = donationSchema.parse({ amount });
      const amountConverted =
        validatedAmount.amount * 10 ** paymentToken.decimals;

      const result = await donate(
        paymentToken.address,
        BigInt(amountConverted)
      );
      await saveDonation(
        pet.id,
        donatorAddress,
        validatedAmount.amount,
        result.transactionHash
      );

      onSuccess();
    } catch (err) {
      console.error("Validation error:", err);
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message); // Display the first validation error message
      }
    }
  };

  const amountConverted = BigInt((amount ?? 0).toString()) * BigInt(10 ** paymentToken.decimals);
  const isAlreadyApproved = !!allowance && amountConverted <= allowance;

  return (
    <div className="modal" role="dialog">
      <div className="modal-box relative bottom-0 flex flex-col gap-4 bg-[#9FD8F6] rounded-[1rem]">
        <h3 className="flex justify-center text-lg font-bold">
          Send donation to {pet.name}
        </h3>

        <div>
          <input
            type="text"
            placeholder="$ 10"
            className="input h-[40px] bg-[#DDF0FA] input-bordered w-full"
            onChange={(e) => setAmount(+e.target.value)}
          />
          {error && <p className="text-sm! text-red-500!">{error}</p>}
        </div>

        <p className="m-auto text-center max-w-[75%]">
          Make sure the information is correct before sending the funds.
        </p>

        {!isAlreadyApproved && <Button onClick={handleApprove}>Approve Donation</Button>}
        {isAlreadyApproved && <Button onClick={handleDonate}>Confirm Donation</Button>}
        <label
          htmlFor="donate-modal"
          className="w-full h-[40px] p-2 rounded-md bg-green-200 border-4 border-t-green-100 border-l-green-100 border-b-green-300 border-r-green-300 hover:border-green-400 active:border-green-500 focus:outline-none transition shadow-md flex items-center justify-center text-bold"
        >
          Cancel
        </label>
      </div>
    </div>
  );
}

function ConfirmedStep({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="modal" role="dialog">
      <div className="modal-box relative bottom-0 flex flex-col gap-4 bg-[#9FD8F6] rounded-[1rem]">
        <img
          src="/assets/love.svg"
          alt="Confirmed"
          className="w-[128px] h-[128px] m-auto"
        />

        <h3 className="m-auto flex justify-center text-center text-[1.5rem]! max-w-60">
          Thank you for your contribution!
        </h3>

        <label
          htmlFor="donate-modal"
          className="w-full h-[40px] p-2 rounded-md bg-green-200 border-4 border-t-green-100 border-l-green-100 border-b-green-300 border-r-green-300 hover:border-green-400 active:border-green-500 focus:outline-none transition shadow-md flex items-center justify-center text-bold"
          onClick={onSuccess}
        >
          Continue
        </label>
      </div>
    </div>
  );
}

enum Stepper {
  Donate,
  Confirm,
}

export function DonateModal({ pet }: { pet: Pet }) {
  const [step, setStep] = useState(Stepper.Donate);
  const { address: userAddress } = useAccount();

  return (
    <>
      <label
        htmlFor="donate-modal"
        className="w-full p-2 rounded-md bg-pink-200 border-4 border-t-pink-100 border-l-pink-100 border-b-pink-300 border-r-pink-300 hover:border-pink-400 active:border-pink-500 focus:outline-none transition shadow-md flex items-center justify-center text-bold"
      >
        Donate
      </label>
      <input type="checkbox" id="donate-modal" className="modal-toggle" />

      {step === Stepper.Donate && (
        <DonateStep
          pet={pet}
          donatorAddress={userAddress!}
          onSuccess={() => setStep(Stepper.Confirm)}
        />
      )}

      {step === Stepper.Confirm && <ConfirmedStep onSuccess={() => setStep(Stepper.Donate)} />}
    </>
  );
}
