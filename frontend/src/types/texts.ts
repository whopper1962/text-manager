export type Tag = {
  id: string;
  name: string;
};

export type Text = {
  id: string;
  text: Record<string, string>;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export type IndexSearchQuery = {
  text: string;
  tagId: string;
};