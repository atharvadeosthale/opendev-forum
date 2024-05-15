export type Post = {
  id?: number | null;
  title?: string | null;
  content?: string | null;
  userId?: string | null;
};

export type Answer = {
  id?: number | null;
  content?: string | null;
  userId?: string | null;
  post?: number | null;
};
