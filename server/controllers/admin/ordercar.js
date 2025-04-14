const Orders = require("../../models/Carsreverstion");

const getAllCarReservations = async (req, res) => {
  try {
    const reservations = await Orders.find({});

    if (!reservations.length) {
      return res.status(404).json({
        success: false,
        message: "No car reservations found!",
      });
    }

    res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// Get single reservation
const getCarReservationDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Orders.findById(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Car reservation not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error getting reservation details",
    });
  }
};

// Update status
const updateCarReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const reservation = await Orders.findById(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Car reservation not found!",
      });
    }

    await Orders.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Reservation status updated!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  getAllCarReservations,
  getCarReservationDetails,
  updateCarReservationStatus,
};
