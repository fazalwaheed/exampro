import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { ClipboardList, Plus, Edit, Trash2, Eye, ChevronLeft } from 'lucide-react';

export default function ManageTests() {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    duration: '',
    totalQuestions: '',
    biology: '',
    chemistry: '',
    physics: '',
    english: '',
    logical: ''
  });

  const mockTests = [
    {
      id: 1,
      title: 'Full MDCAT Mock Test #1',
      type: 'Full Mock',
      questions: 200,
      duration: 180,
      attempts: 1245,
      avgScore: 76,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Biology Focused Mock',
      type: 'Subject',
      questions: 88,
      duration: 80,
      attempts: 856,
      avgScore: 72,
      status: 'Active'
    },
    {
      id: 3,
      title: 'Chemistry Practice Test',
      type: 'Subject',
      questions: 56,
      duration: 50,
      attempts: 623,
      avgScore: 68,
      status: 'Active'
    },
    {
      id: 4,
      title: 'Physics & Math Mock',
      type: 'Subject',
      questions: 44,
      duration: 40,
      attempts: 512,
      avgScore: 64,
      status: 'Draft'
    },
    {
      id: 5,
      title: 'Full MDCAT Mock Test #2',
      type: 'Full Mock',
      questions: 200,
      duration: 180,
      attempts: 1089,
      avgScore: 78,
      status: 'Active'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.type || !formData.duration || !formData.totalQuestions) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate API call
    toast.success('Mock test created successfully!');
    setIsCreateDialogOpen(false);
    setFormData({
      title: '',
      type: '',
      duration: '',
      totalQuestions: '',
      biology: '',
      chemistry: '',
      physics: '',
      english: '',
      logical: ''
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this test?')) {
      toast.success('Test deleted successfully!');
    }
  };

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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Manage Tests</h1>
                <p className="text-xs text-gray-500">Create and manage mock tests</p>
              </div>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Test
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Mock Test</DialogTitle>
                  <DialogDescription>
                    Configure a new mock test with custom question distribution
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Test Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Full MDCAT Mock Test #3"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Test Type *</Label>
                      <Select 
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Mock Test</SelectItem>
                          <SelectItem value="subject">Subject Test</SelectItem>
                          <SelectItem value="topic">Topic Test</SelectItem>
                          <SelectItem value="practice">Practice Test</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="180"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalQuestions">Total Questions *</Label>
                    <Input
                      id="totalQuestions"
                      type="number"
                      placeholder="200"
                      value={formData.totalQuestions}
                      onChange={(e) => setFormData({ ...formData, totalQuestions: e.target.value })}
                      required
                    />
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-sm">Question Distribution</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="biology">Biology</Label>
                        <Input
                          id="biology"
                          type="number"
                          placeholder="88"
                          value={formData.biology}
                          onChange={(e) => setFormData({ ...formData, biology: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chemistry">Chemistry</Label>
                        <Input
                          id="chemistry"
                          type="number"
                          placeholder="56"
                          value={formData.chemistry}
                          onChange={(e) => setFormData({ ...formData, chemistry: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="physics">Physics</Label>
                        <Input
                          id="physics"
                          type="number"
                          placeholder="44"
                          value={formData.physics}
                          onChange={(e) => setFormData({ ...formData, physics: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="english">English</Label>
                        <Input
                          id="english"
                          type="number"
                          placeholder="12"
                          value={formData.english}
                          onChange={(e) => setFormData({ ...formData, english: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Create Test
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">156</div>
              <div className="text-sm text-gray-600">Total Tests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">142</div>
              <div className="text-sm text-gray-600">Active Tests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">25,478</div>
              <div className="text-sm text-gray-600">Total Attempts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">73%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Tests Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Mock Tests</CardTitle>
            <CardDescription>
              Manage and monitor all available tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">#{test.id}</TableCell>
                    <TableCell className="font-medium">{test.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{test.type}</Badge>
                    </TableCell>
                    <TableCell>{test.questions}</TableCell>
                    <TableCell>{test.duration} min</TableCell>
                    <TableCell>{test.attempts.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={test.avgScore >= 70 ? 'bg-green-600' : 'bg-orange-600'}>
                        {test.avgScore}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={test.status === 'Active' ? 'default' : 'secondary'}>
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(test.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
