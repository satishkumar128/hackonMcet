import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Users, BookOpen, TrendingUp, Flame, Award, ArrowRight } from 'lucide-react';
import SkillChart from '@/components/SkillChart';

export default function Dashboard() {
  const [streak, setStreak] = useState(7);
  const [skillsTracked, setSkillsTracked] = useState(12);
  const [peersConnected, setPeersConnected] = useState(5);

  useEffect(() => {
    const savedStreak = localStorage.getItem('studyStreak');
    const savedSkills = localStorage.getItem('skillsTracked');
    const savedPeers = localStorage.getItem('peersConnected');

    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedSkills) setSkillsTracked(parseInt(savedSkills));
    if (savedPeers) setPeersConnected(parseInt(savedPeers));
  }, []);

  const miniChartData = [
    { subject: 'Python', A: 75, fullMark: 100 },
    { subject: 'React', A: 62, fullMark: 100 },
    { subject: 'UI Design', A: 50, fullMark: 100 },
    { subject: 'Algorithms', A: 42, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
  ];

  const recommendations = [
    'Connect with Aisha Khan to pair on Python exercises',
    'Review Python Basics — variables & control flow',
    'Practice React hooks: useState/useEffect for 30 minutes',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">LearnAI</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost">Skills</Button>
            <Button variant="ghost">Progress</Button>
            <Button variant="ghost">Peers</Button>
            <Button variant="ghost">Resources</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Student! 👋</h1>
          <p className="text-gray-600">Here's your learning progress overview</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Flame className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">{streak} days</div>
              <p className="text-xs text-gray-600 mt-1">Keep it going! 🔥</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Skills Tracked</CardTitle>
              <Target className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{skillsTracked}</div>
              <p className="text-xs text-gray-600 mt-1">Across multiple subjects</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Peer Connections</CardTitle>
              <Users className="h-5 w-5 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-600">{peersConnected}</div>
              <p className="text-xs text-gray-600 mt-1">Active study partners</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: 260 }}>
                <SkillChart data={miniChartData} dataKey="A" height={260} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {recommendations.map((r, i) => (
                  <li key={i} className="text-gray-700">{r}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SkillChart from '../components/SkillChart';
import { format, subDays } from 'date-fns';

const STORAGE_KEY = 'skillswap:checkins';

function toYMD(d: Date) {
  return format(d, 'yyyy-MM-dd');
}

export default function Dashboard() {
  const [checkins, setCheckins] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCheckins(JSON.parse(raw));
    } catch (e) {
      console.error('failed to read checkins', e);
    }
  }, []);

  const streak = useMemo(() => {
    const set = new Set(checkins);
    let count = 0;
    let day = new Date();
    while (true) {
      const ymd = toYMD(day);
      if (set.has(ymd)) {
        count += 1;
        day = subDays(day, 1);
      } else break;
    }
    return count;
  }, [checkins]);

  const miniChartData = [
    { subject: 'Python', A: 75, fullMark: 100 },
    { subject: 'React', A: 62, fullMark: 100 },
    { subject: 'UI Design', A: 50, fullMark: 100 },
    { subject: 'Algorithms', A: 42, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
  ];

  const recommendedActions = [
    'Connect with Aisha Khan to pair on Python exercises',
    'Review Python Basics — variables & control flow',
    'Practice React hooks: useState/useEffect for 30 minutes',
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Good to see you!</h2>
                  <p className="text-sm text-gray-600">Keep up the momentum — small consistent steps add up.</p>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-extrabold">🔥 {streak}</div>
                  <div className="text-sm text-gray-500">Current Study Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: 260 }}>
                <SkillChart data={miniChartData} dataKey="A" height={260} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendedActions.map((r, i) => (
                <li key={i} className="text-gray-700">{r}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, Users, BookOpen, TrendingUp, Flame, Award, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [skillsTracked, setSkillsTracked] = useState(0);
  const [peersConnected, setPeersConnected] = useState(0);

  useEffect(() => {
    // Load data from localStorage
    const savedStreak = localStorage.getItem('studyStreak');
    const savedSkills = localStorage.getItem('skillsTracked');
    const savedPeers = localStorage.getItem('peersConnected');
    
    setStreak(savedStreak ? parseInt(savedStreak) : 7);
    setSkillsTracked(savedSkills ? parseInt(savedSkills) : 12);
    setPeersConnected(savedPeers ? parseInt(savedPeers) : 5);
  }, []);

  const recentActivity = [
    { action: 'Completed Math assessment', time: '2 hours ago', icon: Target },
    { action: 'Connected with Sarah M.', time: '5 hours ago', icon: Users },
    { action: 'Studied for 45 minutes', time: '1 day ago', icon: BookOpen },
    { action: 'Achieved 7-day streak', time: '2 days ago', icon: Flame },
  ];

  const recommendations = [
    {
      title: 'Practice Algebra',
      description: 'Your weakest area - 20 min daily recommended',
      priority: 'high',
      icon: Target,
    },
    {
      title: 'Join Study Group',
      description: '3 peers match your learning goals',
      priority: 'medium',
      icon: Users,
    },
    {
      title: 'Review Chemistry',
      description: 'Strengthen your foundation concepts',
      priority: 'medium',
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LearnAI
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate('/skill-analyzer')}>Skills</Button>
            <Button variant="ghost" onClick={() => navigate('/consistency')}>Progress</Button>
            <Button variant="ghost" onClick={() => navigate('/peers')}>Peers</Button>
            <Button variant="ghost" onClick={() => navigate('/resources')}>Resources</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Student! 👋</h1>
          <p className="text-gray-600">Here's your learning progress overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Flame className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">{streak} days</div>
              <p className="text-xs text-gray-600 mt-1">Keep it going! 🔥</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Skills Tracked</CardTitle>
              <Target className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{skillsTracked}</div>
              <p className="text-xs text-gray-600 mt-1">Across 5 subjects</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Peer Connections</CardTitle>
              <Users className="h-5 w-5 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-600">{peersConnected}</div>
              <p className="text-xs text-gray-600 mt-1">Active study partners</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Recommendations */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-indigo-600" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Personalized suggestions for your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border hover:border-indigo-300 transition-all cursor-pointer">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      rec.priority === 'high' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <rec.icon className={`h-5 w-5 ${
                        rec.priority === 'high' ? 'text-red-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{rec.title}</h4>
                        {rec.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">Priority</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest learning milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                      <activity.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button onClick={() => navigate('/skill-analyzer')} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Target className="mr-2 h-4 w-4" />
                  Assess Skills
                </Button>
                <Button onClick={() => navigate('/consistency')} variant="outline">
                  <Flame className="mr-2 h-4 w-4" />
                  Log Study
                </Button>
                <Button onClick={() => navigate('/peers')} variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Find Peers
                </Button>
                <Button onClick={() => navigate('/resources')} variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievement Section */}
        <Card className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-amber-600" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Badge className="bg-amber-500 text-white px-4 py-2 text-sm">🔥 7-Day Streak</Badge>
              <Badge className="bg-blue-500 text-white px-4 py-2 text-sm">📊 Math Master</Badge>
              <Badge className="bg-purple-500 text-white px-4 py-2 text-sm">🤝 Team Player</Badge>
              <Badge className="bg-green-500 text-white px-4 py-2 text-sm">⭐ Quick Learner</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}