import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost"; // allows us to make queries and mutations

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

// instead of a client.query, the request itself is written
const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => (
  // Wrapping the collectionsoverview component in the Query component with the query passed in gives us back a function with access to an object with properties that we need
  <Query query={GET_COLLECTIONS}>
    {({ loading, data }) => {
      if (loading) return <Spinner />;
      return <CollectionsOverview collections={data.collections} />;
    }}
  </Query>
);

export default CollectionsOverviewContainer;
