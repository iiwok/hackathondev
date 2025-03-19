// Mock Supabase client for development
// Remove this file and implement real Supabase integration when needed

const supabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: null })
      }),
      limit: (limit: number) => ({
        order: (column: string, options: { ascending?: boolean }) => 
          Promise.resolve({ data: [], error: null })
      })
    })
  })
};

export default supabase; 