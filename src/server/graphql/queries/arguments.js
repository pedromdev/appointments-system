import {GraphQLString, GraphQLEnumType} from "graphql";
import {DateScalarType} from "../scalar-types";

export const schedule = {
  start: {type: DateScalarType},
  end: {type: DateScalarType},
  status: {
    type: new GraphQLEnumType({
      name: 'Status',
      values: {
        NEW: {
          value: 'NEW'
        },
        CONFIRMED: {
          value: 'CONFIRMED'
        },
        CANCELLED: {
          value: 'CANCELLED'
        },
      },
    }),
  }
};

export const procedure = {
  name: {type: GraphQLString}
};