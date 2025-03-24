"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import PixelButton from "./pixel-button";

export default function Topbar() {
    return (
        <div className="navbar bg-transparent z-50 absolute">
            {/* <div className="flex-none">
                <PixelButton >
                    <img src="/assets/arrow-left.svg" alt="Inicio" className="w-5 h-5" />
                </PixelButton>
            </div> */}
            <div className="flex-1">
            </div>
            <div className="flex-none">
                <ConnectButton />
            </div>
        </div>
    );
}
