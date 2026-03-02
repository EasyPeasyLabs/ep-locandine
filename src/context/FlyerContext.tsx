import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LayoutType = 'classic' | 'modern' | 'playful' | 'elegant' | 'brutalist' | 'minimal' | 'neon';

export interface ElementStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  textAlign?: 'left' | 'center' | 'right';
  opacity?: number;
}

export interface FlyerStyles {
  global: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  header: ElementStyle;
  title: ElementStyle;
  subtitle: ElementStyle;
  body: ElementStyle;
  footer: ElementStyle;
}

const defaultStyles: FlyerStyles = {
  global: {
    primaryColor: '#1e3a8a', // blue-900
    secondaryColor: '#facc15', // yellow-400
    backgroundColor: '#ffffff',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: '2rem',
    textAlign: 'left',
  },
  title: {
    fontSize: '2.25rem', // 4xl
    fontWeight: '700',
    color: '#facc15',
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: '1.25rem', // xl
    fontWeight: '300',
    color: '#bfdbfe', // blue-200
    fontFamily: 'sans-serif',
  },
  body: {
    backgroundColor: '#ffffff',
    color: '#1f2937', // gray-800
  },
  footer: {
    backgroundColor: '#2563eb', // blue-600
    color: '#ffffff',
  }
};

export type FormatType = 'flyer' | 'social';

export interface SizeConfig {
  id: string;
  name: string;
  width: number; // in pixels (for screen) or mm (for print, converted)
  height: number;
  unit: 'px' | 'mm';
}

export const FORMATS: Record<FormatType, SizeConfig[]> = {
  flyer: [
    { id: 'a6', name: 'A6', width: 105, height: 148, unit: 'mm' },
    { id: 'a5', name: 'A5', width: 148, height: 210, unit: 'mm' },
    { id: 'a4', name: 'A4', width: 210, height: 297, unit: 'mm' },
    { id: 'a3', name: 'A3', width: 297, height: 420, unit: 'mm' },
  ],
  social: [
    { id: 'instagram-post', name: 'Instagram Post', width: 1080, height: 1080, unit: 'px' },
    { id: 'instagram-portrait', name: 'Instagram Portrait', width: 1080, height: 1350, unit: 'px' },
    { id: 'instagram-story', name: 'Instagram Story / Reel', width: 1080, height: 1920, unit: 'px' },
    { id: 'facebook-post', name: 'Facebook Post', width: 1200, height: 630, unit: 'px' },
  ]
};

// Helper to convert mm to px (approx 96 DPI for screen preview, but we might need higher for export)
// 1 mm = 3.7795 px
const MM_TO_PX = 3.7795;

export const getPixelDimensions = (config: SizeConfig): { width: number, height: number } => {
    if (config.unit === 'px') return { width: config.width, height: config.height };
    return { width: Math.round(config.width * MM_TO_PX), height: Math.round(config.height * MM_TO_PX) };
};

export interface ElementState {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  type: 'text' | 'image' | 'shape';
  content?: string; // For text/image content
  style?: ElementStyle; // Specific style override
  visible?: boolean; // New: Visibility toggle
}

export interface FlyerData {
  title: string;
  subtitle: string;
  description: string;
  mainImage: string | null; // Deprecated
  images: string[];
  locationName: string;
  locationAddress: string;
  locationLogo: string | null;
  brandLogo: string | null;
  date: string;
  timeStart: string;
  timeEnd: string;
  contactPhone: string;
  contactInstagram: string;
  contactFacebook: string;
  styles: FlyerStyles;
  elements: Record<string, ElementState>; // New: Store position/size for each element
}

interface FlyerContextType {
  data: FlyerData;
  updateData: (key: keyof FlyerData | string, value: any) => void;
  selectedLayout: LayoutType;
  setSelectedLayout: (layout: LayoutType) => void;
  addImage: (image: string) => void;
  removeImage: (index: number) => void;
  updateElementState: (id: string, state: Partial<ElementState>) => void; // New
  selectedElementId: string | null; // New
  setSelectedElementId: (id: string | null) => void; // New
  setFormat: (format: FormatType, sizeId: string) => void;
  currentSize: { width: number, height: number };
  addText: (initialContent?: string) => void;
  addShape: (shapeType: string) => void;
}

const defaultData: FlyerData = {
  title: 'Titolo Evento',
  subtitle: 'Sottotitolo Evento',
  description: 'Descrizione dell\'evento qui...',
  mainImage: null,
  images: [],
  locationName: 'Sede Attività',
  locationAddress: 'Via Roma 1, Bari',
  locationLogo: null,
  brandLogo: null,
  date: new Date().toISOString().split('T')[0],
  timeStart: '16:00',
  timeEnd: '18:00',
  contactPhone: '340 523 4353',
  contactInstagram: 'easypeasylabs',
  contactFacebook: 'EasyPeasy Labs',
  styles: defaultStyles,
  elements: {
    'header-shape': {
      id: 'header-shape',
      type: 'shape',
      x: 0,
      y: 0,
      width: 595, // A4 width in px (approx)
      height: 150,
      rotation: 0,
      zIndex: 0,
      visible: true,
      style: {
        // Removed backgroundColor to allow fallback to styles.header.backgroundColor
      }
    },
    'enterprise-logo': {
        id: 'enterprise-logo',
        type: 'image',
        x: 20,
        y: 20,
        width: 80,
        height: 80,
        rotation: 0,
        zIndex: 10,
        visible: true,
        content: '', // Placeholder
    },
    'enterprise-name': {
        id: 'enterprise-name',
        type: 'text',
        x: 120,
        y: 20,
        width: 300,
        height: 40,
        rotation: 0,
        zIndex: 10,
        visible: true,
        content: 'EasyPeasy',
        style: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'left'
        }
    },
    'enterprise-subtitle': {
        id: 'enterprise-subtitle',
        type: 'text',
        x: 120,
        y: 60,
        width: 300,
        height: 30,
        rotation: 0,
        zIndex: 10,
        visible: true,
        content: 'Lemon Squeezy',
        style: {
            fontSize: '1rem',
            fontWeight: 'normal',
            color: '#bfdbfe',
            textAlign: 'left'
        }
    },
    'enterprise-claim': {
        id: 'enterprise-claim',
        type: 'text',
        x: 120,
        y: 90,
        width: 300,
        height: 30,
        rotation: 0,
        zIndex: 10,
        visible: true,
        content: 'Percorsi di avvicinamento...',
        style: {
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: '#93c5fd',
            textAlign: 'left'
        }
    }
  }, 
};

const FlyerContext = createContext<FlyerContextType | undefined>(undefined);

export const FlyerProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FlyerData>(() => {
    // Ensure styles are initialized even if loading old data
    return {
      ...defaultData,
      styles: defaultData.styles
    };
  });
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('classic');

  const updateData = (key: keyof FlyerData | string, value: any) => {
    setData((prev) => {
      // Handle nested style updates (e.g., "styles.header.backgroundColor")
      if (key.startsWith('styles.')) {
        const parts = key.split('.');
        // parts[0] is "styles", parts[1] is section (e.g., "header"), parts[2] is property (e.g., "backgroundColor")
        
        if (parts.length === 3) {
          const section = parts[1] as keyof FlyerStyles;
          const property = parts[2];
          
          return {
            ...prev,
            styles: {
              ...prev.styles,
              [section]: {
                ...prev.styles[section],
                [property]: value
              }
            }
          };
        }
        // Handle global styles (e.g., "styles.global.primaryColor")
        if (parts.length === 3 && parts[1] === 'global') {
             return {
                ...prev,
                styles: {
                    ...prev.styles,
                    global: {
                        ...prev.styles.global,
                        [parts[2]]: value
                    }
                }
             }
        }
      }

      return { ...prev, [key]: value };
    });
  };

  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const updateElementState = (id: string, state: Partial<ElementState>) => {
    setData((prev) => ({
      ...prev,
      elements: {
        ...prev.elements,
        [id]: {
          ...(prev.elements[id] || { id, x: 0, y: 0, width: 100, height: 100, rotation: 0, zIndex: 1, type: 'text', visible: true }), // Default if missing
          ...state
        }
      }
    }));
  };

  const addImage = (image: string) => {
    const newId = `image-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      images: [...(prev.images || []), image],
      mainImage: image,
      elements: {
        ...prev.elements,
        [newId]: {
          id: newId,
          type: 'image',
          content: image,
          x: 50,
          y: 200,
          width: 200,
          height: 200,
          rotation: 0,
          zIndex: Object.keys(prev.elements).length + 1
        }
      }
    }));
  };

  const addText = (initialContent: string = 'Nuovo Testo') => {
    const newId = `text-${Date.now()}`;
    console.log('Adding text with ID:', newId);
    setData((prev) => {
        const newElements = {
            ...prev.elements,
            [newId]: {
              id: newId,
              type: 'text',
              content: initialContent,
              x: 100,
              y: 300,
              width: 300,
              height: 50,
              rotation: 0,
              zIndex: Object.keys(prev.elements).length + 10,
              style: {
                fontSize: '1.5rem',
                color: '#000000',
                textAlign: 'center',
                fontWeight: 'bold'
              }
            }
        };
        return {
          ...prev,
          elements: newElements
        };
    });
    setSelectedElementId(newId);
  };

  const addShape = (shapeType: string) => {
    const newId = `shape-${Date.now()}`;
    setData((prev) => {
        const newElements = {
            ...prev.elements,
            [newId]: {
              id: newId,
              type: 'shape' as const,
              content: shapeType,
              x: 150,
              y: 300,
              width: 100,
              height: 100,
              rotation: 0,
              zIndex: Object.keys(prev.elements).length + 10,
              style: {
                backgroundColor: prev.styles.global.primaryColor || '#3b82f6',
              }
            }
        };
        return {
          ...prev,
          elements: newElements
        };
    });
    setSelectedElementId(newId);
  };

  const removeImage = (index: number) => {
    setData((prev) => {
      const newImages = [...(prev.images || [])];
      newImages.splice(index, 1);
      return {
        ...prev,
        images: newImages,
        mainImage: newImages.length > 0 ? newImages[0] : null
      };
    });
  };

  const removeElement = (id: string) => {
    setData((prev) => {
      const newElements = { ...prev.elements };
      delete newElements[id];
      return {
        ...prev,
        elements: newElements
      };
    });
    setSelectedElementId(null);
  };

  const setFormat = (format: FormatType, sizeId: string) => {
    setData(prev => ({ ...prev, format, sizeId }));
  };

  // Safety check: ensure format exists in FORMATS, fallback to flyer if not
  const currentFormatConfig = FORMATS[data.format] || FORMATS.flyer;
  
  // Safety check: ensure sizeId exists in the format, fallback to first size if not
  const currentSizeConfig = currentFormatConfig.find(s => s.id === data.sizeId) || currentFormatConfig[0];
  
  const currentSize = getPixelDimensions(currentSizeConfig);

  return (
    <FlyerContext.Provider value={{ 
        data, 
        updateData, 
        selectedLayout, 
        setSelectedLayout, 
        addImage, 
        removeImage,
        addText,
        addShape,
        updateElementState,
        removeElement,
        selectedElementId,
        setSelectedElementId,
        setFormat, // New
        currentSize // New
    }}>
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
