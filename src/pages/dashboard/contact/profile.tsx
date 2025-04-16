import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactProfile from '../../../components/Testing/Profile'; 
import type { Contact } from '../../../types/contacts';
import { fetchContact } from '../../../services/supabase/contacts';

export default function ContactProfilePage() {
    const { contact_id } = useParams();
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getContact = async () => {
        setLoading(true);
        try {
          if (!contact_id) return;
  
          const data = await fetchContact(contact_id);
          setContact(data);
        } catch (error) {
          console.error('Failed to fetch contact', error);
        } finally {
          setLoading(false);
        }
      };
  
      getContact();
    }, [contact_id]);
  
    if (loading) {
      return <div className="text-white p-6">Loading contact profile...</div>;
    }
  
    if (!contact) {
      return <div className="text-white p-6">Contact not found</div>;
    }
  
    return (
      <div className="min-h-screen bg-dark-primary text-white p-6">
        <ContactProfile contact={contact} />
      </div>
    );
  }