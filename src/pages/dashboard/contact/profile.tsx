import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactProfile from '../../../components/Testing/Profile'; 
import type { Contact } from '../../../types/contacts';
import { fetchContact } from '../../../services/supabase/contacts';
import Tabs from '../../../components/common/Tabs';
import { Button } from '../../../components/common/Button';
import { ArrowLeft } from 'lucide-react';
import AllInteractions from '../../../components/common/Interactions';
import { MessageBox } from '../../../components/common/MessageBox';
import { fetchContactInteractions } from '../../../services/supabase/interactions';
import type { Interaction } from '../../../types/interaction';

export default function ContactProfilePage() {
  const navigate = useNavigate();
  const { contact_id } = useParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [contactInteractions, setContactInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    const getContactAndInteractions = async () => {
      if (!contact_id) return;

      setLoading(true);
      try {
        const [contactData, interactions] = await Promise.all([
          fetchContact(contact_id),
          fetchContactInteractions(contact_id)
        ]);

        setContact(contactData);
        setContactInteractions(interactions);
      } catch (error) {
        console.error('Error loading contact data', error);
      } finally {
        setLoading(false);
      }
    };

    getContactAndInteractions();
  }, [contact_id]);

  if (loading) {
    return <div className="text-white p-6">Loading contact profile...</div>;
  }

  if (!contact) {
    return <div className="text-white p-6">Contact not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="p-2"
            onClick={() => setShowCancelConfirm(true)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-dark-text-primary">
            {contact.first_name} {contact.last_name}
          </h1>
        </div>
      </div>

      <Tabs
        tabs={[
          {
            label: 'Contact Profile',
            content: (
              <div className="min-h-screen bg-dark-primary text-white p-6">
                <ContactProfile contact={contact} />
              </div>
            ),
          },
          {
            label: 'Booking History',
            content: <div className="text-white"></div>,
          },
          {
            label: 'Email History',
            content: <div className="text-white"></div>,
          },
          {
            label: 'Interactions',
            content: (
              <div className="text-white">
                <AllInteractions interactions={contactInteractions} />
              </div>
            ),
          },
        ]}
      />

      {/* Cancel Confirmation MessageBox */}
      {showCancelConfirm && (
        <MessageBox
          title="Cancel Booking"
          message="Are you sure you want to cancel? Any unsaved changes will be lost."
          onConfirm={() => {
            setShowCancelConfirm(false);
            navigate('/dashboard/bookings');
          }}
          onCancel={() => setShowCancelConfirm(false)}
        />
      )}
    </div>
  );
}
