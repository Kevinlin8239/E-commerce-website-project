import "../styles/globals.css";
import { Provider, createClient } from "urql";

const client = createClient({ url: "http://localhost:1337/graphql" });

function MyApp({ Component, pageProps }) {
  // All the component is gonna render in here! and given the access from backend to fetch the data  by provider.
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
