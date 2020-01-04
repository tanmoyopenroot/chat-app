import { gql } from 'apollo-server-express';

export default gql`
  type Team {
    id: Int!
    name: String!
    owner: User!
  }

  type CreateTeamResponse {
    ok: Boolean!
    team: Team!
    errors: [Error!]
  }

  type Query {
    allTeams: [Team!]!
  }

  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
  }
`;
