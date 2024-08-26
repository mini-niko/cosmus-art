import routState from "infra/protectRoutState";
import { useRouter } from "next/router";

import "styles/global.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  console.log(routState.isPrivate(router.pathname));

  return (
    <div className="bg-slate-200 min-h-screen">
      <Component {...pageProps} />;
    </div>
  );
}
