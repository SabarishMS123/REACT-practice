import { useEffect, useState } from 'react';
import { MapPin, Database, Globe, Download } from 'lucide-react';
import { parseSiteData } from '../utils/siteParser';
import { Site } from '../types';

const Datasets = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  useEffect(() => {
    fetch('/src/assets/lat_lon_sites.txt')
      .then((res) => res.text())
      .then((data) => {
        const parsedSites = parseSiteData(data);
        setSites(parsedSites);
      })
      .catch((err) => console.error('Error loading site data:', err));
  }, []);

  const datasets = [
    {
      name: 'Chandrayaan-2 TMC DEM',
      description: 'Lunar Terrain Digital Elevation Model and Ortho Images',
      url: 'https://chmapbrowse.issdc.gov.in',
      type: 'Lunar Surface',
      size: '~500GB',
      format: 'PDS, GeoTIFF',
    },
    {
      name: 'LRO LOLA DEM',
      description: 'Lunar Reconnaissance Orbiter Laser Altimeter Digital Elevation Model',
      type: 'Lunar Surface',
      size: '~200GB',
      format: 'IMG, FITS',
    },
    {
      name: 'Landsat 8 SSL4EO',
      description: 'Self-supervised learning benchmark with 11 spectral bands',
      url: 'https://huggingface.co/datasets/torchgeo/ssl4eo_l_benchmark',
      type: 'Earth Observation',
      size: '~1TB',
      format: 'GeoTIFF',
    },
    {
      name: 'COCO Captions',
      description: 'Image captioning dataset for multimodal training',
      type: 'Multimodal Training',
      size: '~25GB',
      format: 'JSON, JPEG',
    },
    {
      name: 'Visual Genome',
      description: 'Dense annotations for visual question answering',
      type: 'Multimodal Training',
      size: '~15GB',
      format: 'JSON, JPEG',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-10 h-10" />
          <div>
            <h2 className="text-3xl font-bold">Dataset Explorer</h2>
            <p className="text-teal-100 mt-1">Training and validation data sources</p>
          </div>
        </div>
        <p className="text-lg leading-relaxed">
          Comprehensive collection of open datasets for training multimodal vision-language models
          with focus on Earth observation and lunar surface analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-teal-600" />
            <span>Site Locations</span>
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sites.map((site) => (
              <button
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedSite?.id === site.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <MapPin className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Site {site.id}</h4>
                      <p className="text-xs text-slate-600 font-mono">
                        {site.latitude.toFixed(5)}°N, {site.longitude.toFixed(5)}°E
                      </p>
                    </div>
                  </div>
                  {selectedSite?.id === site.id && (
                    <span className="text-teal-600 font-medium text-sm">Selected</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {selectedSite && (
            <div className="bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-8 h-8 text-teal-600" />
                <h3 className="text-xl font-bold text-slate-800">Site Details</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-slate-700 mb-1">Site ID</div>
                  <div className="text-slate-600">{selectedSite.id}</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-slate-700 mb-1">Coordinates</div>
                  <div className="text-slate-600 font-mono">
                    Lat: {selectedSite.latitude.toFixed(6)}°N<br />
                    Lon: {selectedSite.longitude.toFixed(6)}°E
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-slate-700 mb-1">Region</div>
                  <div className="text-slate-600">Delhi-NCR Metropolitan Area</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-slate-700 mb-1">Available Data</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      Multispectral
                    </span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                      Thermal IR
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      Time Series
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3 text-sm mt-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{sites.length}</div>
                <div className="text-slate-600">Total Sites</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">~2TB</div>
                <div className="text-slate-600">Total Data</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Available Datasets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {datasets.map((dataset, idx) => (
            <div
              key={idx}
              className="border-2 border-slate-200 rounded-lg p-4 hover:border-teal-400 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-slate-800">{dataset.name}</h4>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">
                  {dataset.type}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-3">{dataset.description}</p>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <div className="space-x-3">
                  <span>Size: {dataset.size}</span>
                  <span>Format: {dataset.format}</span>
                </div>
                {dataset.url && (
                  <a
                    href={dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Link</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Datasets;
