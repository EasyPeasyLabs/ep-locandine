import React, { useRef, useState, useEffect } from 'react';
import { useFlyer, LayoutType } from '../context/FlyerContext';
import { ClassicLayout } from '../layouts/ClassicLayout';
import { ModernLayout } from '../layouts/ModernLayout';
import { PlayfulLayout } from '../layouts/PlayfulLayout';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Upload, Layout, Type, MapPin, Calendar, Phone, Instagram, Facebook, Save, FolderOpen } from 'lucide-react';
import { saveFlyer, loadFlyers, SavedFlyer } from '../services/flyerService';

export const FlyerEditor = () => {
  const { data, updateData, selectedLayout, setSelectedLayout } = useFlyer();
  const flyerRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [savedFlyers, setSavedFlyers] = useState<SavedFlyer[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: 'mainImage' | 'locationLogo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData(key, reader.result as string);
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

  const exportPDF = async () => {
    const element = document.getElementById('flyer-content');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('locandina.pdf');
  };

  const exportPNG = async () => {
    const element = document.getElementById('flyer-content');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const link = document.createElement('a');
    link.download = 'locandina.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 overflow-hidden relative">
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
      <div className="w-full lg:w-1/3 bg-white shadow-xl z-10 flex flex-col h-full overflow-y-auto border-r border-gray-200">
        <div className="p-6 bg-blue-900 text-white sticky top-0 z-20 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Layout className="w-6 h-6" />
                Editor
            </h2>
            <p className="text-blue-200 text-sm mt-1">Easy Peasy Flyer Creator</p>
          </div>
          <div className="flex gap-2">
              <button onClick={handleSave} disabled={isSaving} className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors" title="Salva su Firestore">
                  <Save size={20} />
              </button>
              <button onClick={handleLoadClick} className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors" title="Carica da Firestore">
                  <FolderOpen size={20} />
              </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Layout Selector */}
          <section>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layout size={16} /> Layout
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {(['classic', 'modern', 'playful'] as LayoutType[]).map((layout) => (
                <button
                  key={layout}
                  onClick={() => setSelectedLayout(layout)}
                  className={`p-3 rounded-xl border-2 transition-all ${
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

          {/* Images */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Upload size={16} /> Immagini
            </h3>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Immagine Principale</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="text-sm text-gray-500"><span className="font-semibold">Clicca per caricare</span></p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'mainImage')} />
                </label>
              </div>
            </div>

            <div className="space-y-3">
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
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin size={16} /> Luogo & Data
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={exportPDF}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl font-bold transition-colors shadow-lg"
                >
                    <Download size={20} /> PDF
                </button>
                <button
                    onClick={exportPNG}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold transition-colors shadow-lg"
                >
                    <Download size={20} /> PNG
                </button>
            </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-gray-200 p-8 overflow-auto flex items-center justify-center relative">
        <div className="transform scale-75 lg:scale-90 origin-center transition-transform duration-300 shadow-2xl" ref={flyerRef}>
          {selectedLayout === 'classic' && <ClassicLayout />}
          {selectedLayout === 'modern' && <ModernLayout />}
          {selectedLayout === 'playful' && <PlayfulLayout />}
        </div>
      </div>
    </div>
  );
};
