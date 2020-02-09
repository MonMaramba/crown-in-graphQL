import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "react-apollo"; // like the providers in redux & context api. Accesses state in Apollo
import { createHttpLink } from "apollo-link-http"; // connecting the client to the /graphql endpoint
import { InMemoryCache } from "apollo-cache-inmemory"; // caches data to avoid multiple data requests
import { ApolloClient } from "apollo-boost";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

// connecting to the backend
const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
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
