import express from 'express';
import { cacheMiddleware } from '../middleware/cache.js';
import * as examController from '../controllers/examController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get all exams with caching (30 minutes)
router.get('/', cacheMiddleware(1800), examController.getAllExams);

// Get exam by ID with caching (30 minutes)
router.get('/:id', cacheMiddleware(1800), examController.getExamById);

// Get exams with open applications with caching (15 minutes)
router.get('/status/open', cacheMiddleware(900), examController.getOpenExams);

// Get exam results with caching (1 hour)
router.get('/:id/results', cacheMiddleware(3600), examController.getExamResults);

// Submit exam application (no caching for POST requests)
router.post('/:id/apply', upload.any(), async (req, res) => {
  // Access form fields: req.body
  // Access files: req.files
  // TODO: Save to DB, validate, etc.
  res.json({ message: "Application received", data: req.body, files: req.files });
});

// Admin routes (no caching for write operations)
router.post('/', examController.createExam);
router.put('/:id', examController.updateExam);
router.delete('/:id', examController.deleteExam);

// Example: GET /api/exams/:examId/schema
router.get('/:examId/schema', async (req, res) => {
  const { examId } = req.params;
  // TODO: Replace with real DB lookup
  if (examId === 'jee') {
    return res.json({
      title: "JEE Main Application",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "dob", label: "Date of Birth", type: "date", required: true },
        { name: "photo", label: "Photo", type: "file", required: true },
        // ...more fields
      ]
    });
  }
  res.status(404).json({ message: "Exam not found" });
});

export default router;