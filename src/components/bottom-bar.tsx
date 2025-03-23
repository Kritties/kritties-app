"use client";

import Link from "next/link";

export default function BottomBar() {
    return (
        <div className="btm-nav fixed bottom-0 w-full bg-white shadow z-50 flex justify-between py-3 px-4 drop-shadow-md ">
            <Link
                href="/"
                className="text-primary flex flex-col items-center justify-center gap-1"
            >
                <img src="/assets/home.svg" alt="Inicio" className="w-6 h-6" />
            </Link>

            <Link
                href="/pets"
                className="text-primary flex flex-col items-center justify-center gap-1"
            >
                <img src="/assets/folder.svg" alt="Pets" className="w-6 h-6" />
            </Link>

            <Link
                href="/notifications"
                className="text-primary flex flex-col items-center justify-center gap-1"
            >
                <img
                    src="/assets/notification.svg"
                    alt="Profile"
                    className="w-6 h-6"
                />
            </Link>
            <Link
                href="/profile"
                className="text-primary flex flex-col items-center justify-center gap-1"
            >
                <div className="avatar">
                    <div className="w-6 rounded-full overflow-hidden">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </Link>
        </div>
    );
}
