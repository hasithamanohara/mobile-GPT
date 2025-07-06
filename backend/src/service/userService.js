import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

class UserService {
  static async register({ username, email, password, role }) {
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      throw new Error("User already exists");
    }

    user = new User({ username, email, password, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user: { id: user._id, username, email, role }, token };
  }

  static async login({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      user: { id: user._id, username, email: user.email, role: user.role },
      token,
    };
  }

  static async updateUser(userId, updates) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (updates.username) user.username = updates.username;
    if (updates.email) user.email = updates.email;
    if (updates.password) user.password = updates.password;

    await user.save();
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  static async getUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const { username, email, role } = user;
    return {
      user: {
        id: user._id,
        username,
        email,
        role,
      },
    };
  }

  static async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  }
}

export default UserService;
