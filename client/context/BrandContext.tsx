import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BrandContextType {
  selectedBrand: string | null;
  selectedCategory: string | null;
  selectBrand: (brand: string, category: string) => void;
  clearBrandSelection: () => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

interface BrandProviderProps {
  children: ReactNode;
}

export function BrandProvider({ children }: BrandProviderProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectBrand = (brand: string, category: string) => {
    setSelectedBrand(brand);
    setSelectedCategory(category);
  };

  const clearBrandSelection = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
  };

  return (
    <BrandContext.Provider value={{
      selectedBrand,
      selectedCategory,
      selectBrand,
      clearBrandSelection
    }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrandContext() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrandContext must be used within a BrandProvider');
  }
  return context;
}
