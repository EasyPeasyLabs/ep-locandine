import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { ShapeRenderer } from '../components/ShapeRenderer';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { MoveableElement } from '../components/MoveableElement';

export const NeonLayout = () => {
  const { data, setSelectedElementId, currentSize } = useFlyer();
  const { styles } = data;

  if (!styles) return null;

  return (
    <div 
      className="bg-gray-900 text-white relative overflow-hidden shadow-2xl origin-top-left" 
      id="flyer-content"
      style={{ 
        fontFamily: styles.global.fontFamily || '"Outfit", sans-serif',
        width: `${currentSize.width}px`,
        height: `${currentSize.height}px`,
        backgroundColor: styles.body?.backgroundColor || '#111827'
      }}
      onClick={() => setSelectedElementId(null)}
    >
      {/* Header Shape - Neon Glow */}
      {data.elements['header-shape'] && data.elements['header-shape'].visible !== false && (
        <MoveableElement id="header-shape">
            <div 
                className="w-full h-full transition-colors duration-300 opacity-20 blur-3xl rounded-full"
                style={{ backgroundColor: data.elements['header-shape'].style?.backgroundColor || '#ec4899' }}
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
                        <img src={el.content} alt="Enterprise Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                    ) : (
                        <div className="w-full h-full border border-pink-500/50 rounded-lg flex items-center justify-center text-pink-500 text-xs text-center p-1 uppercase shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                            Logo
                        </div>
                    )
                ) : (
                    <div 
                        className="w-full h-full flex items-center"
                        style={{
                            fontSize: el.style?.fontSize,
                            color: el.style?.color || '#fbcfe8',
                            textAlign: el.style?.textAlign || 'left',
                            fontWeight: el.style?.fontWeight || '300',
                            fontStyle: el.style?.fontStyle as any,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            textShadow: '0 0 10px rgba(255,255,255,0.3)'
                        }}
                    >
                        {el.content}
                    </div>
                )}
            </MoveableElement>
        );
      })}

      {/* Moveable Title */}
      <MoveableElement id="header-title" className="z-20" style={{ left: 0, top: 200, width: 595, height: 100 }}>
        <h1 
            className="font-black tracking-tight w-full h-full uppercase flex items-center justify-center italic"
            style={{ 
                fontSize: styles.title?.fontSize || '4rem',
                color: styles.title?.color || '#ffffff',
                textAlign: 'center',
                textShadow: `0 0 20px ${styles.title?.color || '#ec4899'}, 0 0 40px ${styles.title?.color || '#ec4899'}`
            }}
        >
            {data.title}
        </h1>
      </MoveableElement>

      {/* Moveable Subtitle */}
      <MoveableElement id="header-subtitle" className="z-20" style={{ left: 0, top: 300, width: 595, height: 40 }}>
        <h2 
            className="font-medium w-full h-full tracking-[0.3em] uppercase flex items-center justify-center"
            style={{
                fontSize: styles.subtitle?.fontSize || '1rem',
                color: styles.subtitle?.color || '#38bdf8',
                textAlign: 'center',
                textShadow: `0 0 10px ${styles.subtitle?.color || '#38bdf8'}`
            }}
        >
            {data.subtitle}
        </h2>
      </MoveableElement>

      {/* Moveable Description */}
      <MoveableElement id="body-description" className="z-10" style={{ left: 97, top: 400, width: 400, height: 100 }}>
          <p 
            className="font-light leading-relaxed text-center w-full h-full flex items-center justify-center"
            style={{ 
                fontSize: styles.description?.fontSize || '1rem',
                color: styles.description?.color || '#9ca3af'
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
                  <img src={val.content} alt="User Upload" className="w-full h-full object-cover rounded-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]" draggable={false} />
              ) : (
                  <div className="w-full h-full border border-pink-500/50 rounded-xl flex items-center justify-center text-pink-500 text-[10px] text-center p-1 uppercase tracking-widest shadow-[0_0_10px_rgba(236,72,153,0.3)]">
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
              <div className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                <ShapeRenderer type={val.content} color={val.style?.backgroundColor || '#ec4899'} />
              </div>
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
                    fontWeight: val.style?.fontWeight,
                    textShadow: `0 0 8px ${val.style?.color}`
                }}
              >
                  {val.content}
              </div>
          </MoveableElement>
      ))}

      {/* Footer Details */}
      <MoveableElement id="footer-details" style={{ left: 47, top: 600, width: 500, height: 100 }}>
        <div className="flex justify-between items-center w-full h-full border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-sm">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-pink-500 mb-1 font-bold">Location</p>
            <p className="text-lg font-bold text-white">{data.locationName}</p>
            <p className="text-xs text-gray-400">{data.locationAddress}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-cyan-400 mb-1 font-bold">Date & Time</p>
            <p className="text-lg font-bold text-white">{new Date(data.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase()}</p>
            <p className="text-xs text-gray-400">{data.timeStart} - {data.timeEnd}</p>
          </div>
        </div>
      </MoveableElement>

      {/* Footer Contacts */}
      <MoveableElement id="footer-contacts" style={{ left: 0, top: 760, width: 595, height: 82 }}>
          <div 
            className="p-4 w-full h-full flex justify-center gap-8 items-center text-xs tracking-widest uppercase"
            style={{ 
                backgroundColor: styles.footer.backgroundColor || 'transparent',
                color: styles.footer.color || '#9ca3af'
            }}
          >
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Phone size={16} className="text-pink-500" />
                <span>{data.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Instagram size={16} className="text-pink-500" />
                <span>{data.contactInstagram}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Facebook size={16} className="text-pink-500" />
                <span>{data.contactFacebook}</span>
            </div>
          </div>
      </MoveableElement>
    </div>
  );
};
