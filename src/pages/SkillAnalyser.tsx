import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, TrendingUp, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import SkillChart from '@/components/SkillChart';

export default function SkillAnalyzer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const skillData = [
    { subject: 'Mathematics', score: 65, fullMark: 100 },
    { subject: 'Science', score: 82, fullMark: 100 },
    { subject: 'English', score: 78, fullMark: 100 },
    { subject: 'History', score: 71, fullMark: 100 },
    { subject: 'Programming', score: 88, fullMark: 100 },
    { subject: 'Art', score: 55, fullMark: 100 },
  ];

  const detailedSkills = [
    { 
      name: 'Algebra', 
      category: 'Mathematics', 
      level: 60, 
      status: 'needs-improvement',
      recommendation: 'Practice 20 minutes daily on quadratic equations'
    },
    { 
      name: 'Geometry', 
      category: 'Mathematics', 
      level: 70, 
      status: 'good',
      recommendation: 'Review triangle theorems and proofs'
    },
    { 
      name: 'Physics', 
      category: 'Science', 
      level: 85, 
      status: 'excellent',
      recommendation: 'Challenge yourself with advanced mechanics'
    },
    { 
      name: 'Chemistry', 
      category: 'Science', 
      level: 79, 
      status: 'good',
      recommendation: 'Focus on organic chemistry reactions'
    },
    { 
      name: 'Grammar', 
      category: 'English', 
      level: 82, 
      status: 'excellent',
      recommendation: 'Maintain with weekly practice'
    },
    { 
      name: 'Literature', 
      category: 'English', 
      level: 74, 
      status: 'good',
      recommendation: 'Read more classic novels'
    },
    { 
      name: 'JavaScript', 
      category: 'Programming', 
      level: 90, 
      status: 'excellent',
      recommendation: 'Explore advanced async patterns'
    },
    { 
      name: 'Python', 
      category: 'Programming', 
      level: 86, 
      status: 'excellent',
      recommendation: 'Practice data structures and algorithms'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-700 border-green-300';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'needs-improvement': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle2 className="h-4 w-4" />;
      case 'good': return <TrendingUp className="h-4 w-4" />;
      case 'needs-improvement': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LearnAI
              </span>
            </div>
          </div>
          <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Target className="h-10 w-10 text-indigo-600" />
            AI Skill Gap Analyzer
          </h1>
          <p className="text-gray-600">Discover your strengths and areas for improvement</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Skill Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Skill Profile</CardTitle>
                <CardDescription>Your performance across major subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillChart data={skillData} />
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Strong Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Programming</span>
                      <span className="font-semibold text-green-600">88%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Science</span>
                      <span className="font-semibold text-green-600">82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">English</span>
                      <span className="font-semibold text-green-600">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    Needs Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Art</span>
                      <span className="font-semibold text-red-600">55%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Mathematics</span>
                      <span className="font-semibold text-red-600">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">History</span>
                      <span className="font-semibold text-orange-600">71%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-indigo-600" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>✨ You excel at logical thinking (Programming, Science)</p>
                    <p>🎯 Focus on creative subjects for balance</p>
                    <p>📈 20% improvement possible in Math with daily practice</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-indigo-600" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>Personalized action plan for improvement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <h4 className="font-semibold text-red-900 mb-2">🎯 Priority: Mathematics</h4>
                  <p className="text-sm text-red-800 mb-3">Your weakest subject. Dedicate 30 minutes daily to algebra practice.</p>
                  <Button size="sm" onClick={() => navigate('/resources')} className="bg-red-600">
                    Find Math Resources
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <h4 className="font-semibold text-blue-900 mb-2">📚 Recommended: Art Fundamentals</h4>
                  <p className="text-sm text-blue-800 mb-3">Improve your creative skills with guided tutorials and practice exercises.</p>
                  <Button size="sm" variant="outline" onClick={() => navigate('/resources')}>
                    Explore Art Courses
                  </Button>
                </div>

                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h4 className="font-semibold text-green-900 mb-2">💪 Maintain: Programming Skills</h4>
                  <p className="text-sm text-green-800 mb-3">You're doing great! Challenge yourself with advanced projects.</p>
                  <Button size="sm" variant="outline" onClick={() => navigate('/resources')}>
                    Advanced Challenges
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Skill Breakdown</CardTitle>
                <CardDescription>Individual skill analysis with targeted recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {detailedSkills.map((skill, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:border-indigo-300 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-lg">{skill.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {skill.category}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(skill.status)}`}>
                          {getStatusIcon(skill.status)}
                          <span className="ml-1 capitalize">{skill.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                      <span className="text-2xl font-bold text-indigo-600">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="mb-3 h-2" />
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <Brain className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <p><strong>AI Recommendation:</strong> {skill.recommendation}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button onClick={() => navigate('/resources')} size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600">
            Browse Learning Resources
          </Button>
          <Button onClick={() => navigate('/peers')} variant="outline" size="lg">
            Find Study Partners
          </Button>
        </div>
      </div>
    </div>
  );
}