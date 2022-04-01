import Query from "./query";
import {
  DateTimeResolver,
  EmailAddressResolver,
  CurrencyResolver,
} from "graphql-scalars";
// import Mutation from './mutation'

export default {
  Query,
  // Mutation
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Currency: CurrencyResolver,
};
