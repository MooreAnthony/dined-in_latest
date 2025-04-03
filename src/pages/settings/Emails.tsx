import React, { useState } from 'react';
import { Mail, AlertCircle, History, Eye, Code, Save, RotateCcw, Plus } from 'lucide-react';
import { useCompany } from '../../contexts/CompanyContext';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { Modal } from '../../components/common/Modal';
import { supabase } from '../../services/supabase/config';

interface EmailTemplate {
  id: string;
  code: string;
  name: string;
  subject: string;
  html_content: string;
  is_enabled: boolean;
  modified_at: string;
  modified_by: string;
}

interface TemplateVersion {
  id: string;
  subject: string;
  html_content: string;
  created_at: string;
  created_by: string;
  is_active: boolean;
}

export const Emails: React.FC = () => {
  const { currentCompany } = useCompany();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [versions, setVersions] = useState<TemplateVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedContent, setEditedContent] = useState('');

  React.useEffect(() => {
    const loadTemplates = async () => {
      if (!currentCompany?.id) return;

      try {
        const { data, error } = await supabase
          .from('email_templates')
          .select(`
            id,
            code,
            name,
            subject,
            html_content,
            is_enabled,
            modified_at,
            modified_by
          `)
          .eq('company_id', currentCompany.id)
          .order('name');

        if (error) throw error;
        setTemplates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load templates');
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplates();
  }, [currentCompany?.id]);

  const loadVersions = async (templateId: string) => {
    try {
      const { data, error } = await supabase
        .from('email_template_versions')
        .select('*')
        .eq('template_id', templateId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVersions(data);
    } catch (err) {
      console.error('Failed to load versions:', err);
    }
  };

  const handleToggleTemplate = async (template: EmailTemplate) => {
    try {
      const { error } = await supabase
        .from('email_templates')
        .update({ is_enabled: !template.is_enabled })
        .eq('id', template.id);

      if (error) throw error;

      setTemplates(prev =>
        prev.map(t =>
          t.id === template.id ? { ...t, is_enabled: !t.is_enabled } : t
        )
      );
    } catch (err) {
      console.error('Failed to toggle template:', err);
    }
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditedSubject(template.subject);
    setEditedContent(template.html_content);
    loadVersions(template.id);
    setShowEditor(true);
  };

  const handleSaveTemplate = async () => {
    if (!selectedTemplate) return;

    try {
      // Create new version
      const { error: versionError } = await supabase
        .from('email_template_versions')
        .insert({
          template_id: selectedTemplate.id,
          subject: selectedTemplate.subject,
          html_content: selectedTemplate.html_content,
          is_active: true,
        });

      if (versionError) throw versionError;

      // Update template
      const { error: templateError } = await supabase
        .from('email_templates')
        .update({
          subject: editedSubject,
          html_content: editedContent,
        })
        .eq('id', selectedTemplate.id);

      if (templateError) throw templateError;

      // Update local state
      setTemplates(prev =>
        prev.map(t =>
          t.id === selectedTemplate.id
            ? { ...t, subject: editedSubject, html_content: editedContent }
            : t
        )
      );

      setShowEditor(false);
    } catch (err) {
      console.error('Failed to save template:', err);
    }
  };

  const handleRestoreVersion = async (version: TemplateVersion) => {
    if (!selectedTemplate) return;

    try {
      const { error } = await supabase
        .from('email_templates')
        .update({
          subject: version.subject,
          html_content: version.html_content,
        })
        .eq('id', selectedTemplate.id);

      if (error) throw error;

      // Update local state
      setTemplates(prev =>
        prev.map(t =>
          t.id === selectedTemplate.id
            ? { ...t, subject: version.subject, html_content: version.html_content }
            : t
        )
      );

      setShowHistory(false);
      setShowEditor(false);
    } catch (err) {
      console.error('Failed to restore version:', err);
    }
  };

  if (!currentCompany) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-semibold text-dark-text-primary">
            No Company Selected
          </h2>
          <p className="text-dark-text-secondary">
            Please select a company to manage email templates
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-dark-text-primary">Email Templates</h1>
      <Button variant="primary" className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        New Template
      </Button>
    </div>
  
    {/* Error State */}
    {error && (
      <div className="p-4 bg-red-500/10 text-red-400 rounded-lg flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        {error}
      </div>
    )}
  
    {/* Loading State */}
    {isLoading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 bg-dark-secondary border border-dark-border rounded-lg animate-pulse">
            <div className="h-6 w-2/3 bg-gray-500/20 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-500/20 rounded"></div>
          </div>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-dark-secondary border border-dark-border p-6 rounded-lg shadow-lg transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              {/* Template Info */}
              <div className="flex items-center gap-4">
                <div className="p-2 bg-dark-accent/10 rounded-lg">
                  <Mail className="w-5 h-5 text-dark-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-dark-text-primary">{template.name}</h3>
                  <p className="text-sm text-dark-text-secondary">{template.subject}</p>
                </div>
              </div>
  
              {/* Toggle & Actions */}
              <div className="flex items-center gap-4">
                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    title={`Enable ${template.name}`}
                    checked={template.is_enabled}
                    onChange={() => handleToggleTemplate(template)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-dark-accent rounded-full peer
                      peer-checked:bg-dark-accent relative transition-all"
                  >
                    <div
                      className="absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full transition-transform
                        peer-checked:translate-x-5"
                    />
                  </div>
                </label>
  
                {/* Edit Button */}
                <Button
                  variant="outline"
                  onClick={() => handleEditTemplate(template)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dark-border text-dark-text-primary hover:bg-dark-accent hover:text-white transition-all"
                >
                  <Code className="w-4 h-4" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
      ))}
    </div>
  )}

    {/* Template Editor Modal */}
    <Modal
      isOpen={showEditor}
      onClose={() => setShowEditor(false)}
        title="Edit Email Template"
        className="max-w-4xl"
      >
        <div className="space-y-6">
          <FormField
            label="Subject"
            value={editedSubject}
            onChange={(e) => setEditedSubject(e.target.value)}
          />

          <div className="space-y-2">
            <label htmlFor="htmlContent" className="block text-sm font-medium text-dark-text-secondary">
              HTML Content
            </label>
            <textarea
              id="htmlContent"
              aria-label="HTML Content"
              placeholder="Enter HTML content for the email template"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={15}
              className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
                text-dark-text-primary font-mono text-sm
                focus:outline-none focus:ring-2 focus:ring-dark-accent/50"
            />
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2"
              >
                <History className="w-4 h-4" />
                Version History
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEditor(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTemplate}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Template Preview"
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: editedContent.replace(/{{([^}]+)}}/g, (_, p1) => `<span class="text-dark-accent">[${p1}]</span>`),
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowPreview(false)}>Close Preview</Button>
          </div>
        </div>
      </Modal>

      {/* Version History Modal */}
      <Modal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        title="Version History"
        className="max-w-2xl"
      >
        <div className="space-y-4">
          {versions.map(version => (
            <div
              key={version.id}
              className="p-4 bg-dark-primary rounded-lg border border-dark-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-dark-text-secondary">
                  {new Date(version.created_at).toLocaleString()}
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleRestoreVersion(version)}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restore
                </Button>
              </div>
              <div className="text-sm font-medium text-dark-text-primary mb-1">
                Subject: {version.subject}
              </div>
              <div className="text-sm text-dark-text-secondary">
                Modified by: {version.created_by}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};