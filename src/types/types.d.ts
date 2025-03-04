// deno-lint-ignore-file no-explicit-any
import type { Context } from 'hono';
import type z from 'zod';
import type { H } from 'hono/types';
import type { Yelix } from "@/mod.ts";
import { InitializeOpenAPIParams, OpenAPIDoc } from "@/src/OpenAPI/openAPI.types.ts";
import { ApiReferenceOptions } from "npm:@scalar/hono-api-reference";

type Ctx = Context;

type ValidationType = {
  query?:
    | {
        [key: string]: z.ZodType<any, any, any> | string | undefined;
      }
    | undefined;
  body?: z.infer<any> | undefined;
};

type EndpointHandler = (ctx: Ctx) => Promise<any>;

type Endpoint = {
  path: string;
  GET?: EndpointHandler;
  POST?: EndpointHandler;
  PUT?: EndpointHandler;
  DELETE?: EndpointHandler;
  PATCH?: EndpointHandler;
  middlewares?: string[];
  validation?: ValidationType;
  openAPI?: OpenAPIDoc | undefined;
};

type ApplyMiddlewareParams = {
  ctx: Ctx;
  middleware: string;
  endpoint?: ParsedEndpoint;
};

type ParsedMethod = { method: string; handler: EndpointHandler };

type ExportsType = Record<string, any>;

type ParsedEndpoint = {
  middlewares: H[];
  path: string;
  methods: ParsedMethod[];
  exports: ExportsType;
  openAPI?: OpenAPIDoc;
};

type AppConfigType = {
  debug: boolean;
  port: number;
  noWelcome: boolean;
  dontIncludeDefaultMiddlewares: boolean;
};

type OptionalAppConfigType = {
  [K in keyof AppConfigType]?: AppConfigType[K];
};

type Middleware = (request: ApplyMiddlewareParams, next: () => Promise<void>, yelix: Yelix) => Promise<Record<string, unknown>> | Record<string, unknown> | Promise<void> | void;

type MiddlewareList = {
  match: string | RegExp;
  middleware: Middleware;
}

type QueryType = Record<string, any>;

type InitOpenAPIParams = {
  path: string;
  apiReferenceConfig?: ApiReferenceOptions;
} & InitializeOpenAPIParams;

export type {
  Ctx,
  ValidationType,
  EndpointHandler,
  Endpoint,
  ParsedEndpoint,
  AppConfigType,
  OptionalAppConfigType,
  ParsedMethod,
  ApplyMiddlewareParams,
  Middleware,
  ExportsType,
  MiddlewareList,
  QueryType,
  InitOpenAPIParams
};
