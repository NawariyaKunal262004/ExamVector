import express from 'express';
const router = express.Router();

// TODO: Replace with real DB lookup
router.get('/', async (req, res) => {
  const { rollNo, id } = req.query;
  // Example static result for testing
  if (rollNo === '12345' || id === 'A1B2C3') {
    return res.json({
      name: "Rahul Sharma",
      rollNo: "12345",
      marks: 92,
      status: "Passed"
    });
  }
  res.status(404).json({ message: "Result not found" });
});

export default router;