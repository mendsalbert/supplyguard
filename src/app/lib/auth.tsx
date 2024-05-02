// isAuth.tsx

"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { open } = useWeb3Modal();
    const account = useAccount();
    const auth = account.address !== undefined;

    useEffect(() => {
      if (!auth) {
        open();
        return redirect("/");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
