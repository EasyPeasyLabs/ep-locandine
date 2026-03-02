import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { Logo } from '../components/Logo';
import { ShapeRenderer } from '../components/ShapeRenderer';
import { Instagram, Facebook, Phone, Star } from 'lucide-react';
import { MoveableElement } from '../components/MoveableElement';

export const PlayfulLayout = () => {
  const { data, setSelectedElementId, currentSize } = useFlyer();
  const { styles } = data;

  if (!styles) return null;

  return (
    <div 
      className="bg-yellow-300 text-gray-900 relative overflow-hidden shadow-2xl origin-top-left" 
      id="flyer-content"
      style={{ 
        fontFamily: styles.global.fontFamily,
        width: `${currentSize.width}px`,
        height: `${currentSize.height}px`
      }}
      onClick={() => setSelectedElementId(null)}
    >
      {/* Background Elements (Static) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
            style={{ backgroundColor: styles.global.secondaryColor }}
        ></div>
        <div 
            className="absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
            style={{ backgroundColor: styles.global.primaryColor }}
        ></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full h-full p-6">
        <div className="w-full h-full border-8 border-white rounded-3xl bg-white/80 backdrop-blur-sm relative">
            
            {/* Enterprise Elements */}
            {['enterprise-logo', 'enterprise-name', 'enterprise-subtitle', 'enterprise-claim'].map(id => {
              const el = data.elements[id];
              if (!el || el.visible === false) return null;
              
              return (
                  <MoveableElement key={id} id={id} className="z-30">
                      {el.type === 'image' ? (
                          el.content ? (
                              <img src={el.content} alt="Enterprise Logo" className="w-full h-full object-contain" />
                          ) : (
                              <div className="w-full h-full border-4 border-dashed border-yellow-400 rounded-full flex items-center justify-center text-yellow-500 font-bold text-xs text-center p-1 bg-white">
                                  Logo
                              </div>
                          )
                      ) : (
                          <div 
                              className="w-full h-full flex items-center"
                              style={{
                                  fontSize: el.style?.fontSize,
                                  color: el.style?.color || '#1f2937',
                                  textAlign: el.style?.textAlign || 'left',
                                  fontWeight: el.style?.fontWeight || '900',
                                  fontStyle: el.style?.fontStyle as any
                              }}
                          >
                              {el.content}
                          </div>
                      )}
                  </MoveableElement>
              );
            })}

            {/* Moveable Header Logo (Legacy) */}
            <MoveableElement id="playful-logo" className="z-20" style={{ left: 200, top: 20, width: 120, height: 120 }}>
                <div className="inline-block relative w-full h-full">
                    {data.brandLogo ? (
                        <img src={data.brandLogo} alt="Brand Logo" className="w-full h-full object-contain relative z-10" />
                    ) : (
                        <Logo className="w-full h-full mx-auto relative z-10" />
                    )}
                    <Star className="absolute -top-4 -right-8 text-yellow-500 w-12 h-12 animate-spin-slow" fill="currentColor" />
                </div>
            </MoveableElement>

            {/* Moveable Title */}
            <MoveableElement id="playful-title" className="z-20" style={{ left: 50, top: 150, width: 450, height: 60 }}>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 transform -rotate-2 w-full h-full text-center">
                    {data.title}
                </h1>
            </MoveableElement>

            {/* Moveable Subtitle */}
            <MoveableElement id="playful-subtitle" className="z-20" style={{ left: 100, top: 210, width: 350, height: 40 }}>
                <p className="font-bold text-xl text-blue-500 tracking-widest w-full h-full text-center">{data.subtitle}</p>
            </MoveableElement>

            {/* Moveable Description */}
            <MoveableElement id="playful-description" className="z-20" style={{ left: 50, top: 260, width: 450, height: 80 }}>
                <div className="bg-white p-4 rounded-2xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 w-full h-full flex items-center justify-center">
                    <p 
                        className="text-center font-comic font-bold text-gray-700"
                        style={{
                            fontSize: styles.description?.fontSize || '1.125rem',
                            color: styles.description?.color || '#374151'
                        }}
                    >
                        {data.description}
                    </p>
                </div>
            </MoveableElement>

            {/* Dynamic Images */}
            {Object.entries(data.elements)
              .filter(([key, val]) => val.type === 'image' && !['enterprise-logo', 'header-logo'].includes(key) && val.visible !== false)
              .map(([key, val]) => (
                <MoveableElement key={key} id={key}>
                    {val.content ? (
                        <img src={val.content} alt="User Upload" className="w-full h-full object-cover rounded-3xl border-4 border-dashed border-gray-400" draggable={false} />
                    ) : (
                        <div className="w-full h-full border-4 border-dashed border-gray-400 rounded-3xl flex items-center justify-center text-gray-400 font-bold text-xs text-center p-1 bg-gray-100">
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

            {/* Legacy Main Image */}
            {!Object.values(data.elements).some(e => e.type === 'image') && data.mainImage && (
                <MoveableElement id="playful-main-image" style={{ left: 50, top: 360, width: 450, height: 250 }}>
                    <div className="w-full h-full bg-gray-200 rounded-3xl overflow-hidden shadow-inner border-4 border-dashed border-gray-400 relative">
                        <img src={data.mainImage} alt="Main" className="w-full h-full object-cover" draggable={false} />
                    </div>
                </MoveableElement>
            )}

            {/* Details Box 1 (Location) */}
            <MoveableElement id="playful-location" style={{ left: 30, top: 630, width: 230, height: 120 }}>
                <div 
                    className="w-full h-full p-4 rounded-2xl border-2 transform -rotate-1 relative overflow-hidden"
                    style={{ 
                        backgroundColor: `${styles.global.secondaryColor}20`,
                        borderColor: styles.global.secondaryColor
                    }}
                >
                    <h3 
                        className="font-black text-lg mb-1"
                        style={{ color: styles.global.secondaryColor }}
                    >
                        DOVE?
                    </h3>
                    <p className="font-bold text-gray-800 relative z-10">{data.locationName}</p>
                    <p className="text-sm text-gray-600 relative z-10">{data.locationAddress}</p>
                    {data.locationLogo && (
                        <img src={data.locationLogo} alt="Loc" className="absolute bottom-2 right-2 h-12 opacity-50 object-contain" />
                    )}
                </div>
            </MoveableElement>

            {/* Details Box 2 (Date) */}
            <MoveableElement id="playful-date" style={{ left: 280, top: 630, width: 230, height: 120 }}>
                <div 
                    className="w-full h-full p-4 rounded-2xl border-2 transform rotate-1"
                    style={{ 
                        backgroundColor: `${styles.global.primaryColor}20`,
                        borderColor: styles.global.primaryColor
                    }}
                >
                    <h3 
                        className="font-black text-lg mb-1"
                        style={{ color: styles.global.primaryColor }}
                    >
                        QUANDO?
                    </h3>
                    <p 
                        className="font-bold text-2xl"
                        style={{ color: styles.global.primaryColor }}
                    >
                        {new Date(data.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'numeric' })}
                    </p>
                    <p className="font-mono font-bold">{data.timeStart} - {data.timeEnd}</p>
                </div>
            </MoveableElement>

            {/* Footer */}
            <MoveableElement id="playful-footer" style={{ left: 50, top: 760, width: 450, height: 60 }}>
                <footer 
                    className="w-full h-full pt-2 border-t-2 border-gray-200"
                    style={{ 
                        backgroundColor: styles.footer.backgroundColor,
                        color: styles.footer.color
                    }}
                >
                    <div className="flex justify-center gap-6 mb-1">
                        <Phone className="w-5 h-5 opacity-80" />
                        <Instagram className="w-5 h-5 opacity-80" />
                        <Facebook className="w-5 h-5 opacity-80" />
                    </div>
                    <div className="text-center text-xs font-bold opacity-70">
                        {data.contactPhone} | @{data.contactInstagram}
                    </div>
                </footer>
            </MoveableElement>

        </div>
      </div>
    </div>
  );
};
