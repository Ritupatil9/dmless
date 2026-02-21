import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, XCircle, Upload, Briefcase } from "lucide-react";

// Demo job data
const demoJob = {
  title: "Frontend Developer",
  description:
    "We're looking for a skilled Frontend Developer to join our team. You'll build responsive interfaces using React and TypeScript, collaborate with designers, and ship features that delight users.",
  mcqs: [
    {
      question: "What hook is used for side effects in React?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correctAnswer: 1,
    },
    {
      question: "Which CSS property creates a flex container?",
      options: ["display: block", "display: flex", "display: grid", "display: inline"],
      correctAnswer: 1,
    },
    {
      question: "What does TypeScript add to JavaScript?",
      options: ["Runtime speed", "Static typing", "Database access", "Server rendering"],
      correctAnswer: 1,
    },
    {
      question: "Which method creates a new array from an existing one?",
      options: ["push()", "splice()", "map()", "pop()"],
      correctAnswer: 2,
    },
    {
      question: "What is the virtual DOM?",
      options: [
        "A browser API",
        "A lightweight copy of the real DOM",
        "A CSS framework",
        "A database technology",
      ],
      correctAnswer: 1,
    },
  ],
};

type Stage = "intro" | "quiz" | "knocked-out" | "passed" | "submitted";

const CandidateQuiz = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleStartQuiz = () => setStage("quiz");

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    const correct = demoJob.mcqs[currentQ].correctAnswer;
    if (Number(selectedAnswer) !== correct) {
      setStage("knocked-out");
      return;
    }
    if (currentQ < demoJob.mcqs.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
    } else {
      setStage("passed");
    }
  };

  const handleSubmitResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateEmail || !resumeFile) return;
    setStage("submitted");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Intro */}
        {stage === "intro" && (
          <div className="bg-card border border-border rounded-2xl p-8 text-center animate-scale-in">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-2xl font-bold mb-2">{demoJob.title}</h1>
            <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{demoJob.description}</p>
            <div className="bg-muted rounded-lg p-4 mb-6 text-sm text-muted-foreground">
              You'll answer {demoJob.mcqs.length} screening questions. All answers must be correct to proceed.
            </div>
            <Button onClick={handleStartQuiz} size="lg" className="w-full h-12">
              Start Screening
            </Button>
          </div>
        )}

        {/* Quiz */}
        {stage === "quiz" && (
          <div className="bg-card border border-border rounded-2xl p-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground font-medium">
                Question {currentQ + 1} of {demoJob.mcqs.length}
              </span>
              <div className="flex gap-1.5">
                {demoJob.mcqs.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i < currentQ ? "bg-success" : i === currentQ ? "bg-primary animate-pulse-soft" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
            <h2 className="font-heading text-xl font-semibold mb-6">
              {demoJob.mcqs[currentQ].question}
            </h2>
            <RadioGroup value={selectedAnswer ?? ""} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {demoJob.mcqs[currentQ].options.map((opt, i) => (
                  <label
                    key={i}
                    htmlFor={`opt-${i}`}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedAnswer === String(i)
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={String(i)} id={`opt-${i}`} />
                    <span className="text-sm font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>
            <Button
              onClick={handleAnswer}
              size="lg"
              className="w-full h-12 mt-6"
              disabled={selectedAnswer === null}
            >
              {currentQ < demoJob.mcqs.length - 1 ? "Next Question" : "Submit Answers"}
            </Button>
          </div>
        )}

        {/* Knocked out */}
        {stage === "knocked-out" && (
          <div className="bg-card border border-border rounded-2xl p-8 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-knockout/10 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-knockout" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-3">Not quite right</h2>
            <p className="text-muted-foreground mb-6">
              Unfortunately, your answer didn't match what we're looking for. Thank you for your interest!
            </p>
            <Button variant="outline" onClick={() => { setStage("intro"); setCurrentQ(0); setSelectedAnswer(null); }}>
              Try Again
            </Button>
          </div>
        )}

        {/* Passed - upload resume */}
        {stage === "passed" && (
          <div className="bg-card border border-border rounded-2xl p-8 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-center mb-2">Great job!</h2>
            <p className="text-muted-foreground text-center mb-8">
              You passed the screening. Upload your resume to complete your application.
            </p>
            <form onSubmit={handleSubmitResume} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <Label>Resume (PDF)</Label>
                <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {resumeFile ? resumeFile.name : "Click to upload PDF"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
              <Button type="submit" size="lg" className="w-full h-12" disabled={!candidateName || !candidateEmail || !resumeFile}>
                Submit Application
              </Button>
            </form>
          </div>
        )}

        {/* Submitted */}
        {stage === "submitted" && (
          <div className="bg-card border border-border rounded-2xl p-8 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-3">Application Submitted!</h2>
            <p className="text-muted-foreground">
              Thank you, {candidateName}. The recruiter will review your application and get back to you.
            </p>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-8">
          Powered by <span className="font-heading font-bold text-gradient">dmless</span>
        </p>
      </div>
    </div>
  );
};

export default CandidateQuiz;
