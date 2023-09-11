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
  TEXTS: "/texts",
  LANGUAGES: "/languages",
  TAGS: "/tags",
  PROJECTS: "/projects",
  PROJECT_MEMBES: "/project_members",
  LOGIN: "/login",
  SIGNUP: "/signup",
} as const;
export type ApiGroupPath = (typeof ApiGroupPath)[keyof typeof ApiGroupPath];
