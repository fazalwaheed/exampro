import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { BookOpen, Plus, Edit, Trash2, Search, Filter, ChevronLeft } from 'lucide-react';

export default function ManageMCQs() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    question: '',
    subject: '',
    category: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    explanation: ''
  });

  const mockMCQs = [
    {
      id: 1,
      question: 'Which organelle is responsible for protein synthesis?',
      subject: 'Biology',
      category: 'Cell Biology',
      difficulty: 'Medium',
      correctAnswer: 'B',
      createdAt: '2026-05-20'
    },
    {
      id: 2,
      question: 'What is the general formula for alkanes?',
      subject: 'Chemistry',
      category: 'Organic Chemistry',
      difficulty: 'Easy',
      correctAnswer: 'B',
      createdAt: '2026-05-19'
    },
    {
      id: 3,
      question: 'According to Newton\'s second law, force equals:',
      subject: 'Physics',
      category: 'Mechanics',
      difficulty: 'Easy',
      correctAnswer: 'B',
      createdAt: '2026-05-18'
    },
    {
      id: 4,
      question: 'DNA replication occurs during which phase?',
      subject: 'Biology',
      category: 'Genetics',
      difficulty: 'Hard',
      correctAnswer: 'B',
      createdAt: '2026-05-17'
    },
    {
      id: 5,
      question: 'Maximum electrons in third shell (n=3)?',
      subject: 'Chemistry',
      category: 'Atomic Structure',
      difficulty: 'Medium',
      correctAnswer: 'B',
      createdAt: '2026-05-16'
    }
  ];

  const subjects = ['Biology', 'Chemistry', 'Physics', 'English', 'Logical Reasoning'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.question || !formData.subject || !formData.correctAnswer) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate API call
    toast.success('MCQ added successfully!');
    setIsAddDialogOpen(false);
    setFormData({
      question: '',
      subject: '',
      category: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      explanation: ''
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this MCQ?')) {
      toast.success('MCQ deleted successfully!');
    }
  };

  const filteredMCQs = mockMCQs.filter(mcq => {
    const matchesSearch = mcq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mcq.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'all' || mcq.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Manage MCQs</h1>
                <p className="text-xs text-gray-500">Add, edit, or remove questions</p>
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
                  <DialogDescription>
                    Create a new multiple choice question for the question bank
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Question *</Label>
                    <Textarea
                      id="question"
                      placeholder="Enter the question text..."
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select 
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        placeholder="e.g., Cell Biology"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Options *</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Option A"
                        value={formData.optionA}
                        onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Option B"
                        value={formData.optionB}
                        onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Option C"
                        value={formData.optionC}
                        onChange={(e) => setFormData({ ...formData, optionC: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Option D"
                        value={formData.optionD}
                        onChange={(e) => setFormData({ ...formData, optionD: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correctAnswer">Correct Answer *</Label>
                    <Select 
                      value={formData.correctAnswer}
                      onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
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
                    <Textarea
                      id="explanation"
                      placeholder="Provide a detailed explanation for the correct answer..."
                      value={formData.explanation}
                      onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Add MCQ
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
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
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search questions or categories..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* MCQs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Question Bank</CardTitle>
            <CardDescription>
              {filteredMCQs.length} question(s) found
            </CardDescription>
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
                    <TableCell>
                      <Badge variant="outline">{mcq.subject}</Badge>
                    </TableCell>
                    <TableCell>{mcq.category}</TableCell>
                    <TableCell>
                      <Badge variant={
                        mcq.difficulty === 'Easy' ? 'secondary' :
                        mcq.difficulty === 'Medium' ? 'default' :
                        'destructive'
                      }>
                        {mcq.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-600">{mcq.correctAnswer}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{mcq.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(mcq.id)}
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
