import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, Download, FileText, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import jsPDF from "jspdf";

interface AccounterDashboardProps {
  session: Session;
}

const AccounterDashboard = ({ session }: AccounterDashboardProps) => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchComplaints();

    const channel = supabase
      .channel("complaints-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "complaints",
        },
        () => {
          fetchComplaints();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setComplaints(data || []);
      
      const total = data?.length || 0;
      const pending = data?.filter((c) => c.status === "pending").length || 0;
      const in_progress = data?.filter((c) => c.status === "in_progress").length || 0;
      const resolved = data?.filter((c) => c.status === "resolved").length || 0;

      setStats({ total, pending, in_progress, resolved });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("complaints")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success("Status updated successfully");
      fetchComplaints();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const downloadPDF = (complaint: any) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Campus Infrastructure Complaint Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Report ID: ${complaint.id}`, 20, 35);
    doc.text(`Title: ${complaint.title}`, 20, 45);
    doc.text(`Location: ${complaint.location}`, 20, 55);
    doc.text(`Status: ${complaint.status}`, 20, 65);
    doc.text(`Priority: ${complaint.priority || "N/A"}`, 20, 75);
    doc.text(`Date: ${new Date(complaint.created_at).toLocaleDateString()}`, 20, 85);
    
    doc.text("Description:", 20, 100);
    const descLines = doc.splitTextToSize(complaint.description, 170);
    doc.text(descLines, 20, 110);
    
    if (complaint.ai_analysis) {
      const yPos = 110 + (descLines.length * 7) + 10;
      doc.text("AI Analysis:", 20, yPos);
      const aiLines = doc.splitTextToSize(complaint.ai_analysis, 170);
      doc.text(aiLines, 20, yPos + 10);
    }
    
    doc.save(`complaint-${complaint.id}.pdf`);
    toast.success("PDF downloaded successfully");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-success text-white";
      case "in_progress":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Accounter Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Complaints</p>
                <p className="text-3xl font-bold text-primary">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-muted-foreground">{stats.pending}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-accent">{stats.in_progress}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-3xl font-bold text-success">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">All Complaints</h2>
          {loading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Loading complaints...</p>
            </Card>
          ) : complaints.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No complaints received yet</p>
            </Card>
          ) : (
            complaints.map((complaint) => (
              <Card key={complaint.id} className="p-6 shadow-card hover:shadow-elegant transition-shadow">
                <div className="grid md:grid-cols-4 gap-6">
                  {complaint.photo_url && (
                    <div className="md:col-span-1">
                      <img
                        src={complaint.photo_url}
                        alt={complaint.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className={complaint.photo_url ? "md:col-span-3" : "md:col-span-4"}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{complaint.title}</h3>
                        <div className="flex gap-2 mb-2">
                          <Badge className={getStatusColor(complaint.status)}>
                            {complaint.status.replace("_", " ")}
                          </Badge>
                          {complaint.priority && (
                            <Badge className={getPriorityColor(complaint.priority)}>
                              {complaint.priority}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadPDF(complaint)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {complaint.description}
                    </p>

                    {complaint.ai_analysis && (
                      <div className="p-3 bg-primary/5 rounded-lg mb-4">
                        <p className="text-xs font-medium text-primary mb-1">AI Analysis:</p>
                        <p className="text-sm text-foreground">{complaint.ai_analysis}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(complaint.id, "in_progress")}
                        disabled={complaint.status === "in_progress"}
                      >
                        Mark In Progress
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(complaint.id, "resolved")}
                        disabled={complaint.status === "resolved"}
                      >
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AccounterDashboard;
