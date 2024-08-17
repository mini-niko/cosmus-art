import React from "react";
import load from "public/loading/loading.svg";
import Image from "next/image";

function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Image width={48} src={load} alt=""></Image>
      <h1 className="text-2xl font-semibold">Carregando...</h1>
    </div>
  );
}

export default Loading;
