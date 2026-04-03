"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/userStore";
import useWidth from "@/lib/hooks";
import { signOut } from "@/lib/auth";

const NavbarMobile = () => {
    const width = useWidth();
    const { user } = useUserStore();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        signOut();
        router.replace("/");
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
                    className="absolute top-0 bottom-0 left-0 right-0 bg-black z-30 flex flex-col justify-evenly items-center gap-5"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 0.8,
                    }}
                    transition={{
                        duration: 1.1,
                    }}
                >
                    <motion.div className="h-[90%] flex flex-col justify-evenly">
                        <motion.div className="flex flex-col gap-4">
                            <motion.div
                                className="text-3xl cursor-pointer font-semibold"
                                onClick={() => {
                                    setOpen(false);
                                    router.push("/dashboard");
                                }}
                            >
                                Dashboard
                            </motion.div>
                            <motion.div
                                className="text-3xl cursor-pointer font-semibold"
                                onClick={() => {
                                    setOpen(false);
                                    router.push("/configuration");
                                }}
                            >
                                Configuration
                            </motion.div>
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
