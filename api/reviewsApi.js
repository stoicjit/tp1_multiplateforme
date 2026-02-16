import { supabase } from '../config/supabase';
import { 
  ReviewSchema, 
  ReviewsListSchema, 
  ReviewFormSchema 
} from '../schemas/reviewSchemas';

export const reviewsApi = {
  /**
   * GET all reviews
   * @returns {Promise<{data: Array|null, error: string|null}>}
   */
  getAllReviews: async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: error.message };
      }

      // Validatation avec Zod  
      const validation = ReviewsListSchema.safeParse(data);
      
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
   * GET un review par ID
   * @param {string} id 
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  getReviewById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: error.message };
      }

      // Validation avec Zod
      const validation = ReviewSchema.safeParse(data);
      
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

  /**
   * POST - Creer review
   * @param {Object} reviewData - {username, email, rating, review}
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  createReview: async (reviewData) => {
    try {
      // Validation avec Zod
      const inputValidation = ReviewFormSchema.safeParse(reviewData);
      
      if (!inputValidation.success) {
        console.error('Input validation error:', inputValidation.error);
        return { 
          data: null, 
          error: 'Données du formulaire invalides' 
        };
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([inputValidation.data])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: error.message };
      }

      // Validation avec Zod
      const responseValidation = ReviewSchema.safeParse(data);
      
      if (!responseValidation.success) {
        console.error('Response validation error:', responseValidation.error);
        return { 
          data: null, 
          error: 'Réponse invalide du serveur' 
        };
      }

      return { data: responseValidation.data, error: null };
    } catch (err) {
      console.error('API error:', err);
      return { data: null, error: 'Erreur de connexion' };
    }
  },

  /**
   * PUT/PATCH - Update review
   * @param {string} id - 
   * @param {Object} reviewData - {username, email, rating, review}
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  updateReview: async (id, reviewData) => {
    try {
      // Validation avec Zod
      const inputValidation = ReviewFormSchema.safeParse(reviewData);
      
      if (!inputValidation.success) {
        console.error('Input validation error:', inputValidation.error);
        return { 
          data: null, 
          error: 'Données du formulaire invalides' 
        };
      }

      const { data, error } = await supabase
        .from('reviews')
        .update({
          ...inputValidation.data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { data: null, error: error.message };
      }

      // Validation avec Zod
      const responseValidation = ReviewSchema.safeParse(data);
      
      if (!responseValidation.success) {
        console.error('Response validation error:', responseValidation.error);
        return { 
          data: null, 
          error: 'Réponse invalide du serveur' 
        };
      }

      return { data: responseValidation.data, error: null };
    } catch (err) {
      console.error('API error:', err);
      return { data: null, error: 'Erreur de connexion' };
    }
  },

  /**
   * DELETE  review
   * @param {string} id 
   * @returns {Promise<{success: boolean, error: string|null}>}
   */
  deleteReview: async (id) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error('API error:', err);
      return { success: false, error: 'Erreur de connexion' };
    }
  },
};