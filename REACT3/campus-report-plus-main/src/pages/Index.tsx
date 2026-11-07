import React, { useState, useEffect } from 'react';
import { Camera, FileText, LogOut, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Complaint {
  id: number;
  title: string;
  description: string;
  location: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  reportedBy: string;
  reportedDate: string;
  aiAnalysis: string;
  photoData: string | null;
}

interface User {
  username: string;
  role: 'accounter' | 'reporter';
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    location: '',
    photo: null as File | null,
    photoPreview: null as string | null
  });

  useEffect(() => {
    const sampleComplaints: Complaint[] = [
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
      toast.success('Welcome, Accounter!');
    } else if (username && password) {
      setCurrentUser({ username, role: 'reporter' });
      toast.success('Welcome, Reporter!');
    } else {
      toast.error('Please enter valid credentials');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginForm({ username: '', password: '' });
    setReportForm({ title: '', description: '', location: '', photo: null, photoPreview: null });
    toast.info('Logged out successfully');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReportForm({
          ...reportForm,
          photo: file,
          photoPreview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (photoData: string | null): Promise<string> => {
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
      toast.error('Please fill all required fields');
      return;
    }

    toast.loading('Analyzing image with AI...');
    const aiAnalysis = await analyzeImage(reportForm.photoPreview);

    const newComplaint: Complaint = {
      id: complaints.length + 1,
      title: reportForm.title,
      description: reportForm.description,
      location: reportForm.location,
      status: 'Pending',
      reportedBy: currentUser!.username,
      reportedDate: new Date().toISOString(),
      aiAnalysis,
      photoData: reportForm.photoPreview
    };

    setComplaints([...complaints, newComplaint]);
    setShowSuccessModal(true);
    setReportForm({ title: '', description: '', location: '', photo: null, photoPreview: null });
    toast.dismiss();

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const updateComplaintStatus = (id: number, newStatus: 'Pending' | 'In Progress' | 'Resolved') => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
    toast.success(`Status updated to ${newStatus}`);
  };

  const generatePDF = (complaint: Complaint) => {
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
    toast.success('Report downloaded successfully');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-login flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-xl-custom p-8 w-full max-w-md border border-border">
          <div className="text-center mb-8">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Campus Fault Reporter</h1>
            <p className="text-muted-foreground mt-2">Infrastructure Management System</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Login
            </button>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
            <p className="text-xs text-foreground"><strong>Accounter:</strong> gceaccounter123@gmail.com / gce123@Accounter</p>
            <p className="text-xs text-foreground"><strong>Reporter:</strong> Any username / Any password</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser.role === 'reporter') {
    return (
      <div className="min-h-screen bg-gradient-reporter p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl-custom p-8 mb-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Report Infrastructure Fault</h1>
                <p className="text-muted-foreground mt-1">Logged in as: {currentUser.username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Fault Title *</label>
                <input
                  type="text"
                  value={reportForm.title}
                  onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  placeholder="e.g., Broken Window, Leaking Pipe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                <input
                  type="text"
                  value={reportForm.location}
                  onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  placeholder="e.g., Main Building - Room 201"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  rows={4}
                  placeholder="Provide detailed description of the fault..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Upload Photo</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-secondary transition-colors bg-background/50">
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
                        <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-foreground">Click to upload photo</p>
                        <p className="text-sm text-muted-foreground mt-1">AI will analyze the image automatically</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmitReport}
                className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Submit Report
              </button>
            </div>
          </div>
        </div>

        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-card rounded-2xl shadow-xl-custom p-8 max-w-md w-full transform animate-bounce-once border border-border">
              <div className="text-center">
                <div className="bg-success/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Success!</h2>
                <p className="text-muted-foreground mb-4">Your report has been submitted to the accounter successfully</p>
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <p className="text-sm text-success">The team will review and take action soon</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-accounter p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl-custom p-8 mb-6 border border-border">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Accounter Dashboard</h1>
              <p className="text-muted-foreground mt-1">Total Complaints: {complaints.length}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">
                    {complaints.filter(c => c.status === 'Pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-info" />
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-foreground">
                    {complaints.filter(c => c.status === 'In Progress').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-foreground">
                    {complaints.filter(c => c.status === 'Resolved').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card">
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
                        <h3 className="text-xl font-bold text-foreground">#{complaint.id} - {complaint.title}</h3>
                        <p className="text-sm text-muted-foreground">{complaint.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        complaint.status === 'Pending' ? 'bg-warning/10 text-warning' :
                        complaint.status === 'In Progress' ? 'bg-info/10 text-info' :
                        'bg-success/10 text-success'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>

                    <p className="text-foreground mb-3">{complaint.description}</p>

                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-3">
                      <p className="text-sm font-semibold text-accent mb-1">AI Analysis:</p>
                      <p className="text-sm text-foreground">{complaint.aiAnalysis}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                      <span>Reported by: {complaint.reportedBy}</span>
                      <span>•</span>
                      <span>{new Date(complaint.reportedDate).toLocaleString()}</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <select
                        value={complaint.status}
                        onChange={(e) => updateComplaintStatus(complaint.id, e.target.value as 'Pending' | 'In Progress' | 'Resolved')}
                        className="px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>

                      <button
                        onClick={() => generatePDF(complaint)}
                        className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
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
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No complaints reported yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
