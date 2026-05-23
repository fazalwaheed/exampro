import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '../components/ui/alert-dialog';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { ScrollArea } from '../components/ui/scroll-area';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Check, 
  X, 
  BookOpen,
  LayoutGrid,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

// Mock MCQ data
const mockQuestions = [
  {
    id: 1,
    subject: 'Biology',
    category: 'Cell Biology',
    question: 'Which organelle is responsible for protein synthesis in eukaryotic cells?',
    options: [
      'Mitochondria',
      'Ribosomes',
      'Golgi apparatus',
      'Endoplasmic reticulum'
    ],
    correctAnswer: 1,
    explanation: 'Ribosomes are the cellular organelles responsible for protein synthesis. They can be found free in the cytoplasm or attached to the endoplasmic reticulum, forming rough ER. The ribosome reads messenger RNA (mRNA) and translates the genetic code into a specific protein.'
  },
  {
    id: 2,
    subject: 'Chemistry',
    category: 'Organic Chemistry',
    question: 'What is the general formula for alkanes?',
    options: [
      'CnH2n',
      'CnH2n+2',
      'CnH2n-2',
      'CnHn'
    ],
    correctAnswer: 1,
    explanation: 'Alkanes are saturated hydrocarbons with single bonds only. Their general formula is CnH2n+2, where n is the number of carbon atoms. For example, methane (CH4, n=1) follows this formula: C1H2(1)+2 = CH4.'
  },
  {
    id: 3,
    subject: 'Physics',
    category: 'Mechanics',
    question: 'According to Newton\'s second law, force is equal to:',
    options: [
      'Mass × Velocity',
      'Mass × Acceleration',
      'Mass × Distance',
      'Velocity × Time'
    ],
    correctAnswer: 1,
    explanation: 'Newton\'s second law states that Force (F) = Mass (m) × Acceleration (a). This fundamental principle describes the relationship between the motion of an object and the forces acting on it. The SI unit of force is Newton (N), which equals kg⋅m/s².'
  },
  {
    id: 4,
    subject: 'Biology',
    category: 'Genetics',
    question: 'DNA replication occurs during which phase of the cell cycle?',
    options: [
      'G1 phase',
      'S phase',
      'G2 phase',
      'M phase'
    ],
    correctAnswer: 1,
    explanation: 'DNA replication occurs during the S (Synthesis) phase of the cell cycle. This is part of interphase, where the cell prepares for division. During S phase, the entire genome is duplicated to ensure each daughter cell receives a complete set of genetic information.'
  },
  {
    id: 5,
    subject: 'Chemistry',
    category: 'Atomic Structure',
    question: 'What is the maximum number of electrons that can occupy the third shell (n=3)?',
    options: [
      '8',
      '18',
      '32',
      '2'
    ],
    correctAnswer: 1,
    explanation: 'The maximum number of electrons in a shell is given by 2n², where n is the shell number. For the third shell (n=3): 2(3)² = 2(9) = 18 electrons. This includes the 3s (2 electrons), 3p (6 electrons), and 3d (10 electrons) subshells.'
  },
  {
    id: 6,
    subject: 'Physics',
    category: 'Electricity',
    question: 'Ohm\'s law states that current is:',
    options: [
      'Directly proportional to resistance',
      'Inversely proportional to voltage',
      'Directly proportional to voltage',
      'Independent of voltage'
    ],
    correctAnswer: 2,
    explanation: 'Ohm\'s law states that V = IR, which means current (I) is directly proportional to voltage (V) and inversely proportional to resistance (R). When voltage increases, current increases proportionally if resistance remains constant.'
  },
  {
    id: 7,
    subject: 'English',
    category: 'Vocabulary',
    question: 'Choose the correct synonym for "Meticulous":',
    options: [
      'Careless',
      'Careful',
      'Quick',
      'Hasty'
    ],
    correctAnswer: 1,
    explanation: 'Meticulous means showing great attention to detail; very careful and precise. The best synonym is "careful". The word comes from Latin "meticulosus" meaning fearful or timid, but has evolved to mean extremely careful about details.'
  },
  {
    id: 8,
    subject: 'Logical Reasoning',
    category: 'Patterns',
    question: 'What comes next in the sequence: 2, 6, 12, 20, 30, ?',
    options: [
      '38',
      '40',
      '42',
      '44'
    ],
    correctAnswer: 2,
    explanation: 'The pattern is based on n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42. Each term is the product of two consecutive integers.'
  },
  {
    id: 9,
    subject: 'Biology',
    category: 'Photosynthesis',
    question: 'In which part of the chloroplast does the light-dependent reaction occur?',
    options: [
      'Stroma',
      'Thylakoid membrane',
      'Outer membrane',
      'Matrix'
    ],
    correctAnswer: 1,
    explanation: 'The light-dependent reactions of photosynthesis occur in the thylakoid membranes of chloroplasts. This is where light energy is converted into chemical energy (ATP and NADPH). The thylakoids contain chlorophyll and other pigments that capture light energy.'
  },
  {
    id: 10,
    subject: 'Chemistry',
    category: 'Chemical Bonding',
    question: 'Which type of bond involves the sharing of electrons?',
    options: [
      'Ionic bond',
      'Covalent bond',
      'Metallic bond',
      'Hydrogen bond'
    ],
    correctAnswer: 1,
    explanation: 'Covalent bonds involve the sharing of electrons between atoms. This type of bonding typically occurs between non-metal atoms. The shared electrons are attracted to the nuclei of both atoms, forming a stable bond. Examples include H2, O2, and most organic molecules.'
  }
];

export default function ExamInterface() {
  const navigate = useNavigate();
  const { examId } = useParams();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes for demo
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const question = mockQuestions[currentQuestion];
  const totalQuestions = mockQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Timer
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, isSubmitted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (!isSubmitted) {
      setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIndex });
      setShowExplanation(false);
    }
  };

  const handleMarkForReview = () => {
    const newMarked = new Set(markedForReview);
    if (newMarked.has(currentQuestion)) {
      newMarked.delete(currentQuestion);
      toast.info('Removed from review');
    } else {
      newMarked.add(currentQuestion);
      toast.success('Marked for review');
    }
    setMarkedForReview(newMarked);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowPalette(false);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowSubmitDialog(false);
    
    // Calculate score
    let correct = 0;
    mockQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });

    toast.success('Test submitted successfully!');
    setTimeout(() => {
      navigate(`/results/exam-${examId}`, { 
        state: { 
          score: correct, 
          total: totalQuestions,
          answers: selectedAnswers,
          questions: mockQuestions
        } 
      });
    }, 1000);
  };

  const getQuestionStatus = (index: number) => {
    if (selectedAnswers[index] !== undefined) {
      if (isSubmitted) {
        return selectedAnswers[index] === mockQuestions[index].correctAnswer ? 'correct' : 'incorrect';
      }
      return 'answered';
    }
    if (markedForReview.has(index)) return 'marked';
    return 'unanswered';
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const markedCount = markedForReview.size;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold">MDCAT Mock Test</h1>
                <p className="text-xs text-gray-500">Question {currentQuestion + 1} of {totalQuestions}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Timer */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold ${
                timeRemaining < 60 ? 'bg-red-100 text-red-700' : 
                timeRemaining < 300 ? 'bg-orange-100 text-orange-700' : 
                'bg-blue-100 text-blue-700'
              }`}>
                <Clock className="w-5 h-5" />
                {formatTime(timeRemaining)}
              </div>

              {/* Submit Button */}
              <Button 
                variant="destructive"
                onClick={() => setShowSubmitDialog(true)}
                disabled={isSubmitted}
              >
                Submit Test
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-600">Question {currentQuestion + 1}</Badge>
                      <Badge variant="outline">{question.subject}</Badge>
                      <Badge variant="secondary">{question.category}</Badge>
                      {markedForReview.has(currentQuestion) && (
                        <Badge variant="outline" className="border-orange-500 text-orange-600">
                          <Flag className="w-3 h-3 mr-1 fill-orange-500" />
                          Marked
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkForReview}
                    disabled={isSubmitted}
                  >
                    <Flag className={`w-4 h-4 ${markedForReview.has(currentQuestion) ? 'fill-orange-500 text-orange-600' : ''}`} />
                  </Button>
                </div>

                {/* Question Text */}
                <div className="mb-8">
                  <p className="text-lg leading-relaxed">{question.question}</p>
                </div>

                {/* Options */}
                <RadioGroup 
                  value={selectedAnswers[currentQuestion]?.toString()} 
                  onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                  disabled={isSubmitted}
                >
                  <div className="space-y-3">
                    {question.options.map((option, index) => {
                      const isSelected = selectedAnswers[currentQuestion] === index;
                      const isCorrect = index === question.correctAnswer;
                      const showResult = isSubmitted;

                      let cardClass = 'border-2 p-4 rounded-lg cursor-pointer transition-all hover:border-blue-500 hover:shadow-md';
                      
                      if (showResult) {
                        if (isCorrect) {
                          cardClass = 'border-2 p-4 rounded-lg bg-green-50 border-green-500';
                        } else if (isSelected && !isCorrect) {
                          cardClass = 'border-2 p-4 rounded-lg bg-red-50 border-red-500';
                        } else {
                          cardClass = 'border-2 p-4 rounded-lg border-gray-200';
                        }
                      } else if (isSelected) {
                        cardClass = 'border-2 p-4 rounded-lg bg-blue-50 border-blue-500 shadow-md';
                      }

                      return (
                        <div key={index} className={cardClass}>
                          <div className="flex items-start gap-3">
                            <RadioGroupItem 
                              value={index.toString()} 
                              id={`option-${index}`}
                              className="mt-1"
                              disabled={isSubmitted}
                            />
                            <Label 
                              htmlFor={`option-${index}`} 
                              className="flex-1 cursor-pointer text-base leading-relaxed"
                            >
                              <div className="flex items-start justify-between">
                                <span>{option}</span>
                                {showResult && (
                                  <div className="ml-2 shrink-0">
                                    {isCorrect && (
                                      <div className="flex items-center gap-1 text-green-600">
                                        <Check className="w-5 h-5" />
                                        <span className="text-sm font-medium">Correct</span>
                                      </div>
                                    )}
                                    {isSelected && !isCorrect && (
                                      <div className="flex items-center gap-1 text-red-600">
                                        <X className="w-5 h-5" />
                                        <span className="text-sm font-medium">Wrong</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </Label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>

                {/* Explanation */}
                {isSubmitted && (
                  <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <h4 className="font-semibold text-blue-900">Explanation</h4>
                    </div>
                    <p className="text-sm text-blue-900 leading-relaxed ml-7">
                      {question.explanation}
                    </p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-sm text-gray-600">
                    {currentQuestion + 1} / {totalQuestions}
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={currentQuestion === totalQuestions - 1}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Question Palette */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <LayoutGrid className="w-5 h-5" />
                  <h3 className="font-semibold">Question Palette</h3>
                </div>

                {/* Legend */}
                <div className="space-y-2 mb-4 pb-4 border-b text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span>Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <span>Not Answered ({unansweredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                      <Flag className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span>Marked ({markedCount})</span>
                  </div>
                  {isSubmitted && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-100 border-2 border-green-500 rounded"></div>
                        <span>Correct</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-100 border-2 border-red-500 rounded"></div>
                        <span>Incorrect</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Question Grid */}
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-5 gap-2">
                    {mockQuestions.map((_, index) => {
                      const status = getQuestionStatus(index);
                      const isCurrent = index === currentQuestion;
                      
                      let buttonClass = 'w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition-all';
                      
                      if (status === 'correct') {
                        buttonClass += ' bg-green-100 border-2 border-green-500 text-green-700';
                      } else if (status === 'incorrect') {
                        buttonClass += ' bg-red-100 border-2 border-red-500 text-red-700';
                      } else if (status === 'answered') {
                        buttonClass += ' bg-green-500 text-white hover:bg-green-600';
                      } else if (status === 'marked') {
                        buttonClass += ' bg-orange-500 text-white hover:bg-orange-600';
                      } else {
                        buttonClass += ' bg-gray-200 hover:bg-gray-300';
                      }

                      if (isCurrent) {
                        buttonClass += ' ring-2 ring-blue-500 ring-offset-2';
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => goToQuestion(index)}
                          className={buttonClass}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Submit Test?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-3">
                <p>Are you sure you want to submit this test? This action cannot be undone.</p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Questions:</span>
                    <span className="font-medium">{totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Answered:</span>
                    <span className="font-medium text-green-600">{answeredCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Not Answered:</span>
                    <span className="font-medium text-red-600">{unansweredCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marked for Review:</span>
                    <span className="font-medium text-orange-600">{markedCount}</span>
                  </div>
                </div>
                {unansweredCount > 0 && (
                  <p className="text-orange-600 text-sm">
                    ⚠️ You have {unansweredCount} unanswered question(s)
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Again</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="bg-blue-600">
              Submit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
