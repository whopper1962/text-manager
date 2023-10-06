export class NotFoundError extends Error {
  constructor(public readonly modelName: string) {
    super(`${modelName} not found`);
  }
}

export const NotFoundModelName = {
  USER: "User",
  PROJECT: "Project",
  TEXT: "Text",
} as const;
