export interface IPost {
  slug: string;
  title: string;
  publishedAt: number;
  lastModifiedAt: number;
  tags: string[];
  content: string;
  author: string;
  author_pic: string;
} 