export interface Interaction {
    id: string;
    category: string;
    sub_category: string;
    summary: string;
    detail?: Record<string, { from: string | number | boolean | null; to: string | number | boolean | null }>;
    created_at: string;
  }