import { Contact } from '../../types/contacts'; // Adjust path as needed
import { Mail, Phone, MapPin, Cake, Tag } from 'lucide-react';

interface ContactProfileProps {
  contact: Contact;
}

export default function ContactProfile({ contact }: ContactProfileProps) {
  return (
    <div className="bg-dark-secondary text-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-6 border-b border-dark-border pb-6">
        <div className="w-24 h-24 bg-dark-primary rounded-full flex items-center justify-center text-3xl font-bold">
          {contact.first_name[0]}
        </div>
        <div>
          <h2 className="text-2xl font-bold">
            {contact.first_name} {contact.last_name}
          </h2>
          <p className="text-sm text-gray-400">{contact.company_name}</p>
          {contact.tags && contact.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {contact.tags.map(tag => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                  style={{ backgroundColor: tag.color }}
                >
                  <Tag className="w-3 h-3" /> {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-dark-accent" /> {contact.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-dark-accent" /> {contact.mobile}
            </li>
            {contact.preferred_contact_method && (
              <li className="text-gray-400">Preferred: {contact.preferred_contact_method}</li>
            )}
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-dark-accent" />
              {[contact.street_address, contact.city, contact.state, contact.postal_code, contact.country].filter(Boolean).join(', ')}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Profile Details</h3>
          <ul className="space-y-2 text-sm">
            {contact.birthday_day && contact.birthday_month && (
              <li className="flex items-center gap-2">
                <Cake className="w-4 h-4 text-dark-accent" /> Birthday: {contact.birthday_day}/{contact.birthday_month}
              </li>
            )}
            <li>Source: {contact.contact_source || 'N/A'}</li>
            <li>Created: {new Date(contact.created_at).toLocaleString()}</li>
            <li>Updated: {new Date(contact.modified_at).toLocaleString()}</li>
            <li>Status: {contact.is_active ? 'Active' : 'Inactive'}</li>
            {contact.is_test_profile && <li className="text-yellow-500 font-semibold">Test Profile</li>}
          </ul>
        </div>
      </div>

      {contact.notes && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Notes</h3>
          <p className="text-sm text-gray-300 bg-dark-primary p-4 rounded-lg whitespace-pre-line">{contact.notes}</p>
        </div>
      )}
    </div>
  );
}
