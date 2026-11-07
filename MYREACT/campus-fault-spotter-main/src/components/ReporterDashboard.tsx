import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Upload, Send, Camera, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ComplaintsList from "./ComplaintsList";

interface ReporterDashboardProps {
  session: Session;
}

const ReporterDashboard = ({ session }: ReporterDashboardProps) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("reporter_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching complaints:", error);
    } else {
      setComplaints(data || []);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      toast.error("Please upload a photo of the issue");
      return;
    }

    setSubmitting(true);

    try {
      const fileExt = photo.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("complaint-photos")
        .upload(filePath, photo);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("complaint-photos")
        .getPublicUrl(filePath);

      const { data: aiData, error: aiError } = await supabase.functions.invoke(
        "analyze-complaint",
        {
          body: { imageUrl: publicUrl },
        }
      );

      if (aiError) throw aiError;

      const { error: insertError } = await supabase
        .from("complaints")
        .insert({
          reporter_id: session.user.id,
          title,
          description,
          location,
          photo_url: publicUrl,
          ai_analysis: aiData.analysis,
          priority: aiData.priority,
        });

      if (insertError) throw insertError;

      setShowSuccess(true);
      setShowForm(false);
      setTitle("");
      setDescription("");
      setLocation("");
      setPhoto(null);
      setPhotoPreview(null);
      fetchComplaints();

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit complaint");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Campus Reporter</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto"
            size="lg"
          >
            <Camera className="mr-2 h-5 w-5" />
            Report New Issue
          </Button>
        </div>

        <ComplaintsList complaints={complaints} />

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Report Infrastructure Issue</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g., Broken water fountain"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe the issue in detail..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    placeholder="e.g., Building A, 2nd Floor"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="photo">Upload Photo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    required
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("photo")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Photo
                  </Button>
                  {photo && <span className="text-sm text-muted-foreground">{photo.name}</span>}
                </div>
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="mt-4 rounded-lg max-h-64 object-cover"
                  />
                )}
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Submitting..." : "Submit Report"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-md">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-success to-success-light animate-scale-in">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-success">Success!</h2>
              <p className="text-muted-foreground">
                Your complaint has been submitted to the accounter successfully.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ReporterDashboard;
