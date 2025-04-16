import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import { TagSelector } from '../tags/TagSelector';
import type { Tag } from '../../types/tags';
import { addContactTags, removeContactTags } from '../../services/supabase/tags';
import { userId } from '../../services/supabase/auth'; // Import userId from auth service

interface ContactTagsSectionProps {
  show: boolean;
  tags: Tag[];
  selectedTags: string[];
  contactId: string;
  user: string;
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
  if (!show) return null;

  // Split the tags based on the auto_tag field
  const contactTags = tags.filter(tag => tag.auto_tag === false);
  const autoTags = tags.filter(tag => tag.auto_tag === true);
  const user = userId.data?.user?.id || ''; // Assuming userId is a string, adjust if necessary


  const handleTagSelect = async (tagIds: string[], clickedTag: Tag) => {
    if (clickedTag.auto_tag) return;
  
    const wasPreviouslySelected = selectedTags.includes(clickedTag.id);
  
    if (wasPreviouslySelected) {
      await removeContactTags(contactId, [clickedTag.id]);
    } else {
      await addContactTags(contactId, [clickedTag.id], user); // Use userId here
    }
  
    onTagSelect(tagIds, clickedTag.id);
  };

  return (
    <>
      <div className="pt-4 border-t border-dark-border space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-dark-text-secondary">
          <TagIcon className="w-4 h-4" />
          Contact Tags
        </label>
        <TagSelector
          tags={contactTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          category="contact"
          onCreateTag={onCreateTag}
          showSearch={true}
        />
      </div>

      <div className="pt-4 border-t border-dark-border space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-dark-text-secondary">
          <TagIcon className="w-4 h-4" />
          Auto Tags
        </label>
        <TagSelector
          tags={autoTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          category="contact"
          onCreateTag={onCreateTag}
          showSearch={false}
        />
      </div>
    </>
  );
};
