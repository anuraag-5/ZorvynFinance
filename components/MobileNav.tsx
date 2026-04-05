"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/lib/userStore";
import useWidth from "@/lib/hooks";
import { signOut } from "@/lib/auth";
import { LiquidGlassSidebarItem } from "./LiquidSidebar";

const NavbarMobile = () => {
    const width = useWidth();
    const { user } = useUserStore();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState(usePathname());
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const userPrefTheme = localStorage.getItem("theme");
        if (userPrefTheme) {
            setTheme(userPrefTheme);
        } else {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        }
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    };

    const handleLogout = async () => {
        signOut();
        router.replace("/");
    };
    const handleTabChange = (tab: string) => {
        setCurrentTab(tab);
        router.push(tab);
        setOpen(false);
    };
    return (
        <div className="flex md:hidden justify-between items-center p-5">
            <div className="z-60 rounded-full text-[20px]">
                Zorvyn
            </div>
            {open ? (
                <motion.div
                    className="h-fit z-60"
                    onClick={() => setOpen(false)}
                    layoutId="menu-mobile"
                    transition={{
                        duration: 1.5,
                    }}
                >
                    <Image src="/menu.svg" alt="" width={20} height={20} />
                </motion.div>
            ) : (
                <motion.div
                    className="h-fit z-60"
                    onClick={() => setOpen(true)}
                    layoutId="menu-mobile"
                    transition={{
                        duration: 1,
                    }}
                >
                    <Image src="/menu.svg" alt="" width={25} height={25} />
                </motion.div>
            )}
            {open ? (
                <motion.div
                    className="fixed top-0 bottom-0 left-0 right-0 bg-white dark:bg-black z-30 flex flex-col justify-evenly items-center gap-5"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 1.1,
                    }}
                >
                    <motion.div className="h-[90%] flex flex-col justify-evenly">
                        <motion.div className="flex flex-col gap-4">
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
                            <LiquidGlassSidebarItem
                                icon={mounted ? (theme === "dark" ? "/night-mode.svg" : "/light-mode.svg") : "/light-mode.svg"}
                                isActive={false}
                                onClick={toggleTheme}
                                children={mounted ? (theme === "dark" ? "Dark Mode" : "Light Mode") : "Light Mode"}
                                className="px-3.5"
                            />
                        </motion.div>
                        <motion.div className="flex flex-col gap-5">
                            <div className="flex gap-3 items-center w-full">
                                <div className="p-5 w-fit rounded-full bg-blue-800"></div>
                                <div className="flex flex-col">
                                    <div className="text-[10px]">{user?.name}</div>
                                    <div className="text-[8px] text-[#A0A0A0]">{user?.email}</div>
                                </div>
                            </div>
                            <div className="flex gap-3 cursor-pointer font-semibold" onClick={handleLogout}>
                                <Image
                                    src="/logout.svg"
                                    alt=""
                                    width={width > 1024 ? 25 : 20}
                                    height={width > 1024 ? 25 : 20}
                                />
                                <div>Logout</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            ) : null}
        </div>
    );
};

export default NavbarMobile;
