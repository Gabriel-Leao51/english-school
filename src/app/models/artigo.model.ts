// src/app/models/artigo.model.ts

export interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: Date;
  userId?: string;
}

export interface Artigo {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  imageUrl?: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
