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

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";
import { resolvers, typeDefs } from "./graphql/resolvers";

// connecting to the backend
const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com"
});

const cache = new InMemoryCache();

// defining the client and properties
const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

// Setting initial states in client
client.writeData({
  data: {
    cartHidden: true,
    cartItems: []
  }
});

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
