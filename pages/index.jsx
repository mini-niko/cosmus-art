import Link from "next/link";

function index() {
  return (
    <div className="h-screen bg-slate-200 flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">Cosmus Art</h1>
      <div>
        <Link
          className="text-slate-800 hover:text-black text-xl font-semibold mr-4"
          href="/login"
        >
          Cadastrar
        </Link>
        <Link
          className="text-slate-800 hover:text-black text-xl font-semibold"
          href="/register"
        >
          Registrar
        </Link>
      </div>
    </div>
  );
}

export default index;
