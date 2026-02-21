import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3, Users, XCircle, CheckCircle, ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  createdAt: string;
  link: string;
  stats: { applied: number; knockedOut: number; shortlisted: number };
}

const mockJobs: Job[] = [
  {
    id: "demo",
    title: "Frontend Developer",
    createdAt: "2026-02-18",
    link: "/quiz/demo",
    stats: { applied: 45, knockedOut: 28, shortlisted: 17 },
  },
  {
    id: "2",
    title: "Product Designer",
    createdAt: "2026-02-15",
    link: "/quiz/2",
    stats: { applied: 32, knockedOut: 20, shortlisted: 12 },
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [jobs] = useState<Job[]>(mockJobs);

  const totalApplied = jobs.reduce((s, j) => s + j.stats.applied, 0);
  const totalKnocked = jobs.reduce((s, j) => s + j.stats.knockedOut, 0);
  const totalShortlisted = jobs.reduce((s, j) => s + j.stats.shortlisted, 0);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(window.location.origin + link);
    toast({ title: "Link copied!", description: "Share it anywhere." });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="font-heading text-2xl font-bold text-gradient">
            dmless
          </Link>
          <Link to="/create">
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> New Hiring Link
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10">
        <h1 className="font-heading text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <StatCard icon={Users} label="Total Applied" value={totalApplied} color="primary" />
          <StatCard icon={XCircle} label="Knocked Out" value={totalKnocked} color="knockout" />
          <StatCard icon={CheckCircle} label="Shortlisted" value={totalShortlisted} color="success" />
        </div>

        {/* Jobs */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Your Hiring Links
          </h2>
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-heading text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">Created {job.createdAt}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" /> {job.stats.applied}
                </span>
                <span className="flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-knockout" /> {job.stats.knockedOut}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-success" /> {job.stats.shortlisted}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => copyLink(job.link)} className="gap-1.5">
                  <Copy className="w-3.5 h-3.5" /> Copy Link
                </Button>
                <Link to={job.link}>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" /> Preview
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) => (
  <div className="bg-card border border-border rounded-xl p-6 animate-fade-in">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center`}>
        <Icon className={`w-5 h-5 text-${color}`} />
      </div>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
    <p className="font-heading text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
