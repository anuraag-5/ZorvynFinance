"use client";

import Navbar from "@/components/Navbar";
import { LayoutGroup } from "motion/react";
import * as motion from "motion/react-client";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <LayoutGroup>
            <motion.div layout className="flex-1 flex">
                <Navbar />
                {children}
            </motion.div>
        </LayoutGroup>
    );
};

export default MainLayout;