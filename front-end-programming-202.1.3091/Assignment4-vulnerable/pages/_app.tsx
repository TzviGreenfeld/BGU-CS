import { AppProps } from "next/app";
import { ThemeContextProvider } from "../context/ThemeContextProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
  );
};

export default App;
