import { useEffect, useState } from 'react';
import { Card } from '../../components/Testing/Card';
import { Input } from '../../components/Testing/Input';

interface Interaction {
    id: string;
    category: string;
    sub_category: string;
    summary: string;
    detail: {
      table?: string;
      guests?: number;
      previous_time?: string;
      new_time?: string;
      tag?: string;
    };
    created_at: string;
  }
  
  interface BookingInteractionsProps {
    interactions: Interaction[];
  }
  

interface BookingInteractionsProps {
  bookingId: string;
  fetchInteractions: (bookingId: string) => Promise<Interaction[]>;
}

export default function BookingInteractions({ bookingId, fetchInteractions }: BookingInteractionsProps) {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchInteractions(bookingId).then(setInteractions);
  }, [bookingId, fetchInteractions]);

  const filtered = interactions.filter((interaction) => {
    const term = search.toLowerCase();
    return (
      interaction.summary.toLowerCase().includes(term) ||
      interaction.category.toLowerCase().includes(term) ||
      interaction.sub_category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-white">Booking Interactions</h1>

      <Input
        placeholder="Search interactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-4">
        {filtered.length === 0 && (
          <p className="text-gray-400">No interactions found.</p>
        )}

        {filtered.map((interaction) => (
          <Card key={interaction.id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{interaction.summary}</h3>
                <p className="text-sm text-gray-300">
                  {interaction.category} / {interaction.sub_category}
                </p>
                {interaction.detail && (
                  <pre className="text-sm mt-2 text-gray-400 whitespace-pre-wrap">
                    {JSON.stringify(interaction.detail, null, 2)}
                  </pre>
                )}
              </div>
              <span className="text-sm text-gray-500">{new Date(interaction.created_at).toLocaleString()}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
