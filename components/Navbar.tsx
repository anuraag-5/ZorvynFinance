"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import useWidth from "@/lib/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/userStore";

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
            className={`hidden border-r border-[#767676] md:flex flex-col justify-between w-full 
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
                                <div className="text-md lg:text-lg font-semibold px-3 py-0 rounded-full">
                                    Zorvyn
                                </div>
                            </div>
                            <div className="cursor-pointer" onClick={handleMenuToggle}>
                                <Image
                                    src="/images/menu.png"
                                    alt=""
                                    width={width > 1024 ? 25 : 20}
                                    height={width > 1024 ? 25 : 20}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div
                                className={
                                    (currentTab == "/dashboard"
                                        ? "bg-[#333333] "
                                        : "bg-transparent ") +
                                    " rounded-lg flex items-center w-full flex-start gap-3 py-3 px-4 cursor-pointer"
                                }
                                onClick={() => handleTabChange("/dashboard")}
                            >
                                <Image
                                    src="/images/overview-icon-black.png"
                                    alt=""
                                    width={width > 1024 ? 25 : 20}
                                    height={width > 1024 ? 25 : 20}
                                />
                                <div className="text-[14px] lg:text-[16px]">Projects</div>
                            </div>
                            <div
                                className={
                                    (currentTab == "/configuration"
                                        ? "bg-[#333333] "
                                        : "bg-transparent ") +
                                    " rounded-lg flex w-full flex-start gap-3 py-3 px-4 cursor-pointer"
                                }
                                onClick={() => handleTabChange("/configuration")}
                            >
                                <Image
                                    src="/images/settings-icon-white.svg"
                                    alt=""
                                    width={width > 1024 ? 25 : 20}
                                    height={width > 1024 ? 25 : 20}
                                />
                                <div className="text-[14px] lg:text-[16px]">Configuration</div>
                            </div>
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
                                src="/images/logout-icon.png"
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
                            <Image src="/images/menu.png" alt="" width={27} height={27} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div
                                className={
                                    (currentTab == "/projects"
                                        ? "bg-[#333333] "
                                        : "bg-transparent ") + " rounded-md p-3 cursor-pointer"
                                }
                                onClick={() => handleTabChange("/projects")}
                            >
                                <Image
                                    src="/images/overview-icon-black.png"
                                    alt=""
                                    width={25}
                                    height={25}
                                />
                            </div>
                            <div
                                className={
                                    (currentTab == "/settings"
                                        ? "bg-[#333333] "
                                        : "bg-transparent ") + " rounded-md p-3 cursor-pointer"
                                }
                                onClick={() => handleTabChange("/settings")}
                            >
                                <Image
                                    src="/images/settings-icon-white.svg"
                                    alt=""
                                    width={25}
                                    height={25}
                                />
                            </div>
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
                            src="/images/logout-icon.png"
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