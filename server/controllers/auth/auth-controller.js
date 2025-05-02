const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const asyncHandler = require("express-async-handler");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email, userName });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60000m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      token, // <--- ADD THIS
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });
//     if (!checkUser)
//       return res.json({
//         success: false,
//         message: "User doesn't exist! Please register.",
//       });

//     const match = await bcrypt.compare(password, checkUser.password);
//     if (!match)
//       return res.json({
//         success: false,
//         message: "Incorrect password!",
//       });

//     const token = jwt.sign(
//       {
//         id: checkUser._id,
//         role: checkUser.role,
//         email: checkUser.email,
//         userName: checkUser.userName,
//       },
//       process.env.JWT_SECRET, // ✅ From .env
//       { expiresIn: "7d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "Lax",
//       secure: process.env.NODE_ENV === "production",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Logged in successfully",
//       user: {
//         email: checkUser.email,
//         role: checkUser.role,
//         id: checkUser._id,
//         userName: checkUser.userName,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { userName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
  console.log("🔍 GET /api/auth/user", req.query.search);
});

const allUsersClient = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $and: [
          {
            $or: [
              { userName: { $regex: req.query.search, $options: "i" } },
              { email: { $regex: req.query.search, $options: "i" } },
            ],
          },
          { role: "admin" },
        ],
      }
    : { role: "admin" };

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  console.log("🔍 GET /api/auth/user", req.query.search);
  res.send(users);
});

//regex means regular expression that is used to search for a string in a string
// $or means either of the two conditions should be true
// $regex means regular expression that is used to search for a string in a string
// $options means options for the regular expression
// $ne means not equal to
// $and means both conditions should be true
// $or means either of the two conditions should be true
// $in means in the array
module.exports = {
  allUsers,
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  allUsersClient,
};
