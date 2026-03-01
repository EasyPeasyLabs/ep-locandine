import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { Logo } from '../components/Logo';
import { Instagram, Facebook, Phone } from 'lucide-react';

export const ModernLayout = () => {
  const { data } = useFlyer();

  return (
    <div className="w-[595px] h-[842px] bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden shadow-2xl" id="flyer-content">
      {/* Sidebar / Header Split */}
      <div className="flex-1 flex flex-col">
        <div className="h-1/3 bg-emerald-600 relative p-8 flex flex-col justify-center text-white overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12 scale-150">
                <Logo className="w-64 h-64" />
            </div>
            <div className="relative z-10">
                <h1 className="text-5xl font-black tracking-tighter mb-2">{data.title}</h1>
                <h2 className="text-2xl font-light tracking-widest uppercase border-b-2 border-white/30 pb-4 inline-block">{data.subtitle}</h2>
            </div>
        </div>
        
        <div className="flex-1 p-8 flex flex-col gap-8">
            <div className="flex gap-6 h-64">
                 <div className="w-1/2 bg-white shadow-lg rounded-2xl overflow-hidden relative">
                    {data.mainImage ? (
                        <img src={data.mainImage} alt="Main" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">Foto</div>
                    )}
                 </div>
                 <div className="w-1/2 flex flex-col justify-center gap-4">
                    <p className="text-xl font-medium leading-relaxed text-slate-600">{data.description}</p>
                 </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Location</span>
                        {data.locationLogo && <img src={data.locationLogo} alt="Location Logo" className="h-8 object-contain" />}
                    </div>
                    <div className="mt-2">
                        <p className="text-lg font-bold">{data.locationName}</p>
                        <p className="text-slate-500 text-sm">{data.locationAddress}</p>
                    </div>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Date & Time</span>
                    <div className="mt-2">
                         <p className="text-2xl font-black text-emerald-700">{new Date(data.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}</p>
                         <p className="text-emerald-600 font-mono">{data.timeStart} - {data.timeEnd}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 p-6">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Logo className="w-12 h-12" />
                <span className="text-xs font-mono uppercase tracking-widest">Official Event</span>
            </div>
            <div className="flex flex-col gap-2 text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                    <span>{data.contactInstagram}</span>
                    <Instagram size={14} />
                </div>
                <div className="flex items-center justify-end gap-2">
                    <span>{data.contactFacebook}</span>
                    <Facebook size={14} />
                </div>
                 <div className="flex items-center justify-end gap-2">
                    <span>{data.contactPhone}</span>
                    <Phone size={14} />
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};
