import React, { useState, useEffect } from 'react';
import { useFlyer } from '../context/FlyerContext';
import { Palette, Type, Layout, Box, Sliders, Trash2, PanelBottom, Eye, EyeOff } from 'lucide-react';

const COLORS = [
  '#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', // Blues
  '#b91c1c', '#dc2626', '#ef4444', '#f87171', // Reds
  '#047857', '#059669', '#10b981', '#34d399', // Greens
  '#7c2d12', '#d97706', '#f59e0b', '#fbbf24', '#facc15', // Yellows/Oranges
  '#ffffff', '#f3f4f6', '#d1d5db', '#9ca3af', '#4b5563', '#1f2937', '#000000' // Grays
];

const FONTS = [
  // Sans Serif
  { name: 'Inter (Default)', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Raleway', value: 'Raleway, sans-serif' },
  { name: 'Nunito', value: 'Nunito, sans-serif' },
  { name: 'Oswald', value: 'Oswald, sans-serif' },
  { name: 'Rubik', value: 'Rubik, sans-serif' },

  // Serif
  { name: 'Merriweather', value: 'Merriweather, serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
  { name: 'Roboto Slab', value: '"Roboto Slab", serif' },
  { name: 'Cinzel', value: 'Cinzel, serif' },
  
  // Display / Handwriting
  { name: 'Lobster', value: 'Lobster, display' },
  { name: 'Pacifico', value: 'Pacifico, handwriting' },
  { name: 'Dancing Script', value: '"Dancing Script", handwriting' },
  { name: 'Great Vibes', value: '"Great Vibes", handwriting' },
  { name: 'Satisfy', value: 'Satisfy, handwriting' },
  { name: 'Caveat', value: 'Caveat, handwriting' },
  { name: 'Bangers', value: 'Bangers, display' },
  { name: 'Anton', value: 'Anton, sans-serif' },

  // Bold / Display
  { name: 'Bebas Neue', value: '"Bebas Neue", sans-serif' },
  { name: 'Righteous', value: '"Righteous", display' },
  { name: 'Alfa Slab One', value: '"Alfa Slab One", display' },
  { name: 'Permanent Marker', value: '"Permanent Marker", handwriting' },
  { name: 'Creepster', value: '"Creepster", display' },
  { name: 'Fredoka One', value: '"Fredoka One", display' },
  { name: 'Titan One', value: '"Titan One", display' },
  { name: 'Russo One', value: '"Russo One", sans-serif' },
  { name: 'Luckiest Guy', value: '"Luckiest Guy", display' },
  { name: 'Black Ops One', value: '"Black Ops One", display' },

  // Monospace
  { name: 'Roboto Mono', value: '"Roboto Mono", monospace' },
  { name: 'Fira Code', value: '"Fira Code", monospace' },
];

export const StyleInspector = () => {
  const { data, updateData, selectedElementId, updateElementState, removeElement } = useFlyer();
  const [activeTab, setActiveTab] = useState<'global' | 'header' | 'body' | 'footer' | 'element'>('global');

  if (!data.styles) return null;

  // If an element is selected, switch to 'element' tab automatically
  useEffect(() => {
    if (selectedElementId) {
        setActiveTab('element');
    }
  }, [selectedElementId]);

  // Handle Delete Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
            // Prevent deleting if user is typing in an input
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') return;
            
            removeElement(selectedElementId);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, removeElement]);

  const updateStyle = (section: string, property: string, value: string) => {
    updateData(`styles.${section}.${property}`, value);
  };

  const selectedElement = selectedElementId ? data.elements[selectedElementId] : null;

  return (
    <div className="bg-white border-l border-gray-200 h-full flex flex-col w-80 shrink-0 shadow-xl overflow-y-auto">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="font-bold text-gray-700 flex items-center gap-2">
          <Sliders size={18} />
          Ispettore Stile
        </h2>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-5 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button 
          onClick={() => setActiveTab('global')}
          className={`p-3 flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'global' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          title="Stili Globali"
        >
          <Palette size={16} />
          <span>Global</span>
        </button>
        <button 
          onClick={() => setActiveTab('header')}
          className={`p-3 flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'header' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          title="Stili Intestazione"
        >
          <Layout size={16} />
          <span>Header</span>
        </button>
        <button 
          onClick={() => setActiveTab('body')}
          className={`p-3 flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'body' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          title="Stili Corpo"
        >
          <Box size={16} />
          <span>Corpo</span>
        </button>
        <button 
          onClick={() => setActiveTab('footer')}
          className={`p-3 flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'footer' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          title="Stili Footer"
        >
          <PanelBottom size={16} />
          <span>Footer</span>
        </button>
        
        {/* Element Tab Button - Always rendered but disabled/grayed out if no selection */}
        <button 
          onClick={() => selectedElementId && setActiveTab('element')}
          disabled={!selectedElementId}
          className={`p-3 flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'element' 
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
              : selectedElementId 
                ? 'text-gray-500 hover:bg-gray-50 cursor-pointer' 
                : 'text-gray-300 cursor-not-allowed'
          }`}
          title={selectedElementId ? "Proprietà Elemento Selezionato" : "Seleziona un elemento per modificare"}
        >
          <Sliders size={16} />
          <span>Elem.</span>
        </button>
      </div>

      <div className="p-6 space-y-8">
        
        {/* ELEMENT TAB (Dynamic) */}
        {activeTab === 'element' && selectedElement && (
            <div className="space-y-6">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4 flex justify-between items-center">
                    <div>
                        <p className="text-xs font-bold text-blue-800 uppercase">Elemento Selezionato</p>
                        <p className="text-sm text-blue-600 truncate w-32">{selectedElement.id}</p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => updateElementState(selectedElement.id, { visible: !selectedElement.visible })}
                            className={`p-2 rounded-lg transition-colors ${selectedElement.visible !== false ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-400'}`}
                            title={selectedElement.visible !== false ? "Nascondi" : "Mostra"}
                        >
                            {selectedElement.visible !== false ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button 
                            onClick={() => removeElement(selectedElement.id)}
                            className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                            title="Elimina Elemento"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Text Content Editor */}
                {selectedElement.type === 'text' && (
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Contenuto Testo</label>
                        <textarea 
                            value={selectedElement.content || ''}
                            onChange={(e) => updateElementState(selectedElement.id, { content: e.target.value })}
                            className="w-full p-2 border rounded-lg text-sm min-h-[80px]"
                        />
                    </div>
                )}

                {/* Dimensions Controls (New) */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Larghezza (px)</label>
                        <input 
                            type="number"
                            value={selectedElement.width}
                            onChange={(e) => updateElementState(selectedElement.id, { width: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded-lg text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Altezza (px)</label>
                        <input 
                            type="number"
                            value={selectedElement.height}
                            onChange={(e) => updateElementState(selectedElement.id, { height: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded-lg text-sm"
                        />
                    </div>
                </div>

                {/* Style Overrides */}
                {/* Shape Background Color */}
                {(selectedElement.type === 'shape' || selectedElement.id === 'header-shape') && (
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Colore Forma</label>
                        <div className="flex gap-2">
                            <input 
                                type="color" 
                                value={selectedElement.style?.backgroundColor || '#ffffff'}
                                onChange={(e) => updateElementState(selectedElement.id, { 
                                    style: { ...selectedElement.style, backgroundColor: e.target.value } 
                                })}
                                className="h-8 w-12 rounded cursor-pointer"
                            />
                            <span className="text-xs text-gray-400 self-center">{selectedElement.style?.backgroundColor || '#ffffff'}</span>
                        </div>
                    </div>
                )}

                {selectedElement.type === 'text' && (
                  <>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Dimensione Font</label>
                        <input 
                            type="range" min="0.5" max="5" step="0.1"
                            value={parseFloat(selectedElement.style?.fontSize || '1.5')}
                            onChange={(e) => updateElementState(selectedElement.id, { 
                                style: { ...selectedElement.style, fontSize: `${e.target.value}rem` } 
                            })}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Colore Testo</label>
                        <div className="flex gap-2">
                            <input 
                                type="color" 
                                value={selectedElement.style?.color || '#000000'}
                                onChange={(e) => updateElementState(selectedElement.id, { 
                                    style: { ...selectedElement.style, color: e.target.value } 
                                })}
                                className="h-8 w-12 rounded cursor-pointer"
                            />
                            <span className="text-xs text-gray-400 self-center">{selectedElement.style?.color || '#000000'}</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Allineamento</label>
                        <div className="flex border rounded-lg overflow-hidden">
                            {['left', 'center', 'right'].map((align) => (
                            <button
                                key={align}
                                onClick={() => updateElementState(selectedElement.id, { 
                                    style: { ...selectedElement.style, textAlign: align as any } 
                                })}
                                className={`flex-1 p-2 text-sm capitalize ${selectedElement.style?.textAlign === align ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            >
                                {align}
                            </button>
                            ))}
                        </div>
                    </div>
                  </>
                )}
                
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Ordine Livello (Z-Index)</label>
                    <input 
                        type="number"
                        value={selectedElement.zIndex}
                        onChange={(e) => updateElementState(selectedElement.id, { zIndex: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded-lg text-sm"
                    />
                </div>
            </div>
        )}

        {/* GLOBAL TAB */}
        {activeTab === 'global' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Font Principale</label>
              <select 
                value={data.styles.global.fontFamily}
                onChange={(e) => updateStyle('global', 'fontFamily', e.target.value)}
                className="w-full p-2 border rounded-lg text-sm"
              >
                {FONTS.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Colore Primario</label>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => updateStyle('global', 'primaryColor', c)}
                    className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm ${data.styles.global.primaryColor === c ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Colore Secondario</label>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => updateStyle('global', 'secondaryColor', c)}
                    className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm ${data.styles.global.secondaryColor === c ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HEADER TAB */}
        {activeTab === 'header' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Sfondo Header</label>
              <div className="flex gap-2 mb-2">
                 <input 
                    type="color" 
                    value={data.styles.header.backgroundColor}
                    onChange={(e) => updateStyle('header', 'backgroundColor', e.target.value)}
                    className="h-10 w-full rounded cursor-pointer"
                 />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => updateStyle('header', 'backgroundColor', c)}
                    className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm ${data.styles.header.backgroundColor === c ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Allineamento</label>
              <div className="flex border rounded-lg overflow-hidden">
                {['left', 'center', 'right'].map((align) => (
                  <button
                    key={align}
                    onClick={() => updateStyle('header', 'textAlign', align)}
                    className={`flex-1 p-2 text-sm capitalize ${data.styles.header.textAlign === align ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FOOTER TAB */}
        {activeTab === 'footer' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Sfondo Footer</label>
              <div className="flex gap-2 mb-2">
                 <input 
                    type="color" 
                    value={data.styles.footer.backgroundColor}
                    onChange={(e) => updateStyle('footer', 'backgroundColor', e.target.value)}
                    className="h-10 w-full rounded cursor-pointer"
                 />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => updateStyle('footer', 'backgroundColor', c)}
                    className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm ${data.styles.footer.backgroundColor === c ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Colore Testo</label>
              <div className="flex gap-2 mb-2">
                 <input 
                    type="color" 
                    value={data.styles.footer.color}
                    onChange={(e) => updateStyle('footer', 'color', e.target.value)}
                    className="h-10 w-full rounded cursor-pointer"
                 />
              </div>
               <div className="grid grid-cols-5 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => updateStyle('footer', 'color', c)}
                    className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm ${data.styles.footer.color === c ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BODY TAB */}
        {activeTab === 'body' && (
          <div className="space-y-6">
            {/* Body Background */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Sfondo Corpo</label>
              <div className="flex gap-2 mb-2">
                 <input 
                    type="color" 
                    value={data.styles.body.backgroundColor}
                    onChange={(e) => updateStyle('body', 'backgroundColor', e.target.value)}
                    className="h-10 w-full rounded cursor-pointer"
                 />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => updateStyle('body', 'backgroundColor', c)}
                    className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm ${data.styles.body.backgroundColor === c ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Title Styles */}
            <div className="border-t pt-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Type size={16}/> Titolo Evento</h3>
              <div className="space-y-3">
                <div>
                    <label className="text-xs text-gray-500 block mb-1">Dimensione</label>
                    <input 
                        type="range" min="1" max="5" step="0.1"
                        value={parseFloat(data.styles.title?.fontSize || '2.25')}
                        onChange={(e) => updateStyle('title', 'fontSize', `${e.target.value}rem`)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 block mb-1">Colore</label>
                    <div className="flex gap-2">
                        <input 
                            type="color" 
                            value={data.styles.title?.color || '#000000'}
                            onChange={(e) => updateStyle('title', 'color', e.target.value)}
                            className="h-8 w-12 rounded cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 self-center">{data.styles.title?.color || '#000000'}</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Subtitle Styles */}
            <div className="border-t pt-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Type size={14}/> Sottotitolo</h3>
              <div className="space-y-3">
                <div>
                    <label className="text-xs text-gray-500 block mb-1">Dimensione</label>
                    <input 
                        type="range" min="0.8" max="3" step="0.1"
                        value={parseFloat(data.styles.subtitle?.fontSize || '1.25')}
                        onChange={(e) => updateStyle('subtitle', 'fontSize', `${e.target.value}rem`)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 block mb-1">Colore</label>
                    <div className="flex gap-2">
                        <input 
                            type="color" 
                            value={data.styles.subtitle?.color || '#000000'}
                            onChange={(e) => updateStyle('subtitle', 'color', e.target.value)}
                            className="h-8 w-12 rounded cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 self-center">{data.styles.subtitle?.color || '#000000'}</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Description Styles */}
            <div className="border-t pt-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Type size={14}/> Descrizione</h3>
              <div className="space-y-3">
                <div>
                    <label className="text-xs text-gray-500 block mb-1">Dimensione</label>
                    <input 
                        type="range" min="0.8" max="2.5" step="0.1"
                        value={parseFloat(data.styles.description?.fontSize || '1.125')}
                        onChange={(e) => updateStyle('description', 'fontSize', `${e.target.value}rem`)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 block mb-1">Colore</label>
                    <div className="flex gap-2">
                        <input 
                            type="color" 
                            value={data.styles.description?.color || '#000000'}
                            onChange={(e) => updateStyle('description', 'color', e.target.value)}
                            className="h-8 w-12 rounded cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 self-center">{data.styles.description?.color || '#000000'}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
