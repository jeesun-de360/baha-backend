import bcrypt from "bcryptjs";
import { Admin, IAdmin } from "./admin.model";

// Register Admin service function
export const registerAdminService = async (data: Partial<IAdmin>) => {
  const { name, email, password, phone, role, avatar, status } = data;

  if (!email || !password || !name) {
    throw new Error("Name, email, and password are required");
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Check if admin already exists with this email
  const existingAdmin = await Admin.findOne({ email: normalizedEmail });
  if (existingAdmin) {
    throw new Error("Admin with this email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = new Admin({
    name,
    email: normalizedEmail,
    password: hashedPassword,
    phone,
    role: role || "admin",
    avatar,
    status: status || "active",
  });

  await admin.save();

  return { message: "Admin created successfully" };
};
