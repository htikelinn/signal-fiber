
import { useState, useEffect } from 'react';

export default function Home() {


  const [dateTime, setDateTime] = useState(new Date());
  const [km, setKm] = useState('');
  const [miles, setMiles] = useState('');
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [fiberInput, setFiberInput] = useState('');
  const [fiberResult, setFiberResult] = useState({ meters: 0, yards: 0, miles: 0 });
  const [activeTab, setActiveTab] = useState('distance');

  // Update date time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Kilometer to Mile conversion
  // const handleKmChange = (km: string) => {
  //   if (km !== '' && !isNaN(km as unknown as number)) {
  //     const kmValue = parseFloat(km);
  //     setKm(kmValue as unknown as string);
  //     setMiles((kmValue * 0.621371).toFixed(2));
  //   } else if (km === '') {
  //     setMiles('');
  //   }
  // };
const handleKmChange = (value: string) => {
  setKm(value); // <-- keep raw input always

  if (value !== '' && !isNaN(Number(value))) {
    const kmValue = parseFloat(value);
    setMiles((kmValue * 0.621371).toFixed(2));
  } else {
    setMiles('');
  }
};

  // useEffect(() => {
  //   if (km !== '' && !isNaN(km as unknown as number)) {
  //     const kmValue = parseFloat(km);
  //     setMiles((kmValue * 0.621371).toFixed(2));
  //   } else if (km === '') {
  //     setMiles('');
  //   }
  // }, [km]);

  // Mile to Kilometer conversion
  const handleMilechange = (miles: string) => {
    setMiles(miles);
    if (miles !== '' && !isNaN(miles as unknown as number)) {
      const milesValue = parseFloat(miles);
      setKm((milesValue * 1.60934).toFixed(2));
    } else if (miles === '') {
      setKm('');
    }
  };
  // useEffect(() => {
  //   if (miles !== '' && !isNaN(miles as unknown as number)) {
  //     const milesValue = parseFloat(miles);
  //     setKm((milesValue * 1.60934).toFixed(2));
  //   } else if (miles === '') {
  //     setKm('');
  //   }
  // }, [miles]);

  // Celsius to Fahrenheit conversion
  const handleCelsiusChange = (celsius: string) => {
    setCelsius(celsius);
    if (celsius !== '' && !isNaN(celsius as unknown as number)) {
      const celsiusValue = parseFloat(celsius);
      setFahrenheit(((celsiusValue * 9 / 5) + 32).toFixed(2));
    } else if (celsius === '') {
      setFahrenheit('');
    }
  };
  
  // useEffect(() => {
  //   if (celsius !== '' && !isNaN(celsius as unknown as number)) {
  //     const celsiusValue = parseFloat(celsius);
  //     setFahrenheit(((celsiusValue * 9/5) + 32).toFixed(2));
  //   } else if (celsius === '') {
  //     setFahrenheit('');
  //   }
  // }, [celsius]);

  // Fahrenheit to Celsius conversion
  const handlefaheritChange = (fahrenheit: string) => {
    setFahrenheit(fahrenheit);
    if (fahrenheit !== '' && !isNaN(fahrenheit as unknown as number)) {
      const fahrenheitValue = parseFloat(fahrenheit);
      setCelsius(((fahrenheitValue - 32) * 5 / 9).toFixed(2));
    } else if (fahrenheit === '') {
      setCelsius('');
    }
  };
  // useEffect(() => {
  //   if (fahrenheit !== '' && !isNaN(fahrenheit as unknown as number)) {
  //     const fahrenheitValue = parseFloat(fahrenheit);
  //     setCelsius(((fahrenheitValue - 32) * 5/9).toFixed(2));
  //   } else if (fahrenheit === '') {
  //     setCelsius('');
  //   }
  // }, [fahrenheit]);

  // Fiber length conversion
  useEffect(() => {
    if (fiberInput !== '' && !isNaN(fiberInput as unknown as number)) {
      const length = parseFloat(fiberInput);
      setFiberResult({
        meters: (length * 1000).toFixed(2) as unknown as number,
        yards: (length * 1093.61).toFixed(2) as unknown as number,
        miles: (length * 0.621371).toFixed(2) as unknown as number
      });
    } else if (fiberInput === '') {
      setFiberResult({ meters: 0, yards: 0, miles: 0 });
    }
  }, [fiberInput]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Date/Time */}
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Utility Converter Pro</h1>
            <p className="text-gray-600">All your conversion needs in one place</p>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <div className="text-2xl font-semibold text-gray-800">{formatDate(dateTime)}</div>
            <div className="text-4xl font-bold text-indigo-600">{formatTime(dateTime)}</div>
          </div>
        </header>

        {/* Converter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex overflow-x-auto border-b">
            <button
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'distance' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('distance')}
            >
              Distance
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'temperature' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('temperature')}
            >
              Temperature
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'fiber' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('fiber')}
            >
              Fiber Length
            </button>
          </div>

          <div className="p-6">
            {/* Distance Converter */}
            {activeTab === 'distance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Distance Converter</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kilometers</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={km}
                        onChange={(e) => handleKmChange(e.target.value)}
                        placeholder="Enter kilometers"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <span className="absolute right-10 top-4 text-gray-500">km</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Miles</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={miles}
                        onChange={(e) => handleMilechange(e.target.value)}
                        placeholder="Enter miles"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <span className="absolute right-4 top-4 text-gray-500">mi</span>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-indigo-700 text-sm">Tip: 1 kilometer = 0.621371 miles</p>
                </div>
              </div>
            )}

            {/* Temperature Converter */}
            {activeTab === 'temperature' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Temperature Converter</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Celsius</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={celsius}
                        onChange={(e) => handleCelsiusChange(e.target.value)}
                        placeholder="Enter °C"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <span className="absolute right-10 top-4 text-gray-500">°C</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fahrenheit</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={fahrenheit}
                        onChange={(e) => handlefaheritChange(e.target.value)}
                        placeholder="Enter °F"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <span className="absolute right-4 top-4 text-gray-500">°F</span>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-indigo-700 text-sm">Formula: °F = (°C × 9/5) + 32</p>
                </div>
              </div>
            )}

            {/* Fiber Converter */}
            {activeTab === 'fiber' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Fiber Length Converter</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kilometers</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={fiberInput}
                        onChange={(e) => setFiberInput(e.target.value)}
                        placeholder="Enter km"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <span className="absolute right-10 top-4 text-gray-500">km</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Results</label>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <span className="text-gray-700">Meters:</span>
                        <span className="font-semibold">{fiberResult.meters}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <span className="text-gray-700">Yards:</span>
                        <span className="font-semibold">{fiberResult.yards}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <span className="text-gray-700">Mile:</span>
                        <span className="font-semibold">{fiberResult.miles}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-indigo-700 text-sm">Commonly used in fiber optic cable measurements</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tools Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl text-center cursor-pointer hover:bg-blue-100 transition">
              <div className="text-blue-600 text-2xl mb-2">📏</div>
              <h3 className="font-semibold">Length</h3>
              <p className="text-sm text-gray-600">Various units</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center cursor-pointer hover:bg-purple-100 transition">
              <div className="text-purple-600 text-2xl mb-2">⚖️</div>
              <h3 className="font-semibold">Weight</h3>
              <p className="text-sm text-gray-600">Grams to ounces</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center cursor-pointer hover:bg-green-100 transition">
              <div className="text-green-600 text-2xl mb-2">💾</div>
              <h3 className="font-semibold">Data</h3>
              <p className="text-sm text-gray-600">MB to GB</p>
            </div>
          </div>
        </div>

        <footer className="text-center text-gray-600 mt-8 py-4">
          <p>© 2023 Utility Converter Pro | All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};
