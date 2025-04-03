import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import { TagSelector } from '../tags/TagSelector';
import type { Tag } from '../../types/tags';

interface ContactTagsSectionProps {
  show: boolean;
  tags: Tag[];
  selectedTags: string[];
  onTagSelect: (tagIds: string[]) => void;
  onCreateTag: (tag: Tag) => Promise<void>;
}

export const ContactTagsSection: React.FC<ContactTagsSectionProps> = ({
  show,
  tags,
  selectedTags,
  onTagSelect,
  onCreateTag,
}) => {
  if (!show) return null;
  
  return (
    <div className="pt-4 border-t border-dark-border space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-dark-text-secondary">
        <TagIcon className="w-4 h-4" />
        Contact Tags
      </label>
      <TagSelector
        tags={tags}
        selectedTags={selectedTags}
        onTagSelect={onTagSelect}
        category="contact"
        onCreateTag={onCreateTag}
      />
    </div>
  );
};