import "../styles/styles.scss";
import { AppProvider } from "../context/context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <AppProvider>
      <Header positioned={router.pathname === "/" ? true : false}/>
      <Component {...pageProps} />
      <Footer />
    </AppProvider>
  );
}

export default MyApp;
