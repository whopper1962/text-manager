import { User } from "./users";

export type Tag = {
  id: string;
  name: string;
};

export type Text = {
  id: string;
  text: Record<
    string,
    {
      content: string;
      alias: string;
    }
  >;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  updater: User;
};

export type TextDetails = {
  id: string;
  text: Record<string, string>;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  updater: User;
  memo: string;
  alias: string;
};

export type TextsIndexSearchQuery = {
  keyword: string;
  tagIds: string[];
  languageId: string;
  comparisonMethod: ComparisonMethod;
};

export const ComparisonMethod = {
  CONTAINS: "CONTAINS",
  EQUALS: "EQUALS",
  NOT_CONTAINS: "NOT_CONTAINS",
  NOT_EQUALS: "NOT_EQUAL",
} as const;
export type ComparisonMethod =
  (typeof ComparisonMethod)[keyof typeof ComparisonMethod];
