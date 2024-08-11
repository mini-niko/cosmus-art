import ProtectedRout from "components/ProtectedRout";

function home() {
  return (
    <ProtectedRout>
      <div className="bg-slate-200 h-screen">
        <nav className="bg-slate-100 border border-b-black px-16 py-8 flex flex-row items-center justify-between">
          <h1 className="text-4xl font-bold">Cosmus Art</h1>
          <p className="h-fit text-xl">Olá, User!</p>
        </nav>
      </div>
    </ProtectedRout>
  );
}

export default home;
