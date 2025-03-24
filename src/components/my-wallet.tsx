import truncateAddress from "@/utils/truncate-address";
import { useAccount, useEnsName } from "wagmi";

export default function MyWallet() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  //   const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const truncatedAddress = address && truncateAddress(address);

  const myWallet = ensName ? `${ensName} (${truncatedAddress})` : truncatedAddress;

  return (
    <>
      {/* {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />} */}
      {address && (
        <div className="flex items-center justify-between p-4 rounded-md">
          <p className="!text-xl !font-bold">My Wallet</p>
          <p className="!text-xl !font-bold">{myWallet}</p>
        </div>
      )}
    </>
  );
}
