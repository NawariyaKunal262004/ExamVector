/**
 * Exam Controller
 * Handles all exam-related operations with Redis caching integration
 */

// Mock data - in a real application, this would come from a database
import { mockExams } from '../data/mockData.js';
import { clearCache } from '../middleware/cache.js';

// Get all exams
export const getAllExams = async (req, res) => {
  try {
    // In a real app, this would fetch from a database
    // For now, we're using mock data
    res.status(200).json(mockExams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ message: 'Failed to fetch exams' });
  }
};

// Get exam by ID
export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = mockExams.find(exam => exam.id === id);
    
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    
    res.status(200).json(exam);
  } catch (error) {
    console.error(`Error fetching exam ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to fetch exam' });
  }
};

// Get exams with open applications
export const getOpenExams = async (req, res) => {
  try {
    const currentDate = new Date();
    
    // Filter exams with open applications
    const openExams = mockExams.filter(exam => {
      const applicationStartDate = new Date(exam.applicationStartDate);
      const applicationEndDate = new Date(exam.applicationEndDate);
      return currentDate >= applicationStartDate && currentDate <= applicationEndDate;
    });
    
    res.status(200).json(openExams);
  } catch (error) {
    console.error('Error fetching open exams:', error);
    res.status(500).json({ message: 'Failed to fetch open exams' });
  }
};

// Get exam results
export const getExamResults = async (req, res) => {
  try {
    const { id } = req.params;
    // In a real app, this would fetch results from a database
    // For now, we're returning mock data
    const results = {
      examId: id,
      results: [
        { id: '1', name: 'John Doe', score: 85, rank: 120 },
        { id: '2', name: 'Jane Smith', score: 92, rank: 45 },
        { id: '3', name: 'Bob Johnson', score: 78, rank: 230 }
      ]
    };
    
    res.status(200).json(results);
  } catch (error) {
    console.error(`Error fetching results for exam ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to fetch exam results' });
  }
};

// Submit exam application
export const submitApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const applicationData = req.body;
    
    // Validate application data
    if (!applicationData.name || !applicationData.email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
    // In a real app, this would save to a database
    // For now, we're just returning success
    
    // Clear related caches after a successful application
    await clearCache(`cache:/api/exams/status/open*`)(req, res, () => {});
    
    res.status(201).json({ 
      message: 'Application submitted successfully',
      applicationId: `APP-${Date.now()}`,
      examId: id
    });
  } catch (error) {
    console.error(`Error submitting application for exam ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to submit application' });
  }
};

// Create new exam (admin only)
export const createExam = async (req, res) => {
  try {
    const examData = req.body;
    
    // Validate exam data
    if (!examData.title || !examData.organization) {
      return res.status(400).json({ message: 'Title and organization are required' });
    }
    
    // In a real app, this would save to a database
    // For now, we're just returning success
    
    // Clear caches after creating a new exam
    await clearCache(`cache:/api/exams*`)(req, res, () => {});
    
    res.status(201).json({ 
      message: 'Exam created successfully',
      examId: `EXAM-${Date.now()}`
    });
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ message: 'Failed to create exam' });
  }
};

// Update exam (admin only)
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const examData = req.body;
    
    // In a real app, this would update in a database
    // For now, we're just returning success
    
    // Clear caches after updating an exam
    await clearCache(`cache:/api/exams*`)(req, res, () => {});
    await clearCache(`cache:/api/exams/${id}*`)(req, res, () => {});
    
    res.status(200).json({ 
      message: 'Exam updated successfully',
      examId: id
    });
  } catch (error) {
    console.error(`Error updating exam ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to update exam' });
  }
};

// Delete exam (admin only)
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real app, this would delete from a database
    // For now, we're just returning success
    
    // Clear caches after deleting an exam
    await clearCache(`cache:/api/exams*`)(req, res, () => {});
    await clearCache(`cache:/api/exams/${id}*`)(req, res, () => {});
    
    res.status(200).json({ 
      message: 'Exam deleted successfully',
      examId: id
    });
  } catch (error) {
    console.error(`Error deleting exam ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to delete exam' });
  }
};