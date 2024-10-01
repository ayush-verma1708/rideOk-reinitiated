// controllers/feedbackController.js
import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  const { feedback } = req.body;

  try {
    const newFeedback = new Feedback({ feedback });
    await newFeedback.save();
    return res
      .status(201)
      .json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error submitting feedback.' });
  }
};
