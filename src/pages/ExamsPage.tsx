import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  BookOpen,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  Download,
  Eye
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { useNavigate } from 'react-router-dom';

export const ExamsPage: React.FC = () => {
  useTranslation()
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock exam data with comprehensive information
  const exams = [
    {
      id: 'jee-main-2025',
      name: 'JEE Main 2025',
      category: 'engineering',
      description: 'Joint Entrance Examination for admission to NITs, IIITs, and other engineering colleges',
      applicationStart: '2024-12-01',
      applicationEnd: '2025-01-15',
      examDate: '2025-04-06',
      fee: 1000,
      eligibility: '12th pass with PCM',
      seats: 250000,
      difficulty: 'high',
      rating: 4.8,
      applicants: 1200000,
      status: 'open',
      highlights: ['NIT/IIIT Admission', 'Multiple Attempts', 'Online Mode'],
      syllabus: 'Physics, Chemistry, Mathematics',
      duration: '3 hours',
      pattern: 'Multiple Choice Questions',
      conductingBody: 'NTA'
    },
    {
      id: 'neet-ug-2025',
      name: 'NEET UG 2025',
      category: 'medical',
      description: 'National Eligibility cum Entrance Test for MBBS/BDS admissions',
      applicationStart: '2024-12-15',
      applicationEnd: '2025-01-31',
      examDate: '2025-05-05',
      fee: 1700,
      eligibility: '12th pass with PCB',
      seats: 100000,
      difficulty: 'high',
      rating: 4.9,
      applicants: 1800000,
      status: 'open',
      highlights: ['MBBS/BDS Admission', 'Single Attempt', 'Pen & Paper'],
      syllabus: 'Physics, Chemistry, Biology',
      duration: '3 hours 20 minutes',
      pattern: 'Multiple Choice Questions',
      conductingBody: 'NTA'
    },
    {
      id: 'cat-2025',
      name: 'CAT 2025',
      category: 'management',
      description: 'Common Admission Test for admission to IIMs and top B-schools',
      applicationStart: '2024-08-01',
      applicationEnd: '2024-09-20',
      examDate: '2024-11-24',
      fee: 2500,
      eligibility: 'Bachelor\'s degree',
      seats: 5000,
      difficulty: 'high',
      rating: 4.7,
      applicants: 300000,
      status: 'closed',
      highlights: ['IIM Admission', 'Computer Based', 'Adaptive Test'],
      syllabus: 'QA, VARC, DILR',
      duration: '2 hours',
      pattern: 'Multiple Choice & Non-MCQ',
      conductingBody: 'IIMs'
    },
    {
      id: 'gate-2025',
      name: 'GATE 2025',
      category: 'engineering',
      description: 'Graduate Aptitude Test in Engineering for M.Tech admissions',
      applicationStart: '2024-08-24',
      applicationEnd: '2024-09-26',
      examDate: '2025-02-01',
      fee: 1800,
      eligibility: 'B.Tech/B.E. degree',
      seats: 200000,
      difficulty: 'high',
      rating: 4.6,
      applicants: 900000,
      status: 'open',
      highlights: ['M.Tech Admission', 'PSU Recruitment', 'Multiple Papers'],
      syllabus: 'Engineering Subjects + General Aptitude',
      duration: '3 hours',
      pattern: 'Multiple Choice & Numerical',
      conductingBody: 'IIT'
    },
    {
      id: 'upsc-cse-2025',
      name: 'UPSC CSE 2025',
      category: 'civil-services',
      description: 'Civil Services Examination for IAS, IPS, IFS and other services',
      applicationStart: '2025-02-01',
      applicationEnd: '2025-03-01',
      examDate: '2025-06-08',
      fee: 100,
      eligibility: 'Bachelor\'s degree',
      seats: 1000,
      difficulty: 'very-high',
      rating: 4.9,
      applicants: 1000000,
      status: 'upcoming',
      highlights: ['IAS/IPS Selection', 'Three Stage Process', 'Interview'],
      syllabus: 'General Studies + Optional Subject',
      duration: 'Varies by stage',
      pattern: 'Objective + Descriptive + Interview',
      conductingBody: 'UPSC'
    },
    {
      id: 'ssc-cgl-2025',
      name: 'SSC CGL 2025',
      category: 'government',
      description: 'Staff Selection Commission Combined Graduate Level Examination',
      applicationStart: '2025-01-15',
      applicationEnd: '2025-02-15',
      examDate: '2025-07-01',
      fee: 100,
      eligibility: 'Bachelor\'s degree',
      seats: 15000,
      difficulty: 'medium',
      rating: 4.4,
      applicants: 2500000,
      status: 'upcoming',
      highlights: ['Central Govt Jobs', 'Four Tier Process', 'Multiple Posts'],
      syllabus: 'General Intelligence, English, Quantitative Aptitude, General Awareness',
      duration: '1 hour per tier',
      pattern: 'Multiple Choice Questions',
      conductingBody: 'SSC'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Exams', count: exams.length },
    { id: 'engineering', name: 'Engineering', count: exams.filter(e => e.category === 'engineering').length },
    { id: 'medical', name: 'Medical', count: exams.filter(e => e.category === 'medical').length },
    { id: 'management', name: 'Management', count: exams.filter(e => e.category === 'management').length },
    { id: 'civil-services', name: 'Civil Services', count: exams.filter(e => e.category === 'civil-services').length },
    { id: 'government', name: 'Government Jobs', count: exams.filter(e => e.category === 'government').length }
  ]

  const filteredExams = exams.filter(exam => {
    const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <CheckCircle className="h-4 w-4" />
      case 'closed':
        return <AlertCircle className="h-4 w-4" />
      case 'upcoming':
        return <Clock className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600'
      case 'medium':
        return 'text-yellow-600'
      case 'high':
        return 'text-orange-600'
      case 'very-high':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Competitive <span className="text-gradient">Exams</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover and apply for top competitive exams across India. From engineering to civil services, find your path to success.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2 px-6">
              <Filter className="h-4 w-4" />
              <span>Advanced Filter</span>
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Exams</p>
                  <p className="text-3xl font-bold text-blue-900">{filteredExams.length}</p>
                </div>
                <div className="p-3 bg-blue-200 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Open for Application</p>
                  <p className="text-3xl font-bold text-green-900">
                    {filteredExams.filter(e => e.status === 'open').length}
                  </p>
                </div>
                <div className="p-3 bg-green-200 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total Seats</p>
                  <p className="text-3xl font-bold text-purple-900">
                    {filteredExams.reduce((sum, exam) => sum + exam.seats, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-purple-200 rounded-full">
                  <Award className="h-6 w-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Total Applicants</p>
                  <p className="text-3xl font-bold text-orange-900">
                    {(filteredExams.reduce((sum, exam) => sum + exam.applicants, 0) / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="p-3 bg-orange-200 rounded-full">
                  <Users className="h-6 w-6 text-orange-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{exam.name}</h3>
                      <p className="text-blue-100 leading-relaxed">{exam.description}</p>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(exam.status)} bg-white`}>
                      {getStatusIcon(exam.status)}
                      <span className="ml-1 capitalize">{exam.status}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-300 fill-current" />
                      <span>{exam.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{(exam.applicants / 1000).toFixed(0)}K applicants</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{exam.seats.toLocaleString()} seats</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Key Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Application Deadline</p>
                      <p className="font-semibold text-gray-900">{formatDate(exam.applicationEnd)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Exam Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(exam.examDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Application Fee</p>
                      <p className="font-semibold text-gray-900">₹{exam.fee.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Difficulty</p>
                      <p className={`font-semibold capitalize ${getDifficultyColor(exam.difficulty)}`}>
                        {exam.difficulty.replace('-', ' ')}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {exam.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Eligibility:</span>
                      <span className="font-medium text-gray-900">{exam.eligibility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900">{exam.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conducting Body:</span>
                      <span className="font-medium text-gray-900">{exam.conductingBody}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {exam.status === 'open' && (
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        <a href={`/exam-application/${exam.id}`} className="flex items-center justify-center space-x-2 text-white">
                          <span>Apply Now</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    
                    {exam.status === 'closed' && (
                      <Button variant="outline" disabled className="flex-1">
                        Application Closed
                      </Button>
                    )}
                    
                    {exam.status === 'upcoming' && (
                      <Button variant="outline" className="flex-1">
                        <a href={`/exam-details/${exam.id}`} className="flex items-center justify-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Notify Me</span>
                        </a>
                      </Button>
                    )}

                    <Button variant="outline" className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Syllabus</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredExams.length === 0 && (
          <Card className="bg-white text-center py-16">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Exams Found
                </h3>
                <p className="text-gray-600 mb-6">
                  No exams match your current search criteria. Try adjusting your filters or search terms.
                </p>
                <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all') }}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-emerald-50 border-0">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Guidance on Exam Selection?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our AI-powered career counselor can help you choose the right exams based on your interests, qualifications, and career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get Career Guidance
                </Button>
                <Button variant="outline" size="lg">
                  Compare Exams
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}