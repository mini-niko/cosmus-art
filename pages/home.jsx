import ProtectedRout from "components/ProtectedRout";

function home() {
  return (
    <ProtectedRout>
      {({ name, id }) => {
        return (
          <div className="bg-slate-200 h-screen flex flex-col">
            <nav className="bg-slate-100 border border-b-black px-16 py-8 flex flex-row items-center justify-between">
              <h1 className="text-4xl font-bold">Cosmus Art</h1>
              <p className="h-fit text-xl">Olá {name}!</p>
            </nav>
            <div className="text-xl font-semibold grow flex items-center justify-center">
              <span>🚧 Em construção 🚧</span>
            </div>
          </div>
        );
      }}
    </ProtectedRout>
  );
}

export default home;
