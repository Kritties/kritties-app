import { useDisconnect } from "wagmi";
import MyWallet from "./my-wallet";

export default function MyAccount() {
  const { disconnect } = useDisconnect();

  return (
    <div>
      <MyWallet />
      <button
        className="w-full p-2 rounded-md bg-pink-200 border-4 border-t-pink-100 border-l-pink-100 border-b-pink-300 border-r-pink-300 hover:border-pink-400 active:border-pink-500 focus:outline-none transition shadow-md flex items-center justify-center text-bold"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
}
