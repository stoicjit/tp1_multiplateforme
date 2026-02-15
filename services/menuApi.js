import { supabase } from '../config/supabase';
import { MenuItemSchema, MenuItemsListSchema } from '../schemas/menuSchemas';

export const menuApi = {
  /**
   * GET tout les items
   * @returns {Promise<{data: Array, error: string|null, loading: boolean}>}
   */
  getAllItems: async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })
        .order('title', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: error.message };
      }

      // Validation avec Zod
      const validation = MenuItemsListSchema.safeParse(data);
      
      if (!validation.success) {
        console.error('Validation error:', validation.error);
        return { 
          data: null, 
          error: 'Données invalides reçues de la base de données' 
        };
      }

      return { data: validation.data, error: null };
    } catch (err) {
      console.error('API error:', err);
      return { data: null, error: 'Erreur de connexion' };
    }
  },

  /**
   * GET single menu item by ID
   * @param {string} id 
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  getItemById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: error.message };
      }

      // Validation avec Zod
      const validation = MenuItemSchema.safeParse(data);
      
      if (!validation.success) {
        console.error('Validation error:', validation.error);
        return { 
          data: null, 
          error: 'Données invalides reçues' 
        };
      }

      return { data: validation.data, error: null };
    } catch (err) {
      console.error('API error:', err);
      return { data: null, error: 'Erreur de connexion' };
    }
  },
};