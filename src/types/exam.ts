export interface Exam {
  id: string;
  title: string;
  organization: string; // REET, Rajasthan Police, Delhi Police, UP Police
  applicationStartDate: Date;
  applicationEndDate: Date;
  examDate?: Date;
  resultDate?: Date;
  eligibility: string;
  applicationFee: {
    general: number;
    obc: number;
    sc: number;
    st: number;
  };
  vacancies: number;
  status: 'upcoming' | 'open' | 'closed' | 'results-declared';
  resultUrl?: string;
  admitCardUrl?: string;
  notificationUrl: string;
  description: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  userId: string;
  rollNumber: string;
  name: string;
  category: string;
  marks: number;
  rank?: number;
  status: 'pass' | 'fail' | 'pending';
  certificateUrl?: string;
  declaredDate: Date;
}

export interface ExamApplication {
  id: string;
  examId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  category: string;
  applicationNumber: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  applicationStatus: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  appliedDate: Date;
  documents: {
    photo?: string;
    signature?: string;
    idProof?: string;
    categoryProof?: string;
  };
}