"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import PixelButton from "./pixel-button";

export default function Topbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-none">
                <PixelButton >
                    <img src="/assets/home.svg" alt="Inicio" className="w-4 h-4" />
                </PixelButton>
            </div>
            <div className="flex-1">
            </div>
            <div className="flex-none">
                <ConnectButton />
            </div>
        </div>
    );
}
