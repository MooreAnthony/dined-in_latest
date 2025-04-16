import { useEffect, useState } from 'react';
import { Card } from '../../components/Testing/Card';
import { Input } from '../../components/Testing/Input';
import { format } from 'date-fns';


interface Interaction {
  id: string;
  category: string;
  sub_category: string;
  summary: string;
  detail?: Record<string, { from: any; to: any }>;
  created_at: string;
}

interface BookingInteractionsProps {
  interactions: Interaction[];
}

export default function BookingInteractions({ interactions }: BookingInteractionsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = interactions.filter((interaction) =>
    interaction.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 bg-dark-secondary p-6 rounded-2xl shadow-md">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">Booking Interactions</h2>
        <input
          type="text"
          placeholder="Search interactions..."
          className="w-full px-4 py-2 bg-dark-primary border border-dark-border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-accent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="space-y-6 max-h-[500px] pr-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400">No interactions found.</p>
        ) : (
          filtered
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((interaction) => (
              <div
                key={interaction.id}
                className="bg-dark-primary border border-dark-border p-4 rounded-xl shadow-sm text-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-sm uppercase text-dark-accent font-bold">
                      {interaction.category}
                    </span>
                    <span className="ml-2 text-sm font-medium text-indigo-300">
                      {interaction.sub_category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {format(new Date(interaction.created_at), 'PPpp')}
                  </span>
                </div>

                <div className="text-sm mb-2">{interaction.summary}</div>

                {interaction.detail && (
                  <div className="space-y-2 mt-2">
                    {Object.entries(interaction.detail).map(([key, value]) => (
                      <div key={key} className="bg-dark-secondary border border-dark-border p-3 rounded-md text-sm">
                        <div className="text-gray-300 font-medium mb-1 capitalize">{key.replace(/_/g, ' ')}</div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="text-red-400">From: {formatValue(value.from)}</span>
                          <span className="text-green-400">To: {formatValue(value.to)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
        )}
      </ScrollArea>
    </div>
  );
}

// Helper to format non-string values
function formatValue(value: any) {
  if (!value) return '—';
  if (typeof value === 'string') {
    const date = Date.parse(value);
    if (!isNaN(date)) {
      return format(new Date(value), 'PPpp');
    }
    return value;
  }
  return JSON.stringify(value);
}

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
