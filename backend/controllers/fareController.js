import FareCalculation from '../models/FareCalculation.js';
// controllers/fareController.js

export const calculateFare = async (req, res) => {
  try {
    const {
      carType,
      weather,
      roadType,
      distance,
      timeTaken,
      carAverage,
      numPassengers,
      fuelPrice,
      trafficCondition,
      baseFare,
    } = req.body;

    // Validate required fields
    if (
      !carType ||
      !weather ||
      !roadType ||
      !distance ||
      !timeTaken ||
      !carAverage ||
      !numPassengers ||
      !fuelPrice ||
      !trafficCondition ||
      !baseFare
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Calculate total fuel cost
    const totalFuelCost = (distance / carAverage) * fuelPrice;

    // Driver's contribution to fuel cost (25%)
    const driverFuelContribution = totalFuelCost * 0.25;

    // Passenger's contribution to fuel cost
    const passengerFuelContribution = totalFuelCost - driverFuelContribution;

    // Calculate total fare
    const totalFare = baseFare + totalFuelCost;

    // Driver fare
    const driverFare = driverFuelContribution;

    // Calculate passenger fare
    const passengerFare =
      baseFare / numPassengers + passengerFuelContribution / numPassengers;

    // Create a new fare calculation document
    const fareCalculation = new FareCalculation({
      carType,
      weather,
      roadType,
      distance,
      timeTaken,
      carAverage,
      numPassengers,
      fuelPrice,
      trafficCondition,
      baseFare,
      totalFare,
      driverFare,
      passengerFare,
    });

    // Save to database
    await fareCalculation.save();

    // Respond with the fare calculation details
    return res.status(201).json(fareCalculation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
