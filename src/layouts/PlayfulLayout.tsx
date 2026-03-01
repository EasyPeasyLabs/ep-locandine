import React from 'react';
import { useFlyer } from '../context/FlyerContext';
import { Logo } from '../components/Logo';
import { Instagram, Facebook, Phone, Star } from 'lucide-react';

export const PlayfulLayout = () => {
  const { data } = useFlyer();

  return (
    <div className="w-[595px] h-[842px] bg-yellow-300 text-gray-900 flex flex-col relative overflow-hidden shadow-2xl" id="flyer-content">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full p-6 border-8 border-white m-4 rounded-3xl bg-white/80 backdrop-blur-sm">
        
        {/* Header */}
        <header className="text-center mb-6">
            <div className="inline-block relative">
                <Logo className="w-32 h-32 mx-auto relative z-10" />
                <Star className="absolute -top-4 -right-8 text-yellow-500 w-12 h-12 animate-spin-slow" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 transform -rotate-2 mt-2">{data.title}</h1>
            <p className="font-bold text-xl text-blue-500 tracking-widest">{data.subtitle}</p>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <p className="text-center font-comic text-lg font-bold text-gray-700">{data.description}</p>
            </div>

            <div className="flex-1 bg-gray-200 rounded-3xl overflow-hidden shadow-inner border-4 border-dashed border-gray-400 relative">
                 {data.mainImage ? (
                    <img src={data.mainImage} alt="Main" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-2xl">PHOTO HERE</div>
                )}
            </div>

            <div className="flex gap-4">
                <div className="flex-1 bg-pink-100 p-4 rounded-2xl border-2 border-pink-300 transform -rotate-1 relative overflow-hidden">
                    <h3 className="font-black text-pink-500 text-lg mb-1">DOVE?</h3>
                    <p className="font-bold text-gray-800 relative z-10">{data.locationName}</p>
                    <p className="text-sm text-gray-600 relative z-10">{data.locationAddress}</p>
                    {data.locationLogo && (
                        <img src={data.locationLogo} alt="Loc" className="absolute bottom-2 right-2 h-12 opacity-50 object-contain" />
                    )}
                </div>
                <div className="flex-1 bg-blue-100 p-4 rounded-2xl border-2 border-blue-300 transform rotate-1">
                    <h3 className="font-black text-blue-500 text-lg mb-1">QUANDO?</h3>
                    <p className="font-bold text-2xl text-blue-900">{new Date(data.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'numeric' })}</p>
                    <p className="font-mono font-bold">{data.timeStart} - {data.timeEnd}</p>
                </div>
            </div>
        </main>

        {/* Footer */}
        <footer className="mt-6 pt-4 border-t-2 border-gray-200">
            <div className="flex justify-center gap-6">
                 <div className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                    <Phone className="text-green-500 w-6 h-6" />
                 </div>
                 <div className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                    <Instagram className="text-pink-500 w-6 h-6" />
                 </div>
                 <div className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                    <Facebook className="text-blue-500 w-6 h-6" />
                 </div>
            </div>
            <div className="text-center mt-2 text-sm font-bold text-gray-500">
                {data.contactPhone} | @{data.contactInstagram}
            </div>
        </footer>
      </div>
    </div>
  );
};
