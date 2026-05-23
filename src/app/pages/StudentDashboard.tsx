import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Award, BarChart3, Bell, BookOpen, Brain, Calendar, ChevronRight, Clock, Flame, LogOut, PlayCircle, Settings, Target, TrendingUp, Trophy, Zap } from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getPlatformState, logout } from '../lib/platform';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const state = getPlatformState();
  const session = state.currentSession;
  const student = state.students.find((item) => item.email === session?.email);

  const user = {
    name: student?.name ?? 'Student',
    email: student?.email ?? 'student@example.com',
    streak: 7,
    totalTests: student?.testsCompleted ?? 0,
    accuracy: student?.avgScore ?? 0,
  };

  const subjects = [
    { id: 'biology', name: 'Biology', progress: 65, total: 88, completed: 57, color: 'bg-green-500', icon: 'B' },
    { id: 'chemistry', name: 'Chemistry', progress: 48, total: 56, completed: 27, color: 'bg-blue-500', icon: 'C' },
    { id: 'physics', name: 'Physics', progress: 55, total: 44, completed: 24, color: 'bg-purple-500', icon: 'P' },
    { id: 'english', name: 'English', progress: 82, total: 12, completed: 10, color: 'bg-orange-500', icon: 'E' },
    { id: 'logical', name: 'Logical Reasoning', progress: 40, total: 20, completed: 8, color: 'bg-pink-500', icon: 'L' },
  ];

  const dailyQuizzes = [
    { id: 1, title: 'Daily Biology Quiz', questions: 20, time: 15, difficulty: 'Medium' },
    { id: 2, title: 'Daily Chemistry Quiz', questions: 15, time: 12, difficulty: 'Easy' },
    { id: 3, title: 'Daily Physics Quiz', questions: 15, time: 12, difficulty: 'Medium' },
    { id: 4, title: 'Mixed Practice', questions: 30, time: 20, difficulty: 'Hard' },
  ];

  const mockTests = [
    { id: 1, title: 'Full MDCAT Mock Test #1', questions: 200, time: 180, attempts: 0, difficulty: 'Real Exam' },
    { id: 2, title: 'Full MDCAT Mock Test #2', questions: 200, time: 180, attempts: 1, difficulty: 'Real Exam' },
    { id: 3, title: 'Biology Focused Mock', questions: 88, time: 80, attempts: 2, difficulty: 'Advanced' },
  ];

  const leaderboard = [...state.students]
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 5)
    .map((entry, index) => ({
      rank: index + 1,
      name: entry.email === user.email ? 'You' : entry.name,
      score: entry.avgScore,
      avatar: entry.name.split(' ').map((item) => item[0]).join(''),
      isUser: entry.email === user.email,
    }));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">MDCAT Prep</h1>
                <p className="text-xs text-gray-500">Student Dashboard</p>
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
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {user.name}!</h2>
              <p className="text-gray-600">{user.email} is verified and active for student access.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
              <Flame className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-xl font-bold text-orange-600">{user.streak} Days</div>
                <div className="text-xs text-orange-700">Streak</div>
              </div>
            </div>
          </div>

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
                  <div className="text-2xl font-bold">{leaderboard.findIndex((item) => item.isUser) + 1 || '-'}</div>
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
                  <div className="text-2xl font-bold">{state.mcqs.length}</div>
                  <div className="text-xs text-gray-600">MCQs Available</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-6 border-blue-500 border-2 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-2 bg-blue-600">Verified Student Access</Badge>
                <h3 className="font-bold text-xl mb-1">Email-only login is active</h3>
                <p className="text-sm text-gray-600">Your account uses OTP verification and is tied to one student email.</p>
              </div>
              <Button onClick={() => navigate('/exam/mock-2')}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
            <Progress value={45} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
                          <div className="text-2xl font-semibold">{subject.icon}</div>
                          <div>
                            <h4 className="font-semibold">{subject.name}</h4>
                            <p className="text-sm text-gray-600">{subject.completed}/{subject.total} MCQs completed</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{subject.progress}%</div>
                        </div>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      {selectedSubject === subject.id && (
                        <p className="mt-2 text-xs text-blue-600">Focused practice recommended for {subject.name}.</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                            <CardTitle className="text-base">{quiz.title}</CardTitle>
                            <Badge variant="secondary" className="mt-2 w-fit">{quiz.difficulty}</Badge>
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
                            <Button className="w-full" onClick={() => navigate(`/exam/daily-${quiz.id}`)}>
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
                                  <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{test.questions} Q</span>
                                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{test.time} min</span>
                                  <Badge variant="outline">{test.difficulty}</Badge>
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
          </div>

          <div className="space-y-6">
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
                    <div key={entry.rank} className={`flex items-center gap-3 p-3 rounded-lg ${entry.isUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
                      <div className="text-lg font-bold text-gray-400 w-6">#{entry.rank}</div>
                      <Avatar>
                        <AvatarFallback className={entry.isUser ? 'bg-blue-600 text-white' : ''}>{entry.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-sm text-gray-600">{entry.score}% avg score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Brain className="w-4 h-4 mr-2" />
                  Practice Weak Topics
                </Button>
              </CardContent>
            </Card>

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
