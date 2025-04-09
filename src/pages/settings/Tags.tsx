import React, { useState } from 'react';
import { Plus, AlertCircle, Loader2, Cake, Building2, BuildingIcon } from 'lucide-react';
import { useCompany } from '../../contexts/CompanyContext';
import { Button } from '../../components/common/Button';
import { TagsList } from '../../components/tags/TagsList';
import { CreateTagModal } from '../../components/tags/CreateTagModal';
import { useTags } from '../../hooks/useTags';
import { AutomationCard } from '../../components/tags/AutomationTagCard';

export const Tags: React.FC = () => {
  const { currentCompany } = useCompany();
  const [selectedCategory, setSelectedCategory] = useState<'contact' | 'booking' | 'auto'>('contact');
  const { tags, error, isLoading, updateTag, deleteTag, reorderTags, createTag } = useTags(currentCompany?.id, selectedCategory);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBirthdayEnabled, setIsBirthdayEnabled] = useState(false);
  const [birthdayPeriod, setBirthdayPeriod] = useState(10);
  const [isFirstVisitBrandEnabled, setIsFirstVisitBrandEnabled] = useState(false);
  const [isFirstVisitSiteEnabled, setIsFirstVisitSiteEnabled] = useState(false);

  if (!currentCompany) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-semibold text-dark-text-primary">
            No Company Selected
          </h2>
          <p className="text-dark-text-secondary">
            Please select a company to manage tags
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-dark-text-primary">Tags</h1>
          <div className="px-3 py-1 rounded-full bg-dark-accent/10 text-dark-accent text-sm">
            {tags.length} Total
          </div>
        </div>
        {(selectedCategory === 'contact' || selectedCategory === 'booking') && (
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Tag
        </Button> )}
      </div>

      {/* Category Selector */}
      <div className="flex gap-2">
        <Button
          variant={selectedCategory === 'contact' ? 'primary' : 'outline'}
          onClick={() => setSelectedCategory('contact')}
        >
          Contact Tags
        </Button>
        <Button
          variant={selectedCategory === 'booking' ? 'primary' : 'outline'}
          onClick={() => setSelectedCategory('booking')}
        >
          Booking Tags
        </Button>
        <Button
          variant={selectedCategory === 'auto' ? 'primary' : 'outline'}
          onClick={() => setSelectedCategory('auto')}
        >
          Automation Tags
        </Button>
      </div>

      {/* Automation Tags */}
      {selectedCategory === 'auto' && (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Birthday Tag */}
          <AutomationCard
            icon={<Cake className="w-6 h-6 text-dark-accent" />}
            title="Birthday"
            description="Automatically tag contacts who have a birthday within the next, or within the last 'x' days."
            isEnabled={isBirthdayEnabled}
            onToggle={setIsBirthdayEnabled}
          >
            <div className="flex items-center gap-4">
              <label className="text-dark-text-primary text-sm font-medium">
                Period (days):
              </label>
              <input
                type="number"
                value={birthdayPeriod}
                onChange={(e) => setBirthdayPeriod(Number(e.target.value))}
                className="w-20 px-2 py-1 border rounded-md text-dark-text-primary bg-dark-secondary border-dark-border"
                min={1}
                title="Birthday period in days"
                placeholder="Days"
              />
            </div>
          </AutomationCard>

          {/* First Visit (Brand) Tag */}
          <AutomationCard
            icon={<Building2 className="w-6 h-6 text-dark-accent" />}
            title="First Visit (Brand)"
            description="Tag customers on their first visit to the brand."
            isEnabled={isFirstVisitBrandEnabled}
            onToggle={setIsFirstVisitBrandEnabled}
          />

          {/* First Visit (Site) Tag */}
          <AutomationCard
            icon={<BuildingIcon className="w-6 h-6 text-dark-accent" />}
            title="First Visit (Site)"
            description="Automatically tag guests on their first visit to the site."
            isEnabled={isFirstVisitSiteEnabled}
            onToggle={setIsFirstVisitSiteEnabled}
          />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-400/10 text-red-400 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 text-dark-accent animate-spin mx-auto" />
            <p className="text-dark-text-secondary">Loading tags...</p>
          </div>
        </div>
      ) : (
        <TagsList
          tags={tags}
          selectedCategory={selectedCategory}
          onUpdate={async (id, data) => { await updateTag(id, data); }}
          onDelete={deleteTag}
          onReorder={reorderTags}
        />
      )}

      {/* Create Tag Modal */}
      <CreateTagModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={async (data) => { await createTag(data); }}
        category={selectedCategory}
      />
    </div>
  );
};