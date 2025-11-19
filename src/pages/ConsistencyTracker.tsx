import React, { useEffect, useMemo, useState } from 'react';
import StreakCalendar from '@/components/StreakCalendar';
import { format, subDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const STORAGE_KEY = 'skillswap:checkins';

function toYMD(d: Date) {
  return format(d, 'yyyy-MM-dd');
}

export default function ConsistencyTracker() {
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [newMinutes, setNewMinutes] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCompletedDates(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to read checkins from localStorage', e);
    }
  }, []);

  const handleCheckIn = () => {
    const today = toYMD(new Date());
    if (completedDates.includes(today)) return;
    const next = [...completedDates, today].sort();
    setCompletedDates(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error('Failed to save checkin', e);
    }
    toast.success('Check-in recorded! ✅');
  };

  const completedSet = useMemo(() => new Set(completedDates), [completedDates]);

  const streak = useMemo(() => {
    let count = 0;
    let day = new Date();
    while (true) {
      const ymd = toYMD(day);
      if (completedSet.has(ymd)) {
        count += 1;
        day = subDays(day, 1);
      } else break;
    }
    return count;
  }, [completedSet]);

  const logStudyTime = () => {
    const minutes = parseInt(newMinutes);
    if (isNaN(minutes) || minutes <= 0) {
      toast.error('Please enter a valid number of minutes');
      return;
    }
    const newTotal = todayMinutes + minutes;
    setTodayMinutes(newTotal);
    localStorage.setItem('todayMinutes', String(newTotal));
    setNewMinutes('');
    toast.success(`Logged ${minutes} minutes`);
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Consistency Tracker</h1>
              <p className="text-sm text-gray-600">Check in daily to build momentum and keep learning.</p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-extrabold">🔥 {streak}</div>
              <div className="text-sm text-gray-500">Day Streak</div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Button onClick={handleCheckIn} className="bg-gradient-to-r from-green-500 to-emerald-400 text-white" size="lg">
              Check-in
            </Button>

            <div className="text-sm text-gray-600">{completedDates.length ? `Last checked: ${completedDates[completedDates.length - 1]}` : 'No check-ins yet'}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Last 30 days</h2>
          <StreakCalendar completedDates={completedDates} days={30} />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div>
              <Label>Log Study Minutes</Label>
              <div className="flex gap-2 mt-2">
                <Input value={newMinutes} onChange={(e) => setNewMinutes(e.target.value)} placeholder="Minutes" />
                <Button onClick={logStudyTime}>Log</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Today's Progress</h3>
              <Progress value={Math.min((todayMinutes / 30) * 100, 100)} />
              <div className="text-xs text-gray-500 mt-2">{todayMinutes} / 30 min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useMemo, useState } from 'react';
import StreakCalendar from '../components/StreakCalendar';
import { format, subDays } from 'date-fns';

const STORAGE_KEY = 'skillswap:checkins';

function toYMD(d: Date) {
  return format(d, 'yyyy-MM-dd');
}

export default function ConsistencyTracker() {
  const [completedDates, setCompletedDates] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        setCompletedDates(parsed);
      }
    } catch (e) {
      console.error('Failed to read checkins from localStorage', e);
    }
  }, []);

  const handleCheckIn = () => {
    const today = toYMD(new Date());
    if (completedDates.includes(today)) return; // already checked in
    const next = [...completedDates, today].sort();
    setCompletedDates(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error('Failed to save checkin', e);
    }
  };

  const completedSet = useMemo(() => new Set(completedDates), [completedDates]);

  // compute consecutive day streak ending today
  const streak = useMemo(() => {
    let count = 0;
    let day = new Date();
    while (true) {
      const ymd = toYMD(day);
      if (completedSet.has(ymd)) {
        count += 1;
        day = subDays(day, 1);
      } else break;
    }
    return count;
  }, [completedSet]);

  const lastCheckIn = completedDates.length ? completedDates[completedDates.length - 1] : null;

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Consistency Tracker</h1>
              <p className="text-sm text-gray-600">Check in daily to build momentum and keep learning.</p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-extrabold">🔥 {streak}</div>
              <div className="text-sm text-gray-500">Day Streak</div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleCheckIn}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-full shadow-md hover:scale-105 transition-transform"
            >
              Check-in
            </button>

            <div className="text-sm text-gray-600">{lastCheckIn ? `Last checked: ${lastCheckIn}` : 'No check-ins yet'}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Last 30 days</h2>
          <StreakCalendar completedDates={completedDates} days={30} />
        </div>
      </div>
    </div>
  );
}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Brain, Flame, Target, TrendingUp, Calendar, Award, ArrowLeft, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import StreakCalendar from '@/components/StreakCalendar';
import { toast } from 'sonner';

export default function ConsistencyTracker() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(7);
  const [dailyGoal, setDailyGoal] = useState(30);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [studyDays, setStudyDays] = useState<Set<string>>(new Set());
  const [newMinutes, setNewMinutes] = useState('');

  useEffect(() => {
    // Load data from localStorage
    const savedStreak = localStorage.getItem('studyStreak');
    const savedGoal = localStorage.getItem('dailyGoal');
    const savedToday = localStorage.getItem('todayMinutes');
    const savedDays = localStorage.getItem('studyDays');

    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    if (savedToday) setTodayMinutes(parseInt(savedToday));
    if (savedDays) setStudyDays(new Set(JSON.parse(savedDays)));
  }, []);

  const logStudyTime = () => {
    const minutes = parseInt(newMinutes);
    if (isNaN(minutes) || minutes <= 0) {
      toast.error('Please enter a valid number of minutes');
      return;
    }

    const newTotal = todayMinutes + minutes;
    setTodayMinutes(newTotal);
    localStorage.setItem('todayMinutes', newTotal.toString());

    // Add today to study days
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const newStudyDays = new Set(studyDays);
    newStudyDays.add(dateStr);
    setStudyDays(newStudyDays);
    localStorage.setItem('studyDays', JSON.stringify(Array.from(newStudyDays)));

    // Update streak if goal is met
    if (newTotal >= dailyGoal && todayMinutes < dailyGoal) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('studyStreak', newStreak.toString());
      toast.success(`🔥 Streak extended to ${newStreak} days!`);
    } else {
      toast.success(`✅ Logged ${minutes} minutes of study time`);
    }

    setNewMinutes('');
  };

  const progressPercentage = Math.min((todayMinutes / dailyGoal) * 100, 100);

  const weeklyStats = [
    { day: 'Mon', minutes: 45, goal: dailyGoal },
    { day: 'Tue', minutes: 30, goal: dailyGoal },
    { day: 'Wed', minutes: 60, goal: dailyGoal },
    { day: 'Thu', minutes: 25, goal: dailyGoal },
    { day: 'Fri', minutes: 50, goal: dailyGoal },
    { day: 'Sat', minutes: 40, goal: dailyGoal },
    { day: 'Sun', minutes: todayMinutes, goal: dailyGoal },
  ];

  const achievements = [
    { title: '7-Day Warrior', description: 'Studied for 7 consecutive days', icon: '🔥', unlocked: streak >= 7 },
    { title: 'Early Bird', description: 'Studied before 8 AM', icon: '🌅', unlocked: true },
    { title: 'Night Owl', description: 'Studied after 10 PM', icon: '🦉', unlocked: false },
    { title: 'Marathon', description: 'Studied for 2+ hours in one session', icon: '🏃', unlocked: true },
    { title: 'Consistent', description: 'Met daily goal for 30 days', icon: '⭐', unlocked: false },
    { title: 'Overachiever', description: 'Exceeded daily goal by 2x', icon: '🚀', unlocked: true },
  ];

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
            <Flame className="h-10 w-10 text-orange-500" />
            Consistency Tracker
          </h1>
          <p className="text-gray-600">Build lasting study habits and track your progress</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats and Goals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Streak */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Flame className="h-8 w-8 text-orange-500" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold text-orange-600 mb-2">{streak}</div>
                  <div className="text-xl text-gray-600">days in a row 🔥</div>
                  <p className="text-sm text-gray-500 mt-4">Keep going! You're building an amazing habit.</p>
                </div>
              </CardContent>
            </Card>

            {/* Today's Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-indigo-600" />
                  Today's Progress
                </CardTitle>
                <CardDescription>Track your daily study time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Daily Goal: {dailyGoal} minutes</span>
                    <span className="text-sm font-medium text-indigo-600">{todayMinutes} / {dailyGoal} min</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  {todayMinutes >= dailyGoal && (
                    <p className="text-sm text-green-600 mt-2 font-medium">🎉 Goal achieved! Great work!</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="minutes">Log Study Time (minutes)</Label>
                    <Input
                      id="minutes"
                      type="number"
                      placeholder="30"
                      value={newMinutes}
                      onChange={(e) => setNewMinutes(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && logStudyTime()}
                    />
                  </div>
                  <Button onClick={logStudyTime} className="mt-auto bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Log Time
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  This Week's Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end gap-2 h-48">
                  {weeklyStats.map((stat, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '100%' }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-t-lg transition-all ${
                            stat.minutes >= stat.goal
                              ? 'bg-gradient-to-t from-green-400 to-emerald-500'
                              : 'bg-gradient-to-t from-indigo-400 to-purple-500'
                          }`}
                          style={{ height: `${Math.min((stat.minutes / stat.goal) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium">{stat.day}</div>
                        <div className="text-xs text-gray-500">{stat.minutes}m</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Study Calendar
                </CardTitle>
                <CardDescription>Visual overview of your study days</CardDescription>
              </CardHeader>
              <CardContent>
                <StreakCalendar studyDays={studyDays} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Achievements */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-amber-600" />
                  Achievements
                </CardTitle>
                <CardDescription>Unlock badges by staying consistent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          {achievement.unlocked && (
                            <Badge className="bg-amber-500 text-white text-xs">Unlocked</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Motivational Card */}
            <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0">
              <CardHeader>
                <CardTitle>Keep Going! 💪</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>Consistency is the key to mastery. Every minute you invest compounds over time.</p>
                <p className="font-semibold">
                  "Success is the sum of small efforts repeated day in and day out."
                </p>
                <Button onClick={() => navigate('/resources')} variant="secondary" className="w-full mt-4">
                  Find Study Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}