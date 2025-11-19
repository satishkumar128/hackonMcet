export { default } from './resources';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Brain, BookOpen, Video, FileText, Code, Bookmark, Search, ArrowLeft, ExternalLink, Clock, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'article' | 'exercise' | 'course';
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  isBookmarked: boolean;
  aiRecommended: boolean;
}

export default function Resources() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set([1, 4, 7]));

  const resources: Resource[] = [
    {
      id: 1,
      title: 'Algebra Fundamentals: Solving Equations',
      description: 'Master the basics of algebraic equations with step-by-step explanations and practice problems.',
      type: 'video',
      subject: 'Mathematics',
      difficulty: 'Beginner',
      duration: '45 min',
      rating: 4.8,
      isBookmarked: true,
      aiRecommended: true,
    },
    {
      id: 2,
      title: 'Introduction to React Hooks',
      description: 'Learn modern React development with hooks including useState, useEffect, and custom hooks.',
      type: 'course',
      subject: 'Programming',
      difficulty: 'Intermediate',
      duration: '3 hours',
      rating: 4.9,
      isBookmarked: false,
      aiRecommended: true,
    },
    {
      id: 3,
      title: 'Chemistry: Periodic Table Mastery',
      description: 'Comprehensive guide to understanding elements, groups, and periodic trends.',
      type: 'article',
      subject: 'Science',
      difficulty: 'Intermediate',
      duration: '20 min',
      rating: 4.6,
      isBookmarked: false,
      aiRecommended: false,
    },
    {
      id: 4,
      title: 'Python Practice: 100 Coding Challenges',
      description: 'Improve your Python skills with progressively difficult coding exercises and solutions.',
      type: 'exercise',
      subject: 'Programming',
      difficulty: 'Intermediate',
      duration: '10 hours',
      rating: 4.7,
      isBookmarked: true,
      aiRecommended: true,
    },
    {
      id: 5,
      title: 'English Grammar: Advanced Punctuation',
      description: 'Master complex punctuation rules including semicolons, colons, and em dashes.',
      type: 'article',
      subject: 'English',
      difficulty: 'Advanced',
      duration: '30 min',
      rating: 4.5,
      isBookmarked: false,
      aiRecommended: false,
    },
    {
      id: 6,
      title: 'Calculus Made Easy: Derivatives',
      description: 'Visual explanations of derivatives with real-world applications and practice problems.',
      type: 'video',
      subject: 'Mathematics',
      difficulty: 'Advanced',
      duration: '1 hour',
      rating: 4.9,
      isBookmarked: false,
      aiRecommended: true,
    },
    {
      id: 7,
      title: 'Art Fundamentals: Color Theory',
      description: 'Learn how to use color effectively in your artwork with practical exercises.',
      type: 'course',
      subject: 'Art',
      difficulty: 'Beginner',
      duration: '2 hours',
      rating: 4.8,
      isBookmarked: true,
      aiRecommended: true,
    },
    {
      id: 8,
      title: 'Physics: Newton\'s Laws Interactive',
      description: 'Interactive simulations to understand force, motion, and acceleration.',
      type: 'exercise',
      subject: 'Science',
      difficulty: 'Intermediate',
      duration: '1.5 hours',
      rating: 4.7,
      isBookmarked: false,
      aiRecommended: false,
    },
    {
      id: 9,
      title: 'World History: Industrial Revolution',
      description: 'Comprehensive overview of the Industrial Revolution and its global impact.',
      type: 'article',
      subject: 'History',
      difficulty: 'Intermediate',
      duration: '25 min',
      rating: 4.6,
      isBookmarked: false,
      aiRecommended: false,
    },
    {
      id: 10,
      title: 'JavaScript Algorithms & Data Structures',
      description: 'Master essential algorithms and data structures for coding interviews.',
      type: 'course',
      subject: 'Programming',
      difficulty: 'Advanced',
      duration: '8 hours',
      rating: 4.9,
      isBookmarked: false,
      aiRecommended: true,
    },
  ];

  const toggleBookmark = (id: number) => {
    const newBookmarks = new Set(bookmarkedIds);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
      toast.success('Removed from bookmarks');
    } else {
      newBookmarks.add(id);
      toast.success('Added to bookmarks! 📚');
    }
    setBookmarkedIds(newBookmarks);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'exercise': return <Code className="h-4 w-4" />;
      case 'course': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-blue-100 text-blue-700';
      case 'Advanced': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const aiRecommendedResources = filteredResources.filter((r) => r.aiRecommended);
  const bookmarkedResources = filteredResources.filter((r) => bookmarkedIds.has(r.id));

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="border-2 hover:border-indigo-300 transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              {getTypeIcon(resource.type)}
            </div>
            <div>
              <Badge variant="outline" className="text-xs capitalize mb-1">
                {resource.type}
              </Badge>
              {resource.aiRecommended && (
                <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs ml-1">
                  <Brain className="h-3 w-3 mr-1" />
                  AI Pick
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleBookmark(resource.id)}
            className={bookmarkedIds.has(resource.id) ? 'text-amber-500' : 'text-gray-400'}
          >
            <Bookmark className={`h-5 w-5 ${bookmarkedIds.has(resource.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <CardTitle className="text-lg">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {resource.subject}
          </Badge>
          <Badge className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
            {resource.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {resource.duration}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Star className="h-3 w-3 mr-1 fill-amber-400 text-amber-400" />
            {resource.rating}
          </Badge>
        </div>
        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
          <ExternalLink className="h-4 w-4 mr-2" />
          Start Learning
        </Button>
      </CardContent>
    </Card>
  );

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
            <BookOpen className="h-10 w-10 text-indigo-600" />
            Learning Resources
          </h1>
          <p className="text-gray-600">Personalized content based on your skill gaps and goals</p>
        </div>

        {/* AI Insights */}
        <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-indigo-600" />
              AI-Curated for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Based on your skill analysis, we recommend focusing on <strong>Mathematics (Algebra)</strong> and <strong>Art fundamentals</strong>. 
              These resources are specifically selected to address your learning gaps.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-red-100 text-red-700">🎯 Priority: Math</Badge>
              <Badge className="bg-blue-100 text-blue-700">📚 Recommended: Art</Badge>
              <Badge className="bg-green-100 text-green-700">💪 Maintain: Programming</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search resources by title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="recommended" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="recommended">
              <Brain className="h-4 w-4 mr-2" />
              AI Picks
            </TabsTrigger>
            <TabsTrigger value="all">
              <BookOpen className="h-4 w-4 mr-2" />
              All
            </TabsTrigger>
            <TabsTrigger value="bookmarked">
              <Bookmark className="h-4 w-4 mr-2" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiRecommendedResources.length > 0 ? (
                aiRecommendedResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No AI-recommended resources match your search.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No resources match your search.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bookmarked">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedResources.length > 0 ? (
                bookmarkedResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No bookmarked resources yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Click the bookmark icon on any resource to save it here.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}