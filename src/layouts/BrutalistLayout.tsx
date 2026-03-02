import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { ShapeRenderer } from '../components/ShapeRenderer';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { MoveableElement } from '../components/MoveableElement';

export const BrutalistLayout = () => {
  const { data, setSelectedElementId, currentSize } = useFlyer();
  const { styles } = data;

  if (!styles) return null;

  return (
    <div 
      className="bg-white text-black relative overflow-hidden shadow-2xl origin-top-left border-8 border-black" 
      id="flyer-content"
      style={{ 
        fontFamily: styles.global.fontFamily || '"Space Grotesk", sans-serif',
        width: `${currentSize.width}px`,
        height: `${currentSize.height}px`,
        backgroundColor: styles.body?.backgroundColor || '#ffffff'
      }}
      onClick={() => setSelectedElementId(null)}
    >
      {/* Header Shape - Brutalist Block */}
      {data.elements['header-shape'] && data.elements['header-shape'].visible !== false && (
        <MoveableElement id="header-shape">
            <div 
                className="w-full h-full transition-colors duration-300 border-b-8 border-black"
                style={{ backgroundColor: data.elements['header-shape'].style?.backgroundColor || '#facc15' }}
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
                        <img src={el.content} alt="Enterprise Logo" className="w-full h-full object-contain border-4 border-black bg-white" />
                    ) : (
                        <div className="w-full h-full border-4 border-black bg-white flex items-center justify-center text-black font-bold text-xs text-center p-1 uppercase">
                            Logo
                        </div>
                    )
                ) : (
                    <div 
                        className="w-full h-full flex items-center border-2 border-black bg-white px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        style={{
                            fontSize: el.style?.fontSize,
                            color: el.style?.color || '#000000',
                            textAlign: el.style?.textAlign || 'left',
                            fontWeight: '900',
                            fontStyle: el.style?.fontStyle as any,
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
      <MoveableElement id="header-title" className="z-20" style={{ left: 20, top: 160, width: 550, height: 100 }}>
        <h1 
            className="font-black tracking-tighter w-full h-full uppercase leading-none"
            style={{ 
                fontSize: styles.title?.fontSize || '4.5rem',
                color: styles.title?.color || '#000000',
                textAlign: 'left',
                WebkitTextStroke: '2px black'
            }}
        >
            {data.title}
        </h1>
      </MoveableElement>

      {/* Moveable Subtitle */}
      <MoveableElement id="header-subtitle" className="z-20" style={{ left: 20, top: 260, width: 500, height: 50 }}>
        <h2 
            className="font-bold w-full h-full uppercase bg-black text-white px-4 py-2 inline-block shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]"
            style={{
                fontSize: styles.subtitle?.fontSize || '1.5rem',
                color: styles.subtitle?.color || '#ffffff',
                textAlign: 'left'
            }}
        >
            {data.subtitle}
        </h2>
      </MoveableElement>

      {/* Moveable Description */}
      <MoveableElement id="body-description" className="z-10" style={{ left: 20, top: 350, width: 400, height: 150 }}>
          <p 
            className="font-bold border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full h-full"
            style={{ 
                fontSize: styles.description?.fontSize || '1.125rem',
                color: styles.description?.color || '#000000'
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
                  <img src={val.content} alt="User Upload" className="w-full h-full object-cover border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grayscale hover:grayscale-0 transition-all" draggable={false} />
              ) : (
                  <div className="w-full h-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white flex items-center justify-center font-bold uppercase text-center p-1">
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
              <div className="w-full h-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <ShapeRenderer type={val.content} color={val.style?.backgroundColor || '#000000'} />
              </div>
          </MoveableElement>
      ))}

      {/* Dynamic Texts */}
      {Object.entries(data.elements)
        .filter(([key, val]) => val.type === 'text' && !['enterprise-name', 'enterprise-subtitle', 'enterprise-claim'].includes(key) && val.visible !== false)
        .map(([key, val]) => (
          <MoveableElement key={key} id={key}>
              <div 
                className="w-full h-full flex items-center justify-center font-bold border-2 border-black bg-white"
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
      <MoveableElement id="footer-details" style={{ left: 20, top: 550, width: 555, height: 180 }}>
        <div className="grid grid-cols-2 gap-0 border-4 border-black w-full h-full bg-white">
          <div className="p-4 border-r-4 border-black flex flex-col justify-center">
            <h3 className="font-black uppercase text-2xl mb-2">WHERE</h3>
            <p className="text-xl font-bold">{data.locationName}</p>
            <p className="text-md font-bold text-gray-600">{data.locationAddress}</p>
          </div>
          <div className="p-4 flex flex-col justify-center bg-yellow-400">
            <h3 className="font-black uppercase text-2xl mb-2">WHEN</h3>
            <p className="text-xl font-black">{new Date(data.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase()}</p>
            <p className="text-2xl font-black">{data.timeStart} - {data.timeEnd}</p>
          </div>
        </div>
      </MoveableElement>

      {/* Footer Contacts */}
      <MoveableElement id="footer-contacts" style={{ left: 0, top: 760, width: 595, height: 82 }}>
          <div 
            className="p-4 w-full h-full flex justify-between items-center font-black uppercase border-t-8 border-black"
            style={{ 
                backgroundColor: styles.footer.backgroundColor || '#000000',
                color: styles.footer.color || '#ffffff'
            }}
          >
            <div className="flex items-center gap-2">
                <Phone size={20} />
                <span>{data.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2">
                <Instagram size={20} />
                <span>{data.contactInstagram}</span>
            </div>
            <div className="flex items-center gap-2">
                <Facebook size={20} />
                <span>{data.contactFacebook}</span>
            </div>
          </div>
      </MoveableElement>
    </div>
  );
};
