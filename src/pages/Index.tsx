import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, BarChart3, Link2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="font-heading text-2xl font-bold text-gradient">
            dmless
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-accent text-accent-foreground text-sm font-medium animate-fade-in">
            <Zap className="w-4 h-4" />
            Hire smarter, not harder
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            One link to screen.
            <br />
            <span className="text-gradient">Zero DMs.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Create smart hiring links with built-in MCQ screening. Share on LinkedIn, Instagram, anywhere.
            Candidates who don't qualify get knocked out automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 h-12 gap-2">
                Start Hiring <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/quiz/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 h-12">
                See Candidate View
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
            Three steps to a better hiring pipeline
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Link2,
                title: "Create a hiring link",
                desc: "Add job role, description, and 5 MCQs with knockout answers. Get a shareable link instantly.",
              },
              {
                icon: Shield,
                title: "Auto-screen candidates",
                desc: "Wrong answer? Knocked out. Only qualified candidates make it through to upload their resume.",
              },
              {
                icon: BarChart3,
                title: "Track your pipeline",
                desc: "See applied, knocked out, and shortlisted counts at a glance. Download resumes in bulk.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="gradient-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-heading font-bold text-gradient">dmless</span>
          <span>© 2026 dmless. Hire without the noise.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
