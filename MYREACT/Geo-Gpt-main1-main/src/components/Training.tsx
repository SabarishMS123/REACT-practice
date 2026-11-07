import { TrendingUp, Zap, Clock, Cpu } from 'lucide-react';

const Training = () => {
  const metrics = [
    { epoch: 1, loss: 2.45, accuracy: 0.42, validationLoss: 2.38, validationAccuracy: 0.45 },
    { epoch: 5, loss: 1.82, accuracy: 0.61, validationLoss: 1.79, validationAccuracy: 0.63 },
    { epoch: 10, loss: 1.34, accuracy: 0.74, validationLoss: 1.38, validationAccuracy: 0.72 },
    { epoch: 15, loss: 0.98, accuracy: 0.83, validationLoss: 1.12, validationAccuracy: 0.79 },
    { epoch: 20, loss: 0.76, accuracy: 0.88, validationLoss: 0.94, validationAccuracy: 0.84 },
    { epoch: 25, loss: 0.58, accuracy: 0.91, validationLoss: 0.81, validationAccuracy: 0.87 },
    { epoch: 30, loss: 0.45, accuracy: 0.93, validationLoss: 0.73, validationAccuracy: 0.89 },
  ];

  const currentMetrics = metrics[metrics.length - 1];

  const trainingConfig = {
    model: 'GPT-OSS-120B',
    visionEncoder: 'CLIP ViT-L/14',
    batchSize: 32,
    learningRate: 0.0001,
    optimizer: 'AdamW',
    scheduler: 'Cosine with Warmup',
    gpu: '1x A100 80GB',
    estimatedTime: '14 days',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-10 h-10" />
          <div>
            <h2 className="text-3xl font-bold">Training Dashboard</h2>
            <p className="text-violet-100 mt-1">Multimodal GPT-OSS Training Progress</p>
          </div>
        </div>
        <p className="text-lg leading-relaxed">
          Monitor the training progress of vision-augmented GPT-OSS model with real-time metrics
          and performance indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Current Epoch</h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{currentMetrics.epoch}</p>
          <p className="text-xs text-slate-500 mt-1">of 30 epochs</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Accuracy</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">
            {(currentMetrics.accuracy * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-green-600 mt-1">↑ +5.2% from last epoch</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Training Loss</h3>
            <Zap className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">{currentMetrics.loss.toFixed(2)}</p>
          <p className="text-xs text-orange-600 mt-1">↓ -0.13 from last epoch</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-violet-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Val Accuracy</h3>
            <Cpu className="w-5 h-5 text-violet-500" />
          </div>
          <p className="text-3xl font-bold text-slate-800">
            {(currentMetrics.validationAccuracy * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-violet-600 mt-1">Best so far</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Training Progress</h3>
          <div className="space-y-4">
            {metrics.map((metric, idx) => (
              <div key={idx} className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Epoch {metric.epoch}</span>
                  <span className="text-sm text-slate-600">
                    Acc: {(metric.accuracy * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${metric.accuracy * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Loss: {metric.loss.toFixed(2)}</span>
                  <span>Val Loss: {metric.validationLoss.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Training Configuration</h3>
            <div className="space-y-3 text-sm">
              {Object.entries(trainingConfig).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-slate-800 font-mono text-xs">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-3">Training Pipeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Data preprocessing & augmentation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Vision encoder alignment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Multimodal fine-tuning (in progress)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <span>Validation & benchmarking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <span>EO data specialization</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Performance Metrics Over Time</h3>
        <div className="relative h-64 bg-slate-50 rounded-lg p-4">
          <svg className="w-full h-full" viewBox="0 0 800 200">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {metrics.map((metric, idx) => {
              if (idx === 0) return null;
              const x1 = ((idx - 1) / (metrics.length - 1)) * 750 + 25;
              const x2 = (idx / (metrics.length - 1)) * 750 + 25;
              const y1 = 180 - metrics[idx - 1].accuracy * 160;
              const y2 = 180 - metric.accuracy * 160;

              return (
                <g key={idx}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx={x2} cy={y2} r="4" fill="#3b82f6" />
                </g>
              );
            })}

            <line x1="25" y1="20" x2="25" y2="180" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="25" y1="180" x2="775" y2="180" stroke="#cbd5e1" strokeWidth="1" />
          </svg>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-slate-600">
            Training Epochs
          </div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-slate-600">
            Accuracy
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
