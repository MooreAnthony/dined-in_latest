export interface Tag {
  id: string;
  company_id: string;
  name: string;
  color: string;
  icon: string;
  category: 'contact' | 'booking' | 'auto';
  sort_order: number;
  created_at: string;
  created_by: string | null;
  modified_at: string;
  modified_by: string | null;
  auto_tag: boolean;
  contact_count: number;
  deleted: boolean;
}

export interface UpdateTagData {
  name?: string;
  color?: string;
  icon?: string;
}

export interface TagRelationship {
  id: string;
  tag_id: string;
  created_at: string;
  created_by: string | null;
}

export interface ContactTag extends TagRelationship {
  contact_id: string;
}

export interface BookingTag extends TagRelationship {
  booking_id: string;
}

export interface CreateTagData {
  name: string;
  color: string;
  icon: string;
  category: 'contact' | 'booking' | 'auto';
  sort_order?: number;
}
