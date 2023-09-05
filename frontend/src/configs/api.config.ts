export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers: HttpHeaders;
};

export class ApiConfiguration {
  accessToken?: string;
}

export const ApiGroupPath = {
  USERS: "/users",
  TEXTS: "/texts"
} as const;
export type ApiGroupPath = (typeof ApiGroupPath)[keyof typeof ApiGroupPath];
