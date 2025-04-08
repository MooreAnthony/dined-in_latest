import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import { TagSelector } from '../tags/TagSelector';
import type { Tag } from '../../types/tags';
import { addContactTags, removeContactTags } from '../../services/supabase/tags';

interface ContactTagsSectionProps {
  show: boolean;
  tags: Tag[];
  selectedTags: string[];
  contactId: string;
  onTagSelect: (tagIds: string[], selectedTagId: string) => void;
  onCreateTag: (tag: Tag) => Promise<void>;
}

export const ContactTagsSection: React.FC<ContactTagsSectionProps> = ({
  show,
  tags,
  selectedTags,
  contactId,
  onTagSelect,
  onCreateTag,
}) => {

  const handleTagSelect = async (tagIds: string[], clickedTag: Tag) => {
    const wasPreviouslySelected = selectedTags.includes(clickedTag.id);
    console.log('contact', contactId)
    // Call the external add/remove methods
    if (wasPreviouslySelected) {
      await removeContactTags(contactId, [clickedTag.id]);
    } else {
      await addContactTags(contactId, [clickedTag.id]);
    }

    // Call the parent update
    onTagSelect(tagIds, clickedTag.id);
  };

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
        onTagSelect={handleTagSelect}
        category="contact"
        onCreateTag={onCreateTag}
      />
    </div>
  );
};
