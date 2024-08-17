import "styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-slate-200 min-h-screen">
      <Component {...pageProps} />;
    </div>
  );
}
