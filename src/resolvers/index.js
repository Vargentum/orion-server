import Query from "./query";
import {
  DateTimeResolver,
  EmailAddressResolver,
  CurrencyResolver,
  URLResolver,
} from "graphql-scalars";
// import Mutation from './mutation'

export default {
  Query,
  // Mutation
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Currency: CurrencyResolver,
  URL: URLResolver,
};
