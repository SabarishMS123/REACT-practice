import { EOBand } from '../types';

export const oliBands: EOBand[] = [
  { name: 'Band 1', description: 'Coastal Aerosol', wavelength: '0.43 - 0.45 μm', resolution: '30 m' },
  { name: 'Band 2', description: 'Blue', wavelength: '0.450 - 0.51 μm', resolution: '30 m' },
  { name: 'Band 3', description: 'Green', wavelength: '0.53 - 0.59 μm', resolution: '30 m' },
  { name: 'Band 4', description: 'Red', wavelength: '0.64 - 0.67 μm', resolution: '30 m' },
  { name: 'Band 5', description: 'Near-Infrared', wavelength: '0.85 - 0.88 μm', resolution: '30 m' },
  { name: 'Band 6', description: 'SWIR 1', wavelength: '1.57 - 1.65 μm', resolution: '30 m' },
  { name: 'Band 7', description: 'SWIR 2', wavelength: '2.11 - 2.29 μm', resolution: '30 m' },
  { name: 'Band 8', description: 'Panchromatic', wavelength: '0.50 - 0.68 μm', resolution: '15 m' },
  { name: 'Band 9', description: 'Cirrus', wavelength: '1.36 - 1.38 μm', resolution: '30 m' },
];

export const tirsBands: EOBand[] = [
  { name: 'Band 10', description: 'Thermal Infrared 1', wavelength: '10.60 – 11.19 μm', resolution: '100 m' },
  { name: 'Band 11', description: 'Thermal Infrared 2', wavelength: '11.50 – 12.51 μm', resolution: '100 m' },
];
