import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, ChevronLeft, Filter, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Textarea } from '../../components/ui/textarea';
import { addMcq, deleteMcq, getPlatformState } from '../../lib/platform';

export default function ManageMCQs() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [formData, setFormData] = useState({
    question: '',
    subject: '',
    category: '',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '' as '' | 'A' | 'B' | 'C' | 'D',
    explanation: '',
  });

  const state = getPlatformState();
  void refreshKey;
  const subjects = ['Biology', 'Chemistry', 'Physics', 'English', 'Logical Reasoning'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question || !formData.subject || !formData.category || !formData.correctAnswer) {
      toast.error('Please fill in all required fields');
      return;
    }

    addMcq({
      question: formData.question,
      subject: formData.subject,
      category: formData.category,
      difficulty: formData.difficulty,
      optionA: formData.optionA,
      optionB: formData.optionB,
      optionC: formData.optionC,
      optionD: formData.optionD,
      correctAnswer: formData.correctAnswer,
      explanation: formData.explanation,
    });

    toast.success('MCQ added successfully');
    setIsAddDialogOpen(false);
    setRefreshKey((value) => value + 1);
    setFormData({
      question: '',
      subject: '',
      category: '',
      difficulty: 'Medium',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      explanation: '',
    });
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this MCQ?')) {
      return;
    }

    deleteMcq(id);
    toast.success('MCQ deleted successfully');
    setRefreshKey((value) => value + 1);
  };

  const filteredMCQs = getPlatformState().mcqs.filter((mcq) => {
    const matchesSearch = mcq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mcq.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'all' || mcq.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Manage MCQs</h1>
                <p className="text-xs text-gray-500">Admin can update the full question bank from here</p>
              </div>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add MCQ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New MCQ</DialogTitle>
                  <DialogDescription>Create a question that becomes available across the website.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Question *</Label>
                    <Textarea id="question" value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} rows={3} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                        <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={formData.difficulty} onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setFormData({ ...formData, difficulty: value })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Options *</Label>
                    <Input placeholder="Option A" value={formData.optionA} onChange={(e) => setFormData({ ...formData, optionA: e.target.value })} required />
                    <Input placeholder="Option B" value={formData.optionB} onChange={(e) => setFormData({ ...formData, optionB: e.target.value })} required />
                    <Input placeholder="Option C" value={formData.optionC} onChange={(e) => setFormData({ ...formData, optionC: e.target.value })} required />
                    <Input placeholder="Option D" value={formData.optionD} onChange={(e) => setFormData({ ...formData, optionD: e.target.value })} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correctAnswer">Correct Answer *</Label>
                    <Select value={formData.correctAnswer} onValueChange={(value: 'A' | 'B' | 'C' | 'D') => setFormData({ ...formData, correctAnswer: value })}>
                      <SelectTrigger><SelectValue placeholder="Select correct answer" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Option A</SelectItem>
                        <SelectItem value="B">Option B</SelectItem>
                        <SelectItem value="C">Option C</SelectItem>
                        <SelectItem value="D">Option D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="explanation">Explanation *</Label>
                    <Textarea id="explanation" value={formData.explanation} onChange={(e) => setFormData({ ...formData, explanation: e.target.value })} rows={4} required />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">Add MCQ</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{state.mcqs.length}</div>
              <div className="text-sm text-gray-600">Total MCQs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{state.mcqs.filter((mcq) => mcq.subject === 'Biology').length}</div>
              <div className="text-sm text-gray-600">Biology Questions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{state.students.length}</div>
              <div className="text-sm text-gray-600">Students Using This Bank</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input placeholder="Search questions or categories..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Question Bank</CardTitle>
            <CardDescription>{filteredMCQs.length} question(s) found</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Correct</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMCQs.map((mcq) => (
                  <TableRow key={mcq.id}>
                    <TableCell className="font-medium">#{mcq.id}</TableCell>
                    <TableCell className="max-w-md truncate">{mcq.question}</TableCell>
                    <TableCell><Badge variant="outline">{mcq.subject}</Badge></TableCell>
                    <TableCell>{mcq.category}</TableCell>
                    <TableCell>
                      <Badge variant={mcq.difficulty === 'Easy' ? 'secondary' : mcq.difficulty === 'Medium' ? 'default' : 'destructive'}>
                        {mcq.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell><Badge className="bg-green-600">{mcq.correctAnswer}</Badge></TableCell>
                    <TableCell className="text-sm text-gray-600">{mcq.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(mcq.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
