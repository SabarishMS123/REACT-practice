import { Site } from '../types';

export const parseSiteData = (data: string): Site[] => {
  const lines = data.trim().split('\n');
  const sites: Site[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split('\t');
    if (parts.length >= 3) {
      sites.push({
        id: parseInt(parts[0]),
        latitude: parseFloat(parts[1]),
        longitude: parseFloat(parts[2]),
      });
    }
  }

  return sites;
};
