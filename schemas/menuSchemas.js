import { z } from 'zod';

// Schema for a single menu item from database
export const MenuItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Titre requis'),
  category: z.enum(['boisson', 'sandwich']),
  description: z.string().min(1, 'Description requise'),
  prix: z.number().positive('Prix doit être positif'),
  created_at: z.string().optional(),
});

// Schema for list of menu items
export const MenuItemsListSchema = z.array(MenuItemSchema);