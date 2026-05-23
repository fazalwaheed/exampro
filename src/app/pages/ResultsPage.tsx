import { useNavigate, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BookOpen,
  Award,
  BarChart3,
  Home,
  RotateCcw
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state (or use mock data)
  const { score = 7, total = 10, answers = {}, questions = [] } = location.state || {};
  
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 60;

  useEffect(() => {
    if (passed && percentage >= 80) {
      // Trigger confetti for high scores
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [passed, percentage]);

  // Subject-wise performance
  const subjectPerformance = [
    { subject: 'Biology', correct: 3, total: 4, percentage: 75, color: '#10b981' },
    { subject: 'Chemistry', correct: 2, total: 3, percentage: 67, color: '#3b82f6' },
    { subject: 'Physics', correct: 1, total: 2, percentage: 50, color: '#8b5cf6' },
    { subject: 'English', correct: 1, total: 1, percentage: 100, color: '#f97316' }
  ];

  // Performance radar data
  const radarData = [
    { subject: 'Biology', score: 75, fullMark: 100 },
    { subject: 'Chemistry', score: 67, fullMark: 100 },
    { subject: 'Physics', score: 50, fullMark: 100 },
    { subject: 'English', score: 100, fullMark: 100 },
    { subject: 'Logical', score: 0, fullMark: 100 }
  ];

  // Weak areas
  const weakAreas = [
    { topic: 'Organic Chemistry', accuracy: 45, questions: 8 },
    { topic: 'Thermodynamics', accuracy: 50, questions: 6 },
    { topic: 'Cell Biology', accuracy: 62, questions: 10 }
  ];

  // Leaderboard
  const leaderboard = [
    { rank: 1, name: 'Fatima Ali', score: 92, avatar: 'FA' },
    { rank: 2, name: 'Hassan Raza', score: 88, avatar: 'HR' },
    { rank: 3, name: 'Ayesha Khan', score: 85, avatar: 'AK' },
    { rank: 4, name: 'You', score: percentage, avatar: 'AK', isUser: true },
    { rank: 5, name: 'Ali Ahmed', score: 78, avatar: 'AA' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Test Results</h1>
                <p className="text-xs text-gray-500">Performance Analysis</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button onClick={() => navigate('/exam/retry')}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry Test
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Score Card */}
        <Card className={`mb-8 ${passed ? 'border-green-500 bg-gradient-to-r from-green-50 to-white' : 'border-red-500 bg-gradient-to-r from-red-50 to-white'}`}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-6 mb-6 md:mb-0">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
                  {passed ? (
                    <Trophy className="w-16 h-16 text-green-600" />
                  ) : (
                    <AlertCircle className="w-16 h-16 text-red-600" />
                  )}
                </div>
                <div>
                  <Badge className={`mb-2 ${passed ? 'bg-green-600' : 'bg-red-600'}`}>
                    {passed ? '🎉 Congratulations!' : '📝 Keep Practicing'}
                  </Badge>
                  <h2 className="text-4xl font-bold mb-2">
                    {score}/{total}
                  </h2>
                  <p className="text-xl text-gray-600 mb-1">
                    You scored <span className="font-bold">{percentage}%</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {passed ? 'Great job! You passed the test.' : 'Don\'t worry, practice makes perfect!'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-xs text-gray-600">Correct</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{total - score}</div>
                  <div className="text-xs text-gray-600">Incorrect</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
                  <div className="text-xs text-gray-600">Accuracy</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="weak-areas">Weak Areas</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject-wise Performance</CardTitle>
                  <CardDescription>Your score distribution across subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="percentage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Radar */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Radar</CardTitle>
                  <CardDescription>Comprehensive view of your strengths</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{percentage}%</div>
                      <div className="text-xs text-gray-600">Overall Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">+12%</div>
                      <div className="text-xs text-gray-600">vs Last Test</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">#4</div>
                      <div className="text-xs text-gray-600">Your Rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">8m</div>
                      <div className="text-xs text-gray-600">Avg Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects">
            <div className="grid gap-4">
              {subjectPerformance.map((subject, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{subject.subject}</h3>
                        <p className="text-sm text-gray-600">
                          {subject.correct} out of {subject.total} questions correct
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold" style={{ color: subject.color }}>
                          {subject.percentage}%
                        </div>
                        <Badge variant={subject.percentage >= 70 ? "default" : "secondary"}>
                          {subject.percentage >= 70 ? 'Good' : 'Needs Work'}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Weak Areas Tab */}
          <TabsContent value="weak-areas">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Topics That Need More Practice
                </CardTitle>
                <CardDescription>
                  Focus on these areas to improve your overall score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weakAreas.map((area, index) => (
                    <div key={index} className={`p-4 rounded-lg border-2 ${
                      area.accuracy < 50 ? 'bg-red-50 border-red-200' :
                      area.accuracy < 70 ? 'bg-orange-50 border-orange-200' :
                      'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{area.topic}</h4>
                          <p className="text-sm text-gray-600">{area.questions} questions attempted</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">{area.accuracy}%</div>
                        </div>
                      </div>
                      <Progress value={area.accuracy} className="h-2 mb-3" />
                      <Button size="sm" variant="outline" className="w-full">
                        Practice {area.topic}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Test Leaderboard
                </CardTitle>
                <CardDescription>
                  See how you rank among other test takers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry) => (
                    <div 
                      key={entry.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        entry.isUser ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                        entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        entry.rank === 2 ? 'bg-gray-200 text-gray-700' :
                        entry.rank === 3 ? 'bg-orange-200 text-orange-700' :
                        entry.isUser ? 'bg-blue-600 text-white' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {entry.rank === 1 ? '🥇' :
                         entry.rank === 2 ? '🥈' :
                         entry.rank === 3 ? '🥉' :
                         `#${entry.rank}`}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold flex items-center gap-2">
                          {entry.name}
                          {entry.isUser && <Badge>You</Badge>}
                        </div>
                        <div className="text-sm text-gray-600">Score: {entry.score}%</div>
                      </div>
                      {entry.rank <= 3 && (
                        <Award className="w-6 h-6 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Review Answers</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Go through each question with detailed explanations to understand your mistakes
                  </p>
                  <Button variant="outline" className="w-full">
                    Review All Questions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Practice Weak Areas</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Take targeted quizzes on topics where you need improvement
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Practice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
