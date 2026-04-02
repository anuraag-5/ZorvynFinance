"use client";

import * as motion from "motion/react-client";
import SignIn from '@/components/SignIn';
import { bricolageGrotesque } from "@/app/font";
import React from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);

  if (loading) {
    return <LoadingSpinner classname="md:w-[58%]" />;
  }
  return (
    <section className="flex max-w-screen min-h-screen bg-linear-to-b from-[#E5DBFF] to-[#5d5967]">
      <SignIn loading={loading} setLoading={setLoading} />
      <motion.div
        className={
          bricolageGrotesque.className +
          " hidden md:flex flex-col items-center justify-center flex-1 text-[#FFCC00]"
        }
      >
        <div className="flex flex-col gap-8 text-black">
          <motion.div
            className="text-3xl lg:text-5xl font-light"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            Finance
          </motion.div>
          <motion.div
            className="text-3xl lg:text-5xl font-light"
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
          >
            Made
          </motion.div>
          <motion.div
            className={
              bricolageGrotesque.className + " text-5xl lg:text-7xl text-[#FFCC00]"
            }
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 1,
            }}
          >
            Simpler.
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default LoginPage