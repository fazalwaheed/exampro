import { useNavigate } from 'react-router';
import { Activity, BarChart3, BookOpen, ClipboardList, Eye, LogOut, Monitor, Plus, Settings, TrendingUp, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getPlatformState, logout } from '../lib/platform';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const state = getPlatformState();
  const session = state.currentSession;
  const totalStudents = state.students.length;
  const activeStudents = state.students.filter((student) => student.status === 'Active').length;

  const stats = [
    { title: 'Total Students', value: `${totalStudents}`, change: `${activeStudents} active`, icon: Users, color: 'bg-blue-500' },
    { title: 'Total MCQs', value: `${state.mcqs.length}`, change: 'Managed by admin', icon: BookOpen, color: 'bg-green-500' },
    { title: 'Mock Tests', value: '156', change: '+12 planned', icon: ClipboardList, color: 'bg-purple-500' },
    { title: 'Active Sessions', value: `${activeStudents}`, change: 'Current verified students', icon: Activity, color: 'bg-orange-500' },
  ];

  const recentActivity = state.students.slice(0, 4).map((student) => ({
    user: student.name,
    action: `Student account linked to ${student.email}`,
    time: student.lastActive,
    avatar: student.name.split(' ').map((item) => item[0]).join(''),
  }));

  const monthlyData = [
    { month: 'Jan', students: 8, tests: 12 },
    { month: 'Feb', students: 10, tests: 15 },
    { month: 'Mar', students: 12, tests: 18 },
    { month: 'Apr', students: 15, tests: 21 },
    { month: 'May', students: totalStudents, tests: 25 },
  ];

  const subjectDistribution = ['Biology', 'Chemistry', 'Physics', 'English', 'Logical Reasoning'].map((subject) => ({
    subject,
    count: state.mcqs.filter((mcq) => mcq.subject === subject).length,
  }));

  const topPerformers = [...state.students]
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 5)
    .map((student, index) => ({
      rank: index + 1,
      name: student.name,
      score: student.avgScore,
      tests: student.testsCompleted,
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
                <h1 className="font-bold text-xl">MDCAT Prep Admin</h1>
                <p className="text-xs text-gray-500">Controls student access and website content</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">{session?.name}</p>
                <p className="text-xs text-gray-500">{session?.email}</p>
              </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button onClick={() => navigate('/admin/mcqs')} className="h-auto py-4 flex-col gap-2">
                <Plus className="w-5 h-5" />
                Update MCQs
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
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Student registrations and test attempts overview</CardDescription>
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

            <Card>
              <CardHeader>
                <CardTitle>MCQ Distribution by Subject</CardTitle>
                <CardDescription>Current question bank controlled from the admin panel</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Student Activity</CardTitle>
                <CardDescription>Latest account and learning activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.user} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white">{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/admin/students')}>
                  <Eye className="w-4 h-4 mr-2" />
                  View All Students
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with the highest average scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((student) => (
                    <div key={student.rank} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gray-100 text-gray-700">
                        #{student.rank}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-gray-600">{student.score}% avg score - {student.tests} tests</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-green-500" />
                  Active Sessions
                </CardTitle>
                <CardDescription>Verified students currently allowed in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-5xl font-bold text-green-600 mb-2">{activeStudents}</div>
                  <p className="text-sm text-gray-600 mb-4">Students marked active</p>
                  <div className="space-y-2 text-xs text-left">
                    <div className="flex justify-between p-2 bg-green-50 rounded">
                      <span>Verified Accounts</span>
                      <span className="font-semibold">{state.students.filter((student) => student.verified).length}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded">
                      <span>Total Registrations</span>
                      <span className="font-semibold">{totalStudents}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-purple-50 rounded">
                      <span>Question Bank</span>
                      <span className="font-semibold">{state.mcqs.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
