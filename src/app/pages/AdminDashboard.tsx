import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Activity, 
  Settings, 
  LogOut, 
  FileText,
  ClipboardList,
  UserCheck,
  BarChart3,
  Plus,
  Eye,
  Monitor
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Students', value: '12,450', change: '+12.5%', icon: Users, color: 'bg-blue-500' },
    { title: 'Total MCQs', value: '10,847', change: '+234', icon: BookOpen, color: 'bg-green-500' },
    { title: 'Mock Tests', value: '156', change: '+12', icon: ClipboardList, color: 'bg-purple-500' },
    { title: 'Active Sessions', value: '3,248', change: '+8.2%', icon: Activity, color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { user: 'Ahmed Khan', action: 'Completed Mock Test #45', time: '5 min ago', avatar: 'AK' },
    { user: 'Fatima Ali', action: 'Started Daily Quiz - Biology', time: '12 min ago', avatar: 'FA' },
    { user: 'Hassan Raza', action: 'Achieved 7-day streak', time: '25 min ago', avatar: 'HR' },
    { user: 'Ayesha Khan', action: 'Completed Chemistry Test', time: '1 hour ago', avatar: 'AYK' }
  ];

  const monthlyData = [
    { month: 'Jan', students: 8500, tests: 12000 },
    { month: 'Feb', students: 9200, tests: 15000 },
    { month: 'Mar', students: 10100, tests: 18000 },
    { month: 'Apr', students: 11200, tests: 21000 },
    { month: 'May', students: 12450, tests: 25000 }
  ];

  const subjectDistribution = [
    { subject: 'Biology', count: 3845 },
    { subject: 'Chemistry', count: 2678 },
    { subject: 'Physics', count: 2156 },
    { subject: 'English', count: 1234 },
    { subject: 'Logical', count: 934 }
  ];

  const topPerformers = [
    { rank: 1, name: 'Fatima Ali', score: 8750, tests: 45 },
    { rank: 2, name: 'Hassan Raza', score: 8420, tests: 42 },
    { rank: 3, name: 'Ayesha Khan', score: 8190, tests: 38 },
    { rank: 4, name: 'Ali Ahmed', score: 7860, tests: 40 },
    { rank: 5, name: 'Sara Malik', score: 7540, tests: 35 }
  ];

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
                <h1 className="font-bold text-xl">MDCAT Prep Admin</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold mb-2">{stat.value}</p>
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </Badge>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button onClick={() => navigate('/admin/mcqs')} className="h-auto py-4 flex-col gap-2">
                <Plus className="w-5 h-5" />
                Add MCQ
              </Button>
              <Button onClick={() => navigate('/admin/tests')} variant="outline" className="h-auto py-4 flex-col gap-2">
                <ClipboardList className="w-5 h-5" />
                Create Test
              </Button>
              <Button onClick={() => navigate('/admin/students')} variant="outline" className="h-auto py-4 flex-col gap-2">
                <Users className="w-5 h-5" />
                Manage Students
              </Button>
              <Button onClick={() => navigate('/admin/analytics')} variant="outline" className="h-auto py-4 flex-col gap-2">
                <BarChart3 className="w-5 h-5" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Monthly student registrations and test attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} name="Students" />
                    <Line type="monotone" dataKey="tests" stroke="#10b981" strokeWidth={2} name="Tests" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subject Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>MCQ Distribution by Subject</CardTitle>
                <CardDescription>Total questions available per subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest student actions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white">
                          {activity.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with highest scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((student) => (
                    <div key={student.rank} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        student.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        student.rank === 2 ? 'bg-gray-200 text-gray-700' :
                        student.rank === 3 ? 'bg-orange-200 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        #{student.rank}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-gray-600">{student.score} pts • {student.tests} tests</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-green-500" />
                  Active Sessions
                </CardTitle>
                <CardDescription>Students currently taking tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-5xl font-bold text-green-600 mb-2">3,248</div>
                  <p className="text-sm text-gray-600 mb-4">Students online right now</p>
                  <div className="space-y-2 text-xs text-left">
                    <div className="flex justify-between p-2 bg-green-50 rounded">
                      <span>Taking Mock Tests</span>
                      <span className="font-semibold">1,456</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded">
                      <span>Daily Quizzes</span>
                      <span className="font-semibold">1,124</span>
                    </div>
                    <div className="flex justify-between p-2 bg-purple-50 rounded">
                      <span>Practice Mode</span>
                      <span className="font-semibold">668</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Monitor className="w-4 h-4 mr-2" />
                  Monitor Sessions
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Status</span>
                  <Badge className="bg-green-600">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-600">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response</span>
                  <Badge variant="secondary">45ms</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Backup</span>
                  <Badge variant="outline">2 hours ago</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
