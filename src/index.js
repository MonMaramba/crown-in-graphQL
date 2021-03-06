import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// like the providers in redux & context api. Accesses state in Apollo
import { ApolloProvider } from "react-apollo";
// connecting the client to the /graphql endpoint
import { createHttpLink } from "apollo-link-http";
// caches data to avoid multiple data requests
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { persistCache } from "apollo-cache-persist";

import { store, persistor } from "./redux/store";

import "./index.css";
import { default as App } from "./App.container";
import { resolvers, typeDefs } from "./graphql/resolvers";
import { default as data } from "./graphql/initial-data";

// connecting to the backend
const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com"
});

const cache = new InMemoryCache();

(async () => {
  await persistCache({
    cache,
    storage: window.localStorage
  });
})();

// defining the client and properties
const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

client.writeData({ data });

// Setting initial states in client
// client.writeData({
//   data: {
//     cartHidden: true,
//     cartItems: [],
//     itemCount: 0
//   }
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
