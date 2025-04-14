const PublicReview = require("../../models/companyRewie");

const addPublicReview = async (req, res) => {
  try {
    const {
      targetType,
      targetId,
      reviewerName,
      reviewMessage,
      reviewValue,
      userId,
    } = req.body;

    if (
      !targetType ||
      !targetId ||
      !reviewerName ||
      !reviewMessage ||
      !reviewValue
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Optionally: prevent duplicate reviews by the same user
    if (userId) {
      const existingReview = await PublicReview.findOne({
        targetType,
        targetId,
        userId,
      });
      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: "You already reviewed this item.",
        });
      }
    }

    const newReview = new PublicReview({
      targetType,
      targetId,
      reviewerName,
      reviewMessage,
      reviewValue,
      userId: userId || null,
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

const getReviewsByTarget = async (req, res) => {
  try {
    const { targetType, targetId } = req.params;

    const reviews = await PublicReview.find({ targetType, targetId });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = {
  addPublicReview,
  getReviewsByTarget,
};
