const CarCart = require("../../models/Car-Cart-Controller");
const Car = require("../../models/Cars");

const addToCarCart = async (req, res) => {
  try {
    const { userId, carId, quantity } = req.body;

    if (!userId || !carId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    let cart = await CarCart.findOne({ userId });

    if (!cart) {
      cart = new CarCart({ userId, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.carId.toString() === carId
    );

    if (existingIndex === -1) {
      cart.items.push({ carId, quantity });
    } else {
      cart.items[existingIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const fetchCarCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory!",
      });
    }

    const cart = await CarCart.findOne({ userId }).populate({
      path: "items.carId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const validItems = cart.items.filter((item) => item.carId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const mappedItems = validItems.map((item) => ({
      carId: item.carId._id,
      image: item.carId.image,
      title: item.carId.title,
      price: item.carId.price,
      salePrice: item.carId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: mappedItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const updateCarCartItemQty = async (req, res) => {
  try {
    const { userId, carId, quantity } = req.body;

    if (!userId || !carId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await CarCart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const index = cart.items.findIndex(
      (item) => item.carId.toString() === carId
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found!",
      });
    }

    cart.items[index].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.carId",
      select: "image title price salePrice",
    });

    const mappedItems = cart.items.map((item) => ({
      carId: item.carId?._id,
      image: item.carId?.image,
      title: item.carId?.title,
      price: item.carId?.price,
      salePrice: item.carId?.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: mappedItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const deleteCarCartItem = async (req, res) => {
  try {
    const { userId, carId } = req.params;
    if (!userId || !carId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await CarCart.findOne({ userId }).populate({
      path: "items.carId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.carId._id.toString() !== carId
    );

    await cart.save();

    await cart.populate({
      path: "items.carId",
      select: "image title price salePrice",
    });

    const mappedItems = cart.items.map((item) => ({
      carId: item.carId?._id,
      image: item.carId?.image,
      title: item.carId?.title,
      price: item.carId?.price,
      salePrice: item.carId?.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: mappedItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = {
  addToCarCart,
  updateCarCartItemQty,
  deleteCarCartItem,
  fetchCarCartItems,
};
