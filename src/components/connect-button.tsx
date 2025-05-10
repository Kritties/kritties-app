"use client";

import { useAccount } from "wagmi";
import Icons from "./icons";
import MyAccount from "./my-account";
import WalletOptions from "./wallet-options";
import classNames from "classnames";
import useNetworkSwitch from "@/hooks/useNetworkSwitch";

export default function ConnectButton() {
  const { isConnected } = useAccount();

  useNetworkSwitch();

  return (
    <>
      <div className="indicator">
        <span className={classNames("indicator-item status status-xl top-1 right-1", {
          "status-success": isConnected,
          "status-error": !isConnected
        })}></span>
        <div className="grid place-items-center">
          <label
            htmlFor="connect-modal"
            className="size-[60px] p-2 rounded-md bg-pink-200 border-4 border-t-pink-100 border-l-pink-100 border-b-pink-300 border-r-pink-300 hover:border-pink-400 active:border-pink-500 focus:outline-none transition shadow-md flex items-center justify-center text-bold"
          >
            <Icons.ConnectWallet className="size-5" />
          </label>
          <input type="checkbox" id="connect-modal" className="modal-toggle" />
          <ConnectPopup isConnected={isConnected} />
        </div>
      </div>
    </>
  );
}

function ConnectPopup({isConnected}: {isConnected: boolean}) {

  return (
    <div className="modal" role="dialog">
      <div className="modal-box relative bottom-0 flex flex-col gap-4 bg-[#9FD8F6] rounded-[1rem]">
        {isConnected && <MyAccount />}

        {!isConnected && <WalletOptions />}

        <label
          htmlFor="connect-modal"
          className="w-full h-[40px] p-2 rounded-md bg-green-200 border-4 border-t-green-100 border-l-green-100 border-b-green-300 border-r-green-300 hover:border-green-400 active:border-green-500 focus:outline-none transition shadow-md flex items-center justify-center text-bold"
        >
          Close
        </label>
      </div>
    </div>
  );
}
