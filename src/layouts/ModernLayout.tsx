import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { Logo } from '../components/Logo';
import { ShapeRenderer } from '../components/ShapeRenderer';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { MoveableElement } from '../components/MoveableElement';

export const ModernLayout = () => {
  const { data, setSelectedElementId, currentSize } = useFlyer();
  const { styles } = data;

  if (!styles) return null;

  return (
    <div 
      className="bg-slate-50 text-slate-900 relative overflow-hidden shadow-2xl origin-top-left" 
      id="flyer-content"
      style={{ 
        fontFamily: styles.global.fontFamily,
        width: `${currentSize.width}px`,
        height: `${currentSize.height}px`
      }}
      onClick={() => setSelectedElementId(null)}
    >
      {/* Header Background (Moveable Shape) */}
      {data.elements['header-shape'] && (
        <MoveableElement id="header-shape">
            <div 
                className="w-full h-full overflow-hidden"
                style={{ backgroundColor: data.elements['header-shape'].style?.backgroundColor || styles.global.primaryColor }}
            >
                <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12 scale-150">
                    {data.brandLogo ? (
                        <img src={data.brandLogo} alt="Brand Logo" className="w-64 h-64 object-contain" />
                    ) : (
                        <Logo className="w-64 h-64" />
                    )}
                </div>
            </div>
        </MoveableElement>
      )}

      {/* Moveable Title */}
      <MoveableElement id="modern-title" className="z-20" style={{ left: 40, top: 60, width: 500, height: 100 }}>
        <h1 className="text-5xl font-black tracking-tighter leading-none mb-2 text-white w-full h-full">
            {data.title.toUpperCase()}
        </h1>
      </MoveableElement>

      {/* Moveable Subtitle */}
      <MoveableElement id="modern-subtitle" className="z-20" style={{ left: 40, top: 160, width: 400, height: 40 }}>
        <div 
            className="inline-block px-3 py-1 text-sm font-bold uppercase tracking-widest w-full h-full flex items-center"
            style={{ 
                backgroundColor: styles.global.secondaryColor,
                color: '#ffffff' // Keep text white for contrast on secondary color
            }}
        >
            {data.subtitle}
        </div>
      </MoveableElement>

      {/* Moveable Description */}
      <MoveableElement id="modern-description" className="z-10" style={{ left: 300, top: 350, width: 250, height: 200 }}>
        <p 
            className="font-medium leading-relaxed text-slate-600 w-full h-full"
            style={{
                fontSize: styles.description?.fontSize || '1.25rem',
                color: styles.description?.color || '#475569'
            }}
        >
            {data.description}
        </p>
      </MoveableElement>

      {/* Enterprise Elements */}
      {['enterprise-logo', 'enterprise-name', 'enterprise-subtitle', 'enterprise-claim'].map(id => {
        const el = data.elements[id];
        if (!el || el.visible === false) return null;
        
        return (
            <MoveableElement key={id} id={id}>
                {el.type === 'image' ? (
                    el.content ? (
                        <img src={el.content} alt="Enterprise Logo" className="w-full h-full object-contain" />
                    ) : (
                        <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center p-1">
                            Logo
                        </div>
                    )
                ) : (
                    <div 
                        className="w-full h-full flex items-center"
                        style={{
                            fontSize: el.style?.fontSize,
                            color: el.style?.color || '#334155',
                            textAlign: el.style?.textAlign || 'left',
                            fontWeight: el.style?.fontWeight || '600',
                            fontStyle: el.style?.fontStyle as any
                        }}
                    >
                        {el.content}
                    </div>
                )}
            </MoveableElement>
        );
      })}

      {/* Dynamic Images */}
      {Object.entries(data.elements)
        .filter(([key, val]) => val.type === 'image' && !['enterprise-logo', 'header-logo'].includes(key) && val.visible !== false)
        .map(([key, val]) => (
          <MoveableElement key={key} id={key}>
              {val.content ? (
                  <img src={val.content} alt="User Upload" className="w-full h-full object-cover rounded-2xl shadow-lg" draggable={false} />
              ) : (
                  <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400 text-xs text-center p-1">
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

      {/* Legacy Main Image Migration */}
      {!Object.values(data.elements).some(e => e.type === 'image') && data.mainImage && (
          <MoveableElement id="modern-main-image" style={{ left: 40, top: 350, width: 240, height: 240 }}>
             <div className="w-full h-full bg-white shadow-lg rounded-2xl overflow-hidden relative">
                <img src={data.mainImage} alt="Main" className="w-full h-full object-cover" draggable={false} />
             </div>
          </MoveableElement>
      )}

      {/* Details Box 1 (Location) */}
      <MoveableElement id="modern-location" style={{ left: 40, top: 620, width: 240, height: 120 }}>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full h-full">
            <div className="flex justify-between items-start">
                <span 
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: styles.global.primaryColor }}
                >
                    Location
                </span>
                {data.locationLogo && <img src={data.locationLogo} alt="Location Logo" className="h-8 object-contain" />}
            </div>
            <div className="mt-2">
                <p className="text-lg font-bold">{data.locationName}</p>
                <p className="text-slate-500 text-sm">{data.locationAddress}</p>
            </div>
        </div>
      </MoveableElement>

      {/* Details Box 2 (Date) */}
      <MoveableElement id="modern-date" style={{ left: 300, top: 620, width: 240, height: 120 }}>
        <div 
            className="p-6 rounded-2xl border w-full h-full"
            style={{ 
                backgroundColor: `${styles.global.primaryColor}10`, // 10% opacity
                borderColor: `${styles.global.primaryColor}20`
            }}
        >
            <span 
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: styles.global.primaryColor }}
            >
                Date & Time
            </span>
            <div className="mt-2">
                    <p 
                        className="text-2xl font-black"
                        style={{ color: styles.global.primaryColor }}
                    >
                        {new Date(data.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
                    </p>
                    <p 
                        className="font-mono"
                        style={{ color: styles.global.secondaryColor }}
                    >
                        {data.timeStart} - {data.timeEnd}
                    </p>
            </div>
        </div>
      </MoveableElement>

      {/* Footer */}
      <MoveableElement id="modern-footer" style={{ left: 0, top: 760, width: 595, height: 82 }}>
        <footer 
            className="p-6 w-full h-full flex justify-between items-center"
            style={{ 
                backgroundColor: styles.footer.backgroundColor,
                color: styles.footer.color
            }}
        >
            <div className="flex items-center gap-4">
                {data.brandLogo ? (
                    <img src={data.brandLogo} alt="Brand Logo" className="w-12 h-12 object-contain" />
                ) : (
                    <Logo className="w-12 h-12" />
                )}
                <span className="text-xs font-mono uppercase tracking-widest">Official Event</span>
            </div>
            <div className="flex flex-col gap-2 text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                    <span>{data.contactInstagram}</span>
                    <Instagram size={14} />
                </div>
                <div className="flex items-center justify-end gap-2">
                    <span>{data.contactFacebook}</span>
                    <Facebook size={14} />
                </div>
                    <div className="flex items-center justify-end gap-2">
                    <span>{data.contactPhone}</span>
                    <Phone size={14} />
                </div>
            </div>
        </footer>
      </MoveableElement>
    </div>
  );
};
