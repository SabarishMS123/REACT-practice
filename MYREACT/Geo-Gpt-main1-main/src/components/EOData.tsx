import { oliBands, tirsBands } from '../data/eoBands';
import { Satellite, Waves, Eye } from 'lucide-react';

const EOData = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Satellite className="w-10 h-10" />
          <div>
            <h2 className="text-3xl font-bold">Earth Observation Data</h2>
            <p className="text-indigo-200 mt-1">Landsat 8 Multispectral Analysis</p>
          </div>
        </div>
        <p className="text-lg leading-relaxed">
          Explore the spectral bands used for Earth observation, including optical (OLI) and thermal infrared (TIRS) sensors
          for comprehensive land surface analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4">
            <div className="flex items-center space-x-3">
              <Eye className="w-6 h-6" />
              <div>
                <h3 className="text-xl font-bold">OLI Sensor</h3>
                <p className="text-sm text-blue-100">Operational Land Imager - 9 Bands</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {oliBands.map((band, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-blue-500 bg-slate-50 p-4 rounded-r-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800">{band.name}</h4>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      {band.resolution}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{band.description}</p>
                  <p className="text-xs text-slate-500 font-mono">{band.wavelength}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4">
              <div className="flex items-center space-x-3">
                <Waves className="w-6 h-6" />
                <div>
                  <h3 className="text-xl font-bold">TIRS Sensor</h3>
                  <p className="text-sm text-orange-100">Thermal Infrared Sensor - 2 Bands</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {tirsBands.map((band, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-orange-500 bg-slate-50 p-4 rounded-r-lg hover:bg-orange-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800">{band.name}</h4>
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                        {band.resolution}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{band.description}</p>
                    <p className="text-xs text-slate-500 font-mono">{band.wavelength}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Super-Resolution Task</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-orange-400">Objective</h4>
                <p className="text-slate-300">
                  Enhance thermal bands (10 & 11) from 100m to 25m or 50m resolution using optical guidance
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-orange-400">Method</h4>
                <p className="text-slate-300">
                  Leverage RGB/multispectral images as guidance for thermal IR super-resolution
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-orange-400">Scale</h4>
                <p className="text-slate-300">2X or 4X upscaling with vision-enhanced models</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Dataset Information</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Landsat 8 SSL4EO Benchmark</h4>
          <p className="text-sm text-blue-800 mb-2">
            Complete 11-band dataset including OLI (9 bands) and TIRS (2 bands) sensors
          </p>
          <a
            href="https://huggingface.co/datasets/torchgeo/ssl4eo_l_benchmark"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline text-sm font-medium"
          >
            View Dataset on HuggingFace
          </a>
        </div>
      </div>
    </div>
  );
};

export default EOData;
