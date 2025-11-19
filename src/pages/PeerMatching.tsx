import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Brain, Users, MessageCircle, UserPlus, Search, ArrowLeft, Star, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Peer {
  id: number;
  name: string;
  avatar: string;
  skills: string[];
  interests: string[];
  level: string;
  matchScore: number;
  availability: string;
  bio: string;
}

export default function PeerMatching() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const peers: Peer[] = [
    {
      id: 1,
      name: 'Sarah Martinez',
      avatar: '👩‍💻',
      skills: ['JavaScript', 'React', 'Python'],
      interests: ['Web Development', 'AI', 'Data Science'],
      level: 'Advanced',
      matchScore: 95,
      availability: 'Evenings',
      bio: 'Passionate about coding and helping others learn. Love collaborative projects!',
    },
    {
      id: 2,
      name: 'Alex Chen',
      avatar: '👨‍🎓',
      skills: ['Mathematics', 'Physics', 'Chemistry'],
      interests: ['STEM', 'Problem Solving', 'Research'],
      level: 'Intermediate',
      matchScore: 88,
      availability: 'Weekends',
      bio: 'Math enthusiast looking for study partners. Great at explaining complex concepts.',
    },
    {
      id: 3,
      name: 'Emily Johnson',
      avatar: '👩‍🔬',
      skills: ['Biology', 'Chemistry', 'Research'],
      interests: ['Life Sciences', 'Lab Work', 'Medical'],
      level: 'Advanced',
      matchScore: 82,
      availability: 'Mornings',
      bio: 'Pre-med student who loves science. Happy to share study techniques!',
    },
    {
      id: 4,
      name: 'Marcus Brown',
      avatar: '👨‍💼',
      skills: ['English', 'History', 'Writing'],
      interests: ['Literature', 'Essays', 'Debate'],
      level: 'Intermediate',
      matchScore: 79,
      availability: 'Flexible',
      bio: 'Love discussing books and ideas. Strong writer available for peer review.',
    },
    {
      id: 5,
      name: 'Priya Patel',
      avatar: '👩‍🎨',
      skills: ['Art', 'Design', 'Digital Media'],
      interests: ['Creative Arts', 'UI/UX', 'Photography'],
      level: 'Advanced',
      matchScore: 75,
      availability: 'Afternoons',
      bio: 'Creative mind seeking artistic collaborators. Portfolio projects welcome!',
    },
    {
      id: 6,
      name: 'David Kim',
      avatar: '👨‍🏫',
      skills: ['Mathematics', 'Programming', 'Logic'],
      interests: ['Algorithms', 'Competitive Programming', 'Tutoring'],
      level: 'Expert',
      matchScore: 91,
      availability: 'Evenings',
      bio: 'Competitive programmer who enjoys teaching. Let\'s solve problems together!',
    },
  ];

  const handleConnect = (peerName: string) => {
    toast.success(`Connection request sent to ${peerName}! 🤝`);
  };

  const handleMessage = (peerName: string) => {
    toast.success(`Opening chat with ${peerName}... 💬`);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-purple-600 bg-purple-100';
    return 'text-gray-600 bg-gray-100';
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
            <Users className="h-10 w-10 text-pink-600" />
            Smart Peer Matching
          </h1>
          <p className="text-gray-600">Connect with students who complement your learning journey</p>
        </div>

        {/* AI Matching Info */}
        <Card className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-pink-600" />
              AI-Powered Matching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Our AI analyzes your skill gaps, learning goals, and study preferences to match you with the perfect study partners. 
              Higher match scores indicate better compatibility for collaborative learning.
            </p>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Study Partners</CardTitle>
            <CardDescription>Filter by subject, skill level, or search by name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Peer Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {peers
            .filter((peer) => 
              peer.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => b.matchScore - a.matchScore)
            .map((peer) => (
              <Card key={peer.id} className="border-2 hover:border-pink-300 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{peer.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{peer.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {peer.level}
                        </Badge>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full font-bold text-sm ${getMatchScoreColor(peer.matchScore)}`}>
                      <Star className="inline h-3 w-3 mr-1" />
                      {peer.matchScore}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{peer.bio}"</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      💪 Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {peer.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      ❤️ Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {peer.interests.map((interest, index) => (
                        <Badge key={index} className="bg-pink-100 text-pink-700 text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Available: {peer.availability}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button 
                      onClick={() => handleConnect(peer.name)} 
                      className="bg-gradient-to-r from-pink-600 to-purple-600"
                      size="sm"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                    <Button 
                      onClick={() => handleMessage(peer.name)} 
                      variant="outline"
                      size="sm"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Study Groups Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-indigo-600" />
              Suggested Study Groups
            </CardTitle>
            <CardDescription>Join groups aligned with your learning goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-indigo-200 rounded-lg bg-indigo-50">
                <h4 className="font-semibold mb-2">🎯 Math Problem Solvers</h4>
                <p className="text-sm text-gray-600 mb-3">Daily practice sessions for algebra and calculus</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">12 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>

              <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                <h4 className="font-semibold mb-2">💻 Code Warriors</h4>
                <p className="text-sm text-gray-600 mb-3">Collaborative coding projects and challenges</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">8 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>

              <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                <h4 className="font-semibold mb-2">🔬 Science Explorers</h4>
                <p className="text-sm text-gray-600 mb-3">Biology, chemistry, and physics study sessions</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">15 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>

              <div className="p-4 border-2 border-pink-200 rounded-lg bg-pink-50">
                <h4 className="font-semibold mb-2">📚 Literature Circle</h4>
                <p className="text-sm text-gray-600 mb-3">Book discussions and essay peer reviews</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">10 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Brain, Users, MessageCircle, UserPlus, Search, ArrowLeft, Star, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Peer {
  id: number;
  name: string;
  avatar: string;
  skills: string[];
  interests: string[];
  level: string;
  matchScore: number;
  availability: string;
  bio: string;
}

export default function PeerMatching() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const peers: Peer[] = [
    {
      id: 1,
      name: 'Sarah Martinez',
      avatar: '👩‍💻',
      skills: ['JavaScript', 'React', 'Python'],
      interests: ['Web Development', 'AI', 'Data Science'],
      level: 'Advanced',
      matchScore: 95,
      availability: 'Evenings',
      bio: 'Passionate about coding and helping others learn. Love collaborative projects!',
    },
    {
      id: 2,
      name: 'Alex Chen',
      avatar: '👨‍🎓',
      skills: ['Mathematics', 'Physics', 'Chemistry'],
      interests: ['STEM', 'Problem Solving', 'Research'],
      level: 'Intermediate',
      matchScore: 88,
      availability: 'Weekends',
      bio: 'Math enthusiast looking for study partners. Great at explaining complex concepts.',
    },
    {
      id: 3,
      name: 'Emily Johnson',
      avatar: '👩‍🔬',
      skills: ['Biology', 'Chemistry', 'Research'],
      interests: ['Life Sciences', 'Lab Work', 'Medical'],
      level: 'Advanced',
      matchScore: 82,
      availability: 'Mornings',
      bio: 'Pre-med student who loves science. Happy to share study techniques!',
    },
    {
      id: 4,
      name: 'Marcus Brown',
      avatar: '👨‍💼',
      skills: ['English', 'History', 'Writing'],
      interests: ['Literature', 'Essays', 'Debate'],
      level: 'Intermediate',
      matchScore: 79,
      availability: 'Flexible',
      bio: 'Love discussing books and ideas. Strong writer available for peer review.',
    },
    {
      id: 5,
      name: 'Priya Patel',
      avatar: '👩‍🎨',
      skills: ['Art', 'Design', 'Digital Media'],
      interests: ['Creative Arts', 'UI/UX', 'Photography'],
      level: 'Advanced',
      matchScore: 75,
      availability: 'Afternoons',
      bio: 'Creative mind seeking artistic collaborators. Portfolio projects welcome!',
    },
    {
      id: 6,
      name: 'David Kim',
      avatar: '👨‍🏫',
      skills: ['Mathematics', 'Programming', 'Logic'],
      interests: ['Algorithms', 'Competitive Programming', 'Tutoring'],
      level: 'Expert',
      matchScore: 91,
      availability: 'Evenings',
      bio: 'Competitive programmer who enjoys teaching. Let\'s solve problems together!',
    },
  ];

  const handleConnect = (peerName: string) => {
    toast.success(`Connection request sent to ${peerName}! 🤝`);
  };

  const handleMessage = (peerName: string) => {
    toast.success(`Opening chat with ${peerName}... 💬`);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-purple-600 bg-purple-100';
    return 'text-gray-600 bg-gray-100';
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
            <Users className="h-10 w-10 text-pink-600" />
            Smart Peer Matching
          </h1>
          <p className="text-gray-600">Connect with students who complement your learning journey</p>
        </div>

        {/* AI Matching Info */}
        <Card className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-pink-600" />
              AI-Powered Matching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Our AI analyzes your skill gaps, learning goals, and study preferences to match you with the perfect study partners. 
              Higher match scores indicate better compatibility for collaborative learning.
            </p>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Study Partners</CardTitle>
            <CardDescription>Filter by subject, skill level, or search by name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Peer Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {peers
            .filter((peer) => 
              peer.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => b.matchScore - a.matchScore)
            .map((peer) => (
              <Card key={peer.id} className="border-2 hover:border-pink-300 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{peer.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{peer.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {peer.level}
                        </Badge>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full font-bold text-sm ${getMatchScoreColor(peer.matchScore)}`}>
                      <Star className="inline h-3 w-3 mr-1" />
                      {peer.matchScore}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{peer.bio}"</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      💪 Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {peer.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      ❤️ Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {peer.interests.map((interest, index) => (
                        <Badge key={index} className="bg-pink-100 text-pink-700 text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Available: {peer.availability}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button 
                      onClick={() => handleConnect(peer.name)} 
                      className="bg-gradient-to-r from-pink-600 to-purple-600"
                      size="sm"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                    <Button 
                      onClick={() => handleMessage(peer.name)} 
                      variant="outline"
                      size="sm"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Study Groups Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-indigo-600" />
              Suggested Study Groups
            </CardTitle>
            <CardDescription>Join groups aligned with your learning goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-indigo-200 rounded-lg bg-indigo-50">
                <h4 className="font-semibold mb-2">🎯 Math Problem Solvers</h4>
                <p className="text-sm text-gray-600 mb-3">Daily practice sessions for algebra and calculus</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">12 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>

              <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                <h4 className="font-semibold mb-2">💻 Code Warriors</h4>
                <p className="text-sm text-gray-600 mb-3">Collaborative coding projects and challenges</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">8 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>

              <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                <h4 className="font-semibold mb-2">🔬 Science Explorers</h4>
                <p className="text-sm text-gray-600 mb-3">Biology, chemistry, and physics study sessions</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">15 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>

              <div className="p-4 border-2 border-pink-200 rounded-lg bg-pink-50">
                <h4 className="font-semibold mb-2">📚 Literature Circle</h4>
                <p className="text-sm text-gray-600 mb-3">Book discussions and essay peer reviews</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">10 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Brain, Users, MessageCircle, UserPlus, Search, ArrowLeft, Star, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Peer {
  id: number;
  name: string;
  avatar: string;
  skills: string[];
  interests: string[];
  level: string;
  matchScore: number;
  availability: string;
  bio: string;
}

export default function PeerMatching() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const peers: Peer[] = [
    {
      id: 1,
      name: 'Sarah Martinez',
      avatar: '👩‍💻',
      skills: ['JavaScript', 'React', 'Python'],
      interests: ['Web Development', 'AI', 'Data Science'],
      level: 'Advanced',
      matchScore: 95,
      availability: 'Evenings',
      bio: 'Passionate about coding and helping others learn. Love collaborative projects!',
    },
    {
      id: 2,
      name: 'Alex Chen',
      avatar: '👨‍🎓',
      skills: ['Mathematics', 'Physics', 'Chemistry'],
      interests: ['STEM', 'Problem Solving', 'Research'],
      level: 'Intermediate',
      matchScore: 88,
      availability: 'Weekends',
      bio: 'Math enthusiast looking for study partners. Great at explaining complex concepts.',
    },
    {
      id: 3,
      name: 'Emily Johnson',
      avatar: '👩‍🔬',
      skills: ['Biology', 'Chemistry', 'Research'],
      interests: ['Life Sciences', 'Lab Work', 'Medical'],
      level: 'Advanced',
      matchScore: 82,
      availability: 'Mornings',
      bio: 'Pre-med student who loves science. Happy to share study techniques!',
    },
    {
      id: 4,
      name: 'Marcus Brown',
      avatar: '👨‍💼',
      skills: ['English', 'History', 'Writing'],
      interests: ['Literature', 'Essays', 'Debate'],
      level: 'Intermediate',
      matchScore: 79,
      availability: 'Flexible',
      bio: 'Love discussing books and ideas. Strong writer available for peer review.',
    },
    {
      id: 5,
      name: 'Priya Patel',
      avatar: '👩‍🎨',
      skills: ['Art', 'Design', 'Digital Media'],
      interests: ['Creative Arts', 'UI/UX', 'Photography'],
      level: 'Advanced',
      matchScore: 75,
      availability: 'Afternoons',
      bio: 'Creative mind seeking artistic collaborators. Portfolio projects welcome!',
    },
    {
      id: 6,
      name: 'David Kim',
      avatar: '👨‍🏫',
      skills: ['Mathematics', 'Programming', 'Logic'],
      interests: ['Algorithms', 'Competitive Programming', 'Tutoring'],
      level: 'Expert',
      matchScore: 91,
      availability: 'Evenings',
      bio: 'Competitive programmer who enjoys teaching. Let\'s solve problems together!',
    },
  ];

  const handleConnect = (peerName: string) => {
    toast.success(`Connection request sent to ${peerName}! 🤝`);
  };

  const handleMessage = (peerName: string) => {
    toast.success(`Opening chat with ${peerName}... 💬`);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-purple-600 bg-purple-100';
    return 'text-gray-600 bg-gray-100';
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
            <Users className="h-10 w-10 text-pink-600" />
            Smart Peer Matching
          </h1>
          <p className="text-gray-600">Connect with students who complement your learning journey</p>
        </div>

        {/* AI Matching Info */}
        <Card className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-pink-600" />
              AI-Powered Matching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Our AI analyzes your skill gaps, learning goals, and study preferences to match you with the perfect study partners. 
              Higher match scores indicate better compatibility for collaborative learning.
            </p>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Study Partners</CardTitle>
            <CardDescription>Filter by subject, skill level, or search by name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Peer Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {peers
            .filter((peer) => 
              peer.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => b.matchScore - a.matchScore)
            .map((peer) => (
              <Card key={peer.id} className="border-2 hover:border-pink-300 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{peer.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{peer.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {peer.level}
                        </Badge>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full font-bold text-sm ${getMatchScoreColor(peer.matchScore)}`}>
                      <Star className="inline h-3 w-3 mr-1" />
                      {peer.matchScore}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{peer.bio}"</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      💪 Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {peer.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      ❤️ Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {peer.interests.map((interest, index) => (
                        <Badge key={index} className="bg-pink-100 text-pink-700 text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Available: {peer.availability}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button 
                      onClick={() => handleConnect(peer.name)} 
                      className="bg-gradient-to-r from-pink-600 to-purple-600"
                      size="sm"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                    <Button 
                      onClick={() => handleMessage(peer.name)} 
                      variant="outline"
                      size="sm"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Study Groups Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-indigo-600" />
              Suggested Study Groups
            </CardTitle>
            <CardDescription>Join groups aligned with your learning goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-indigo-200 rounded-lg bg-indigo-50">
                <h4 className="font-semibold mb-2">🎯 Math Problem Solvers</h4>
                <p className="text-sm text-gray-600 mb-3">Daily practice sessions for algebra and calculus</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">12 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>

              <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                <h4 className="font-semibold mb-2">💻 Code Warriors</h4>
                <p className="text-sm text-gray-600 mb-3">Collaborative coding projects and challenges</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">8 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>

              <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                <h4 className="font-semibold mb-2">🔬 Science Explorers</h4>
                <p className="text-sm text-gray-600 mb-3">Biology, chemistry, and physics study sessions</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">15 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>

              <div className="p-4 border-2 border-pink-200 rounded-lg bg-pink-50">
                <h4 className="font-semibold mb-2">📚 Literature Circle</h4>
                <p className="text-sm text-gray-600 mb-3">Book discussions and essay peer reviews</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">10 members</span>
                  <Button size="sm" variant="outline">Join Group</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}