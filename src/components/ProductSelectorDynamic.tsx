import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const devicesByBrand: Record<string, { name: string; image: string }[]> = {
  Apple: [
    { name: 'iPhone 13', image: '/placeholder.svg' },
    { name: 'iPhone 14', image: '/placeholder.svg' },
    { name: 'iPhone 15 Pro Max', image: '/placeholder.svg' },
    { name: 'MacBook Air', image: '/placeholder.svg' },
    { name: 'MacBook Pro', image: '/placeholder.svg' },
  ],
  Samsung: [
    { name: 'Galaxy S22', image: '/placeholder.svg' },
    { name: 'S23 Ultra', image: '/placeholder.svg' },
    { name: 'Tab S9', image: '/placeholder.svg' },
    { name: 'A53', image: '/placeholder.svg' },
  ],
  HP: [
    { name: 'Pavilion x360', image: '/placeholder.svg' },
    { name: 'Envy', image: '/placeholder.svg' },
    { name: 'Victus', image: '/placeholder.svg' },
    { name: 'Spectre', image: '/placeholder.svg' },
  ],
  Dell: [
    { name: 'Inspiron 15', image: '/placeholder.svg' },
    { name: 'XPS 13', image: '/placeholder.svg' },
    { name: 'Latitude', image: '/placeholder.svg' },
    { name: 'G15', image: '/placeholder.svg' },
  ],
  OnePlus: [
    { name: 'Nord CE 3', image: '/placeholder.svg' },
    { name: '11R', image: '/placeholder.svg' },
    { name: '12', image: '/placeholder.svg' },
    { name: '10T', image: '/placeholder.svg' },
  ],
  Lenovo: [
    { name: 'Legion 5', image: '/placeholder.svg' },
    { name: 'IdeaPad Slim', image: '/placeholder.svg' },
    { name: 'ThinkPad X1', image: '/placeholder.svg' },
  ],
};

const ProductSelectorDynamic: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleDeviceClick = (brand: string, device: string) => {
    localStorage.setItem('restorely_selected_brand', brand);
    localStorage.setItem('restorely_selected_device', device);
    navigate('/book-repair');
  };

  const filteredDevices = selectedBrand
    ? devicesByBrand[selectedBrand].filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Select Your Device Brand</h2>
      {!selectedBrand ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.keys(devicesByBrand).map(brand => (
            <button
              key={brand}
              className="flex flex-col items-center p-4 border rounded-lg shadow hover:bg-blue-50 transition"
              onClick={() => setSelectedBrand(brand)}
            >
              <img src="/placeholder.svg" alt={brand} className="h-12 mb-2" />
              <span className="font-semibold">{brand}</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <button className="mb-4 text-blue-600 underline" onClick={() => setSelectedBrand(null)}>
            ← Back to Brands
          </button>
          <input
            type="text"
            placeholder="Search devices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-4 w-full p-2 border rounded"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredDevices.map(device => (
              <button
                key={device.name}
                className="flex flex-col items-center p-4 border rounded-lg shadow hover:bg-blue-50 transition"
                onClick={() => handleDeviceClick(selectedBrand, device.name)}
              >
                <img src={device.image} alt={device.name} className="h-12 mb-2" />
                <span className="font-medium text-center">{device.name}</span>
              </button>
            ))}
            {filteredDevices.length === 0 && (
              <div className="col-span-full text-center text-gray-500">No devices found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSelectorDynamic;
