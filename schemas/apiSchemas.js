import { z } from 'zod';

// Schema pour api
export const QuoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.string(),
  tags: z.array(z.string()).optional(),
  authorSlug: z.string().optional(),
  length: z.number().optional(),
  dateAdded: z.string().optional(),
  dateModified: z.string().optional(),
});

// Schema pour validation review
export const ReviewFormSchema = z.object({
  email: z.string().email('Email invalide'),
  review: z.string().min(10, 'Le review doit contenir au moins 10 caractères'),
});
