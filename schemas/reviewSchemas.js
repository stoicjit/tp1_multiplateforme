import { z } from 'zod';


export const ReviewFormSchema = z.object({
  username: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  rating: z.number().int().min(1, 'Note minimum 1').max(5, 'Note maximum 5'),
  review: z.string().min(10, 'L\'avis doit contenir au moins 10 caractères'),
});


export const ReviewSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  rating: z.number().int().min(1).max(5),
  review: z.string(),
  created_at: z.string(),
  updated_at: z.string().optional(),
});


export const ReviewsListSchema = z.array(ReviewSchema);