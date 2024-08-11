"use client";

import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

import load from "public/loading/loading.svg";
import Image from "next/image";

function ProtectedRout({ children }) {
  const [cookies] = useCookies(["loginToken"]);
  const router = useRouter();

  useEffect(() => {
    if (!cookies.loginToken) router.push("/login");
  });

  if (!cookies.loginToken) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Image width={48} src={load}></Image>
        <h1 className="text-2xl font-semibold">Carregando...</h1>
      </div>
    );
  } else {
    return children;
  }
}

export default ProtectedRout;
