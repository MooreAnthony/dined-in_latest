import { supabase } from './config';
import type { Contact, ContactFilters, SortOptions } from '../../types/contacts';

interface FetchContactsOptions {
  companyId: string;
  page?: number;
  pageSize?: number;
  filters?: ContactFilters;
  sort?: SortOptions;
}

interface ContactsResponse {
  data: Contact[];
  metadata: {
    total: number;
    page: number;
    pageSize: number;
  };
}

export const addTagToContact = async (contactId: string, tagId: string) => {
  const { error } = await supabase
    .from('contact_tags')
    .insert({ contact_id: contactId, tag_id: tagId });

  if (error) {
    throw new Error(`Failed to add tag to contact: ${error.message}`);
  }
};

export const removeTagFromContact = async (contactId: string, tagId: string) => {
  const { error } = await supabase
    .from('contact_tags')
    .delete()
    .eq('contact_id', contactId)
    .eq('tag_id', tagId);

  if (error) {
    throw new Error(`Failed to remove tag from contact: ${error.message}`);
  }
};

export async function findContactByEmailOrMobile(
  companyId: string,
  email?: string,
  mobile?: string
): Promise<Contact | null> {
  if (!email && !mobile) return null;

  const query = supabase
    .from('contacts')
    .select(`
      *,
      tags:contact_tags(
        tag:tags(id, name, color, icon)
      )
    `)
    .eq('company_id', companyId);

    if (email || mobile) {
      query.or(`email.eq.${email},mobile.eq.${mobile}`);
    }
    

  const { data, error } = await query.single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }

  return data;
}

export async function fetchContacts({
  companyId,
  page = 1,
  pageSize = 25,
  filters,
  sort,
}: FetchContactsOptions): Promise<ContactsResponse> {
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;

    // Build query
    const query = supabase
    .from('contacts')
    .select(`
      *,
      contact_tags:contact_tags (
        tag:tags(id, name, icon, color)
      )
    `, { count: 'exact' })
    .eq('company_id', companyId)
    .range(offset, offset + pageSize - 1);

    // Apply filters
    if (filters?.search) {
      query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }
    
    // Apply sorting
    query.order(sort?.field || 'created_at', { ascending: sort?.direction === 'asc' || false });


    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    interface ContactWithTags extends Omit<Contact, 'tags'> {
      tags?: { tag: { id: string; name: string; color: string; icon: string } }[];
    }
    
    interface TransformedContact extends Omit<Contact, 'tags'> {
      tags: { id: string; name: string; color: string; icon: string }[];
    }


    return {
      data: (data as ContactWithTags[]).map(contact => ({
      ...contact,
      tags: contact.tags?.map(t => t.tag) || []
      })) as TransformedContact[],
      metadata: {
      total: count || 0,
      page,
      pageSize,
      },
    };
  } catch (error) {
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to fetch contacts'
    );
  }
}

export async function createContact(companyId: string, data: Partial<Contact>): Promise<Contact> {
  const { data: contact, error } = await supabase
    .from('contacts')
    .insert({
      company_id: companyId,
      ...data,
      is_active: true,
    })
    .select()
    .single();

    if (error) {
      throw error;
    }
    return contact;
    
}

export async function updateContact(contactId: string, data: Partial<Contact>): Promise<Contact> {
  const { data: contact, error } = await supabase
    .from('contacts')
    .update(data)
    .eq('id', contactId)
    .select()
    .single();

  if (error) throw error;
  return contact;
}

export async function deleteContact(contactId: string): Promise<void> {
  const { error } = await supabase
    .from('contacts')
    .update({ is_deleted: true })
    .eq('id', contactId);

  if (error) throw error;
}

export async function fetchContact(contactId: string): Promise<Contact> {
  const { data: contact, error } = await supabase
    .from('contacts')
    .select()
    .eq('id', contactId)
    .single();

  if (error) throw error;
  return contact;
}