import React, { useRef, useState, useEffect } from 'react';
import { useFlyer, LayoutType } from '../context/FlyerContext';
import { ClassicLayout } from '../layouts/ClassicLayout';
import { ModernLayout } from '../layouts/ModernLayout';
import { PlayfulLayout } from '../layouts/PlayfulLayout';
import { ElegantLayout } from '../layouts/ElegantLayout';
import { BrutalistLayout } from '../layouts/BrutalistLayout';
import { MinimalLayout } from '../layouts/MinimalLayout';
import { NeonLayout } from '../layouts/NeonLayout';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { Download, Upload, Layout, Type, MapPin, Calendar, Phone, Instagram, Facebook, Save, FolderOpen, Share2, X, Plus, Minus, Maximize, Shapes } from 'lucide-react';
import { saveFlyer, loadFlyers, SavedFlyer } from '../services/flyerService';
import { saveLocation, loadLocations, LocationData } from '../services/locationService';
import { ExportModal, PrintFormat, SocialFormat } from './ExportModal';
import { StyleInspector } from './StyleInspector';
import { FormatSelector } from './FormatSelector';
import { EnterpriseSettings } from './EnterpriseSettings';
import { Building2 } from 'lucide-react';

export const FlyerEditor = () => {
  const { data, updateData, selectedLayout, setSelectedLayout, addImage, removeImage, addText, addShape } = useFlyer();
  const flyerRef = useRef<HTMLDivElement>(null);
  const [selectedShape, setSelectedShape] = useState<string>('square');
  const [isSaving, setIsSaving] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);
  const [showInspector, setShowInspector] = useState(true); // Default open
  const [savedFlyers, setSavedFlyers] = useState<SavedFlyer[]>([]);
  const [savedLocations, setSavedLocations] = useState<LocationData[]>([]);
  const [zoom, setZoom] = useState(0.6); // Default zoom

  useEffect(() => {
    const fetchLocations = async () => {
      const locs = await loadLocations();
      setSavedLocations(locs);
    };
    fetchLocations();
  }, []);

  const handleSaveLocation = async () => {
    if (!data.locationName || !data.locationAddress) {
      alert('Inserisci sia il nome che l\'indirizzo della sede per salvarla.');
      return;
    }
    const id = await saveLocation({ 
      name: data.locationName, 
      address: data.locationAddress,
      logo: data.locationLogo || null
    });
    if (id) {
      alert('Sede salvata con successo!');
      const locs = await loadLocations();
      setSavedLocations(locs);
    } else {
      alert('Errore durante il salvataggio della sede.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: 'mainImage' | 'locationLogo' | 'brandLogo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (key === 'mainImage') {
            addImage(reader.result as string);
        } else {
            updateData(key, reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveFlyer(data, selectedLayout);
      alert('Locandina salvata con successo!');
    } catch (error) {
      console.error(error);
      alert('Errore durante il salvataggio. Verifica la configurazione Firebase.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadClick = async () => {
      try {
          const flyers = await loadFlyers();
          setSavedFlyers(flyers);
          setShowLoadModal(true);
      } catch (error) {
          console.error(error);
          alert('Errore durante il caricamento. Verifica la configurazione Firebase.');
      }
  }

  const loadSelectedFlyer = (flyer: SavedFlyer) => {
      // Update context data
      Object.entries(flyer.data).forEach(([key, value]) => {
          updateData(key as any, value);
      });
      setSelectedLayout(flyer.layout);
      setShowLoadModal(false);
  }

  const handleExportPrint = async (format: PrintFormat) => {
    const element = document.getElementById('flyer-content');
    if (!element) return;

    try {
      // Generate high-res image (scale 4 for print quality)
      const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 4 });
      
      // A4 dimensions in mm (default base)
      // A3 = A4 * 1.414
      // A5 = A4 / 1.414
      // A6 = A5 / 1.414
      
      const pdf = new jsPDF('p', 'mm', format.toLowerCase());
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`locandina-${format}.pdf`);
      setShowExportModal(false);
    } catch (err) {
      console.error('Errore esportazione PDF:', err);
      alert('Errore durante l\'esportazione del PDF.');
    }
  };

  const handleExportSocial = async (format: SocialFormat) => {
    const element = document.getElementById('flyer-content');
    if (!element) return;

    try {
      // 1. Capture the flyer as a high-quality image
      const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 3 });
      
      // 2. Create a canvas to compose the final social image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = 1080;
      let height = 1080;

      if (format === 'post-portrait') {
        height = 1350; // 4:5
      } else if (format === 'story') {
        height = 1920; // 9:16
      }

      canvas.width = width;
      canvas.height = height;

      // 3. Fill background (white or a theme color based on layout)
      let bgColor = '#ffffff';
      if (selectedLayout === 'modern') bgColor = '#f8fafc'; // slate-50
      if (selectedLayout === 'playful') bgColor = '#fde047'; // yellow-300
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // 4. Load the captured flyer image
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => { img.onload = resolve; });

      // 5. Calculate positioning (contain logic)
      // The flyer is A4 (approx 1:1.414)
      // We want to fit it nicely within the social bounds
      
      const flyerAspect = img.width / img.height;
      const canvasAspect = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (format === 'story') {
         // For stories, we might want to fill width and have some space top/bottom
         // or if it's too tall, fit height.
         // A4 is wider than 9:16, so it will likely fit width-wise with bars top/bottom.
         drawWidth = width * 0.9; // 90% width for some padding
         drawHeight = drawWidth / flyerAspect;
         offsetX = (width - drawWidth) / 2;
         offsetY = (height - drawHeight) / 2;
      } else {
         // For square/portrait, fit height mostly
         drawHeight = height * 0.95;
         drawWidth = drawHeight * flyerAspect;
         
         if (drawWidth > width) {
             drawWidth = width * 0.95;
             drawHeight = drawWidth / flyerAspect;
         }
         
         offsetX = (width - drawWidth) / 2;
         offsetY = (height - drawHeight) / 2;
      }

      // Add a shadow effect
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // 6. Download
      const link = document.createElement('a');
      link.download = `locandina-${format}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setShowExportModal(false);

    } catch (err) {
      console.error('Errore esportazione PNG:', err);
      alert('Errore durante l\'esportazione dell\'immagine.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 overflow-hidden relative">
      <ExportModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)}
        onExportPrint={handleExportPrint}
        onExportSocial={handleExportSocial}
      />

      <EnterpriseSettings 
        isOpen={showEnterpriseModal} 
        onClose={() => setShowEnterpriseModal(false)} 
      />

      {/* Load Modal */}
      {showLoadModal && (
          <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4">Carica Progetto</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedFlyers.map(flyer => (
                          <div key={flyer.id} onClick={() => loadSelectedFlyer(flyer)} className="border p-4 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                              <p className="font-bold">{flyer.data.title}</p>
                              <p className="text-sm text-gray-500">{new Date(flyer.createdAt).toLocaleString()}</p>
                              <p className="text-xs text-blue-600 uppercase mt-1">{flyer.layout}</p>
                          </div>
                      ))}
                      {savedFlyers.length === 0 && <p>Nessun progetto salvato trovato.</p>}
                  </div>
                  <button onClick={() => setShowLoadModal(false)} className="mt-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg w-full">Chiudi</button>
              </div>
          </div>
      )}

      {/* Sidebar Editor */}
      <div className="w-full lg:w-96 shrink-0 bg-white shadow-xl z-10 flex flex-col h-full overflow-y-auto border-r border-gray-200">
        <div className="p-6 bg-blue-900 text-white sticky top-0 z-20 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Layout className="w-6 h-6" />
                Editor
            </h2>
            <p className="text-blue-200 text-sm mt-1">Easy Peasy Flyer Creator</p>
          </div>
          <div className="flex gap-2">
              <button onClick={() => setShowEnterpriseModal(true)} className="p-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors" title="Impostazioni Azienda">
                  <Building2 size={20} />
              </button>
              <button onClick={handleSave} disabled={isSaving} className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors" title="Salva su Firestore">
                  <Save size={20} />
              </button>
              <button onClick={handleLoadClick} className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors" title="Carica da Firestore">
                  <FolderOpen size={20} />
              </button>
          </div>
        </div>



        <div className="p-6 space-y-8">
          
          {/* Format Selector (New) */}
          <FormatSelector />

          {/* Brand Identity Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Upload size={16} /> Logo & Brand
            </h3>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Logo Aziendale</label>
              <div className="flex items-center gap-4">
                  {data.brandLogo ? (
                    <div className="relative group">
                      <img src={data.brandLogo} alt="Brand Logo" className="h-16 w-16 object-contain border rounded-lg bg-white" />
                      <button 
                        onClick={() => updateData('brandLogo', null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Rimuovi logo"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="h-16 w-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400">
                      <span className="text-xs text-center">Nessun Logo</span>
                    </div>
                  )}
                  
                  <label className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 mr-2" />
                    {data.brandLogo ? 'Cambia Logo' : 'Carica Logo'}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'brandLogo')} />
                  </label>
              </div>
              <p className="text-xs text-gray-500">Carica il tuo logo originale (PNG consigliato). Sostituirà il logo predefinito.</p>
            </div>
          </section>

          {/* Layout Selector */}
          <section>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layout size={16} /> Layout
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(['classic', 'modern', 'playful', 'elegant', 'brutalist', 'minimal', 'neon'] as LayoutType[]).map((layout) => (
                <button
                  key={layout}
                  onClick={() => setSelectedLayout(layout)}
                  className={`p-3 rounded-xl border-2 transition-all text-xs ${
                    selectedLayout === layout
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {layout.charAt(0).toUpperCase() + layout.slice(1)}
                </button>
              ))}
            </div>
          </section>

          {/* Content Inputs */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Type size={16} /> Contenuti
            </h3>
            
            {/* Add Custom Text */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 space-y-2">
                <label className="block text-xs font-bold text-blue-800 uppercase">Nuovo Testo Libero</label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Es: Ospite Speciale..." 
                        className="flex-1 p-2 text-sm border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const target = e.target as HTMLInputElement;
                                if (target.value.trim()) {
                                    addText(target.value);
                                    target.value = '';
                                }
                            }
                        }}
                        id="new-text-input"
                    />
                    <button 
                        onClick={() => {
                            const input = document.getElementById('new-text-input') as HTMLInputElement;
                            if (input && input.value.trim()) {
                                addText(input.value);
                                input.value = '';
                            }
                        }}
                        className="bg-blue-600 text-white px-3 py-2 rounded font-bold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Aggiungi
                    </button>
                </div>
                <p className="text-xs text-blue-400">Premi Invio o clicca Aggiungi</p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Titolo Evento</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => updateData('title', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Titolo"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Sottotitolo</label>
              <input
                type="text"
                value={data.subtitle}
                onChange={(e) => updateData('subtitle', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Sottotitolo"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Descrizione</label>
              <textarea
                value={data.description}
                onChange={(e) => updateData('description', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24 resize-none"
                placeholder="Descrizione dell'evento..."
              />
            </div>
          </section>

          {/* Shapes */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shapes size={16} /> Forme
            </h3>
            
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 space-y-2">
                <label className="block text-xs font-bold text-blue-800 uppercase">Aggiungi Forma</label>
                <div className="flex gap-2">
                    <select 
                        value={selectedShape}
                        onChange={(e) => setSelectedShape(e.target.value)}
                        className="flex-1 p-2 text-sm border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                        <option value="square">Quadrato</option>
                        <option value="rounded-square">Quadrato Arrotondato</option>
                        <option value="circle">Cerchio</option>
                        <option value="triangle">Triangolo</option>
                        <option value="star">Stella</option>
                        <option value="hexagon">Esagono</option>
                        <option value="pentagon">Pentagono</option>
                    </select>
                    <button 
                        onClick={() => addShape(selectedShape)}
                        className="bg-blue-600 text-white px-3 py-2 rounded font-bold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Aggiungi
                    </button>
                </div>
            </div>
          </section>

          {/* Images */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Upload size={16} /> Immagini
            </h3>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Galleria Foto ({data.images?.length || 0})</label>
              
              {/* Image Grid */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                {data.images?.map((img, index) => (
                    <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                        <button 
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                            title="Rimuovi foto"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
                
                {/* Add Button */}
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all text-gray-400 hover:text-blue-500">
                    <Upload size={20} />
                    <span className="text-xs mt-1 font-medium">Aggiungi</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'mainImage')} />
                </label>
              </div>
              <p className="text-xs text-gray-500">Puoi caricare più foto. Verranno disposte automaticamente nel layout.</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700">Logo Sede (Opzionale)</label>
              <div className="flex items-center gap-4">
                  {data.locationLogo && <img src={data.locationLogo} alt="Preview" className="h-12 w-12 object-contain border rounded" />}
                  <label className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Carica Logo
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'locationLogo')} />
                  </label>
              </div>
            </div>
          </section>

          {/* Location & Date */}
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={16} /> Luogo & Data
              </h3>
              <button 
                onClick={handleSaveLocation}
                className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors"
                title="Salva questa sede nel database"
              >
                <Save size={12} /> Salva Sede
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {savedLocations.length > 0 && (
                <select 
                  className="w-full p-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  onChange={(e) => {
                    const loc = savedLocations.find(l => l.id === e.target.value);
                    if (loc) {
                      updateData('locationName', loc.name);
                      updateData('locationAddress', loc.address);
                      updateData('locationLogo', loc.logo || null);
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>-- Carica una sede salvata --</option>
                  {savedLocations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} ({loc.address})</option>
                  ))}
                </select>
              )}
              
              <input
                type="text"
                value={data.locationName}
                onChange={(e) => updateData('locationName', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome Luogo"
              />
              <input
                type="text"
                value={data.locationAddress}
                onChange={(e) => updateData('locationAddress', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Indirizzo"
              />
              <input
                type="date"
                value={data.date}
                onChange={(e) => updateData('date', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <input
                  type="time"
                  value={data.timeStart}
                  onChange={(e) => updateData('timeStart', e.target.value)}
                  className="w-1/2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="time"
                  value={data.timeEnd}
                  onChange={(e) => updateData('timeEnd', e.target.value)}
                  className="w-1/2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Contacts */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Phone size={16} /> Contatti
            </h3>
            
            <div className="space-y-3">
               <div className="flex items-center gap-2">
                  <Phone size={18} className="text-gray-400" />
                  <input
                    type="text"
                    value={data.contactPhone}
                    onChange={(e) => updateData('contactPhone', e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Telefono"
                  />
               </div>
               <div className="flex items-center gap-2">
                  <Instagram size={18} className="text-gray-400" />
                  <input
                    type="text"
                    value={data.contactInstagram}
                    onChange={(e) => updateData('contactInstagram', e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Instagram"
                  />
               </div>
               <div className="flex items-center gap-2">
                  <Facebook size={18} className="text-gray-400" />
                  <input
                    type="text"
                    value={data.contactFacebook}
                    onChange={(e) => updateData('contactFacebook', e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Facebook"
                  />
               </div>
            </div>
          </section>
        </div>
        
        {/* Actions Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 sticky bottom-0 z-20">
            <button
                onClick={() => setShowExportModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-colors shadow-lg text-lg"
            >
                <Download size={24} /> Esporta / Stampa
            </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-gray-200 relative z-0 flex flex-col h-full overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-8">
            <div 
                className="transform transition-transform duration-200 ease-out shadow-2xl origin-center"
                style={{ transform: `scale(${zoom})` }}
                ref={flyerRef}
            >
                {selectedLayout === 'classic' && <ClassicLayout />}
                {selectedLayout === 'modern' && <ModernLayout />}
                {selectedLayout === 'playful' && <PlayfulLayout />}
                {selectedLayout === 'elegant' && <ElegantLayout />}
                {selectedLayout === 'brutalist' && <BrutalistLayout />}
                {selectedLayout === 'minimal' && <MinimalLayout />}
                {selectedLayout === 'neon' && <NeonLayout />}
            </div>
        </div>

        {/* Zoom Controls - Centered Bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg flex items-center gap-2 p-2 border border-gray-200 z-40">
            <button 
                onClick={() => setZoom(z => Math.max(0.2, z - 0.1))}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                title="Zoom Out"
            >
                <Minus size={16} />
            </button>
            <span className="text-xs font-bold w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button 
                onClick={() => setZoom(z => Math.min(2, z + 0.1))}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                title="Zoom In"
            >
                <Plus size={16} />
            </button>
            <button 
                onClick={() => setZoom(0.6)} // Reset to fit
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600 border-l ml-1"
                title="Reset Zoom"
            >
                <Maximize size={14} />
            </button>
        </div>
      </div>

      {/* Style Inspector (Right Column) */}
      {showInspector && data.styles && (
        <div className="hidden xl:block shrink-0">
            <StyleInspector />
        </div>
      )}
    </div>
  );
};
