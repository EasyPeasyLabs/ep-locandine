import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { Logo } from '../components/Logo';
import { Instagram, Facebook, Phone } from 'lucide-react';

export const ClassicLayout = () => {
  const { data } = useFlyer();

  return (
    <div className="w-[595px] h-[842px] bg-white text-gray-800 flex flex-col relative overflow-hidden shadow-2xl" id="flyer-content">
      {/* Header */}
      <header className="bg-blue-900 text-white p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="w-20 h-20" />
          <div>
            <h1 className="text-3xl font-bold font-serif text-yellow-400">{data.title}</h1>
            <h2 className="text-xl italic text-yellow-200">{data.subtitle}</h2>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 p-8 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-lg font-medium text-blue-800 uppercase tracking-wide">{data.description}</p>
        </div>

        {/* Main Image Placeholder */}
        <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative group">
          {data.mainImage ? (
            <img src={data.mainImage} alt="Main" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400">Immagine Principale</span>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-6 bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <div className="space-y-2">
            <h3 className="font-bold text-blue-900 uppercase text-sm">Dove</h3>
            <p className="text-xl font-bold">{data.locationName}</p>
            <p className="text-gray-600">{data.locationAddress}</p>
             {data.locationLogo && <img src={data.locationLogo} alt="Location Logo" className="h-12 mt-2 object-contain" />}
          </div>
          <div className="space-y-2 text-right">
            <h3 className="font-bold text-blue-900 uppercase text-sm">Quando</h3>
            <p className="text-2xl font-bold text-red-600">{new Date(data.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}</p>
            <p className="text-lg font-mono">{data.timeStart} - {data.timeEnd}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4">
        <div className="flex justify-around items-center text-sm font-medium">
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-yellow-300" />
            <span>{data.contactPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Instagram size={18} className="text-pink-300" />
            <span>{data.contactInstagram}</span>
          </div>
          <div className="flex items-center gap-2">
            <Facebook size={18} className="text-blue-300" />
            <span>{data.contactFacebook}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
