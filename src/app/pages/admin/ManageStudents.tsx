import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, ChevronLeft, Search, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { getPlatformState } from '../../lib/platform';

export default function ManageStudents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const state = getPlatformState();

  const filteredStudents = state.students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
                <p className="text-xs text-gray-500">See which email is linked to each student account</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card><CardContent className="p-4"><div className="text-2xl font-bold mb-1">{state.students.length}</div><div className="text-sm text-gray-600">Total Students</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-2xl font-bold mb-1 text-green-600">{state.students.filter((student) => student.status === 'Active').length}</div><div className="text-sm text-gray-600">Active</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-2xl font-bold mb-1 text-blue-600">{state.students.filter((student) => student.verified).length}</div><div className="text-sm text-gray-600">Verified Emails</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-2xl font-bold mb-1">{state.currentSession?.role === 'student' ? 1 : 0}</div><div className="text-sm text-gray-600">Student Session Live</div></CardContent></Card>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input placeholder="Search by name or email..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Students</CardTitle>
            <CardDescription>{filteredStudents.length} student(s) found</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Email Verified</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-600 text-white">
                            {student.name.split(' ').map((item) => item[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{student.phone || 'Not provided'}</TableCell>
                    <TableCell>{student.testsCompleted}</TableCell>
                    <TableCell>
                      <Badge className={student.avgScore >= 75 ? 'bg-green-600' : 'bg-orange-600'}>{student.avgScore}%</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>{student.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {student.verified ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Badge variant="secondary">Pending</Badge>}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{student.joinedDate}</TableCell>
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
