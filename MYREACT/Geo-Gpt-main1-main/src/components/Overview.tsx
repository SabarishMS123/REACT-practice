import { Target, Rocket, CheckCircle, AlertCircle } from 'lucide-react';

const Overview = () => {
  const challenges = [
    'Aligning vision embeddings with LLM text embedding space',
    'Sourcing high-quality multimodal datasets',
    'Achieving competitive performance within compute budgets',
    'Preserving textual capabilities while adding vision',
  ];

  const deliverables = [
    'Multimodal GPT-OSS model with vision understanding',
    'Training scripts and dataset manifests',
    'Performance benchmarks against open models',
    'Foundation for advanced multimodal reasoning',
  ];

  const applications = [
    'Automated land-cover classification',
    'Change detection in satellite imagery',
    'Environment monitoring with NL explanations',
    'Interactive QA over time-series imagery',
    'Conversational exploration of geospatial archives',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Project Mission</h2>
        <p className="text-lg leading-relaxed">
          Enhancing OpenAI's GPT-OSS with multimodal vision capabilities to enable state-of-the-art
          Earth Observation data analysis for ISRO. This project bridges the gap between Level-1 and
          Level-2 EO data and decision makers through conversational AI that understands both visual
          and textual information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-bold text-slate-800">Key Challenges</h3>
          </div>
          <ul className="space-y-3">
            {challenges.map((challenge, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-orange-500 font-bold mt-0.5">•</span>
                <span className="text-slate-700">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-slate-800">Deliverables</h3>
          </div>
          <ul className="space-y-3">
            {deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
        <div className="flex items-center space-x-3 mb-4">
          <Rocket className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-bold text-slate-800">ISRO EO Data Applications</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((app, idx) => (
            <div key={idx} className="flex items-start space-x-3 bg-slate-50 p-4 rounded-lg">
              <Target className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">{app}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-3">Technical Approach</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-cyan-400">Vision Encoder</h4>
            <p className="text-slate-300">Lightweight projection-based alignment between vision encoder and LLM</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-cyan-400">Open Datasets</h4>
            <p className="text-slate-300">High-quality multimodal datasets for reproducible training</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-cyan-400">Efficient Training</h4>
            <p className="text-slate-300">Competitive performance within reasonable compute budgets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
