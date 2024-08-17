import Link from "next/link";

function index() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">Cosmus Art</h1>
      <div className="flex gap-4">
        <Link
          className="text-slate-800 hover:text-black text-xl font-semibold"
          href="/login"
        >
          Entrar
        </Link>
        <Link
          className="text-slate-800 hover:text-black text-xl font-semibold"
          href="/register"
        >
          Registrar
        </Link>
        <Link
          className="text-slate-800 hover:text-black text-xl font-semibold"
          href="/home"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default index;
