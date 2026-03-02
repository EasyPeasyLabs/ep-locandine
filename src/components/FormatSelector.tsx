import React, { useState } from 'react';
import { useFlyer, FORMATS, FormatType } from '../context/FlyerContext';
import { FileText, Smartphone, X } from 'lucide-react';

export const FormatSelector = () => {
  const { data, setFormat } = useFlyer();
  const [isOpen, setIsOpen] = useState(false);
  const [tempFormat, setTempFormat] = useState<FormatType>(data.format);

  const handleSwitch = (format: FormatType) => {
    setTempFormat(format);
    setIsOpen(true);
  };

  const handleSelectSize = (sizeId: string) => {
    setFormat(tempFormat, sizeId);
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <div className="flex bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => handleSwitch('flyer')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${data.format === 'flyer' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <FileText size={16} />
          LOCANDINA
        </button>
        <button
          onClick={() => handleSwitch('social')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${data.format === 'social' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Smartphone size={16} />
          SOCIAL
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">
                Scegli Formato {tempFormat === 'flyer' ? 'Locandina' : 'Social'}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 grid grid-cols-2 gap-4">
              {FORMATS[tempFormat].map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleSelectSize(size.id)}
                  className={`p-4 border-2 rounded-xl text-left transition-all hover:border-blue-400 hover:bg-blue-50 ${data.sizeId === size.id && data.format === tempFormat ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200'}`}
                >
                  <div className="font-bold text-gray-800">{size.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {size.width} x {size.height} {size.unit}
                  </div>
                  {/* Visual representation */}
                  <div className="mt-3 bg-gray-200 rounded-sm mx-auto" 
                       style={{ 
                         width: '40px', 
                         height: `${(size.height / size.width) * 40}px`,
                         maxHeight: '60px'
                       }} 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
