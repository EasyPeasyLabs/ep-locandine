import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LayoutType = 'classic' | 'modern' | 'playful';

export interface FlyerData {
  title: string;
  subtitle: string;
  description: string;
  mainImage: string | null;
  locationName: string;
  locationAddress: string;
  locationLogo: string | null;
  date: string;
  timeStart: string;
  timeEnd: string;
  contactPhone: string;
  contactInstagram: string;
  contactFacebook: string;
}

interface FlyerContextType {
  data: FlyerData;
  updateData: (key: keyof FlyerData, value: string | null) => void;
  selectedLayout: LayoutType;
  setSelectedLayout: (layout: LayoutType) => void;
}

const defaultData: FlyerData = {
  title: 'Easy Peasy',
  subtitle: 'Lemon Squeezy',
  description: 'Percorsi laboratoriali di avvicinamento alla lingua inglese',
  mainImage: null,
  locationName: 'Sede Attività',
  locationAddress: 'Via Roma 1, Bari',
  locationLogo: null,
  date: new Date().toISOString().split('T')[0],
  timeStart: '16:00',
  timeEnd: '18:00',
  contactPhone: '340 523 4353',
  contactInstagram: 'easypeasylabs',
  contactFacebook: 'EasyPeasy Labs',
};

const FlyerContext = createContext<FlyerContextType | undefined>(undefined);

export const FlyerProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FlyerData>(defaultData);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('classic');

  const updateData = (key: keyof FlyerData, value: string | null) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FlyerContext.Provider value={{ data, updateData, selectedLayout, setSelectedLayout }}>
      {children}
    </FlyerContext.Provider>
  );
};

export const useFlyer = () => {
  const context = useContext(FlyerContext);
  if (!context) {
    throw new Error('useFlyer must be used within a FlyerProvider');
  }
  return context;
};
