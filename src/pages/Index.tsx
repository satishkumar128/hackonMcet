import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, Users, TrendingUp, Sparkles, BookOpen } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">LearnAI</span>
          </div>
          <Button onClick={() => navigate('/dashboard')} size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI-Powered Learning Revolution
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Master Your Skills with AI Guidance
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your skill gaps, stay consistent with personalized tracking, and connect with the perfect study peers—all powered by intelligent AI.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => navigate('/dashboard')} size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg px-8 py-6">
              Start Learning
            </Button>
            <Button onClick={() => navigate('/skill-analyzer')} variant="outline" size="lg" className="text-lg px-8 py-6">
              Take Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-indigo-300 transition-all hover:shadow-xl">
            <CardHeader>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>AI Skill Gap Analysis</CardTitle>
              <CardDescription>
                Intelligent assessments identify exactly where you need improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/skill-analyzer')} variant="ghost" className="w-full">
                Analyze Skills →
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-xl">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Consistency Tracking</CardTitle>
              <CardDescription>
                Build lasting habits with streak tracking and daily goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/consistency')} variant="ghost" className="w-full">
                Track Progress →
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-pink-300 transition-all hover:shadow-xl">
            <CardHeader>
              <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle>Smart Peer Matching</CardTitle>
              <CardDescription>
                Connect with students who complement your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/peers')} variant="ghost" className="w-full">
                Find Peers →
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-gray-600">Join thousands of students who are already mastering their skills with AI guidance</p>
          <Button onClick={() => navigate('/dashboard')} size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg px-12 py-6">
            <BookOpen className="mr-2 h-5 w-5" />
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
}
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50">
      <header className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            SkillSwap: Autonomous Peer Learning
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            AI system that analyzes skill gaps and matches you with the right peers.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="p-6">
                <CardTitle>Skill Analysis</CardTitle>
                <CardDescription>
                  AI analyzes your current abilities, finds gaps, and recommends a focused learning path.
                </CardDescription>
              </Card>

              <Card className="p-6">
                <CardTitle>Peer Matching</CardTitle>
                <CardDescription>
                  Match with peers who complement your strengths and help you learn through practice.
                </CardDescription>
              </Card>

              <Card className="p-6">
                <CardTitle>Consistency Tracking</CardTitle>
                <CardDescription>
                  Track your practice streaks and stay motivated with calendar-based progress insights.
                </CardDescription>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, Users, TrendingUp, Sparkles, BookOpen } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LearnAI
            </span>
          </div>
          <Button onClick={() => navigate('/dashboard')} size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI-Powered Learning Revolution
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Master Your Skills with AI Guidance
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your skill gaps, stay consistent with personalized tracking, and connect with the perfect study peers—all powered by intelligent AI.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => navigate('/dashboard')} size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg px-8 py-6">
              Start Learning
            </Button>
            <Button onClick={() => navigate('/skill-analyzer')} variant="outline" size="lg" className="text-lg px-8 py-6">
              Take Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-indigo-300 transition-all hover:shadow-xl">
            <CardHeader>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>AI Skill Gap Analysis</CardTitle>
              <CardDescription>
                Intelligent assessments identify exactly where you need improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/skill-analyzer')} variant="ghost" className="w-full">
                Analyze Skills →
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-xl">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Consistency Tracking</CardTitle>
              <CardDescription>
                Build lasting habits with streak tracking and daily goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/consistency')} variant="ghost" className="w-full">
                Track Progress →
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-pink-300 transition-all hover:shadow-xl">
            <CardHeader>
              <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle>Smart Peer Matching</CardTitle>
              <CardDescription>
                Connect with students who complement your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/peers')} variant="ghost" className="w-full">
                Find Peers →
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-indigo-100">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-indigo-100">Skill Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-indigo-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-indigo-100">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-gray-600">
            Join thousands of students who are already mastering their skills with AI guidance
          </p>
          <Button onClick={() => navigate('/dashboard')} size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg px-12 py-6">
            <BookOpen className="mr-2 h-5 w-5" />
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 LearnAI. Empowering students with intelligent learning.</p>
        </div>
      </footer>
    </div>
  );
}