const QUOTES_API_URL = 'https://dummyjson.com/quotes/random';

export const quotesApi = {
  getRandomQuote: async () => {
    try {
      console.log('Fetching quote from DummyJSON');
      
      const response = await fetch(QUOTES_API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Quote received:', data);
      
      if (!data.quote || !data.author) {
        throw new Error('Invalid quote data');
      }
      
      return {
        _id: `dummy-${data.id}-${Date.now()}`,
        content: data.quote,
        author: data.author,
        tags: [],
      };
    } catch (error) {
      console.error('API Error:', error);
      
      const fallbackQuotes = [
        {
          content: "The secret of getting ahead is getting started.",
          author: "Mark Twain"
        },
        {
          content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
          author: "Winston Churchill"
        },
        {
          content: "Don't watch the clock; do what it does. Keep going.",
          author: "Sam Levenson"
        },
        {
          content: "The only way to do great work is to love what you do.",
          author: "Steve Jobs"
        },
        {
          content: "Believe you can and you're halfway there.",
          author: "Theodore Roosevelt"
        },
        {
          content: "Coffee is a language in itself.",
          author: "Jackie Chan"
        },
        {
          content: "Life happens, coffee helps.",
          author: "Anonymous"
        }
      ];
      
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      
      console.log('Using fallback quote');
      return {
        _id: `fallback-${Date.now()}-${Math.random()}`,
        content: randomQuote.content,
        author: randomQuote.author,
        tags: ['fallback'],
      };
    }
  },
};