import { useState } from 'react';
import { Upload, Image as ImageIcon, MessageSquare, Sparkles, Download } from 'lucide-react';

const ImageAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis({
        caption: 'Satellite imagery showing urban development with mixed land use including residential areas, commercial zones, and green spaces. The image displays clear infrastructure patterns with roads and buildings.',
        landCover: ['Urban Built-up', 'Vegetation', 'Water Bodies', 'Bare Soil'],
        changeDetection: 'Significant urban expansion detected in the northeast quadrant with approximately 15% increase in built-up area compared to previous timeframe.',
        confidence: 0.92,
        features: [
          { label: 'Buildings', count: 234, coverage: '42%' },
          { label: 'Roads', length: '12.3 km', coverage: '18%' },
          { label: 'Vegetation', coverage: '28%' },
          { label: 'Water', coverage: '12%' },
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const sampleQuestions = [
    'What types of land cover are visible in this image?',
    'Describe the urban development patterns',
    'Identify water bodies and vegetation',
    'Detect any changes or anomalies',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
          <ImageIcon className="w-7 h-7 text-blue-600" />
          <span>Multimodal Image Analysis</span>
        </h2>
        <p className="text-slate-600 mb-6">
          Upload satellite imagery or EO data for AI-powered analysis combining vision and language understanding.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
              {!selectedImage ? (
                <label className="cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium mb-1">Upload Image</p>
                  <p className="text-sm text-slate-500">PNG, JPG, GeoTIFF up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {selectedImage && (
              <button
                onClick={simulateAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Analyze Image</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ask a Question (Visual QA)
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., What types of vegetation are visible in this area?"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuestion(q)}
                    className="text-xs bg-white border border-slate-300 px-3 py-1.5 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {analysis && (
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-5 border border-blue-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span>Analysis Results</span>
                  </h3>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    {(analysis.confidence * 100).toFixed(0)}% confident
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-slate-700 mb-2">Image Caption</h4>
                    <p className="text-slate-600 leading-relaxed">{analysis.caption}</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-slate-700 mb-2">Land Cover Classification</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.landCover.map((cover: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {cover}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-slate-700 mb-2">Change Detection</h4>
                    <p className="text-slate-600">{analysis.changeDetection}</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-slate-700 mb-2">Detected Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {analysis.features.map((feature: any, idx: number) => (
                        <div key={idx} className="bg-slate-50 p-2 rounded">
                          <div className="font-medium text-slate-700 text-xs">{feature.label}</div>
                          <div className="text-slate-600 text-xs">
                            {feature.count && `Count: ${feature.count}`}
                            {feature.length && `Length: ${feature.length}`}
                            {feature.coverage && ` Coverage: ${feature.coverage}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysis;
