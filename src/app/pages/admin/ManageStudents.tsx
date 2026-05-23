import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Users, Search, ChevronLeft, Eye, Ban, CheckCircle } from 'lucide-react';

export default function ManageStudents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const mockStudents = [
    {
      id: 1,
      name: 'Ahmed Khan',
      email: 'ahmed.khan@example.com',
      phone: '+92 300 1234567',
      testsCompleted: 45,
      avgScore: 78,
      lastActive: '2 hours ago',
      status: 'Active',
      joinedDate: '2026-01-15'
    },
    {
      id: 2,
      name: 'Fatima Ali',
      email: 'fatima.ali@example.com',
      phone: '+92 301 2345678',
      testsCompleted: 52,
      avgScore: 85,
      lastActive: '1 hour ago',
      status: 'Active',
      joinedDate: '2026-01-10'
    },
    {
      id: 3,
      name: 'Hassan Raza',
      email: 'hassan.raza@example.com',
      phone: '+92 302 3456789',
      testsCompleted: 38,
      avgScore: 72,
      lastActive: '5 hours ago',
      status: 'Active',
      joinedDate: '2026-02-01'
    },
    {
      id: 4,
      name: 'Ayesha Khan',
      email: 'ayesha.khan@example.com',
      phone: '+92 303 4567890',
      testsCompleted: 41,
      avgScore: 80,
      lastActive: '1 day ago',
      status: 'Active',
      joinedDate: '2026-01-20'
    },
    {
      id: 5,
      name: 'Ali Ahmed',
      email: 'ali.ahmed@example.com',
      phone: '+92 304 5678901',
      testsCompleted: 29,
      avgScore: 68,
      lastActive: '3 days ago',
      status: 'Inactive',
      joinedDate: '2026-03-05'
    }
  ];

  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Manage Students</h1>
                <p className="text-xs text-gray-500">View and manage student accounts</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">12,450</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1 text-green-600">11,234</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1 text-orange-600">1,216</div>
              <div className="text-sm text-gray-600">Inactive</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">+245</div>
              <div className="text-sm text-gray-600">This Week</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">3,248</div>
              <div className="text-sm text-gray-600">Online Now</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Students</CardTitle>
            <CardDescription>
              {filteredStudents.length} student(s) found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">#{student.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-600 text-white">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{student.phone}</TableCell>
                    <TableCell>{student.testsCompleted}</TableCell>
                    <TableCell>
                      <Badge className={student.avgScore >= 75 ? 'bg-green-600' : 'bg-orange-600'}>
                        {student.avgScore}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{student.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{student.joinedDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {student.status === 'Active' ? (
                          <Button size="sm" variant="destructive" title="Suspend">
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="default" title="Activate">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
