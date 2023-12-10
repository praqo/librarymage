import "../styles/styles.scss";
import { AppProvider } from "../context/context";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
