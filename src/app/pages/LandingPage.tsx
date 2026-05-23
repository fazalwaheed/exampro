import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  Menu, 
  X,
  Star,
  Target,
  Brain,
  BarChart3,
  Zap,
  Shield
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: '10,000+ MCQs',
      description: 'Comprehensive question bank covering all MDCAT subjects'
    },
    {
      icon: Trophy,
      title: 'Mock Tests',
      description: 'Real exam environment with timed assessments'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed insights'
    },
    {
      icon: Users,
      title: 'Leaderboard',
      description: 'Compete with peers nationwide'
    },
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'AI-powered weak area identification'
    },
    {
      icon: Clock,
      title: 'Daily Quizzes',
      description: 'Regular practice to maintain consistency'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Khan',
      score: '187/200',
      university: 'Aga Khan Medical College',
      text: 'This platform helped me identify my weak areas and improve systematically. The mock tests were incredibly helpful!',
      image: '👨‍🎓'
    },
    {
      name: 'Fatima Ali',
      score: '192/200',
      university: 'King Edward Medical University',
      text: 'The question bank is comprehensive and the explanations are clear. I practiced over 5000 MCQs and got admitted!',
      image: '👩‍🎓'
    },
    {
      name: 'Hassan Raza',
      score: '178/200',
      university: 'Dow Medical College',
      text: 'The leaderboard motivated me to stay consistent. The analytics showed exactly where I needed to improve.',
      image: '👨‍🎓'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      period: 'Forever',
      features: [
        '500 Practice MCQs',
        '2 Mock Tests',
        'Basic Analytics',
        'Daily Quiz Access'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Premium',
      price: '2,999',
      period: '3 Months',
      features: [
        '10,000+ MCQs',
        'Unlimited Mock Tests',
        'Advanced Analytics',
        'Performance Tracking',
        'Weak Area Reports',
        'Priority Support'
      ],
      cta: 'Start Learning',
      popular: true
    },
    {
      name: 'Ultimate',
      price: '4,999',
      period: '6 Months',
      features: [
        'Everything in Premium',
        'Live Doubt Sessions',
        'Personalized Study Plan',
        'Video Explanations',
        '1-on-1 Mentorship',
        'Study Material PDF'
      ],
      cta: 'Go Ultimate',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'What is MDCAT/ETEA?',
      answer: 'MDCAT (Medical and Dental College Admission Test) and ETEA (Educational Testing and Evaluation Agency) are entry tests required for admission to medical and dental colleges in Pakistan.'
    },
    {
      question: 'How many MCQs are in the actual MDCAT exam?',
      answer: 'The MDCAT exam consists of 200 MCQs covering Biology (88), Chemistry (56), Physics (44), English (12), and Logical Reasoning.'
    },
    {
      question: 'Can I access the platform on mobile?',
      answer: 'Yes! Our platform is fully responsive and works seamlessly on desktop, tablet, and mobile devices.'
    },
    {
      question: 'How are the mock tests designed?',
      answer: 'Our mock tests replicate the actual MDCAT exam environment with the same time limit, question distribution, and difficulty level.'
    },
    {
      question: 'Do you provide explanations for answers?',
      answer: 'Absolutely! Every MCQ comes with detailed explanations to help you understand the concepts thoroughly.'
    },
    {
      question: 'What if I need help during preparation?',
      answer: 'Premium and Ultimate plan subscribers get priority support. Ultimate users also get access to live doubt sessions and 1-on-1 mentorship.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">MDCAT Prep</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-blue-600 transition-colors">Success Stories</a>
              <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>
                Get Started Free
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 flex flex-col gap-3">
              <a href="#features" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#testimonials" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Success Stories</a>
              <a href="#pricing" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#faq" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                <Button onClick={() => navigate('/register')}>Get Started Free</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Zap className="w-3 h-3 mr-1" />
            Trusted by 50,000+ Students
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Ace Your MDCAT & ETEA
            <br />
            With Confidence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Master 10,000+ MCQs, take unlimited mock tests, and track your progress with Pakistan's most comprehensive medical entry test preparation platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => navigate('/register')}>
              Start Free Trial
              <CheckCircle className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => navigate('/dashboard')}>
              View Demo
              <Target className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600">MCQs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">4.9★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for MDCAT/ETEA preparation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Students Who Made It</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful students who achieved their medical college dreams
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{testimonial.image}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700">
                          Score: {testimonial.score}
                        </Badge>
                      </CardDescription>
                      <p className="text-xs text-blue-600 mt-1">{testimonial.university}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Flexible plans to match your preparation timeline and budget
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-xl transition-shadow ${plan.popular ? 'border-blue-500 border-2' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Rs {plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => navigate('/register')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your MDCAT Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join 50,000+ students preparing for MDCAT/ETEA with Pakistan's #1 preparation platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => navigate('/register')}>
              Get Started for Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-blue-600" 
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">MDCAT Prep</span>
              </div>
              <p className="text-sm">
                Pakistan's leading medical entry test preparation platform.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 MDCAT Prep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
