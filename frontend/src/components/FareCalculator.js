// src/components/FareCalculator.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import FeedbackForm from './FeedbackForm'; // Import the FeedbackForm component

const FareCalculator = () => {
  const [formData, setFormData] = useState({
    carType: 'Sedan',
    weather: 'Sunny',
    roadType: 'Highway',
    distance: '',
    timeTaken: '',
    carAverage: '',
    numPassengers: '1',
    fuelPrice: '100',
    trafficCondition: 'Light',
    baseFare: '0',
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false); // Modal open state
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const carTypes = ['Sedan', 'SUV', 'Truck', 'Van'];
  const weathers = ['Sunny', 'Rainy', 'Cloudy', 'Snowy'];
  const roadTypes = ['Highway', 'City', 'Off-road'];
  const trafficConditions = ['Light', 'Moderate', 'Heavy'];

  // Open/close modal functions
  const handleOpenFeedback = () => setFeedbackModalOpen(true);
  const handleCloseFeedback = () => setFeedbackModalOpen(false);

  useEffect(() => {
    if (formData.distance) {
      const time = (formData.distance / 60).toFixed(2);
      setFormData((prev) => ({ ...prev, timeTaken: time }));
    }
  }, [formData.distance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numPassengers' && value > 3) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/fare/calculate-fare', formData);
      setResult(response.data);
      setError('');
      setOpenModal(true); // Open the modal on success
    } catch (err) {
      setError('Error calculating fare. Please check your inputs.');
      setResult(null);
    }
  };

  const calculateDriverTotal = () => {
    return result && result.passengerFare
      ? result.passengerFare * formData.numPassengers
      : 0;
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 2,
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant='h5' align='center' gutterBottom>
        RideOK Fare Calculator
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin='normal'>
          <InputLabel>Car Type</InputLabel>
          <Select
            name='carType'
            value={formData.carType}
            onChange={handleChange}
          >
            {carTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel>Weather</InputLabel>
          <Select
            name='weather'
            value={formData.weather}
            onChange={handleChange}
          >
            {weathers.map((weather) => (
              <MenuItem key={weather} value={weather}>
                {weather}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel>Road Type</InputLabel>
          <Select
            name='roadType'
            value={formData.roadType}
            onChange={handleChange}
          >
            {roadTypes.map((road) => (
              <MenuItem key={road} value={road}>
                {road}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin='normal'
          label='Distance (km)'
          type='number'
          name='distance'
          value={formData.distance}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin='normal'
          label='Car Average (km/l)'
          type='number'
          name='carAverage'
          value={formData.carAverage}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin='normal'
          label='Number of Passengers'
          type='number'
          name='numPassengers'
          value={formData.numPassengers}
          onChange={handleChange}
          min='1'
          max='3'
          required
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 2 }}
        >
          Calculate Fare
        </Button>
      </form>

      {error && (
        <Alert severity='error' sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Modal for displaying results */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Fare Calculation Result</DialogTitle>
        <DialogContent>
          {result && (
            <Box>
              <Typography>
                <strong>Total Fare:</strong> ₹{result.totalFare.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Driver Fare:</strong> ₹{result.driverFare.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Passenger Fare:</strong> ₹
                {result.passengerFare.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Total Amount Driver Receives:</strong> ₹
                {calculateDriverTotal().toFixed(2)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Button to open feedback modal */}
      <Button
        variant='outlined'
        color='primary'
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleOpenFeedback}
      >
        Give Feedback
      </Button>

      {/* Feedback Modal */}
      <FeedbackForm
        open={feedbackModalOpen}
        handleClose={handleCloseFeedback}
      />
    </Box>
  );
};

export default FareCalculator;
