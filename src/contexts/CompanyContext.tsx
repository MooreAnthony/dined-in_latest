import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Account } from '../types/accounts';
import { supabase } from '../services/supabase/config';

interface CompanyContextType {
  currentCompany: Account | null;
  setCurrentCompany: (company: Account | null) => void;
  isLoading: boolean;
  error: string | null;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCompany, setCurrentCompany] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  // Load initial company data
  useEffect(() => {
    const loadInitialCompany = async () => {
      try {
        const { data: companies, error: companiesError } = await supabase
          .from('companies')
          .select('id, name')
          .limit(1)
          .single()
          .throwOnError();

          console.log('Current company loaded:', companies);


        if (companiesError) throw companiesError;

        if (companies?.id) {
          // Get user role
          const { data: userRole } = await supabase
            .from('company_users')
            .select('role')
            .eq('company_id', companies.id)
            .single()
            .throwOnError();

          setCurrentCompany({
            id: companies.id,
            name: companies.name,
            role: userRole?.role || 'staff',
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load company data');
        console.error('Error loading company:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialCompany();
  }, []);
  return (
    <CompanyContext.Provider 
      value={{ 
        currentCompany, 
        setCurrentCompany, 
        isLoading, 
        error 
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};