export type Tag = {
  id: string;
  name: string;
};

export type Text = {
  id: string;
  text: Record<string, string>;
  tags: Tag[];
};
