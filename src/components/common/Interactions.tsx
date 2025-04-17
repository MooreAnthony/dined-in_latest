import { useState } from 'react';
import { format } from 'date-fns';
import { ScrollArea } from '../Testing/ScrollArea';
import { Interaction } from '../../types/interaction'; 


interface InteractionsProps {
  interactions: Interaction[];
}

export default function AllInteractions({ interactions }: InteractionsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = interactions.filter((interaction) =>
    interaction.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 bg-dark-secondary p-6 rounded-2xl shadow-md">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">Interactions</h2>
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
                <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-indigo-800 text-xs uppercase font-bold text-white">
                    {interaction.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-800 text-xs font-medium text-white">
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
                    <div
                        key={key}
                        className="bg-dark-secondary border border-dark-border p-3 rounded-md text-sm"
                    >
                        <div className="text-gray-300 font-medium mb-1 capitalize">
                        {key.replace(/_/g, ' ')}
                        </div>
                        <div className="ml-4 space-y-1">
                        <div className="text-gray-400">From: {formatValue(value.from)}</div>
                        <div className="text-gray-400">To: {formatValue(value.to)}</div>
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
function formatValue(value: string | number | boolean | null) {
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