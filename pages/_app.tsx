import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ThemeContextProvider } from "../components/ThemeContextProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </SessionProvider>
  );
};

export default App;
