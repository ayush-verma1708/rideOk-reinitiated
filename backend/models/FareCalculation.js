import mongoose from 'mongoose';

const fareCalculationSchema = new mongoose.Schema({
  carType: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  roadType: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  carAverage: {
    type: Number,
    required: true,
  },
  numPassengers: {
    type: Number,
    required: true,
  },
  fuelPrice: {
    type: Number,
    required: true,
  },
  trafficCondition: {
    type: String,
    required: true,
  },
  baseFare: {
    type: Number,
    required: true,
  },
  totalFare: {
    type: Number,
    required: true,
  },
  driverFare: {
    type: Number,
    required: true,
  },
  passengerFare: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FareCalculation = mongoose.model(
  'FareCalculation',
  fareCalculationSchema
);

export default FareCalculation;
