import { useState } from 'react';
import Navigation from './components/Navigation';
import Overview from './components/Overview';
import ImageAnalysis from './components/ImageAnalysis';
import EOData from './components/EOData';
import Datasets from './components/Datasets';
import Training from './components/Training';
import Benchmarks from './components/Benchmarks';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'analysis':
        return <ImageAnalysis />;
      case 'eo-data':
        return <EOData />;
      case 'datasets':
        return <Datasets />;
      case 'training':
        return <Training />;
      case 'benchmarks':
        return <Benchmarks />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>{renderContent()}</main>
      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Project Information</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Smart India Hackathon 2025 - Problem Statement ID: SIH25170
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Organization: Indian Space Research Organisation (ISRO)
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Technology</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">
                  GPT-OSS-120B
                </span>
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">
                  Vision Encoder
                </span>
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">
                  Multimodal AI
                </span>
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">
                  Earth Observation
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Key Features</h3>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>Image Captioning</li>
                <li>Visual Question Answering</li>
                <li>Land Cover Classification</li>
                <li>Change Detection</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-6 text-center text-slate-500 text-sm">
            Enhancing OpenAI's GPT-OSS with Multimodal Vision Capabilities for ISRO EO Data
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
