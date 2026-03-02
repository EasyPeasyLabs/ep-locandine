import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { ShapeRenderer } from '../components/ShapeRenderer';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { MoveableElement } from '../components/MoveableElement';

export const ElegantLayout = () => {
  const { data, setSelectedElementId, currentSize } = useFlyer();
  const { styles } = data;

  if (!styles) return null;

  return (
    <div 
      className="bg-[#fafaf9] text-stone-800 relative overflow-hidden shadow-2xl origin-top-left" 
      id="flyer-content"
      style={{ 
        fontFamily: styles.global.fontFamily,
        width: `${currentSize.width}px`,
        height: `${currentSize.height}px`,
        backgroundColor: styles.body?.backgroundColor || '#fafaf9'
      }}
      onClick={() => setSelectedElementId(null)}
    >
      {/* Header Background (Subtle) */}
      {data.elements['header-shape'] && data.elements['header-shape'].visible !== false && (
        <MoveableElement id="header-shape">
            <div 
                className="w-full h-full transition-colors duration-300 border-b border-stone-200"
                style={{ backgroundColor: data.elements['header-shape'].style?.backgroundColor || 'transparent' }}
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
                        <img src={el.content} alt="Enterprise Logo" className="w-full h-full object-contain" />
                    ) : (
                        <div className="w-full h-full border border-stone-300 rounded-full flex items-center justify-center text-stone-400 text-xs text-center p-1">
                            Logo
                        </div>
                    )
                ) : (
                    <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{
                            fontSize: el.style?.fontSize,
                            color: el.style?.color || '#44403c',
                            textAlign: 'center',
                            fontWeight: el.style?.fontWeight,
                            fontStyle: el.style?.fontStyle as any,
                            letterSpacing: '0.05em'
                        }}
                    >
                        {el.content}
                    </div>
                )}
            </MoveableElement>
        );
      })}

      {/* Moveable Title */}
      <MoveableElement id="header-title" className="z-20" style={{ left: 97, top: 180, width: 400, height: 60 }}>
        <h1 
            className="font-light font-serif tracking-widest w-full h-full uppercase flex items-center justify-center"
            style={{ 
                fontSize: styles.title?.fontSize || '2.5rem',
                color: styles.title?.color || '#292524',
                textAlign: 'center'
            }}
        >
            {data.title}
        </h1>
      </MoveableElement>

      {/* Moveable Subtitle */}
      <MoveableElement id="header-subtitle" className="z-20" style={{ left: 97, top: 250, width: 400, height: 30 }}>
        <h2 
            className="italic font-serif w-full h-full flex items-center justify-center"
            style={{
                fontSize: styles.subtitle?.fontSize || '1.25rem',
                color: styles.subtitle?.color || '#78716c',
                textAlign: 'center'
            }}
        >
            {data.subtitle}
        </h2>
      </MoveableElement>

      {/* Moveable Description */}
      <MoveableElement id="body-description" className="z-10" style={{ left: 97, top: 320, width: 400, height: 100 }}>
          <p 
            className="font-light leading-relaxed text-center w-full h-full flex items-center justify-center"
            style={{ 
                fontSize: styles.description?.fontSize || '1rem',
                color: styles.description?.color || '#57534e'
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
                  <img src={val.content} alt="User Upload" className="w-full h-full object-cover rounded-sm shadow-md" draggable={false} />
              ) : (
                  <div className="w-full h-full border border-stone-300 rounded-sm flex items-center justify-center text-stone-400 text-xs text-center p-1">
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
      <MoveableElement id="footer-details" style={{ left: 47, top: 600, width: 500, height: 120 }}>
        <div className="flex flex-col items-center justify-center border-t border-b border-stone-200 py-6 w-full h-full">
          <div className="flex justify-between w-full px-8">
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Location</p>
                <p className="font-serif text-stone-800">{data.locationName}</p>
                <p className="text-xs text-stone-500">{data.locationAddress}</p>
              </div>
              <div className="w-px bg-stone-200 h-12 self-center"></div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Date & Time</p>
                <p className="font-serif text-stone-800">{new Date(data.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="text-xs text-stone-500">{data.timeStart} - {data.timeEnd}</p>
              </div>
          </div>
        </div>
      </MoveableElement>

      {/* Footer Contacts */}
      <MoveableElement id="footer-contacts" style={{ left: 0, top: 780, width: 595, height: 62 }}>
          <div 
            className="p-4 w-full h-full flex justify-center gap-8 items-center text-xs tracking-wider uppercase"
            style={{ 
                backgroundColor: styles.footer.backgroundColor || 'transparent',
                color: styles.footer.color || '#78716c'
            }}
          >
            <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>{data.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2">
                <Instagram size={14} />
                <span>{data.contactInstagram}</span>
            </div>
            <div className="flex items-center gap-2">
                <Facebook size={14} />
                <span>{data.contactFacebook}</span>
            </div>
          </div>
      </MoveableElement>
    </div>
  );
};
