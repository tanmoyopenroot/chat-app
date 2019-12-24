import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const ALL_USERS = gql`
  {
    allUsers {
      id,
      email
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allUsers.map(({ id, email }) => (
    <div key={id}>
      {email}
    </div>
  ));
};
