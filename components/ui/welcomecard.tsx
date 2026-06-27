"use client"

import { useSession } from "next-auth/react";

type WelcomeCardProps = {
  
  description: string;
};

export default  function Welcomecard({

  description,
}: WelcomeCardProps) {
  const {data:session} =  useSession();
  return (
    <div className="text-start my-2">
      <h1 className="pt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
         Welcome back, {session?.user?.name ?? "User"}
      </h1>

      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}