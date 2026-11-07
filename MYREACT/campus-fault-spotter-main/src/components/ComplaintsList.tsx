import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, AlertCircle } from "lucide-react";

interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  photo_url: string;
  status: string;
  priority: string;
  ai_analysis: string;
  created_at: string;
}

interface ComplaintsListProps {
  complaints: Complaint[];
}

const ComplaintsList = ({ complaints }: ComplaintsListProps) => {
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

  if (complaints.length === 0) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No complaints submitted yet</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {complaints.map((complaint) => (
        <Card key={complaint.id} className="overflow-hidden shadow-card hover:shadow-elegant transition-shadow">
          {complaint.photo_url && (
            <img
              src={complaint.photo_url}
              alt={complaint.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg">{complaint.title}</h3>
              <Badge className={getPriorityColor(complaint.priority)}>
                {complaint.priority}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">{complaint.description}</p>

            {complaint.ai_analysis && (
              <div className="p-3 bg-primary/5 rounded-lg">
                <p className="text-xs font-medium text-primary mb-1">AI Analysis:</p>
                <p className="text-sm text-foreground">{complaint.ai_analysis}</p>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{complaint.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(complaint.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <Badge className={getStatusColor(complaint.status)}>
              {complaint.status.replace("_", " ")}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ComplaintsList;
