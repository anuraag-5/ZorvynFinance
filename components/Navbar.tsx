"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import useWidth from "@/lib/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/userStore";
import { LiquidGlassSidebarItem } from "./LiquidSidebar";
import { Folders, Settings } from "lucide-react"
import { signOut } from "@/lib/auth";

const Navbar = () => {
    const width = useWidth();
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [currentTab, setCurrentTab] = useState(usePathname());
    const { user } = useUserStore();

    const handleMenuToggle = () => setOpen((initialValue) => !initialValue);
    const handleTabChange = (tab: string) => {
        setCurrentTab(tab);
        router.push(tab);
    };

    const handleLogout = async () => {
        signOut();
        router.replace("/");
    };

    return (
        <motion.div
            layout
            transition={{ duration: 0.4 }}
            className={`hidden border-r border-[#FFCC00] md:flex flex-col justify-between w-full 
        ${open ? "max-w-[300px] px-6 pt-6 pb-3" : "max-w-[80px] px-4 pt-6 pb-3"}
    `}
        >
            {open ? (
                <>
                    <div className="flex flex-col h-[220px] justify-between">
                        <div className="flex justify-between items-center">
                            <div
                                className="flex gap-3 cursor-pointer"
                                onClick={() => router.push("/")}
                            >
                                <div className="text-lg lg:text-2xl py-0 rounded-full text-[#FFCC00]">
                                    Zorvyn
                                </div>
                            </div>
                            <div className="cursor-pointer" onClick={handleMenuToggle}>
                                <Image
                                    src="/menu.svg"
                                    alt=""
                                    width={width > 1024 ? 35 : 25}
                                    height={width > 1024 ? 35 : 25}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <LiquidGlassSidebarItem
                                icon="/dashboard.svg"
                                isActive={currentTab === "/dashboard"}
                                onClick={() => handleTabChange("/dashboard")}
                                children="Dashboard"
                                className="px-3.5"
                            />
                            <LiquidGlassSidebarItem
                                icon="/settings.svg"
                                isActive={currentTab === "/configuration"}
                                onClick={() => handleTabChange("/configuration")}
                                children="Configuration"
                                className="px-3.5"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center w-full pr-6 lg:pr-8">
                            <div className="p-5 lg:p-6 w-fit rounded-full bg-blue-800"></div>
                            <div className="flex flex-col">
                                <div className="text-[10px] lg:text-[12px]">{user?.name}</div>
                                <div className="text-[8px] lg:text-[10px] text-[#A0A0A0]">
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex gap-3 py-3 px-4 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <Image
                                src="/logout.svg"
                                alt=""
                                width={width > 1024 ? 25 : 20}
                                height={width > 1024 ? 25 : 20}
                            />
                            <div>Logout</div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <motion.div className="flex flex-col h-[220px] justify-between items-center"
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            duration: 0.2,
                            delay: 0.4
                        }}
                    >
                        <div className="cursor-pointer w-fit" onClick={handleMenuToggle}>
                            <Image src="/menu.svg" alt="" width={27} height={27} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <LiquidGlassSidebarItem
                                children=""
                                icon="/dashboard.svg"
                                isActive={currentTab === "/dashboard"}
                                onClick={() => handleTabChange("/dashboard")}
                                className="px-2"
                            />
                            <LiquidGlassSidebarItem
                                icon="/settings.svg"
                                isActive={currentTab === "/configuration"}
                                onClick={() => handleTabChange("/configuration")}
                                children=""
                                className="px-2"
                            />
                        </div>
                    </motion.div>
                    <motion.div className="flex flex-col gap-3 items-center"
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            duration: 0.2,
                            delay: 0.4
                        }}
                    >
                        <div className="p-5 rounded-full bg-blue-800"></div>
                        <Image
                            src="/logout.svg"
                            alt=""
                            width={25}
                            height={25}
                            className="cursor-pointer"
                            onClick={handleLogout}
                        />
                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

export default Navbar;