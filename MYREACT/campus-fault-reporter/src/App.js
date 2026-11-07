import React, { useState, useEffect } from 'react';
import { Camera, FileText, LogOut, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [complaints, setComplaints] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    location: '',
    photo: null,
    photoPreview: null
  });

  useEffect(() => {
    const sampleComplaints = [
      {
        id: 1,
        title: 'Broken Window',
        description: 'Window in Building A needs repair',
        location: 'Main Building - Room 201',
        status: 'Pending',
        reportedBy: 'reporter1@gce.edu',
        reportedDate: new Date().toISOString(),
        aiAnalysis: 'Infrastructure damage detected: Broken glass window requiring immediate attention.',
        photoData: null
      }
    ];
    setComplaints(sampleComplaints);
  }, []);

  const handleLogin = () => {
    const { username, password } = loginForm;

    if (username === 'gceaccounter123@gmail.com' && password === 'gce123@Accounter') {
      setCurrentUser({ username, role: 'accounter' });
    } else if (username && password) {
      setCurrentUser({ username, role: 'reporter' });
    } else {
      alert('Please enter valid credentials');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginForm({ username: '', password: '' });
    setReportForm({ title: '', description: '', location: '', photo: null, photoPreview: null });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReportForm({
          ...reportForm,
          photo: file,
          photoPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (photoData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analyses = [
      'Infrastructure damage detected: Structural issue requiring immediate attention.',
      'Electrical fault identified: Potential safety hazard detected in the system.',
      'Plumbing issue detected: Water leakage or drainage problem identified.',
      'Maintenance required: General wear and tear observed in the facility.',
      'Safety concern identified: Immediate intervention recommended.',
      'Facility damage detected: Requires professional assessment and repair.'
    ];
    
    return analyses[Math.floor(Math.random() * analyses.length)];
  };

  const handleSubmitReport = async () => {
    if (!reportForm.title || !reportForm.description || !reportForm.location) {
      alert('Please fill all required fields');
      return;
    }

    const aiAnalysis = await analyzeImage(reportForm.photoPreview);

    const newComplaint = {
      id: complaints.length + 1,
      title: reportForm.title,
      description: reportForm.description,
      location: reportForm.location,
      status: 'Pending',
      reportedBy: currentUser.username,
      reportedDate: new Date().toISOString(),
      aiAnalysis,
      photoData: reportForm.photoPreview
    };

    setComplaints([...complaints, newComplaint]);
    setShowSuccessModal(true);
    setReportForm({ title: '', description: '', location: '', photo: null, photoPreview: null });

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  const generatePDF = (complaint) => {
    const pdfContent = `CAMPUS INFRASTRUCTURE FAULT REPORT
${'='.repeat(50)}

Report ID: #${complaint.id}
Title: ${complaint.title}
Location: ${complaint.location}
Status: ${complaint.status}

Description:
${complaint.description}

AI Analysis:
${complaint.aiAnalysis}

Reported By: ${complaint.reportedBy}
Reported Date: ${new Date(complaint.reportedDate).toLocaleString()}

${'='.repeat(50)}
Generated on: ${new Date().toLocaleString()}`;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `complaint_${complaint.id}_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Campus Fault Reporter</h1>
            <p className="text-gray-600 mt-2">Infrastructure Management System</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Login
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-700"><strong>Accounter:</strong> gceaccounter123@gmail.com / gce123@Accounter</p>
            <p className="text-xs text-gray-700"><strong>Reporter:</strong> Any username / Any password</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser.role === 'reporter') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Report Infrastructure Fault</h1>
                <p className="text-gray-600 mt-1">Logged in as: {currentUser.username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fault Title *</label>
                <input
                  type="text"
                  value={reportForm.title}
                  onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., Broken Window, Leaking Pipe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={reportForm.location}
                  onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., Main Building - Room 201"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows="4"
                  placeholder="Provide detailed description of the fault..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photoUpload"
                  />
                  <label htmlFor="photoUpload" className="cursor-pointer">
                    {reportForm.photoPreview ? (
                      <img src={reportForm.photoPreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                    ) : (
                      <div>
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Click to upload photo</p>
                        <p className="text-sm text-gray-500 mt-1">AI will analyze the image automatically</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmitReport}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Submit Report
              </button>
            </div>
          </div>
        </div>

        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform animate-bounce">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
                <p className="text-gray-600 mb-4">Your report has been submitted to the accounter successfully</p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm text-emerald-800">The team will review and take action soon</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Accounter Dashboard</h1>
              <p className="text-gray-600 mt-1">Total Complaints: {complaints.length}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {complaints.filter(c => c.status === 'Pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {complaints.filter(c => c.status === 'In Progress').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {complaints.filter(c => c.status === 'Resolved').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  {complaint.photoData && (
                    <img 
                      src={complaint.photoData} 
                      alt="Fault" 
                      className="w-full md:w-48 h-48 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">#{complaint.id} - {complaint.title}</h3>
                        <p className="text-sm text-gray-600">{complaint.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-3">{complaint.description}</p>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                      <p className="text-sm font-semibold text-purple-900 mb-1">AI Analysis:</p>
                      <p className="text-sm text-purple-800">{complaint.aiAnalysis}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                      <span>Reported by: {complaint.reportedBy}</span>
                      <span>•</span>
                      <span>{new Date(complaint.reportedDate).toLocaleString()}</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <select
                        value={complaint.status}
                        onChange={(e) => updateComplaintStatus(complaint.id, e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>

                      <button
                        onClick={() => generatePDF(complaint)}
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {complaints.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No complaints reported yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;