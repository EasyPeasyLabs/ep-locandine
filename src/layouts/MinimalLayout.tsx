import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { ShapeRenderer } from '../components/ShapeRenderer';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { MoveableElement } from '../components/MoveableElement';

export const MinimalLayout = () => {
  const { data, setSelectedElementId, currentSize } = useFlyer();
  const { styles } = data;

  if (!styles) return null;

  return (
    <div 
      className="bg-white text-gray-800 relative overflow-hidden shadow-2xl origin-top-left" 
      id="flyer-content"
      style={{ 
        fontFamily: styles.global.fontFamily || '"Inter", sans-serif',
        width: `${currentSize.width}px`,
        height: `${currentSize.height}px`,
        backgroundColor: styles.body?.backgroundColor || '#ffffff'
      }}
      onClick={() => setSelectedElementId(null)}
    >
      {/* Header Shape - Minimal Line */}
      {data.elements['header-shape'] && data.elements['header-shape'].visible !== false && (
        <MoveableElement id="header-shape">
            <div 
                className="w-full h-2 transition-colors duration-300"
                style={{ backgroundColor: data.elements['header-shape'].style?.backgroundColor || '#000000' }}
            />
        </MoveableElement>
      )}

      {/* Enterprise Elements */}
      {['enterprise-logo', 'enterprise-name', 'enterprise-subtitle', 'enterprise-claim'].map(id => {
        const el = data.elements[id];
        if (!el || el.visible === false) return null;
        
        return (
            <MoveableElement key={id} id={id}>
                {el.type === 'image' ? (
                    el.content ? (
                        <img src={el.content} alt="Enterprise Logo" className="w-full h-full object-contain grayscale opacity-80" />
                    ) : (
                        <div className="w-full h-full border border-gray-200 flex items-center justify-center text-gray-300 text-[10px] text-center p-1 uppercase tracking-widest">
                            Logo
                        </div>
                    )
                ) : (
                    <div 
                        className="w-full h-full flex items-center"
                        style={{
                            fontSize: el.style?.fontSize,
                            color: el.style?.color || '#9ca3af',
                            textAlign: el.style?.textAlign || 'left',
                            fontWeight: el.style?.fontWeight || '400',
                            fontStyle: el.style?.fontStyle as any,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                        }}
                    >
                        {el.content}
                    </div>
                )}
            </MoveableElement>
        );
      })}

      {/* Moveable Title */}
      <MoveableElement id="header-title" className="z-20" style={{ left: 40, top: 180, width: 515, height: 80 }}>
        <h1 
            className="font-light tracking-tight w-full h-full leading-none"
            style={{ 
                fontSize: styles.title?.fontSize || '3.5rem',
                color: styles.title?.color || '#111827',
                textAlign: 'left'
            }}
        >
            {data.title}
        </h1>
      </MoveableElement>

      {/* Moveable Subtitle */}
      <MoveableElement id="header-subtitle" className="z-20" style={{ left: 40, top: 270, width: 515, height: 30 }}>
        <h2 
            className="font-medium w-full h-full tracking-widest uppercase"
            style={{
                fontSize: styles.subtitle?.fontSize || '0.875rem',
                color: styles.subtitle?.color || '#6b7280',
                textAlign: 'left'
            }}
        >
            {data.subtitle}
        </h2>
      </MoveableElement>

      {/* Moveable Description */}
      <MoveableElement id="body-description" className="z-10" style={{ left: 40, top: 330, width: 300, height: 150 }}>
          <p 
            className="font-light leading-relaxed w-full h-full"
            style={{ 
                fontSize: styles.description?.fontSize || '0.875rem',
                color: styles.description?.color || '#4b5563'
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
                  <img src={val.content} alt="User Upload" className="w-full h-full object-cover" draggable={false} />
              ) : (
                  <div className="w-full h-full border border-gray-200 flex items-center justify-center text-gray-300 text-[10px] text-center p-1 uppercase tracking-widest">
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

      {/* Footer Details */}
      <MoveableElement id="footer-details" style={{ left: 40, top: 650, width: 515, height: 80 }}>
        <div className="flex justify-between items-end w-full h-full border-b border-gray-200 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900">{data.locationName}</p>
            <p className="text-xs text-gray-500">{data.locationAddress}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Date & Time</p>
            <p className="text-sm font-medium text-gray-900">{new Date(data.date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <p className="text-xs text-gray-500">{data.timeStart} - {data.timeEnd}</p>
          </div>
        </div>
      </MoveableElement>

      {/* Footer Contacts */}
      <MoveableElement id="footer-contacts" style={{ left: 40, top: 750, width: 515, height: 40 }}>
          <div 
            className="w-full h-full flex justify-start gap-8 items-center text-[10px] tracking-widest uppercase"
            style={{ 
                color: styles.footer.color || '#9ca3af'
            }}
          >
            <div className="flex items-center gap-2">
                <Phone size={12} />
                <span>{data.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2">
                <Instagram size={12} />
                <span>{data.contactInstagram}</span>
            </div>
            <div className="flex items-center gap-2">
                <Facebook size={12} />
                <span>{data.contactFacebook}</span>
            </div>
          </div>
      </MoveableElement>
    </div>
  );
};
