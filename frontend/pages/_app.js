import "../styles/globals.css";
import { Provider, createClient } from "urql";
import Nav from "../components/Nav";
import { StateContext } from "../lib/context";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from "react-hot-toast";
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

//Be aware that if want to render on the broswer, must to use NEXT_PUBLIC.....ç
function MyApp({ Component, pageProps }) {
  // All the component is gonna render in here! and given the access from backend to fetch the data  by provider.
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
