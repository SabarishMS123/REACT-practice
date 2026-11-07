import { Satellite, Image, BarChart3, Database, Brain, Activity } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Satellite },
    { id: 'analysis', label: 'Image Analysis', icon: Image },
    { id: 'eo-data', label: 'EO Data', icon: Database },
    { id: 'datasets', label: 'Datasets', icon: Activity },
    { id: 'training', label: 'Training', icon: Brain },
    { id: 'benchmarks', label: 'Benchmarks', icon: BarChart3 },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Satellite className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold">GPT-OSS Vision</h1>
              <p className="text-xs text-slate-400">ISRO EO Data Analysis</p>
            </div>
          </div>
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
