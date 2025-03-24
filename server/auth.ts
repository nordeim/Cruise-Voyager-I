import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { User as UserType, LoginCredentials, RegisterData } from "@shared/schema";
import { pool } from "./db";
import { APP_SECRET } from "./config";

declare global {
  namespace Express {
    interface User extends UserType {}
  }
}

const PgSession = connectPgSimple(session);

// Function to hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Function to compare password with hashed password
export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export function setupAuth(app: Express) {
  // Session setup
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: "session", // Default table name
        createTableIfMissing: true,
      }),
      secret: APP_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Invalid username" });
        }

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid password" });
        }

        // Update last login timestamp
        await storage.updateUserLastLogin(user.id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Authentication routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = req.body as RegisterData;

      // Check if username already exists
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Check if email already exists
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await hashPassword(userData.password);

      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      // Log in the user after registration
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in after registration" });
        }
        return res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  });

  app.post("/api/auth/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: Error, user: User, info: { message: string }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message || "Authentication failed" });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/user", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as User;
    res.json(userWithoutPassword);
  });

  // Password reset request
  app.post("/api/auth/reset-request", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const token = await storage.createPasswordResetToken(email);
      
      if (!token) {
        return res.status(404).json({ message: "Email not found" });
      }
      
      // In a real app, you would send an email with the reset link
      // For now, we'll just return the token in the response
      res.json({ 
        message: "Password reset token generated", 
        token, 
        resetLink: `/reset-password?token=${token}` 
      });
    } catch (error) {
      console.error("Password reset request error:", error);
      res.status(500).json({ message: "Error processing password reset request" });
    }
  });

  // Password reset
  app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      
      // Hash the new password
      const hashedPassword = await hashPassword(password);
      
      // Reset the password
      const success = await storage.resetPassword(token, hashedPassword);
      
      if (!success) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      
      res.json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ message: "Error resetting password" });
    }
  });

  // Middleware to check if user is authenticated
  app.use("/api/profile", (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    next();
  });

  // Update user profile
  app.patch("/api/profile", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const userId = (req.user as User).id;
      const userData = req.body;
      
      // Never allow password update through this endpoint
      delete userData.password;
      
      const updatedUser = await storage.updateUser(userId, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Error updating profile" });
    }
  });

  // Change password
  app.post("/api/profile/change-password", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const userId = (req.user as User).id;
      const { currentPassword, newPassword } = req.body;
      
      // Get the user to verify current password
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Verify current password
      const isMatch = await comparePasswords(currentPassword, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      
      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);
      
      // Update the password
      const updatedUser = await storage.updateUserPassword(userId, hashedPassword);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Password change error:", error);
      res.status(500).json({ message: "Error changing password" });
    }
  });
}

// Middleware to check if user is authenticated
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
}