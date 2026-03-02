import React from 'react';
import { Download, X, Printer, Smartphone, Share2 } from 'lucide-react';

export type PrintFormat = 'A6' | 'A5' | 'A4' | 'A3';
export type SocialFormat = 'post-square' | 'post-portrait' | 'story';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportPrint: (format: PrintFormat) => void;
  onExportSocial: (format: SocialFormat) => void;
}

export const ExportModal = ({ isOpen, onClose, onExportPrint, onExportSocial }: ExportModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Header Mobile */}
        <div className="md:hidden p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-lg">Esporta Locandina</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full"><X size={20} /></button>
        </div>

        {/* Section: Stampa (PDF) */}
        <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 bg-blue-50/30">
          <div className="flex items-center gap-3 mb-6 text-blue-900">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Printer size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Stampa (PDF)</h3>
              <p className="text-sm text-blue-600/80">Alta risoluzione vettoriale</p>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => onExportPrint('A6')} className="w-full text-left p-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all group shadow-sm hover:shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800 group-hover:text-blue-700">Formato A6</span>
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">10.5 x 14.8 cm</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Piccolo come una cartolina postale.</p>
            </button>

            <button onClick={() => onExportPrint('A5')} className="w-full text-left p-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all group shadow-sm hover:shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800 group-hover:text-blue-700">Formato A5</span>
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">14.8 x 21.0 cm</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Metà foglio standard. Ideale per flyer.</p>
            </button>

            <button onClick={() => onExportPrint('A4')} className="w-full text-left p-4 bg-white hover:bg-blue-50 border border-blue-500 ring-1 ring-blue-500 rounded-xl transition-all shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">CONSIGLIATO</div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-900">Formato A4</span>
                <span className="text-xs font-mono bg-blue-100 px-2 py-1 rounded text-blue-700">21.0 x 29.7 cm</span>
              </div>
              <p className="text-sm text-blue-700/80 mt-1">Classico foglio da stampante.</p>
            </button>

            <button onClick={() => onExportPrint('A3')} className="w-full text-left p-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all group shadow-sm hover:shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800 group-hover:text-blue-700">Formato A3</span>
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">29.7 x 42.0 cm</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Doppio foglio. Ideale per locandine.</p>
            </button>
          </div>
        </div>

        {/* Section: Social (PNG) */}
        <div className="flex-1 p-6 md:p-8 bg-pink-50/30">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3 text-pink-900">
              <div className="p-3 bg-pink-100 rounded-xl">
                <Share2 size={24} className="text-pink-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Social (PNG)</h3>
                <p className="text-sm text-pink-600/80">Ottimizzato per schermi</p>
              </div>
            </div>
            <button onClick={onClose} className="hidden md:block p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"><X size={24} /></button>
          </div>

          <div className="space-y-3">
            <button onClick={() => onExportSocial('post-square')} className="w-full text-left p-4 bg-white hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-xl transition-all group shadow-sm hover:shadow-md flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded-sm"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 group-hover:text-pink-700">Post Quadrato</span>
                  <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">1:1</span>
                </div>
                <p className="text-sm text-gray-500">Instagram Feed, Facebook Post.</p>
              </div>
            </button>

            <button onClick={() => onExportSocial('post-portrait')} className="w-full text-left p-4 bg-white hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-xl transition-all group shadow-sm hover:shadow-md flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                <div className="w-8 h-10 bg-gray-300 rounded-sm"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 group-hover:text-pink-700">Post Verticale</span>
                  <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">4:5</span>
                </div>
                <p className="text-sm text-gray-500">Instagram Portrait (più visibilità).</p>
              </div>
            </button>

            <button onClick={() => onExportSocial('story')} className="w-full text-left p-4 bg-white hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-xl transition-all group shadow-sm hover:shadow-md flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                <div className="w-6 h-10 bg-gray-300 rounded-sm border-2 border-white"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 group-hover:text-pink-700">Storia / Reel</span>
                  <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">9:16</span>
                </div>
                <p className="text-sm text-gray-500">Instagram Stories, Reels, TikTok.</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
