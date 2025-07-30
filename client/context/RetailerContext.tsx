import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RetailerContextType {
  selectedRetailers: string[];
  toggleRetailer: (retailer: string) => void;
  isRetailerSelected: (retailer: string) => boolean;
  clearAllRetailers: () => void;
  selectAllRetailers: () => void;
}

const RetailerContext = createContext<RetailerContextType | undefined>(undefined);

export function useRetailerContext() {
  const context = useContext(RetailerContext);
  if (context === undefined) {
    throw new Error('useRetailerContext must be used within a RetailerProvider');
  }
  return context;
}

interface RetailerProviderProps {
  children: ReactNode;
}

export function RetailerProvider({ children }: RetailerProviderProps) {
  // Start with all retailers selected by default
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([
    'amazon', 'flipkart', 'apple', 'samsung', 'sony', 'ebay'
  ]);

  const toggleRetailer = (retailer: string) => {
    setSelectedRetailers(prev => 
      prev.includes(retailer)
        ? prev.filter(r => r !== retailer)
        : [...prev, retailer]
    );
  };

  const isRetailerSelected = (retailer: string) => {
    return selectedRetailers.includes(retailer);
  };

  const clearAllRetailers = () => {
    setSelectedRetailers([]);
  };

  const selectAllRetailers = () => {
    setSelectedRetailers(['amazon', 'flipkart', 'apple', 'samsung', 'sony', 'ebay', 'zomato', 'swiggy', 'zara']);
  };

  return (
    <RetailerContext.Provider value={{
      selectedRetailers,
      toggleRetailer,
      isRetailerSelected,
      clearAllRetailers,
      selectAllRetailers
    }}>
      {children}
    </RetailerContext.Provider>
  );
}
