import { ResponseResolver, RestRequest, RestContext } from "msw";

export type MockResolveFn = ResponseResolver<RestRequest, RestContext>;
