export interface Site {
  id: number;
  latitude: number;
  longitude: number;
}

export interface EOBand {
  name: string;
  description: string;
  wavelength: string;
  resolution: string;
}

export interface BenchmarkResult {
  model: string;
  accuracy: number;
  f1Score: number;
  inferenceTime: number;
}

export interface TrainingMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
  validationLoss: number;
  validationAccuracy: number;
}

export interface AnalysisResult {
  caption: string;
  landCover: string[];
  changeDetection: string;
  confidence: number;
}
