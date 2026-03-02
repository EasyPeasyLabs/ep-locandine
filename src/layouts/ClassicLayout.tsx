import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { Logo } from '../components/Logo';
import { ShapeRenderer } from '../components/ShapeRenderer';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { MoveableElement } from '../components/MoveableElement';

export const ClassicLayout = () => {
  const { data, setSelectedElementId, currentSize } = useFlyer();
  const { styles } = data;

  if (!styles) return null;

  return (
    <div 
      className="bg-white text-gray-800 relative overflow-hidden shadow-2xl origin-top-left" 
      id="flyer-content"
      style={{ 
        fontFamily: styles.global.fontFamily,
        width: `${currentSize.width}px`,
        height: `${currentSize.height}px`,
        backgroundColor: styles.body?.backgroundColor || '#ffffff' // Fix Body Background
      }}
      onClick={() => setSelectedElementId(null)}
    >
      {/* Header Background (Moveable Shape) */}
      {data.elements['header-shape'] && data.elements['header-shape'].visible !== false && (
        <MoveableElement id="header-shape">
            <div 
                className="w-full h-full transition-colors duration-300"
                style={{ backgroundColor: data.elements['header-shape'].style?.backgroundColor || styles.header.backgroundColor }}
            />
        </MoveableElement>
      )}

      {/* Enterprise Elements (Placeholders) */}
      {['enterprise-logo', 'enterprise-name', 'enterprise-subtitle', 'enterprise-claim'].map(id => {
        const el = data.elements[id];
        if (!el || el.visible === false) return null;
        
        return (
            <MoveableElement key={id} id={id}>
                {el.type === 'image' ? (
                    el.content ? (
                        <img src={el.content} alt="Enterprise Logo" className="w-full h-full object-contain" />
                    ) : (
                        <div className="w-full h-full border-2 border-dashed border-white/50 rounded flex items-center justify-center text-white/50 text-xs text-center p-1">
                            Logo
                        </div>
                    )
                ) : (
                    <div 
                        className="w-full h-full flex items-center"
                        style={{
                            fontSize: el.style?.fontSize,
                            color: el.style?.color,
                            textAlign: el.style?.textAlign,
                            fontWeight: el.style?.fontWeight,
                            fontStyle: el.style?.fontStyle as any
                        }}
                    >
                        {el.content}
                    </div>
                )}
            </MoveableElement>
        );
      })}

      {/* Moveable Logo (Event Brand Logo) - Kept for backward compatibility or event specific logo */}
      <MoveableElement id="header-logo" className="z-20" style={{ left: 20, top: 20, width: 80, height: 80 }}>
          {data.brandLogo ? (
            <img src={data.brandLogo} alt="Brand Logo" className="w-full h-full object-contain" />
          ) : (
            // Only show placeholder if not using enterprise logo, or just keep it hidden/optional
            <div className="hidden"></div> 
          )}
      </MoveableElement>

      {/* Moveable Title */}
      <MoveableElement id="header-title" className="z-20" style={{ left: 120, top: 130, width: 400, height: 50 }}>
        <h1 
            className="font-bold font-serif tracking-wide w-full h-full"
            style={{ 
                fontSize: styles.title?.fontSize || '2.25rem',
                color: styles.title?.color || '#ffffff',
                textAlign: styles.header?.textAlign as any || 'center'
            }}
        >
            {data.title}
        </h1>
      </MoveableElement>

      {/* Moveable Subtitle */}
      <MoveableElement id="header-subtitle" className="z-20" style={{ left: 120, top: 180, width: 400, height: 30 }}>
        <h2 
            className="italic font-light w-full h-full"
            style={{
                fontSize: styles.subtitle?.fontSize || '1.25rem',
                color: styles.subtitle?.color || '#facc15',
                textAlign: styles.header?.textAlign as any || 'center'
            }}
        >
            {data.subtitle}
        </h2>
      </MoveableElement>

      {/* Moveable Description */}
      <MoveableElement id="body-description" className="z-10" style={{ left: 40, top: 250, width: 515, height: 60 }}>
          <p 
            className="font-medium uppercase tracking-wide text-center w-full h-full"
            style={{ 
                fontSize: styles.description?.fontSize || '1.125rem',
                color: styles.description?.color || styles.global.primaryColor 
            }}
          >
            {data.description}
          </p>
      </MoveableElement>

      {/* Dynamic Images */}
      {Object.entries(data.elements)
        .filter(([key, val]) => val.type === 'image' && !['enterprise-logo', 'header-logo'].includes(key) && val.visible !== false)
        .map(([key, val]) => (
          <MoveableElement key={key} id={key}>
              {val.content ? (
                  <img src={val.content} alt="User Upload" className="w-full h-full object-cover rounded-lg shadow-sm" draggable={false} />
              ) : (
                  <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center p-1">
                      Immagine Vuota
                  </div>
              )}
          </MoveableElement>
      ))}

      {/* Dynamic Shapes */}
      {Object.entries(data.elements)
        .filter(([key, val]) => val.type === 'shape' && !['header-shape'].includes(key) && val.visible !== false)
        .map(([key, val]) => (
          <MoveableElement key={key} id={key}>
              <ShapeRenderer type={val.content} color={val.style?.backgroundColor || '#000000'} />
          </MoveableElement>
      ))}

      {/* Dynamic Texts */}
      {Object.entries(data.elements)
        .filter(([key, val]) => val.type === 'text' && !['enterprise-name', 'enterprise-subtitle', 'enterprise-claim'].includes(key) && val.visible !== false)
        .map(([key, val]) => (
          <MoveableElement key={key} id={key}>
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                    fontSize: val.style?.fontSize,
                    color: val.style?.color,
                    textAlign: val.style?.textAlign,
                    fontWeight: val.style?.fontWeight
                }}
              >
                  {val.content}
              </div>
          </MoveableElement>
      ))}
      
      {/* If no images in elements map yet (migration), show mainImage as moveable */}
      {!Object.values(data.elements).some(e => e.type === 'image') && data.mainImage && (
          <MoveableElement id="legacy-main-image" style={{ left: 40, top: 230, width: 515, height: 300 }}>
              <img src={data.mainImage} alt="Main" className="w-full h-full object-cover rounded-xl border-2 border-dashed border-gray-300" draggable={false} />
          </MoveableElement>
      )}

      {/* Footer Details (Grouped for now, can be split) */}
      <MoveableElement id="footer-details" style={{ left: 40, top: 600, width: 515, height: 150 }}>
        <div 
            className="grid grid-cols-2 gap-6 p-6 rounded-xl border w-full h-full"
            style={{ 
                backgroundColor: `${styles.global.secondaryColor}20`, // 20% opacity
                borderColor: `${styles.global.secondaryColor}40`
            }}
        >
          <div className="space-y-2">
            <h3 
                className="font-bold uppercase text-sm"
                style={{ color: styles.global.primaryColor }}
            >
                Dove
            </h3>
            <p className="text-xl font-bold">{data.locationName}</p>
            <p className="text-gray-600">{data.locationAddress}</p>
          </div>
          <div className="space-y-2 text-right">
            <h3 
                className="font-bold uppercase text-sm"
                style={{ color: styles.global.primaryColor }}
            >
                Quando
            </h3>
            <p className="text-2xl font-bold text-red-600">{new Date(data.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}</p>
            <p className="text-lg font-mono">{data.timeStart} - {data.timeEnd}</p>
          </div>
        </div>
      </MoveableElement>

      {/* Footer Contacts */}
      <MoveableElement id="footer-contacts" style={{ left: 0, top: 780, width: 595, height: 62 }}>
          <div 
            className="p-4 w-full h-full flex justify-around items-center text-sm font-medium"
            style={{ 
                backgroundColor: styles.footer.backgroundColor,
                color: styles.footer.color
            }}
          >
            <div className="flex items-center gap-2">
                <Phone size={18} className="opacity-80" />
                <span>{data.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2">
                <Instagram size={18} className="opacity-80" />
                <span>{data.contactInstagram}</span>
            </div>
            <div className="flex items-center gap-2">
                <Facebook size={18} className="opacity-80" />
                <span>{data.contactFacebook}</span>
            </div>
          </div>
      </MoveableElement>
    </div>
  );
};
