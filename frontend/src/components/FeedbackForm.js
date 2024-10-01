// src/components/FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Modal,
} from '@mui/material';

const FeedbackForm = ({ open, handleClose }) => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/feedback', { feedback });
      setSuccess(true);
      setFeedback(''); // Clear the feedback field
      setError('');
    } catch (err) {
      setError('Error submitting feedback. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          mx: 'auto',
          mt: '20vh',
        }}
      >
        <Typography variant='h5' gutterBottom>
          Feedback
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin='normal'
            label='Your Feedback'
            variant='outlined'
            value={feedback}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Submit Feedback
          </Button>
        </form>

        {success && (
          <Alert severity='success' sx={{ mt: 2 }}>
            Feedback submitted successfully!
          </Alert>
        )}

        {error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default FeedbackForm;
