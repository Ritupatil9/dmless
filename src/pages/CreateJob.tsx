import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number;
}

const CreateJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mcqs, setMcqs] = useState<MCQ[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  const addMCQ = () => {
    if (mcqs.length >= 5) return;
    setMcqs([...mcqs, { question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
  };

  const removeMCQ = (idx: number) => {
    if (mcqs.length <= 1) return;
    setMcqs(mcqs.filter((_, i) => i !== idx));
  };

  const updateMCQ = (idx: number, field: Partial<MCQ>) => {
    const updated = [...mcqs];
    updated[idx] = { ...updated[idx], ...field };
    setMcqs(updated);
  };

  const updateOption = (mcqIdx: number, optIdx: number, value: string) => {
    const updated = [...mcqs];
    updated[mcqIdx].options[optIdx] = value;
    setMcqs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: "Job title is required", variant: "destructive" });
      return;
    }
    if (mcqs.some((m) => !m.question.trim() || m.options.some((o) => !o.trim()))) {
      toast({ title: "All MCQ fields are required", variant: "destructive" });
      return;
    }
    // In production, save to DB. For now, navigate back.
    toast({ title: "Hiring link created!", description: "Share it with candidates." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="font-heading text-2xl font-bold text-gradient">
            dmless
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-3xl">
        <Button variant="ghost" size="sm" className="gap-1.5 mb-6" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Button>

        <h1 className="font-heading text-3xl font-bold mb-2">Create Hiring Link</h1>
        <p className="text-muted-foreground mb-8">Set up the job and screening questions. Candidates with wrong answers get knocked out.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Details */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h2 className="font-heading text-lg font-semibold">Job Details</h2>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Frontend Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Job Description</Label>
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the role, requirements, and what you're looking for..."
                rows={5}
              />
            </div>
          </div>

          {/* MCQs */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">Screening Questions ({mcqs.length}/5)</h2>
              {mcqs.length < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={addMCQ} className="gap-1.5">
                  <Plus className="w-4 h-4" /> Add Question
                </Button>
              )}
            </div>

            {mcqs.map((mcq, mcqIdx) => (
              <div key={mcqIdx} className="bg-card border border-border rounded-xl p-6 space-y-4 animate-fade-in">
                <div className="flex items-start justify-between">
                  <Label className="text-base font-semibold">Question {mcqIdx + 1}</Label>
                  {mcqs.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeMCQ(mcqIdx)}>
                      <Trash2 className="w-4 h-4 text-knockout" />
                    </Button>
                  )}
                </div>

                <Input
                  value={mcq.question}
                  onChange={(e) => updateMCQ(mcqIdx, { question: e.target.value })}
                  placeholder="Enter your question..."
                />

                <div className="space-y-3">
                  <Label className="text-sm text-muted-foreground">Options (select the correct answer)</Label>
                  <RadioGroup
                    value={String(mcq.correctAnswer)}
                    onValueChange={(val) => updateMCQ(mcqIdx, { correctAnswer: Number(val) })}
                  >
                    {mcq.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-3">
                        <RadioGroupItem value={String(optIdx)} id={`q${mcqIdx}-o${optIdx}`} />
                        <Input
                          value={opt}
                          onChange={(e) => updateOption(mcqIdx, optIdx, e.target.value)}
                          placeholder={`Option ${optIdx + 1}`}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            ))}
          </div>

          <Button type="submit" size="lg" className="w-full h-12 text-lg">
            Create Hiring Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
