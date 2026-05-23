import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Target,
  Award,
  PlayCircle,
  LogOut,
  Settings,
  Bell,
  Calendar,
  BarChart3,
  Zap,
  Brain,
  ChevronRight,
  Flame
} from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const user = {
    name: 'Ahmed Khan',
    email: 'ahmed.khan@example.com',
    streak: 7,
    totalTests: 45,
    accuracy: 78
  };

  const subjects = [
    { id: 'biology', name: 'Biology', progress: 65, total: 88, completed: 57, color: 'bg-green-500', icon: '🧬' },
    { id: 'chemistry', name: 'Chemistry', progress: 48, total: 56, completed: 27, color: 'bg-blue-500', icon: '🧪' },
    { id: 'physics', name: 'Physics', progress: 55, total: 44, completed: 24, color: 'bg-purple-500', icon: '⚛️' },
    { id: 'english', name: 'English', progress: 82, total: 12, completed: 10, color: 'bg-orange-500', icon: '📚' },
    { id: 'logical', name: 'Logical Reasoning', progress: 40, total: 20, completed: 8, color: 'bg-pink-500', icon: '🧠' }
  ];

  const dailyQuizzes = [
    { id: 1, title: 'Daily Biology Quiz', questions: 20, time: 15, subject: 'biology', difficulty: 'Medium' },
    { id: 2, title: 'Daily Chemistry Quiz', questions: 15, time: 12, subject: 'chemistry', difficulty: 'Easy' },
    { id: 3, title: 'Daily Physics Quiz', questions: 15, time: 12, subject: 'physics', difficulty: 'Medium' },
    { id: 4, title: 'Mixed Practice', questions: 30, time: 20, subject: 'mixed', difficulty: 'Hard' }
  ];

  const mockTests = [
    { id: 1, title: 'Full MDCAT Mock Test #1', questions: 200, time: 180, attempts: 0, difficulty: 'Real Exam' },
    { id: 2, title: 'Full MDCAT Mock Test #2', questions: 200, time: 180, attempts: 1, difficulty: 'Real Exam' },
    { id: 3, title: 'Biology Focused Mock', questions: 88, time: 80, attempts: 2, difficulty: 'Advanced' },
    { id: 4, title: 'Chemistry & Physics Mock', questions: 100, time: 90, attempts: 0, difficulty: 'Intermediate' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Fatima Ali', score: 8750, avatar: 'FA', badge: '🥇' },
    { rank: 2, name: 'Hassan Raza', score: 8420, avatar: 'HR', badge: '🥈' },
    { rank: 3, name: 'Ayesha Khan', score: 8190, avatar: 'AK', badge: '🥉' },
    { rank: 4, name: 'You', score: 7860, avatar: 'AK', badge: '', isUser: true },
    { rank: 5, name: 'Ali Ahmed', score: 7540, avatar: 'AA', badge: '' }
  ];

  const recentActivity = [
    { type: 'quiz', title: 'Biology Daily Quiz', score: 18, total: 20, time: '2 hours ago' },
    { type: 'mock', title: 'Full Mock Test #2', score: 156, total: 200, time: 'Yesterday' },
    { type: 'practice', title: 'Chemistry Practice', score: 25, total: 30, time: '2 days ago' }
  ];

  const continueTest = {
    id: 'mock-2',
    title: 'Full MDCAT Mock Test #2',
    progress: 45,
    questionsAnswered: 90,
    totalQuestions: 200,
    timeRemaining: 98
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">MDCAT Prep</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" onClick={() => navigate('/')}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {user.name}! 👋</h2>
              <p className="text-gray-600">Let's continue your MDCAT preparation</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
              <Flame className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-xl font-bold text-orange-600">{user.streak} Days</div>
                <div className="text-xs text-orange-700">Streak</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{user.totalTests}</div>
                  <div className="text-xs text-gray-600">Tests Taken</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{user.accuracy}%</div>
                  <div className="text-xs text-gray-600">Accuracy</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">#4</div>
                  <div className="text-xs text-gray-600">Rank</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2,450</div>
                  <div className="text-xs text-gray-600">Points</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Test Section */}
        {continueTest && (
          <Card className="mb-6 border-blue-500 border-2 bg-gradient-to-r from-blue-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2 bg-blue-600">In Progress</Badge>
                  <h3 className="font-bold text-xl mb-1">{continueTest.title}</h3>
                  <p className="text-sm text-gray-600">
                    {continueTest.questionsAnswered}/{continueTest.totalQuestions} questions answered • 
                    {continueTest.timeRemaining} min remaining
                  </p>
                </div>
                <Button onClick={() => navigate(`/exam/${continueTest.id}`)}>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
              <Progress value={continueTest.progress} className="h-2" />
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subject Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>Track your preparation across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div 
                      key={subject.id}
                      className="p-4 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setSelectedSubject(subject.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{subject.icon}</div>
                          <div>
                            <h4 className="font-semibold">{subject.name}</h4>
                            <p className="text-sm text-gray-600">
                              {subject.completed}/{subject.total} MCQs completed
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{subject.progress}%</div>
                        </div>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Quizzes & Mock Tests */}
            <Card>
              <CardHeader>
                <Tabs defaultValue="daily">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="daily">Daily Quizzes</TabsTrigger>
                    <TabsTrigger value="mock">Mock Tests</TabsTrigger>
                  </TabsList>

                  <TabsContent value="daily" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {dailyQuizzes.map((quiz) => (
                        <Card key={quiz.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-base">{quiz.title}</CardTitle>
                                <Badge variant="secondary" className="mt-2">
                                  {quiz.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                {quiz.questions} Questions
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {quiz.time} Minutes
                              </div>
                            </div>
                            <Button 
                              className="w-full" 
                              onClick={() => navigate(`/exam/daily-${quiz.id}`)}
                            >
                              Start Quiz
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="mock" className="mt-6">
                    <div className="space-y-3">
                      {mockTests.map((test) => (
                        <Card key={test.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{test.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    {test.questions} Q
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {test.time} min
                                  </span>
                                  <Badge variant="outline">{test.difficulty}</Badge>
                                  {test.attempts > 0 && (
                                    <span className="text-blue-600">
                                      Attempted {test.attempts}x
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Button onClick={() => navigate(`/exam/mock-${test.id}`)}>
                                {test.attempts > 0 ? 'Retry' : 'Start'}
                                <PlayCircle className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activity.type === 'quiz' ? 'bg-green-100' :
                          activity.type === 'mock' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                          {activity.type === 'quiz' ? <Zap className="w-5 h-5 text-green-600" /> :
                           activity.type === 'mock' ? <Trophy className="w-5 h-5 text-blue-600" /> :
                           <Brain className="w-5 h-5 text-purple-600" />}
                        </div>
                        <div>
                          <h5 className="font-medium">{activity.title}</h5>
                          <p className="text-sm text-gray-600">
                            Score: {activity.score}/{activity.total} • {activity.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant={activity.score / activity.total >= 0.8 ? "default" : "secondary"}>
                        {Math.round((activity.score / activity.total) * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Leaderboard
                </CardTitle>
                <CardDescription>Top performers this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry) => (
                    <div 
                      key={entry.rank}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        entry.isUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="text-lg font-bold text-gray-400 w-6">
                        {entry.badge || `#${entry.rank}`}
                      </div>
                      <Avatar>
                        <AvatarFallback className={entry.isUser ? 'bg-blue-600 text-white' : ''}>
                          {entry.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-sm text-gray-600">{entry.score} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>

            {/* Weak Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  Weak Areas
                </CardTitle>
                <CardDescription>Topics that need more practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">Organic Chemistry</span>
                      <span className="text-sm text-red-600">45%</span>
                    </div>
                    <Progress value={45} className="h-1.5" />
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">Thermodynamics</span>
                      <span className="text-sm text-orange-600">58%</span>
                    </div>
                    <Progress value={58} className="h-1.5" />
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">Genetics</span>
                      <span className="text-sm text-yellow-600">62%</span>
                    </div>
                    <Progress value={62} className="h-1.5" />
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Brain className="w-4 h-4 mr-2" />
                  Practice Weak Topics
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Study Planner
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
